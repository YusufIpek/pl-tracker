export interface PrivateLesson {
  id?: string;
  start: Date | string;
  end: Date | string;
  student?: string;
  subject?: string;
  notice?: string;
}
