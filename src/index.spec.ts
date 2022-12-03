import { expect } from 'earljs';

import { hello } from './index';

describe('hello', () => {
  it('says hello to the world', () => {
    expect(hello()).toEqual('Hello world!');
  });

  it('says hello to you', () => {
    expect(hello('you')).toEqual('Hello you!');
  });
});
