import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { Board } from './board.entity'
import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('boards') // 경로 localhost:3000/boards
@UseGuards(AuthGuard())
export class BoardsController {
  private logger = new Logger('BoardController');
  constructor(private boardsService: BoardsService) {}
  
  // @Get() //@Get('/')
  // getAllBoards(): Board[] {
  //   return this.boardsService.getAllBoards();
  // }

  @Get()
  getAllBoard(
    @GetUser() user: User
  ): Promise<Board[]> {
    this.logger.verbose(`User ${user.username} trying to get all boards`);
    return this.boardsService.getAllBoard(user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBoard(@Body() createBoardDto: CreateBoardDto,
  @GetUser() user: User): Promise<Board> {
    this.logger.verbose(`User ${user.username} create board.
    payload=${JSON.stringify(createBoardDto)}`);
    return this.boardsService.createBoard(createBoardDto, user);
  }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createBoard(@Body() createBoardDto: CreateBoardDto): Board {
  //   return this.boardsService.createBoard(createBoardDto);
  // }
  @Get('/:id')
  getBoradById(@Param('id') id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }
  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //   return this.boardsService.getBoardById(id);
  // }
  @Delete('/:id')
  deleteBoard(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User): Promise<void> {
    return this.boardsService.deleteBoard(id, user);
  }
  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //   return this.boardsService.deleteBoard(id);
  // }
  // // 경로 설정 왜이렇게 하지?
  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ): Promise<Board> {
    return this.boardsService.updateBoardStatus(id, status);
  }
  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id') id: string,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ): Board {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }
}
