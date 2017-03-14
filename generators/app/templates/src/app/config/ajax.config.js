export function ajaxConfig($httpProvider) {
	if (!$httpProvider.defaults.headers.get) {
		$httpProvider.defaults.headers.get = {};
	}

    // Disable cache
	$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
	$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';

    // Inteceptors allow us to 'intercept' all AJAX requests, for example for global error handling or authentication
	// More info: https://docs.angularjs.org/api/ng/service/$http
	$httpProvider.interceptors.push(($q, $injector) => {
		return {
			responseError: rejection => {
				if (rejection.status === 403) {
                    // Do something when 403 Forbidden
                    // $injector.get('restService');
				}

				return $q.reject(rejection);
			}
		};
	});
}