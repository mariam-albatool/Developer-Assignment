

// database
const  {DataBase}=require("./DataBase");
//lib & files (json)
const  config=require("./config");
 // class

 class GetAll {

     constructor() {
         this.db=DataBase.getInstance();
   }

   // getAllLinks operations


     async getAllLinks(){

         const  data=await this.db.Query("select * from shortener_url ");
          console.log(data)
          console.log(data.length)
         
         // return  Result
         return data;
     }



     // instance of GetAll
    static  getInstance(){
         if(this.instance==null){

             this.instance=new GetAll();

             return  this.instance;
         }else {

             return this.instance;
         }

    }
 }

module.exports={ GetAll };