import {
	NgModule
} from '@angular/core';
import {
	Routes
} from '@angular/router';

import {
	I18nLazyRouterModule
} from '@core';

import {
	CONSTANT as CLIENT_CONSTANT
} from '@main/base/modules/client/resources';
import {
	CONSTANT as NEWS_CONSTANT
} from '@main/base/modules/news/resources';
import {
	CONSTANT as OPERATION_CONSTANT
} from '@main/base/modules/operation/resources';
import {
	CONSTANT as CONTACT_CONSTANT
} from '@main/base/modules/contact/resources';
import {
	CONSTANT as ABOUT_US_CONSTANT
} from '@main/base/modules/about-us/resources';
import {
	BaseComponent
} from './components';

export const routes: Routes = [
	{
		path		: '',
		component	: BaseComponent,
		children	: [
			{
				path		: '',
				loadChildren: () =>
					import( './modules/home/home.module' )
					.then( ( m: any ) => m.HomeModule ),
				data		: { preload: true },
			},
			{
				path		: OPERATION_CONSTANT.PATH.MAIN,
				loadChildren: () =>
					import( './modules/operation/operation.module' )
					.then( ( m: any ) => m.OperationModule ),
				data		: { preload: true },
			},
			{
				path		: CLIENT_CONSTANT.PATH.MAIN,
				loadChildren: () =>
					import( './modules/client/client.module' )
					.then( ( m: any ) => m.ClientModule ),
				data		: { preload: true },
			},
			{
				path		: NEWS_CONSTANT.PATH.MAIN,
				loadChildren: () =>
					import( './modules/news/news.module' )
					.then( ( m: any ) => m.NewsModule ),
				data		: { preload: true },
			},
			{
				path		: CONTACT_CONSTANT.PATH.MAIN,
				loadChildren: () =>
					import( './modules/contact/contact.module' )
					.then( ( m: any ) => m.ContactModule ),
				data		: { preload: true },
			},
			{
				path		: ABOUT_US_CONSTANT.PATH.MAIN,
				loadChildren: () =>
					import( './modules/about-us/about-us.module' )
					.then( ( m: any ) => m.AboutUsModule ),
				data		: { preload: true },
			},
		],
	},
];

@NgModule({
	imports: [ I18nLazyRouterModule.forChild( routes ) ],
	exports: [ I18nLazyRouterModule ],
})
export class BaseRoutingModule {}
