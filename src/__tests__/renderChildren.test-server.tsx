import {createElement as h} from 'react';
import {expect} from 'chai';
import renderChildren from '../renderChildren';

describe('renderChildren() SSR', () => {
  it('exists and does not crash', () => {
    expect(typeof renderChildren).to.equal('function');
  })
});
