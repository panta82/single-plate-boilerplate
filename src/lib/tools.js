/**
 * @return {Array<Boilerplate>}
 */
export const loadBoilerplates = () => {
	const boilerplates = [];
	const r = require.context('../boilerplates', false, /\.js$/);
	r.keys().forEach(path => {
		const boilerplate = r(path).default;
		boilerplate.id = path;
		boilerplates.push(boilerplate);
	});
	return boilerplates;
};

export function caster(Type) {
	return item => (item instanceof Type ? item : new Type(item));
}

export function functionize(val) {
	if (typeof val === 'function') {
		return val;
	}
	return () => val;
}

export function normalizeCode(code) {
	const lines = code.trim().split('\n');
	const resultLines = [];

	let prevEmpty = false;
	for (let line of lines) {
		line = line.trimRight();

		// Make empty lines at most 2 one after another
		if (!line.trim()) {
			if (prevEmpty) {
				continue;
			}
			prevEmpty = true;
		} else {
			prevEmpty = false;
		}

		resultLines.push(line);
	}

	return resultLines.join('\n');
}
