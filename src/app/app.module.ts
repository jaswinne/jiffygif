// Use index.ts files to simplify imports
import {
	HeaderBarComponent,
	ImageCardComponent,
	LoadingBarComponent,
	NoResultsComponent,
	PleaseSearchComponent
} from './components';
import { ResultsPanelComponent, SearchBarComponent } from './containers';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UtilitiesService } from './services';

@NgModule({
	declarations: [
		AppComponent,
		ImageCardComponent,
		LoadingBarComponent,
		HeaderBarComponent,
		NoResultsComponent,
		PleaseSearchComponent,
		ResultsPanelComponent,
		SearchBarComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		FlexLayoutModule,
		MaterialModule,
		BrowserAnimationsModule
	],
	providers: [UtilitiesService],
	bootstrap: [AppComponent]
})
export class AppModule {}
