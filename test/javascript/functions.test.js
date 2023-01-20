/* eslint-env node, jest */

const Functions = require('phpmyadmin/functions');

describe('Functions', () => {
    describe('Testing stringifyJSON', function () {
        test('Should return the stringified JSON input', () => {
            const stringifiedJSON = Functions.stringifyJSON('{ "lang": "php"}', null, 4);
            expect(stringifiedJSON).toEqual('{\n    "lang": "php"\n}');
        });

        test('Should return the input as it is', () => {
            const stringifiedJSON = Functions.stringifyJSON('{ "name": "notvalid}');
            expect(stringifiedJSON).toEqual('{ "name": "notvalid}');
        });
    });
});
