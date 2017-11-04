const { expect } = require('chai');
const { position } = require('../reducers');
const { place } = require('../actions');
const { directions } = require('../constants');

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

    describe('place', function() {
      it('ignores placement outside board', function () {
        const state = {
          facing: null,
          x: null,
          y: null
        };
        const action = place(-2, 3, directions.WEST)
        expect(position(state, action)).to.deep.equal(state);
      });

      it('handles placing robot', function() {
        const state = {
          facing: null,
          x: null,
          y: null
        };
        const action = place(3, 3, directions.WEST)
        expect(position(state, action)).to.deep.equal({
          facing: directions.WEST,
          x: 3,
          y: 3
        });
      });
    });
  });
});