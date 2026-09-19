# CapstoneDemo

A small Express API configured to connect to MongoDB Atlas with Mongoose.

## Setup

1. Open `.env`.
2. Replace `<db_password>` with the password for the `dlinhngph2305_db_user`
   MongoDB Atlas user. URL-encode the password if it contains special characters.
3. In MongoDB Atlas, make sure your current IP address is allowed under **Network
   Access**.
4. Start the development server:

   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`. Test the database connection
at `http://localhost:3000/api/health`.

The connection uses the `capstonedemo` database by default. You can change it with
`MONGODB_DB` in `.env`.

## Commands

- `npm run dev` starts the server with automatic restarts.
- `npm start` starts the server normally.
- `npm run check` checks the JavaScript files for syntax errors.

The local `.env` file is excluded from Git. Commit `.env.example` only, and never
commit the real database password.
