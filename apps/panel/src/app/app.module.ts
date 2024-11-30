import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { createCustomElement } from '@angular/elements';
import {
	provideAnimationsAsync
} from '@angular/platform-browser/animations/async';

import {
	CONSTANT,
	CoreModule,
} from '@core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { PanelComponent } from './panel/components';
import { CUB_LOCAL_FILE_SIZE_LIMIT } from '@cub/material';

@NgModule({
	declarations: [
		AppComponent,
		PanelComponent,
	],
	imports: [
		CoreModule,

		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		HttpClientModule,
		AppRoutingModule,
	],
	providers: [
		{
			provide: CUB_LOCAL_FILE_SIZE_LIMIT,
			useValue: CONSTANT.ALLOW_FILE_SIZE,
		},
		provideAnimationsAsync(),
	],
	bootstrap: [ AppComponent ],
})
export class AppModule implements DoBootstrap {
	constructor(private injector: Injector) {}

	public ngDoBootstrap(): void {
		const ce = createCustomElement(AppComponent, {
			injector: this.injector,
		});
		customElements.define('panel-app', ce);
		// <panel-app></panel-app>
	}
}
