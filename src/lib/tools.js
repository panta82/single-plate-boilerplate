export const generateBlockData = (boilerplate, options) => {
	return boilerplate.blocks.map((block) => {
		return {
			...block,
			code: block.code(options)
		};
	});
};

export const loadBoilerplates = () => {
	const boilerplates = [];
	const r = require.context('../boilerplates', false, /\.js$/);
	r.keys().forEach(key => {
		boilerplates.push(r(key).default);
	});
	return boilerplates;
};