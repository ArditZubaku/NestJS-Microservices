import { Field, ObjectType } from '@nestjs/graphql';
import { PrimaryGeneratedColumn } from 'typeorm';

@ObjectType({
  // Type will not be registered in the schema, it will just be inherited by the other entity types
  isAbstract: true,
})
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  // It appends the passed entity properties to the existing one (it is basically id+abstractEntity)
  constructor(entity: Partial<T>) {
    Object.assign(this, entity);
  }
}
