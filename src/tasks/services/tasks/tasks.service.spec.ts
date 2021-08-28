import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../../entities/task.entity';
import { mockTaskRepository } from '../../../../test/mock-services/mock-services';
import { Subscription } from 'rxjs';

describe('TasksService', () => {
  let service: TasksService;
  let subscription: Subscription;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get a task with id', (done) => {
    const mockTask = { id: 1, description: 'mocked' };
    mockTaskRepository.tasks.push(mockTask);
    subscription = service.getById(1).subscribe((result) => {
      expect(result).toBe(mockTask);
      done();
    });
  });

  it('should return all the task', (done) => {
    mockTaskRepository.tasks = [
      { id: 1, description: 'mocked' },
      { id: 2, description: 'mocked 2' },
      { id: 3, description: 'mocked 3' },
    ];
    subscription = service.getAll().subscribe((result) => {
      expect(result).toBeTruthy();
      expect(result).toBe(mockTaskRepository.tasks);
      done();
    });
  });

  it('should get an "ok" from update', (done) => {
    subscription = service
      .update(1, { description: '' })
      .subscribe((result) => {
        expect(result).toBe('ok');
        done();
      });
  });

  it('should save a new task', (done) => {
    const mockTask = { id: 1, description: 'mocked' };
    subscription = service.create(mockTask).subscribe((result) => {
      expect(result).toBeTruthy();
      expect(mockTaskRepository.tasks.length).toBe(1);
      done();
    });
  });

  afterEach(() => {
    if (!subscription) {
      return;
    }

    subscription.unsubscribe();
  });
});
