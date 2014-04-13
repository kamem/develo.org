/**
 *	jQuery extratouch.
 *	jQuery required.
 *	
 *	* Copyright 2014 (c) kamem
 *	* http://develo.org/
 *	* Licensed Under the MIT.
 *	
 *	Date: 2014.01.01
 *
 * ボタンをタッチしてから上下にスクロールされなかった場合にtouchend時に関数を実行する
 *
 *	* startFunction : touchstart時に実行される関数。
 *	* moveFunction : touchstart後、上下どちらかにスクロールした時に実行される関数
 *	* moveUpFunction : touchstart後、上にスクロールした時に実行される関数
 *	* moveDownFunction : touchstart後、下にスクロールした時に実行される関数
 *	* endFunction : 上下にスクロールされなかった場合のtouchend時に実行される関数
 *	* isReturn : endFunction実行時に return false;するかしないか。
 *	
 *	@class extratouch
 */

(function($,global){

$.fn.extraTouch = function (options) {
	var isOptionsObj = typeof options !== 'object';
	var content = $(this);

	var c = $.extend({
			startFunction : '',
			moveFunction : '',
			moveUpFunction : '',
			moveDownFunction : '',
			endFunction : '',
			isReturn : true
		},options);
		
		
	var startFunction = isOptionsObj ? arguments.length <= 2 ? false : arguments[0] : c.startFunction,
		moveFunction =  isOptionsObj ? arguments.length <= 2 ? false : arguments[1] : c.moveFunction,
		moveUpFunction =  c.moveUpFunction,
		moveDownFunction =  c.moveDownFunction,
		endFunction = isOptionsObj ? arguments.length <= 2 ? arguments[0] : arguments[2] :  c.endFunction,
		isReturn = isOptionsObj ? arguments.length === 2 ? arguments[1] : arguments[3] !== false :  c.isReturn;

	var isActive = true,
		isEndFunction =false, //touchend時にendFunctionを実行するか
		isStart = false,
		startX = 0,
		startY = 0;

	$(document).on('touchstart', content.selector, function (e) {
		var touch = e.originalEvent.touches[0];

		isEndFunction = true;
		isStart = true;
		startX = touch.pageX;
		startY = touch.pageY;

		if (startFunction) {
		    startFunction(e);
		};
	})
	.on('touchmove', content.selector, content.selector, function (e) {
		var touch = e.originalEvent.touches[0],
			touchpageX = touch.pageX,
			touchpageY = touch.pageY;
		
		if (isStart) {
			var moveY = touchpageY - startY,
				moveX = touchpageX - startX;
			
			if (isActive) {
				if(moveY > 3) {
					isEndFunction = false;
					isActive = false;
					if (moveFunction) {
					    moveFunction(e);
					}
					if(moveDownFunction) {
						moveDownFunction(e);
					}
				} else if(moveY < -3) {
					isEndFunction = false;
					isActive = false;
					if (moveFunction) {
					    moveFunction(e);
					}
					if(moveUpFunction) {
						moveUpFunction(e);
					}
				}
			}
		}
	})
	.on('touchend', content.selector, function (e) {
		isActive = true;
		isStart = false;
		
		if (isEndFunction) {
			if (endFunction) {
		    	endFunction(e);
		    }
		}
		return isReturn;
	});
};

}(jQuery,this));