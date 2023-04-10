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
	active_id = '';
	$('.box').empty()
	for (var i = 0; i < 8; i++) {
		let col_b = '';
		for (var b = 0; b < game[i].length; b++) {
			col_b += `<div class="col col-${b+1} ${game[i][b]}"></div>`;
		}
		$('.box').append(`<div class="bottle" id="b_${i+1}">
			<div class="bottle-im"></div>
			${col_b}
		</div>`)
	}
	$('.bottle').removeClass('b-active')
}

DrawBottle();

function Pour(first_id, second_id) {
	let ar_1 = first_id.split('b_')[1]-1;
	let ar_2 = second_id.split('b_')[1]-1;

	if (game[ar_1][game[ar_1].length-1] === game[ar_2][game[ar_2].length-1]) {
		game[ar_1].push(game[ar_2][game[ar_2].length-1]);
		game[ar_2].splice(game[ar_2].length-1, 1);
		DrawBottle()
	}else{
		DrawBottle()
	}
	// console.log(game[ar_1][game[ar_1].length-1], game[ar_2][game[ar_2].length-1]);

}


$(document).on('click', '.bottle', function(){
	if (active_id != '') {
		Pour(active_id, $(this).attr('id'))
	}else{

	}

	if (!$(this).hasClass('b-active')) {
		$(this).addClass('b-active')
		active_id = $(this).attr('id')
	}else{
		$(this).removeClass('b-active')
		
		active_id = '';
	}
	// DrawBottle()

	
	console.log(active_id)
})