import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OverviewModel, WineType} from '../../model/overview.model';

@Component({
  selector: 'app-wine-type-selector',
  templateUrl: './wine-type-selector.component.html',
  styleUrls: ['./wine-type-selector.component.scss']
})
export class WineTypeSelectorComponent implements OnInit {
  @Input() type: WineType;
  @Input() model: OverviewModel;
  @Input() display: string;
  @Input() current: WineType[];
  @Output() typeSelect = new EventEmitter<WineType>();

  count: number;

  ngOnInit(): void {
      this.count = this.model.countFor(this.type);
  }

  isSelected(): boolean {
    return this.current.indexOf(this.type) >= 0;
  }

  clicked(): void {
    if (this.isSelected()) {
      this.typeSelect.emit(undefined);
    } else {
      this.typeSelect.emit(this.type);
    }
  }
}
