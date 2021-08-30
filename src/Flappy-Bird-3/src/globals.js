export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

export const GRAVITY = 5;

export const keys = {};

canvas.addEventListener('keydown', event => {
	keys[event.key] = true;
});

canvas.addEventListener('keyup', event => {
	keys[event.key] = false;
});

const myFont = new FontFace('Joystix', 'url(./fonts/Joystix.ttf)');

myFont.load().then(font => {
	document.fonts.add(font);
});

export const images = {
	background: new Image(1157, 288),
	ground: new Image(1100, 16),
	bird: new Image(38, 24),
};

images.background.src = "./images/background.png";
images.ground.src = "./images/ground.png";
images.bird.src = "./images/bird.png";
