<?php

// Bowers.php will return the data to display for the day of the week selected by the user
include "common.php";
$day_array = Array();

if(isset($_POST) && isset($_POST["date"]) && isset($_POST["day"])&& isset($_POST["count"])){
    $day_array["date"] = $_POST["date"];
    $day_array["day"] = $_POST["day"];
    $day_array["count"] = $_POST["count"];
    send_contents($day_array); //send to function where database is called
    
}

//---------------------------------------------------------------------------
elseif (isset($_GET['selected-day'])){
    $day = $_GET['selected-day'];


$day_count = get_contents();


if (array_key_exists($day, $day_count)){

    header("Content-type: application/json");
    $contents =  $day_count[$day]["count"];   
    echo json_encode($contents);
}
else {
    header("Content-type: text/plain");
    echo "Error. Date selection not found";
}

}
else {
    $statusCode = "HTTP/1.1 400: Invalid parameters";

    header("$statusCode");

    echo "Ensure day selected is valid.";
}


function  get_contents() {

    $all_days = file_get_contents('Bowers.JSON');

    $day_selection = json_decode($all_days, true);

    return $day_selection;
}

// ----------------------------------------------------------------------------
//connect to sql database

function get_contents1() {
$db = get_PDO();

//$column = ; //date

try {
    # It's good to put any code that uses the PDO in a try/catch to handle various PDO exceptions
    # that might occur (which we can't predict in the same way as other error-handling)
    
    # TODO: get the data we need from the database

    $stmt = $db->query("SELECT DISTINCT $busy FROM bowers_data;");
    $output = $stmt->fetch(PDO::FETCH_COLUMN);

    if (isset($output)) {
      return $output;
    }

  } catch (PDOException $ex) {
    handle_db_error("2. Can not connect to the database. Please try again later.");
  }


}

/*
* This function is made to send the data from the current day to the database for storage
* The date will be sent in 'date' form, and the array will be sent in JSON form
*/
function send_contents($day_array) {
    $db = get_PDO();
    $date = $day_array["date"];
    $weekday = $day_array["day"];
    $count = json_encode($day_array["count"]);

    try {
        $sql = "INSERT INTO bowers_data (date, weekday, busy) VALUES (:date, :weekday, :busy);";
        $stmt = $db->prepare($sql);

        $params = array("date" => $date,
        "weekday" => $weekday,
        "busy" => $count);
        $stmt->execute($params);
    } catch (PDOException $ex) {
        handle_db_error("2. Can not connect to the database. Please try again later.");
    }

}


?>