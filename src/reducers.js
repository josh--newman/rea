const { actions } = require('./actions');
const { directions } = require('./constants');

// Checks to see if coords are outside the board
function isOutsideBounds(x, y) {
  return (
    (x < 0 || x > 4) ||
    (y < 0 || y > 4)
  )
}

function position(state = {}, action) {
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
    default: return state;
  }
}

module.exports = {
  isOutsideBounds,
  position
};