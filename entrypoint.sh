#!/bin/sh


npx prisma migrate dev -n init

exec "$@"