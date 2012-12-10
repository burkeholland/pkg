Pkg.js
======================

The **Pkg** jQuery plugin is the first jQuery plugin designed specifically for [Chrome Packaged Applications](http://developer.chrome.com/extensions/apps.html).  It is based HEAVILY on the [PubSub library](https://github.com/phiggins42/bloody-jquery-plugins) by [Peter Higgins](http://higginsforpresident.net/projects/).

## What It Is

Chrome Packaged Applications have a raised security policy that prohibits many of the tools that you are used to using in standard web development.  For instance, you are not allowed to use inline script, do dynamic evaluation of code (i.e. new Function, eval).  Removing core language features like this can make development seem frustrating.  Google has provided an "escape hatch" for you called the **sandbox**. You have a lot more freedom in the sandbox, but you cannot communicate with the Chrome Packaged App API's.  This is where the Pkg Plugin comes in.

## How It Works

The Pkg plugin allows you to communicate between pages using a combination of PostMessages and PubSub (commonly referred to as the "Observer" pattern).  In short, it allows you to send messages between pages passing parameters (complex objects are fine), and then respond to those parameters.  

So you can setup your packaged app by creating a page where your application will live, and and designating it as a sandboxed page in the manifest.

    ...
    "sandbox": {
   	    pages: [
            "index.html"
   	    ]
    }

Then you can load this sandboxed page inside of another page using an iFrame.

    <iframe id="iframe" src="index.html" width="100%" height="100%" frameborder="none"></iframe>

The Pkg plugin will allow you to communicate between these pages so when you need to call chrome extension API's from the sandbox, you simply pass a message up to the containing page which is NOT sandboxed, have it execute the API method for you and return you the result.

## Using The Plugin

The plugin is a single object and must be initialized on both pages before it can be used.  Call the **init** method and pass in the target that you want to send and receive messages from.  For instance, to communicate with the **iFrame** page, you would do:

    var iframe = document.getElementById("iframe");
    $.pkg.init(iframe.contentWindow);

Inside the IFrame, you would initialize the plugin and set it's target to **window.top**

    $.pkg.init(window.top);

Now you are ready to send and receive messages.

## Methods

### Send

To send a message, simply call the **send** method and pass a string message to respond to along with an array containg in any parameters you want to pass.

    $.pkg.send("/some/method", [ arg1, arg2, arg3 ]);

### Listen

To listen and respond to messages, call the **listen** method and specify the function to run when the message is received, along with any parameters the function will be expecting from the **send** method.

	$.pkg.listen("/some/method", function(arg1, arg2, arg3) {
		// you do something trippy here
	});

### Ignore

If you want to stop responding to messages, simply call the **ignore** method at any point

    // don't respond to "/some/method" messages anymore
    $.pkg.ignore("/some/method");

## Examples

There is an example application included which has a full implementation of the above.  To use it, open Chrome and navigate to [chrome://extensions](chrome://extensions).  

Click **Developer Mode** at the top right-hand corner if it is not already checked.

Click **Load Unpacked Extension** and browse to the **example** folder.  Select it and hit **open**.

The application will be added to your home screen as a generic icon with the title "Pkg Plugin Sample App".

## Screencast

[Here is a video](http://www.youtube.com/watch?v=TUWHkYKJ9Wk) using the Pkg plugin to build a packaged application and going over the basics of CSP (Content Security Policy) in Chrome Packaged Apps.
