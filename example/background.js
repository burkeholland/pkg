chrome.app.runtime.onLaunched.addListener(function() { 
  
  // create a new window and position it with a fixed size
  var win = chrome.app.window.create('main.html', { 
    width: 1024, 
    height: 870
  });

});

