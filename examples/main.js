requirejs(['../src/gameLoop'], function (createLoop) {

  var box = document.getElementById('box'),
    prevBoxRotation = 0,
    currBoxRotation = 0,
    velocity = 0.05,
    direction = 1,
    mouseDown = false,
    fpsDisplay = document.getElementById('fpsDisplay'),
    elapsedTimeDisplay = document.getElementById('elapsedTimeDisplay');

  var loop = createLoop({
    updateTimeStep: 1000 / 60,
    input: input,
    update: update,
    render: render
  });

  document.addEventListener('mousedown', function () {
    mouseDown = true;
  });

  document.addEventListener('mouseup', function () {
    mouseDown = false;
  });

  function input() {
    if (mouseDown) {
      loop.setSlow(3);
    } else {
      loop.setSlow(1);
    }
  }

  function update(step) {
    prevBoxRotation = currBoxRotation;
    currBoxRotation += step * velocity * direction;
  }

  function render(interp) {
    var interpolatedBoxRotation = (currBoxRotation * interp) + (prevBoxRotation * (1 - interp));
    box.style.transform = 'rotate(' + interpolatedBoxRotation + 'deg)';
    fpsDisplay.textContent = Math.round(loop.getFps()) + ' FPS';
    elapsedTimeDisplay.textContent = Math.round(loop.getElapsedTime()) + ' s';
  }

  loop.start();
});
