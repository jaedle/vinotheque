import {Component, Input, OnInit} from '@angular/core';
import {OverviewModel, WineType} from '../../model/overview.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-wine-selector',
  templateUrl: './wine-selector.component.html',
  styleUrls: ['./wine-selector.component.scss']
})
export class WineSelectorComponent implements OnInit {

  @Input() model: OverviewModel;
  readonly wineType = WineType;
  current: WineType[];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const wineType: string | null = params.get('type');
      if (null == wineType) {
        this.current = [];
      } else {
        this.current = [WineType[wineType]];
      }
      this.refresh();
    });
  }

  typeChanged(type: WineType): void {
    if (type === undefined) {
      this.current = [];
    } else {
      this.current = [type];
    }
    this.navigate();
  }

  private navigate(): void {
    let typeParameter = '';
    if (this.current.length > 0) {
      typeParameter = this.current[0];
    }
    this.router.navigateByUrl(`?type=${typeParameter}`);
  }

  private refresh(): void {
    if (this.model === undefined) {
      return;
    }

    if (this.wineType === undefined) {
      this.model.resetFilter();
    } else {
      this.model.filter(this.current[0]);
    }
  }
}
