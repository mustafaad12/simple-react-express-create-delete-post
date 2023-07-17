import { Router } from "express";

const router = Router();

let posts = [{ title: "title", content: "content" }];

router.get("/post", (req, res) => {
  res.json(posts);
});

router.post("/post", (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });

  res.json({ title, content });
});

router.delete("/post", (req, res) => {
  const { title } = req.body;

  console.log(title);

  posts = posts.filter((post) => post.title !== title);

  res.json({ messgae: "successfully deleted" });
});

export default router;
