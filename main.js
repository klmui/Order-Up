$(function() {
    console.log("Inside function");
    var $orders = $('#orders');
    $.ajax({
        type: 'GET',
        url: '/api/orders.json',
        success: function(orders) {
            console.log(orders);
            // args: i is index, order is the order
            $.each(orders, function(i, order){
                $orders.append('<li>name: ' + order.name +', drink: ' + order.drink + ' </li>');
            });
        }
    });

});