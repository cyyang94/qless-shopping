var view;
var emailWrapper;
var emailTextField;
var passwordWrapper;
var passwordTextField;
var loginButton;
var regButton;

view = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	zIndex : WinOrder.login,
	layout : 'vertical',
	backgroundColor : 'white'
});

view.add(Ti.UI.createLabel({
	left : '20%' ,
	top : '20%',
	text : 'Login',
	font : {
		fontSize : 24
	},
	color : 'black'
}));

view.add(emailWrapper = Ti.UI.createView({
	top : 30 ,
	left : 30 ,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
}));

emailWrapper.add(Ti.UI.createLabel({
	left : 0,
	right : 10 ,
	width : '30%',
	text : 'Email :',
	font : {
		fontSize : 18
	},
	color : 'black'
}));

emailWrapper.add(emailTextField = Ti.UI.createTextField({
	left : 0,
	right : 10,
	width : '50%',
	hintText : 'Email',
	backgroundColor : '#FAFAFA',
	color : 'black'
}));

passwordWrapper = Ti.UI.createView({
	top : 30 ,
	left : 30,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
});

view.add(passwordWrapper);

passwordWrapper.add(Ti.UI.createLabel({
	left : 0,
	right : 10 ,
	width : '30%',
	text : 'Password :',
	font : {
		fontSize : 18
	},
	color : 'black'
}));

passwordWrapper.add(passwordTextField = Ti.UI.createTextField({
	left: 0 ,
	right : 10,
	width : '50%' ,
	hintText : '********',
	color : 'black',
	backgroundColor : '#FAFAFA',
	passwordMask : true
	
}));
var buttonsWrapper = Ti.UI.createView({
	top : '5%',
	right:0,
	height : '80px',
	layout : 'horizontal'
});

view.add(buttonsWrapper);
buttonsWrapper.add(loginButton = Ti.UI.createView({
	left : '50%' ,
	backgroundColor : '#B2FFFF',
	height : "100%",
	width : '20%'
}));

loginButton.add(Ti.UI.createLabel( {
	text : 'Login',
	font : {
		fontSize : 20
	},
	color : 'black',
	touchEnabled : false
}));


buttonsWrapper.add(regButton = Ti.UI.createView({
	left : 20 ,
	backgroundColor : '#B2FFFF',
		touchEnabled : false,
		height : '100%',
		width  : '20%'
}));


regButton.add(Ti.UI.createLabel( {
	text : 'Sign Up',
	font : {
		fontSize : 20
	},
	color : 'black'
}));

exports.view = view;
Win.addView(exports);

Win.showView(exports);

regButton.addEventListener('click',function(){
	Win.showView(register);
});

loginButton.addEventListener('click',function(){
	con.httpPost({
		url : 'login',
		success : function(data){
			if(data.status == 'SUCCESS'){
				Ti.API.info('ok');
				App.token = data.token;
				Win.showView(cart);
				Win.hideView(exports);
			}else{
				alert(data.message);
			}
		},
		data : {
			email : emailTextField.getValue(),
			password : passwordTextField.getValue()
		}
	});
});





