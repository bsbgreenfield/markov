const fs = require('fs')
const process = require('process')
const axios = require('axios')
const { MarkovMachine } = require('./markov')


const fileSpec = process.argv[2]
const path = process.argv[3]

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if (err){
            console.log(`error reading file`)
            console.log(`no such file or directory ${process.argv[3]}`)
            process.exit(1)
        }
        handleData(data)
    })
}

async function webcat(path){
    try{
        let resp = await axios.get(path)
        handleData(resp.data)
    }
    catch(err){
        console.error(`error fetching ${path}: ${err}`)
        process.exit(1)
    }
}

function handleData(data){
    const markovMachine = new MarkovMachine(data)
    markovMachine.makeText()
}

if (fileSpec == 'file'){
    cat(path)
}

else if (fileSpec == 'url'){
   webcat(path)
}

else {
    console.log('invalid file type specified: use "file" or "url"')
    process.exit(1)
}