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
import { Email } from '@main/base/interfaces';
import { finalize } from 'rxjs';
import { Config } from '../../common/interfaces';
import { ConfigService } from '../../common/services';
import Swal from 'sweetalert2';

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

		Swal.fire({
			title: 'Gửi thành công!',
			text: 'Chúng tôi sẽ nhanh chóng liên hệ với bạn.',
			icon: 'success',
			confirmButtonText: 'Cảm ơn bạn',
			backdrop: false,
			timer: 2500,
		});
		this.emailForm.markAsPristine();

		this._baseService.sendEmail( this.email )
		.pipe(
			finalize( () => {
				this._cdRef.markForCheck();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			error: () => {
				Swal.fire({
					title: 'Gửi thất bại!',
					text: 'Làm phiền bạn kiểm tra internet và gửi lại sau.',
					icon: 'error',
					confirmButtonText: 'Cảm ơn bạn',
					backdrop: false,
					timer: 2500,
				});
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
