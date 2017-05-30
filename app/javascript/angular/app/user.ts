export class User {
  constructor(
    public id: number,
    public email: string,
    public given_name: string,
    public family_name: string,
    public password: string,
    public password_confirmation: string,
    public birth_date?: string,
    public sex?: string,
    public avatar?: string
  ) { }
}
