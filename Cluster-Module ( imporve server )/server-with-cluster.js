import { availableParallelism } from "node:os";
import cluster from "node:cluster";
import express from "express";

const numCPUs = availableParallelism();
console.log(numCPUs);

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();

  app.get("/", (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
      sum = sum + i;
    }
    res.json({ message: sum });
  });

  app.listen(4000, () => {
    console.log("Listening on port 3000!");
  });
}
