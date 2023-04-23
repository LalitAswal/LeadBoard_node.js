const mongoose = require('mongoose');

const url = "mongodb://localhost:27017/leaderboard";
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    family:4
}).then(()=>{
    console.log('mongodb connected...')
}).catch((error)=>{
    console.log('err is mongodb', error)
})

const User = mongoose.model('User', {
  score: Number,
  username: String
});

// const usersToAdd = [
//   {
//     score: 45,
//     username: "mandeep",
//   },
//   {
//     score: 89,
//     username: "Ranjeet",
//   },
//   {
//     score: 78,
//     username: "nikhil",
//   },
//   {
//     score: 88,
//     username: "Manu",
//   },
//   {
//     score: 56,
//     username: "sumit",
//   },
//   {
//     score: 96,
//     username: "amit",
//   }
// ];

// usersToAdd.forEach((user) => {
//   const newUser = new User(user);
//   newUser.save().then(() => {
//     console.log('User added:', newUser);
//   }).catch((error) => {
//     console.log('Error adding user:', error);
//   });
// });

module.exports = mongoose.connection;
