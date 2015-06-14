var view;
var imageView;
var descWrapper;
var descLabel;
var descData;
var priceWrapper;
var priceLabel;
var priceData;
var quantityWrapper;
var quantityLabel;
var quantityData;
var buttonWrapper;
var itemId;
var confirmButton;
var cancelButton;

view = Ti.UI.createScrollView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	zIndex : WinOrder.QrConfirm,
	layout : 'vertical',
	backgroundColor : 'white',
	scrollType : 'vertical'
});

view.add(imageView = Ti.UI.createImageView({
	left : 5,
	right : 5,
	top : 20,
	bottom : 20,
	height : 300,
	backgroundColor : 'black'
}));

view.add(descWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
}));

descWrapper.add(Ti.UI.createLabel({
	width : '40%',
	top : 50 ,
	bottom : 50,
	left : 5,
	right : 5,
	color  : 'black',
	text : 'Description :',
	font : {
		fontSize : 14
	}
}));

descWrapper.add(descData= Ti.UI.createLabel({
	// label = descData;
	backgroundColor : '#FAFAFA',
	color  : 'black',
	
}));
view.add(priceWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	height : Ti.UI.SIZE,

	layout : 'horizontal'
}));

priceWrapper.add(Ti.UI.createLabel({
	width : '20%',
	text : 'Price :',
	color  : 'black',
	font : {
		fontSize : 14
	}
}));

priceWrapper.add(priceData= Ti.UI.createLabel({
	// label = priceData;
	backgroundColor : '#FAFAFA',
	color  : 'black'
	
}));

view.add(priceWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
}));

view.add(quantityWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 2,
	layout : 'horizontal',
	height : 50
}));

quantityWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '20%',
	color  : 'black',
	font : {
		fontSize : 14
	},
	text : "Qty : "
}));
quantityWrapper.add(quantityData = Ti.UI.createTextField({
	height : '100%',
	backgroundColor : "#FAFAFA",
	
	width : 40,
	color : 'black'
}));

view.add(buttonWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	height : 50,
	layout : 'horizontal'
}));

buttonWrapper.add(confirmButton = Ti.UI.createView({
	left : '50%',
	width : '20%',
	height : '100%',
	backgroundColor : '#00FFFF'
}));

confirmButton.add(Ti.UI.createLabel({
	color : 'black',
	text : 'Add',
	touchEnabled : false
}));

buttonWrapper.add(cancelButton = Ti.UI.createView({
	left : '5%',
	width : '20%',
	height : '100%',
	backgroundColor : '#00FFFF'
}));

cancelButton.add(Ti.UI.createLabel({
	color : 'black',
	text : 'Cancel',
	touchEnabled : false
}));

exports.init = function(id){
	con.httpPost({
		url : 'getItem',
		success : function(data){
			if(data.status == 'SUCCESS'){
				itemId = id;
				imageView.setImage(data.data.item_picture);
				descData.setText(data.data.item_name);
				priceData.setText(data.data.item_price);
			}
		},
		data : {
			token : App.token,
			item_id : id
		}
	});
};
exports.view = view;
Win.addView(exports);



confirmButton.addEventListener('click',function(){
	Ti.API.info('Confirm QR product checkout');
	
	con.httpPost({
		url : 'addToCart',
		data : {
			token : App.token,
			item_id : itemId,
			quantity : quantityData.getValue()
		},
		success : function(data){
			alert(data.status);
			cart.reload();
			Win.hideView(exports);
			
		}
	});
});

cancelButton.addEventListener('click',function(){
	cart.reload();
	Win.hideView(exports);
});

