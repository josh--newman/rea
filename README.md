# Toy Robot Challenge

## Approach
This program uses state management concepts borrowed from the [`Redux`](http://redux.js.org/docs/introduction/CoreConcepts.html) philosophy.

### The reducer
The program's state is calculated using a single `reducer`. This reducer is a pure function which takes the previous state and an `action`. The reducer returns a new state based on the given action. It does not mutate the existing state. An example of the state object is given below.

### Actions
The actions are standardised objects which contain the intended manipulation (PLACE, MOVE, LEFT etc.) and any metadata needed (the x,y coordinates for example). An example of the actions are listed below. The actions are parsed from a text file and converted from what's in the file to the standardised object format.

### Calculating state
Calculating state therefore becomes extremely simple. It's simply the set of actions piped through the reducer with each iteration returning a new state object. Put into code:
```js
const finalState = actions.reduce((state, action) => reducer(state, action), initialState)
```

## Tech stack
This program is written using `node v8.9.0`. The main program is pure Javascript and has no dependencies. The tests use `mocha`, `chai` and `sinon`.

## Program components
### The file parser
`src/parser.js`

The parser reads lines from the file and converts them into actions.

### Actions
`src/actions.js`

Standardised action objects for each possible command

### The reducer
`src/reducers.js`

The reducer takes an action and returns new state based on that action. It also handles the basic validation required.


## Example state
```js
{
  facing: 0, // The direction is an "enum" from 0-4, with 0 being NORTH and 4 being WEST
  x: 0,
  y: 1
}
```

## Actions
### PLACE
```js
{
  type: 'PLACE',
  x: 0,
  y: 1,
  facing: 'NORTH'
}
```

### MOVE
```js
{
  type: 'MOVE'
}
```

### ROTATE
```js
{
  type: 'ROTATE',
  direction: 'LEFT' // or RIGHT
}
```

### REPORT
```js
{
  type: 'REPORT'
}
```

## Running
To run the program:

`yarn start '<path_to_input_file>'` OR

`npm start '<path_to_input_file>'`

There are six example input files you can use to test in the `examples/` folder.

## Testing
To run the tests:

`yarn && yarn test` OR

`npm install && npm test`
