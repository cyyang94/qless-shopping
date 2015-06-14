var view;
var timer;
var busy = false;
var box;

view = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	bottom : 0,
	backgroundColor : 'white',
	zIndex : WinOrder.polling
});

view.add(box = Ti.UI.createView({
	width : '80%',
	height : '20%',
	complete : false,
	top : '40%',
	bottom : '40%',
	borderRadius : 30,
	borderWidth : 5,
	borderColor : "#FAFAFA",
	backgroundColor : 'white'
}));

box.add(Ti.UI.createLabel({
	touchEnabled : false,
	left: 0 ,
	right : 0,
	top : 0,
	bottom : 0,
	color : '#FAFAFA',
	text : "Pick Up",
	textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
	font : {
		fontSize  : 30,
		fontWeight : 'bold'
	}
}));

function polling(){
	timer = setInterval(function(){
		if(!busy){
			busy = true;
			con.httpPost({
				url : 'getStatus',
				success : function(data){
					busy = false;
					if(data.cart_status == "3"){
						box.complete = true;
						box.setBackgroundColor('#99FF33');
						clearInterval(timer);
						
					}
					
				},
				data : {
					token : App.token,
					cart : App.cart
				}
			});
		}else{
			return;
		}
	},5000);
}

box.addEventListener('click',function(){
	if(box.complete == true){
		Win.showView(end);
	}else{
		return;
	}
});

exports.load=function(){
	polling();
};
exports.view = view;
Win.addView(exports);
