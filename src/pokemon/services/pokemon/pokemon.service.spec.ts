import { Test, TestingModule } from '@nestjs/testing';
import { PokemonService } from './pokemon.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { mockPokemonService } from '../../../../test/mock-services/mock-services';
import { AxiosResponse } from 'axios';
import { PokemonMinModel, PokemonModel } from '../../models/pokemon.model';
import { of, Subscription } from 'rxjs';

describe('PokemonService', () => {
  let service: PokemonService;
  let httpService: HttpService
  let subscription: Subscription;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [PokemonService],
    }).compile();

    service = module.get<PokemonService>(PokemonService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call external api mocked', done => {
    const result = {} as AxiosResponse<{results: Array<PokemonMinModel>}>;
    const pokemons = mockPokemonService.getAll();
    result.data = {
      results: pokemons
  }
    jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
    subscription = service.getAll({}).subscribe(result => {
      expect(result).toBe(mockPokemonService.getAll());
      done();
    })
  })

  it('should call an external mock api with id', done => {
    const result = {} as AxiosResponse<{results: PokemonModel}>;
    const mockPokemon = {   id: 2, name: "ivysaur", height: 10, weight: 130, url: ''}
    mockPokemonService.pokemons.push(mockPokemon)
    result.data = mockPokemonService.getById(2);
    jest.spyOn(httpService, 'get').mockImplementation(() => of(result));
    subscription = service.getById(2).subscribe(result => {
      expect(result.name).toBe(mockPokemonService.getById(2).name);
      done();
    })
  })

  afterEach(() => {
    if(!subscription){
      return;
    }
    subscription.unsubscribe();
  })
});
