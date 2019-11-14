# okta-auth-node
This app is to implement okta endpoints for user authentication service using nodeJS module

Follow the steps below:

 - Clone the repo - `git clone https://github.com/akashgarg04/okta-auth-node.git `
 - Create a developers account at ` https://developer.okta.com/signup/ `
 - Create an .env file `touch .env` Add the following variables into the `.env` file.
      ```
      export ORG_URL=https://dev-<####>.okta.com
      export CLIENT_ID=
      export CLIENT_SECRET=
      export HOST_URL=http://localhost:3000
      export SECRET=a-random-string
      export USER_PROFILE_TOKEN=
      ```
 - run `npm install`
 - run `source .env` to load the environmental variables
 - run `nodemon`

The following endpoints are implemented and could be run using postman

1) *Register* a new User into Okta :  POST   http://localhost:3000/auth/register
  
    ```
    {
      "firstname": "Hulk",
      "lastname": "Banner",
      "email": "theOtherGuy@marvel.com",
      "password": "password"
    }
    ```

2) *Login* an existing user using Okta : POST   http://localhost:3000/auth/login

    ```
    {
      "email": "abc@xyz.com",
      "password": "password"
    }
    ```

3) *Reset password* for a User :  POST   http://localhost:3000/auth/resetPassword

    ```
    {
      "email": "abc@xyz.com"
    }
    ```

4) Get *User profile* info from Okta :  GET   http://localhost:3000/auth/profile

    ```
    {
      "email": "abc@xyz.com"
    }
    ```

5) *Create a Session* for a logged-in user using the session token :  POST   http://localhost:3000/auth/createsession

    ```
    {
      "token": "qwert12345"
    }
    ```

6) *Deactivate a user* in Okta : POST   http://localhost:3000/auth/deactivateUser

    ```
    {
      "email": "abc@xyz.com"
    }
    ```

7) *Delete a user* in Okta : POST   http://localhost:3000/auth/deleteuser

    ```
    {
      "email": "abc@xyz.com"
    }
    ```
