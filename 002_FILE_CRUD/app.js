const yargs = require("yargs")
const file = require("./File")


yargs.command({
    command : "add",
    builder : {
        name : {
            type:String
        },
        email  :{
            type:String
        },
        age : {
            type:Number
        }
    },
    handler : function(argv){

        const data = {
            name : argv.name,
            email : argv.email,
            age : argv.age
        }
       file.addFile(data)
        
    }
})

yargs.command({
    command:"view",
    handler : function(argv)
    {
      file.viewFile()
    }
})

yargs.command({
    command:'remove',
    builder : {
        name : {
            type:String
        }
    },
    handler : function(argv)
    {
        file.removeData(argv.name)
    }
})

yargs.argv 

