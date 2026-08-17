const app = require("./src/app.js");
const mongodbConnect = require("./src/db/db.js");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

mongodbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
