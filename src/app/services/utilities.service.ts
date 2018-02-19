import { Injectable } from '@angular/core';

@Injectable()
export class UtilitiesService {
	constructor() {}

	/**
    Turns an object into GET url params string
  */
	generateQueryString(params: any) {
		let queryString = '';
		Object.keys(params).forEach((key) => {
			if (params.hasOwnProperty(key)) {
				queryString += `${queryString.length > 0 ? '&' : '?'}${key}=${params[key]}`;
			}
		});
		return queryString;
	}
}
