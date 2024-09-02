# CampusHubConnect



 A campus event management application designed to enhance student participation and streamline event discovery. By consolidating event information into a single platform, it empowers campus organizations to efficiently manage and promote their events. Key features include event listings, submission, management, and notifications, all tailored to improve communication and time management for students. Mini Project by PYAG1 and  [Frimps](https://github.com/frimpsss)
 Note: It is an MVP. 
#### URL [Live Demo ](https://youtu.be/Vphm59-HwG0)


## Features

-  Authentication: User and event organizers would have to sign up in order to
access the app.
- Post events: Event organizers would have the feature to create events that will
be posted on the platform for users to see.
- Users will be able to view all events and filter to find specific events
- Manage events: Events organizers would be able to manage events like editing
event details.
- Save events: Users would be able to save events and get notified on them.

## Significance
The application addresses a critical need for better communication and engagement
within the campus community. Students often miss out on valuable opportunities,
events, and activities due to the lack of a centralized, accessible platform for event
information. 


## Tech Stack

CampusHubConnect uses a number of open source projects to work properly:

- React Native
- Typescript
- Firebase




## Installation
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Env Setup
Create a firebase project and enable authentication with email and password.
Make sure to define The Users Collection and Events Collection in your cloud firestore.
Add Firebase config and google maps api key in .env file.



```sh
.env
EXPO_PUBLIC_FIREBASE_API_KEY="your FIREBASE_API_KEY "
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN="your FIREBASE_AUTH_DOMAIN"
EXPO_PUBLIC_FIREBASE_PROJECT_ID="your firebase project id"
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET="your FIREBASE_STORAGE_BUCKET"
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your FIREBASE_MESSAGING_SENDER_ID"
EXPO_PUBLIC_FIREBASE_APP_ID="your FIREBASE_APP_ID"
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID="your FIREBASE_MEASUREMENT_ID"
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY="your GOOGLE_MAPS_API_KEY"
```

## Interface
### Get Started Screen
![Get Started](https://github.com/PYAG1/campusconnect/blob/main/assets/images/screenshot1.jpg)

### Explore Screen
![Explore](https://github.com/PYAG1/campusconnect/blob/main/assets/images/screenshot10.jpg)

### Event Details Screen
![Event Details](https://github.com/PYAG1/campusconnect/blob/main/assets/images/screenshot101.jpg)

### Create Event Screen
![Create Event](https://github.com/PYAG1/campusconnect/blob/main/assets/images/screenshot1012.jpg)
## Contributing
If you would like to contribute to this project, follow these steps:
1. Fork the repository and clone it to your local machine.
2. Create a new branch for your feature or bug fix:

```
git checkout -b feature/your-feature-name
```
3. Make your changes and commit them:
```
git commit -am 'Add your commit message here'
```
4. Push to your forked repository:
```
git push origin feature/your-feature-name
```
5. Create a new pull request from your forked repository to the original repository













## License

MIT



[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)

   [dill]: <https://github.com/joemccann/dillinger>
   [git-repo-url]: <https://github.com/joemccann/dillinger.git>
   [john gruber]: <http://daringfireball.net>
   [df1]: <http://daringfireball.net/projects/markdown/>
   [markdown-it]: <https://github.com/markdown-it/markdown-it>
   [Ace Editor]: <http://ace.ajax.org>
   [node.js]: <http://nodejs.org>
   [Twitter Bootstrap]: <http://twitter.github.com/bootstrap/>
   [jQuery]: <http://jquery.com>
   [@tjholowaychuk]: <http://twitter.com/tjholowaychuk>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Gulp]: <http://gulpjs.com>

   [PlDb]: <https://github.com/joemccann/dillinger/tree/master/plugins/dropbox/README.md>
   [PlGh]: <https://github.com/joemccann/dillinger/tree/master/plugins/github/README.md>
   [PlGd]: <https://github.com/joemccann/dillinger/tree/master/plugins/googledrive/README.md>
   [PlOd]: <https://github.com/joemccann/dillinger/tree/master/plugins/onedrive/README.md>
   [PlMe]: <https://github.com/joemccann/dillinger/tree/master/plugins/medium/README.md>
   [PlGa]: <https://github.com/RahulHP/dillinger/blob/master/plugins/googleanalytics/README.md>
