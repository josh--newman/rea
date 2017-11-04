const actions = {
  PLACE: 'PLACE',
  MOVE: 'MOVE',
  ROTATE: 'ROTATE',
  REPORT: 'REPORT'
}

const place = (x, y, facing) => {
  return {
    type: actions.PLACE,
    x,
    y,
    facing
  }
};

const move = () => {
  return {
    type: actions.MOVE
  }
};

const rotate = (direction) => {
  return {
    type: actions.ROTATE,
    direction
  }
};

const report = () => {
  return {
    type: actions.REPORT
  }
};

module.exports = {
  actions,
  place,
  move,
  rotate,
  report
}