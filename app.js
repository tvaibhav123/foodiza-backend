const express = require('express');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const users =[
    {
        name: "Vaibhav", 
        password: "123456789",
        email: "vaibhav@gmail.com",
        phoneNumber: 9123456789
    }
];

console.log("users currently in the system", users)
app.get("/", (request,response) => {
    
    response.send("Hello From Backend")
})


app.post("/login", (req,res)=>{
    //email
    //password
    console.log(req.body.email, req.body.password);
    const selectedUser  = users.filter(user => user.email === req.body.email && user.password === req.body.password);
    if(selectedUser.length>0) {
        res.status(200).json({message:"user found",user:selectedUser});
    }else {
        res.status(404).json({message: "Invalid username or password"});
    }
})


app.post('/register',(req,res)=>{ //localhost:4009/register
    console.log("Req.body", req.body)
    if(req.body.user){
        users.push(req.body.user)
    }
    console.log("users ", users)
    res.json({message : "user has been added successfully", user: req.body.user});
})

app.listen(4009);
console.log("Server is running on port ", 4009);