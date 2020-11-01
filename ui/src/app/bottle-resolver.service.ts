import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {WineService} from './shared/services/wine.service';

@Injectable({providedIn: 'root'})
export class BottleResolverService implements Resolve<any> {
  constructor(
    private router: Router,
    private wineService: WineService
  ) {
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    const bottle = route.queryParamMap.get('bottle');
    if (bottle === null) {
      return this.showError('Invalid link');
    }


    return this.wineService.findByBottle(bottle)
      .toPromise()
      .then((id) => this.router.navigateByUrl(`wines/${id}`))
      .catch(() => this.showError(`Could not find bottle: ${bottle}`));
  }

  private showError(message: string): Promise<boolean> {
    return this.router.navigateByUrl(`error?message=${encodeURIComponent(message)}`);
  }
}
