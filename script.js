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


	const slider = document.querySelector('.slider');
	const btns = document.querySelectorAll('.btn');
	var slideMotionHowl = new Howl({src: ['mp3/flipCard.mp3'], volume: 0.05});

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

	const titles = document.querySelectorAll('.title');
	titles.forEach(title => {
		title.innerHTML = title.textContent.replace(/\S/g, '<span class="column">$&</span>');
	});

	const texts = document.querySelectorAll('.text');
	texts.forEach(text => {
		text.innerHTML = text.textContent.replace(/\S/g, '<span class="column">$&</span>');
	});

	const anchors = document.querySelectorAll('.anchor');
	anchors.forEach(anchor => {
		anchor.innerHTML = anchor.textContent.replace(/\S/g, '<span class="column">$&</span>');
	});

	anchors.forEach(anchor => { //***> added for test 
		anchor.addEventListener('click', (e) => {
			e.preventDefault(); //***> added for test
		});
	});

	window.addEventListener('load', () => {
		textAppear();
	});

	function textAppear() {
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
					});
				}
			});
		}, 100);
	}

	anchors.forEach(anchor => {
		anchor.addEventListener('mousemove', () => {
			const columns = anchor.querySelectorAll('.column');
			columns.forEach((column, index) => {
				column.style.opacity = 1;
				column.style.transitionDelay = index * .05 +'s'
			});
		});
		anchor.addEventListener('mouseout', () => {
			const columns = anchor.querySelectorAll('.column');
			columns.forEach(column => {
				column.style.opacity = .4;
				// column.style.transitionDelay = 0 +'s'
			});
		});
	});


	//* Smart phone event ---------------------------------------

	anchors.forEach(anchor => {
		anchor.addEventListener('touchmove', () => {
			const columns = anchor.querySelectorAll('.column');
			columns.forEach((column, index) => {
				column.style.opacity = 1;
				column.style.transitionDelay = index * .05 +'s'
			});
		});
		anchor.addEventListener('touchend', () => {
			const columns = anchor.querySelectorAll('.column');
			columns.forEach(column => {
				column.style.opacity = .4;
				// column.style.transitionDelay = 0 +'s'
			});
		});
	});

	btns.forEach(btn => {
		btn.addEventListener('touchstart', () => {
			btn.style.color = '#555';
			btn.style.backgroundColor = '#eee';
		});
		btn.addEventListener('touchend', () => {
			setTimeout(() => {
				btn.style.color = '#bbb';
				btn.style.backgroundColor = '#555';
			}, 100);
		});
	});



// -------------------------------------------------------------------------------




















