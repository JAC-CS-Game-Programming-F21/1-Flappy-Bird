import CountdownState from "./states/CountdownState.js";
import GameOverState from "./states/GameOverState.js";
import PlayState from "./states/PlayState.js";
import StateMachine from "./StateMachine.js";
import TitleScreenState from "./states/TitleScreenState.js";

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

const fonts = [
	new FontFace('Joystix', 'url(./fonts/Joystix.ttf)'),
	new FontFace('Flappy', 'url(./fonts/Flappy.ttf)')
];

fonts.forEach((font) => {
	font.load().then(font => {
		document.fonts.add(font);
	});
})

export const images = {
	background: new Image(1157, 288),
	ground: new Image(1100, 16),
	bird: new Image(38, 24),
	pipe: new Image(70, 288),
};

images.background.src = "./images/background.png";
images.ground.src = "./images/ground.png";
images.bird.src = "./images/bird.png";
images.pipe.src = "./images/pipe.png";

export const stateMachine = new StateMachine();

stateMachine.add('countdown', new CountdownState());
stateMachine.add('play', new PlayState());
stateMachine.add('game-over', new GameOverState());
stateMachine.add('title-screen', new TitleScreenState());
