import {
	NgModule
} from '@angular/core';
// import {
// 	HTTP_INTERCEPTORS
// } from '@angular/common/http';

import {
	CoreModule,
	I18nLazyTranslateModule
} from '@core';

import {
	CUBDrawerModule,
	CUBTooltipModule
} from '@cub/material';

// import {
// 	AuthInterceptor
// } from '@main/auth/interceptors';

import {
	PanelComponent
} from './components';
import {
	PanelRoutingModule
} from './panel-routing.module';
import {
	OperationModule
} from './modules/operation/operation.module';
import {
	NewsModule
} from './modules/news/news.module';
import {
	ClientModule
} from './modules/client/client.module';

@NgModule({
	imports: [
		CoreModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'PANEL',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		PanelRoutingModule,

		OperationModule,
		NewsModule,
		ClientModule,

		CUBTooltipModule,
		CUBDrawerModule,
	],
	exports: [
		PanelComponent,
	],
	declarations: [
		PanelComponent,
	],
	// providers: [
	// 	{
	// 		provide: HTTP_INTERCEPTORS,
	// 		useClass: AuthInterceptor,
	// 		multi: true,
	// 	},
	// ],
})
export class PanelModule {}
