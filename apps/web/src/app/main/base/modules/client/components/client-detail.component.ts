import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	inject
} from '@angular/core';
import _ from 'lodash';
import {
	finalize
} from 'rxjs';
import {
	ULID
} from 'ulidx';
import {
	ActivatedRoute
} from '@angular/router';

import {
	Unsubscriber,
	untilCmpDestroyed,
} from '@core';

import {
	Client
} from '../interfaces';
import {
	ClientService
} from '../services';
import { CUBToastService } from '@cub/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService } from '@main/base/services';
import { Email } from '@main/base/interfaces';

@Unsubscriber()
@Component({
	selector		: 'client-detail',
	templateUrl		: '../templates/client-detail.pug',
	styleUrls		: [ '../styles/client-detail.scss' ],
	host			: { class: 'client-detail' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnInit {

	protected loaded: boolean;
	protected client: Client;
	protected clients: Client[];
	protected email: Email;
	protected emailForm: FormGroup;

	private readonly _toastService: CUBToastService
		= inject( CUBToastService );
	private readonly _fb: FormBuilder
		= inject( FormBuilder );
	private readonly _baseService: BaseService
		= inject( BaseService );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _clientService: ClientService
		= inject( ClientService );
	private readonly _activatedRoute: ActivatedRoute
		= inject( ActivatedRoute );

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
		this._activatedRoute.params.subscribe( () => {
			this._initData(
				this
				._activatedRoute
				.snapshot
				.paramMap
				.get( 'id' )
			);
		});
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
	private _initData( id: ULID ) {
		this._clientService
		.getDetail( id )
		.pipe(
			finalize( () => {
				this.loaded = true;
				this._cdRef.detectChanges();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( client: Client ) => {
				this.client
					= client;
			},
		});

		this._clientService
		.getAll()
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
