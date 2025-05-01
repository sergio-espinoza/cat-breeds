import { AfterViewInit, Component, inject, OnInit, signal, viewChild } from '@angular/core';
import { ION_STANDALONE } from './breeds.constant';
import { BreedsService } from './breeds.service';
import { Breed } from './breeds.interface';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from 'src/shared/http-params.constant';
import { InfiniteScrollCustomEvent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-breeds',
  templateUrl: 'breeds.page.html',
  styleUrls: ['breeds.page.scss'],
  imports: [
    ...ION_STANDALONE
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
      .subscribe(entryBreeds => {

        scrollEvent && this.scrollActions(scrollEvent, entryBreeds.length);
        this.updateBreeds(entryBreeds);
        this.updateCurrentPage();
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

  scrollActions(event: InfiniteScrollCustomEvent, itemSize = 0) {
    if (itemSize < DEFAULT_PAGINATION_LIMIT) {
      event.target.disabled = true;
    }

    event.target.complete();
  }
}
