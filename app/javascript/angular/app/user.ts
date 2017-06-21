export class User {
  constructor(
    public id: number = null,
    public email: string = '',
    public given_name: string = '',
    public family_name: string = '',
    public password: string = '',
    public password_confirmation: string = '',
    public birthdate: string = '',
    public gender: string = ''
  ) { }
}
