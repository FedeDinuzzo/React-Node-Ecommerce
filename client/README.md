# Proyect info

This project was created with the purpose of being a thesis for the react course at CODERHOUSE 

link to the demo: https://react-ecommerce-tailwind.web.app/

You can see Navigataion gif at: ./src/Images/Navigation/


# Library version

You can look at the in the package.json file (line 5 - "dependencies"), the libraries used and their versions


# Additional libraries used in the app

-tailwind us used to make the desing of the app and make it fully responsvie, reducing the number of files and the use of css when loading each component of the app

-firebase is used to put the page online with firebase hosting

-gsap is used to make the hero watch animation, giving more impact to the user when loads the page

-react-icons is used to set quickly all app icons

-spinners-react is used to set the Loader component of the app

-react-scroll is used to improve the user experience when switching between pages and appear or not at the top of the page depending on what is most useful

-react-toastify is used to generate a visible notification for a few seconds when the user interacts with the products by adding them to the cart


# Deployment

INSTALL THE FIREBASE TOOLS CLI

npm install -g firebase-tools


## First time deploy

firebase login

firebase init
(don't forget to use build as public directory!)
(just first time then no!)

first create the local build with: npm run build 
and then firebase deploy

