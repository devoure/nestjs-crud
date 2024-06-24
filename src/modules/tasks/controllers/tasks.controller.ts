import { Controller, Get, Post, Patch, Delete, Param, Query, Body, ParseIntPipe } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';


@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('all')
  getTasks(@Query('status') status?: 'DONE' | 'PENDING') {
    return this.taskService.findTasks(status);
  }

  @Get(':id')
  getTask(@Param(ParseIntPipe) params: any) {
    return this.taskService.findTask(+params.id);
  }

  @Post('add')
  addTask(@Body() task: CreateTaskDto) {
    return this.taskService.addTask(task);
  }

  @Patch('update/:id')
  updateTask(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.taskService.updateTask(+id, task);
  }

  @Delete('delete/:id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(+id);
  }
}
