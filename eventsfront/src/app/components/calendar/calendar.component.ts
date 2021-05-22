import { Event_ } from 'src/app/services/interfaces';
import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import * as moment from 'moment'
import { EventService } from 'src/app/services/event.service';
import { EventQuery } from 'src/app/states/event';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs-compat';
import { of } from 'rxjs';

const DAY_MS = 60 * 60 * 24 * 1000;

@Component({
  selector: 'event-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: [ './calendar.component.scss' ]
})
export class CalendarComponent implements OnInit{
  dates: Array<Date>;
  days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  date = new Date();
  @Output() selected = new EventEmitter();
  @Output() selectedDate = new EventEmitter();

  @Input() events_: [];
  myEvents$ = this.eventQuery.Event$();

  currentDayEvents: {
    isSelected: boolean,
    date: string;
    events: Observable<Event_[]>;
  } = {
    isSelected: false,
    date: '',
    events: of([])
  };

  constructor(
    private eventQuery: EventQuery,
    private eventService: EventService
  ) {
    this.dates = this.getCalendarDays(this.date);
  }

  ngOnInit() {
    this.selected.subscribe(it => {
      this.loadEvents(it);

    });
  }

  ngOnChanges() {

  }

  loadEvents(it) {
    const fDate = moment(it).format('YYYY-MM-DD');
    this.currentDayEvents = {
      isSelected: true,
      date: it,
      events: this.myEvents$.pipe(map(it2 => it2.filter((it: Event_) => it.event_date == fDate) as Event_[])),
    }

  }

  formatDate(date) {
    return moment(date.date).format('YYYY-MM-DD')
  }

  async unSelectDate() {
    this.currentDayEvents = {
      isSelected: false,
      date: '',
      events: of([])
    }
  }

  async setMonth(inc) {
    const [year, month] = [this.date.getFullYear(), this.date.getMonth()];
    this.date = new Date(year, month + inc, 1);
    await this.eventService.getLastMonthEvents(moment(this.date).format('YYYY-MM-DD'));
    this.dates = this.getCalendarDays(this.date);
  }

  isSameMonth(date) {
    return date.getMonth() === this.date.getMonth();
  }

  dayEvents_(date: Date) {
    const fDate = moment(date).format('YYYY-MM-DD');
    const ev = this.events_.filter((it: Event_) => it.event_date == fDate);
    const fEvent = ev.length > 0 ? (ev.length > 1 ? [{...ev[0] as Event_, name: `${ev.length} events`}] : [ev[0]] ) : [{name: '-', tag_color: { hexa_value: '#FFFFFF' }}]
    const eventData_ = {
      date: date,
      events: fEvent,
      show_more: {
        event_text: 'show more'
      }
    }
    return eventData_
  }

  async dropEvent(id: number) {
    await this.eventService.deleteEventById(id);
    await this.eventService.getLastMonthEvents(moment(this.currentDayEvents.date).format('YYYY-MM-DD'));
    this.loadEvents(this.currentDayEvents.date)
  }

  private getCalendarDays(date = new Date) {
    const calendarStartTime =  this.getCalendarStartDay(date).getTime();

    return this.range(0, 41)
      .map(num => new Date(calendarStartTime + DAY_MS * num));
  }

  private getCalendarStartDay(date = new Date) {
    const [year, month] = [date.getFullYear(), date.getMonth()];
    const firstDayOfMonth = new Date(year, month, 1).getTime();

    return this.range(1,7)
      .map(num => new Date(firstDayOfMonth - DAY_MS * num))
      .find(dt => dt.getDay() === 0)
  }

  private range(start, end, length = end - start + 1) {
    return Array.from({ length }, (_, i) => start + i)
  }

}
