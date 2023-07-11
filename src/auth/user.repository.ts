import { Repository } from "typeorm";
import { User } from './user.entity'
import { InjectRepository } from "@nestjs/typeorm";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super(userRepository.target, userRepository.manager, userRepository.queryRunner);
  }

  async createUser(authCredentialDto: AuthCredentialDto): Promise<void> {
    const { username, password } = authCredentialDto;
    const user = this.userRepository.create({ username, password});

    await this.userRepository.save(user);
  }
}