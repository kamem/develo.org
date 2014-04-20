//----------------------------------------------------------------------
//	Develo.org
//----------------------------------------------------------------------


var cookie = {
	details : $.cookie('details')
};

$(function(){

dlTable();
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
	$('body').addClass('loading');
	$('main').addClass('off');
});

$(document).on('pjax:complete', function(e,data) {
	$('body').removeClass('loading');
	var data = data.responseText;
	
	//bodyのID
	data.match(/id="([^\"]+)/);
	var value = RegExp.$1;
	$('body')[0].id = value;
	//bodyのClass
	data.match(/class="([^\"]+)/);
	value = RegExp.$1;
	$('body')[0].className = value;
	//og
	data.match(/<meta property="og:title" content="([^\"]+)/);
	value = RegExp.$1;
	$('meta[property="og:title"]')[0].content = value;
	data.match(/<meta property="og:type" content="([^\"]+)/);
	value = RegExp.$1;
	$('meta[property="og:type"]')[0].content = value;
	data.match(/<meta property="og:url" content="([^\"]+)/);
	value = RegExp.$1;
	$('meta[property="og:url"]')[0].content = value;
	data.match(/<meta property="og:description" content="([^\"]+)/);
	value = RegExp.$1;
	$('meta[property="og:description"]')[0].content = value;

	var topicpath = $(data).find('.topicpath').html();
	$('.topicpath').html(topicpath);
	
	imgSize.$content = $('.noResize img,img.noResize');
	imgSize.$content.imagesLoaded(function(){
		imgSize.set(imgSize.$content);
		imgSize.parent.set(imgSize.$content);
	});
	
	sns();
	changeClass(
		$('.detailsSelect,article article'),
		'details',
		'off'
	);
	changeClass(
		$(".pageNav,.pageNav > ul,.pageNav > ol"),
		'pageNav',
		'off'
	);
	$('main').removeClass('off');
	
	var location = window.location.pathname + window.location.search;
	ga('send', 'pageview', location);
	
	imgSize.init();
	dlTable();
	prettyPrint();
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
/*var $onOff = $('.categories,.tags');
$onOff.extraTouch(function(e) {
	var $this = $(e.currentTarget),
		href = $(e.target)[0].href;
	if(href !== undefined) {
		//location.href = href;
	} else {
		$this.toggleClass('on');
	}
});*/

//---------------------------------------------
//	cookie set
//---------------------------------------------
	changeClass(
		$("#searchBox"),
		'search',
		'on'
	);
	changeClass(
		$('.detailsSelect,article article'),
		'details',
		'off'
	);
	changeClass(
		$(".pageNav,.pageNav > ul,.pageNav > ol"),
		'pageNav',
		'off'
	);

	var $searchIco = $('.guide .search a');
	$searchIco.click(function () {
		var cookieName = 'search';
		cookie[cookieName] = $.cookie(cookieName) == 'off' ? 'on' : 'off';
		cookie(cookieName,cookie[cookieName]);
		changeClass(
			$("#searchBox"),
			cookieName,
			'on'
		);
		return false;
	});
	
	$(document).on('click','.detailsSelect a',function () {
		var cookieName = 'details';
		cookie[cookieName] = $.cookie(cookieName) == 'off' ? 'on' : 'off';
		cookie(cookieName,cookie[cookieName]);
		changeClass(
			$('.detailsSelect,article article'),
			cookieName,
			'off'
		);
		return false;
	});
	
	$(document).on('click','.pageNav h2 a,.pageNav dt a',function () {
		var cookieName = 'pageNav';
		cookie[cookieName] = $.cookie(cookieName) == 'off' ? 'on' : 'off';
		cookie(cookieName,cookie[cookieName]);
		changeClass(
			$(".pageNav,.pageNav > ul,.pageNav > ol,.pageNav > dd > ul,.pageNav > dd > ol"),
			cookieName,
			'off'
		);
		return false;
	});

	function changeClass($content,cookieName,claName) {
		$content[($.cookie(cookieName) === claName  ? 'add' : 'remove') + 'Class'](claName);
	};

	
	/**
	 *	クッキーの取得
	 *
	 *	@method cookie
	 */
	function cookie(name,key) {
		$.cookie(name, key, { expires: 365, path: '/' });
	};
});

/**
 *	ソーシャルボタンのロード
 *
 *	@method sns
 */
function sns() {
	var tweetButton = document.getElementById('tweet-button');
	
	if(tweetButton) {
	 tweetButton.setAttribute('data-url', document.location.href);
	 tweetButton.setAttribute('data-text', document.title);
	 twttr.widgets.load();
	}
	
	/*
	 * facebook いいね！
	 */
	
	try {
		FB.XFBML.parse();
		FB.XFBML.parse(document.getElementById('facebook'));
	} catch(e){};
	
	/*
	 * Google+1
	 * gplusone は任意のid
	 * ボタンとして使う要素を明示的に渡す必要がある
	 * ボタンをデフォルト以外の形状で使うには改めてパラメーターを渡す必要がある
	 */
	try {
		gapi.plusone.render(document.getElementById('gplusone'), {size: "medium", width: "120px"});
	} catch(e){};
}
function dlTable() {
	var dd = [],
		dtNum = 0;
	$('.content dl.table > *').each(function(i){
		var isDt = $(this)[0].tagName === 'DT';
		if(isDt) {
			dtNum++;
			dd[dtNum - 1] = [];
		} else {
			dd[dtNum - 1].push($(this));
		}
	});
	
	$('.content dl.table > dt').each(function(i){
		var ddHeight = 0,
			dtHeight = $(this).outerHeight();
		for(var j = 0; j < dd[i].length; j++) {
			ddHeight += dd[i][j].outerHeight();
		};
		
		if(dtHeight > ddHeight) {
			for(var j = 0; j < dd[i].length; j++) {
				dd[i][j].height(dtHeight / dd[i].length - (dd[i][j].outerHeight() -  dd[i][j].height()));
			};
		}
	});
};
$(window).bind(('orientationchange resize load'), function(){
	dlTable();
});