# Express Movien CRUD with MongoDB and OpenAI Prompt Suggestion

This is a RESTful API built with Express.js and MongoDB for tracking expenses. It allows users to log and manage their daily expenses.

## Application

**Backend** -  Express.js (Node.js).
**Database** - MongoDB

**API Documentation**: Postman or Swagger (optional)

## Prerequisites
- Node.js v14 or above
- MongoDB (either local or cloud, e.g., MongoDB Atlas)

## Running locally

### Installation

- Clone this repo:
    `git clone https://github.com/paularinzee/expense-tracker.git`
- Navigate to the project directory:
    `cd expense-tracker`
- Install dependencies:
    `yarn install`

- Start the server:
    `yarn start`
- The API will be accessible at http://localhost:3000

## API Endpoints
 ### User
| Method  | Endpoint | Dscription
| ------------- | ------------- | ------------- |
| POST  | api/users/register| Register User |
| POST  | api/users | Login User |
| POST  | api/users/forgotpassword | User forgot password |
| POST  | api/users/resetPassword| User reset password |
| GET  | api/users/dashboard| User dashboard |

### Transactions
| Method  | Endpoint | Dscription
| ------------- | ------------- | ------------- |
| POST  | api/transactions/addIncome| Add income |
| POST  | api/addExpense | Add expense |
| DELETE  | api/transactions/id | Delte transaction |
| PATCH  | api/transactions| Edit transaction |
| GET  | api/transactions| Show transaction |



## Author

[Paul Nnaji](https://github.com/paularinzee)

## License

[MIT](./LICENSE)
