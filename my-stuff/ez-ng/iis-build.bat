@echo off
cls
echo *** Install and Build ....***
rem npm install && npm run-script -- ng build --base-href "/" --prod --optimization false --build-optimizer false --configuration production
rem npm cache clean --force && npm install --force && npm run-script -- ng build --base-href="/" --optimization=true --build-optimizer=true --configuration=test
yarn install --force && yarn run ng build --base-href=“/” --optimization=true --configuration=production
