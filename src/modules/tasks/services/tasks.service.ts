import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TasksService {
  private tasks = [
    {
      id: 1,
      name: 'Learn Spanish',
      status: 'PENDING',
    },
    {
      id: 2,
      name: 'Learn English',
      status: 'DONE',
    },
    {
      id: 3,
      name: 'Learn Arabic',
      status: 'PENDING',
    },
    {
      id: 4,
      name: 'Learn Painting',
      status: 'PENDING',
    },
    {
      id: 5,
      name: 'Learn Coding',
      status: 'DONE',
    },
  ];

  findTasks(status: string) {
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }
    return this.tasks;
  }

  findTask(id: number) {
    const task = this.tasks.find((task) => task.id === id);

    if (task != undefined) {
      return task;
    }

    throw new HttpException('Task with id not found', HttpStatus.NOT_FOUND);
  }

  addTask(task: CreateTaskDto) {
    const tasksById = this.tasks.sort((a, b) => b.id - a.id);

    const newTask = {
      id: tasksById[0].id + 1,
      ...task,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: number, updatedTask: UpdateTaskDto) {
    this.tasks.map((task) => {
      if (task.id === id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });

    return this.findTask(id);
  }

  deleteTask(id: number) {
    const taskToBeRemoved = this.findTask(id);

    this.tasks = this.tasks.filter((task) => task.id != id);

    return taskToBeRemoved;
  }
}
