<?php

require __DIR__ . '/vendor/autoload.php';

use NWBrands\Application;

$app = new Application();

$app->boot();

$app->registerDomains(["localhost"]);
$app->registerTemplates([ "404", "coming-soon", "domain-new", "domain-sale", "soon" ]);

$app->showTemplate()->showDomain()->showDefault();