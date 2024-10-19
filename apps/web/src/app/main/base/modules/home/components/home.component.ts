import {
	Component,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	OnInit,
	inject,
	AfterViewInit
} from '@angular/core';
import { finalize } from 'rxjs';
import Swiper from 'swiper';
import {
	Navigation,
	Pagination,
	Autoplay
} from 'swiper/modules';

import {
	Unsubscriber,
	untilCmpDestroyed
} from '@core';

import {
	ClientService
} from '../../client/services';
import {
	Client
} from '../../client/interfaces';
import {
	OperationType
} from '../../operation/interfaces';
import {
	BaseService
} from '@main/base/services';
import {
	CUBToastService
} from '@cub/material';
import {
	Email
} from '@main/base/interfaces';
import { FormBuilder, FormGroup } from '@angular/forms';

// Import necessary Swiper modules
Swiper.use([ Navigation, Pagination, Autoplay ]);

@Unsubscriber()
@Component({
	selector		: 'home',
	templateUrl		: '../templates/home.pug',
	host			: { class: 'home' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, AfterViewInit {

	protected readonly OPERATION_TYPE: typeof OperationType
		= OperationType;

	protected readonly IS_MOBILE: boolean
		= /Mobile/i.test( navigator.userAgent );
	protected email: Email;
	protected clients: Client[];
	protected emailForm: FormGroup;

	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _clientService: ClientService
		= inject( ClientService );
	private readonly _baseService: BaseService
		= inject( BaseService );
	private readonly _fb: FormBuilder
		= inject( FormBuilder );
	private readonly _toastService: CUBToastService
		= inject( CUBToastService );

	constructor() {
		this.emailForm
			= this._fb.group({
				fullName: undefined,
				email: undefined,
				phone: undefined,
				description: undefined,
			});
	}

	ngOnInit() {
		this._initData();
	}

	ngAfterViewInit(): void {
		new Swiper('.swiper.banner-carousel', {
			slidesPerView: 1,
			loop: true,
			autoplay: {
				delay: 5000,
				disableOnInteraction: false,
			},
		});

		if ( this.IS_MOBILE ) {
			new Swiper('.swiper.gallery-carousel', {
				slidesPerView: 2,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
			new Swiper('.swiper.client', {
				slidesPerView: 2,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
			new Swiper('.swiper.countries-carousel', {
				slidesPerView: 2,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
		} else {
			new Swiper('.swiper.gallery-carousel', {
				slidesPerView: 3,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
			new Swiper('.swiper.client', {
				slidesPerView: 4,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
			new Swiper('.swiper.countries-carousel', {
				slidesPerView: 6,
				loop: true,
				autoplay: {
					delay: 5000,
					disableOnInteraction: false,
				},
			});
		}
	}

	/**
	 * @return {void}
	 */
	protected sendEmail() {
		this.email
			= {
				title: this.emailForm.controls.fullName.value,
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
		this._clientService.getAll()
		.pipe(
			finalize( () => {
				this._cdRef.markForCheck();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( clients: Client[] ) => {
				this.clients
					= clients;
			},
		});
	}

}
