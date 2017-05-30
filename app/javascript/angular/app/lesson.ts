export class Lesson {
  id: number;
  canceled?: boolean;
  user_id?: number;
  teacher_id?: number;
  text: string;
  disabled: boolean;
  start_time: string;
  book_id?: number;
}
