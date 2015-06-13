var width = Math.min(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);

exports.convert = function(unit){
	return unit / 320 * width;
};

exports.getHeight = function(){
	var height;
	
	if (Ti.Platform.name === 'android'){
		height = Ti.Platform.displayCaps.platformHeight - Math.round((25 * Ti.Platform.displayCaps.dpi)/160);
	}
	else if (Ti.Platform.name === 'iPhone OS'){
		if (parseInt(Ti.Platform.version.split(".")[0], 10) >= 7){
			height = Ti.Platform.displayCaps.platformHeight;
		}
		else{
			height = Ti.Platform.displayCaps.platformHeight - 20;
		}
	}
	
	return height;
};
