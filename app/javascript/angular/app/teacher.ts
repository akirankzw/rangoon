export class Teacher {
  constructor(
    public id: number,
    public email: string,
    public given_name: string,
    public family_name: string,
    public birthdate: string,
    public password: string,
    public comment: string,
    public timezone: string,
    public gender: string,
    public avatar: any,
    public nationality: string,
    public password_confirmation: string
  ) { }
}
