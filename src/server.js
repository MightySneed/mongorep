const express =require("express");
const app = express();
app.use(express.json());

require("dotenv").config();
require("./db/connection");
const Book = require("./db/models/bookmodels")

//Book is added
app.post("/addbook", async (req, res) => {
    try {
        const result = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre
        }
    )
    console.log(result);
        const responseMessage = {
            message: `Book :${req.body.title} has been added`
        
        } 
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: `Book ${req.body.title} was not added.`,
            DBresponse: error 
        }
        res.status(418).json(responseMessage)
    }
}

)

//Get Booklist
app.get("/getbook",
    async function listBooks(req, res) {

        try {
            const output = await Book.find({})
            res.status(200).json(output)
        } catch (error) {
            console.log(error);
            res.status(500)
            const responseMessage = {
                message: "Unable to find book list"
            }
            res.status(500).json(responseMessage)
        }
    }
)

app.get("/getSingleBook", async function getSingleBook(req,res) {
    //use mangoose to find one
    try {
    const query = await Book.findOne({
        title : req.body.title})
        res.status(200).json(query);
        
    } catch (error) {
        console.log(error);
        const responseMessage = {
            message: "Unable to find that book"
        }
    }

})

app.put("/updateAuthor", async function updateAuthor(req, res) {
    //use mongoose to update
    try{
        console.log("Enter and try")
        const changee = await Book.updateOne({
            title : req.body.title},
            {author: req.body.author}); 
            console.log(changee);
            if (changee.matchedCount == 0) {
                res.status(404).send("Book not found. Check the spelling.")
            }
            else {
                res.status(200).json(changee)
            }


    } catch (error) {
            console.log(error)
            const responseMessage = {
            message: "Unable to change the author"
    }
    res.status(500).json(error)
}


})
app.delete("/deleteBook", async function deleteBook(req, res){
    try { 
        const deletee = await Book.deleteOne({
            title : req.body.title});
            console.log(deletee);
            if (deletee.matchedCount == 0) {
                res.status(404).send("Book not found. Check the spelling.")
            }
            else {
                console.log(`${title} go wooooosh!`)
                res.status(200).json(deletee)
            }
    }
    catch (error) {
        res.status(500).json(error)
    }
    //use mongoose to update
})
app.put("/updateGenre", async function updateGenre(req, res){
    //use mongoose to update
    try{
        console.log("Enter and try")
        const changee = await Book.updateOne({
            title : req.body.title},
            {genre: req.body.genre}); 
            console.log(changee);
            if (changee.matchedCount == 0) {
                res.status(404).send("Book not found. Check the spelling.")
            }
            else {
                res.status(200).json(changee)
            }


    } catch (error) {
            console.log(error)
            const responseMessage = {
            message: "Unable to change the genre"
    }
    res.status(500).json(error)
}})

app.delete("/deleteAll", async function deleteAll(req, res){
    //delete all using mongoose
    try {
    const allclear = Book.deleteMany({})
    console.log(allclear)
    res.status(200).json(allclear)
    }
    catch (error) {
        console.log(error)
        res.status(500).json(error)
    }

})

app.get("/health", (req,res) => {res.send("Api is healthy.")})
app.listen(5001, () => {console.log("Server is listening on port 5001")})