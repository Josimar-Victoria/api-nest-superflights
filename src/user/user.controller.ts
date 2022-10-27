import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  createUser(@Body() userDTO: UserDTO) {
    return this.userService.createUser(userDTO);
  }

  @Get()
  @ApiOperation({ summary: 'Get all User' })
  findAllUsers() {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get ById User' })
  findUserById(@Param('id') id: string) {
    return this.userService.findUserById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update User' })
  updateUser(@Param('id') id: string, @Body() userDTO: UserDTO) {
    return this.userService.updateUser(id, userDTO);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
