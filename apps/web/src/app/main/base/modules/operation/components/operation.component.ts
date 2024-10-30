import {
	Component,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	OnInit,
	inject
} from '@angular/core';
import _ from 'lodash';

import {
	Unsubscriber,
	untilCmpDestroyed
} from '@core';

import {
	OperationDetail,
	OperationType
} from '../interfaces';
import moment, { Moment } from 'moment';
import { OperationService } from '../services';
import { finalize } from 'rxjs';

@Unsubscriber()
@Component({
	selector		: 'operation',
	templateUrl		: '../templates/operation.pug',
	styleUrls		: [ '../styles/operation.scss' ],
	host			: { class: 'operation' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class OperationComponent implements OnInit {

	protected readonly SERVICE_TYPE: typeof OperationType
		= OperationType;

	protected operations: OperationDetail[];
	protected today: Moment = moment();
	protected operationsMap: Map<number, OperationDetail[]>
		= new Map<number, OperationDetail[]>();


	private readonly _operationService: OperationService
		= inject( OperationService );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );

	/**
	 * @constructor
	 */
	ngOnInit() {
		this._initData();
	}

	/**
	 * @return {void}
	 */
	private _initData() {
		this._operationService
		.getAll()
		.pipe(
			finalize( () => {
				this._cdRef.detectChanges();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( operations: OperationDetail[] ) => {
				this.operations
					= operations;

				for( const operation of operations ) {
					this.operationsMap.set(
						operation.type,
						this.operationsMap.get( operation.type )
							? [ ...this.operationsMap.get( operation.type ),
								operation ]
							: [ operation ]
					);
				}
			},
		});
	}

}
