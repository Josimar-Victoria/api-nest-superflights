import { HttpStatus, Injectable } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IPassenger } from 'src/common/interfaces/passenger.interface';

@Injectable()
export class PassengerService {
  constructor(
    @InjectModel(PASSENGER.name) private readonly model: Model<IPassenger>,
  ) {}

  async createPassenger(passengerDTO: PassengerDTO): Promise<IPassenger> {
    const newPassenger = new this.model(passengerDTO);

    return await newPassenger.save();
  }

  async findAllPassenger(): Promise<IPassenger[]> {
    return await this.model.find();
  }

  async findPassengerById(id: string): Promise<IPassenger> {
    return await this.model.findById(id);
  }

  async updatePassenger(
    id: string,
    passengerDTO: PassengerDTO,
  ): Promise<IPassenger> {
    return await this.model.findByIdAndUpdate(id, passengerDTO, { new: true });
  }

  async deletePassenger(id: string) {
    await this.model.findByIdAndDelete(id);

    return {
      status: HttpStatus.OK,
      msg: 'Passenger deleted successfully',
    };
  }
}
