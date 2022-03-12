const { nanoid } = require('nanoid');
const notes = require('./notes');

const addNotesHandler = (request, h) => {
    let { title, tags, body } = JSON.parse(request.payload);
 
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
 
    const newNote = {
        id ,title, tags, body, createdAt, updatedAt,
    };
 
    notes.push(newNote);
 
    const checkInput = notes.filter((note) => note.id === id).length > 0;
 
    if (checkInput) {
        const response = h.response({
            status: 'success',
            message: 'Notes berhasil ditambahkan',
            data: {
                noteId: id
            },
        });
        response.code(201);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: 'Notes gagal ditambahkan',
    });
    response.code(500);
    return response;
}

const takeAllNotes = () => {
    return {
        status: 'success',
        data: {
            notes,
        }
    }
};

const takeNotesID = (request, h) => {
    const { id } = request.params;
 
    const note = notes.filter((n) => n.id === id)[0];
 
    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
           },
        };
    }
 
    const response = h.response({
        status: 'fail',
        message: 'Notes tidak ditemukan',
    });
    response.code(404);
    return response;
}

const editNotesById = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;
    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((n) => n.id === id );
    if(index !== -1){
        notes[index] = {
            ...notes[index],
            title,
            tags,
            body,
            id,
            updatedAt, 
        }
        const resp = h.response({
            status: 'success',
            message: `Notes pada id ${id} berhasil di perbarui`
        })
        resp.code(201);
        return resp
    }
    const resp = h.response({
        status: 'success',
        message: `Notes dengan id ${id} gagal di temukan dan diperbarui`
    })
    resp.code(404);
    return resp
}

const deleteByID = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex(nt => nt.id === id);
    if(index !== -1) {
        notes.splice(index, 1);
        const resp = h.response({
            status: 'success',
            message: `Notes dengan id ${id} berhasil dihapus`
        })
        resp.code(200);
        return resp;
    }
    const resp = h.response({
        status: 'fail',
        message: 'Notes gagal di hapus'
    })
    resp.code(404);
    return resp;
}

module.exports = {addNotesHandler, takeAllNotes, takeNotesID, editNotesById, deleteByID}