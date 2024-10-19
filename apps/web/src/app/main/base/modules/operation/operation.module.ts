import { NgModule } from '@angular/core';

import {
	CoreModule,
	FormModule,
	I18nLazyTranslateModule
} from '@core';

import {
	CUBEditorModule,
	CUBImageModule,
	CUBLoadingModule,
	CUBShowMoreModule
} from '@cub/material';

import {
	OperationComponent,
	OperationDetailComponent
} from './components';
import {
	OperationRoutingModule
} from './operation-routing.module';
import {
	OperationService
} from './services';

@NgModule({
	imports: [
		CoreModule,
		FormModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'OPERATION',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		CUBEditorModule,
		CUBImageModule,
		CUBShowMoreModule,
		CUBLoadingModule,

		OperationRoutingModule,
	],
	exports: [
		OperationComponent,
		OperationDetailComponent,
	],
	declarations: [
		OperationComponent,
		OperationDetailComponent,
	],
	providers: [
		OperationService,
	],
})
export class OperationModule {}
