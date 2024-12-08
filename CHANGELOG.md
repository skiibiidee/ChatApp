# CHANGELOG (from v0.10.0)

## v0.12.0

### Added viewing others profile

- Server communication to get data.

### UI changes

- Many `hover:` changes to make app feel more interactive.
- New settings menu, cleaning up UI.
- Copy button change.
- New text color setting.
- New background setting.
- New Message Opacity setting.

## v0.11.0

### Added message attachments

- Allows upload of files up to 1mb
- Encoded to Base64 for json storage.
- Display as image if data supports image.
- Html preview for .html files.
- Downloading file.

### Switched to tailwind CLI

- Production ready.
- Allows configuration later on.

### Added search boxes

- Search inputs in chat participants list and chat list.
- Onchange, updates visibility of chats.

### Chat logs

- Instead of a non malleable string, saves event data as object.
- Allows configuration later on.

### UI

- "Black" color, set as default primary.
- Floating create chat button.
- Hover and select effects on chats in chat list.
- Create chat button shown when no chats are found.
- Settings button and menu.

### Other

- New setting: Show id instead of username in chat logs.
- New setting: focus on message box after actions.
- Home page as static html.
- Rewrote code to use js generated DOM items instead of XSS vulnerable
  `.innerHTML`.

## v0.10.0

### Added settings function

- Code rewrites to setup settings first.
- Changing toast specifics.
- Changing page colors.
- Changing loading screen load time.

### Added loading screen

- Clean ui with transitions.
- Feels more interactive.

### Added favicon and manifest.json

- Allows easy installation of PWAs.
- Changing page colors.
- Changing loading screen load time.

### Fixed package-lock.json

- Changed project name and version.

### Other

- Sorted chat list based on last interact.
