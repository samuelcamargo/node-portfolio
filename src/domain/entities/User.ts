import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../interfaces/IUser';

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    username: string;

  @Column()
    password: string;

  constructor(props: Omit<User, 'id'>) {
    Object.assign(this, props);
  }
} 