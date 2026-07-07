#!/bin/sh
set -e

cd /var/www/html

mkdir -p storage/app storage/framework/cache storage/framework/sessions storage/framework/views storage/logs bootstrap/cache
touch storage/app/database.sqlite

KEY_FILE="storage/app/.app_key"
if [ -n "$APP_KEY" ]; then
  printf '%s' "$APP_KEY" > "$KEY_FILE"
elif [ -f "$KEY_FILE" ]; then
  export APP_KEY="$(cat "$KEY_FILE")"
else
  export APP_KEY="$(php artisan key:generate --show)"
  printf '%s' "$APP_KEY" > "$KEY_FILE"
fi

php artisan package:discover --ansi >/dev/null
php artisan migrate --force

exec php artisan serve --host=0.0.0.0 --port=8000