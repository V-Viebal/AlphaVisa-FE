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
	News
} from '../interfaces';
import {
	NewsService
} from '../services';

@Unsubscriber()
@Component({
	selector		: 'news',
	templateUrl		: '../templates/news.pug',
	styleUrls		: [ '../styles/news.scss' ],
	host			: { class: 'news' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class NewsComponent implements OnInit {

	protected loaded: boolean;
	protected newsList: News[];
	protected news: News;

	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _newsService: NewsService
		= inject( NewsService );

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
		this._newsService
		.getAll()
		.pipe(
			finalize( () => {
				this.loaded = true;
				this._cdRef.detectChanges();
			} ),
			untilCmpDestroyed( this )
		)
		.subscribe({
			next: ( newsList: News[] ) => {
				this.newsList
					= newsList;
			},
		});
	}

}
