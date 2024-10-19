import {
	NgModule
} from '@angular/core';
import {
	Routes
} from '@angular/router';
import {
	I18nLazyRouterModule
} from 'angular-core';

import {
	ContactComponent
} from './components';

export const routes: Routes = [
	{
		path		: '',
		component	: ContactComponent,
	},
];

@NgModule({
	imports: [ I18nLazyRouterModule.forChild( routes ) ],
	exports: [ I18nLazyRouterModule ],
})
export class ContactRoutingModule {}
