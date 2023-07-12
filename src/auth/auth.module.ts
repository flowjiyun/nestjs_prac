import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity'
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
    secret: 'Secret1234',
    signOptions: {
      expiresIn: 60 * 60
    }
  }),
  TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  // JwtStrategy를 auth모듈에서 사용하기위해
  providers: [AuthService, UserRepository, JwtStrategy],
  // JwtStrategy를 다른 모듈에서 사용하기위해
  exports: [JwtStrategy, PassportModule]

})
export class AuthModule {}
