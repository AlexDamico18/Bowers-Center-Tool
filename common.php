<?php

function get_PDO() {
    # Variables for connections to the database.
    // $host = "localhost";         # fill in with server name
    // $port = "3306";          # fill in with a port if necessary (will be different mac/pc)
    // $user = "root";         # fill in with user name
    // $password = "";     # fill in with password (will be different mac/pc)

    // $dbname = "bowers_center"; # fill in with db name

    // # Make a data source string that will be used in creating the PDO object
    // $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";

    $instanceUnixSocket = getenv('INSTANCE_UNIX_SOCKET'); 
    $user = getenv('CLOUDSQL_USER');      
    $password = getenv('CLOUDSQL_PASSWORD');  
    $dbname = getenv('CLOUDSQL_DB');      
    
    
    # Make a data source string that will be used in creating the PDO object
    if( isset($instanceUnixSocket) ) {
      // Connect using UNIX sockets
      $ds = sprintf(
        'mysql:dbname=%s;unix_socket=%s',
        $dbname,
        $instanceUnixSocket
      );
    } else if( isset($host) && isset($port) ) {
      # Make a data source string that will be used in creating the PDO object
      $ds = "mysql:host={$host}:{$port};dbname={$dbname};charset=utf8";
    }

    try {
      # This creates a new PDO object, conventionally called $db. You don"t need
      # to memorize these statements, but refer to lecture/readings for more details.
      $db = new PDO($ds, $user, $password);
      $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $db;
    } catch (PDOException $ex) {
      # An error may occur here if the db connection is down (it happens), the connection variables
      # are incorrect for the machine this PHP file is being ran on, etc. Note that don"t usually want to
      # output specific information from the $ex variable, since the client should really know
      # about information in our database, so we make a generic message.
      handle_db_error("1. Can not connect to the database. Please try again later.");
    }
  }






?>