import {
	MatAutocompleteModule,
	MatButtonModule,
	MatCardModule,
	MatCheckboxModule,
	MatGridListModule,
	MatIconModule,
	MatInputModule,
	MatProgressBarModule,
	MatSelectModule,
	MatSnackBarModule
} from '@angular/material';

import { NgModule } from '@angular/core';

/**
	Module to encompass all of the individual Angular Material Modules
*/
@NgModule({
	imports: [
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSnackBarModule
	],
	exports: [
		MatAutocompleteModule,
		MatButtonModule,
		MatCardModule,
		MatCheckboxModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatProgressBarModule,
		MatSelectModule,
		MatSnackBarModule
	]
})
export class MaterialModule {}
