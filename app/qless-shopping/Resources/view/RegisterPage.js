var view;
var nameWrapper;
var nameTextField;
var phoneNoWrapper;
var phoneNoTextField;
var emailWrapper;
var emailTextField;
var passwordWrapper;
var passwordTextField;
var confirmButton;
var backButton;

view = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	zIndex : WinOrder.register,
	layout : 'vertical',
});
view.add(nameWrapper = Ti.UI.createView({
	top : 30,
	left : 20,
	height : 30,
	layout : 'horizontal'
}));

nameWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '30%',
	text : 'Name :',
	font : {
		fontSize : 16
	}
}));

nameWrapper.add(nameTextField = Ti.UI.createTextField({
	hintText : 'Name',
	backgroundColor : '#FAFAFA',
	color : 'black',
	font : {
		fontSize : 16
	}
}));
view.add(phoneNoWrapper = Ti.UI.createView({
	top : 20,
	left : 20,
	height : 30,
	layout : 'horizontal'
}));

phoneNoWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '30%',
	text : 'Phone Number :',
	font : {
		fontSize : 16
	}
}));

phoneNoWrapper.add(phoneNoTextField = Ti.UI.createTextField({
	hintText : 'Phone Number',
	backgroundColor : '#FAFAFA',
	color : 'black',
	font : {
		fontSize : 16
	}
}));

view.add(emailWrapper = Ti.UI.createView({
	top : 20 ,
	left : 20,
	height : 30,
	layout : 'horizontal'
}));

emailWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '30%',
	text : 'Email :',
	font : {
		fontSize : 16
	}
}));

emailWrapper.add(emailTextField = Ti.UI.createTextField({
	hintText : 'Email',
	backgroundColor : '#FAFAFA',
	color : 'black',
	font : {
		fontSize : 16
	}
}));

view.add(passwordWrapper = Ti.UI.createView({
	top : 20,
	left : 20,
	height : 30,
	layout : 'horizontal'
}));
passwordWrapper.add(Ti.UI.createLabel({
	left : 0,
	width : '30%',
	text : 'Password :',
	font : {
		fontSize : 16
	}
}));

passwordWrapper.add(passwordTextField = Ti.UI.createTextField({
	hintText : '********',
	backgroundColor : '#FAFAFA',
	passwordMask : true,
	color : 'black',
	font : {
		fontSize : 16
	}
}));
var buttonsWrapper = Ti.UI.createView ({
	bottm : '10%',
	right : '5%',
	height : '30px'
});
view.add(backButton = Ti.UI.createView({
	width :'15%',
	backgroundColor : '#CC0000'
}));
view.add(confirmButton = Ti.UI.createView({
	width : '15%',
	backgroundColor : '#B2FFFF'
}));

exports.view = view;
Win.addView(exports);


confirmButton.addEventListener('click',function(){
	url : 'register',
	
	con.httpPost({
		data : {
		name : nameTextField.getValue(),
		phonenumber : phoneNoTextField.getValue(),
		email : emailTextField.getValue(),
		password : emailTextField.getValue(),
		
		},
		success : function(data){
			alert(data.status);
		}
	});
});

backButton.addEventListener('click',function(){
	Win.showView(login);
});


