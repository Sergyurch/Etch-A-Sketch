let fieldSize = 16;
makeField(fieldSize);

const clearButton = document.getElementById('clear');
clearButton.addEventListener('click', function(){
	let divs = document.querySelectorAll('#field div');
	for (let i=0; i<divs.length; i++) {
		divs[i].style.backgroundColor = 'white';
	}
});

function makeField(size) {
	for(let i=1; i<=size*size; i++) {
		let div = document.createElement('div');
		div.style.backgroundColor = 'red';
		let parent = document.getElementById('field');
		div.style.width = parent.clientWidth / size + 'px';
		div.style.height = parent.clientHeight / size + 'px';
		parent.appendChild(div);
	}
}