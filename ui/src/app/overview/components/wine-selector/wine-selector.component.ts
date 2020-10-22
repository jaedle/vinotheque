import {Component, Input, OnInit} from '@angular/core';
import {WineModel, WineType} from '../../../shared/model/wine.model';
import {ActivatedRoute, Router} from '@angular/router';
import {TypeDeselected, TypeSelectionChange} from '../wine-type-selector/wine-type-selector.component';

@Component({
  selector: 'app-wine-selector',
  templateUrl: './wine-selector.component.html',
  styleUrls: ['./wine-selector.component.scss']
})

export class WineSelectorComponent implements OnInit {


  @Input() model: WineModel;
  readonly wineType = WineType;
  current: WineType[];
  private readonly typesParameter = `types`;


  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const wineType: string | null = params.get(this.typesParameter);
      if (null == wineType) {
        this.current = [];
      } else {
        const result = [];
        const active = wineType.split(',');
        for (const type of active) {
          const wineTypeElement = WineType[type];
          if (wineTypeElement === undefined) {
            continue;
          }
          result.push(wineTypeElement);
        }

        this.current = result;
      }

      this.refresh();
    });

    this.refresh();
  }

  typeChanged(type: TypeSelectionChange): void {
    if (type instanceof TypeDeselected) {
      this.current = this.current.filter(t => t !== type.type);
    } else {
      this.current.push(type.type);
    }

    this.navigate();
  }

  private navigate(): void {
    const typeParameter = this.current.join(',');
    this.router.navigateByUrl(`?${this.typesParameter}=` + `${encodeURIComponent(`${typeParameter}`)}`);
  }


  private refresh(): void {
    if (this.model === undefined) {
      return;
    }

    if (this.current.length === 0) {
      this.model.resetFilter();
    } else {
      this.model.filter(this.current);
    }
  }
}
