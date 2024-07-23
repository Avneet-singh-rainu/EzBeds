const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createToken = require(".//util/SecretToken");
const jwt = require("jsonwebtoken");
const verifyToken = require("./AuthMiddleware/Auth");

//******************************************************************* */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
require("dotenv").config();
app.use(cookieParser());

//************************************DATABASE************************************** */
const URL = process.env.MONGO_URL;

mongoose
  .connect(URL + "/shivathon", { useNewUrlParser: true })
  .then(() => {
    console.log("connected to todo database...");
  })
  .catch((e) => {
    console.log(e.message);
  });

const Schema = mongoose.Schema({
  name: {
    type: String,
  },
  password: {
    type: String,
  },
  no_of_beds: {
    type: Number,
  },

  hospital: {
    type: String,
  },

  image: {
    type: String,
  },

  available: {
    type: String,
  },
  next_available: {
    type: String,
  },
  price: {
    type: Number,
  },
  address: {
    type: String,
  },
  contact: {
    type: Number,
  },
  location: {
    latitude: { type: String },
    longitude: { type: String },
  },
});

/*const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

const userdata = mongoose.model("User", userSchema);  */

const info = mongoose.model("info", Schema);

//************************************DATABASE**************************************** */

//*************************************AUTH************************************************ */
app.post("/login", async (req, res, next) => {
  const { name, password } = req.body;

  const user = await info.findOne({ name });
  const userpassword = await info.findOne({ password: password });
  console.log(userpassword);

  if (!name || !password) {
    return res.json({ message: "Please provide details" });
  }

  if (!user) {
    return res.json({ message: "user not found" });
  }

  if (!userpassword) {
    return res.json({ message: "password did not match" });
  }

  const userdata = await info.findById(user._id);
  const token = jwt.sign({ user: user._id }, "ssshhh");

  res.json({
    success: true,
    token: token,
    message: "Successfully Logged In",
    userdata,
  });

  next();
});

app.post("/signup", async (req, res, next) => {
  try {
    const { name, password } = req.body;
    const user = await info.findOne({ name });

    if (user) {
      return res.json({ message: "user already exists" });
    }

    const newuser = await new info(req.body);
    newuser.save();

    const token = createToken(newuser._id);
    res.cookie("token", token);
    res.json({ success: true, message: "User Added Successfully" });
    res.status(200).json(newuser);
    next();
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/logout", (req, res) => {});
//************************************************ROUTES******************************************************* */
app.get("/", async (req, res) => {
  try {
    const token = req.cookies.token;

    const user = await info.find();
    return res.status(200).json(user);

    /* if (!token) {
      return res.json({ status: 404, message: "Token not found you need to login" });
    }

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
      if (err) {
        return res.json(err.message);
      }
     else{*/

    /*const user = await info.find();
    return res.status(200).json(user);*/
  } catch (error) {
    // });}

    res.send(error.message || error);
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const data = await info.findById(id);
    console.log(data)
    res.status(200).json(data);
  } catch (error) {
    res.send(error.message || error);
  }
});

app.post("/beds", verifyToken, (req, res) => {
  try {
    const data = new info(req.body);
    data.save();
    res.status(200).json(data, { user: user });
  } catch (error) {
    res.json(error.message || error);
  }
});

app.delete("/beds/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return console.log("no bed selected");
    }
    const data = await info.findByIdAndDelete(id);
    res.status(200).send("deleted");
  } catch (error) {
    res.status(403).send({ message: "Only admins can make changes" });
  }
});

app.put("/beds/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const data = await info.findByIdAndUpdate(id, req.body);
    res.send("updated");
  } catch (error) {
    res.send(error.message || error);
  }
});


app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully" });
});



app.listen(3000, () => {
  console.log("conneted to server)");
});
