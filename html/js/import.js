(function(){
	var s = document.getElementsByTagName("script");
	var d = s[s.length-1].src.substring(0, s[s.length-1].src.lastIndexOf("/")+1);
	for(var i=0; i<arguments.length; i++){
		document.write('<script type="text/javascript" src="'+d+arguments[i]+'"></script>');
	}
})(
"jquery.js",
"ga.js",
"jquery.smoothAnchor.min.js",
"google-code-prettify/prettify.js",
"jquery.cookie.js",
"jquery.pjax.js",
"common.js",
"imgSize.js",
"develo.js"
);