const express = require('express');
const client = require('./config/redisConnection');
const connection = require('./config/mongodbConnection')

const app = express();


app.use(express.json())


// app.get('/LeadBoard',async (req,res) =>{
//     let result = client.ZREVRANK()
//     console.log('cehcking result', result)
// }) 
// app.post('/addUser', async(req,res) =>{
//     res.send('hello how are you')
// }) 

// app.get('/:user', async(req,res)=>{

// })
app.get('/leaderboard', async (req, res) => {
    const cachedLeaderboard = await client.zrevrange('leaderboard', 0, -1);
    if (cachedLeaderboard.length > 0) {
      console.log('cached leaderboard:', cachedLeaderboard);
      res.send(cachedLeaderboard);
    } else {
      const users = await connection.find().sort('-score').limit(10);
      const leaderboard = [];
      for (let i = 0; i < users.length; i++) {
        leaderboard.push(users[i].score);
        leaderboard.push(users[i].username);
      }
      redisClient.zadd('leaderboard', leaderboard);
      redisClient.expire('leaderboard', 300);
      console.log('leaderboard saved to cache');
      res.send(leaderboard);
    }
  });
  
  app.post('/adduser', async (req, res) => {
    const { username, score } = req.body;
    const user = new connection({
      username,
      score,
    });
    await user.save();
    console.log(`user ${username} with score ${score} added to MongoDB`);
    res.send(`user ${username} with score ${score} added to MongoDB`);
  });
  
  app.get('/user/:username', async (req, res) => {
    const { username } = req.params;
    const user = await connection.findOne({ username });
    if (!user) {
      res.status(404).send(`User ${username} not found`);
      return;
    }
    const rank = await redisClient.zrevrank('leaderboard', username);
    const response = {
      username: user.username,
      score: user.score,
      rank: rank + 1, // Redis ranks are zero-based
    };
    res.send(response);
  });



module.exports = app;