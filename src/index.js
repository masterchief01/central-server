const express = require("express");
const morgan = require("morgan");
const { port } = require("./config");

const getStackOverflowAnswer = require("./libs/stackoverflow");
const getYoutubeAnswer = require("./libs/youtube");

const app = express();
app.use(morgan("dev"));

app.get("/health", (req, res) => {
  res.json({ status: "running..." });
});

app.get("/", async (req, res) => {
  const { query } = req.query;

  try {
    const stackoverflow = await getStackOverflowAnswer(query);
    const youtube = await getYoutubeAnswer(query);
    res.json({
      stackoverflow: stackoverflow,
      youtube: youtube,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({ stackoverflow: [], youtube: [], google: [] });
  }
});

app.listen(port, () =>
  console.log(
    `[server ${new Date().toISOString()}]: 🚀 listening on port: ${port}`
  )
);