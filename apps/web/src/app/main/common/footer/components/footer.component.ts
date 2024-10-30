import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	inject,
	Input,
	OnInit
} from '@angular/core';

import {
	Unsubscriber
} from '@core';
import { Config } from '@main/base/modules/common/interfaces';

import {
	OperationType
} from '@main/base/modules/operation/interfaces';

@Unsubscriber()
@Component({
	selector		: 'footer-bar',
	templateUrl		: '../templates/footer.pug',
	styleUrls		: [ '../styles/footer.scss' ],
	host			: { class: 'footer' },
	changeDetection	: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent
implements OnInit {

	@Input() public config: Config;

	private readonly _cdRef: ChangeDetectorRef
		= inject( ChangeDetectorRef );
	public readonly elementRef: ElementRef
		= inject( ElementRef );

	protected readonly OPERATION_TYPE: typeof OperationType
		= OperationType;

	ngOnInit() {}

	public markForCheck() {
		this._cdRef.markForCheck();
	}
}
