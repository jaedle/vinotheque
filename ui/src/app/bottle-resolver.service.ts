import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {WineService} from "./shared/services/wine.service";

@Injectable({providedIn: "root"})
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
    console.log(bottle);
    return this.wineService.findByBottle(bottle)
      .toPromise()
      .then((id) => {
        this.router.navigateByUrl(`wines/${id}`);
      })
  }
}
