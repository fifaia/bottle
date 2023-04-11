function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let game = [[],[],[],[],[],[],[],[]];
let active_id = '';
let colors = ['red', 'green', 'yellow', 'blue'];

function AddWoter() {
	for (var i = 0; i < 8; i++) {
		let r = random(1, 4);
		for (var b = 0; b < r; b++) {
			game[i].push(colors[random(0, colors.length-1)])
		}
	}

	console.log(game)
}

AddWoter();

function DrawBottle() {
	$('.box').empty()
	$('.box').append(`<div class="resetgame" onclick="resetgame()"></div>`)
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
	// console.log(game[ar_1][game[ar_1].length-1], game[ar_2][game[ar_2].length-1]);

}

function resetgame() {
	game = [[],[],[],[],[],[],[],[]];
	active_id = '';

	AddWoter();

	DrawBottle();
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