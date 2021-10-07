const cors = require ("cors");
const dotenv = require ("dotenv");
const express = require ("express");
// const { dirname, join } = require ("path");
// const { fileURLToPath } = require ("url");
const authRouter = require ("./routes/auth-routes.js");
const usersRouter = require ("./routes/users-routes.js");

dotenv.config();

// const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
// const PORT = process.env.PORT || 5000;
const corsOptions = { credentials: true, origin: process.env.URL || "*" };

app.use(cors(corsOptions));
app.use(express.json());

// app.use("/", express.static(join(__dirname, "public")));
app.use("/", express.static("./public"));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// app.listen(PORT, () => {
//   console.log(`Server is listening on port:${PORT}`);
// });


const functions = {
  // WITHOUT ARROW FUNCTION
  // add: function (num1,num2) {
  //     return num1 + num2;
  // }

  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: (x) => x,
  createUser: () => {
    const user = { firstName: "Furqan" };
    user["lastName"] = "Irfan";
    return user;
  },
};
// module.export = functions;

module.exports = { app, functions };
