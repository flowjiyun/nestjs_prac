import { Repository } from "typeorm";
import { User } from './user.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.userRepository.create({ username, password });
    try {
      await this.userRepository.save(user);
    } catch(error) {
      if (error.code === '23505') {
        throw new ConflictException('Existing username');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}