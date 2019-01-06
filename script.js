let fieldSize = 16;
let erase = false;
let opacity = 0.5;
const opacityHeaderSpan = document.querySelector('#opacity_header span');
const field = document.getElementById('field');
const clearButton = document.getElementById('clear');
const sizeButton = document.getElementById('size');
const eraseButton = document.querySelector('#erase .tg_background');
const slider = document.querySelector('#slider div');
const color = document.getElementById('color');
makeField(fieldSize);


clearButton.addEventListener('click', function(){
	let divs = document.querySelectorAll('#field div');
	for (let i=0; i<divs.length; i++) {
		divs[i].style.backgroundColor = null;
		divs[i].style.opacity = 0;
	}
});

sizeButton.addEventListener('click', function(){
	let size = getFieldSize();
	field.innerHTML = '';
	makeField(size);
});

eraseButton.addEventListener('click', function() {
	eraseButton.classList.toggle('switched_on');
    if (erase == true) {
        erase = false;
        color.disabled = false;
    } else {
    	erase = true;
        color.disabled = true;
    }
});

document.getElementById('slider').onselectstart = function() {return false;};
slider.addEventListener('mousedown', function(e) {
	document.onmousemove = function(e) {
		let leftSide = slider.parentNode.getBoundingClientRect().left + slider.parentNode.clientLeft;
		let rightSide = slider.parentNode.getBoundingClientRect().left + slider.parentNode.clientLeft + slider.parentNode.clientWidth;
		if (e.clientX < leftSide) {
			slider.style.left = -(slider.clientWidth / 2) + 'px';
		} else if (e.clientX > rightSide) {
            slider.style.right = (slider.clientWidth / 2) + 'px';
		} else {
			slider.style.left = e.clientX - leftSide - (slider.clientWidth / 2) + 'px';
		}
		let parentWidth = slider.parentNode.clientWidth;
		let sliderCenter = slider.getBoundingClientRect().left + (slider.offsetWidth / 2) - leftSide;
		opacity = (sliderCenter / parentWidth).toFixed(2);
		opacityHeaderSpan.innerHTML = (opacity * 100).toFixed(0) + '%';
	};
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	};
});

color.addEventListener('change', function() {
	let colors = document.querySelectorAll('#color option');
    for (let i=0; i<colors.length; i++) {
    	if (colors[i].selected) {
    		if (colors[i].value == 'random') {
    			color.style.backgroundColor = 'white';
    			color.style.color = 'black';
    			return;
			}
			if (colors[i].value == 'black' || colors[i].value == 'blue') {
				color.style.color = 'white';
			} else {
				color.style.color = 'black';
			}
			color.style.backgroundColor = colors[i].value;
    	}
    }
});

field.onselectstart = function() {return false;};
field.addEventListener('mousedown', function(e) {
	makeAction(e);
	field.onmouseover = function(e) {
		makeAction(e);
	};
	document.onmouseup = function() {
		field.onmouseover = null;
	};
});

function makeField(size) {
	for ( let i=1; i<=size*size; i++ ) {
		let div = document.createElement('div');
		let parent = document.getElementById('field');
		div.style.width = parent.clientWidth / size + 'px';
		div.style.height = parent.clientHeight / size + 'px';
		div.style.opacity = 0;
		div.setAttribute('data-fielddiv','');
		parent.appendChild(div);
	}
}

function getFieldSize() {
	let fieldSize = +prompt('Enter a new size of the field between 1 and 64');
	while ( fieldSize < 1 || fieldSize > 64 || isNaN(fieldSize) ) {
		fieldSize = +prompt('Enter a number between 1 and 64');
	}
	return fieldSize;
}

function getRandomColor() {
	let r = Math.floor(Math.random() * 256);
	let g = Math.floor(Math.random() * 256);
	let b = Math.floor(Math.random() * 256);
	return 'rgb(' +r +',' +g +',' +b +')';
}

function getSelectedColor() {
    if (erase) return null;
    let colors = document.querySelectorAll('#color option');
    for (let i=0; i<colors.length; i++) {
    	if (colors[i].selected) {
    		if (colors[i].value == 'random') return getRandomColor();
    		return colors[i].value;
    	}
    }
}

function makeAction(e) {
	if (e.target.hasAttribute('data-fieldDiv')) {
		if (erase) {
			e.target.style.opacity = 0;
		} else if (e.target.style.opacity != 0) {
			e.target.style.opacity = +e.target.style.opacity + +opacity +'';
		} else {
			e.target.style.backgroundColor = getSelectedColor();
			e.target.style.opacity = opacity;
		}
	}	
}