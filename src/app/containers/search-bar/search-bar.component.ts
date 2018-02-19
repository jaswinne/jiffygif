import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
	@Input() disabled = false;

	@Output() search = new EventEmitter<string>();

	history = new Set<string>();
	filteredOptions: Observable<string[]>;

	searchForm: FormGroup;
	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.setupForm();
		this.watchActions();
	}

	setupForm() {
		this.searchForm = this.formBuilder.group({
			query: this.formBuilder.control('')
		});
	}

	watchActions() {
		this.filteredOptions = this.searchForm.controls.query.valueChanges.pipe(
			startWith(''),
			map((val) => this.filterHistory(val))
		);
	}

	/**
		Takes all history and filters to matches to the beginning of the current query
	*/
	filterHistory(val: string): string[] {
		if (val.length === 0) {
			return [];
		}
		return Array.from(this.history).filter(
			(option) => option.toLowerCase().indexOf(val.toLowerCase()) === 0
		);
	}

	clearHistory() {
		this.history = new Set<string>();
	}

	emitSearch() {
		const query = this.searchForm.controls.query.value;
		if (query.length > 0) {
			this.history.add(query);
		}
		this.search.emit(query);
	}
}
