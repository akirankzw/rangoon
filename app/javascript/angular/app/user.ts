export class User {
  constructor(
    public id: number = null,
    public email: string = '',
    public given_name: string = '',
    public family_name: string = '',
    public password: string = '',
    public password_confirmation: string = '',
    public birthdate: string = '',
    public gender: string = '',
    public timezone: string = '',
    public skype_name: string = '',
    public avatar: any = '',
    public lesson_plan: string = null,
    public payment_status: string = '',
    public expiry_date: string = '',
    public token: string = ''
  ) { }
}
