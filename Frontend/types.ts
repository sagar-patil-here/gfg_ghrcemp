export interface CampusUpdate {
  id: string;
  title: string;
  summary: string;
  date: string;
  category: 'Event' | 'News' | 'Academic' | 'Workshop' | 'Contest';
}

export interface EventDetails extends CampusUpdate {
  time: string;
  location: string;
  status: 'Upcoming' | 'Past' | 'Live';
  image?: string;
  registrationLink?: string;
}

export interface LoaderState {
  progress: number;
  isComplete: boolean;
}

export enum ThemeColors {
  Primary = '#00df9a',
  Dark = '#0f0f0f',
  Light = '#f3f3f3'
}
