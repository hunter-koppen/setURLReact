## Set URL React
This is a widget that overwrites the url of the page. For example from /p/accountoverview to /link/accounts.

There is no need to fill in the base-url of the application, this is done automatically.

This widget in itself doesn't do much except visually change the url in your browser. If you want to actually have a working URL you should use this widget together the the [Deeplink Module](https://marketplace.mendix.com/link/component/43).

## Features
- Overwrite or append page url
- Strips spaces from url

## Usage
- Add the widget to the page you wish to overwrite the URL for.
- Configure the desired url in the widget (without the base app url).
- If you only wish to append something to the existing url simply set the append setting to true (you could use this to for example set a query parameter to the page like ?pagenumber=2)

## Demo project
https://seturlreact-sandbox.mxapps.io/

## Issues, suggestions and feature requests
https://github.com/hunterkoppenclevr/setURLReact/issues
