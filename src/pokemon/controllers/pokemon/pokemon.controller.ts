import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { PokeQuery } from '../../models/poke-query.model';
import { PokemonMinModel, PokemonModel } from '../../models/pokemon.model';

@Controller('pokemon')
export class PokemonController {
  constructor(private pokeService: PokemonService) {}

  @Get()
  get(@Query() query: PokeQuery): Observable<Array<PokemonMinModel>> {
    return this.pokeService.getAll(query);
  }

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Observable<PokemonModel> {
    return this.pokeService.getById(id);
  }
}
