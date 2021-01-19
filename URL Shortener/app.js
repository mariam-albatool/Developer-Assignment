// library
const express = require('express')
const app = express()
//lib & files (json)
const {API}=require("./API");
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


const cluster=require('cluster')

const numCPU=require('os').cpus().length

// NEW - Add CORS headers - see https://enable-cors.org/server_expressjs.html
app.use(function( req, res, next ) {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", "x-requested-with, content-type");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Max-Age", "1000000000");
  //intercept OPTIONS method
  if ('OPTIONS' == req.method) { res.send(200); } else { next(); } });




// Get All Links
app.get('/links', (req, res) => {
    const api = API.getInstance();
    api.getAll(res);

})
//***************************


// Generate Shortener URL
app.post('/', (req, res) => {
    let Obj = req.body.url;
    console.log(Obj)
    const api = API.getInstance();
    api.genratShortener(Obj, res);

})

//**************************
// Get Original URL
app.get('/shortUrl', (req, res) => {
    let Obj2 = req.query.url2;
    console.log(Obj2)
    const api = API.getInstance();
    api.getShortener(Obj2, res);

})


// cluster
if(cluster.isMaster){

  console.log("this is the master process :"+process.pid)


  for(let i=0;i<numCPU;i++){
    cluster.fork()
  }


  cluster.on('exit', function(worker, code, signal) {
    console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
    console.log('Starting a new worker');
   
  });

}else{

 //port listen:8884
app.listen(8884, () => {
    console.log("Api Start listening on  port 8884...")
  })

}
  

