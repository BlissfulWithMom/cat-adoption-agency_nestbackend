import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CatsModule } from './cats/cats.module';
import { CoreModule } from './core/core.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { JwtStrategy } from './auth/jwt.strategy';
import { Cat } from './cats/cat.entity';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats.service';

@Module({
  imports: [
    CoreModule,
    CatsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: "postgres",
      database: 'nest',
      entities: [User, Cat],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Cat]),
    JwtModule.register({
      secret: 'secret_key', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  controllers: [AuthController, CatsController],
  providers: [AuthService, UserService, JwtStrategy, CatsService], 
})
export class AppModule {}
