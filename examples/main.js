requirejs(['../src/gameLoop'], function (createLoop) {

    var box = document.getElementById('box'),
        boxRotation = 0,
        velocity = 5,
        direction = 1,
        mouseDown = false,
        fpsDisplay = document.getElementById('fpsDisplay'),
        elapsedTimeDisplay = document.getElementById('elapsedTimeDisplay');

    var loop = createLoop({
        updateTimeStep: 1000 / 30,
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
        boxRotation += step * velocity * direction;
    }

    function render() {
        box.style.transform = 'rotate(' + boxRotation + 'deg)';
        fpsDisplay.textContent = Math.round(loop.getFps()) + ' FPS';
        elapsedTimeDisplay.textContent = Math.round(loop.getElapsedTime()) + ' s';
    }

    loop.start();
});
