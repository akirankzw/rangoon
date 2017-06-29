import { Note } from './note';

export class Lesson {
  constructor(
    public id: number = null,
    public teacher_id: number = null,
    public start_at: string = '',
    public aasm_state: string = 'closed',
    public note: Note = new Note()
  ) { }
}
