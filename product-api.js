const express=require('express')
const bodyParser=require('body-parser')
const cors=require('cors')

const app=express()//create server
const port=3000

let products=[{
   "productID":"1",
   "productName":"ABC",
   "productManu":"DEF",
   "manuDate":"2014-12-14",
   "expDate":"2016-12-14",
   "barcode":"2345"
},
{
    "productID":"2",
    "productName":"GHI",
    "productManu":"JKL",
    "manuDate":"2014-12-14",
    "expDate":"2016-12-14",
    "barcode":"3456"
},
{
    "productID":"3",
    "productName":"MNO",
    "productManu":"PQR",
    "manuDate":"2014-12-14",
    "expDate":"2016-12-14",
    "barcode":"4567"
}]

app.use(cors())

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.get('/productget',(req,res)=>{
    res.json(products)
})

app.get('/productget/:productID',(req,res)=>{
    const prodId=req.params.productID
    for(let product of products){
        if(product.productID===prodId){
            res.json(product)
            return
        }
    }
    res.status(404).send("Book not found")
})

app.post('/productpost',(req,res)=>{
    const product=req.body//get json object form body 
    console.log(product)
    products.push(product)//push into books array
    res.send('book is added to DB')
})

app.put('/productput/:productID',(req,res)=>{
    const prodId=req.params.productID
    const newProduct=req.body
   
    for(let i=0;i<products.length;i++){
        let product=products[i]
        if(product.productID===prodId){
            products[i]=newProduct
        }
    }
    res.send('Product edited')
})

app.delete('/productdelete/:productID',(req,res)=>{
    const prodId=req.params.productID

    products=products.filter(product=>{
        if(product.productID!==prodId){
            return true
        }
        return false
    })
    res.send('Product is deleted')
})

app.listen(port,()=>{
    console.log(`Listening on port ${port}`)
})