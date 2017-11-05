const { parseFileToActions } = require('./src/parser');
const { calculateState } = require('./src/reducers');

const actions = parseFileToActions('./src/__tests__/examples/exampleA.txt');
calculateState(actions); // A REPORT action will internally log state
process.exit(0);