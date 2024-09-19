const fs  = require("fs")

const addFile = (data)=>{

    let allData = loadData()

    const duplicate =  allData.find(ele=>{
        return ele.name===data.name
    })
    
    if(duplicate)
    {
        console.log("User alredy exist !!!");
        return
    }
    

    allData.push(data)

    const newData = JSON.stringify(allData)
    fs.writeFile("data.json",newData,(err)=>{
        if(err)
            console.log(err);
        console.log("File created successfully !!!");
        
    })
    
}

const viewFile = ()=>{
    const alldata =  loadData()
    console.log(alldata);
    

    
}

const removeData = (name)=>{

    let alldata = loadData()

    alldata = alldata.filter(ele=>{
        return ele.name !=name
    })

    const newData = JSON.stringify(alldata)
    fs.writeFile("data.json",newData,(err)=>{
        if(err)
            console.log(err);
        console.log("Data deleted successfully !!!");
        
    })

}


const loadData = ()=>{ 

    try {
        const data = fs.readFileSync("data.json",'utf-8') 
        newdata = JSON.parse(data)
        return newdata
    } catch (error) {
        return [];
    }
    
}

module.exports={addFile,viewFile,removeData}