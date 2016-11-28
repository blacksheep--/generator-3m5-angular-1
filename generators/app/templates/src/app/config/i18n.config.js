// Import translations from a json file
import de from '../i18n/locale.de.json';

export function i18nConfig($translateProvider) {
	// https://angular-translate.github.io/docs/#/guide/19_security
	$translateProvider.useSanitizeValueStrategy('sanitizeParameters');

	$translateProvider.translations('de', de);
	$translateProvider.preferredLanguage('de');
}