import { NgModule } from '@angular/core';

import {
	CoreModule,
	FormModule,
	I18nLazyTranslateModule
} from '@core';

import {
	CUBButtonModule
} from '@cub/material/button';
import {
	CUBImageModule
} from '@cub/material/image';
import {
	CUBLoadingModule
} from '@cub/material/loading';

import {
	AboutUsComponent
} from './components';
import {
	AboutUsRoutingModule
} from './about-us-routing.module';

@NgModule({
	imports: [
		CoreModule,
		FormModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'ABOUT_US',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		CUBImageModule,
		CUBLoadingModule,
		CUBButtonModule,

		AboutUsRoutingModule,
	],
	exports: [
		AboutUsComponent,
	],
	declarations: [
		AboutUsComponent,
	],
	providers: [],
})
export class AboutUsModule {}
