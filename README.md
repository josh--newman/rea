# Toy Robot Challenge

## Program components
* File parser
  * Parse lines and convert them into actions
* Actions
  * Standardised action objects for each possible command
* Reducers
  * Return new state based on action
  * Validate commands

## Example state
```js
{
  facing: 'NORTH',
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
