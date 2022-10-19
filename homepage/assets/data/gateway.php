<?php

define('METHOD', strtoupper($_SERVER['REQUEST_METHOD']));
define('DATA',   METHOD === "GET" ? $_GET : $_POST);

switch (METHOD) {
    case 'GET':
        $file    = __DIR__ . DATA['file'];
        $content = file_get_contents($file);
        print $content;
      break;

    case 'POST':
        $file    = __DIR__ . DATA['file'];
        $content = json_encode(DATA['data'], JSON_PRETTY_PRINT);
        file_put_contents($file, $content);
      break;
}
