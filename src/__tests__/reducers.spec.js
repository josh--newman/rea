const { expect } = require('chai');
const { position } = require('../reducers');

describe('reducers', function() {
  describe('position', function() {
    it('returns state', function() {
      const state = {
        facing: 'NORTH',
        x: 0,
        y: 1
      };
      expect(position(state, {})).to.deep.equal(state);
    });
  });
});