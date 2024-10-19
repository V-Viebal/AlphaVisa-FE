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


@Unsubscriber()
@Component({
	selector		: 'about-us',
	templateUrl		: '../templates/about-us.pug',
	host			: { class: 'about-us' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class AboutUsComponent implements OnInit {

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
