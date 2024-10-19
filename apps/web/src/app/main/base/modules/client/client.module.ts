import { NgModule } from '@angular/core';

import {
	CoreModule,
	FormModule,
	I18nLazyTranslateModule
} from '@core';

import {
	CUBDividerModule,
	CUBEditorModule,
	CUBImageModule,
	CUBLoadingModule,
	CUBShowMoreModule,
	CUBToastModule
} from '@cub/material';

import {
	ClientComponent,
	ClientDetailComponent
} from './components';
import {
	ClientService
} from './services';
import {
	ClientRoutingModule
} from './client-routing.module';

@NgModule({
	imports: [
		CoreModule,
		FormModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'CLIENT',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		ClientRoutingModule,

		CUBImageModule,
		CUBLoadingModule,
		CUBEditorModule,
		CUBShowMoreModule,
		CUBToastModule,
		CUBDividerModule,
	],
	exports: [
		ClientComponent,
		ClientDetailComponent,
	],
	declarations: [
		ClientComponent,
		ClientDetailComponent,
	],
	providers: [
		ClientService,
	],
})
export class ClientModule {}
