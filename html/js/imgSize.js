(function($){
	$(function() {
		var $noResize = $('.noResize img,img.noResize '),
			info = []
		
		$(window).bind("load",function(){
			$noResize.each(function(i){
				info[i] = {
					content : $(this),
					width : $(this).width()
				};
			});
		});
	
		$(window).bind("orientationchange resize load",function(){
			parentWidth();
			size();
		});
		
		function parentWidth() {
			$noResize.each(function(i){
				info[i].parentWidth = $(this).parent().width()
			});
		}
		
		function size() {
			for(var i = 0;i < info.length;i++) {
				var width = info[i].width >= info[i].parentWidth ? '100%' : info[i].width;
				
				info[i].content.css({
					border : '1px solid red',
					cssText : 'width : ' + width + ' !important'
				});
			}
		}
	});
}(jQuery));