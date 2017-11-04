const { expect } = require('chai');
const { position } = require('../reducers');
const { place, move, rotate } = require('../actions');
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

    describe('move', function() {
      it('ignores moves that would cause robot to fall', function() {
        const state = {
          facing: directions.WEST,
          x: 0,
          y: 0
        };
        const action = move();
        expect(position(state, action)).to.deep.equal(state);
      });

      it('moves robot one position', function () {
        const state = {
          facing: directions.EAST,
          x: 1,
          y: 1
        };
        const action = move();
        expect(position(state, action)).to.deep.equal({
          facing: directions.EAST,
          x: 2,
          y: 1
        });
      });
    });

    describe('rotate', function() {
      it('ignores invalid rotation commands', function() {
        const state = {
          facing: directions.EAST,
          x: 2,
          y: 1
        };
        const action = rotate('FOO');
        expect(position(state, action)).to.deep.equal(state);
      });

      it('rotates robot correctly left', function () {
        const state = {
          facing: directions.NORTH,
          x: 0,
          y: 0
        };
        const action = rotate('LEFT');
        expect(position(state, action)).to.deep.equal({
          ...state,
          facing: directions.WEST
        });
      });

      it('rotates robot correctly right', function () {
        const state = {
          facing: directions.WEST,
          x: 0,
          y: 0
        };
        const action = rotate('RIGHT');
        expect(position(state, action)).to.deep.equal({
          ...state,
          facing: directions.NORTH
        });
      });
    });
  });
});