# HelpUpUA Server

This project is the backend for the **HelpUpUA** volunteering platform, which allows users to register, log in, and create and manage volunteering opportunities. **Empowering communities through volunteering!**

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Scripts](#scripts)
- [API Usage](#api-usage)
  - [Authentication](#authentication)
  - [Opportunities](#opportunities)
- [Development Tools](#development-tools)
- [Testing](#testing)
- [Contribution](#contribution)
- [License](#license)

## Technologies

- **Node.js**: JavaScript runtime for building server-side applications.
- **NestJS**: Framework for building efficient, scalable Node.js server-side applications.
- **TypeScript**: A superset of JavaScript that compiles to clean JavaScript output.
- **Prisma**: Open-source database toolkit simplifying database access and management.
- **Swagger**: For API documentation.
- **class-validator**: For data validation.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/YK9968/help_up_ua_server.git
   cd help_up_ua_server

   ```

2. **Install dependencies**

`npm install` or `yarn install`

3. **Set up environment variables:**
   Create a .env file based on .env.example and configure it according to your environment.
   Start the server: `npm run start:dev`

## Scripts

`npm run build`: Compiles the project into JavaScript.
`npm run format`: Formats the code using Prettier.
`npm run lint`: Runs ESLint to check the code.
`npm run test`: Runs tests using Jest.
`npm run test`:watch: Runs tests in watch mode.
`npm run test`:cov: Generates a test coverage report.

## API Usage

### Authentication

### Register User

- **Method:** POST
- **URL:** `/auth/register`
- **Request Body:**
  ```json
  {
    "firstName": "FirstName",
    "lastName": "LastName",
    "email": "example@mail.com",
    "password": "Password123",
    "phone": "1234567890",
    "age": 25,
    "isCompany": false
  }
  ```

### Login User

- **Method:** POST
- **URL:** `/auth/login`
- **Request Body:**

  ```json
  {
    "email": "example@mail.com",
    "password": "Password123"
  }
  ```

  ### Get New Tokens

- **Method:** POST
- **URL:** `/auth/acces-token`
- **Request Body:**

  ```json
  {
    "refreshToken": "Your refresh token"
  }
  ```

### Opportunities

### Get All Opportunities

- **Method:** GET
- **URL:** `/opportunities`

### Get User Opportunities

- **Method:** GET
- **URL:** `/my-opportunities`
- **Authentication Required**: Yes

### Get Opportunity by ID

- **Method:** GET
- **URL:** `/opportunities/:id`

### Create Opportunity

- **Method:** POST
- **URL:** `/opportunities`
- **Request Body:**

  ```json
  {
    "title": "Opportunity Title",
    "organizationName": "Organization Name",
    "website": "https://example.com",
    "email": "contact@example.com",
    "description": "Opportunity description.",
    "date": "2024-10-20",
    "typeWork": "Volunteer",
    "imageUrl": "https://example.com/image.jpg",
    "location": "City, Country"
  }
  ```

  ### Update Opportunity

- **Method:** PATCH
- **URL:** `/opportunities/:id`
- **Request Body:**

  ```json
  {
    "title": "Opportunity Title",
    "organizationName": "Organization Name",
    "website": "https://example.com",
    "email": "contact@example.com",
    "description": "Opportunity description.",
    "date": "2024-10-20",
    "typeWork": "Volunteer",
    "imageUrl": "https://example.com/image.jpg",
    "location": "City, Country"
  }
  ```

### Delete Opportunity

- **Method:** DELETE
- **URL:** `/opportunities/:id`

## Testing

To run the tests, use the following command:

```bash
npm run test
```

## Contribution

We welcome contributions to the HelpUpUA Server! To contribute, please follow these steps:

1. **Fork the repository**: Click on the "Fork" button in the top right corner of the repository page.
2. **Create your branch**:

   ```bash
   git checkout -b feature/YourFeature
   ```

## Development Tools

- **NestJS**: Framework for building efficient, scalable Node.js server-side applications.
- **TypeScript**: A superset of JavaScript that compiles to clean JavaScript output.
- **Prettier**: An opinionated code formatter.
- **ESLint**: A static code analysis tool for identifying problematic patterns in JavaScript code.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Supertest**: A library for testing HTTP servers.
- **Prisma**: An open-source database toolkit that simplifies database access and management.
- **ts-jest**: A TypeScript preprocessor for Jest.

### License

This project is licensed under the MIT License.

Thank you for using HelpUpUA Server! For more information or to contribute, please refer to the documentation or contact the project maintainers.
