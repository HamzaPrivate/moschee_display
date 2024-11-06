import {addZero} from '../src/Utility';

test('adds 0 to number', () => {
  expect(addZero(1)).toBe("01");
});

