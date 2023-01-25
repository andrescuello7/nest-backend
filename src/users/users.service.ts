import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

//Mongose model
import { Users } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create_user.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly userModel: Model<Users>) { }

    //Get Notes
    async getNotes(): Promise<Users[]> {
        const response = await this.userModel.find();
        return response;
    }

    //Post Note
    async postNote(createNoteDTO: CreateUserDTO): Promise<Users> {
        const response = new this.userModel(createNoteDTO);
        return response.save();
    }

    //Delete Note
    async deleteNote(id: string): Promise<any> {
        const response = await this.userModel.findByIdAndDelete(id);
        return response;
    }

    //Put Note
    async putNote(id: string, createNoteDTO: CreateUserDTO): Promise<Users> {
        const response = await this.userModel.findByIdAndUpdate(id, createNoteDTO, {
            new: true,
        });
        return response;
    }
}
