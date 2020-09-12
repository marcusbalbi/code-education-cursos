#!/bin/bash


composer install

# npm install

php artisan key:generate
php artisan migrate
php-fpm