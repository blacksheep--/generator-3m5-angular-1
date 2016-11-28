var loginData = require('../app/services/loginData.json');

var hasClass = function(element, cls) {
	return element.getAttribute('class').then(function(classes) {
		return classes.split(' ').indexOf(cls) !== -1;
	});
};

describe('app', () => {
	['electricity'].map(commodity => {
		it(commodity + ': login and show navigation', () => {
			if (browser.params.environment == 'dev') {
				browser.get(`/#/${commodity}`);
			} else {
				browser.get(`/eSales/#/${commodity}`);

				browser.waitForAngular();
				expect(browser.getTitle()).toMatch('enviaM applicationcontainer');
				element(by.model('ctrl.loginData.username')).sendKeys(loginData.j_user);
				element(by.model('ctrl.loginData.password')).sendKeys(loginData.j_password);
				element(by.css('.enviam-btn-action')).click();
				browser.sleep(2000);
			}

			expect(browser.getTitle()).toMatch('eSales Strom');
		});

		it(commodity + ': show products table after selecting transactionType & gridArea', () => {
			browser.wait(browser.isElementPresent(by.css('.navigation')), 5000, 'Error: Application loads too long');

			// Select first transactionType
			var transactionType = element(by.model('$ctrl.persistent.transactionType')).click();
			var transactionTypeOptions = transactionType.all(by.css('.ui-select-choices-row'));
			expect(transactionTypeOptions.count()).toBeGreaterThan(0);
			transactionTypeOptions.get(0).click();

			element(by.model('$ctrl.persistent.gridArea')).isPresent().then(function(result) {
				// Select first gridArea
				var gridArea = element(by.model('$ctrl.persistent.gridArea')).click();
				var gridAreaOptions = gridArea.all(by.css('.ui-select-choices-row'));
				expect(gridAreaOptions.count()).toBeGreaterThan(0);
				gridAreaOptions.get(0).click();
			});

			browser.wait(browser.isElementPresent(by.css('.prodtable')), 5000, 'Error: Products table loads too long');
			expect(element.all(by.css('.prodtable-entry')).count()).toBeGreaterThan(0);

			expect(browser.isElementPresent(by.css('.countdown'))).toBeTruthy();
		});

		it(commodity + ': open product details page', () => {
			// Click on the first
			element(by.repeater('(key, product) in $ctrl.products').row(0))
				.element(by.css('.price')).click();

			expect(browser.isElementPresent(by.css('.productdetails'))).toBeTruthy();
		});

		it(commodity + ': check form validation', () => {
			// Try submitting without entring 'Leistung'
			element(by.id('submit')).click();
			expect(hasClass(element(by.css('.form')), 'ng-submitted')).toBeTruthy();
			expect(hasClass(element(by.model('$ctrl.demand')), 'ng-invalid')).toBeTruthy();

			// Try submitting when Leistung is too big
			element(by.model('$ctrl.demand')).sendKeys(123456);
			expect(hasClass(element(by.model('$ctrl.demand')), 'ng-valid')).toBeTruthy();
			element(by.id('submit')).click();
			browser.wait(browser.isElementPresent(by.css('.toast-message')), 5000, 'Error: Demand validation loads too long');
		});

		it(commodity + ': add product to cart', () => {
			// Select first settlementUnit if it exists
			element(by.model('$ctrl.persistent.settlementArea')).isPresent().then(function(result) {
				if (result) {
					var settlementArea = element(by.model('$ctrl.persistent.settlementArea')).click();
					var settlementAreaOptions = settlementArea.all(by.css('.ui-select-choices-row'));
					settlementAreaOptions.get(0).click();
				}
			});

			// Submit form
			element(by.model('$ctrl.demand')).clear().sendKeys(1.001);
			element(by.id('submit')).click();
			browser.wait(browser.isElementPresent(by.css('.orderpreview')), 5000, 'Error: Order preview loads too long');
		});

		it(commodity + ': details page has information', () => {
			var firstRow = element.all(by.css('.panel-row')).get(0);
			expect(firstRow.element(by.css('.panel-row-value')).getInnerHtml()).toBeDefined();
		});

		it(commodity + ': pin validation when entering wrong pin', () => {
			element(by.model('$ctrl.pin')).sendKeys(111111);
			element(by.id('submit')).click();

			browser.wait(browser.isElementPresent(by.css('.toast-message')), 5000, 'Error: Pin validation loads too long');

			expect(element(by.css('.toast-message')).getInnerHtml()).toBe('Die eingegebene PIN ist ungültig.');
		});

		it(commodity + ': order submission', () => {
			element(by.model('$ctrl.pin')).clear().sendKeys(123456);
			element(by.id('submit')).click();
			browser.wait(browser.isElementPresent(by.css('.orderconfirm')), 5000, 'Error: Order confirmation loads too long');
		});
	})
});