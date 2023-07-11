import { Repository } from "typeorm";
import { Board } from "./board.entity"
import { InjectRepository } from "@nestjs/typeorm";

export class BoardRepository extends Repository<Board> {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board> 
  ) {
    super(boardRepository.target, boardRepository.manager, boardRepository.queryRunner);
  }
}