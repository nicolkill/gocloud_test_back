#!/bin/sh

set -e

if [ "$1" = 'start' ]; then
	node index.js
fi

exec "$@"
