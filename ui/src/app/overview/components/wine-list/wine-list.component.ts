import {Component, Input, OnInit} from '@angular/core';
import {WineModel, Wine, Wines} from '../../../shared/model/wine.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent {

  @Input() model: WineModel;
  columns: string[] = ['name', 'winery', 'grape', 'year'];
}
