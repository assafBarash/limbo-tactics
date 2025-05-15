# Limbo Tactics

A TypeScript auto-battler game engine that simulates combat between armies of units on a 3D grid.

## Architecture

The engine is divided into three main modules:

### Game Board
- Manages the 3D grid system where combat takes place
- Handles unit placement, movement, and position tracking
- Provides spatial queries like finding units in range
- Maintains the physical state of the battlefield

### Game Engine
- Orchestrates the battle simulation
- Processes unit turns and actions
- Manages game state (turns, victory conditions)
- Handles event dispatching through listeners
- Controls the game loop timing

### Units
- Defines unit types and their capabilities
- Manages unit state (health, position, cooldowns)
- Implements unit behaviors (movement, targeting, combat)
- Provides factory methods for unit creation

## Usage Example

The following example shows how to set up a basic battle between knights and archers:

```typescript
import { GameEngine } from './core/game-engine/service';
import { GameBoard } from './core/game-board/service';
import { createArmy } from './core/unit';

// Create two armies
const army1 = createArmy(['knight', 'knight']);
const army2 = createArmy(['archer', 'archer']);

// Set up the game board
const dimensions = { width: 4, depth: 4 };
const board = GameBoard({ dimensions });

// Initialize the game engine
const game = GameEngine({
  board,
  armies: [army1, army2],
  listeners: {
    onUnitAction: ({ unit, action, target }) => {
      // Handle unit action events
    },
    onTickEnd: ({ armies, board, turn }) => {
      // Handle end of turn events
    }
  }
});

// Start the battle simulation
game.start();
```

The engine will automatically:
- Place units randomly on the board
- Process unit turns (movement and combat)
- Handle combat resolution and unit death
- Check for victory conditions
- Dispatch events for game state changes

## Event Listeners

The engine provides two types of event listeners:

- `onUnitAction`: Triggered when a unit performs an action (attack or move)
- `onTickEnd`: Triggered at the end of each turn with updated game state 