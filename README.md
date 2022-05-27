# Minesweeper

## About

This is a custom HTML Element for rendering a minesweeper board. This was built around the minesweeper rust wasm project that was created [following the tutorial here (Youtube video)](https://www.youtube.com/watch?v=0ywizYLPV00).

### Running locally

#### Prereqs

- rust and cargo
- wasm-pack
- npm
- npm install serve

#### Running

you can run `npm run start` to build the rust wasm bindings and then start the serve HTTP server for the client files.

## Example

```html
<minesweeper-game
  data="[ [ '🟪', '🟪', '🟪' ], [ '🟪', '🟪', '🟪' ], [ '🟪', '🟪', '🟪' ] ]"
  state="playing"
></minesweeper-game>

<minesweeper-game
  data="[ [ '🟪', '🟪', '🟪' ], [ '🟪', '💣', '🟪' ], [ '🟪', '🟪', '🟪' ] ]"
  state="lost"
></minesweeper-game>

<minesweeper-game
  data="[ [ '1', '1', '1' ], [ '1', '🚩', '1' ], [ '1', '1', '1' ] ]"
  state="won"
></minesweeper-game>
```

## Game Element

The main element is called `minesweeper-game`

### Attributes

#### Data

The `data` attribute is also an accessible property that returns a nested array of arrays with single-character strings. This is the data that describes the board state.

**Values**

`'🟪'` - Unopened mine position

`'🚩'` - Flagged and unopened mine position

`'0'..'8'` - Number of mines arround that opened mine position

`'💣'` - Opened mine

#### State

The `state` attrribute is also accessible as a property that returns a string value of the current state of the game.

**Values**

`'playing'` - The game is currently running

`'won'` - The game has been won, all mines have been found

`'lost'` - The game has been lost and all mines are revealed

### Events

#### Open Menu (clicked on smiley button)

- Event name: `minesweeper-menu`
- Data: none

#### Check Mine (left click on mine position)

- Event name: `minesweeper-check-mine`
- Data: [x, y] position of click as `[number, number]`

#### Flag Mine (right click on mine position)

- Event name: `minesweeper-flag-mine`
- Data: [x, y] position of right-click as `[number, number]`

## Modal Element

the modal element is called `minesweeper-options`

### Events

#### Close Menu (top 'x' button)

- Event name: `minesweeper-menu-close`
- Data: none

#### Submit Form (click on start game button)

- Event name: `minesweeper-options`
- Data: New game inputs as `{ width: number; height: number; mineCount: number }`
