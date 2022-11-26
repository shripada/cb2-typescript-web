import {add, multiply, subtract} from './index';

// describe helps to create a test suite.
describe('add tests', () => {
  test('adding 1 to 2 must equal to 3', () => {
    expect(add(1, 2)).toBe(3);
  });
  test('adding -1 to 2 must equal to 1', () => {
    expect(add(-1, 2)).toBe(1);
  });
});

describe('multiply tests', () => {
  test('multiplying 1 to 2 must equal to 2', () => {
    expect(multiply(1, 2)).toBe(2);
  });
  test('multiplying -1 to 2 must equal to -2', () => {
    expect(multiply(-1, 2)).toBe(-2);
  });
});

describe('subtraction tests', () => {
  test('2 - 1 must be 1', () => {
    expect(subtract(2, 1)).toBe(1);
  });
});
