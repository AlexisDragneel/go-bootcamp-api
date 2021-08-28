import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { from, Observable } from 'rxjs';
import { TaskDto } from '../../dtos/task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
  ) {}

  getAll(): Observable<Array<Task>> {
    return from(this.taskRepository.find());
  }

  getById(id: number): Observable<Task> {
    return from(this.taskRepository.findOne({ id }));
  }

  create(task: TaskDto): Observable<Task> {
    return from(this.taskRepository.save(task));
  }

  update(id: number, task: TaskDto): Observable<UpdateResult> {
    return from(this.taskRepository.update(id, task));
  }

  delete(id: number): Observable<DeleteResult> {
    return from(this.taskRepository.delete({ id }));
  }
}
