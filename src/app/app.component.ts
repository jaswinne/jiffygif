import { Component, HostListener } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material';

import { GiphyService } from './services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	providers: [GiphyService]
})
export class AppComponent {
	query = '';
	results = [];
	numColumns = 1;
	MAX_COLUMNS = 7;
	filterNSFW = false;
	isLoadingMore = false;
	noMoreResults = false;
	noResults = false;
	snackbarRef: MatSnackBarRef<any>;

	constructor(private giphyService: GiphyService, public snackbar: MatSnackBar) {}

	search(query, offset = 0) {
		if (query.length === 0) {
			// unload everything if the search is empty
			this.results = [];
			this.noMoreResults = false;
			this.noResults = false;
			this.isLoadingMore = false;
			this.query = query;
		} else if (!this.isLoadingMore && !(this.query === query && this.noMoreResults)) {
			// unset all status variables before loading
			this.noMoreResults = false;
			this.noResults = false;
			this.query = query;
			this.isLoadingMore = true;

			this.giphyService.searchGif(this.query, offset).subscribe(
				(result) => {
					this.onSearchSuccess(result, offset);
				},
				(error) => {
					this.isLoadingMore = false;
					this.openSnackBar('A network error has occurred!');
				}
			);
		}
	}

	onSearchSuccess(result, offset) {
		this.isLoadingMore = false;
		// replace results if a new search, else concatenate
		if (offset === 0) {
			this.results = result.data;
		} else {
			this.results = this.results.concat(result.data);
		}
		if (result.data.length === 0) {
			if (this.results.length === 0) {
				this.noResults = true;
			} else {
				this.noMoreResults = true;
				this.openSnackBar('No more results!');
			}
		}
	}

	changeNumColumns(numColumns: number) {
		this.numColumns = numColumns;
	}

	changeFilterNSFW(filter: boolean) {
		this.filterNSFW = filter;
	}

	loadMore() {
		this.search(this.query, this.results.length);
	}

	/**
		Don't show the load more button when you can scroll,
		there aren't anymore results, and there are no results, and not currently loading
		This button is implemented because sometimes there are too many columns
		and the first load doesn't make it scrollable
	*/
	showLoadMoreButton() {
		return !(
			this.canScroll() ||
			this.results.length === 0 ||
			this.noMoreResults ||
			this.isLoadingMore
		);
	}

	/**
		listener on <main> in the template to detect if the scroll event took it to the bottom
	*/
	onScroll($event: Event): void {
		if (
			$event.srcElement.scrollHeight -
				$event.srcElement.clientHeight -
				$event.srcElement.scrollTop <
			10
		) {
			this.search(this.query, this.results.length);
			/* Keeps it from sticking at the bottom when more get added to the results
			panel and causing another load more*/
			$event.srcElement.scrollTop -= 1;
		}
	}

	/**
	A bit of a hack because scrollHeight and clientHeight weren't playing nice
	for comparisons to see if the <main> actually was scrollable or not
	*/
	canScroll() {
		return (this.numColumns >= 5 && this.results.length > 20) || this.numColumns < 5;
	}

	openSnackBar(message: string, time: number = 5000) {
		this.snackbarRef = this.snackbar.open(message, '', {
			duration: time
		});
	}
}
