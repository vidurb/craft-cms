FROM composer AS backend_deps

RUN composer -nq global require hirak/prestissimo

COPY composer.* /var/www/html/

RUN composer i -nao -d /var/www/html --no-suggest --ignore-platform-reqs --no-dev

FROM php:7.4-fpm AS backend_base

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions imagick zip intl pdo_pgsql gd

COPY ./docker/php.ini "$PHP_INI_DIR/php.ini"

FROM backend_base

COPY --chown=www-data:www-data . /var/www/html

COPY --chown=www-data:www-data --from=backend_deps /var/www/html/vendor /var/www/html/vendor

USER www-data

CMD ["php-fpm"]
