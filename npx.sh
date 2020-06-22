#!/bin/sh

#Restart PM2
npx pm2 delete all
npx pm2 start scripts/api/template-service --update-env
