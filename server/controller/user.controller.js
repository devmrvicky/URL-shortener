import { URLModel } from "../model/url.model.js";
import { User } from "../model/user.model.js";

const signupUser = async (req, res) => {
  const { name, email, password } = req.body;
  // do some validation work with these fields
  if (!name || !email || !password) {
    res.render("signup", {
      error: "all fields are require.",
    });
  }
  const userDoc = await User.create({
    name,
    email,
    password,
  });

  if (!userDoc) {
    res.render("signup", {
      error: "An error occur while creating user",
    });
  }

  const urls = await URLModel.find();
  res.render("home", {
    user: userDoc,
    urls,
  });
};

export { signupUser };
