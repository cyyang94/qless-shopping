var view;
var emailWrapper;
var emailTextField;
var passwordWrapper;
var passwordTextField;
var loginButton;

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
	left : '20%',
	right : '20%',
	top : '5%',
	text : 'Login',
	font : {
		fontSize : 14
	}
}));

view.add(emailWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
}));

emailWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '20%',
	text : 'Email :',
	font : {
		fontSize : 14
	}
}));

emailWrapper.add(emailTextField = Ti.UI.createTextField({
	hintText : 'Email',
	backgroundColor : '#FAFAFA'
	
}));

passwordWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	height : Ti.UI.SIZE,
	layout : 'horizontal'
});

view.add(passwordWrapper);

passwordWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '20%',
	text : 'Password :',
	font : {
		fontSize : 14
	}
}));

passwordWrapper.add(passwordTextField = Ti.UI.createTextField({
	hintText : '********',
	backgroundColor : '#FAFAFA',
	passwordMask : true
	
}));
view.add(loginButton = Ti.UI.createView({
	right : 0,
	width :'20%',
	backgroundColor : 'black',
	height : '50px'
}));
view.add(Ti.UI.createLabel({
	left : 0,
	right : 0,
	text : "Or Login With",
	font : {
		fontSize : 16
	},
	color : 'black'
}));

exports.view = view;
Win.addView(exports);

Win.showView(exports);

loginButton.addEventListener('click',function(){
	con.httpPost({
		url : 'login',
		success : function(data){
			if(data.status == 'SUCCESS'){
				Ti.API.info('ok');
				App.token = data.token;
				Win.showView(cart);
			}else{
				alert(data.message);
			}
		},
		data : {
			login : emailTextField.getValue(),
			password : passwordTextField.getValue()
		}
	});
});


