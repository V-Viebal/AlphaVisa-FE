import {
	ChangeDetectionStrategy,
	Component,
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

	protected readonly OPERATION_TYPE: typeof OperationType
		= OperationType;

	ngOnInit() {
	}

}
