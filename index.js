const { parseFileToActions } = require('./src/parser');
const { calculateState } = require('./src/reducers');

const filePath = process.argv[2];
if (!filePath) {
  console.error('ERROR: Please provide a file path.');
  process.exit(1);
}
const actions = parseFileToActions(filePath);
calculateState(actions); // A REPORT action will internally log state
process.exit(0);