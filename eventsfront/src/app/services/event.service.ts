import { TagColor, TagColorQuery } from './../states/tag_color';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EventQuery, Event_ } from '../states/event';
import { BaseService } from './base.service';
import { Location_ } from './interfaces';
import { LocationQuery } from '../states/location';



export type responseType = 'arraybuffer' | 'blob' | 'json' | 'text';

@Injectable()
export class EventService extends BaseService {
  constructor(
    public http: HttpClient,
    private eventQuery: EventQuery,
    private tagColorQuery: TagColorQuery,
    private locationQuery: LocationQuery
    ) {
    super(http);
  }

  async getLastMonthEvents(date_=null) {
    let sma_url = `${this.baseUrl}${this.baseVersion}/event/last_month_events`;
    if (date_ != null) { sma_url = `${sma_url}?event_date=${date_}` }
    const response = await this.get<Event_[]>(sma_url);
    this.eventQuery.setState(response.data, 0);
    return response;
  }

  async createEvent(data) {
    const sma_url = `${this.baseUrl}${this.baseVersion}/events`;
    const response = await this.post<Event_, any>(sma_url, data);
    return response;
  }

  async updateEvent(id, data) {
    const sma_url = `${this.baseUrl}${this.baseVersion}/events/${id}`;
    const response = await this.put<Event_, any>(sma_url, data);
    return response;
  }

  async deleteEventById(id) {
    const sma_url = `${this.baseUrl}${this.baseVersion}/events/${id}`;
    const response = await this.delete<Event_, any>(sma_url, {});
    return response;
  }

  async getEventById(id: number) {
    const sma_url = `${this.baseUrl}${this.baseVersion}/events/${id}`;
    const response = await this.get<Event_>(sma_url);
    this.eventQuery.setState([{...response.data}], {activeId: response.data.id});
    return response;

  }

  async getTagColors() {
    const sma_url = `${this.baseUrl}${this.baseVersion}/tag_colors`;
    const response = await this.get<TagColor[]>(sma_url);
    this.tagColorQuery.setState(response.data, 0);
    return response;
  }

  async getLocations() {
    const sma_url = `${this.baseUrl}${this.baseVersion}/locations`;
    const response = await this.get<Location_[]>(sma_url);
    this.locationQuery.setState(response.data, 0);
    return response;
  }
}
