
//lib

const sql = require('promise-mysql');

//lib & files (json)
const  config=require("./config");

// class db

class DataBase {

    // get instance of database
  static  getInstance(){

        if(this.instance ==null){

           this.instance=new DataBase();
            return this.instance;
        }else{
            return this.instance;
        }
  }

  // operation database

    async Query(commands,Value){

        try{

            let Result = await this.getResult(commands,Value);

            if(Result){

            }
            return Result;

        }catch(err){
            console.log(err);
            console.log('Could not process request due to an error');
            return;

        }
    }

    async  getResult(commands,Value){
        console.log(commands+"  // "+Value);
        let connection;
        try {

            connection = await sql.createPool(config.db);
            const result = await connection.query(commands,Value);

            await  connection.end();
            return result;

        }catch(err){
             connection.end();
             console.log('Close Database !!!');
             console.log('Error Excute Query'+err);
            return;

        } finally {
            if (connection && connection.end) {
                connection.end();
                console.log('Close Database !!!');
            }

        }

    }

}

    // export
    module.exports = {
          DataBase
       };
