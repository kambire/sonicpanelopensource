
declare type RepeatType = 'weekly' | 'daily' | 'monthly' | 'once';

declare interface ScheduledEvent {
  id: number;
  playlistId: number;
  playlistName: string;
  startTime: string;
  endTime: string;
  days: string[];
  repeat: RepeatType;
  active: boolean;
  date?: Date; // Optional date field for one-time events
}
