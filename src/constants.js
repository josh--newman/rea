const directions = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

const NUM_DIRECTIONS = 4;
// 5 x 5 board means X or Y coords
// can't be below 0 or above 4
const MIN_BOARD = 0;
const MAX_BOARD = 4;

module.exports = {
  directions,
  NUM_DIRECTIONS,
  MIN_BOARD,
  MAX_BOARD
};