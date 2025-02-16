import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	provideAnimationsAsync
} from '@angular/platform-browser/animations/async';

import {
	CONSTANT,
	CoreModule,
} from '@core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { CUB_LOCAL_FILE_SIZE_LIMIT } from '@cub/material';
import { PanelModule } from './panel/panel.module';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		CoreModule,

		BrowserModule,
		BrowserAnimationsModule,
		CommonModule,
		HttpClientModule,
		AppRoutingModule,

		PanelModule,
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
export class AppModule {}
