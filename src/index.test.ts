import {add} from './index';
describe('addition-tests', () => {
  it('simple addition', () => {
    expect(add(10, 23)).toBe(33);
  });
});
