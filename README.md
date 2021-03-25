<img src="https://github.com/tim0-12432/todo-list/blob/main/public/apple-touch-icon.png?raw=true" style="height: 45px; width: 45px; float: right; border-radius: 50%; margin: 5px">

# VSCode Todolist extension

This is a extension for Visual Studio Code to use [my todo app](https://github.com/tim0-12432/todo-list) inside the IDE.


## Features

Open the Sidebar by tapping on the todolist logo.
![](https://github.com/tim0-12432/vstodolist/blob/master/docs/activity-bar.PNG?raw=true)
![](https://github.com/tim0-12432/vstodolist/blob/master/docs/sidebar.PNG?raw=true)

### Commands:

- ```bash
    > Show Todo List
    ```
    opens the Todo List App as a extra tab
    ![](https://github.com/tim0-12432/vstodolist/blob/master/docs/command.PNG?raw=true)
    ![](https://github.com/tim0-12432/vstodolist/blob/master/docs/panel.PNG?raw=true)
- ```bash
    > Refresh
    ```
    refreshes the Sidebar and the tab panel


## Installing

Download the [extension from repo](https://github.com/tim0-12432/vstodolist/tree/master/versions):

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