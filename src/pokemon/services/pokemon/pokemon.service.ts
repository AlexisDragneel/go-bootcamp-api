import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { PokeApiGetAllModel } from '../../models/poke-api-get-all.model';
import { PokeQuery } from '../../models/poke-query.model';
import { PokemonMinModel, PokemonModel } from '../../models/pokemon.model';

@Injectable()
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private http: HttpService) {}

  getAll(query?: PokeQuery): Observable<Array<PokemonMinModel>> {
    return this.http
      .get<PokeApiGetAllModel>(this.buildQuery(query))
      .pipe(map((result) => result.data.results));
  }

  getById(id: number): Observable<PokemonModel> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<PokemonModel>(url).pipe(
      map((result) => {
        const { id, name, height, weight } = result.data;
        return {
          id,
          name,
          height,
          weight,
        };
      }),
    );
  }

  private buildQuery({ offset, limit }: PokeQuery): string {
    let url = this.baseUrl;
    if (!!offset) {
      url += `?offset=${offset}`;
    }
    if (!!limit) {
      url += `${!!offset ? '&' : '?'}limit=${limit}`;
    }
    return url;
  }
}
