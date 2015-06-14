var view;
var okButton;
var nameView;
var nameText;
var cardView;
var cardText;
var cvcView;
var cvcText;
var expiryView;
var expiryText;
var amountView;

view = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	bottom :0 ,
	zIndex : WinOrder.checkout,
	layout : 'vertical',
	backgroundColor : 'white'
});

view.add(Ti.UI.createLabel({
	left : '20%',
	font : {
		fontSize : 20
	},
	text : 'Checkout',
	color : 'black'
}));

view.add(nameView = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 5,
	layout :  'horizontal',
	height : '10%'
}));

nameView.add(Ti.UI.createLabel({
	left : 0,
	width  :'20%',
	text : "Cardholder name :",
	color : 'black',
	font : {
		fontSize : 14
	}
}));


nameView.add(nameText = Ti.UI.createTextField({
	width : '70%',
	height : '100%',
	color : 'black',
	backgroundColor : '#FAFAFA'
}));

view.add(cardView = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 5,
	layout :  'horizontal',
	height : '10%'
}));

cardView.add(Ti.UI.createLabel({
	left : 0,
	width  :'20%',
	color : 'black',
	text : "Card number:",
	font : {
		fontSize : 14
	}
}));

cardView.add(cartText = Ti.UI.createTextField({
	width : '70%',
	color : 'black',
	height : '100%',
	backgroundColor : '#FAFAFA'
}));


view.add(cvcView = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 5,
	layout :  'horizontal',
	height : '10%'
}));

cvcView.add(Ti.UI.createLabel({
	left : 0,
	width  :'20%',
	color : 'black',
	text : "CVC number:",
	font : {
		fontSize : 14
	}
}));

cvcView.add(cvcText = Ti.UI.createTextField({
	width : '70%',
	height : '100%',
	color : 'black',
	backgroundColor : '#FAFAFA'
}));

view.add(expiryView = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 5,
	layout :  'horizontal',
	height : '10%'
}));

expiryView.add(Ti.UI.createLabel({
	left : 0,
	width  :'20%',
	color : 'black',
	text : "Expiry Date:",
	font : {
		fontSize : 14
	}
}));

expiryView.add(expiryText = Ti.UI.createTextField({
	width : '70%',
	height : '100%',
	color : 'black',
	backgroundColor : '#FAFAFA'
}));

view.add(amountView = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 5,
	layout :  'horizontal',

	height : '10%'
}));

amountView.add(Ti.UI.createLabel({
	left : 0,
	width  :'20%',
	color : 'black',
	text : "Amount:",
	font : {
		fontSize : 14
	}
}));

var amount;
amountView.add(amount= Ti.UI.createLabel({
	left : 0,
	width  :'20%',
	color : 'black',
	text : "20",
	font : {
		fontSize : 14
	}
}));

exports.load=function(){
	con.httpPost({
		url : 'getTotal',
		data  :{
			token : App.token
		},
		success : function(data){
			amount.setText(data.price);
		}
	});
};
view.add(okButton = Ti.UI.createView({
	backgroundColor : '#00FFFF',
	backgroundImage : '/images/checkout.png',
	height : 50,
	left : '70%',
	width : '15%'
}));

exports.view = view;
Win.addView(exports);

okButton.addEventListener('click',function(){
	con.httpPost({
		url : 'addPayment',
		success : function(data){
			if(data.status == 'SUCCESS'){
				App.cart = data.cart;
			
			Win.showView(polling);
			}
		},
		data : {
			token : App.token,
			amount : '100'
		}
	});
	
});
