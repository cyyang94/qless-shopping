var Win = Ti.UI.createWindow({
	orientationModes : [Titanium.UI.PORTRAIT],
	top : (Ti.Platform.name === 'iPhone OS' && parseInt(Ti.Platform.version.split(".")[0], 10) >= 7) ? 20 : 0
});



exports.addView = function(page) {
	page.view.visible = false;
	Win.add(page.view);
};
exports.showView = function(page, style) {
    Ti.API.info('show page');
	if (page.load != undefined) {
		page.view.setLeft(0);
		page.view.setRight(0);
		page.load();
	}
	if (style == undefined) {
		page.view.visible = true;
		Ti.API.info('visible');
	} else if (style == 'FLY_RIGHT') {

		page.view.left = '100%';
		page.view.setVisible(true);
		page.view.animate(Titanium.UI.createAnimation({
			left : 0,
			duration : 150
		}));

	} else {
		Ti.API.info('style not found');
		return;

	}

};
exports.hideView = function(page, style) {

	if (style === undefined) {
		page.view.visible = false;
	} else if (style === 'FLY_RIGHT') {
		page.view.animate(Titanium.UI.createAnimation({
			left : '100%',
			duration : 150
		}));
		setTimeout(function() {
			page.view.setVisible(false);
		}, 200);

	} else {
		Ti.API.info('style not defined');
		return;
	}
	setTimeout(function() {
		if (page.hide != undefined) {
			page.view.setLeft(0);
			page.view.setRight(0);
			page.hide();
		}
	}, 200);

};

if (Ti.Platform.osname == 'android') {
	Win.addEventListener('open', function() {
		Win.activity.actionBar.hide();
	});
}

exports = Win;

Win.open();



