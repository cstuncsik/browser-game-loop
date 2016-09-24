[![Build Status](https://travis-ci.org/cstuncsik/browser-game-loop.svg?branch=master)](https://travis-ci.org/cstuncsik/browser-game-loop)
[![npm version](https://badge.fury.io/js/browser-game-loop.svg)](https://badge.fury.io/js/browser-game-loop)
[![Dependency Status](https://www.versioneye.com/user/projects/57e53e44bd6fa600316f5cd6/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/57e53e44bd6fa600316f5cd6)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/cstuncsik/browser-game-loop/master/LICENSE)

# browser-game-loop

A very minimal game loop for browser games.

It's working with fixed update time step and variable rendering.

## Loop execution model

```
FRAME

|---<<<--------------------<<<------------------------<<<---------------------<<<---|
|                         |---<<<------------------<<<---|                          |
|                         |                              |                          |
|         |---------|     |         |----------|         |     |----------|         |
|         |         |     |--->>>---|          |--->>>---|     |          |         |
|--->>>---| input() |------>>>------| update() |------>>>------| render() |--->>>---|
          |         |               |          |               |          |
          |---------|               |----------|               |----------|
```

```
TIMELINE

input  : |    |   |    |  |   |    |    |   |  |   |  |    |  |    |   |  
update :  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |  |
render :   |    |   |    |  |   |    |    |   |  |   |  |    |  |    |   |
```

## API

### Factory function

```
createGameLoop(options:Object) => Object
```

#### Options *object*

```js
var loop = createGameLoop({
    fps: 30,
    fpsFilterStrength: 20,
    slow: 1,
    input: function(){},
    update: function(step){},
    render: function(){}
});
```

|                       |          |                 |          |
| --------------------- | -------- | --------------- | -------- |
| **Property**          | **Type** | **Default**     | **Desc** |
| **updateTimeStep**    | Number   | 1000/30 ~33ms   | *Sets update time step to a fixed value* |
| **fpsFilterStrength** | Number   | 20              | *How often should FPS measurement change (1 means every frame)* |
| **slow**              | Number   | 1               | *Slow motion coefficient (the bigger the slower)* |
| **input**             | Function | N/A             | *This function is responsible for processing input* |
| **update**            | Function(updateTimeStep:Number) | N/A         | *This function is responsible for updating game objects' properties, physics etc...* |
| **render**            | Function | N/A             | *This function is responsible for drawing game objects* |

#### Returned *object*

```js
loop.start();
loop.stop();
loop.getFps();
loop.getElapsedTime();
loop.setSlow(2);
```

|                    |          |          |
| ------------------ | -------- | -------- |
| **Property**       | **Type** | **Desc** |
| **start**          | Function | *Starts the loop* |
| **stop**           | Function | *Stops the loop* |
| **getFps**         | Function | *Get FPS* |
| **getElapsedTime** | Function | *Get elapsed time* |
| **setSlow**        | Function(slow:Number) | *Set slow motion coefficient* |
