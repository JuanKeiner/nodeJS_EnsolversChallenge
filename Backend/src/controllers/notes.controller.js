/////////////////////////////////////
// This file contains all functions
// called in response to http requests.
/////////////////////////////////////

import { Note } from "../models/Notes.js";

export const getActiveNotes = async (req, res) => {
    try {
        if(!checkLogged()) throw new Error('Not logged');
        const notes = await Note.findAll({
            where: {
                archived: false
            }
        });

        res.json(notes);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}
export const getArchivedNotes = async (req, res) => {
    try {
        if(!checkLogged()) throw new Error('Not logged');
        const notes = await Note.findAll({
            where: {
                archived: true
            }
        });

        res.json(notes);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const getNote = async (req, res) => {
    try {
        if(!checkLogged()) throw new Error('Not logged');
        const { id } = req.params;
        const note = await Note.findByPk(id);
        if (note != null) res.json(note);
        else res.status(404).json({
            message: "Note " + id + " doesn't exist"
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

export const createNote = async (req, res) => {
    try {
        if(!checkLogged()) throw new Error('Not logged');
        const { title, text, archived } = req.body;

        const newNote = await Note.create({
            title: title,
            text: text,
            archived: archived
        })
        res.json(newNote);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}


export const updateNote = async (req, res) => {
    const data = req.body;
    try {
        if(!checkLogged()) throw new Error('Not logged');
        const { id } = req.params;
        const title = data.title;
        const text = data.text;
        const archived = data.archived;

        const noteToUpdate = await Note.findByPk(id);
        noteToUpdate.title = title;
        noteToUpdate.text = text;
        noteToUpdate.archived = archived;
        await noteToUpdate.save();
        res.json(noteToUpdate);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}
export const deleteNote = async (req, res) => {
    try {
        if(!checkLogged()) throw new Error('Not logged');
        const { id } = req.params;

        const newNote = await Note.destroy({
            where: {
                id: id
            }
        })
        res.sendStatus(204);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

}

function checkLogged() {
    // if (User.logged == null) return false;
    return true;
}