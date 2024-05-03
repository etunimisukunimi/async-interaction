const express = require("express");
const { MongoClient, ObjectId } = require('mongodb');

// url database
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// название базы данных
const dbName = 'infobooks';

async function getBooks() {
    await client.connect(); // подключение к базе данных
    console.log('Connected successfully to server');
    const db = client.db(dbName); // берем базу данных "infobooks"
    const collection = db.collection('books'); // берем оттуда коллекцию "books"
    const findResult = await collection.find({}).toArray(); // берем объекты книг и записываем их в findResult
    return findResult;
}

async function deleteBook(bookId) {
    await client.connect();
    console.log('Connected successfully to server. Delete');
    const db = client.db(dbName); // берем базу данных "infobooks"
    const collection = db.collection('books'); // берем оттуда коллекцию "books"
    try {
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(bookId) })
    } catch (e) {
        console.log(e);
    }
}

async function editBook(bookId, newCategorie, newName, newAuthor, newImage, userNote) {
    await client.connect();
    console.log('Connected successfully to server. Edit');
    const db = client.db(dbName); // берем базу данных "infobooks"
    const collection = db.collection('books'); // берем оттуда коллекцию "books"
    try {
        const editResult = await collection.updateOne({
            _id: new ObjectId(bookId)
        }, {
            $set: {
                volumeInfo: {
                    categories: [newCategorie],
                    title: [newName],
                    publishers: [newAuthor],
                    imageLinks: [newImage],
                    note: [userNote]
                }
            }
        })
    } catch (e) {
        console.log(e);
    }
}

async function addBook(setCategorie, setName, setAuthor, setImage, userNote) {
    await client.connect();
    console.log('Connected successfully to server. Add');
    const db = client.db(dbName); // берем базу данных "infobooks"
    const collection = db.collection('books'); // берем оттуда коллекцию "books"
    try {
        const editResult = await collection.insertOne({
                volumeInfo: {
                    categories: [setCategorie],
                    title: [setName],
                    publishers: [setAuthor],
                    imageLinks: [setImage],
                    note: [userNote]
                }    
        })
    } catch (e) {
        console.log(e);
    }
}

// url server
const app = express()
const port = '8080';

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

///

app.get("/books", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    getBooks().then((data) => {
        console.log('data', data)
        res.json(data);
    }).finally((data) => client.close());
});

app.get("/books_delete", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const bookId = req.query.id;
    deleteBook(bookId).then((data) => {
        res.json(bookId);
    }).finally((data) => client.close());
});

app.get("/books_edit", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const bookId = req.query.id;
    const newCategorie = req.query.newCategorie;
    const newName = req.query.newName;
    const newAuthor = req.query.newAuthor;
    const newImage = req.query.newImg;
    const userNote = req.query.newNote;

    editBook(bookId, newCategorie, newName, newAuthor, newImage, userNote).then((data) => {
        res.json(bookId);
    }).finally((data) => client.close());
});

app.get("/books_add", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')
    const setCategorie = req.query.setCategorie;
    const setName = req.query.setName;
    const setAuthor = req.query.setAuthor;
    const setImage = req.query.setImg;
    const userNote = req.query.newNote;

    addBook(setCategorie, setName, setAuthor, setImage, userNote).then((data) => {
        res.json(setCategorie);
    }).finally((data) => client.close());
});