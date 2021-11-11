'use strict';

const cards = {
	box1: 'box2',
	box2: 'box1',
	box3: 'box4',
	box4: 'box3',
	box5: 'box6',
	box6: 'box5',
	box7: 'box8',
	box8: 'box7',
	box9: 'box10',
	box10: 'box9',
	box11: 'box12',
	box12: 'box11',
	box13: 'box14',
	box14: 'box13',
	box15: 'box16',
	box16: 'box15',
	box17: 'box18',
	box18: 'box17'
};

//CARBON == MAIN PANEL !
const carbon = document.querySelector('.carbon');
const time = document.querySelector('.time');
const counter = document.querySelector('.counter');
const circle1 = document.querySelector('.panel__one');
const circle2 = document.querySelector('.panel__two');
const circle3 = document.querySelector('.panel__three');
const container = document.querySelector('.container');
const box = Array.from(document.querySelectorAll('.box'));
const audio = new Audio('https://loudlinks.rocks/sounds/mp3/magic.mp3');

let correct_flips = 0;
let last_flipped = [];
let moves = 0;
let seconds = 0;
let minutes = 0;
let seconds_str = '';
let minutes_str = '';
let timer_observer;

container.innerHTML = '';

function flipOnClick(e) {
	moves++;
	counter.innerHTML = moves;
	const element = e.target;
	last_flipped.push(element);
	element.classList.add('flipped');
	// console.log(last_flipped.length);
	compareFlipped(last_flipped);
}

function compareFlipped(array) {
	if (array.length > 2) {
		array.forEach(el => el.classList.remove('flipped'));
		last_flipped = [];
	}
	if (array.length == 2) {
		const card1 = array[0].classList[1];
		const card2 = array[1].classList[1];
		// console.log(cards[card1], cards[card2]);
		if (cards[card1] == card2 || cards[card2] == card1) {
			// console.log('Yay its a match');
			const c1 = document
				.getElementsByClassName(card1)[0]
				.firstElementChild.classList.add('matchingcards');
			const c2 = document
				.getElementsByClassName(card2)[0]
				.firstElementChild.classList.add('matchingcards');
			correct_flips += 1;
			last_flipped = [];
		} else {
			setTimeout(() => {
				array.forEach(el => el.classList.remove('flipped'));
				last_flipped = [];
			}, 700);
		}
	}
}

function spreadCards(array) {
	let new_Arr = array.filter(el => array.indexOf(el) % 2 == 0);
	while (0 < new_Arr.length) {
		const num = Math.floor(Math.random() * new_Arr.length);
		const pick = new_Arr[num];
		container.appendChild(pick);
		// console.log(container);
		new_Arr.splice(num, 1);
	}
}

function startWatching(seconds, minutes) {
	timer_observer = setInterval(() => {
		seconds > 58 ? ((minutes += 1), (seconds = 0)) : (seconds += 1);
		seconds_str = seconds > 9 ? `${seconds}` : `0${seconds}`;
		minutes_str = minutes > 9 ? `${minutes}` : `0${minutes}`;
		time.innerHTML = `${minutes_str}:${seconds_str}`;
		if (correct_flips >= 9) {
			audio.play();
			clearInterval(timer_observer);
			gameWonParty(moves);
			return;
		}
		// console.log(minutes, seconds_str);
	}, 1000);
}

function startGame() {
	correct_flips = 0;
	last_flipped = [];
	moves = 0;
	seconds = 0;
	minutes = 0;
	seconds_str = '';
	minutes_str = '';
	time.innerHTML = 'XX:XX';
	counter.innerHTML = '0';
	container.innerHTML = '';
	box.forEach(el => el.classList.remove('flipped'));
	clearInterval(timer_observer);
	spreadCards(box);
	container.childNodes.forEach(node =>
		node.firstElementChild.classList.remove('matchingcards')
	);
	startWatching(seconds, minutes);
}

function gameWonParty(moves) {
	// const audio = new Audio('https://loudlinks.rocks/sounds/mp3/magic.mp3');
	audio.play();
	// alert(`You Won with just ${moves} moves !`);
	//NOTE: make a fancy celebration with canvas
}

box.forEach(el => el.addEventListener('click', flipOnClick));

circle1.addEventListener('click', (e) => {
	clearInterval(timer_observer);
	container.innerHTML = '';
	time.innerHTML = 'XX:XX';
	counter.innerHTML = '0';
});

circle2.addEventListener('click', (e) => {
	carbon.style.height = '85%';
	carbon.style.width = '65%';
});
//green circle
circle3.addEventListener('click', (e) => {
	carbon.style.height = '90%';
	carbon.style.width = '90%';
});