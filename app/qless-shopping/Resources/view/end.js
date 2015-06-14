var view;

view = Ti.UI.createView({
	left :0,
	right : 0,
	top :0,
	bottom : 0,
	backgroundImage  :'/images/Thankyou.png',
	zIndex  : WinOrder.end
});

exports.view = view;

Win.addView(exports);
