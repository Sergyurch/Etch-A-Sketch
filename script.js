let fieldSize = 16;
makeField(fieldSize);

function makeField(size) {
	for(let i=1; i<=size*size; i++) {
		let div = document.createElement('div');
		let parent = document.getElementById('field');
		div.style.width = parent.clientWidth / size + 'px';
		div.style.height = parent.clientHeight / size + 'px';
		parent.appendChild(div);
	}
}