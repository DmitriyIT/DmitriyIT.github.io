// Actions
// - make update divs for elems
// - take function for change on resize
var carousel = function(carusel_div, but_left, but_right, count_show_el) {
  var scroll_div = carusel_div.getElementsByClassName('scroll_div')[0];
  var elems = scroll_div.getElementsByClassName('elem_carusel');
  
  var col_elems = elems.length;
  var ml_elems = [];
  var how_much_elems_ml = 0;
  var count = 0;

  if (window.innerWidth < 960) {
    // Phone
    redraw(true);
    change_size_on_phone();
  } else {
    // Descktop
    redraw(false);
  }

  /**
   * Make by height & width of elems:
   *   - margin-left array of elems
   *   - height of button
   *   - set col_elems for show 
   *   - carousel_div width 
   * @param  {[bool]} phone_width
   *                        // true = phone; 
   *                        // false = desktop;
   */
  function redraw(phone_width) {
    // Make mass of margin-left elems
    ml_elems = [];
    var some_error_distance = elems[0].offsetLeft;
    for (i = 0; i < col_elems; i++) {
      ml_elems.push(elems[i].offsetLeft - some_error_distance);
    }

    // Set Button height
    var height = elems[0].offsetHeight;
    but_left.style.height = height + 'px';
    but_left.style.lineHeight = height + 'px';
    but_right.style.height = height + 'px';
    but_right.style.lineHeight = height + 'px';

    // Set carousel_div & scroll_div height
    carusel_div.style.height = height + 'px';
    scroll_div.style.height = height + 'px';

    // Set col_elems for show && carousel_div width 
    if (phone_width) {
      carusel_div.style.width = elems[0].offsetWidth + 'px';
      how_much_elems_ml = col_elems;
      count = col_elems;
    } else {
      var width_both_elems_show = elems[count_show_el - 1].offsetLeft + elems[count_show_el - 1].offsetWidth;
      var error_ml = elems[0].offsetLeft;
      carusel_div.style.width = width_both_elems_show - error_ml + 'px';
      
      how_much_elems_ml = col_elems - 1;
      count = col_elems - 1;
    }
  }

  /**
   * Change size & style of elems and their divs
   */
  function change_size_on_phone() {
    var right_col = carusel_div.getElementsByClassName('teacher_right_col');
    var div_images = carusel_div.getElementsByClassName('image_of_teacher');
    var r_col_titel_lesson = carusel_div.getElementsByClassName('lesson');

    for (var i = 0; i < div_images.length; i++) {
      right_col[i].style.width = 125 + 'px';
      right_col[i].style.paddingLeft = 7 + 'px';
      right_col[i].style.paddingRight = 7 + 'px';

      div_images[i].style.width = 125 + 'px';
      r_col_titel_lesson[i].style.marginTop = 0 + 'px';
      elems[i].style.width = 250 + 'px';
    }
    redraw(true);
  }

  window.addEventListener('resize', function() {
    if (window.innerWidth < 960) {
      change_size_on_phone();

      carusel_div.style.width = elems[0].offsetWidth + 'px';
      how_much_elems_ml = col_elems;
      count = col_elems * 20;
    } else {
      carusel_div.style.width = elems[1].offsetLeft + elems[1].offsetWidth - elems[0].offsetLeft + 'px';
      how_much_elems_ml = col_elems - 1;
      count = col_elems * 20 - 1;
      console.log('+')
    }
  })

  function scroll_right() {
     count++;
     scroll_div.style.marginLeft = ml_elems[Math.abs(count) % how_much_elems_ml] * (-1) + 'px';
     console.log('count = ' + count + ' elem = ' + Math.abs(count) % how_much_elems_ml);
  }
  function scroll_left() {
     count--;
     scroll_div.style.marginLeft = ml_elems[Math.abs(count) % how_much_elems_ml] * (-1) + 'px';
     console.log('count = ' + count + ' elem = ' + Math.abs(count) % how_much_elems_ml);
  }
  but_left.addEventListener('click', scroll_left);
  but_right.addEventListener('click', scroll_right);  
}
