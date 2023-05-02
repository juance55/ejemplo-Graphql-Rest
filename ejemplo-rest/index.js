const express = require('express');

const {authors} = require('./datos/authors')
const {books} = require('./datos/books')
const {reviews} = require('./datos/reviews')


const app = express();

app.use(express.json());


app.get('/api/authors',(req,res)=>{
    res.send(authors);
})

app.get('/api/authors/:id',(req,res)=>{
    const author = authors.find(c => c.id === parseInt (req.params.id));
    if (!author) return res.status(404).send('Autor no encontrado')
    else res.send(author);
})

app.get('/api/books',(req,res)=>{
    res.send(books);
})

app.get('/api/books/:id',(req,res)=>{
    const book = books.find(c => c.id === parseInt (req.params.id));
    if (!book) return res.status(404).send('libro no encontrado')
    else res.send(book);
})

app.get('/api/reviews',(req,res)=>{
    res.send(books);
})

app.get('/api/reviews/:id',(req,res)=>{
    const review = reviews.find(c => c.id === parseInt (req.params.id));
    if (!review) return res.status(404).send('reseña no encontrado')
    else res.send(review);
})

const port = process.env.port || 80;
app.listen(port, ()=>{
    console.log(`Servidor ejecutandose en http://localhost:${port}`);
})