# Server utilities

## Installation

`composer install`

That's all!

## Boot the app

In the index.php file:

```php
$app = new Application();
$app->boot();
```

Be sure to require the `vendor/autoload.php` file and import the Application class.

## Register domains

To show a domain default page:

* Create a template using the name of the domain in the domains folder. Ex.: `example.com.html`
* Declare all your domains when booting the application using the `registerDomains()` method like so:

```php
$app->registerDomains(["example.com", "example.ca"]);
```

## Register templates

To show a template page:

* Create a template in the template folder. Ex.: `404.html`
* Declare all your templates when booting the application using the `registerTemplates()` method like so:

```php
$app->registerTemplates(["404", "500"]);
```

## Launching the app

```php
$app->showTemplate()->showDomain()->showDefault();
```

The method `showTemplate()` should be called first for your basic templates to be available from any domain.