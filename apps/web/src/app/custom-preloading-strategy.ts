import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable()
export class CustomPreloadingStrategy
implements PreloadingStrategy {

	/**
	 * @param {Route} route
	 * @param {Function} load
	 * @return {Observable<any>}
	 */
	public preload(
		route: Route,
		load: () => Observable<any>
	): Observable<any> {
		if ( route.data && route.data.preload ) {
			return load();
		} else {
			return of( null );
		}
	}

}
