import {
	Injectable,
	inject
} from '@angular/core';
import {
	Observable,
	of,
	switchMap
} from 'rxjs';
import {
	ULID
} from 'ulidx';
import _ from 'lodash';

import {
	AccountApiService
} from '@main/account/services';

import {
	Client
} from '../interfaces';

@Injectable()
export class ClientService {

	private readonly _endPoint: string
		= '/ContactItems';
	private readonly _apiService: AccountApiService
		= inject( AccountApiService );

	/**
	 * @return {Observable}
	 */
	public getAll(): Observable<Client[]> {
		return this._apiService
		.call( `${this._endPoint}`, 'GET', {PageNumber: 1, PageSize: 100} )
		.pipe(
			switchMap( ( result: any ) => {
				return of( result.items );
			})
		);
	}

	/**
	 * @param {ULID} id
	 * @return {Observable}
	 */
	public getDetail( id: ULID ): Observable<Client> {
		return this._apiService
		.call( `${this._endPoint}/${id}` );
	}
}
