import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	OnInit,
	HostBinding,
	TemplateRef,
	ViewChild,
	ViewContainerRef,
	inject,
	Renderer2,
	AfterViewInit
} from '@angular/core';
import {
	ActivatedRoute,
	NavigationEnd,
	Router
} from '@angular/router';

import {
	CoerceBoolean,
	DefaultValue,
	LocaleService,
	Unsubscriber,
	untilCmpDestroyed
} from '@core';

import {
	Account
} from '@main/account/interfaces';
import {
	AccountService
} from '@main/account/services';
import {
	OperationType
} from '@main/base/modules/operation/interfaces';

import {
	CUBConfirmService
} from '@cub/material/confirm';
import {
	CUBPopupComponent,
	CUBPopupService
} from '@cub/material/popup';
import {
	CUBMenuComponent
} from '@cub/material/menu';
import {
	CUBDialogRef,
	CUBDialogService
} from '@cub/material/dialog';

import {
	DialogHamburgerComponent
} from '../modules/hamburger';
import {
	NavigationBarService
} from '../services';
import { Config } from '@main/base/modules/common/interfaces';
import { filter } from 'rxjs';

@Unsubscriber()
@Component({
	selector		: 'navigation-bar',
	templateUrl		: '../templates/navigation-bar.pug',
	styleUrls		: [ '../styles/navigation-bar.scss' ],
	host			: { class: 'navigation-bar' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class NavigationBarComponent
implements OnInit, AfterViewInit {

	@ViewChild( 'explorePopup' )
	public explorePopup: CUBPopupComponent;
	@ViewChild( 'accountSettingsMenu' )
	public accountSettingsMenu: CUBMenuComponent;
	@ViewChild('mobileMenu')
	public mobileMenu: ElementRef | undefined;

	@HostBinding( 'class.navigation-bar--no-border' )
	get isBorderExist(): boolean { return this.explorePopup?.isOpened; }

	@Input() public config: Config;
	@Input() @DefaultValue() @CoerceBoolean()
	public hasFeatureModule: boolean = true;

	public readonly elementRef: ElementRef
		= inject( ElementRef );

	public isSticky: boolean;

	protected isMobileMenuVisible: boolean;
	protected canInviteUsers: boolean;
	protected canRedirect: boolean;
	protected currentMainModule: string;
	protected account: Account;
	protected contentTmp: TemplateRef<any>;
	protected hamburgerDialog: CUBDialogRef;

	protected readonly OPERATION_TYPE: typeof OperationType
		= OperationType;
	protected readonly localeService: LocaleService
		= inject( LocaleService );

	private readonly _navigationBarService: NavigationBarService
		= inject( NavigationBarService );
	private readonly _cubConfirmService: CUBConfirmService
		= inject( CUBConfirmService );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _accountService: AccountService
		= inject( AccountService );
	private readonly _activatedRoute: ActivatedRoute
		= inject( ActivatedRoute );
	private readonly _router: Router
		= inject( Router );
	private readonly _popupService: CUBPopupService
		= inject( CUBPopupService );
	private readonly _vcRef: ViewContainerRef
		= inject( ViewContainerRef );
	private readonly _dialogService: CUBDialogService
		= inject( CUBDialogService );
	private readonly _renderer: Renderer2
		= inject( Renderer2 );

	constructor() {
		// Add click event listener to the document
		this._renderer.listen('document', 'mousedown', ( event: MouseEvent ) => {
			if (
				this.isMobileMenuVisible
				&& this.mobileMenu
				&& ( event.target as any ).className.includes( 'menu-backdrop' )
			) {
				this.toggleMobileMenu();
			}
		});
	}

	ngOnInit() {
		this._initData();
		this._initSubscription();
		this.changeRoute();
	}

	ngAfterViewInit(): void {

		this._router.events
		.pipe(
			// Filter only NavigationEnd events
			filter( ( event: any ) => event instanceof NavigationEnd ),
			untilCmpDestroyed( this )
		)
		.subscribe( () => {
			this.changeRoute();
		});
	}

	public markForCheck() {
		this._cdRef.markForCheck();
	}

	protected toggleMobileMenu() {
		this.isMobileMenuVisible = !this.isMobileMenuVisible;

		if ( this.isMobileMenuVisible ) {
			this._renderer.addClass( document.body, 'mobile-menu-visible' );
		} else {
			this._renderer.removeClass( document.body, 'mobile-menu-visible' );
		}
	}

	protected changeRoute() {
		setTimeout(() => {
			this.currentMainModule
				= window.location.pathname.split( '/' )[ 1 ];

			this._cdRef.detectChanges();
		}, 300);
	}

	/**
	 * @return {void}
	 */
	protected openExplorePopup() {
		this.accountSettingsMenu?.close();

		if ( this.explorePopup.isOpened ) return;

		this._popupService
		.open(
			this.elementRef.nativeElement,
			this.explorePopup,
			undefined,
			{
				viewContainerRef: this._vcRef,
				hasBackdrop: true,
				offsetY: -12,
				width: '100%',
				position: 'start-below',
			}
		);
	}

	/**
	 * @param {string} lang
	 * @return {void}
	 */
	protected changeLanguage( lang: string ) {
		this.localeService.useLocale( lang );
	}

	/**
	 * @param {string} path
	 * @return {void}
	 */
	protected navigate( path: string ) {
		if ( !path ) return;

		this._handleNavigate( () => this._navigateToPath( path ) );
	}

	/**
	 * @return {void}
	 */
	protected openHamburgerDialog() {
		if ( this.hamburgerDialog?.isOpened ) return;

		this.hamburgerDialog
			= this._dialogService
			.open(
				DialogHamburgerComponent,
				{},
				{
					resizable: true,
					overlayConfig: {
						width: '300px',
						autoFocus: true,
					},
				}
			);

		this.hamburgerDialog
		.afterClosed()
		.pipe( untilCmpDestroyed( this ) )
		.subscribe({
			next: () => this._cdRef.markForCheck(),
		});
	}

	/**
	 * @return {void}
	 */
	protected navigateToMainPath() {
		this._handleNavigate( () => this._navigateToMainPath() );
	}

	/**
	 * @return {void}
	 */
	private _initData() {}

	/**
	 * @return {void}
	 */
	private _initSubscription() {
		this._accountService.storedAccountChange$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( account: Account ) => {
			this.account = account;

			this._cdRef.markForCheck();
		} );

		this._navigationBarService.contentTmp$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( contentTmp: TemplateRef<any> ) => {
			this.contentTmp = contentTmp;

			this._cdRef.markForCheck();
		} );

		this._navigationBarService.canRedirect$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe( ( canRedirect: boolean ) => {
			this.canRedirect = canRedirect;
		} );
	}

	/**
	 * @return {void}
	 */
	private _handleNavigate( navigateFn: () => void ) {
		if ( !this.canRedirect ) {
			this._cubConfirmService
			.open(
				`NAVIGATION.MESSAGE.CANCEL_MESSAGE`,
				'NAVIGATION.MESSAGE.LOST_CURRENT_PROGRESS',
				{
					warning: true,
					buttonApply: {
						text: 'NAVIGATION.LABEL.CONFIRM_CANCEL',
						type: 'destructive',
					},
					buttonDiscard: 'NAVIGATION.LABEL.KEEP',
				}
			)
			.afterClosed()
			.subscribe({
				next: ( answer: boolean ) => {
					if ( !answer ) return;

					navigateFn();
				},
			});
		} else {
			navigateFn();
		}
	}

	/**
	 * @param {string} path
	 * @return {any}
	 */
	private _navigateToPath( path: string ) {
		this._router.navigate(
			[ path ],
			{ relativeTo: this._activatedRoute }
		);

		this._navigationBarService.canRedirect$.next( true );
	}
	/**
	 * @return {any}
	 */
	private _navigateToMainPath() {
		this._router.navigateByUrl( '/' );

		this._navigationBarService.canRedirect$.next( true );
	}

}
