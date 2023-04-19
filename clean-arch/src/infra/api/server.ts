require("dotenv").config();
import { app } from "./express";

// dotenv.config()
const port = Number(process.env.PORT || 3001);

app.listen(port, () => {
  console.log("listening on port ", port);
});
