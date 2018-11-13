/**
 * Make update divs for elems
 * Start listen function for change on resize
 * Start listen buttons
 */
var carousel = function(carusel_div, count_show_el, but_left, but_right, width_listen, func_chng_mob, func_chng_desc) {

	var scroll_div = carusel_div.getElementsByClassName('scroll_div')[0];
	var elems = scroll_div.getElementsByClassName('elem_carusel');

	var col_elems = elems.length;
	var ml_elems = [];
	var how_much_elems_ml = 0;
	var count = 0;

	if (document.documentElement.clientWidth < width_listen) {
		redraw(1);
		func_chng_mob();
	} else {
		redraw(count_show_el);
		func_chng_desc();
	}
  


	/**
	* 	Set:
	*  - array margin-left of elems
	*  - height && width (carusel & scroll_div)
	*/
	function redraw(count_show_el) {

		// Mass margin-left of elems
		ml_elems = [];
		var error_distance = elems[0].offsetLeft;
		for (i = 0; i < col_elems; i++) {

			ml_elems.push(elems[i].offsetLeft - error_distance);
		}

		// Set height (carousel_div & scroll_div)
		var height = elems[0].offsetHeight;
		carusel_div.style.height = height + 'px';
		scroll_div.style.height = height + 'px';

		// Set width (carousel_div)
		var width_show_elems = elems[count_show_el - 1].offsetLeft + elems[count_show_el - 1].offsetWidth;
		var error_ml = elems[0].offsetLeft;
		carusel_div.style.width = width_show_elems - error_ml + 'px';

		// Set width (scroll_div)
		var width_scroll = elems[elems.length - 1] + 2 * elems[0].offsetWidth;
		scroll_div.style.width = width_scroll + 'px';
	}


	window.addEventListener('resize', function() {
		if (window.innerWidth < width_listen) {
			redraw(1);
			func_chng_mob();
		} else {
			redraw(count_show_el);
			func_chng_desc();
		}
	})

	function scroll_right() {

		count++;
		scroll_div.style.marginLeft = ml_elems[Math.abs(count) % (col_elems - 1)] * (-1) + 'px';
		console.log('count = ' + count + ' elem = ' + Math.abs(count) % (col_elems - 1));
	}
	function scroll_left() {

		count--;
		scroll_div.style.marginLeft = ml_elems[Math.abs(count) % (col_elems - 1)] * (-1) + 'px';
		console.log('count = ' + count + ' elem = ' + Math.abs(count) % (col_elems - 1));
	}
	but_left.addEventListener('click', scroll_left);
	but_right.addEventListener('click', scroll_right);  
}