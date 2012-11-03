$(document).ready(function() {

    $('.book-now').click( function(){
        debugger;
        location.href = '/new_reservation/'+ $(this).data('uname') +'/reservations/'+ $(this).data('uid') +'/new';
    });

});
