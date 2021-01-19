

// database
const  {DataBase}=require("./DataBase");
//lib & files (json)
const  config=require("./config");
 // class

 class GenratShortener {

     constructor() {
         this.db=DataBase.getInstance();
   }

   // addShortener operations


     async addShortener(full_url,short_url){

         let result={
             full_url:"",
             short_url:""
         }


         let values = [[
             full_url,short_url
         ]];

         const  data=await this.db.Query(
             "INSERT INTO shortener_url (full_url , short_url ) VALUES ? " ,[values]);

         result.full_url=full_url;
         result.short_url=short_url

        return  result;
     }


    async generate(fullUrl,shortUrl,_callback){

         //https://codeportal.in
       shortUrl.short(fullUrl, function(err, url){
          console.log(url);
          return _callback(url)
      });


    }

     // instance of Generate Shortener URL
    static  getInstance(){
         if(this.instance==null){

             this.instance=new GenratShortener();

             return  this.instance;
         }else {

             return this.instance;
         }

    }
 }

module.exports={ GenratShortener };