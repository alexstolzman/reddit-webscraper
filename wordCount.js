var fs = require('fs');

function getWordCount(){

    const wordMap= new Map();

    var array = fs.readFileSync('./files/posts.txt').toString().split(/\s+/);
    console.log(array[7])
    for(i in array){
        let key=String(array[i].toLowerCase())
        if(wordMap.has(key)){
            let temp=wordMap.get(key)
            temp++
            wordMap.set(key,temp)
            //console.log(wordMap.size)
        }
        else{
            wordMap.set(key,1)
            //console.log(key)
        }
    }

    wordMap.forEach((value, key, map) => {
        //console.log(value+ ": "+key )
        fs.appendFile('./files/wordCount.txt', `${key}: ${value}\n`, function (err) {
            if (err) return console.log(err);
            //console.log('Appended!');
         });
    });



}

getWordCount()
