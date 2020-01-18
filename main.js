$(function() {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    $.ajax({
        type: 'GET',
        url: '/api/orders.php', 
        dataType: "json",
        data: {load: true},
        success: function(orders) {
            console.log(orders);
            // args: i is index, order is the order
            $.each(orders, function(i, order){
                $orders.append('<li>name: ' + order.name +', drink: ' + order.drink + ' </li>');
            });
        },
        error: function() {
            alert('error loading orders');
        }
    });

    // POST req will return a JSON obj with an id
    $('#add-order').on('click', function() {
        $.ajax({
            type: 'POST',
            url: '/api/orders.php',
            data: {
                name: $name.val(),
                drink: $drink.val()
            },
            success: function(newOrder) {
                console.log(newOrder);
                jsonParsed = JSON.parse(newOrder);
                $orders.append('<li>name: ' + jsonParsed.name + ', drink: ' + jsonParsed.drink + ' </li>');
            },
            error: function() {
                alert('error saving order');
            }
        });
    });
});