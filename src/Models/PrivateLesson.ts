export interface PrivateLesson {
  id?: string;
  startTimestamp: Date;
  endTimestamp: Date;
  studentName?: string;
  subject?: string;
  notice?: string;
}
