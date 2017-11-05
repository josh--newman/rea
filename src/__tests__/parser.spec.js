const { expect } = require('chai');
const { spy } = require('sinon');
const {
  formatState,
  reportToConsole,
  parseLine,
  parseFileToActions
} = require('../parser');
const actions = require('../actions');

describe('parser', function() {
  describe('formatState', function() {
    it('turns state object into formatted string', function() {
      const state = {
        facing: 0,
        x: 3,
        y: 4
      };
      expect(formatState(state)).to.equal('3,4,NORTH');
    });
  });

  describe('reportToConsole', function() {
    it('reports formatted string, not state object', function() {
      const state = {
        facing: 2,
        x: 0,
        y: 3
      };
      const _formatState = spy(() => '0,3,EAST');
      const _console = { log: spy() };
      reportToConsole(state, {
        _formatState,
        _console
      });
      expect(_formatState).to.have.been.calledWith(state);
      expect(_console.log).to.have.been.calledWith('0,3,EAST');
    });
  });

  describe('parseLine', function() {
    it('parses a PLACE command', function() {
      const line = 'PLACE 2,2,NORTH';
      const result = parseLine(line);
      expect(result).to.deep.equal(actions.place(2,2,0));
    });

    it('parses a MOVE command', function () {
      const line = 'MOVE';
      const result = parseLine(line);
      expect(result).to.deep.equal(actions.move());
    });

    it('parses a LEFT command', function () {
      const line = 'LEFT';
      const result = parseLine(line);
      expect(result).to.deep.equal(actions.rotate('LEFT'));
    });

    it('parses a RIGHT command', function () {
      const line = 'RIGHT';
      const result = parseLine(line);
      expect(result).to.deep.equal(actions.rotate('RIGHT'));
    });

    it('parses a REPORT command', function () {
      const line = 'REPORT';
      const result = parseLine(line);
      expect(result).to.deep.equal(actions.report());
    });
  });

  describe('parseFileToActions', function () {
    it('reads a file', function () {
      const data = `
        PLACE 0,0,NORTH
        MOVE
        REPORT
      `;
      const _readFileSync = spy(() => data);
      const result = parseFileToActions('./foobar.txt', { _readFileSync });
      expect(_readFileSync).to.have.been.calledWith(
        './foobar.txt',
        'utf8'
      );
    });

    it('returns standard actions by parsing a file', function() {
      const data = `
        PLACE 0,0,NORTH
        MOVE
        REPORT
      `;
      const _readFileSync = spy(() => data);
      const result = parseFileToActions('./foobar.txt', { _readFileSync });
      expect(result).to.deep.equal([
        actions.place(0,0,0),
        actions.move(),
        actions.report()
      ]);
    });

    it('parses each line and ignores empty lines', function() {
      const data = `
        PLACE 0,0,WEST
        MOVE
        LEFT
        RIGHT    
        REPORT   



      `;
      const _readFileSync = spy(() => data);
      const _parseLine = spy();
      const result = parseFileToActions(
        './foobar.txt',
        { _readFileSync, _parseLine }
      );
      expect(_parseLine).to.have.been.called;
    });

    it('ignores invalid lines', function() {
      const data = `
        PLACE 0,0,WEST
        FOOBAR
        LEFT
        RIGHT
        REPORT
      `;
      const _readFileSync = spy(() => data);
      const _console = { log: spy() };
      const result = parseFileToActions(
        './foobar.txt',
        { _readFileSync, _console }
      );
      expect(result).to.deep.equal([
        actions.place(0, 0, 3),
        actions.rotate('LEFT'),
        actions.rotate('RIGHT'),
        actions.report()
      ]);
      expect(_console.log).to.have.been.calledWith(
        'Ignored invalid command at line 2'
      )
    });
  });
});