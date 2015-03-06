<?php

require __DIR__ . '/vendor/autoload.php';

use NWBrands\Application;

$app = new Application();

$app->boot();

$app->registerRedirectedDomains([
    'www.northwestseatcovers.com' => 'https://www.nwseatcovers.com',
    'northwestseatcovers.com' => 'https://www.nwseatcovers.com',
]);
$app->registerDomainTemplates(["nwbrands.co", "www.nwbrands.co", "www.nwbrands.ca", "nwbrands.ca"]);
$app->registerTemplates([ "404", "coming-soon", "domain-new", "domain-sale", "soon" ]);

$app->redirectDomains()->showTemplate()->showDomainTemplates()->showDefault();