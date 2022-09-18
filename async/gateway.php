<?php

$method = $_SERVER['REQUEST_METHOD'];
$data = json_decode(file_get_contents('php://input'), true);
$date = date("Y-m-d H:i:s");

file_put_contents('log.txt', "[{$date}] {$method} ".print_r($data, true)."\n", FILE_APPEND);

if (file_exists($data['file'])) {
    print file_get_contents($data['file']);
} else {
    print "[]";
}
