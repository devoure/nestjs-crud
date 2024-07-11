import { Controller, Get, Post, Patch, Delete, Param, Query, Body, ParseIntPipe, UseFilters, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { UpdateTaskDto } from '../dtos/update-task.dto';
import { TasksFilterDto } from '../dtos/tasks-filter.dto';
import { HttpExceptionFilter } from '../utils/http-exceptions.filters';

@Controller('tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Get('all')
  @UseFilters(new HttpExceptionFilter())
  @UsePipes(new ValidationPipe())
  getTasks(@Query() query: TasksFilterDto) {
    return this.taskService.findTasks(query.status);
  }

  @Get(':id')
  @UseFilters(new HttpExceptionFilter())
  getTask(@Param('id', ParseIntPipe) id: number) {
    return this.taskService.findTask(+id);
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
