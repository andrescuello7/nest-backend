import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersScrema } from './schema/users_schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersScrema }]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
