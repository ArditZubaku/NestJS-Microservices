import { Column, Entity } from 'typeorm';
import { AbstractEntity } from '../database';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity()
@ObjectType()
export class Role extends AbstractEntity<Role> {
  @Column()
  @Field()
  name: string;
}
