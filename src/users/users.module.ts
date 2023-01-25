import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersScrema } from './schema/users_schema';
import { JwtModule } from '@nestjs/jwt';
import { Key } from '../../utils/key';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UsersScrema }]),
    JwtModule.register({
      secret: Key.SECRETA,
      signOptions: { expiresIn: 3600 }
    })
  ],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
