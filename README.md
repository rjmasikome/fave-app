This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Details regarding the bootstraped project below.

# Notes from Developer

## How to run locally
**Requirement**
1. `yarn` is installed
2. Tested on Ubuntu 18.04

**How to run**
1. `yarn`
2. `yarn start`
3. Visit `localhost:3000` from browser

## Running using docker-compose
**Requirement**
1. Docker is installed with elevated rights for current user
2. Docker compose is installed
3. Tested on Ubuntu 18.04

**How to run**
1. `docker-compose up -d`
2. Visit `localhost:3030` from browser

## Running with local kubernetes with Ingress
**Requirement**
1. Minikube is installed
2. Minikube ingress is enabled
`minikube addons enable ingress`
3. Extra: `kubectl` is installed and on the `minikube` context
4. Tested on Ubuntu 18.04

**How to run**
1. `sh build.sh`
2. Get the IP Address and replace `IP_ADDRESS` below with it
3. Add `/etc/hosts` the following 
```
IP_ADDRESS    local.mysneakers.com
```
4. Visit `local.mysneakers.com:30080` from browser

**Notes from developer ended**

# Notes from the automated bootstrapped project 

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
