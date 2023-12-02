const express = require('express');
const uuid = require('uuid');
const { WebSocketServer } = require('ws');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const app = express();
const DB = require('./database.js')

const authCookieName = 'token';

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// Create a websocket object
const wss = new WebSocketServer({ noServer: true });
// const wss = new WebSocketServer({ port:3000 });

server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});

// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      // if (c.id !== connection.id) {
      //   c.ws.send(data);
      // }
      c.ws.send(data);
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  // ws.on('close', () => {
  //   connections.findIndex((o, i) => {
  //     if (o.id === connection.id) {
  //       connections.splice(i, 1);
  //       return true;
  //     }
  //   });
  // });

  // Respond to pong messages by marking the connection alive
  ws.on('pong', () => {
    connection.alive = true;
  });
});

// Keep active connections alive
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);

// JSON body parsing using built-in middleware
app.use(express.json());
app.use(cookieParser());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

// CreateAuth token for a new user
apiRouter.post('/auth/register', async (req, res) => {
  if (await DB.getUser(req.body.firstname, req.body.lastname)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.firstname, req.body.lastname, req.body.password);

    // Set the cookie
    setAuthCookie(res, user.token);

    res.send({
      id: user._id,
    });
  }
});

// GetAuth token for the provided credentials
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.firstname, req.body.lastname);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.token);
      res.send({ id: user._id });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// GetScores
apiRouter.get('/flavors/:Year/:User', async (req, res) => {
  const result = await DB.getFlavors(req.params.Year, decodeURI(req.params.User));
  res.send(result);
  // res.send(userFlavors.filter(flavor => (flavor.owner == decodeURI(req.params.User) && flavor.owner == req.params.Year)));
});

apiRouter.get('/flavors/:Year', async (req, res) => {
    const result = await DB.getFlavors(req.params.Year);
    res.send(result);
    // res.send(userFlavors.filter(flavor => flavor.year == req.params.Year));
  });

// secureApiRouter verifies credentials for endpoints
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const user = await DB.getUserByToken(authToken);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// GetScores
secureApiRouter.get('/flavors/', (req, res) => {
    res.send(userFlavors);
});

// GetScores
apiRouter.get('/flavors/:Year/:User', async (req, res) => {
  const result = await DB.getFlavors(req.params.Year, decodeURI(req.params.User));
  res.send(result);
  // res.send(userFlavors.filter(flavor => (flavor.owner == decodeURI(req.params.User) && flavor.owner == req.params.Year)));
});

apiRouter.get('/flavors/:Year', async (req, res) => {
    const result = await DB.getFlavors(req.params.Year);
    res.send(result);
    // res.send(userFlavors.filter(flavor => flavor.year == req.params.Year));
  });

secureApiRouter.post('/flavors', (req, res) => {
    // addFlavor(req.body);
    const result = DB.insertFlavor(req.body);
    res.send(result);
})

// apiRouter.get('/votes/', (req, res) => {
//     res.send(votes);
//   });

// apiRouter.get('/users/', (req, res) => {
//     res.send(users);
//   });

// SubmitScore
secureApiRouter.post('/vote', (req, res) => {
  // addVote(req.body);
  const result = DB.insertVote(req.body);
  res.send(result);
});

// apiRouter.post('/login', (req, res) => {
//     ldLogin(req.body);
//     // res.send(userFlavors.filter(flavor => flavor.owner == req.body.owner));
// })

// Return the application's default page if the path is unknown
app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}



// let userFlavors = [{"flavor": "Chocolate", "category": "chocolate", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"}, 
//                    {"flavor": "Birthday Cake", "category": "other", "owner": "Nathan Young", "year": 2022, "winner": "Other"},
//                    {"flavor": "Strawberry", "category": "fruit", "owner": "Grandpa", "year":2021, "winner": "Fruit"},
//                    {"flavor": "Cookie Dough", "category": "other", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"},
//                    {"flavor": "Strawberry", "category": "fruit", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"},
//                    {"flavor": "Double Chocolate", "category": "chocolate", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"},
//                    {"flavor": "Cherry", "category": "fruit", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"}];
// let votes = [];

// let users = [];


// function addFlavor(newFlavor){
    // userFlavors.push(newFlavor);
// }

// function addVote(newVote){
//     votes = votes.filter(myVote => myVote.user != newVote.user);
//     votes.push(newVote);
// }

// function ldLogin(newUser){
//     if((users.filter(user => (user.firstname == newUser.firstname && user.lastname == newUser.lastname)).length == 0)){
//         users.push(newUser);
//     }
// }