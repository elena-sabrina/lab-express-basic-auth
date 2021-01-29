
VIEWS

Home
Profile
Sign Up
Sign In


ROUTE HANDLERS

GET - '/' - Home view
GET - '/profile' - Displays the profile of the currently authenticated user
GET - '/authentication/sign-up' - Displays registration form
POST - '/authentication/sign-up' - Handle registration requests
GET - '/authentication/sign-in' - Displays sign in form
POST - '/authentication/sign-in' - Handle sign in requests
POST - '/authentication/sign-out' - Handle sign out request

USER MODEL 

- name
- email
- password???

![logo_ironhack_blue 7](https://user-images.githubusercontent.com/23629340/40541063-a07a0a8a-601a-11e8-91b5-2f13e4e6b441.png)

# Basic Auth

## Introduction

In this exercise, we are going to create a project where we will have all the basic authorization and authentication processes and features that you would in a real application.

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_044a7b23c9b4cf082e1c4fadcd12d308.png)

## Requirements

- Fork this repo
- Clone this repo

## Submission

- Upon completion, run the following commands:

  ```
  git add .
  git commit -m "done"
  git push origin master
  ```

- Create Pull Request so your TAs can check up your work.

## Instructions

### Iteration 0 | Initialize the project

After forking and cloning the project, you have to install all the dependencies:

```sh
$ npm install
```

Now you are ready to start 🚀

## Iteration 1 - Sign Up

We have to create the sign up functionality of the application, that allows new users to create an account. The users have to provide the following information:

- **Username**: Must be unique in our application, and will identify each user.
- **Password**: Must be hashed, using `bcrypt`.

To complete this first iteration, you have to create the `User` model with mongoose, the routes, and the views.

Remember that you should to handle validation errors when a user signs up:

- The fields can't be empty.
- The username can't be repeated.

## Iteration 2 - Login

Once the user has signed up, they have to be able to log in the application. You have to create the view and add the correct functionality in the controller to let them log in the application.

Once the user has logged in, you have to create a session with `express-session` and `connect-mongo`.

Again, we have to check out that the fields are correctly filled before try to authenticate them.

## Iteration 3 - Protected Routes

At this point, we have implemented basic authentication features. Now, we have to create some routes that are protected, meaning that users can't visit these routes unless they're authenticated.

Let's create two different routes protected by authentication:

- GET `/main` - Add a funny picture of a cat and a link back to the home page
- GET `/private` - Add your favorite `gif` and an `<h1>` denoting the page as private.

Create the views and add the middleware configuration to avoid accessing these routes without being authenticated.

## Bonus - Iteration 4 - Frontend validations

Let's add validations to our forms. Remember we have two different forms: sign up and log in.

Remember, when a user signs up or logs in, both the username and password fields must be filled in.

Check out the [documentation](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Data_form_validation) on MDN. See if you can find a _constraint_ that requires the user to fill a field prior to submission.

## Bonus - Iteration 5 - Profile Page

Create the following routes and corresponding views:

- GET `/profile` - Should display basic information about the user, such as the username and user id. Should not be accessible to non-logged-in users.

## Bonus - Iteration 6 - Editing Profile

Add a name property to the user schema that accepts a string and no has additional validators.

Create the following routes and request handlers/corresponding views:

- GET `/profile/edit` - Should display a form that allows the user to edit their name.
- POST `/profile/edit` - Gets `name` property from the request body and updates the user document.

Both routes should disallow non-logged-in users. Also, update the `/profile` view to display the user's name.

## Extra Resources

- [HTML5 Form Validations](http://www.the-art-of-web.com/html/html5-form-validation/)

Happy coding! 💙
