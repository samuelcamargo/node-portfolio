import { IUser } from '../interfaces/IUser';

export class User implements IUser {
  id?: string;
  username: string;
  password: string;

  constructor(props: Omit<User, 'id'>) {
    Object.assign(this, props);
  }
} 