import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UtilitiesService } from './utilities.service';
@Injectable()
export class GiphyService {
	GIPHY_URL = 'https://api.giphy.com/v1/gifs/search';
	GIPHY_API_KEY = 'dc6zaTOxFJmzC';
	RESULTS_LIMIT = 20;

	constructor(private http: HttpClient, private utilities: UtilitiesService) {}

	searchGif(query, startIndex = 0): Observable<any> {
		const qs = this.utilities.generateQueryString({
			api_key: this.GIPHY_API_KEY,
			q: query,
			limit: this.RESULTS_LIMIT,
			offset: startIndex
		});
		return this.http.get(`${this.GIPHY_URL}${qs}`);
	}
}
