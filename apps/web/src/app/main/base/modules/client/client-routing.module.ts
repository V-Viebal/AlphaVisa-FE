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
	ClientComponent,
	ClientDetailComponent
} from './components';
import {
	CONSTANT
} from './resources';

export const routes: Routes = [
	{
		path		: '',
		component	: ClientComponent,
	},
	{
		path		: `${CONSTANT.PATH.DETAIL}/:id`,
		component	: ClientDetailComponent,
	},
];

@NgModule({
	imports: [ I18nLazyRouterModule.forChild( routes ) ],
	exports: [ I18nLazyRouterModule ],
})
export class ClientRoutingModule {}
