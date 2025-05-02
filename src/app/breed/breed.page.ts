import { Component, Injector, OnInit, Signal, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreedService } from './breed.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { IMG_CDN_EXTENSION, IMG_CDN_URL, ION_BREED_STANDALONE } from './breed.constant';
import { Breed } from './breed.interface';
import { map } from 'rxjs';

type FormattedBreed = Breed | null;

@Component({
  selector: 'app-breed',
  templateUrl: 'breed.page.html',
  styleUrls: ['breed.page.scss'],
  standalone: true,
  imports: [...ION_BREED_STANDALONE, CommonModule, FormsModule]
})
export default class BreedPage implements OnInit {
  public id = input<string>('');

  private _Injector = inject(Injector);
  private _BreedSvc = inject(BreedService);

  public breed!: Signal<FormattedBreed>;

  constructor() { }

  ngOnInit() {
    this.loadBreed();
  }

  private loadBreed() {
    this.breed = toSignal(
      this._BreedSvc.getBreed(this.id()).pipe(
        map(breedResp => this.formatBreed(breedResp))
      ),
      { injector: this._Injector, initialValue: null }
    );
  }

  private formatBreed(breed: FormattedBreed): FormattedBreed {
    const imageUrl = `${IMG_CDN_URL}/${(breed as Breed).reference_image_id}.${IMG_CDN_EXTENSION}`;

    return { ...breed, imageUrl } as FormattedBreed;
  }
}
