import {
	NgModule
} from '@angular/core';
import {
	RouterModule,
	Routes
} from '@angular/router';

import {
	ErrorComponent
} from '@error/components';

import {
	IRouteData
} from '@core';

import {
	CustomPreloadingStrategy
} from './custom-preloading-strategy';
import { loadRemoteModule } from '@angular-architects/module-federation';

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
		loadChildren: () =>
			loadRemoteModule({
				type: 'manifest',
				remoteName: 'panel',
				exposedModule: './Module',
			  }).then((m) => m.PanelModule),
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
