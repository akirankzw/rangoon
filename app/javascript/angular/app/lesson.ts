export class Lesson {
  constructor(
    public id: number = null,
    public teacher_id: number = null,
    public start_at: string = '',
    public state: string = 'closed',
    public attended: boolean = null
  ) { }
}
