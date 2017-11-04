const { actions } = require('./actions');

function position(state = {}, action) {
  switch(action.type) {
    case actions.PLACE:
      // Don't allow placement outside the board constraints
      if (
        (action.x < 0 || action.x > 4) ||
        (action.y < 0 || action.y > 4)
      ) {
        return state;
      }
      return {
        facing: action.facing,
        x: action.x,
        y: action.y
      }
    default: return state;
  }
}

module.exports = {
  position
};