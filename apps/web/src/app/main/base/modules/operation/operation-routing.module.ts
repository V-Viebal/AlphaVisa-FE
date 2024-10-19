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
	CONSTANT as DETAIL_CONSTANT
} from './resources';

import {
	OperationComponent,
	OperationDetailComponent
} from './components';

export const routes: Routes = [
	{
		path		: '',
		component	: OperationComponent,
	},
	{
		path		: `${DETAIL_CONSTANT.PATH.DETAIL}/:id`,
		component	: OperationDetailComponent,
	},
];

@NgModule({
	imports: [ I18nLazyRouterModule.forChild( routes ) ],
	exports: [ I18nLazyRouterModule ],
})
export class OperationRoutingModule {}
