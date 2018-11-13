var new_input = function(input, wrap_block) {
	var lines = wrap_block.getElementsByTagName('a');

	for (var i = 0; i < lines.length; i++) {
		lines[i].preventDefault;
	}

	input.addEventListener('keyup', update_input_find);
	function update_input_find() {
		var text_for_check = input.value.toUpperCase();
		for (var i = 0; i < lines.length; i++) {
			if (lines[i].innerHTML.toUpperCase().indexOf(text_for_check) > -1) {
				lines[i].style.display = 'block';
			} else {
				lines[i].style.display = 'none';
			}
		}
	}

	wrap_block.addEventListener('click', make_choose);
	function make_choose(e) {
		if (e.target.tagName == 'A') {
			input.value = e.target.innerHTML;	
		} else if (e.target.tagName == 'LI') {
			input.value = e.target.getElementsByTagName('a')[0].innerHTML;
		}
	}	
}

