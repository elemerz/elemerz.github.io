@echo off
cls
title ez-ng
color 8f
echo "Starting up EZ-NG frontend server ..."
rem npm run-script -- ng serve --port=4400 --proxy-config=proxy.conf.json --configuration=development
rem --ssl true --ssl-key certificate.key --ssl-cert certificate.crt
yarn run ng serve --port=4200 --proxy-config=proxy.conf.json --configuration=development