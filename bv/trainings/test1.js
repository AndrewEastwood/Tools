var page = require('webpage').create(),
	displayCode = "3545",
	clientName = "bestbuy";
var url = "http://"+clientName+".ugc.bazaarvoice.com/bvstaging/"+displayCode+"/test1/ratings.htm?format=noscript";
page.open(url, function (status) {
    if (status !== 'success') {
        console.log('Unable to access network');
    } else {
		
        var result = page.evaluate(function() {
			//	var displayCode = "4123-en_us",clientName = "pullups";
			// creating a new canvas element
				var c = document.createElement('canvas');
				c.setAttribute('id', 'myCanvas');
				c.setAttribute('width', '125');
				c.setAttribute('height', '25');
			// added canvas below body
				document.getElementsByTagName('body')[0].appendChild(c);
				var canvas = document.getElementById('myCanvas');
				var context = canvas.getContext('2d');
				var imgNew = new Image();
			//image source
				var img=document.getElementsByClassName("BVRRRatingNormalImage")[0].childNodes[0]; //THIS
				imgNew.src=img.src;
				//imgNew.src=imgNew.src.replace("/5/","/10/");
				var imgNewWidth=img.width,imgNewHeight=img.height;
				
				//imgNew.src="http://"+clientName+".ugc.bazaarvoice.com/bvstaging/"+displayCode+"/4_1/5/rating.gif";
				//img.src="//"+clientName+".ugc.bazaarvoice.com/bvstaging/"+displayCode+"/3_0/5/rating.gif";
				//img.src=document.getElementsByClassName("BVRRRatingNormalImage")[0].childNodes[0].src;
				//document.getElementsByClassName("BVRRRatingNormalImage")[0].childNodes[0].src;
				context.drawImage(imgNew, 0, 0);
				var canvas = document.getElementById('myCanvas');
				var ctx=canvas.getContext("2d");
				var imgDataFilled=ctx.getImageData(10,imgNewHeight/2,1,1);
				var imgDataUnfilled=ctx.getImageData(imgNewWidth-5,imgNewHeight/2,1,1);

			var res =       "Filled: R "    + imgDataFilled.data[0]   + " G " + imgDataFilled.data[1]    + " B " + imgDataFilled.data[2]+"  ";
			    res = res + "Unfilled: R "  + imgDataUnfilled.data[0] + " G " + imgDataUnfilled.data[1]  + " B " + imgDataUnfilled.data[2];
			return res; //return res
        });
		console.log(result);
    }
    phantom.exit();
})



var displayCode = "3545", clientName = "bestbuy";
var c = document.createElement('canvas');
var imgNew = new Image();
imgNew.src="http://"+clientName+".ugc.bazaarvoice.com/bvstaging/"+displayCode+"/3_0/5/rating.gif";
var imgNewWidth=imgNew.width,imgNewHeight=imgNew.height;
c.setAttribute('id', 'myCanvas');
c.setAttribute('width', imgNew.width);
c.setAttribute('height', imgNew.height);
document.body.appendChild(c);
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
//context.fillStyle = "#FFFFFF";
//context.fillRect(0, 0, imgNew.width, imgNew.height);
context.drawImage(imgNew, 0, 0);
var imgDataFilled=context.getImageData(imgNewWidth/10,imgNewHeight/2,1,1);console.log(imgNewWidth/10);
var imgDataUnfilled=context.getImageData(imgNewWidth-(imgNewWidth/10),imgNewHeight/2,1,1);console.log(imgNewWidth-imgNewWidth/10);

var res =       "Filled: R "    + imgDataFilled.data[0]   + " G " + imgDataFilled.data[1]    + " B " + imgDataFilled.data[2]+"   A " + imgDataFilled.data[3];
res = res + "Unfilled: R "  + imgDataUnfilled.data[0] + " G " + imgDataUnfilled.data[1]  + " B " + imgDataUnfilled.data[2] + "   A " + imgDataUnfilled.data[3];