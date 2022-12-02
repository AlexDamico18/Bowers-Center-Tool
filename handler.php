<?php
// ini_set('allow_url_fopen');

switch(@parse_url($_SERVER['REQUEST_URI'])['path']){
    case '/':
        require 'BowersCenter.html';
        break;
    case '/index':
        require 'BowersCenter.html';
        break;
    case '/index.html':
        require 'BowersCenter.html';
        break;
    case '/bowers.php':
        require 'Bowers.php';
        break;
    default:
        http_response_code(404);
}
?>
