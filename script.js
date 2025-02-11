'use strict';
import {console_color,console_red,console_orange,console_yellow,console_green,
	console_blue,console_purple,console_magenta,console_cyan} from './logColor.js';

// -------------------------------------------------------------------------------
//*                          --- ---
// -------------------------------------------------------------------------------


// const btns = document.querySelectorAll('.btn');
// const carousel = document.querySelector('.carousel');
// const list = document.querySelector('.list');
// const thumbnail = document.querySelector('.thumbnail');


// btns.forEach(btn => {
// 	btn.addEventListener('click', () => {
// 		if(btn.classList.contains('btn-prev')) {
// 			console.log('prev');

// 		}
// 		if(btn.classList.contains('btn-next')) {
// 			console.log('next');
// 			const items = list.querySelectorAll('.item');
// 			const thumbnailItems = thumbnail.querySelectorAll('.item');
// 			list.appendChild(items[0]);
// 			thumbnail.appendChild(thumbnailItems[0])
// 			carousel.classList.add('next');
// 			setTimeout(() => {
// 				carousel.classList.remove('next');
// 			}, 500);
// 		}
// 	});
// });



// -------------------------------------------------------------------------------
//*                          --- IMAGE SLIDER ---
// -------------------------------------------------------------------------------
//	['.9','.8','.7','.6','.5','.4','.3','.2','.1']
		['e6','cc','b3','99','80','66','4d','33','1a']

	const mobile = navigator.userAgent.match(/iPhone|Android.+Mobile/);
		const container = document.querySelector('.container');
			const slider = document.querySelector('.slider');
				const buttons = document.querySelector('.buttons');
				const btns = document.querySelectorAll('.btn');
			const titles = document.querySelectorAll('.title');
		const texts = document.querySelectorAll('.text');
	const anchors = document.querySelectorAll('.anchor');
	let touch = false;
		var slideMotionHowl = new Howl({src: ['mp3/flipCard.mp3'], volume: 0.1});
	
	function createColumns() {
		titles.forEach(title => {
			title.innerHTML = title.textContent.replace(/\S/g, '<span class="column">$&</span>');
		});
			texts.forEach(text => {
				text.innerHTML = text.textContent.replace(/\S/g, '<span class="column">$&</span>');
			});
		anchors.forEach(anchor => {
			anchor.innerHTML = anchor.textContent.replace(/\S/g, '<span class="column">$&</span>');
		});
	} createColumns();

	function textAppear() {
		titles.forEach(title => { title.style.opacity = 1});
			texts.forEach(text => { text.style.opacity = 1});
		setTimeout(() => {
			const slides = document.querySelectorAll('.slide');
			slides.forEach((slide, index) => {
				if(index === 1) {
					const columns = slide.querySelectorAll('.column');
					columns.forEach(column => {
						const duration = Math.random() * 1;
						const delay = Math.random() * 1 + .5;
						column.style.transitionDuration = duration + 's';
						column.style.transitionDelay = delay + 's';
						column.style.opacity = 1;
					});
				} else {
					const columns = slide.querySelectorAll('.column');
					columns.forEach(column => { 
						column.style.opacity = 0;
						column.style.transitionDuration = 0 + 's';
						column.style.transitionDelay = 0 + 's';
					});
				}
			});
		}, 100);
	}

//* mobile & pc event ------------------------------------------------

	window.addEventListener('load', () => {
		container.addEventListener('touchstart', e => e.preventDefault()); //*
		textAppear();
	});

	btns.forEach(btn => {
		btn.addEventListener('click', () => {
			slideMotionHowl.play(); //*
			const slides = document.querySelectorAll('.slide');
			if(btn.classList.contains('prev')) {
				slider.prepend(slides[slides.length -1]);
			} else { //* next
				slider.appendChild(slides[0]);
			}
			textAppear();
		});
	});


	anchors.forEach(anchor => { //***> added for now 
		anchor.addEventListener('click', (e) => {
			e.preventDefault(); //***> added for now
		});
	});

	//* mobile event ---------------------------------------

	anchors.forEach(anchor => {
		anchor.addEventListener('touchstart', (e) => {
			if(!touch) {
				touch = true; e.preventDefault();
				const columns = anchor.querySelectorAll('.column');
				columns.forEach((column, index) => {
					column.style.opacity = 1;
					column.style.transitionDelay = index * .05 +'s';
					if(index === columns.length-1) {
						let iid = setInterval(() => {
							if(getComputedStyle(column).opacity == '1') {
								clearInterval(iid);
								touch = false;
								columns.forEach(column => { column.style.opacity = .4});
							}
						}, 0);
					}
				});
			}
		});
	});

	btns.forEach(btn => {
		btn.addEventListener('touchstart', (e) => {
			if(!touch) { touch = true; e.stopPropagation()}
			btn.style.color = '#555';
			btn.style.backgroundColor = '#eee';
		});
		if(mobile) {
			btn.addEventListener('mousedown', () => {
				touch = true;
				setTimeout(() => { touch = false}, 200);
			});
		}
		btn.addEventListener('touchend', () => {
			setTimeout(() => {
				btn.style.color = '#bbb';
				btn.style.backgroundColor = '#555';
			}, 100);
			setTimeout(() => { touch = false}, 200);
		});
	});

	//* pc event ---------------------------------------

	if(!mobile) {
		anchors.forEach(anchor => {
			anchor.addEventListener('mouseenter', () => {
				const columns = anchor.querySelectorAll('.column');
				columns.forEach((column, index) => {
					column.style.opacity = 1;
					column.style.transitionDelay = index * .05 +'s'
				});
			});
			anchor.addEventListener('mouseleave', () => {
				const columns = anchor.querySelectorAll('.column');
				columns.forEach((column, index) => {
					if(index === columns.length-1) {
						let iid = setInterval(() => {
							if(getComputedStyle(column).opacity == '1') {
								columns.forEach(column => {
									column.style.opacity = .4;
								});
								clearInterval(iid)
							}
						}, 0);
					}
				});
			});
		});
	}

	window.addEventListener('resize', () => {
		adjustPosition();
	});

	function adjustPosition() {
		if(!mobile) {
			if(innerWidth <= 500 && innerHeight > 800) {
				slider.classList.add('adjust');
				buttons.classList.add('adjust');
			} 
			else if(innerWidth <= 500 && innerHeight < 800) {
				slider.classList.remove('adjust');
				buttons.classList.remove('adjust');
			} 
			else if(innerWidth > 500 && innerHeight < 800) {
				slider.classList.remove('adjust');
				buttons.classList.remove('adjust');
			} 
		}
	} 
	adjustPosition();



// -------------------------------------------------------------------------------




















