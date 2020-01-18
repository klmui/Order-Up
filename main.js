$(function() {
    var $orders = $('#orders');
    var $name = $('#name');
    var $drink = $('#drink');

    // Made using mustache view engine
    var orderTemplate = $("#order-template").html(); 
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
    // Delegate applies to any future elements and current ones
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

    $orders.delegate('.editOrder', 'click', function() {
        var $li = $(this).closest('li');
        $li.find('input.name').val($li.find('span.name').html()); // Setting input to same as span
        $li.find('input.drink').val($li.find('span.drink').html()); // Setting input to same as span
        $li.addClass('edit');
    });

    $orders.delegate('.cancelEdit', 'click', function() {
        $(this).closest('li').removeClass('edit');
    });

    $orders.delegate('.saveEdit', 'click', function() {
        var $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            drink: $li.find('input.drink').val()
        };
        $.ajax({
            type: 'PUT',
            url: '/api/orders.php/' + $li.attr('data-id'),
            data: {
                name: $li.find('input.name').val(),
                drink: $li.find('input.drink').val()
            },
            success: function(newOrder) {
                $li.find('span.name').html(order.name);
                $li.find('span.drink').html(order.drink);
                $li.removeClass('edit');
            },
            error: function() {
                alert('error updating order');
            }
        });  

    });
});