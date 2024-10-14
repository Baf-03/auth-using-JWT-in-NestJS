import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from 'src/auth/dtos/login.dto';
import { SignupDto } from 'src/auth/dtos/signup.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(readonly authService:AuthService){}

    @Post("/register")
    @UsePipes(new ValidationPipe())
    register(
        @Body() userData:SignupDto
    ){
        return this.authService.signup(userData)
    }

    @Post("/login")
    @UsePipes(new ValidationPipe())
    login(
        @Body() userData:LoginDto
    ){
        return this.authService.login(userData)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    verify(){
        return "Gaza is burning bro!"
    }
}
