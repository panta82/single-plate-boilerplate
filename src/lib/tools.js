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
