import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { User } from 'src/auth/Schema/user.schema';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from 'src/auth/dtos/login.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel:Model<User>,
private jwtService:JwtService){}




    async signup(userData:SignupDto){
        const {password,email,name}=userData;
        const hashedPassword= await bcrypt.hash(password,10);
        const userExist = await this.userModel.findOne({email})
        if(userExist){
            throw new HttpException("email already in use",400)
        }
        const newUser = new this.userModel({
            email,
            name,
            password:hashedPassword
        })
        return await newUser.save()
    }

    async login(userData:LoginDto):Promise<{accessToken:string,userData:LoginDto}>{
        const userExist = await this.userModel.findOne({email:userData.email});
        if(!userExist){
            throw new NotFoundException("either email or password is wrong")
        }
        const payload={email:userExist.email,name:userExist.name,id:userExist._id};
        const accessToken = this.jwtService.sign(payload)
        return({
            accessToken,
            userData
        })
    }
    async validateUser(email: string): Promise<any> {
        try{
            const user = await this.userModel.findOne({email});
            if (user) {
              return user
            }
            return null;
        }catch(err){
            console.log(err)
        }
        
      }  
}
