/*----------------------------------------------------------------------
	IE
----------------------------------------------------------------------*/
/**
* @preserve HTML5 Shiv prev3.7.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed
*/
!function(a,b){function c(a,b){var c=a.createElement("p"),d=a.getElementsByTagName("head")[0]||a.documentElement;return c.innerHTML="x<style>"+b+"</style>",d.insertBefore(c.lastChild,d.firstChild)}function d(){var a=s.elements;return"string"==typeof a?a.split(" "):a}function e(a){var b=r[a[p]];return b||(b={},q++,a[p]=q,r[q]=b),b}function f(a,c,d){if(c||(c=b),k)return c.createElement(a);d||(d=e(c));var f;return f=d.cache[a]?d.cache[a].cloneNode():o.test(a)?(d.cache[a]=d.createElem(a)).cloneNode():d.createElem(a),!f.canHaveChildren||n.test(a)||f.tagUrn?f:d.frag.appendChild(f)}function g(a,c){if(a||(a=b),k)return a.createDocumentFragment();c=c||e(a);for(var f=c.frag.cloneNode(),g=0,h=d(),i=h.length;i>g;g++)f.createElement(h[g]);return f}function h(a,b){b.cache||(b.cache={},b.createElem=a.createElement,b.createFrag=a.createDocumentFragment,b.frag=b.createFrag()),a.createElement=function(c){return s.shivMethods?f(c,a,b):b.createElem(c)},a.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+d().join().replace(/[\w\-:]+/g,function(a){return b.createElem(a),b.frag.createElement(a),'c("'+a+'")'})+");return n}")(s,b.frag)}function i(a){a||(a=b);var d=e(a);return!s.shivCSS||j||d.hasCSS||(d.hasCSS=!!c(a,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),k||h(a,d),a}var j,k,l="3.7.0",m=a.html5||{},n=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,o=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,p="_html5shiv",q=0,r={};!function(){try{var a=b.createElement("a");a.innerHTML="<xyz></xyz>",j="hidden"in a,k=1==a.childNodes.length||function(){b.createElement("a");var a=b.createDocumentFragment();return"undefined"==typeof a.cloneNode||"undefined"==typeof a.createDocumentFragment||"undefined"==typeof a.createElement}()}catch(c){j=!0,k=!0}}();var s={elements:m.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:l,shivCSS:m.shivCSS!==!1,supportsUnknownElements:k,shivMethods:m.shivMethods!==!1,type:"default",shivDocument:i,createElement:f,createDocumentFragment:g};a.html5=s,i(b)}(this,document);

/**
 * IEのバージョン部分のみget
 */
var msie=navigator.appVersion.toLowerCase();
msie=(msie.indexOf('msie')>-1)?parseInt(msie.replace(/.*msie[ ]/,'').match(/^[0-9]+/)):0;

/**
 * IE6 〜 IE8
 * "selectivizr.js" ie6 ~ ie8 Selectors Level 3
 * ローカルでは使えないので注意です。
 */
if((msie >= 6) && (msie <= 8)) {
	var s = document.getElementsByTagName("script");
	var d = s[s.length-1].src.substring(0, s[s.length-1].src.lastIndexOf("/")+1);
	scriptCreate(d + "selectivizr.js");
}

/**
 * 〜 IE6
 * "js/DD_belatedPNG.js" 透明pngを使えるようにします。
 */

if(Boolean(msie) && msie <= 6) {
	scriptCreate("js/jquery.belatedPNG.js");
	$(function() {
		$('body *').fixPng();
	});
}

/**
 * script実行用
 */
function scriptCreate(name) {
	var n = document.createElement("script");
	n.setAttribute( "type", "text/javascript");
	n.setAttribute( "src", name);
	document.getElementsByTagName("head")[0].appendChild(n);
}



//----------------------------------------------------------------------
//	Develo.org
//----------------------------------------------------------------------

