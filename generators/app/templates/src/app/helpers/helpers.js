export function lowercaseFirstLetter(string) {
	return string.charAt(0).toLowerCase() + string.slice(1);
}

export function requireAllComponentsFromDirectory(directory, module) {
	for (var componentPath of directory.keys()) {
		var componentName = Object.keys(directory(componentPath))[0];
		var component = directory(componentPath)[componentName];

		module.component(lowercaseFirstLetter(componentName), component);
	}
}