/*	

jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
http://dojofoundation.org/license for more information.

Modified by Burke Holland (@burkeholland) to combine with post message for piping
messages through chrome apps.

*/	

;(function(d){

	window.postMessage = postMessage || webkitPostMessage;

	// the topic/subscription hash
	var cache = {},
		// the target for the post message
		receiver = {},
		// the pkg item will exist off the jQuery object
		pkg = d.pkg = {};

	pkg.send = function(/* String */endpoint, /* Array? */message){
		var params = {
          	message: message,
          	endpoint: endpoint
         };
        return receiver.postMessage(params, "*");
	};

	pkg.listen = function(/* String */topic, /* Function */callback){
		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	pkg.ignore = function(/* Array */handle){

		var t = handle[0];
		cache[t] && d.each(cache[t], function(idx){
			if(this == handle[1]){
				cache[t].splice(idx, 1);
			}
		});
	};

	// create a init point
	pkg.init = function(target) {
		
		// the target will be the recipient of the post message
		receiver = target;

		// respond to post messages
		window.onmessage = function(event) {
			cache[event.data.endpoint] && d.each(cache[event.data.endpoint], function(){
				this.apply(d, event.data.message || []);
			});
		};          
	};

})(jQuery);