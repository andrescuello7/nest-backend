import { Controller, Res, NotFoundException, Query, HttpStatus, Post, Get, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UsersService } from './users.service';
@Controller('api/')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get('/user')
    async getUserss(@Res() res) {
        const response = await this.usersService.getUsers();
        return res.status(HttpStatus.OK).json(response);
    }

    @Post('/user')
    async postUserss(@Res() res, @Body() createUsers: CreateUserDTO) {
        const response = await this.usersService.postUsers(createUsers);
        return res.status(HttpStatus.OK).json({
            message: 'User save!',
            response,
        });
    }
    @Post('/auth')
    async postAuth(@Res() res, @Body() createUsers: CreateUserDTO) {
        const response = await this.usersService.postAuth(createUsers);
        return res.status(HttpStatus.OK).json({
            message: 'User save!',
            response,
        });
    }

    @Delete('/user')
    async deleteUserss(@Res() res, @Query('UsersID') UsersID) {
        const response = await this.usersService.deleteUsers(UsersID);
        if (!response) throw new NotFoundException('Users does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Your user delete!',
            response,
        });
    }

    @Put('/user/:id')
    async putUserss(@Res() res, @Body() putUsers: CreateUserDTO, @Param('id') id) {
        const response = await this.usersService.putUsers(id, putUsers);
        if (!response) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json(response);
    }
}
