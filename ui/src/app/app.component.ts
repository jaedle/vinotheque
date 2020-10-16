import {Component, OnInit} from '@angular/core';
import {WineService} from './wine.service';
import {Model} from './wine';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  model: Model;
  error = false;

  constructor(private wineService: WineService) {
  }

  ngOnInit(): void {
    this.wineService.getWines().subscribe(model => this.model = model, error => {
      this.error = true;
    });
  }
}
