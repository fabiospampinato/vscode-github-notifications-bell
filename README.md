# VSC GitHub Notifications Bell

<p align="center">
	<img src="https://raw.githubusercontent.com/fabiospampinato/vscode-github-notifications-bell/master/resources/logo-128x128.png" alt="Logo">
</p>

A secure, customizable, statusbar bell that notifies you about notifications on github.

It automatically opens the "Participating" section of your notifications if you have any of those.

You can customize it to your likings, choose when to show it, which colors to use, and which browser to use.

## Install

Run the following in the command palette:

```shell
ext install vscode-github-notifications-bell
```

## Usage

It adds 2 command to the command palette:

```js
'GitHub Notifications: Refresh' // Refresh the notifications counters
'GitHub Notifications: Open in Browser' // Open the notifications page in the browser
```

## Settings

This extension requires you to provide an OAuth token, to create it go [here](https://github.com/settings/tokens), click "Generate new token" and be sure to select the "notifications" scope, then click "Generate token".

```js
{
  "githubNotificationsBell.refreshInterval": 300, // Amount of seconds to wait before each refresh
  "githubNotificationsBell.oauthToken": "", // OAuth token used for requesting the notifications
  "githubNotificationsBell.alignment": "right", // Bell's position in the statusbar (left/right)
  "githubNotificationsBell.color": "", // Bell's color when there are some notifications
  "githubNotificationsBell.hideIfNone": true, // Hide the bell if there are no notifications
  "githubNotificationsBell.colorNone": "#888888", // Bell's color when there aren't any notifications
  "githubNotificationsBell.hideIfNotParticipating": false, // Hide the bell if there are no notifications you are participating in
  "githubNotificationsBell.colorParticipating": "#FFCC00", // Bell's color when there are some notifications you are participating in
  "githubNotificationsBell.openInBrowser": "" // The browser to use when opening in the browser
}
```

## Demo

![Demo](resources/demo.png)

## License

MIT © Fabio Spampinato
