export const generateBlockData = (boilerplate, options) => {
	return boilerplate.blocks.map((block) => {
		return {
			...block,
			code: block.code(options)
		};
	});
};

export const generateDefaultOptions = (boilerplate) => {
	const result = {};
	if (!boilerplate.options) {
		return result;
	}
	boilerplate.options.forEach(option => {
		result[option.key] = option.default;
	});
	return result;
};

export const loadBoilerplates = () => {
	const boilerplates = [];
	const r = require.context('../boilerplates', false, /\.js$/);
	r.keys().forEach(key => {
		boilerplates.push(r(key).default);
	});
	return boilerplates;
};