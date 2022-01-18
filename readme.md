##  Problem statement

###   Develop a digital vault that will help users store all their passwords and share it across all devices.

#### This project is to develop  backend with database and APIs to to store and share passwords.
#### The APIs/database features

- App would be login based. User would have to create an account first. His phone number would act as the username. His login password should be a 4-digit pin code. In case of mobile app, user would also have the option to unlock the app using his fingerprint instead of a pin.

- In case if the user forgets his pin, his password should be reset by mobile OTP messages. In case if the user forgets once again, the users data should be cleared.

- Home Screen: After successful login/signup, the home page is displayed. The home page will display a list of items that the user has stored. The user would also have the ability to group the stored passwords in separate categories (like social media, wallet, bank account, etc.)

 The homepage would also have options for the following:

 1.  Add a new password for a particular website.
 
 2. Search for an existing item in the stored list of passwords. This acts as a filter for user to quickly search for an item in the list.

 3. Sync up the data to the cloud. This ‘Sync’ operation will allow the user to sync the data to one of his configured cloud accounts. This will make sure that the user can download the saved passwords once again in case if he loses any of his passwords.

 4. Adding new website password: User should be able to provide a website URL, a short name for the site, the folder name where the items should be stored (in case if the user wants to have separate folders/categories), username for the site and the password. He can optionally enter some notes. The added password item would appear in the home screen. The app should also fetch the icon from the given URL and add that as logo for that particular item.
 
 5. Each added password would appear as one item in the home screen. Each item would have the following features. The ‘Copy password’ link will copy the password to the clipboard. Tapping on the URL would launch the URL in the browser. Tapping on any remaining portion of the item (logo or the item name) would launch the edit screen where the user could edit the item details.

 ### Packages required
 1.  bcryptjs
 2.  body-parser
 3.  copy-paste
 4. express
 5. joi
 6. joi-objectid
 7. joi-oid
 8. jsonwebtoken
 9. lodash
 10.  logo-scrape
 11. mongoose
 12. multer
 13. swagger-jsdoc
 14. swagger-ui-express
 15.  twilio
 16. validator
 17. nodemon
 #### steps to run app
 - jwt secret key,twilio account credentails ,salt,mongodb details etc.. has to be in config/config.js file
 - nodemon run app.js or set script in pacakge.json as  `"start": "nodemon app.js"`, then run `npm start`
 - Api Documentation `http://localhost:8000/api-docs/`

 #### API
 - /signUp - Create account providing mobile number and MPIn of 4 digit
 - /Login  - Login using mobile number and MPIn
 - /forgotMpin - provide phone number an OTP will be sent 
 - /resetMpin  - verfity OTP and set New MPIn 
 - /home - User gets all website information he stored.User can also get website information by category (social media)
 - /addSite - To add new site credentails(url,siteName,username,password,notes)
- /viewItem/:id - view specific website information by providing the id 
- /edit/:id - user can edit any item by providing id of the website
- /itemPassword/:id - copy the website password to clipboard
- /sync - sync to a file 

