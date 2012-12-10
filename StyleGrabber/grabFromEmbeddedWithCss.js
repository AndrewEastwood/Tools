var page = require('webpage').create();

var b = false;
var a = false;
            
page.open("http://reviews.pull-ups.com/bvstaging/4123-en_us/test1/reviews.htm?format=embedded",
    function(status) {
        console.log(status);
        
        // include the css links
        // http://pullups.ugc.bazaarvoice.com/static/4123-en_us/bazaarvoice.css
        // http://reviews.pull-ups.com/bvstaging/4123-en_us/test1/reviews.htm?format=embedded
        
        page.evaluate(function(){
        
            
            var cl = document.createElement('link');
            cl.setAttribute('type', 'text/css');
            cl.setAttribute('href', 'http://pullups.ugc.bazaarvoice.com/static/4123-en_us/bazaarvoice.css');
            cl.setAttribute('rel', 'stylesheet');
            
            
            b = window.getComputedStyle(document.getElementById('BVRRContentContainerID')).getPropertyValue('color');
            
            document.head.appendChild(cl);

            window.setInterval(
                function () {
                    a = page.evaluate(function(){
                        return window.getComputedStyle(document.getElementById('BVRRContentContainerID')).getPropertyValue('color');
                    });
                    console.log([a,b]);
                }
            , 5000);
            
            
        
        });
        
        //page.render('demoone.png');
        //console.log(h);
    }
);




















page.open("http://www.somepage.com/index.html",
    function(status) {
        console.log(status);

        var h = page.evaluate(function(){

            var cl = document.createElement('link');
            cl.setAttribute('type', 'text/css');
            cl.setAttribute('href', 'http://www.somesite.com/styling.css');
            cl.setAttribute('rel', 'stylesheet');

            b = window.getComputedStyle(document.getElementById('BVRRContentContainerID')).getPropertyValue('color');

            document.head.appendChild(cl);

            a = window.getComputedStyle(document.getElementById('BVRRContentContainerID')).getPropertyValue('color');
        });

        console.log(h); // Will print [rgb(0,0,0), rgb(0,0,0)]
    }
);


/************ http://www.somepage.com/index.html *************/

<html><head><title>DemoPage</title></head>
<body>
    <div id="elOneID">simple text</div>
</body>
</html>


/************* http://www.somesite.com/styling.css ***********/
#elOneID {color: #F00;}