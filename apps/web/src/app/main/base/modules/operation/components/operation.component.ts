import {
	Component,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	OnInit,
	inject
} from '@angular/core';
import _ from 'lodash';

import {
	Unsubscriber
} from '@core';

import {
	OperationType
} from '../interfaces';
import moment, { Moment } from 'moment';

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

	protected today: Moment = moment();

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
		this._cdRef.markForCheck();
	}

}
