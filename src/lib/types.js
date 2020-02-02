import { caster, functionize } from './tools';

export class Boilerplate {
	constructor(/** Boilerplate */ source) {
		/**
		 * Primary identifier, derived from file name
		 * @type {undefined}
		 */
		this.id = undefined;

		/**
		 * Big title at top
		 */
		this.title = undefined;

		/**
		 * Subtitle
		 */
		this.description = undefined;

		/** @type BoilerplateField[] */
		this.fields = undefined;

		/** @type BoilerplateBlock[] */
		this.blocks = undefined;

		Object.assign(this, source, {
			fields: ((source && source.fields) || []).map(caster(BoilerplateField)),
			blocks: ((source && source.blocks) || []).map(caster(BoilerplateBlock)),
		});
	}

	generateDefaultOptions() {
		const result = {};
		if (!this.fields) {
			return result;
		}
		this.fields.forEach(field => {
			result[field.key] = field.default || undefined;
		});
		return result;
	}

	generateBlockData(options) {
		return this.blocks.map(block => {
			return {
				...block,
				instructions: block.instructions(options),
				code: block.code(options),
			};
		});
	}
}

export const FIELD_TYPES = {
	TEXT: 'TEXT',
	NUMBER: 'NUMBER',
	TOGGLE: 'TOGGLE',
	SELECT: 'SELECT',
};

export class BoilerplateField {
	constructor(/** BoilerplateField */ source) {
		/**
		 * Identifier of the field. This will be used when creating an options object.
		 */
		this.key = undefined;

		/**
		 * One of FIELD_TYPES
		 */
		this.type = undefined;

		/**
		 * To be displayed above field
		 * @type {string}
		 */
		this.label = undefined;

		/**
		 * In case htis is SELECT
		 * @type {Array<{value, title}>}
		 */
		this.options = undefined;

		/**
		 * Default value
		 */
		this.default = undefined;

		Object.assign(this, source);
		this.options = this.options || [];
	}
}

export class BoilerplateBlock {
	constructor(/** BoilerplateBlock */ source) {
		/**
		 * Title of a code block
		 */
		this.title = undefined;

		/**
		 * Programming language. Shown above and influences syntax highlighting.
		 * https://highlightjs.org/static/demo/
		 * @type {string}
		 */
		this.language = undefined;

		/**
		 * Instructions to be shown underneath the block
		 * @type {function(options)}
		 */
		this.instructions = undefined;

		/**
		 * Content of the block
		 * @type {function(options)}
		 */
		this.code = undefined;

		Object.assign(this, {
			...source,
			instructions: source ? functionize(source.instructions) : () => undefined,
			code: source ? functionize(source.code) : () => undefined,
		});
	}
}
