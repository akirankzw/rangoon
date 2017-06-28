export class Teacher {
  constructor(
    public id: number = null,
    public email: string = '',
    public given_name: string = '',
    public family_name: string = '',
    public birthdate: string = '',
    public comment: string = '',
    public gender: string = '',
    public timezone: string = '',
    public avatar: any = ''
  ) { }
}
