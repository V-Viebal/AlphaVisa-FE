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
	CUBShowMoreModule
} from '@cub/material';

import {
	NewsComponent
} from './components';
import {
	NewsService
} from './services';
import {
	NewsDetailComponent
} from './components/news-detail.component';
import {
	NewsRoutingModule
} from './news-routing.module';

@NgModule({
	imports: [
		CoreModule,
		FormModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'NEWS',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		NewsRoutingModule,

		CUBImageModule,
		CUBLoadingModule,
		CUBShowMoreModule,
		CUBEditorModule,
		CUBDividerModule,
	],
	exports: [
		NewsComponent,
		NewsDetailComponent,
	],
	declarations: [
		NewsComponent,
		NewsDetailComponent,
	],
	providers: [
		NewsService,
	],
})
export class NewsModule {}
