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
	OperationDetail,
	OperationDetailCreate,
	OperationDetailUpdate
} from '../interfaces';

@Injectable()
export class OperationService {

	private readonly _endPoint: string
		= '/ServiceItems';
	private readonly _apiOperation: AccountApiService
		= inject( AccountApiService );

	/**
	 * @return {Observable}
	 */
	public getAll(): Observable<OperationDetail[]> {
		return this._apiOperation
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
	public getDetail( id: ULID ): Observable<OperationDetail> {
		return this._apiOperation
		.call( `${this._endPoint}/detail/${id}` );
	}

	/**
	 * @param {OperationCreate=} data
	 * @return {Observable}
	 */
	public create(
		data?: OperationDetailCreate ): Observable<OperationDetail> {
		return this._apiOperation
		.call( `${this._endPoint}`, 'POST', data );
	}

	/**
	 * @param {ULID} id
	 * @param {OperationUpdate} data
	 * @return {Observable}
	 */
	public update(
		id: ULID,
		data: OperationDetailUpdate
	): Observable<Partial<OperationDetail>> {
		return this._apiOperation
		.call( `${this._endPoint}/${id}`, 'PUT', data );
	}

	/**
	 * @param {ULID} id
	 * @return {Observable}
	 */
	public delete( id: ULID ): Observable<void> {
		return this._apiOperation
		.call( `${this._endPoint}/${id}`, 'DELETE' );
	}
}
