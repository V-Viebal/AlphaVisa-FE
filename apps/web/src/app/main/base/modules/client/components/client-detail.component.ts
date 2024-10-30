import {
	Component,
	ChangeDetectionStrategy,
	OnInit,
	ChangeDetectorRef,
	inject,
	AfterViewInit,
	ElementRef,
	Renderer2
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
	ScrollEvent,
	Unsubscriber,
	untilCmpDestroyed,
} from '@core';

import {
	Client
} from '../interfaces';
import {
	ClientService
} from '../services';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BaseService } from '@main/base/services';
import { Email } from '@main/base/interfaces';
import Swal from 'sweetalert2';

@Unsubscriber()
@Component({
	selector		: 'client-detail',
	templateUrl		: '../templates/client-detail.pug',
	styleUrls		: [ '../styles/client-detail.scss' ],
	host			: { class: 'client-detail' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnInit, AfterViewInit {

	protected loaded: boolean;
	protected client: Client;
	protected clients: Client[];
	protected email: Email;
	protected emailForm: FormGroup;
	protected sidebar: HTMLElement;

	private readonly _fb: FormBuilder
		= inject( FormBuilder );
	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	private readonly _clientService: ClientService
		= inject( ClientService );
	private readonly _activatedRoute: ActivatedRoute
		= inject( ActivatedRoute );
	private readonly _baseService: BaseService
		= inject( BaseService );
	private readonly _elementRef: ElementRef
		= inject( ElementRef );
	private readonly _renderer: Renderer2
		= inject( Renderer2 );
	private readonly _resizeObserver: ResizeObserver
		= new ResizeObserver(
			( entries: ResizeObserverEntry[] ) => {
				const float: HTMLElement
					= this._elementRef.nativeElement.querySelector('.float');

				for ( const { contentRect } of entries ) {
					if ( contentRect.width < 1000 ) {
						this._renderer.addClass(
							float,
							'sticky_disable'
						)
					} else {
						this._renderer.removeClass(
							float,
							'sticky_disable'
						)
					}
				}
			}
		);

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

	ngAfterViewInit(): void {
		this.sidebar
			= this._elementRef.nativeElement.querySelector('.float');

		// Observer scroll for element
		this._baseService.footer$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe({
			next: ( footer: IntersectionObserverEntry ) => {
				if ( footer.isIntersecting ) {
					this._renderer.addClass(
						this.sidebar,
						'sticky_bottom'
					);
				} else {
					this._renderer.removeClass(
						this.sidebar,
						'sticky_bottom'
					);
				}
			}
		})

		// Observer scroll for element
		this._baseService.scrollEvent$
		.pipe( untilCmpDestroyed( this ) )
		.subscribe({
			next: ( _event: ScrollEvent ) => {
				this.onWindowScroll( _event );
			},
		});

		// Observer resize for element
		this._resizeObserver.observe( this._elementRef.nativeElement );
	}

	protected onWindowScroll( event: ScrollEvent ): void {
		if ( event.scrollTop > 492 ) {
			if (
				this.sidebar.classList.contains( 'sticky' )
				|| this.sidebar.classList.contains( 'sticky_bottom' )
			) return;

			this._renderer.addClass( this.sidebar, 'sticky' );
		} else if ( this.sidebar.classList.contains( 'sticky' ) ) {
			this._renderer.removeClass( this.sidebar, 'sticky' );
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
				phone: this.emailForm.controls.phone.value.toString(),
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
