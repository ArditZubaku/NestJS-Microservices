import { PrimaryGeneratedColumn } from 'typeorm';

export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  // It appends the passed entity properties to the existing one (it is basically id+abstractEntity)
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
