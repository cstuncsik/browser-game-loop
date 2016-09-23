(function (factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else if (typeof exports === 'object') {
        module.exports = factory();
    }
    else {
        window.createGameLoop = factory();
    }
}(function () {
    return function (options) {
        'use strict';
        var s = 1000,
            fps = options.fps || 30,
            step = s / fps,
            delta = 0,
            lag = 0,
            then = performance.now(),
            beginning = then,
            fpsFilterStrength = options.fpsFilterStrength || 20,
            frameTime = 0,
            update = options.update,
            render = options.render,
            input = options.input,
            rafId;

        function frame(now) {
            rafId = requestAnimationFrame(frame);
            delta = now - then;
            then = now;
            lag += delta;
            input();
            while (lag >= step) {
                update(step);
                lag -= step;
            }
            frameTime += (delta - frameTime) / fpsFilterStrength;
            render();
        }

        function start() {
            requestAnimationFrame(frame);
        }

        function stop() {
            cancelAnimationFrame(rafId);
        }

        function getFps() {
            return s / frameTime;
        }

        function getElapsedTime() {
            return (then - beginning) / s;
        }

        return {
            start: start,
            stop: stop,
            getFps: getFps,
            getElapsedTime: getElapsedTime
        };
    }
}));
