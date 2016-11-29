/*
 Some example end-to-end tests using Protractor
 http://www.protractortest.org/
 */
describe('app', () => {
	it('should show landing', () => {
		// Go to frontpage and wait for angular to load
		browser.get('/');
		browser.waitForAngular();

		// Expect title to contain 'Landing' text
		expect(browser.getTitle()).toContain('Landing');

		// Click on dashboard link
		element(by.css('[ui-sref="home.dashboard"]')).click();
	});

	it('should add user', () => {
		// Add new user
		element(by.css('.adduser')).click();

		element(by.model('$ctrl.user.name')).sendKeys('Testname');
		element(by.model('$ctrl.user.email')).sendKeys('testmail@gmail.com');
		element(by.model('$ctrl.user.age')).sendKeys('25');
		element(by.model('$ctrl.user.website')).sendKeys('http://example.com');

		element(by.css('.saveuser')).click();

		// Expect the count of users to increase by 1
		expect(element.all(by.repeater('user in $ctrl.users')).count()).toEqual(4);

		// Expect entered name to appear in the last row of list
		var addedElement = element.all(by.repeater('user in $ctrl.users')).get(3);
		addedElement.all(by.css('.name')).getText().then(name => {
			expect(name[0]).toEqual('Testname');
		});
	});
});