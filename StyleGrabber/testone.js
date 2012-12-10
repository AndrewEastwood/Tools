var page = require('webpage').create();
page.open("http://reviews.pull-ups.com/bvstaging/4123-en_us/test1/reviews.htm?format=embedded",
    function(status) {
        console.log(status);

        var h = page.evaluate(function(){

            var cl = document.createElement('link');
            cl.setAttribute('type', 'text/css');
            cl.setAttribute('href', 'http://pullups.ugc.bazaarvoice.com/static/4123-en_us/bazaarvoice.css');
            cl.setAttribute('rel', 'stylesheet');

            //var a = window.getComputedStyle(document.getElementById('BVRRContentContainerID')).getPropertyValue('color');

            document.head.appendChild(cl);

            //var b = window.getComputedStyle(document.getElementById('BVRRContentContainerID')).getPropertyValue('color');

            
            //return [a, b];
        });

        page.render(new Date().getTime() + ".png");
        console.log(h); // Will print [rgb(0,0,0), rgb(0,0,0)]
        phantom.exit();
    }
);