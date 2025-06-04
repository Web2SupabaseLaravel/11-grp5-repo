<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie'],


    'allowed_methods' => ['*'],


    'allowed_origins' => ['http://localhost:8080'],

    // أو يمكنك السماح لكل الأصول (لكن أقل أمانًا في الإنتاج):
    // 'allowed_origins' => ['*'],

    // إذا احتجت إلى قبول عناوين خاصة أو Custom Headers
    'allowed_headers' => ['*'],

    // الرؤوس التي تريد إخراجها في الاستجابة (response headers)، مثل X-Auth-Token…
    // يجب أن تكون مصفوفة، لا تقم بتعيينها إلى false
    'exposed_headers' => [],

    // عدد الثواني التي يتم فيها كاش (cache) قواعد CORS قبل إعادة التحقق
    'max_age' => 0,

    // إذا كنت تستخدم auth:api أو Sanctum وتريد إرسال الـ cookies أو credentials
    'supports_credentials' => false,

    // في النسخ الأحدث من config/cors.php ستجد حقليْن إضافييْن:
    // 'allowed_origins_patterns' => [],
    // 'hosts' => [],
    //
    // إذا لم تجدهما في ملفك، لا بأس. ولكن تأكّد أنه إذا أُضيفا لاحقاً
    // فأنهما يجب أن يُعيَّنا كمصفوفة فارغة على الأقل:
    // 'allowed_origins_patterns' => [],
    // 'hosts' => [],
];
