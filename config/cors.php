<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],


    'allowed_methods' => ['*'],


    'allowed_origins' => ['http://localhost:8080'],

    // 'allowed_origins' => ['*'],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

    // 'allowed_origins_patterns' => [],
    // 'hosts' => [],
    // 'allowed_origins_patterns' => [],
    // 'hosts' => [],
];
