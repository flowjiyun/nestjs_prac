import { Repository } from "typeorm";
import { Board } from "./board.entity"
import { BoardStatus } from "./board-status.enum";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBoardDto } from "./dto/create-board.dto";
import { User } from "src/auth/user.entity";

export class BoardRepository extends Repository<Board> {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board> 
  ) {
    super(boardRepository.target, boardRepository.manager, boardRepository.queryRunner);
  }

  async createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board> {
    const { title, description } = createBoardDto;

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
      user
    });

    await this.boardRepository.save(board);
    return board;
  }

}