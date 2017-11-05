const fs = require('fs');
const { directions } = require('./constants');
const actions = require('./actions');

function formatState(state) {
  const direction = Object.keys(directions)
    // Find the "display name" of the direction given the value
    // e.g: 2 will return "EAST"
    .find(key => directions[key] === state.facing);

  return `${state.x},${state.y},${direction}`;
}

function reportToConsole(state, {
  // Dependency injection
  _formatState = formatState,
  _console = console
} = {}) {
  const formatted = _formatState(state);
  _console.log(formatted);
}

function parseLine(line) {
  const tokens = line.split(' ');
  let action = {};
  switch (tokens[0]) {
    case 'PLACE':
      const [x, y, facing] = tokens[1].split(',');
      return actions.place(
        parseInt(x, 10),
        parseInt(y, 10),
        directions[facing]
      )

    case 'MOVE':
      return actions.move();

    case 'LEFT':
    case 'RIGHT':
      const direction = tokens[0];
      return actions.rotate(direction);

    case 'REPORT':
      return actions.report();

    default: return null;
  }
}

function parseFileToActions(path, {
  // Dependency injection
  _readFileSync = fs.readFileSync,
  _parseLine = parseLine,
  _console = console
} = {}) {
  const invalidLineMessage = (lineNum) => `Ignored invalid command at line ${lineNum+1}`
  const data = _readFileSync(path, 'utf8');
  const actionList = data.split('\n')
    // trim whitespace from line
    .map(l => l.trim())
    // filter out any empty lines
    .filter(l => l)
    // Turn each line into standard action object
    .map((l, i) => {
      try {
        const action = _parseLine(l);
        if (!action) {
          _console.log(invalidLineMessage(i));
        }
        else return action;
      }
      catch (err) {
        _console.log(invalidLineMessage(i));
        return null;
      }
    })
    // filter out any `null` actions
    .filter(l => l);
  
  return actionList;
}

module.exports = {
  formatState,
  reportToConsole,
  parseLine,
  parseFileToActions
}