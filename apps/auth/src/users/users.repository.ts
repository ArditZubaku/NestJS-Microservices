import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common/database/abstract.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDocument } from './models/users.schema';

@Injectable()
export class UsersRepository extends AbstractRepository<UsersDocument> {
  protected readonly logger: Logger = new Logger(UsersRepository.name);

  constructor(
    @InjectModel(UsersDocument.name) usersModel: Model<UsersDocument>,
  ) {
    super(usersModel);
  }
}
