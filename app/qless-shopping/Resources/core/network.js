var host = "http://128.199.91.172/api/";

exports.httpGet = function(params){
	Ti.API.info('loading '+params.url);
	var con = Ti.Network.createHTTPClient({
		onload : function(e){
			Ti.API.info('SUCCESS.');
			Ti.API.info('Data :'+this.responseText);
			if(params.success != undefined){
				params.success(JSON.parse(this.responseText));
			}
		},
		onerror : function(response){
			if(params.fail != undefined){
				params.fail(response);
			}else{
				alert('unable to fetch data from '+ params.url);
			}
			
		},
		timeout : 30000
	});
	con.open('GET',host + params.url);
	con.send();
};

exports.httpPost = function(params){
	Ti.API.info('loading '+params.url);
	var con = Ti.Network.createHTTPClient({
		onload : function(e){
			Ti.API.info('SUCCESS.');
			Ti.API.info('Data :'+this.responseText);
			if(params.success != undefined){
				params.success(JSON.parse(this.responseText));
			}
		},
		onerror : function(response){
			if(params.fail != undefined){
				params.fail(response);
			}else{
				alert('unable to fetch data from '+ params.url);
			}
			
		},
		timeout : 30000
	});
	con.open('POST',host + params.url);
	con.send(params.data);
};


function getURLArgs(_string) {
    var args = {};
    var pairs = _string.split("&");
    for(var i = 0; i < pairs.length; i++) {
        var pos = pairs[i].indexOf('=');
        if (pos == -1) continue;
        var argname = pairs[i].substring(0,pos);
        var value = pairs[i].substring(pos+1);
        args[argname] = unescape(value);
    }
    return args;
}

exports.youtube = function(_youtubeId, _callbackOk, _callbackError){
        var youtubeInfoUrl = 'http://www.youtube.com/get_video_info?video_id=' + _youtubeId;
        var request = Titanium.Network.createHTTPClient({ timeout : 10000  /* in milliseconds */});
        request.open("GET", youtubeInfoUrl);
        request.onerror = function(_event){
            if (_callbackError)
                _callbackError({status: this.status, error:_event.error});
        };  
        request.onload = function(_event){
            var qualities = {};
            var response = this.responseText;
            var args = getURLArgs(response);
            if (!args.hasOwnProperty('url_encoded_fmt_stream_map'))
            {
                if (_callbackError)
                    _callbackError();
            }
            else
            {
                var fmtstring = args['url_encoded_fmt_stream_map'];
                var fmtarray = fmtstring.split(',');
                for(var i=0,j=fmtarray.length; i<j; i++){
                    var args2 = getURLArgs(fmtarray[i]);
                    var type = decodeURIComponent(args2['type']);
                    if (type.indexOf('mp4') >= 0)
                    {
                        var url = decodeURIComponent(args2['url']);
                        var quality = decodeURIComponent(args2['quality']);
                        qualities[quality] = url;
 
                    }
 
                }
                if (_callbackOk)
                    _callbackOk(qualities);
                }
        };
        request.send();
 
 
};
