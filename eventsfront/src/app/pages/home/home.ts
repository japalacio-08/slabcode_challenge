import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/operators';
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/states/event';

@Component({
  selector: 'home',
  templateUrl: './home.html'
})

export class HomePage implements OnInit{

  eventsData$ = this.eventQuery.Event$();

  constructor(
    private spinner: NgxSpinnerService,
    private eventService: EventService,
    private eventQuery: EventQuery,
  ) {

  }
  async ngOnInit() {
    await this.fetchData(null);
  }

  async fetchData(date_) {
    this.spinner.show();
    if(date_ != null) { date_ = moment(date_).format('YYYY-MM-DD') }
    await this.eventService.getLastMonthEvents(date_);
    // this.eventsData$.subscribe()
    this.spinner.hide();
  }
}
