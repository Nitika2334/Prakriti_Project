const { default: mongoose } = require("mongoose")

const app=express()

//routes
app.get("/",(req,res)=>{
    res.send("Home Page....")
})

const PORT=process.env.PORT || 5000

mongoose
.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server runinng on port ${PORT}`)
    })
})
.catch((err)=> console.log(err))