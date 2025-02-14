## v0.17.0

### Firebase Deployment

- Implemented automated deployment process for Firebase hosting
- Simplified deployment commands for easier updates
- Integrated CI/CD pipeline for continuous deployment

### Mobile UI Changes

- Added back button functionality for mobile users

### 

- Pasting files into chat.

## v0.16.0

### Added Firebase integration

- Migrated data storage to Firebase Realtime Database
- Real-time synchronization of chats, users, and attachments
- Improved data persistence and reliability
- Enhanced scalability for growing user base
- Secure authentication and data access controls

### Improved file handling

- Optimized attachment storage and retrieval updating across instances of server

### Message Context Menu

- Added context menu for messages allowing users to reply and delete messages

### Infrastructure updates

- Added environment firebase configuration support

### UI Improvements

- Fixed flickering of messages

### Game

- Added iframe game

## v0.15.0

### Added chat pictures

- Added ability to set and update chat profile pictures
- Chat profile pictures now visible in chat list sidebar
- Chat profile pictures displayed prominently in chat header
- Support for uploading custom chat profile pictures
- Default placeholder image for chats without profile pictures

### Added chat participant profile displays

- Added visual participant list showing profile pictures
- Displays up to setting set number of participant profile pictures in chat
  header
- Shows "+" participant count when exceeding display limit
- Clicking participant pictures opens their profile

### UI Improvements

- Implemented consistent gradient styling across components
- Enhanced visual hierarchy with subtle shadows and transitions
- Improved contrast and readability of text elements
- Added hover states and interactive feedback
- Refined spacing and alignment of UI elements
- Optimized layout for different screen sizes

## v0.14.0

### Added profile picture

- New profile pictures.
- Shown in chat, and clickable.
- Profile ui changed.

### Added unread markers

- Users can catch up easily.
- For futher features.

## v0.13.0

### Added sending stickers

- Server new attachment system.
- Allows links of attachments.
- Sticker menu and saving.

## v0.12.2 (Minor)

- Added Searching for users.

## v0.12.1 (Minor)

- Added dropping attachments.
- Changed chat log logging user data.
- Autologin setting.

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

> CHANGELOG from v0.10.0
