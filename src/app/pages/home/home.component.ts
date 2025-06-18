import { Component, inject, OnInit } from "@angular/core";
import { NgFor } from "@angular/common";
import { IonHeader, IonTitle, IonToolbar, IonContent, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonAvatar, IonLabel, InfiniteScrollCustomEvent } from '@ionic/angular/standalone'
import { PokemonService } from "src/app/services/pokemon.service";
import { CapitalizeNamePipe } from "src/app/common/pipes/capitalize-name.pipe";

@Component({
  templateUrl: './home.component.html',
  selector: 'home-component',
  imports: [IonHeader, IonTitle, IonToolbar, IonContent, NgFor, CapitalizeNamePipe, IonInfiniteScroll, IonInfiniteScrollContent, IonList, IonItem, IonAvatar, IonLabel]
})
export class HomePageComponent implements OnInit {


  filteredPokemons!: any[]
  pokemonsWithData!: any[]

  limit = 100

  pokemonService = inject(PokemonService)

  ngOnInit(): void {
    this.pokemonService.listAllPokemonsByFilter()
      .subscribe({
        next: (res) => {
          this.filteredPokemons = res.results.map(p => p.name)
          this.pokemonService.getPokemonDataByName(this.filteredPokemons)
            .subscribe({
              next: (res) => {
                this.pokemonsWithData = res
              }
            })
        }
      })
  }

  onScrollEnd(scrollEvent: InfiniteScrollCustomEvent): void {
    this.limit += 5
    this.pokemonService.listAllPokemonsByFilter(undefined, this.limit)
      .subscribe({
        next: (res) => {
          const loaded = res.results.map(p => p.name)
          this.filteredPokemons.push(loaded)
          this.pokemonService.getPokemonDataByName(loaded)
            .subscribe({
              next: (res) => {
                this.pokemonsWithData.push(res)
              }
            })
        }
      })
  }
}