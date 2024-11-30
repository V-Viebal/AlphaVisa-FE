import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
} from '@angular/core';
import {
	ActivatedRoute
} from '@angular/router';
import {
	registry
} from 'app/registry';

@Component({
	selector: 'panel-app-wrapper',
	templateUrl: './panel-app-wrapper.pug',
	styleUrls: ['./panel-app-wrapper.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelAppWrapperComponent implements OnInit {
	public isElementLoaded?: boolean;

	constructor(
		private route: ActivatedRoute,
		private cdr: ChangeDetectorRef
	) {}

	public ngOnInit(): void {
		this.loadElement();
	}

	public loadElement(): void {
		const elementName = this.route.snapshot.data[ 'elementName' ];
		const importName = this.route.snapshot.data[ 'importName' ];

		const importFn = registry[ importName ];
		importFn()
			.then(() => {
				this.isElementLoaded = true;
				this.cdr.detectChanges();
			})
			.catch(( err: Error ) =>
				console.error( `error loading ${elementName}:`, err )
			);
	}
}
