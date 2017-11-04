const { expect } = require('chai');
const { place, move, rotate } = require('../actions');
const { directions } = require('../constants');

describe('actions', function() {
  describe('place', function() {
    it('forms a `place` action object', function() {
      expect(place(1, 1, directions.NORTH)).to.deep.equal({
        type: 'PLACE',
        x: 1,
        y: 1,
        facing: directions.NORTH
      });
    });
  });

  describe('move', function () {
    it('forms a `move` action object', function () {
      expect(move()).to.deep.equal({
        type: 'MOVE'
      });
    });
  });

  describe('rotate', function () {
    it('forms a `rotate` action object', function () {
      expect(rotate('LEFT')).to.deep.equal({
        type: 'ROTATE',
        direction: 'LEFT'
      });
    });
  });
});