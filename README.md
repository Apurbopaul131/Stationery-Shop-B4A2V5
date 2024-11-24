# Stationery-Shop-B4A2V5

## 1. Project Name: Stationary-Shop

## 2. Project Title: This is Stationary shop project that controls all work related to stationary shop.

## 3. Key Features:

- To create an stationary product.
- To seach stationary product by category, name and brand.
- To Search specfic stationary project by id.
- To update specific stationary product by id.
- To delete specific stationary product by id.
- To create an order for available products.
- To callculate revenue for all orders.

## 4. Backend Technology Used:

- Typescript
- Express Js
- Mongoose
- MongoDB

## 5. How to Install and Run the Project:

### 1. Must be ensure the following prerequisites are already installed in your computer

- Node.js (v16 or later)
- npm (comes with Node.js) or yarn
- MongoDB (local or cloud-based)

### 2. Clone the Repository

Run the following command in your terminal to clone the repository:

```javascript
git clone https://github.com/Apollo-Level2-Web-Dev/batch-4-assignment-2.git
```

### 3. Navigate to the Project Directory

Run the following command to by adding expected directory name:

```javascript
cd your-repo-name
```

### 4. Install Dependencies

Install the required dependencies using npm or yarn:

```javascript
npm install
// or
yarn install
```

### 5. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables to configure your application:

```javascript
//.env
PORT:5000
DATABASE_URL: mongodb+srv://<db_username>:<db_password>@newmission.cmtjh.mongodb.net/?retryWrites=true&w=majority&appName=Newmission

//Replace your <db_username>, <db_password> and database name.
```

### 6. Start MongoDB

Make sure your MongoDB instance is running:

- If running locally, start MongoDB with:

```javascript
mongod;
```

- If using a cloud-based database like MongoDB Atlas ensure your connection string in .env is correctly configured.

### 7. Run the Project

```javascript
//development mode
npm run start:dev
//production mode
npm run start:prod
```

### 8. Access the API

Once the server is running, you can access the API at:

```javascript
http://localhost:5000
```

### 9. Test the Api using postman or Api dog

- Create a Stationery Product:

```javascript
// Method: post
http://localhost:5000/api/products

//Test data:
{
  "name": "Notebook",
  "brand": "Moleskine",
  "price": 15,
  "category": "Office Supplies",
  "description": "A high-quality notebook for professionals.",
  "quantity": 200,
  "inStock": true
}
```

- Get All Stationery Products:

```javascript
// Method: get
http://localhost:5000/api/products?searchTerm=Office Supplies

```

- Get a Specific Stationery Product

```javascript
// Method: get
http://localhost:5000/api/products/:productId

```

- Update a Stationery Product

```javascript
// Method: put
http://localhost:5000/api/products/:productId

```

- Delete a Stationery Product

```javascript
// Method: delete
http://localhost:5000/api/products/:productId

```

- Order a Stationery Product

```javascript
// Method: post
http://localhost:5000/api/orders

//Test data
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 36
}

```

- Calculate Revenue from Orders

```javascript
// Method: get
http://localhost:5000/api/orders/revenue

```

## 6. [Project Live Link](https://stationery-shop-theta.vercel.app/):
