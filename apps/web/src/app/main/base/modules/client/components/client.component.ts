import {
	Component,
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	OnInit,
	inject
} from '@angular/core';
import _ from 'lodash';
import {
	finalize
} from 'rxjs';

import {
	Unsubscriber,
	untilCmpDestroyed
} from '@core';

import {
	ClientService
} from '../services';
import {
	Client
} from '../interfaces';


@Unsubscriber()
@Component({
	selector		: 'client',
	templateUrl		: '../templates/client.pug',
	styleUrls		: [ '../styles/client.scss' ],
	host			: { class: 'client' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent implements OnInit {

	protected loaded: boolean;
	protected clients: Client[];
	protected client: Client;

	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _clientService: ClientService
		= inject( ClientService );

	ngOnInit() {
		this._initData();
	}

	/**
	 * @return {void}
	 */
	private _initData() {
		this._clientService
		.getAll()
		.pipe(
			finalize( () => {
				this.loaded = true;
				this._cdRef.detectChanges();
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
