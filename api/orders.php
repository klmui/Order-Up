<?php


    // Handle GET request
    if ($_GET['load']) { // If I set load to false, this won't execute
        $jsonData = file_get_contents('../orders.json');
        echo $jsonData;
    } 

    // Handle POST request
    if (isset($_POST['name']) && isset($_POST['drink'])) {
        $order = array('name' => $_POST['name'], 'drink' => $_POST['drink']);
        echo json_encode(createNewOrder($order));
    }

    // Add order to JSON file
    function createNewOrder(array $order) {
        $response = array();

        // Create the response
        $response["id"] = getId();
        $response['name'] = $order['name'];
        $response['drink'] = $order['drink'];

        // Get data from existing json file, convert it, and push data
        $jsonData = file_get_contents('../orders.json');
        $arr_data = json_decode($jsonData, true);
        array_push($arr_data, $response);
        $jsonData = json_encode($arr_data, JSON_PRETTY_PRINT);
        file_put_contents('../orders.json', $jsonData);
        return $response;
    }

    // Get last id here
    function getId() {
        $arr = file_get_contents('../orders.json');
        $arr = json_decode($arr, true); // decode the JSON into an associative array
        $lastId = $arr[count($arr) - 1]['id'];
        return $lastId + 1; // Increments id
    }
?>