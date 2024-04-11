import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'your_secret_key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
