const express=require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.port || 3000;
let app=express();
hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("getCurrentYear",()=>new Date().getFullYear());
hbs.registerHelper("screamIt",(text)=>text.toUpperCase());
app.set("view engine","hbs");

app.use((req,res,next)=>{
    let log=`${new Date()} ${req.method} ${req.url}`;
    fs.appendFile('server.log',log+'\n',(err => {
        if (err){
            console.log(err);
        }
    }));
   next();
});
app.use((req,res,next)=>{
   res.render('maintenance.hbs');
});
app.use(express.static(__dirname+"/public"));
app.get('/',(req,res)=> {
    res.render('home.hbs', {
        message: 'welcome'
    });
});
app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'about'
    });
});
app.get('/bad',(req,res)=>{
   res.send({
       error:'unable to handle request'
   })
});
app.listen(port,()=>{
    console.log(`server is up on port ${port}`)
});