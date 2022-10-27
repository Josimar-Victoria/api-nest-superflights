import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PassengerService } from 'src/passenger/passenger.service';
import { FlightDTO } from './dto/flight.dto';
import { FlightService } from './flight.service';

@ApiTags('Flight')
@Controller('api/v1/flight')
export class FlightController {
  constructor(
    private readonly flightService: FlightService,
    private readonly passengerService: PassengerService,
  ) {}

  @Post()
  createFlight(@Body() flightDTO: FlightDTO) {
    return this.flightService.createFlight(flightDTO);
  }

  @Get()
  FindAllFlight() {
    return this.flightService.FindAllFlight();
  }

  @Get(':id')
  FindFlightById(@Param('id') id: string) {
    return this.flightService.FindFlightById(id);
  }

  @Put(':id')
  updateFlightById(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
    return this.flightService.UpdateFlightById(id, flightDTO);
  }

  @Delete(':id')
  deleteFlightById(@Param('id') id: string) {
    return this.flightService.deleteFlightById(id);
  }

  @Post(':flightId/passenger/:passengerId')
  async addPassenger(
    @Param('flightId') flightId: string,
    @Param('passengerId') passengerId: string,
  ) {
    const passenger = await this.passengerService.findPassengerById(
      passengerId,
    );

    if (!passenger)
      throw new HttpException('Passenger Not Found', HttpStatus.NOT_FOUND);

    return this.flightService.addPassenger(flightId, passengerId);
  }
}
