# angularNodeApp

## A simple REST API with authentication which can create users and create tasks.  Features include:

- Angular for frontend.
- Full CRUD features for User instances.
- Hash encryption of passwords and access management with JWT tokens.  
- Restricted user access to CRUD operations based on JWT tokens.
- This API was built for training purpose.

### SETUP INSTRUCTIONS

Node.js version 12+ and npm must be installed on your machine.  After downloading code do the following commands:
```
sudo npm install
touch dev.env
vim dev.env
```

Insert the following lines in `dev.env`, replacing all `<content>` with your own information:

```
MONGODB_URL=<mongodb connection string>
SECRET=appleisgood
```

Then for angular project
```
cd ngApp
sudo npm install
ng serve
```

To run the web server return to the root of the repository and type:
```
npm run dev
```

## Server

The server is made on `nodejs` (v12.4.0)

`Express.js` is used as the server framework

## NPM Library

* `jsonwebtoken` - to create authentication token and encription.

* `mongoose` - MongoDB library for JS.

* `validator` - to validate and sanitize string.


## Using Router in Angular we access the data through these calls 

* The various requests and endpoints are:-

  * POST `/register` - to create user.

  * POST `/login` - to login.

  * POST `/logout` - to logout.

  * GET `/users/me` - to get user profile.

  * GET `/users-list` - to get list of user.

  * PATCH `/users/me` - to update user information.

  * DELETE `/users/me` - to delete user.
  
  ![Screenshot from 2021-02-23 21-48-11](https://user-images.githubusercontent.com/47986636/108967422-84862f80-76a5-11eb-8df7-3ae606f29e57.png)
  
![Screenshot from 2021-02-23 21-47-51](https://user-images.githubusercontent.com/47986636/108967436-894ae380-76a5-11eb-9b5b-935ed7ad8c98.png)

![Screenshot from 2021-02-23 21-47-34](https://user-images.githubusercontent.com/47986636/108967446-8cde6a80-76a5-11eb-8e38-74c58bf684f4.png)

![Screenshot from 2021-02-23 21-47-17](https://user-images.githubusercontent.com/47986636/108967456-8fd95b00-76a5-11eb-9e12-52c3576fe9b0.png)
