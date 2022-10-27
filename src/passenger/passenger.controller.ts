import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';

@ApiTags('Passengers')
@Controller('api/v1/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @Post()
  createPassenger(@Body() passengerDTO: PassengerDTO) {
    return this.passengerService.createPassenger(passengerDTO);
  }

  @Get()
  findAllPassenger() {
    return this.passengerService.findAllPassenger();
  }

  @Get(':id')
  findPassengerById(@Param('id') id: string) {
    return this.passengerService.findPassengerById(id);
  }

  @Put(':id')
  updatePassenger(@Param('id') id: string, @Body() passengerDTO: PassengerDTO) {
    return this.passengerService.updatePassenger(id, passengerDTO);
  }

  @Delete(':id')
  deletePassenger(@Param('id') id: string) {
    return this.passengerService.deletePassenger(id);
  }
}
