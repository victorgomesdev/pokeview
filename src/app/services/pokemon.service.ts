import { Injectable } from "@angular/core";
import { Pokedex, Pokemon } from 'pokeapi-js-wrapper'
import { forkJoin, from, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private _pokedex!: Pokedex

  constructor() {

    // Usa a biblioteca 'pokeapi-js-wrapper' para facilitar a consulta, sem precisar criar "na mão" os endpoints.
    this._pokedex = new Pokedex({
      protocol: 'https',
    })
  }

  listAllPokemonsByFilter(offset: number = 1, limit: number = 100) {
    return from(this._pokedex.getPokemonsList({
      offset: offset,
      limit: limit
    }))
  }

  getPokemonDataByName(pokemonList: string[]) {

    const req: Observable<Pokemon>[] = pokemonList.map(p => {
      return from(this._pokedex.getPokemonByName(p))
    })

    return forkJoin(req)
  }
}