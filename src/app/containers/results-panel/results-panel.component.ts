import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-results-panel',
	templateUrl: './results-panel.component.html',
	styleUrls: ['./results-panel.component.scss']
})
export class ResultsPanelComponent {
	/**
		Setters instead of ngOnChanges so on parameter changes it updates the columns of data
	*/
	@Input()
	set numColumns(num: number) {
		this._numColumns = num;
		this.setupColumns();
	}
	get numColumns() {
		return this._numColumns;
	}
	private _numColumns: number;

	@Input()
	set results(data: any[]) {
		this._results = data;
		this.setupColumns();
	}
	get results() {
		return this._results;
	}
	private _results: any[] = [];

	@Input()
	set filterNSFW(filter: boolean) {
		this._filterNSFW = filter;
		this.setupColumns();
	}
	get filterNSFW() {
		return this._filterNSFW;
	}
	private _filterNSFW = false;

	columns = [];

	constructor() {}

	/**
		Take the data and put it into column to stagger the bottoms of the gifs
	*/
	setupColumns() {
		this.columns = [];
		for (let i = 0; i < this.numColumns; i++) {
			this.columns.push({ results: [], height: 0, index: i });
		}
		this.results
			.filter(
				(result) => !(this.filterNSFW && (result.rating === 'r' || result.rating === 'pg-13'))
			)
			.forEach((result: any, index: number) => {
				const height = this.normalizeHeight(result);
				const column = this.pickColumn(height);
				column.results.push(result);
				column.height += height;
			});
	}

	/**
		 In an effort to keep the columns roughly the same height, and flat-ish across the bottom
		 due to varying heights of images, this function just always picks the column that is the shortest
	 */
	pickColumn(height: number) {
		return this.columns.reduce((acc, curr) => (curr.height < acc.height ? curr : acc));
	}

	/**
		This gets the height as a ratio to width, so that it works for comparisons all column widths
	*/
	private normalizeHeight(result: any) {
		return result.images.original.height / result.images.original.width;
	}
}
