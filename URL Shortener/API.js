// lib

const {GenratShortener}=require("./GenratShortener");
const {Shortener}=require("./Shortener");
const {GetAll}=require("./GetAll");
const shortUrl = require('node-url-shortener');

class API {

    // get instance
    static getInstance() {
        if (this.instance == null) {
            this.instance = new API();
            return this.instance;
        } else {
            return this.instance;
        }

    }


    // Generate Shortener URL
    async genratShortener(fullUrl,res){


        const _GenratShortener=await  GenratShortener.getInstance();

        const  data2=await  _GenratShortener.generate(fullUrl,shortUrl,async function (shortUrl) {

            const  data=await    _GenratShortener.addShortener(fullUrl,shortUrl);
            console.log(data)
            await res.send(data);
        })


    }
	
	//*********************************************
    // Get Original URL
    async getShortener(url,res){

        const _Shortener=await  Shortener.getInstance();
        const  data=await  _Shortener.getShortener(url);

        console.log(data.url)
         await res.send(data.url);
    }
//*********************************************
	//get All Links
    async getAll(res){

        const _GetAll=await  GetAll.getInstance();
        const  data=await  _GetAll.getAllLinks();

        console.log(data)
         await res.send(data);
    }


}


// export
module.exports={
    API
};
