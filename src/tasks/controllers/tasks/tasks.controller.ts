import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from '../../services/tasks/tasks.service';
import { Observable } from 'rxjs';
import { Task } from '../../entities/task.entity';
import { TaskDto } from '../../dtos/task.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getAll(): Observable<Array<Task>> {
    return this.taskService.getAll();
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Observable<Task> {
    return this.taskService.getById(id);
  }

  @Post()
  post(@Body() body: TaskDto): Observable<Task> {
    return this.taskService.create(body);
  }

  @Put(':id')
  put(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: TaskDto,
  ): Observable<UpdateResult> {
    return this.taskService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Observable<DeleteResult> {
    return this.taskService.delete(id);
  }
}
