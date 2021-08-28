import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from '../../services/tasks/tasks.service';
import { mockTaskService } from '../../../../test/mock-services/mock-services';

describe('TasksController', () => {
  let controller: TasksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: mockTaskService,
        },
      ],
    }).compile();

    controller = module.get<TasksController>(TasksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all the tasks', () => {
    expect(controller.getAll()).toBe(mockTaskService.getAll());
  });

  it('should get the task by the id', () => {
    expect(controller.getById(1)).toBe(mockTaskService.getById(1));
  });

  it('should create a new task', () => {
    const mockTask = { description: 'new mock task' };
    const { tasks } = mockTaskService;
    expect(controller.post(mockTask)).toBe(tasks[tasks.length - 1]);
  });

  it('should return the update task', () => {
    const mockUpdateTask = { id: 1, description: 'updated task' };
    expect(controller.put(1, mockUpdateTask)).toBe(mockTaskService.getById(1));
  });

  it('should not update a task', () => {
    const mockUpdateTask = { description: 'updated task' };
    expect(controller.put(10, mockUpdateTask)).toBe(undefined);
  });

  it('should delete an entity', () => {
    expect(controller.delete(1)).toBeTruthy();
  });
});
