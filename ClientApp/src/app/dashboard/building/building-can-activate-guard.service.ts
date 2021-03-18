import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Globals } from '../../globals';
import { Injectable } from '@angular/core';

@Injectable()
export class BuildingCanActivateGuard implements CanActivate {
    constructor(private globals: Globals, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.globals.building) {
            return true;
        } else {
            this.router.navigate(['overview']);
            return false;
        }
    }
}
