const {addNotesHandler, takeAllNotes, takeNotesID, editNotesById, deleteByID} = require('./handler')

const route = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNotesHandler,
        //per routes cors
        // options: {
        //     cors: {
        //         origin: ["*"]
        //     }
        // }
    },
    {
        method: 'GET',
        path: '/notes',
        handler: takeAllNotes
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: takeNotesID
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: editNotesById
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteByID
    }
]

module.exports = route