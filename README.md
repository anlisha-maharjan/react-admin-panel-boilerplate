## About

The project is a React Admin Panel boilerplate that provides an architecture optimized for building solid web app with embedded authentication flow to help you kickstart new app.

When starting new app I found myself repeatedly setting up my project with same packages over and over again so I decided to automate this process.

While this mostly consists of how I organize my projects but can be easily extended to suit any workflow.

Feel free to leave a ⭐ as motivation if this was useful to you 😊

## Features
- Authentication modules such as Register, Login, Forgot password and Reset password
- User management module
- React redux for managing and centralizing application state

## Requirements
- Node 16
- Node package manager (npm)

## Context
```bash
- React (18.0.2)
- Packages:
    - MUI
    - Redux
    - React Redux
    - Redux-Saga
    - Formik
    - Axios
    - Tailwind CSS
```

## Development 

```bash
# Clone the repo
git clone   
cd react-aon-cms  

# Dependencies  
npm install  

# Copy .env.example to .env
cp .env.example .env

# Add APIURL in .env
APIURL=

# Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.   
npm start

```
## Build

```bash

# Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.
npm run build

```
