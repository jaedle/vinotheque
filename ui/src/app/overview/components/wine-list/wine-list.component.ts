import {Component, Input, OnInit} from '@angular/core';
import {OverviewModel, Wine, Wines} from '../../model/overview.model';

@Component({
  selector: 'app-wine-list',
  templateUrl: './wine-list.component.html',
  styleUrls: ['./wine-list.component.scss']
})
export class WineListComponent {

  @Input() model: OverviewModel;
  columns: string[] = ['name', 'winery', 'grape', 'year'];
}
