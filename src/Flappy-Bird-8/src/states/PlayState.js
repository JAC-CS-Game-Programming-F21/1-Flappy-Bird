import Bird from "../Bird.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	keys,
	stateMachine
} from "../globals.js";
import PipePair from "../PipePair.js";
import State from "./State.js";

export default class PlayState extends State {
	/**
	 * The PlayState class is the bulk of the game, where the player actually
	 * controls the bird and avoids pipes. When the player collides with a pipe,
	 * we should go to the GameOver state, where we then go back to the main menu.
	 */
	constructor() {
		super();

		this.bird = new Bird(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 38, 24);
		this.pipePairs = [];
		this.pipeSpawnTimer = 0; // Timer for spawning pipes.
		this.pipeInterval = 2; // How many seconds a new pipe spawns.
		this.score = 0;
	}

	enter(parameters) {
		this.scene = parameters.scene;
		this.pipeSpawnTimer = 0;
		this.score = 0;
		this.pipePairs = [];
		this.bird.reset();
	}

	update(dt) {
		this.pipeSpawnTimer += dt;

		// Spawn a new PipePair if the timer is past 2 seconds.
		if (this.pipeSpawnTimer > this.pipeInterval) {
			this.pipePairs.push(new PipePair());
			this.pipeSpawnTimer = 0;
		}

		this.pipePairs.forEach((pipePair, index) => {
			pipePair.update(dt);

			/**
			 * Score a point if the pipe has gone past the bird to the
			 * left all the way. Ignore it if it's already been scored.
			 */
			if (!pipePair.wasScored) {
				if (pipePair.didScore(this.bird)) {
					this.score++;
				}
			}

			// Change to GameOverState on collision.
			if (this.bird.didCollide(pipePair.pipes.upper)
				|| this.bird.didCollide(pipePair.pipes.lower)) {
				stateMachine.change('game-over', {
					score: this.score,
					scene: this.scene,
				});
			}

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

		// Change to GameOverState if bird goes past the bottom edge.
		if (this.bird.didFall()) {
			stateMachine.change('game-over', {
				score: this.score,
				scene: this.scene,
			});
		}
	}

	render() {
		this.scene.render(this.pipePairs);
		this.bird.render();

		context.save();
		context.font = "20px Joystix";
		context.fillStyle = "white";
		context.fillText(`Score: ${Math.floor(this.score)}`, 20, 30);
		context.restore();
	}
}
