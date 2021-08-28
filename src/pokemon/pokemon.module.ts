import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { PokemonService } from './services/pokemon/pokemon.service';
import { PokemonController } from './controllers/pokemon/pokemon.controller';

@Module({
  imports: [HttpModule],
  providers: [PokemonService],
  controllers: [PokemonController],
})
export class PokemonModule {}
