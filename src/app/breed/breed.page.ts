import { Component, Injector, OnInit, Signal, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Breed } from '../breeds/breeds.interface';
import { BreedService } from './breed.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.page.html',
  styleUrls: ['./breed.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export default class BreedPage implements OnInit {
  public id = input<string>('');

  private _Injector = inject(Injector);
  private _BreedSvc = inject(BreedService);

  public breed!: Signal<Breed>;

  constructor() { }

  ngOnInit() {
    this.loadBreed();
  }

  private loadBreed() {
    this.breed = toSignal(this._BreedSvc.getBreed(this.id()), {
      injector: this._Injector,
      initialValue: {} as Breed
    });
  }
}
