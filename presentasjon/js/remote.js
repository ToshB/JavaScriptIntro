(function($){
    var socket = new io.Socket();
    socket.connect();
    socket.on('message', function(pageNumber){
        $('.pagenumber').text(pageNumber);
    });

    
    $(function(){
        var swipeOptions = {
            swipe: function(event, direction){
                if(direction === 'left'){
                    socket.send('next');
                }else if(direction === 'right'){
                    socket.send('prev');
                }
            }
        };
        $('body').swipe(swipeOptions);
    });
}(jQuery));