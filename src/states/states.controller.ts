import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStateDto } from './dto/create-state.dto';
import { State } from './entities/state.entity';

@Controller('states')
export class StatesController {
    constructor(
        @InjectRepository(State)
        private readonly statesRepository: Repository<State>,
    ) {}

    @Post()
    async create(@Body() createStateDto: CreateStateDto): Promise<State> {
        const state: State = await createStateDto.toModel();
        this.statesRepository.save(state);
        return state;
    }
}
