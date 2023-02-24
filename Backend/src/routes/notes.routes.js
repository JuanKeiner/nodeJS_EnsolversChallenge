import { Router } from "express";

import { getActiveNotes, getArchivedNotes, getNote, createNote, updateNote, deleteNote } from "../controllers/notes.controller.js"

const router = Router();
router.get("/notes/active", getActiveNotes);
router.get("/notes/archived", getArchivedNotes);
router.post("/notes", createNote);
router.put("/notes/:id", updateNote);
router.delete("/notes/:id", deleteNote);
router.get("/notes/:id", getNote);

export default router;