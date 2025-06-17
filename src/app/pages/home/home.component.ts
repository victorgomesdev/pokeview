import { Component, inject, OnInit } from "@angular/core";
import { NgFor } from "@angular/common";
import { IonHeader, IonTitle, IonToolbar, IonContent, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonImg } from '@ionic/angular/standalone'
import { PokemonService } from "src/app/services/pokemon.service";
import { CapitalizeNamePipe } from "src/app/common/pipes/capitalize-name.pipe";

@Component({
  templateUrl: './home.component.html',
  selector: 'home-component',
  imports: [IonHeader, IonTitle, IonToolbar, IonContent, IonCard, NgFor, IonCardContent, IonCardTitle, IonCardHeader, CapitalizeNamePipe, IonImg]
})
export class HomePageComponent implements OnInit {


  filteredPokemons!: any[]
  pokemonsWithData!: any[]

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
}