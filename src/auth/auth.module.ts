import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { AuthController } from './controllers/auth/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './Schema/user.schema';
import { JwtStrategy } from './strategies/jwt.strategy';  // Import JwtStrategy

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: userSchema }]),
    JwtModule.register({
      secret: 'kuchbeh',  // Ensure this is the same as in JwtStrategy
      signOptions: { expiresIn: '60s' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),  // Register default strategy as 'jwt'
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],  // Add JwtStrategy here
  exports: [AuthService],
})
export class AuthModule {}
