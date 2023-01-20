<?php 

    $request = $_SERVER['REQUEST_URI'];

    switch ($request) {

        case '':
        case '/':
            require __DIR__ . '/home.html';
            break;

        case '/premiacao':
            require __DIR__ . '/premiacao.html';
            break;
    }




?>