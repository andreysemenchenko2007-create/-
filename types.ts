export enum View {
  DASHBOARD = 'DASHBOARD',
  JOURNAL = 'JOURNAL',
  SETTINGS = 'SETTINGS'
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: Date;
  sources?: GroundingSource[];
}

export interface Lesson {
  id: string;
  title: string;
  subject: string;
  time: string;
  instructor: string;
  status: 'upcoming' | 'live' | 'completed';
}

export interface StudentJournalRecord {
  id: string;
  fullName: string;
  className: string;
  attendance: number;
  averageGrade: number;
  latestGrades: number[];
  notes: string;
}

export interface User {
  name: string;
  role: 'student' | 'teacher';
  avatar: string;
}
