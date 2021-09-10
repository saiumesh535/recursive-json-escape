import { escapeObject } from '../src/index';

test('Input as an Array', () => {
    const testObject = ['a']
    const result = escapeObject(testObject);
    expect(result.error).toEqual('Input should be an Object');
});

test('Sending empty string', () => {
    const testObject = '';
    const result = escapeObject(testObject as any);
    expect(result.error).toEqual('Input should be an Object');
});

test('Sending null', () => {
    const testObject = null;
    const result = escapeObject(testObject as any);
    expect(result.error).toEqual('Input should be an Object');
});

test('Sending empty object', () => {
    const testObject = {};
    const result = escapeObject(testObject);
    expect(result.result).toEqual({});
});

test('Input as a variable type string', () => {
    const testObject = 'test';
    const result = escapeObject(testObject as any);
    expect(result.error).toEqual('Input should be an Object');
});

test('Input as a variable type number', () => {
    const testObject = 1;
    const result = escapeObject(testObject as any);
    expect(result.error).toEqual('Input should be an Object');
});

test('Check escape character for an Object', () => {
    const testObject = { name: "saiumesh's" };
    const expectedObject = { name: "saiumesh''s" };
    const escaped = escapeObject(testObject);
    expect(escaped.result).toEqual(expectedObject);
});

test('Check escape character for a nested object', () => {
    const testObject = {
        "name": "saiumesh's",
        "data": {
            "name": "Rahul's",
            "one": 1,
            "place": "Hyderabad",
            "address": {
                "name": "Umesh's"
            }
        }
    };
    const expectedObject = {
        "name": "saiumesh''s",
        "data": {
            "name": "Rahul''s",
            "one": 1,
            "place": "Hyderabad",
            "address": {
                "name": "Umesh''s"
            }
        }
    };
    const escaped = escapeObject(testObject);
    expect(escaped.result).toEqual(expectedObject);
});