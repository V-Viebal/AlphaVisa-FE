import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	inject
} from '@angular/core';
import _ from 'lodash';

import {
	Unsubscriber,
	untilCmpDestroyed
} from '@core';

import {
	News
} from '../interfaces';
import {
	NewsService
} from '../services';
import { finalize } from 'rxjs';
import { ULID } from 'ulidx';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CUBToastService } from '@cub/material';
import { BaseService } from '@main/base/services';
import { Email } from '@main/base/interfaces';

@Unsubscriber()
@Component({
	selector		: 'news-detail',
	templateUrl		: '../templates/news-detail.pug',
	styleUrls		: [ '../styles/news-detail.scss' ],
	host			: { class: 'news-detail' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class NewsDetailComponent implements OnInit {

	protected loaded: boolean;
	protected newss: News[];
	protected news: News;
	protected email: Email;
	protected emailForm: FormGroup;

	private readonly _toastService: CUBToastService
		= inject( CUBToastService );
	private readonly _fb: FormBuilder
		= inject( FormBuilder );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _newsService: NewsService
		= inject( NewsService );
	private readonly _activatedRoute: ActivatedRoute
		= inject( ActivatedRoute );
	private readonly _baseService: BaseService
		= inject( BaseService );

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
		this._newsService
		.getDetail( id )
		.pipe(
			finalize( () => {
				this.loaded = true;
				this._cdRef.detectChanges();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( news: News ) => {
				this.news
					= news;
			},
		});

		this._newsService
		.getAll()
		.pipe(
			finalize( () => {
				this._cdRef.markForCheck();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( newsList: News[] ) => {
				this.newss
					= newsList;
			},
		});
	}

}
