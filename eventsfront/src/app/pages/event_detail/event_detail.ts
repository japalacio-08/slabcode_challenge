import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { CustomErrorStateMatcher } from 'src/app/matchers/custom_error_state.matcher';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/states/event';
import { LocationQuery } from 'src/app/states/location';
import { TagColorQuery } from 'src/app/states/tag_color';
import { DateValidator } from 'src/app/validators/date.validator';
import * as moment from 'moment';
import {MatSnackBar} from '@angular/material/snack-bar'
import { dialogErrorData } from 'src/app/services/interfaces';

@Component({
  selector: 'dashboard',
  templateUrl: './event_detail.html',
  styleUrls: [ './event_detail.scss' ]
})

export class EventDetailPage implements OnInit{
  currentId: number = null;

  @ViewChild('errorsDialog', { read: TemplateRef }) errorsDialog: TemplateRef<dialogErrorData>;
  currentEvent$ = this.eventQuery.active$();
  tagColors$ = this.tagColorQuery.TagColor$();
  searchTagColors = null;
  locations$ = this.locationQuery.Location$();
  searchLocations = null;
  matcher = new CustomErrorStateMatcher();

  eventForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
    location_id: new FormControl(null, Validators.required),
    tag_color_id: new FormControl(null, Validators.required),
    event_date: new FormControl(null, [Validators.required]),
    start_time: new FormControl(null, Validators.required),
    end_time: new FormControl(null, Validators.required),
  })

  constructor(
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private eventService: EventService,
    private eventQuery: EventQuery,
    private tagColorQuery: TagColorQuery,
    private locationQuery: LocationQuery,
    public router: Router,
    public matSnackBar: MatSnackBar
  ) {

  }
  async ngOnInit() {
    this.spinner.show();
    const it = this.route.snapshot.params;
    const qp = this.route.snapshot.queryParams;

    if (qp['event_date']) {
      this.eventForm.patchValue({event_date: qp['event_date']})
    }
    await this.eventService.getTagColors();
    await this.eventService.getLocations();
    if (it['id'] == 'new') {
      this.currentId = null;
    } else {
      this.currentId = parseInt(it['id'], 10);
      await this.eventService.getEventById(this.currentId);
      this.currentEvent$.subscribe(it => {
        const baseF = {};
        Object.keys(it).forEach(it2 => {
          let subK = it2;
          let val = it[it2]
          if(['location', 'tag_color'].includes(it2)) {
            subK = `${it2}_id`;
            val = val.id;
          }
          baseF[subK] = val
        })
        this.eventForm.setValue(baseF)

      })
    }
    this.spinner.hide();
  }

  async onSubmit() {
    try {
      if (this.eventForm.valid) {
        const baseForm = this.eventForm.value;
        const form = {
          ...this.eventForm.value,
          event_date: moment(baseForm.event_date).format('YYYY-MM-DD'),
        }
        const it = this.route.snapshot.params;
        if (it['id'] == 'new') {
          await this.eventService.createEvent(form);
        } else {
          await this.eventService.updateEvent(form['id'], form);
        }
        this.router.navigateByUrl(`/home`);
      }
    } catch (e) {
      const baseForm = this.eventForm.value;
      const keys_ = Object.keys(baseForm)
      keys_.forEach(it => {
        if (e.error?.errors[it]) {
          this.eventForm.controls[it].setErrors({'incorrect': true})
        }
      });

      if(e.error?.errors) {
        const keys_ = Object.keys(e.error?.errors)
        this.matSnackBar.open(e.error?.errors[keys_[0]], 'Close');
      }
    }

  }

  get name() {
    return this.eventForm.get('name');
  }

  get description() {
    return this.eventForm.get('description');
  }

  get location_id() {
    return this.eventForm.get('location_id');
  }

  get tag_color_id() {
    return this.eventForm.get('tag_color_id');
  }

  get event_date() {
    return this.eventForm.get('event_date');
  }

  get start_time() {
    return this.eventForm.get('start_time');
  }

  get end_time() {
    return this.eventForm.get('end_time');
  }

}
