import { context, GRAVITY, images } from "./globals.js";

export default class Bird {
	/**
	 * The Bird is what we control in the game via clicking or the space bar;
	 * whenever we press either, the bird will flap and go up a little bit,
	 * where it will then be affected by gravity. If the bird hits the ground
	 * or a pipe, the game is over.
	 *
	 * @param {Number} x
	 * @param {Number} y
	 * @param {Number} width
	 * @param {Number} height
	 */
	constructor(x, y, width, height) {
		this.width = width;
		this.height = height;

		// Center the bird by subtracting half its width and height from position.
		this.x = x - width / 2;
		this.y = y - height / 2;

		// The Y velocity that will be affected by gravity.
		this.dy = 0;
	}

	flap() {
		// A sudden burst of negative velocity if we hit spacebar.
		this.dy -= 300;
	}

	update(dt) {
		// Apply gravity to velocity.
		this.dy += GRAVITY;

		// Apply current velocity to Y position.
		this.y += this.dy * dt;
	}

	render() {
		context.drawImage(images.bird, this.x, this.y)
	}
}
