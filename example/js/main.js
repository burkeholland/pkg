(function($) {
	
	// get a reference to the iframe that holds the app
	iframe = document.getElementById("iframe");

	  // initialize the postman. he's off of MYAPP. He needs to know
    // who the recipient is. It's the iframe where the app lives.
    $.pkg.init(iframe.contentWindow);

    // subscribe to the /select/image message and return an image using
    // the native api file picker in chrome packaged apps
    $.pkg.listen("/select/file", function() {
    
        chrome.fileSystem.chooseEntry({ type: "openFile", 
          accepts: [ { extensions: [ "gif", "jpeg", "jpg", "bmp", "png" ] } ] }, function(entry) {
    
          // this gives us a file entry. We just need to read it.
          entry.file(function(file) {
    
            // create a new file reader
            var reader = new FileReader();
    
            // create an event for when the file is done reading
            reader.onloadend = function(e) {
              // tell the postman to deliver this to the sandbox
              $.pkg.send("/file/loaded", [this.result])
            }
    
            // read the file as a data URL
            reader.readAsDataURL(file);
        
          });
        
        });   
    });

})(jQuery);