import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-header-bar',
	templateUrl: './header-bar.component.html',
	styleUrls: ['./header-bar.component.scss']
})
export class HeaderBarComponent implements OnInit {
	@Input() disabled = false;
	@Input() defaultFilterNSFW = false;
	@Input() defaultNumColumns = 1;
	// Setter instead of ngOnChanges
	@Input()
	set maxColumns(max: number) {
		this.columnChoices = [];
		for (let i = 1; i <= max; i++) {
			this.columnChoices.push(i);
		}
	}
	columnChoices: number[];

	@Output() search = new EventEmitter<string>();
	@Output() numColumns = new EventEmitter<number>();
	@Output() filterNSFW = new EventEmitter<boolean>();

	headerForm: FormGroup;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit() {
		this.setupForm();
		this.watchActions();
	}

	setupForm() {
		this.headerForm = this.formBuilder.group({
			filterNSFW: this.formBuilder.control(this.defaultFilterNSFW),
			columnDropdown: this.formBuilder.control(this.defaultNumColumns)
		});
	}

	/**
    Emit to parent container on form changes
  */
	watchActions() {
		this.headerForm.controls.columnDropdown.valueChanges.subscribe((value: number) => {
			this.numColumns.emit(value);
		});
		this.headerForm.controls.filterNSFW.valueChanges.subscribe((value: boolean) => {
			this.filterNSFW.emit(value);
		});
	}

	/**
		Pass through from child (search bar) to parent
	*/
	emitSearch(query: string) {
		this.search.emit(query);
	}
}
