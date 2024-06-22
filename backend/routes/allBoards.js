const express = require("express");

const router = express.Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
router.get("/", async (req, res) => {
  const boards = await prisma.board.findMany();
  return res.json(boards);
});

router.post("/", async (req, res) => {
  const { title, category, author, image, createdAt } = req.body;
  const newBoard = await prisma.board.create({
    data: { title, category, author, image, createdAt },
  });
  res.json(newBoard);
});

router.get("/search", async (req, res) => {
  const { boardName } = req.query;
  try {
    const searchedBoards = await prisma.board.findMany({
      where: {
        title: {
          contains: boardName,
          mode: "insensitive",
        },
      },
    });
    res.json(searchedBoards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const searchedBoard = await prisma.card.findMany({
      where: { boardId: parseInt(id) },
    });
    res.json(searchedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.post("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const boardId = parseInt(id);
    const { cardTitle, author, message, gif } = req.body;
    const board = await prisma.board.findUnique({
      where: { boardId },
    });
    if (!board) {
      return res.status(404).send("Board not found");
    }
    const newCard = await prisma.card.create({
      data: { cardTitle, author, message, gif, boardId },
    });
    res.json(newCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.patch("/:id/:cardId", async (req, res) => {
  try {
    const { id, cardId } = req.params;
    const boardId = parseInt(id);
    const { voteCount } = req.body;
    const board = await prisma.board.findUnique({
      where: { boardId },
    });
    if (!board) {
      return res.status(404).send("Board not found");
    }
    const updatedCard = await prisma.card.update({
      where: { cardId: parseInt(cardId) },
      data: { voteCount },
    });
    res.json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.patch("/comments/:id/:cardId", async (req, res) => {
  try {
    const { id, cardId } = req.params;
    const boardId = parseInt(id);
    const { comment } = req.body;
    const board = await prisma.board.findUnique({
      where: { boardId },
    });
    if (!board) {
      return res.status(404).send("Board not found");
    }
    const updatedCard = await prisma.card.update({
      where: { cardId: parseInt(cardId) },
      data: { comment },
    });
    res.json(updatedCard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.card.deleteMany({
      where: { boardId: parseInt(id) },
    });
    const deletedBoard = await prisma.board.delete({
      where: { boardId: parseInt(id) },
    });
    res.json(deletedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/:id/:cardId", async (req, res) => {
  const { id, cardId } = req.params;
  try {
    const deletedBoard = await prisma.card.delete({
      where: { cardId: parseInt(cardId), boardId: parseInt(id) },
    });
    res.json(deletedBoard);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
