import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './panel/components';

const routes: Routes = [
	{
		path: 'panel',
		component: PanelComponent,
	},
];

@NgModule({
	imports: [ RouterModule.forRoot( routes ) ],
	exports: [ RouterModule ],
})
export class AppRoutingModule {}
