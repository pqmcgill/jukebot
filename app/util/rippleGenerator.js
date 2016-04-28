let $ = require('jquery');

module.exports = {

  // takes a dom element and a mouse event
  // and creates a cool ripple effect on that element
  generateMouseEventRipple (elem, mouseEvent, options,  cb) {
    if (!options) {
      options = {};
    }
    let timeout = options.timeout !== undefined ? options.timeout : 2000;
    let rippleSpeed = options.rippleSpeed ? options.rippleSpeed : 'fast';
    let rippleColor = options.color ? options.color : 'white';
    $(elem).addClass('ripple');

    console.log(timeout, options.timeout === true);
    let $div = $('<div/>'),
      elemOffset = $(elem).offset(),
      xPos = mouseEvent.pageX - elemOffset.left,
      yPos = mouseEvent.pageY - elemOffset.top;

    let speedClass = 'ripple-' + rippleSpeed;
    let colorClass = 'ripple-' + rippleColor;
    $div.addClass('ripple-effect');
    $div.addClass(speedClass);
    $div.addClass(colorClass);
    $div.css('height', $(elem).height());
    $div.css('width', $(elem).height());
    $div.css({
      top: yPos - ($div.height() / 2),
      left: xPos - ($div.width() / 2)
    }).appendTo($(elem));

    window.setTimeout(() => {
      $div.remove();
    }, 2000);

    window.setTimeout(() => {
      if (cb) {
        cb();
      }
    }, timeout);
      
  }
};
