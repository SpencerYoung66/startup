const express = require('express');
const app = express();
const DB = require('./database.js')

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// GetScores
apiRouter.get('/flavors/', (req, res) => {
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

apiRouter.post('/flavors', (req, res) => {
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
apiRouter.post('/vote', (req, res) => {
  // addVote(req.body);
  const result = DB.insertVote(req.body);
  res.send(result);
});

apiRouter.post('/login', (req, res) => {
    ldLogin(req.body);
    // res.send(userFlavors.filter(flavor => flavor.owner == req.body.owner));
})

// Return the application's default page if the path is unknown
app.use((req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// let userFlavors = [{"flavor": "Chocolate", "category": "chocolate", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"}, 
//                    {"flavor": "Birthday Cake", "category": "other", "owner": "Nathan Young", "year": 2022, "winner": "Other"},
//                    {"flavor": "Strawberry", "category": "fruit", "owner": "Grandpa", "year":2021, "winner": "Fruit"},
//                    {"flavor": "Cookie Dough", "category": "other", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"},
//                    {"flavor": "Strawberry", "category": "fruit", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"},
//                    {"flavor": "Double Chocolate", "category": "chocolate", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"},
//                    {"flavor": "Cherry", "category": "fruit", "owner": "Brad Young", "year": 2023, "winner": "Grand Prize"}];
// let votes = [];

let users = [];


// function addFlavor(newFlavor){
    // userFlavors.push(newFlavor);
// }

function addVote(newVote){
    votes = votes.filter(myVote => myVote.user != newVote.user);
    votes.push(newVote);
}

function ldLogin(newUser){
    if((users.filter(user => (user.firstname == newUser.firstname && user.lastname == newUser.lastname)).length == 0)){
        users.push(newUser);
    }
}