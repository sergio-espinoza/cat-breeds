import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-breeds',
  templateUrl: 'breeds.page.html',
  styleUrls: ['breeds.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar ],
})
export default class BreedsPage {
  constructor() {}
}
