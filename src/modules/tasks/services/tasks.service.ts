import { Injectable } from '@nestjs/common';

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

  findTasks(status?: 'DONE' | 'PENDING') {
    if (status) {
      return this.tasks.filter((task) => task.status === status);
    }
    return this.tasks;
  }

  findTask(id: number) {
    return this.tasks.find((task) => task.id === id);
  }

  addTask(task: { name: string, status: 'DONE' | 'PENDING' }) {
    const tasksById = this.tasks.sort((a, b) => b.id - a.id);

    const newTask = {
      id: tasksById[0].id + 1,
      ...task,
    };

    this.tasks.push(newTask);

    return newTask;
  }

  updateTask(id: number, updatedTask: { name: string, status: 'DONE' | 'PENDING' }) {
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
