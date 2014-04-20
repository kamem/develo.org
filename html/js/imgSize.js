var imgSize = {
	info: [],
	$content: '',
	
	set: function($content) {
		$content.each(function(i){
			imgSize.info[i] = {
				content : $(this),
				width : $(this).width()
			};
		});
	},
	
	parent: {
		set: function($content) {
			$content.each(function(i){
				imgSize.info[i].parentWidth = $(this).parent().width();
			});
		}
	},
		
	init: function() {
		for(var i = 0;i < imgSize.info.length;i++) {
			var width = imgSize.info[i].width >= imgSize.info[i].parentWidth ? '100%' : imgSize.info[i].width;
			
			imgSize.info[i].content.css({
				border : '1px solid red',
				cssText : 'width : ' + width + ' !important'
			});
		}
	}
};

(function($){

	$(function() {
		imgSize.$content = $('.noResize img,img.noResize ');
		imgSize.$content.imagesLoaded(function(){
			imgSize.$content = $('.noResize img,img.noResize ');
			imgSize.set(imgSize.$content);
		});
	
		$(window).bind("orientationchange resize load",function(){
			imgSize.parent.set(imgSize.$content);
			imgSize.init();
		});
	});
}(jQuery));

$.fn.imagesLoaded = function(callback){
  var elems = this.filter('img'),
      len   = elems.length,
      blank = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
      
  elems.bind('load.imgloaded',function(){
      if (--len <= 0 && this.src !== blank){ 
        elems.unbind('load.imgloaded');
        callback.call(elems,this); 
      }
  }).each(function(){
     // cached images don't fire load sometimes, so we reset src.
     if (this.complete || this.complete === undefined){
        var src = this.src;
        // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
        // data uri bypasses webkit log warning (thx doug jones)
        this.src = blank;
        this.src = src;
     }  
  }); 
 
  return this;
};