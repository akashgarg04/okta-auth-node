# okta-auth-node
This app is to implement okta endpoints for user authentication service using nodeJS module

Follow the steps below:

 - Clone the repo - `git clone https://github.com/akashgarg04/okta-auth-node.git `
 - create an .env file `touch .env`
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

The following endpoints are defined and could be run 

1) Get User Info from Okta :  GET   http://localhost:3000/auth/profile
    ```
    {
      email: "abc@xyz.com"
    }
    ```
2) 
