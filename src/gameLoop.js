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
        var sec = 1000,
            updateTimeStep = options.updateTimeStep || sec / 30,
            delta = 0,
            lag = 0,
            then = performance.now(),
            beginning = then,
            fpsFilterStrength = options.fpsFilterStrength || 20,
            frameTime = 0,
            first = false,
            slow = options.slow || 1,
            slowStep = slow * updateTimeStep,
            update = options.update,
            render = options.render,
            input = options.input,
            rafId;

        function frame(now) {
            rafId = requestAnimationFrame(frame);
            delta = now - then;
            then = now;
            lag += Math.min(sec, delta);
            input();
            while (lag >= slowStep) {
                lag -= slowStep;
                update(updateTimeStep/slowStep);
            }
            frameTime += (delta - frameTime) / fpsFilterStrength;
            render();
        }

        function start() {
            then = performance.now();
            if(!first){
                first = true;
                beginning = then;
            }
            rafId = requestAnimationFrame(frame);
        }

        function stop() {
            cancelAnimationFrame(rafId);
        }

        function getFps() {
            return sec / frameTime;
        }

        function getElapsedTime() {
            return (then - beginning) / sec;
        }

        function setSlow(slow){
            slowStep = slow * updateTimeStep;
        }

        return {
            start: start,
            stop: stop,
            getFps: getFps,
            getElapsedTime: getElapsedTime,
            setSlow: setSlow
        };
    }
}));
