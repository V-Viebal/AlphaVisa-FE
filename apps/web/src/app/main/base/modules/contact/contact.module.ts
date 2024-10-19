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
	ContactComponent
} from './components';
import {
	ContactRoutingModule
} from './contact-routing.module';
import { CUBToastModule } from '@cub/material';
import { PhoneFormatPipe } from '../common/pipes/phone-format.pipe';

@NgModule({
	imports: [
		CoreModule,
		FormModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'CONTACT',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		CUBImageModule,
		CUBLoadingModule,
		CUBButtonModule,
		CUBToastModule,

		PhoneFormatPipe,

		ContactRoutingModule,
	],
	exports: [
		ContactComponent,
	],
	declarations: [
		ContactComponent,
	],
	providers: [],
})
export class ContactModule {}
