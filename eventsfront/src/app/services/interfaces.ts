import { BaseEntity } from './base.service';

export interface Event_ {
  id: number;
  name: string;
  description: string;
  event_date: string;
  start_time: string;
  end_time: string;
  location?: Location_;
  location_id?: number;
  tag_color?: TagColor;
  tag_color_id?: number;
}

export type Location_ = BaseEntity & { short_name: string, parent_name?: string };
export type TagColor = BaseEntity & { hexa_value: string };

export interface dialogErrorData {
  first_error: string
}
