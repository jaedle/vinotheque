import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
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
  @Input() current: WineType | undefined;

  @Output() typeSelect = new EventEmitter<WineType>();

  count: number;

  ngOnInit(): void {
    if (this.type === undefined) {
      this.count = this.model.count();
    } else {
      this.count = this.model.countFor(this.type);
    }
  }

  isSelected(): boolean {
    return this.current === this.type;
  }

  clicked(): void {
    this.typeSelect.emit(this.type);
  }
}