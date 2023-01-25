import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

//Mongose model
import { Users } from './interfaces/users.interface';
import { CreateUserDTO } from './dto/create_user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('Users')
        private readonly userModel: Model<Users>,
        private jwtService: JwtService
    ) { }

    //Get Userss
    async getUsers(): Promise<Users[]> {
        const response = await this.userModel.find();
        return response;
    }

    //Post Users
    async postUsers(createUsersDTO: CreateUserDTO): Promise<any> {
        const email = await this.userModel.findOne({ "username": createUsersDTO.username });
        if (email) {
            return { mgs: "username repeat" }
        }
        const result = new CreateUserDTO();
        result.email = createUsersDTO.email;
        result.username = createUsersDTO.username;
        result.password = await bcrypt.hash(createUsersDTO.password, 10);

        const response = new this.userModel(result);
        const user = response.save();
        const payload = {
            user: {
                id: (await user).id,
            },
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }
    
    //Post Auth
    async postAuth(createUsersDTO: CreateUserDTO): Promise<any> {
        const search = await this.userModel.findOne({ "username": createUsersDTO.username });
        if (!search) {
            return { mgs: "username error" }
        }
        const result = await bcrypt.compare(createUsersDTO.password, search.password);

        if (!result) {
            return { mgs: "password incorrect" }
        }
        const payload = {
            user: {
                id: (await search).id,
            },
        };
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    //Put Users
    async putUsers(id: string, createUsersDTO: CreateUserDTO): Promise<Users> {
        const response = await this.userModel.findByIdAndUpdate(id, createUsersDTO, {
            new: true,
        });
        return response;
    }

    //Delete Users
    async deleteUsers(id: string): Promise<any> {
        const response = await this.userModel.findByIdAndDelete(id);
        return response;
    }
}
