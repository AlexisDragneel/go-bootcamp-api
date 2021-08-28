import { TaskDto } from '../../src/tasks/dtos/task.dto';
import { Task } from '../../src/tasks/entities/task.entity';

export const mockPokemonService = {
  pokemons: [
    {
      id: 1,
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
      height: 7,
      weight: 69
    },
  ],

  getAll() {
    return this.pokemons;
  },

  getById(id: number) {
    return this.pokemons.find((pokemon) => pokemon.id === id);
  },
};

export const mockTaskService = {
  tasks: [
    {
      id: 1,
      description: 'place holder desc',
    },
  ],

  getAll() {
    return this.tasks;
  },

  getById(id: number) {
    return this.tasks.find((task) => task.id === id);
  },

  create(task: TaskDto) {
    const lastTask = this.tasks[this.tasks.length - 1];
    const newTask = {
      id: lastTask.id + 1,
      ...task,
    };
    this.tasks.push(newTask);
    return newTask;
  },
  update(id: number, task: TaskDto) {
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    const newTask = {
      id,
      ...task,
    };
    if (taskIndex < 0) {
      return;
    }

    this.tasks.splice(taskIndex, 1, newTask);
    return newTask;
  },
  delete(id: number) {
    const index = this.tasks.findIndex((item) => item.id === id);
    if (index < 0) {
      return;
    }
    return this.tasks.splice(index, 1);
  },
};

export const mockTaskRepository = {
  tasks: [],
  find() {
    return Promise.resolve(this.tasks);
  },
  findOne(params: any) {
    const { id } = params;
    const task = this.tasks.find((item) => item.id === id);
    return Promise.resolve(task);
  },
  save(task: Task) {
    return Promise.resolve(this.tasks.push(task));
  },
  update(id: number, task: TaskDto) {
    return Promise.resolve('ok');
  },
  delete(id: number) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex < 0) {
      return Promise.resolve({});
    }
    return Promise.resolve(this.tasks.splice(taskIndex, 1));
  },
};
