import {
	Component,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	OnInit,
	inject,
	ViewChild
} from '@angular/core';
import _ from 'lodash';
import {
	finalize
} from 'rxjs';
import {
	ActivatedRoute
} from '@angular/router';

import {
	Unsubscriber,
	untilCmpDestroyed
} from '@core';

import {
	CUBParagraphEditorComponent
} from '@cub/material';

import {
	OperationDetail
} from '../interfaces';
import {
	OperationService
} from '../services';

@Unsubscriber()
@Component({
	selector		: 'operation-detail',
	templateUrl		: '../templates/operation-detail.pug',
	styleUrls		: [ '../styles/operation-detail.scss' ],
	host			: { class: 'operation-detail' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class OperationDetailComponent implements OnInit {

	@ViewChild( CUBParagraphEditorComponent )
	public readonly paragraphEditor: CUBParagraphEditorComponent;

	protected operations: OperationDetail[];
	protected operation: OperationDetail;
	protected type: number;
	protected loaded: boolean;

	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _operationService: OperationService
		= inject( OperationService );
	public readonly activatedRoute: ActivatedRoute
		= inject( ActivatedRoute );

	/**
	 * @constructor
	 */
	ngOnInit() {
		this.activatedRoute.params.subscribe( () => {
			this._initData();
		});
	}

	/**
	 * @return {void}
	 */
	protected changeOperation( operation: OperationDetail ) {
		this.operation
			= operation;

		this._cdRef.detectChanges();
	}

	/**
	 * @return {void}
	 */
	private _initData() {
		const pathNames: string[]
			= window.location.pathname.split( '/' );
		this.type
			= parseInt( pathNames[ 3 ], 10 );

		this._operationService
		.getAll()
		.pipe(
			finalize( () => {
				this.loaded = true;
				this._cdRef.detectChanges();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( operations: OperationDetail[] ) => {

				this.operations
					= _.filter(
						operations,
						( operation: OperationDetail ) =>
							operation.type === this.type
					);
				this.operation
					= this.operations[ 0 ];
			},
		});
	}

}
