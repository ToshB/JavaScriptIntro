(function(){
    var socket = new io.Socket();
    socket.connect();

    function updateSlide(){
        socket.send(curSlide);
    }
    socket.on('message', function(pageNumber){
        $(document).unbind('slideenter');

		if(curSlide==pageNumber){
			buildNextItem();
		}else{
	        while(curSlide<pageNumber){
	           nextSlide();
	        }
	        while(curSlide>pageNumber){
	           prevSlide();
	        }
			
		}
        $(document).bind('slideenter', updateSlide);
    });

	$(document).ready(function(){
		$('body').bind('mousewheel', function(event) {
		      event.preventDefault();
		});
		$('body').bind('touchstart', function(event) {
		      event.preventDefault();
		});
	    
	});

}());