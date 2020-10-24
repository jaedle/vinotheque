import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Wine, WineModel} from '../../../shared/model/wine.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent {

  @Input() model: WineModel;
  columns: string[] = ['name', 'winery', 'grape', 'year'];

  @Output() wineSelect = new EventEmitter<Wine>();

  wineSelected(wine: Wine): void {
    this.wineSelect.emit(wine);
  }
}
