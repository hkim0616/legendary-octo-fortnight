export interface CalendarEvent {
  id: string;
  title: string;
  location: string;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
  createdAt: string;
}

export interface SharedCalendar {
  shareId: string;
  name: string;
  events: CalendarEvent[];
  createdAt: string;
}
