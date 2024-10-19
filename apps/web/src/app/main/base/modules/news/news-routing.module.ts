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
	CONSTANT
} from './resources';

import {
	NewsComponent,
	NewsDetailComponent
} from './components';

export const routes: Routes = [
	{
		path		: '',
		component	: NewsComponent,
	},
	{
		path		: `${CONSTANT.PATH.DETAIL}/:id`,
		component	: NewsDetailComponent,
	},
];

@NgModule({
	imports: [ I18nLazyRouterModule.forChild( routes ) ],
	exports: [ I18nLazyRouterModule ],
})
export class NewsRoutingModule {}
