export const canvas = document.querySelector('canvas');
export const context = canvas.getContext('2d');

export const CANVAS_WIDTH = canvas.width;
export const CANVAS_HEIGHT = canvas.height;

const myFont = new FontFace('Joystix', 'url(./fonts/Joystix.ttf)');

myFont.load().then(font => {
	document.fonts.add(font);
});

export const images = {
	background: new Image(1157, 288),
	ground: new Image(1100, 16),
};

images.background.src = "./images/background.png";
images.ground.src = "./images/ground.png";
