const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

async function main() {
  // Connect to the database cluster
  const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
  const client = new MongoClient(url);
  const db = client.db('LaborDay');
  const flavorCollection = db.collection('flavors');
  const voteCollection = db.collection('votes');

  // Test that you can connect to the database
  (async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
  })().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
  });

  async function insertFlavor(flavor){
    const result = await flavorCollection.replaceOne(
      {"owner": flavor.owner, "flavor": flavor.flavor, "year": flavor.year},
      flavor,
      {upsert: true});
    return result;
  }

  async function insertVote(vote){
    const result = await voteCollection.replaceOne(
      {"user": vote.user},
      vote,
      {upsert: true});
    return result;
  }

  function getFlavors(req_year, req_user="*") {
    let query = { year: parseInt(req_year)};
    if(req_user != "*"){
      query = { year: parseInt(req_year), owner: req_user };
    }
    else{
      query = { year: parseInt(req_year)};
    }
    // const query = { year: parseInt(req_year), user: req_user };
    // const options = {
    //   sort: { score: -1 },
    //   limit: 10,
    // };
    const cursor = flavorCollection.find(query);
    return cursor.toArray();
  }

  // function getFlavors(req_year) {
  //   const query = { year: parseInt(req_year)};
  //   // const options = {
  //   //   sort: { score: -1 },
  //   //   limit: 10,
  //   // };
  //   const cursor = flavorCollection.find(query);
  //   return cursor.toArray();
  // }






  // // Insert a document
  // const house = {
  //   name: 'Beachfront views',
  //   summary: 'From your bedroom to the beach, no shoes required',
  //   property_type: 'Condo',
  //   beds: 1,
  // };
  // await collection.insertOne(house);

  // // Query the documents
  // const query = { property_type: 'Condo', beds: { $lt: 2 } };
  // const options = {
  //   sort: { score: -1 },
  //   limit: 10,
  // };

  // const cursor = collection.find(query, options);
  // const rentals = await cursor.toArray();
  // rentals.forEach((i) => console.log(i));
  module.exports = { insertFlavor, insertVote, getFlavors };
}

main().catch(console.error);