const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../../models/admin");
const Data = require("../../models/data");
const User = require("../../models/user");
const {
  registerValidation,
  loginValidation,
} = require("../../helper/validation");

const createUser = async (body) => {
  const salt = await bcrypt.genSalt(10);
  const { name, email } = body;
  const password = await bcrypt.hash(body.password, salt);
  const isAdmin = true;
  return Admin({ name, email, password, isAdmin });
};

router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }
  const emailExists = await Admin.findOne({ email: req.body.email });
  if (emailExists) {
    res.status(400).send("Email already exists");
  }
  const admin = await createUser(req.body);
  try {
    await admin.save();
    res.send({ admin: admin._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const admin = await Admin.findOne({ email: req.body.email });
  if (!admin) return res.status(400).send("Email doesn't exists");
  const validPass = await bcrypt.compare(req.body.password, admin.password);
  if (!validPass) {
    res.status(400).send("Invalid password");
  }
  try {
    const token = jwt.sign({ _id: admin._id }, process.env.TOKEN_SECRET);
    res.send({
      admin: admin.name,
      id: admin._id,
      token: token,
      isAdmin: admin.isAdmin,
    });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Data.find();
    return res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

module.exports = router;
