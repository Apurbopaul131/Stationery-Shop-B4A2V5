"# Stationery-Shop-B4A2V5"

## 1. Project Title: This is Stationary shop project that controls all work related to stationary shop.

## 2. Key Features:

- To create an stationary product.
- To seach stationary product by category, name and brand.
- To Search specfic stationary project by id.
- To update specific stationary product by id.
- To delete specific stationary product by id.
- To create an order for available products.
- To callculate revenue for all oreders.

## 3. Backend Technology Used:

- Typescript
- Express Js
- Mongoose
- MongoDB

## 4. How to Install and Run the Project:

### 1. Clone the Repository

Run the following command in your terminal to clone the repository:

```javascript
git clone https://github.com/Apollo-Level2-Web-Dev/batch-4-assignment-2.git
```

### 2. Navigate to the Project Directory

Run the following command to by adding expected directory name:

```javascript
cd your-repo-name
```

### 3. Navigate to the Project Directory

Install the required dependencies using npm or yarn:

```javascript
npm install
// or
yarn install
```

### 4. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables to configure your application:

```javascript
//.env
PORT:5000
DATABASE_URL: mongodb+srv://<db_username>:<db_password>@newmission.cmtjh.mongodb.net/?retryWrites=true&w=majority&appName=Newmission

//Replace your <db_username>, <db_password> and database name.
```

### 5. Start MongoDB

Make sure your MongoDB instance is running:

- If running locally, start MongoDB with:

```javascript
mongod;
```

- If using a cloud-based database like MongoDB Atlas ensure your connection string in .env is correctly configured.
