import { Test, TestingModule } from '@nestjs/testing';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { mockPokemonService } from '../../../../test/mock-services/mock-services';

describe('PokemonController', () => {
  let controller: PokemonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonController],
      providers: [PokemonService]
    }).overrideProvider(PokemonService)
        .useValue(mockPokemonService)
        .compile();

    controller = module.get<PokemonController>(PokemonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a list of pokemons', () => {
    expect(controller.get({})).toBe(mockPokemonService.getAll());
  })

  it('should return one pokemon', () => {
    expect(controller.getById(1)).toBe(mockPokemonService.getById(1));
  })

});
