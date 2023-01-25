import { Controller, Res, NotFoundException, Query, HttpStatus, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { CreateUserDTO } from './dto/create_user.dto';
import { UsersService } from './users.service';
@Controller('api/user')
export class UsersController {
    constructor(private noteService: UsersService) { }

    @Get('/')
    async getNotes(@Res() res) {
        const response = await this.noteService.getNotes();
        return res.status(HttpStatus.OK).json(response);
    }

    @Post('/')
    async postNotes(@Res() res, @Body() createNote: CreateUserDTO) {
        const response = await this.noteService.postNote(createNote);
        return res.status(HttpStatus.OK).json({
            message: 'User save!',
            response,
        });
    }

    @Delete('/')
    async deleteNotes(@Res() res, @Query('NoteID') NoteID) {
        const response = await this.noteService.deleteNote(NoteID);
        if (!response) throw new NotFoundException('Note does not exist!');
        return res.status(HttpStatus.OK).json({
            message: 'Your user delete!',
            response,
        });
    }

    @Put('/:id')
    async putNotes(@Res() res, @Body() putNote: CreateUserDTO, @Param('id') id) {
        const response = await this.noteService.putNote(id, putNote);
        if (!response) throw new NotFoundException('User does not exist');
        return res.status(HttpStatus.OK).json(response);
    }
}
