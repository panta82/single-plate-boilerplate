export const generateBlockData = (boilerplate, options) => {
	return boilerplate.blocks.map((block) => {
		return {
			...block,
			code: block.code(options)
		};
	});
};