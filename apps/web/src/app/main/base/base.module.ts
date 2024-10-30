import { NgModule } from '@angular/core';

import {
	CoreModule,
	FormModule,
	I18nLazyTranslateModule
} from '@core';

import {
	CUBImageModule,
	CUBLoadingModule,
	CUBScrollBarModule,
	CUBToastModule
} from '@cub/material';

import {
	NavigationBarModule
} from '@main/common/navigation-bar/navigation-bar.module';
import {
	FooterModule
} from '@main/common/footer/footer.module';

import {
	BaseComponent
} from './components';
import {
	BaseRoutingModule
} from './base-routing.module';
import {
	AboutUsModule
} from './modules/about-us/about-us.module';
import {
	ClientModule
} from './modules/client/client.module';
import {
	ContactModule
} from './modules/contact/contact.module';
import {
	HomeModule
} from './modules/home/home.module';
import {
	NewsModule
} from './modules/news/news.module';
import {
	OperationModule
} from './modules/operation/operation.module';
import {
	BaseService
} from './services';
import { ConfigService } from './modules/common/services';

@NgModule({
	imports: [
		CoreModule,
		FormModule,

		I18nLazyTranslateModule.forChild({
			prefix: 'BASE',
			loader: ( lang: string ) =>
				import( `./i18n/${lang}.json` ),
		}),

		CUBImageModule,
		CUBLoadingModule,
		CUBToastModule,
		CUBScrollBarModule,

		BaseRoutingModule,

		NavigationBarModule,
		FooterModule,
		AboutUsModule,
		ClientModule,
		ContactModule,
		HomeModule,
		NewsModule,
		OperationModule,
	],
	exports: [
		BaseComponent,
	],
	declarations: [
		BaseComponent,
	],
	providers: [
		BaseService,
		ConfigService,
	],
})
export class BaseModule {}
