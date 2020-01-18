$(function() {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    var orderTemplate = "" +
    "<li>" +
    "<p><strong>Name:</strong> {{name}}</p>" +
    "<p><strong>Drink:</strong> {{drink}}</p>" +
    "<button data-id='{{id}}' class='remove'>X</button>" +
    "</li>"; // Made using mustache view engine
    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
    }

    $.ajax({
        type: 'GET',
        url: '/api/orders.php', 
        dataType: "json",
        data: {load: true},
        success: function(orders) {
            console.log(orders);
            // args: i is index, order is the order
            $.each(orders, function(i, order){
                addOrder(order);
            });
        },
        error: function(method) {
            console.log(method);
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
                addOrder(jsonParsed);
            },
            error: function() {
                alert('error saving order');
            }
        });  
    });

    // All requests are asynchonous so this won't work
    // $('.remove').on('click', function() {
    // Go to parent 
    $orders.delegate('.remove', 'click', function() {

        // li of the order
        $li = $(this).closest('li'); // Goes up the chain until it finds an li

        $.ajax({
            type: 'DELETE',
            url: '/api/orders.php/' + $(this).attr('data-id'), // How to get the data-id?
            success: function(id) {
                console.log(id);

                // Remove li without refreshing page
                $li.fadeOut(300, function() {
                    $(this).remove();
                });
            }
        });
    });
});