$(function(){

prettyPrint();
	
//---------------------------------------------
//	pjaxの処理
//---------------------------------------------
$(document).pjax('a', {
	container:'main', 
	fragment: 'main',
	timeout: 30000
});
	  
$(document).on('pjax:send', function(e) {
	$('body').append('<div class="test"></div>').find('.test').html('ローディング').css({
		position: 'fixed',
		top: 0,
		left: 0,
		background: '#000',
		color: '#fff',
		zIndex: 100
	});
	
	$('main').addClass('off');
});

$(document).on('pjax:complete', function(e,data) {
	$('.test').remove();
	var data = data.responseText;
	data.match(/id="([^\"]+)/);
	var id = RegExp.$1;
	$('body')[0].id = id;
	data.match(/class="([^\"]+)/);
	var cla = RegExp.$1;
	$('body')[0].className = cla;

	var topicpath = $(data).find('.topicpath').html();
	$('.topicpath').html(topicpath);
	
	imgSize.$content = $('.noResize img,img.noResize');
	imgSize.$content.imagesLoaded(function(){
		imgSize.set(imgSize.$content);
		imgSize.parent.set(imgSize.$content);
	});
	
	cookieDetailsSet();
	$('main').removeClass('off');
});

/*
$('#searchBox').keypress(function (e) {
    if ((e.which && e.which == 13) || (e.keyCode && e.keyCode == 13)) {
        console.log('test');
        $.pjax.submit(e, 'main');
        return  false;
    }
});

$('#searchBox .button').click(function (e) {
	$.pjax.submit(e, 'main');
	return false;
});
*/

$(document).on('submit', '#searchBox,#commentsForm', function(e) {
	$.pjax.submit(e, {
		container:'main', 
		fragment: 'main',
		timeout: 30000
	});
  return false;
})

//---------------------------------------------
//	popup
//---------------------------------------------
var $onOff = $('.categories,.tags');
$onOff.extraTouch(function(e) {
	var $this = $(e.currentTarget),
		href = $(e.target)[0].href;
	if(href !== undefined) {
		//location.href = href;
	} else {
		$this.toggleClass('on');
	}
});

var $searchIco = $('.guide .search a');
$searchIco.click(function () {
	$("#searchBox").toggleClass("on");

	var cookieName = 'search';
	cookie[cookieName] = $.cookie(cookieName) == 'off' ? 'on' : 'off';
	cookie(cookieName,cookie.details);
	return false;
});
	
	
	$(".pageNav h2 a").unbind();
	$(".pageNav h2 a").click(function () {
		$(".pageNav").toggleClass("off");
		$(".pageNav").find('>ul').toggleClass("off");
		$(".pageNav").find('>ol').toggleClass("off");
		if($.cookie('pageNav') == 'off') {
			$.cookie('pageNav', 'on', { expires: 365, path: '/' });
		}
		else {
			$.cookie('pageNav', 'off', { expires: 365, path: '/' });
		}
		return false;
	});
	
	if($.cookie('searchBox') == 'on') {
		$("#searchBox").toggleClass("on");
	}

	if($.cookie('pageNav') == 'off') {
		$(".pageNav").toggleClass("off");
		$(".pageNav").find('>ul').toggleClass("off");
		$(".pageNav").find('>ol').toggleClass("off");
	}
	
	if($.cookie('detailsSelect') == 'off') {
		$(".detailsSelect").toggleClass("off");
		$("article article").addClass("off");
		$.cookie('detailsSelect', 'off', { expires: 365, path: '/' });
	}

	$(".detailsSelect a").unbind();
	
	$(document).on('click','.detailsSelect a',function () {
		var cookieName = 'details';
		cookie[cookieName] = $.cookie(cookieName) == 'off' ? 'on' : 'off';
		cookie(cookieName,cookie.details);
		cookieDetailsSet();
		return false;
	});
	
	function cookie(name,key) {
		$.cookie(name, key, { expires: 365, path: '/' });
	};
	
	function cookieDetailsSet() {
		$('.detailsSelect,article article')[(cookie.details === 'off' ? 'add' : 'remove') + 'Class']('off');
	};
});

var cookie = {
	details : $.cookie('detailsSelect')
};
