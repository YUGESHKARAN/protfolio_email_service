
const express = require("express");
const cors = require("cors")
const serverless = require("serverless-http");
const bodyParser = require("body-parser");


const app = express();

const corsOption = {
    origin:[
        "http://localhost:5173",
        "https://my-portfolio-eta-three-28.vercel.app/",
    ],
    methods : ["GET","POST","PUT"],
    Credentials:true,
    allowedHeaders: ["Content-Type", "Authorization"],
     optionsSuccessStatus: 200

}

app.use(cors(corsOption));

app.options(/.*/, cors(corsOption));

app.use(express.json());
app.use(bodyParser.json());


// Trust proxy (must be before routes)
app.set("trust proxy", 1);

app.get("/",(req,res)=>{
    try{
        console.log("logging....");
        res.status(200).json({message:"Portfolio email-service running successfully!"})
    }
    catch(e){
        res.status(500).json({message:"error"})
    }
})

const mailRouter = require("./routes/email.Route")

app.use("/portfolio",mailRouter)

// app.listen(3000,()=>{
//     console.log(`server running at port 3000`);
// })

module.exports = app;
module.exports.handler = serverless(app);