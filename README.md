# step-marketplace
This project is my diploma project that demonstrates my experience with Node.js, TS, RDBMS

# Requirements
- Node.JS v18 or higher
- MySQL (or another compatible RDBMS)
- npm

## Deployment Steps

Follow these steps to install and run the project locally:

### Clone the repository
```
git clone git@github.com:ViktoriaMalanich/step-marketplace.git
```
### Navigate into the project folder
```
cd step-marketplace
```
### Install dependencies
```
npm install 
```
### Configure environment variables

- Rename .example.env to .env and set your own values
- Open .env in a text editor and provide your own values:

    * Database URL

    * Stripe API keys

    * JWT secret, etc.

### Build the project
```
npm run build
```
### Run database migration
```
npm run migration:up
```

### Start the server

 - For development:
```
  npm run start:dev
```
 - For production:
```
  npm run start
```

### View API documentation
After starting the server, open your browser:
```
http://localhost:8080/api-docs/
```
### Test Stripe payment integration (optional)
http://localhost:8080/stripe-test.html?userId=1


# Notes
- You must create and set up a MySQL database before running the application.
- The Stripe test endpoint is provided only for demonstration and should not be used in production.
- Make sure to secure your .env file and avoid committing it to version control.

## Author

Viktoria Malanich  
GitHub: [@ViktoriaMalanich](https://github.com/ViktoriaMalanich/step-marketplace)

