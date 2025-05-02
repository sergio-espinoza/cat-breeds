import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ION_BREEDS_STANDALONE } from './breeds.constant';
import { BreedsService } from './breeds.service';
import { BreedItem } from './breeds.interface';
import { DEFAULT_PAGINATION_LIMIT, DEFAULT_PAGINATION_PAGE } from 'src/shared/http-params.constant';
import { InfiniteScrollCustomEvent } from '@ionic/angular/standalone';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Subscription,
  switchMap,
  tap
} from 'rxjs';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { Keyboard } from '@capacitor/keyboard';
import { PlatformService } from 'src/global/platform.service';

@Component({
  selector: 'app-breeds',
  templateUrl: 'breeds.page.html',
  styleUrls: ['breeds.page.scss'],
  imports: [
    ...ION_BREEDS_STANDALONE, RouterLink, ReactiveFormsModule
  ],
})
export default class BreedsPage implements OnInit, OnDestroy {
  private _BreedSvc = inject(BreedsService);
  private _PlatformSvc = inject(PlatformService);

  public breeds = signal<BreedItem[]>([]);
  public currentPage = signal(DEFAULT_PAGINATION_PAGE);

  public filterTerm = new FormControl('');
  private subscription = new Subscription();

  public canScroll = signal(true);

  constructor() {
    this.initFilterTermControl();
  }

  ngOnInit(): void {
    this.loadBreeds(this.currentPage());
  }

  handleIonInfinite(event: InfiniteScrollCustomEvent) {
    this.loadBreeds(this.currentPage(), event);
  }

  loadBreeds(page: number, scrollEvent?: InfiniteScrollCustomEvent) {

    this._BreedSvc.getBreeds({
      page,
      searchTerm: this.filterTerm.value || ''
    })
      .pipe(
        finalize(() => this.updateCurrentPage())
      )
      .subscribe(entryBreeds => {
        this.updateBreeds(entryBreeds);

        scrollEvent && this.scrollActions(scrollEvent, entryBreeds.length);
      });
  }

  updateBreeds(entryBreeds: BreedItem[]) {
    this.breeds.update(
      breeds => [...breeds, ...entryBreeds]
    );
  }

  updateCurrentPage() {
    this.currentPage.update(page => page + 1);
  }

  scrollActions(event: InfiniteScrollCustomEvent, listSize = 0) {
    if (listSize < DEFAULT_PAGINATION_LIMIT) {
      this.canScroll.set(false);
    }

    event.target.complete();
  }

  private initFilterTermControl() {
    const changeFilterSub = this.filterTerm.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap(filterTerm => {
        this.restartPaginationValues(filterTerm);
        return this._BreedSvc.getBreeds({
          page: this.currentPage(),
          searchTerm: filterTerm || ''
        });
      }),
      tap(breedsResponse => {
        this.updateBreeds(breedsResponse);
        this.updateCurrentPage();
      })
    ).subscribe(_ => {
      if (!this._PlatformSvc.isMobilePlatform()) return;

      Keyboard.hide();
    });

    this.subscription.add(changeFilterSub);
  }

  private restartPaginationValues(filterTerm: string | null) {
    this.breeds.set([]);
    this.currentPage.set(DEFAULT_PAGINATION_PAGE);
    this.canScroll.set(filterTerm === '');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
