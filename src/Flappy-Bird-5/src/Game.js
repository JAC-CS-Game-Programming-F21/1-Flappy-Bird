import Bird from "./Bird.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	keys,
} from "./globals.js";
import PipePair from "./PipePair.js";
import Scene from "./Scene.js";

export default class Game {
	/**
	 * This class encapsulates our game loop logic so that `main.js` stays clean.
	 */
	constructor() {
		this.scene = new Scene();
		this.bird = new Bird(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 38, 24);
		this.pipePairs = [];
		this.pipeSpawnTimer = 0; // Timer for spawning pipes.
		this.pipeInterval = 2; // How many seconds a new pipe spawns.
		this.lastTime = 0;
	}

	start() {
		this.gameLoop();
	};

	/**
	 * This function is the heartbeat of the application. It is called
	 * 60 times per second (depending on your monitor's refresh rate) and
	 * it is what we will use to drive our game's animations. The way
	 * that this function is called 60 times per second is by using JavaScript's
	 * `requestAnimationFrame()` API.
	 *
	 * @param {Number} currentTime How much time has elapsed since the page loaded.
	 */
	gameLoop(currentTime = 0) {
		// Calculates delta time and converts it to seconds instead of milliseconds.
		const deltaTime = (currentTime - this.lastTime) / 1000;

		this.update(deltaTime);
		this.lastTime = currentTime;
		requestAnimationFrame((time) => this.gameLoop(time));
	}

	/**
	 * This function is called by `gameLoop()` at each frame of program execution;
	 * `dt` (i.e., DeltaTime) will be the elapsed time in seconds since the last
	 * frame, and we can use this to scale any changes in our game for even behavior
	 * across frame rates. This is where the logic of our game will be executed.
	 *
	 * @param {Number} dt How much time has elapsed since the last time this was called.
	 */
	update(dt) {
		this.pipeSpawnTimer += dt;

		// Spawn a new PipePair if the timer is past 2 seconds.
		if (this.pipeSpawnTimer > this.pipeInterval) {
			this.pipePairs.push(new PipePair());
			this.pipeSpawnTimer = 0;
		}

		this.pipePairs.forEach((pipePair, index) => {
			pipePair.update(dt);

			// If the pipePair is past the left edge, remove it from scene.
			if (pipePair.canRemove) {
				this.pipePairs.splice(index, 1);
			}
		});

		if (keys[' ']) {
			/**
			 * Set the space key in the object to false or else the flap() method
			 * will be called repeatedly as long as we are holding the key down.
			 */
			keys[' '] = false;

			this.bird.flap();
		}

		this.scene.update(dt);
		this.bird.update(dt);

		this.render();
	}

	/**
	 * This function is also executed at each frame since it is called by
	 * `update()`. It is called after the update step completes so that we
	 * can draw things to the screen once they've changed.
	 */
	render() {
		context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

		/**
		 * We pass the pipePairs into the scene so that we can render
		 * the pipes between the foreground and background.
		 */
		this.scene.render(this.pipePairs);
		this.bird.render();

		context.font = "20px Joystix";
		context.fillStyle = "white";
		context.fillText(`# Pipes: ${this.pipePairs.length}`, 15, 30);
		context.fillText(`Spawn Timer: ${Math.floor(this.pipeSpawnTimer)}`, 15, 60);
	}
}
