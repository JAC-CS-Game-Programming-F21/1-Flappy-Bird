import { context, images } from './globals.js';
import { getRandomPositiveNumber } from './utils.js';

export default class Pipe {
	/**
	 * The Pipe class represents the pipes that randomly spawn in our game,
	 * which act as our primary obstacles. The pipes can stick out a random
	 * distance from the top or bottom of the screen. When the player collides
	 * with one of them, it's game over. Rather than our bird actually moving
	 * through the screen horizontally, the pipes themselves scroll through
	 * the game to give the illusion of player movement.
	 *
	 * @param {Number} x
	 * @param {Number} width
	 * @param {Number} height
	 */
	constructor(x, width, height) {
		this.x = x;

		// Set the Y to a random value halfway below the screen.
		this.y = getRandomPositiveNumber(height / 4, height - 10);

		this.width = width;
		this.scrollSpeed = -75;
	}

	update(dt) {
		this.x += this.scrollSpeed * dt;
	}

	render() {
		context.drawImage(images.pipe, this.x, this.y);
	}
}
