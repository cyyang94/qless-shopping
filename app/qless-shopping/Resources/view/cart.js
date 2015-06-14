var view;
var cartList;
var buttonWrapper;
var header;
var addProduct;
var qrreader = require('com.acktie.mobile.android.qr');
var checkoutButton;
var historyButton;

view = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	zIndex : WinOrder.cart,
	backgroundColor : 'white'
});

view.add( header = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	height : '5%',
	backgroundColor : '#00FFFF'
}));

view.add( cartList = Ti.UI.createScrollView({
	left : 0,
	right : 0,
	top : '5%',
	bottom : '10%',
	layout : 'vertical'
}));

view.add( buttonWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	bottom : 0,
	height : '10%',
	backgroundColor : '#FAFAFA'
}));

buttonWrapper.add( historyButton = Ti.UI.createView({
	left : 0,
	height : '100%',
	width : '20%',
	backgroundColor : 'black',
	backgroundImage : '/images/history.png'
}));
buttonWrapper.add( addProduct = Ti.UI.createView({
	left : '40%',
	width : '20%',
	backgroundColor : '#00FFFF',
	backgroundImage : '/images/camera.png',
	height : '100%',

}));

buttonWrapper.add( checkoutButton = Ti.UI.createView({
	right : 0,
	height : '100%',
	width : '20%',
	backgroundColor : 'black',
	backgroundImage : '/images/checkout.png'
}));

function createList(items) {
	
	items.forEach(function(item) {
		var dialog = Ti.UI.createAlertDialog({
		buttonNames : ['Yes', 'No'],
		yes : 0,
		message : "Do you want to remove this item?"
	});
		var wrapper = Ti.UI.createView({
			id : item.item_id,
			left : 0,
			right : 0,
			top : 0,
			height : Ti.UI.SIZE,
			layout : 'horizontal'
		});
		var picWrapper;

		wrapper.add( picWrapper = Ti.UI.createView({
			touchEnabled : false,
			left : '5%',
			width : Measurement.convert(40),
			height : Measurement.convert(40),
			borderRadius : Measurement.convert(20)
		}));
		picWrapper.add(Ti.UI.createImageView({
			touchEnabled : false,
			width : '100%',
			image : item.picture
		}));

		wrapper.add(Ti.UI.createLabel({
			touchEnabled : false,
			left : 5,
			color : 'black',
			text : item.item_name,
			font : {
				fontSize : 14
			},
			width : '40%'
		}));
		wrapper.add(Ti.UI.createLabel({
			touchEnabled : false,
			left : 5,
			color : 'black',
			text : item.price,
			font : {
				fontSize : 14
			}
		}));
		wrapper.addEventListener('touchstart', function() {
			wrapper.setBackgroundColor('#F7FFFF');
		});
		wrapper.addEventListener('touchend', function() {
			wrapper.setBackgroundColor('transparent');
		});
		wrapper.addEventListener('touchcancel', function() {
			wrapper.setBackgroundColor('transparent');
		});
		wrapper.addEventListener('longclick', function() {
			dialog.show();
		});
		dialog.addEventListener('click', function(e) {
			
			if (e.index == e.source.yes) {
				con.httpPost({
					url : 'deleteItem',
					data : {
						token : App.token,
						item_id : item.item_id
					},
					success : function(data){
						if(data.status == 'SUCCESS'){
							cartList.remove(wrapper);
						}
					}
				});
			} 
		});
		cartList.add(wrapper);

	});
}

exports.reload = function() {
	cartList.removeAllChildren();
	con.httpPost({
		url : 'getCart',
		success : function(data) {
			if (data.status == 'SUCCESS') {
				createList(data.data);
			}
		},
		data : {
			token : App.token
		}
	});
};

exports.load = function() {
	cartList.removeAllChildren();
	con.httpPost({
		url : 'getCart',
		success : function(data) {
			if (data.status == 'SUCCESS') {
				createList(data.data);
			}
		},
		data : {
			token : App.token
		}
	});
};

function scanQRFromCamera(options) {
	qrCodeWindow = Titanium.UI.createWindow({
		navBarHidden : true,
		exitOnClose : false,
		backgroundColor : 'black',
		width : '100%',
		height : '100%',
	});
	qrCodeView = qrreader.createQRCodeView(options);

	var closeButton = Titanium.UI.createButton({
		title : "close",
		bottom : 0,
		left : 0
	});
	var lightToggle = Ti.UI.createSwitch({
		value : false,
		bottom : 0,
		right : 0
	});

	closeButton.addEventListener('click', function() {
		qrCodeView.stop();
		qrCodeWindow.close();
	});

	lightToggle.addEventListener('change', function(event) {
		if (event.value) {
			qrCodeView.turnLightOn();
		} else {
			qrCodeView.turnLightOff();
		}
	});

	qrCodeWindow.add(qrCodeView);
	qrCodeWindow.add(closeButton);

	if (Ti.Platform.osname !== 'ipad' && (options.useFrontCamera === undefined || (options.useFrontCamera != undefined && !options.useFrontCamera))) {
		qrCodeWindow.add(lightToggle);
	}

	// NOTE: Do not make the window Modal for android.  It screws stuff up.  Not sure why
	if (Ti.Platform.osname !== 'android') {
		qrCodeWindow.open({
			modal : true
		});
	} else {
		qrCodeWindow.open();
	}
}

addProduct.addEventListener('click', function() {
	var options = {
		backgroundColor : 'black',
		width : '100%',
		height : '90%',
		top : 0,
		left : 0,
		success : function(data) {
			
			itemDetail.init(data.data);
			Win.showView(itemDetail);
		}
		//cancel : cancel,
	};

	scanQRFromCamera(options);
});

checkoutButton.addEventListener('click', function() {
	Win.showView(checkout);

});

cartList.addEventListener('click', function(e) {
	if (e.source.id != undefined) {
		Ti.API.info(e.source.id);
	}

});
exports.view = view;
Win.addView(exports);

