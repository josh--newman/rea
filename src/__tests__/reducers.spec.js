const { expect } = require('chai');
const { spy } = require('sinon');
const {
  isOutsideBounds,
  isNotYetPlaced,
  position,
  calculateState
} = require('../reducers');
const { place, move, rotate, report } = require('../actions');
const { directions } = require('../constants');
const parser = require('../parser');

describe('reducers', function() {
  describe('isOutsideBounds', function() {
    it('returns true if x,y is outside bounds', function() {
      expect(isOutsideBounds(-1, 3)).to.equal(true);
      expect(isOutsideBounds(-1, -5)).to.equal(true);
      expect(isOutsideBounds(1, -5)).to.equal(true);
    });

    it('returns false if x,y is inside bounds', function() {
      expect(isOutsideBounds(1, 3)).to.equal(false);
      expect(isOutsideBounds(4, 4)).to.equal(false);
      expect(isOutsideBounds(3, 1)).to.equal(false);
    });
  });

  describe('isNotYetPlaced', function() {
    it('calculates if robot not placed', function() {
      const state = {
        facing: null,
        x: null,
        y: null
      }
      expect(isNotYetPlaced(state)).to.equal(true);
    });
  });

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
      it('ignores move if robot not yet placed', function() {
        const state = {
          facing: null,
          x: null,
          y: null
        };
        const action = move();
        expect(position(state, action)).to.deep.equal(state);
      });

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
      it('ignores rotate if robot not yet placed', function () {
        const state = {
          facing: null,
          x: null,
          y: null
        };
        const action = rotate('LEFT');
        expect(position(state, action)).to.deep.equal(state);
      });

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

    describe('report', function() {
      it('reports state to console', function() {
        const _reportToConsole = spy();
        const state = {
          facing: directions.WEST,
          x: 0,
          y: 0
        };
        const action = report();
        expect(position(state, action, { _reportToConsole }))
          .to.deep.equal(state);
        expect(_reportToConsole).to.have.been.calledOnce;
        expect(_reportToConsole).to.have.been.calledWith(state);
      });
    });

    describe('calculateState', function() {
      it('calculates state given a set of actions', function() {
        // Example A
        const actionsA = [
          place(0, 0, directions.NORTH),
          move()
        ];
        expect(calculateState(actionsA)).to.deep.equal({
          facing: directions.NORTH,
          x: 0,
          y: 1
        });

        // Example B
        const actionsB = [
          place(0, 0, directions.NORTH),
          rotate('LEFT')
        ];
        expect(calculateState(actionsB)).to.deep.equal({
          facing: directions.WEST,
          x: 0,
          y: 0
        });

        // Example C
        const actionsC = [
          place(1, 2, directions.EAST),
          move(),
          move(),
          rotate('LEFT'),
          move()
        ];
        expect(calculateState(actionsC)).to.deep.equal({
          facing: directions.NORTH,
          x: 3,
          y: 3
        });
      });
    });
  });
});