# vstodolist extension

This is a extension for Visual Studio Code to use my todo app inside the IDE.


## Features

Open the Sidebar by tapping on the todolist logo.

Commands:


## Installing

Download the extension from repo:

```bash
code --install-extension vstodolist-{VERSION}.vsix
```

or

copy the file to your VSCode extensions folder
`%USERPROFILE%\.vscode\extensions`
resp. `~/.vscode/extensions`


## Known Issues

Your Todos may be deleted after reloading the application.
This is because the todos are being saved in the browser's local storage which is reinitialized with a different unique id every new loading.
So please consider using this extension only for your todos in one coding session!