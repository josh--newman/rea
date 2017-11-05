const { actions } = require('./actions');
const { directions } = require('./constants');
const { reportToConsole } = require('./parser');

const INITIAL_STATE = {
  facing: null,
  x: null,
  y: null
}

// Checks to see if coords are outside the board
function isOutsideBounds(x, y) {
  return (
    (x < 0 || x > 4) ||
    (y < 0 || y > 4)
  )
}

function isNotYetPlaced(state) {
  return !state.facing && !state.x && !state.y
}

function position(state = INITIAL_STATE, action, {
  // dependency injection
  _reportToConsole = reportToConsole
} = {}) {
  switch(action.type) {
    case actions.PLACE:
      // Don't allow placement outside the board constraints
      if (isOutsideBounds(action.x, action.y)) {
        return state;
      }
      return {
        facing: action.facing,
        x: action.x,
        y: action.y
      }

    case actions.MOVE:
      // Ignore if not placed
      if (isNotYetPlaced(state)) return state;

      // Calculate new X and Y coords
      // based on direction 
      let newX = state.x;
      if (state.facing === directions.EAST) {
        newX = state.x + 1;
      }
      else if (state.facing === directions.WEST) {
        newX = state.x - 1;
      }

      let newY = state.y;
      if (state.facing === directions.NORTH) {
        newY = state.y + 1;
      }
      else if (state.facing === directions.SOUTH) {
        newY = state.y - 1;
      }

      // Ignore move if going outside bounds
      if (isOutsideBounds(newX, newY)) {
        return state;
      }
      else {
        return {
          ...state,
          x: newX,
          y: newY
        }
      }

    case actions.ROTATE:
      // Ignore if not placed
      if (isNotYetPlaced(state)) return state;

      let facing = state.facing;
      if (action.direction === 'LEFT') {
        // Using the directions constant enum
        // NORTH is 1 and WEST is 4
        // Checking for 0 is a special case for turning NORTH to WEST (left)
        facing = (state.facing - 1) === 0 ?
          directions.WEST : (state.facing - 1)
      }
      else if (action.direction === 'RIGHT') {
        // Modulus ensures "circular" movement
        // Example: moving WEST (4) to NORTH (1)
        // (4 + 1) % 4 === 1
        facing = (state.facing + 1) % 4
      }
      return {
        ...state,
        facing
      };

      case actions.REPORT:
        // No state manipulation here
        // Just report to stdout
        _reportToConsole(state);
        return state;
    default: return state;
  }
}

function calculateState(actions, initialState = INITIAL_STATE) {
  return actions.reduce((state, action) => {
    return position(state, action)
  }, initialState)
}

module.exports = {
  isOutsideBounds,
  isNotYetPlaced,
  position,
  calculateState
};