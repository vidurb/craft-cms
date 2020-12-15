FROM --platform=$TARGETPLATFORM composer AS deps

COPY composer.* /var/www/html/

RUN composer i -nao -d /var/www/html --no-suggest --ignore-platform-reqs --no-dev

FROM --platform=$TARGETPLATFORM php:7.4-fpm AS base

COPY --from=mlocati/php-extension-installer /usr/bin/install-php-extensions /usr/bin/

RUN install-php-extensions imagick zip intl pdo_pgsql gd

COPY ./docker/php.ini "$PHP_INI_DIR/php.ini"

FROM --platform=$TARGETPLATFORM base

LABEL maintainer "Vidur Butalia <vidurbutalia@gmail.com>"
LABEL org.label-schema.url=https://github.com/vidurb/craft-cms
LABEL org.label-schema.name=craft-cms

COPY --chown=www-data:www-data . /var/www/html

COPY --chown=www-data:www-data --from=deps /var/www/html/vendor /var/www/html/vendor

USER www-data

CMD ["php-fpm"]
