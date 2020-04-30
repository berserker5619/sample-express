const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()//create server
const port=3000

let books=[{
    "isbn":"1",
    "title":"a",
    "author":"hjsdhflisdhf",
    "publish-date":"2011-12-4",
    "publisher":"idkjfhsdk",
    "no-of-pages":652
},
{
    "isbn":"23",
    "title":"b",
    "author":"hjsdhflisdhf",
    "publish-date":"2011-12-4",
    "publisher":"idkjfhsdk",
    "no-of-pages":652
},
{
    "isbn":"3",
    "title":"c",
    "author":"hjsdhflisdhf",
    "publish-date":"2011-12-4",
    "publisher":"idkjfhsdk",
    "no-of-pages":652
}]

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))//urlencoded=>encrypts url,extended:true=>encrypts params
app.use(bodyParser.json())

app.post('/book',(req,res)=>{
    const book=req.body//get json object form body 
    console.log(book)
    books.push(book)//push into books array
    res.send('book is added to DB')
})

app.get('/bookget',(req,res)=>{
    res.json(books)//display all book details as json object
})
app.get('/bookget/:isbn',(req,res)=>{
    const isbn=req.params.isbn//resd isbn from url=>loaclhost:3000/bookget/5639458932

    //search for isbn in books and display full details if found
    for(let book of books){
        if(book.isbn===isbn){
            res.json(book)
            return
        }
    }
    res.status(404).send("Book not found")
})
app.put('/bookput/:isbn',(req,res)=>{
    const isbn=req.params.isbn//resd isbn from url=>loaclhost:3000/bookget/5639458932
    const newBook=req.body
    //search for isbn in books and display full details if found
    for(let i=0;i<books.length;i++){
        let book=books[i]
        if(book.isbn===isbn){
            books[i]=newBook
        }
    }
    res.status(404).send("Book not found")
    res.send('Book edited')
})

app.delete('/bookdelete/:isbn',(req,res)=>{
    const isbn=req.params.isbn

    books=books.filter(book=>{
        if(book.isbn!==isbn){
            return true
        }
        return false
    })
    res.send('Book is deleted')
})
app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})