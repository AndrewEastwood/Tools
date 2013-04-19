'use strict';

/*! TROLOLO <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */
var i = 1;
/* end of intro.js */
var i = 1;
var version = '<%= pkg.version %>';
/*! TROLOLO <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */


function g (a ,b) {
	return a + b + i + version;
}

console.log(g(1, 2));