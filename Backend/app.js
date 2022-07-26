const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose');
const app = express()
const port = 3001
const ObjectId = require('mongoose').Types.ObjectId;
app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// main().catch(err => console.log(err));
// async function main() {
//   await mongoose.connect('mongodb://localhost:27017/test');
// }

mongoose.connect("mongodb+srv://Prabhat:Opmanopman18@cluster0.ycy1m.mongodb.net/?retryWrites=true&w=majority", {
  useNewURLParser: true,
  useUnifiedTopology: true,
},6000000)
.then(console.log("connected to server"))
.catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  usern: String,
  email: String,
  pass: String,
});
const User = mongoose.model('User', userSchema);

const todosSchema = new mongoose.Schema({
  userId: mongoose.Schema.ObjectId,
  todos: [
    {
      checked: Boolean,
      text: String,
      id: String,
    },
  ],
});
const Todos = mongoose.model("Todos", todosSchema);

app.post('/registor', async (req, res) => {
  const {usern, email, pass} = await req.body;
  const user = await User.findOne({email}).exec();
  if(user){
    res.status(500);
    res.json(
      {
        message: "There already a user by these email id",
      }
    );
    return;
  }
  await User.create({usern, email, pass});
  res.json({
    message: "success"
  }  
  )
})

app.post('/login', async (req, res) => {
  const {usern, email, pass} = await req.body;
  const user = await User.findOne({email}).exec();
  if(!user || user.pass != pass || user.usern != usern){
    res.status(403);
    res.json(
      {
        message: "Invalid Credentials",
      }
    );
    return;
  }
  res.json({
    message: "success"
  }  
  )
})

app.post("/usertod", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [email, pass] = token.split(":");
  const todosItems = req.body;
  const user = await User.findOne({ email }).exec();
  if (!user || user.pass !== pass) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  if (!todos) {
    await Todos.create({
      userId: user._id,
      todos: todosItems,
    });
  } else {
    todos.todos = todosItems;
    await todos.save();
  }
  res.json(todosItems);
});


app.get("/usertod", async (req, res) => {
  const { authorization } = req.headers;
  const [, token] = authorization.split(" ");
  const [email, pass] = token.split(":");
  const user = await User.findOne({ email }).exec();
  if (!user || user.pass !== pass) {
    res.status(403);
    res.json({
      message: "invalid access",
    });
    return;
  }
  const todos = await Todos.findOne({ userId: user._id }).exec();
  res.json(todos);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})