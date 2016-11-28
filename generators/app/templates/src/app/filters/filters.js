/*
 Filters tutorial:
 https://scotch.io/tutorials/building-custom-angularjs-filters
 */
import moment from 'moment';

export const filters = 'app.filters';

angular.module(filters, [])
	/*
	 Just an example filter, convert timestamp to date using moment library
	 You should _always_ use moment library for working with dates/time
	 */
	.filter('timestampToDate', () =>
		timestamp => moment(timestamp).format('DD.MM.YYYY')
	)
	/*
	 This filter already uses existing filter (currency) and adds 'something' to it
	 You can later you this filter in templates like this: {{ 12345 | myCurrency }}
	 */
	.filter('myCurrency', $filter =>
		input => $filter('currency')(input) + ' something'
	);

/*
 You can find some useful angular filters here:
 https://github.com/a8m/angular-filter
 */