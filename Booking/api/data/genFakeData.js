//fs needed to write to files
const fs = require("fs")
//generate random number of available tables
const numTables = Math.floor(Math.random()*10)+16
//initialse tables as empty
let fakeTables = []


for(i = 1; i < numTables; i++ ){
    //generate random number of chairs per table
    const chairs = Math.floor(Math.random()*6)+2
    //give the table(number) as its name
    const name = 'Table ${i}'
    //assign table random location from avilable options
    const location =["Side 1", "Side 2", "Side 3"][Math.floor(Math.random()*3)]
    //push the current table into the fake tables array
    fakeTables.push(
        {
            name:name,
            capacity: chairs,
            isAvailable:true,
            location:location
        }
    )
}
//prepare table data before writing to file
let data = JSON.stringify(
    {
        tables : fakeTables
    }
)
fs.writeFileSync(__dirname+"/allTables.json",data);