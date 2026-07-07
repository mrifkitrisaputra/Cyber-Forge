FROM php:8.2-cli-bookworm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    unzip \
  util-linux \
    libzip-dev \
  && docker-php-ext-install zip bcmath \
  && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY composer.json ./
RUN composer install --no-dev --prefer-dist --no-interaction --no-progress --no-scripts

COPY . .

ENTRYPOINT ["sh", "/var/www/html/docker-entrypoint.sh"]
EXPOSE 8000
