import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import http from 'http';
import { fileURLToPath } from 'url';
import connectionPool from './database/dbConfig.js';
import { socketsConfig } from './sockets/socketConfig.js';
// router here
import { authUserRouter } from './routes/authRouters.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes setup
app.use('/api/v1/', authUserRouter);

// app.use('/api/v1/', userRouter);
// app.use('/api/v1/', userRoleRouter);
// app.use('/api/v1/', publisherRouter);
// app.use('/api/v1/', journalRouter);
// app.use('/api/v1/', articleRouter);
// app.use('/api/v1/', editorRouter);
// app.use('/api/v1/', historyStageRouter);
// app.use('/api/v1/', emailTemplateRouter);
// app.use('/api/v1', artSendRouter);
// app.use('/api/v1/', artRecRouter);
// app.use('/api/v1/', stageRouter);
// app.use('/api/v1/', emailHistroyRouter);


const server = http.createServer(app);
app.use(express.static(path.join(__dirname, 'dist')))
export const io = socketsConfig(server);


// database connection
const handleDatabaseConnection = () => {
  // Attempt to get a connection from the pool
  connectionPool.getConnection((err, connection) => {
    if (err) {
      console.error('Error acquiring connection from pool:', err);
      // Retry connection after a delay
      setTimeout(handleDatabaseConnection, 5000);
    } else {
      console.log('Connected to the database');

      // Release the connection back to the pool
      connection.release();

      // Start the server once the database connection is successful
      server.listen(port, DOMAIN, () => {
        console.log(`Server running on port: ${port} and domain: ${DOMAIN}`);
      });
    }
  });
};




// Server start
const port = process.env.PORT || 8000;
const DOMAIN = process.env.BASE_URL || 'localhost';


handleDatabaseConnection();

// Health check endpoint
app.get('/health', async (req, res) => {
  const { url: urlToCheck, method: methodToCheck } = req.query;

  // Validate input
  if (!urlToCheck || !methodToCheck) {
    return res.status(400).json({ status: 'error', message: 'Both URL and method must be provided for health check.' });
  }

  try {
    const result = await checkServiceAvailability(urlToCheck, methodToCheck);

    if (!result.healthy) {
      return res.status(500).json({
        status: 'unhealthy',
        checks: [result],
      });
    }

    res.status(200).json({ status: 'healthy' });
  } catch (error) {
    console.error('Health check error:', error); // Log the error for debugging
    res.status(500).json({ status: 'unhealthy', error: 'Internal server error' });
  }
});

// Function to check the availability of a service
// Function to check the availability of a service
const checkServiceAvailability = async (url, methodToCheck) => {
  // console.log(`Checking service availability for: ${url} with method: ${methodToCheck}`);

  // Remove query parameters from the URL
  let temp1 = url.split('?')[0]; // Only take the base URL before any query parameters

  // Remove trailing slash if it exists
  temp1 = temp1.replace(/\/+$/, '');

  // console.log(temp1); // Log the cleaned URL

  const routes = extractRoutesFromApp(); // Assuming this function retrieves your route definitions
  // console.log(routes); // Log the routes for debugging

  // Find a matching route based on the cleaned URL
  const matchedRoute = routes.find(route => route.path === temp1);

  if (matchedRoute && matchedRoute.methods.includes(methodToCheck.toUpperCase())) {
    return { healthy: true, service: url, methods: matchedRoute.methods };
  } else {
    return { healthy: false, service: url, error: 'Service not found in routes or method not allowed' };
  }
};

// Function to extract routes from the app
const extractRoutesFromApp = () => {
  const routes = [];
  const baseUrl = process.env.HEALTH_URL;

  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      const methods = Object.keys(middleware.route.methods).map(method => method.toUpperCase());
      routes.push({ path: `${baseUrl}${middleware.route.path}`, methods });
    } else if (middleware.name === 'router') {
      middleware.handle.stack.forEach((handler) => {
        const route = handler.route;
        if (route) {
          const methods = Object.keys(route.methods).map(method => method.toUpperCase());
          routes.push({ path: `${baseUrl}${route.path}`, methods });
        }
      });
    }
  });

  return routes;
};

app.listen(port, () => {
  console.log(`Server is running at http://${DOMAIN}:${port}`);
});

// Note: If you encounter a port already in use issue,
// npx kill-port 8000