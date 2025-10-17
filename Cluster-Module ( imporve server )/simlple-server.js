import express from "express";

const app = express();

app.get("/", (req, res) => {
  let sum = 0;

  for (let i = 0; i < 1000000; i++) {
    sum = sum + i;
  }

  res.json({ message: sum });
});

app.listen(3000, () => {
  console.log("Listening on port 3000!");
});
