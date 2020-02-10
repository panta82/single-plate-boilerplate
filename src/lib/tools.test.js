import { expandString } from './tools';

describe('expandString', () => {
	it('works for $variable', () => {
		expect(expandString('Hey $name', { name: 'Jack', otherName: 'Carl' })).toEqual('Hey Jack');
	});
	it('works for ${variable} and confusing boundaries', () => {
		expect(expandString('Take \\$${amount}!', { amount: 100 })).toEqual('Take $100!');
	});
});
