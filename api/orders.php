<?php
    $method = $_SERVER['REQUEST_METHOD'];
    
    if ($method == 'GET') {
        // Handle GET request
        if ($_GET['load']) { // If I set load to false, this won't execute
            $jsonData = file_get_contents('../orders.json');
            echo $jsonData;
         } 
    }

    if ($method == 'POST') {
        // Handle POST request
        if (($_POST['name']) && ($_POST['drink'])) {
            $order = array('name' => $_POST['name'], 'drink' => $_POST['drink']);
            echo json_encode(createNewOrder($order));
        }
    }

    if ($method == 'DELETE') {
        $id = explode("/", $_SERVER['PHP_SELF'])[3];
        $data = file_get_contents('../orders.json');
        // decode json to associative array
        $json_arr = json_decode($data, true);
        // get array index to delete
        $arr_index = array();
        foreach ($json_arr as $key => $value) {
            if ($value['id'] == $id) {
                $arr_index = $key;
            }
        }
        // delete data
        unset($json_arr[$arr_index]);
        // rebase array
        $json_arr = array_values($json_arr);
        // encode array to json and save to file
        file_put_contents('../orders.json', json_encode($json_arr, JSON_PRETTY_PRINT));
        echo $id;
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