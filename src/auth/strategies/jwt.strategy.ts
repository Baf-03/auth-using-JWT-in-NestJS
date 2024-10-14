import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "kuchbeh",  
    });
  }

  async validate(payload: any): Promise<any> {
    console.log("JWT Strategy Validate Function Triggered");

    const { email } = payload; 

    const user = await this.authService.validateUser(email);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user; 
  }
}
