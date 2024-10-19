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
import { BaseService } from '@main/base/services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CUBToastService } from '@cub/material';
import { Email } from '@main/base/interfaces';
import { finalize } from 'rxjs';
import { Config } from '../../common/interfaces';
import { ConfigService } from '../../common/services';

@Unsubscriber()
@Component({
	selector		: 'contact',
	templateUrl		: '../templates/contact.pug',
	host			: { class: 'contact' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent implements OnInit {

	protected config: Config;
	protected email: Email;
	protected emailForm: FormGroup;

	private readonly _configService: ConfigService
		= inject( ConfigService );
	private readonly _toastService: CUBToastService
		= inject( CUBToastService );
	private readonly _fb: FormBuilder
		= inject( FormBuilder );
	private readonly _baseService: BaseService
		= inject( BaseService );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );

	constructor() {
		this.emailForm
			= this._fb.group({
				title: undefined,
				fullName: undefined,
				email: undefined,
				phone: undefined,
				description: undefined,
			});
	}

	ngOnInit() {
		this._initData();
	}

	/**
	 * @return {void}
	 */
	protected sendEmail() {
		this.email
			= {
				title: this.emailForm.controls.title.value,
				fullName: this.emailForm.controls.fullName.value,
				description: this.emailForm.controls.description.value,
				phone: this.emailForm.controls.phone.value,
				email: this.emailForm.controls.email.value,
			};

		this._toastService
		.success(
			'BASE.MESSAGE.SUCCESS'
		);

		this._baseService.sendEmail( this.email )
		.pipe(
			finalize( () => {
				this._cdRef.markForCheck();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			error: () => {
				this._toastService
				.danger(
					'BASE.MESSAGE.FAIL'
				);
			},
		});
	}

	/**
	 * @return {void}
	 */
	private _initData() {
		this._configService.get()
		.pipe(
			finalize( () => {
				this._cdRef.markForCheck();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( config: Config ) => {
				this.config
					= config;
			},
		});
	}

}
