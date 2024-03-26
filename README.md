# Home Library Service
#### Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

#### Docker images
Link to docker images is [here](https://hub.docker.com/r/mmvprog/app/tags)

## How to test
#### 1. clone repository
```
git clone https://github.com/devmmv/nodejs2024Q1-service.git
```
#### or SSH
```
git clone git@github.com:devmmv/nodejs2024Q1-service.git
```
#### 2. Change directory:
```
cd nodejs2024Q1-service
```
#### 3. Install dependencies:
 ```
npm ci
```
#### 4. Run container applications:
```
docker compose up
```
##### When the application is set and running. <br> In the `new terminal tab`, run the next command (start testing)


#### 5. Start testing: 
``` 
npm run test
```
#### 6. Stop running containers:
```
docker compose down
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing ```http://localhost:4000/doc/```.
For more information about OpenAPI/Swagger please visit https://swagger.io/.






#### Auto-fix and format

```
npm run lint
```

```
npm run format
```

#### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
