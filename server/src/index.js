import 'dotenv/config';
import app from './app.js';
import { testDbConnection } from './db.js';

const port = Number(process.env.PORT || 4000);

async function startServer() {
  try {
    await testDbConnection();
    console.log('PostgreSQL connected successfully.');

    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
