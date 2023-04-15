function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let game = [[],[],[],[],[],[],[],[]];
let active_id = '';
let colors = [];
let countMove = 0;

function returncolors() {
	let ar = [];
	for (var i = 0; i < 8; i++) {
		colors.push('red');
		colors.push('green');
		colors.push('yellow');
		if (i > 3) {
			colors.push('blue');
		}
	}

}

returncolors();

shuffle(colors);

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function AddWoter() {
	for (var i = 0; i < 7; i++) {
		for (var b = 0; b < 4; b++) {
			let x = random(0, colors.length-1);
			game[i].push(colors[x])
			colors.splice(x, 1);
		}
	}

	console.log(game)
}


AddWoter();

function DrawBottle() {
	$('.box').empty()
	$('.box').append(`<div class="resetgame" onclick="resetgame()"></div>`)
	$('.box').append(`<div class="possiblemoves">Poss Moves: ${countMove}</div>`)
	for (var i = 0; i < 8; i++) {
		let col_b = '';
		for (var b = 0; b < game[i].length; b++) {
			col_b += `<div class="col col-${b+1} ${game[i][b]}"></div>`;
		}
		$('.box').append(`<div class="bottle ${IdentyFullArray(game[i])?'full':''}" id="b_${i+1}">
			<div class="bottle-im"></div>
			${col_b}
		</div>`)
		IdentyFullArray(game[i])
	}

	if (active_id != '') {
		$(`#${active_id}`).addClass('b-active')
	}
}

DrawBottle();

function IdentyFullArray(ar) {
	if (ar.length == 4) {
		let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
		if (findDuplicates(ar).length == 3) {
			return true
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function Pour(first_id, second_id) {
	let ar_1 = first_id.split('b_')[1]-1;
	let ar_2 = second_id.split('b_')[1]-1;

	if (game[ar_1][game[ar_1].length-1] === game[ar_2][game[ar_2].length-1] && game[ar_1].length < 4) {
		game[ar_1].push(game[ar_2][game[ar_2].length-1]);
		game[ar_2].splice(game[ar_2].length-1, 1);
		active_id = '';
		DrawBottle()
	}else if (game[ar_1].length == 0){
		game[ar_1].push(game[ar_2][game[ar_2].length-1]);
		game[ar_2].splice(game[ar_2].length-1, 1);
		active_id = '';
		DrawBottle()
	}
	countPossibleMove()
	// console.log(game[ar_1][game[ar_1].length-1], game[ar_2][game[ar_2].length-1]);

}

function resetgame() {
	game = [[],[],[],[],[],[],[],[]];
	active_id = '';

	AddWoter();

	DrawBottle();

	colors = [];

	returncolors();

	shuffle(colors);
}

function countPossibleMove() {
	let data = [];
	countMove = 0;
	let indexes = [];
	for (var i = 0; i < game.length; i++) {
		if (game[i].length == 0) {
			data.push({'index': i, 'color': 'free'})
		}else if (game[i].length < 4) {
			data.push({'index': i, 'color': game[i][game[i].length-1]})
		}
	}

	for (var i = 0; i < data.length; i++) {
		for (var b = 0; b < game.length; b++) {
			if (game[b].length > 0 && !IdentyFullArray(game[b])) {
				if (data[i].color == game[b][game[b].length-1] && data[i].index != b) {
					countMove++;
					indexes.push([data[i].index, b])
				}else if (data[i].color == 'free'){
					countMove++;
					indexes.push([data[i].index, b])
				}
			}
		}
	}

	$('.box').append(`<div class="possiblemoves">Poss Moves: ${countMove}</div>`)

	console.log(indexes)
	console.log(data);
	console.log(countMove);
}

$(document).on('click', '.bottle', function(){
	if (active_id == '') {
		active_id = $(this).attr('id');
	}else if (active_id == $(this).attr('id')) {
		active_id = '';
	}else if (active_id != $(this).attr('id')) {
		Pour(active_id, $(this).attr('id'))
	}
	

	DrawBottle()
	
})