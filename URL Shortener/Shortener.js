

// database
const  {DataBase}=require("./DataBase");
//lib & files (json)
const  config=require("./config");
 // class

 class Shortener {

     constructor() {
         this.db=DataBase.getInstance();
   }

   // shortener operations


     async getShortener(url){

         let Items = {
             status:0,
             message:"",
             url: ""
         };

         // check parameters

         if(url==undefined || url==""){

             Items.status=401
             Items.message="Unauthorized"
             return Items
         }

         let values = [
             url
         ];

         const  data=await this.db.Query(
             " SELECT  full_url from shortener_url where short_url= ? ",url );


         // return  Result
			console.log(data)
			console.log(">>>>>>>>>>>>>>>>>>>>>>")
         Items.status=200;
         Items.message="Authorized";
         Items.url=data[0].full_url;
         return Items;
     }



     // instance of Shortener
    static  getInstance(){
         if(this.instance==null){

             this.instance=new Shortener();

             return  this.instance;
         }else {

             return this.instance;
         }

    }
 }

module.exports={ Shortener };