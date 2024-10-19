import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ViewChild,
	ViewContainerRef,
	inject,
	ChangeDetectorRef,
	AfterViewInit
} from '@angular/core';
import { Event, NavigationEnd, Router } from '@angular/router';

import {
	Unsubscriber,
	untilCmpDestroyed
} from '@core';
import { CUBToastService, CUBToastType } from '@cub/material';
import { NavigationBarComponent } from '@main/common/navigation-bar/components';
import { filter, finalize } from 'rxjs';
import { BaseService } from '../services';
import { Config } from '../modules/common/interfaces';
import { ConfigService } from '../modules/common/services';

@Unsubscriber()
@Component({
	selector		: 'base',
	templateUrl		: '../templates/base.pug',
	styleUrls		: [ '../styles/base.scss' ],
	host			: { class: 'base' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class BaseComponent implements OnInit, AfterViewInit {

	@ViewChild( NavigationBarComponent )
	public header: NavigationBarComponent;
	@ViewChild( 'container' )
	public container: ViewContainerRef;

	protected config: Config;
	protected lastScrollY: number;
	protected showScrollTop: boolean;

	private readonly _configService: ConfigService
		= inject( ConfigService );
	private readonly _baseService: BaseService
		= inject( BaseService );
	private readonly _toastService: CUBToastService
		= inject( CUBToastService );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _router: Router
		= inject( Router );

	ngOnInit() {
		this._initData();
		this._initSubscription();
	}

	ngAfterViewInit(): void {

		this._router.events
		.pipe(
			// Filter only NavigationEnd events
			filter( ( event: Event ) => event instanceof NavigationEnd ),
			untilCmpDestroyed( this )
		)
		.subscribe( () => {
			setTimeout(() => {
				this.scrollToTop();
			}, 200);
		});

		const observer: IntersectionObserver
			= new IntersectionObserver(
				( entries: IntersectionObserverEntry[] ) => {
					entries.forEach(( entry: IntersectionObserverEntry ) => {
						const rect: DOMRectReadOnly
							= entry.boundingClientRect;

						if (
							!entry.isIntersecting
							&& rect.top < 90
						) {
							this.showScrollTop = true;
							this.header.isSticky = true;
						} else if ( entry.isIntersecting ) {
							this.showScrollTop = false;
							this.header.isSticky = false;
						}

						this._cdRef.markForCheck();
						this.header.markForCheck();
					});
				}
			);

		observer.observe( this.header.elementRef.nativeElement );
	}

	// protected onWindowScroll(): void {
	// 	const currentScrollY: number = window.scrollY;
	// 	const isScrollingDown: boolean = currentScrollY > this.lastScrollY;

	// 	// Check scroll direction and position to manage sticky header
	// 	if (isScrollingDown && currentScrollY > 50) {
	// 		// User is scrolling down and past the threshold
	// 		this.header.isSticky = true;
	// 		this.showScrollTop = true;
	// 	} else if (!isScrollingDown && currentScrollY < 50) {
	// 		// User is scrolling up and within the threshold
	// 		this.header.isSticky = false;
	// 		this.showScrollTop = false;
	// 	}

	// 	// Update the last scroll position
	// 	this.lastScrollY = currentScrollY;

	// 	// Trigger change detection to update the view
	// 	this._cdRef.markForCheck();
	// }

	protected scrollToTop(): void {
		document.getElementById('__nuxt')
		.scrollIntoView({ behavior: 'smooth' });
	}

	protected scrollToBottom(): void {
		document.getElementById('bottom')
		.scrollIntoView({ behavior: 'smooth' });
	}

	private _initSubscription() {
		this._baseService.toast$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe({
			next: ( value: any ) => {
				switch( value.type ) {
					case CUBToastType.Success:
						this._toastService
						.success(
							value.message
						);
						break;
					case CUBToastType.Danger:
						this._toastService
						.danger(
							value.message
						);
						break;
					case CUBToastType.Default:

						break;
					case CUBToastType.Info:
						break;
					case CUBToastType.Warning:
						break;
				}
			}
		})
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
