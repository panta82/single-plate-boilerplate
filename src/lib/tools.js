export const generateBlockData = (boilerplate, options) => {
	return boilerplate.blocks.map(block => {
		return {
			...block,
			instructions:
				typeof block.instructions === 'function' ? block.instructions(options) : block.instructions,
			code: typeof block.code === 'function' ? block.code(options) : block.code,
		};
	});
};

export const generateDefaultOptions = boilerplate => {
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
	r.keys().forEach(path => {
		const boilerplate = r(path).default;
		boilerplate.id = path;
		boilerplates.push(boilerplate);
	});
	return boilerplates;
};
