import { Note } from './note';

export class Lesson {
  constructor(
    public id: number = null,
    public teacher_id: number = null,
    public start_at: string = '',
    public aasm_state: string = 'closed',
    public user_id: number = null,
    public user_name: string = '',
    public note: Note = new Note()
  ) { }
}
