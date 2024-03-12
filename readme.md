# GitHub Notifications

<p align="center">
  <img src="https://raw.githubusercontent.com/fabiospampinato/vscode-github-notifications-bell/master/resources/logo.png" width="128" alt="Logo">
</p>

A secure, customizable, statusbar icon that notifies you about notifications on GitHub.

You can customize it to your likings, choosing when to show it and which icon/color/label to use.

## Install

Follow the instructions in the [Marketplace](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-github-notifications-bell), or run the following in the command palette:

```shell
ext install fabiospampinato.vscode-github-notifications-bell
```

## Usage

It adds 3 commands to the command palette:

```js
'GitHub Notifications: Open in Browser' // Open the notifications page in the browser
'GitHub Notifications: Refresh' // Refresh the notifications
'GitHub Notifications: Set Personal Access Token' // Set the personal access token
```

## Secrets

This extension needs a GitHub Personal Access Token, to create it go [here](https://github.com/settings/tokens), click "Generate new token" and be sure to select the "notifications" scope, then click "Generate token".

To tell the extension about your token you should run the `GitHub Notifications: Set Personal Access Token` from the command palette.

## Settings

```js
{
  "githubNotificationsBell.refreshInterval": 300, // Amount of seconds to wait before each refresh
  "githubNotificationsBell.alignment": "right", // Bell's position in the statusbar (left/right)
  "githubNotificationsBell.icon": "mark-github", // The icon to use in the statusbar
  "githubNotificationsBell.color": "", // Bell's color when there are some notifications
  "githubNotificationsBell.hideIfNone": true, // Hide the bell if there are no notifications
  "githubNotificationsBell.showNumberOfNotifications": true // Show the number of notifications alongside the bell icon
  "githubNotificationsBell.protocol": "https" // The protocol to use when quering GitHub
  "githubNotificationsBell.domain": "github.com" // The Github domain to query against. Github Enterprise may use a different domain
}
```

## Hints

- **Icon**: [here](https://code.visualstudio.com/api/references/icons-in-labels#icon-listing) you can browse a list of supported icons.

## License

MIT © Fabio Spampinato
