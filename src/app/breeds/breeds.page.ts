import { AfterViewInit, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ION_STANDALONE } from './breeds.constant';
import { BreedsService } from './breeds.service';
import { Breed } from './breeds.interface';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from 'src/shared/http-params.constant';
import { InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import { finalize } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-breeds',
  templateUrl: 'breeds.page.html',
  styleUrls: ['breeds.page.scss'],
  imports: [
    ...ION_STANDALONE, RouterLink
  ],
})
export default class BreedsPage implements OnInit {
  private _BreedSvc = inject(BreedsService);
  public breeds = signal<Breed[]>([]);
  public currentPage = signal(DEFAULT_PAGINATION_PAGE);

  constructor() { }

  ngOnInit(): void {
    this.loadBreeds(this.currentPage());
  }

  handleIonInfinite(event: InfiniteScrollCustomEvent) {
    this.loadBreeds(this.currentPage(), event);
  }

  loadBreeds(page: number, scrollEvent?: InfiniteScrollCustomEvent) {

    this._BreedSvc.getBreeds({
      page
    })
      .pipe(
        finalize(() => this.updateCurrentPage())
      )
      .subscribe(entryBreeds => {
        this.updateBreeds(entryBreeds);

        scrollEvent && this.scrollActions(scrollEvent, entryBreeds.length);
      });
  }

  updateBreeds(entryBreeds: Breed[]) {
    this.breeds.update(
      breeds => [...breeds, ...entryBreeds]
    );
  }

  updateCurrentPage() {
    this.currentPage.update(page => page + 1);
  }

  scrollActions(event: InfiniteScrollCustomEvent, listSize = 0) {
    if (listSize < DEFAULT_PAGINATION_LIMIT) {
      event.target.disabled = true;
    }

    event.target.complete();
  }
}
