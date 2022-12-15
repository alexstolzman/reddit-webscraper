var fs = require('fs');

function getWordCount(){

    let wordMap= new Map();

    var array = fs.readFileSync('./files/posts2.txt').toString().replace(/[^\w\s]/gi, '').split(/\s+/);
    for(i in array){
        let key=String(array[i].toLowerCase())
        if(wordMap.has(key)){
            let temp=wordMap.get(key)
            temp++
            wordMap.set(key,temp)
        }
        else{
            wordMap.set(key,1)
        }
    }

    wordMap = new Map([...wordMap.entries()].sort((a, b) => b[1] - a[1]));

    wordMap.forEach((value, key, map) => {
        fs.appendFile('./files/wordCount2.txt', `${key}: ${value}\n`, function (err) {
            if (err) return console.log(err);
         });
    });



}

getWordCount()
