var view;
var cartList;
var buttonWrapper;
var header;
var addProduct;

view = Ti.UI.createView({
	left : 0,
	right : 0,
	top :0 ,
	bottom : 0,
	zIndex : WinOrder.cart
});

view.add(header = Ti.UI.createView({
	left : 0,
	right : 0,
	top : 0,
	height : '5%',
	backgroundColor : ''
}));

view.add(cartList = Ti.UI.createScrollView({
	left : 0,
	right : 0,
	top : '5%',
	bottom : '10%',
	layout : 'vertical'
}));

view.add(buttonWrapper = Ti.UI.createView({
	left : 0,
	right : 0,
	bottom : 0,
	height : '10%',
	backgroundColor  : '#FAFAFA'
}));

buttonWrapper.add(Ti.UI.createView({
	left : '40%',
	width : '20%',
	backgroundColor : 'black',
	height : '100%'
}));

function createList(items){
	items.forEach(function(item){
		var wrapper = Ti.UI.createView({
			id : item.id,
			left : 0,
			right : 0,
			top : 0,
			height : Ti.UI.SIZE,
			layout : 'horizontal'
		});
		var picWrapper;
		
		wrapper.add(picWrapper = Ti.UI.createView({
			touchEnabled: false,
			left : '5%',
			width : Measurement.convert(60),
			height : Measurement.convert(60),
			borderRadius : Measurement.convert(30)
		}));
		picWrapper.add(Ti.UI.createImageView({
			touchEnabled: false,
			width : '100%',
			image : items.picture
		}));
		
		wrapper.add(Ti.UI.createLabel({
			touchEnabled: false,
			left : 5,
			text : item.name,
			font : {
				fontSize : 14
			},
			width : '40%'
		}));
		wrapper.add(Ti.UI.createLabel({
			touchEnabled: false,
			left : 5,
			text : item.price,
			font : {
				fontSize : 14
			}
		}));
		
		cartList.add(wrapper);
		
		wrapper.addEventListener('click',function(e){
			alert(e.source.id);
		});
		
		
		
	});
}
exports.load = function(){
	cartList.removeAllChildren();
	con.httpPost({
		url : 'getCart',
		success : function(data){
			if(data.status =='SUCCESS'){
				
			}
		},
		data : {
			token : App.token
		}
	});
};

exports.view = view;
Win.addView(exports);



