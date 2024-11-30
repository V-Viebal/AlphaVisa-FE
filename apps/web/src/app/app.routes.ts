import {
	NgModule
} from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';
import {
	loadRemoteModule
} from '@angular-architects/module-federation';

import {
	ErrorComponent
} from '@error/components';

import {
	IRouteData
} from '@core';

import {
	PanelAppWrapperComponent
} from '@main/panel-app-wrapper/panel-app-wrapper.component';

import {
	CustomPreloadingStrategy
} from './custom-preloading-strategy';

const routeData: IRouteData = { cache: false };
const routes: Routes = [
	{
		path: '',
		loadChildren: () =>
			import( './main/base/base.module' )
			.then( ( m: any ) => m.BaseModule ),
		data: { preload: true, ...routeData },
	},
	{
		path: 'panel',
		component: PanelAppWrapperComponent,
		data: { importName: 'panelApp', elementName: 'panel-app' },
	},
	{
		path		: '**',
		component	: ErrorComponent,
		data		: routeData,
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			routes,
			{
				preloadingStrategy: CustomPreloadingStrategy,
				scrollPositionRestoration: 'enabled',
				enableViewTransitions: true,
			}
		),
	],
	exports		: [ RouterModule ],
	providers	: [ CustomPreloadingStrategy ],
})
export class AppRoutingModules {}
