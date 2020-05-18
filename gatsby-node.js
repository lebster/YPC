/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
var fs = require('fs');
const readline = require('readline');
var multistream = require('multistream');


exports.onPreBootstrap = () => {
    var fd = fs.openSync('./content/out.csv', 'w');
    var output = fs.createWriteStream('./content/out.csv');
    var readFileNames = [];
    fs.readdirSync('./content/attachments/').forEach(file => {
        readFileNames.push(file);
    });
    var inputList = readFileNames.map((path) => {
        return fs.createReadStream(`./content/attachments/${path}`);
    });
    return new Promise((resolve, reject) => {
        var multiStream = new multistream(inputList);
        multiStream.pipe(output);
        multiStream.on('end', () => {
            fs.closeSync(fd);
            convertFile();
            resolve(true);
        });
        multiStream.on('error', () => {
            fs.closeSync(fd);
            reject(false);

        });
    });
    

}

const convertFile = () => {
    const readInterface = readline.createInterface({
        input: fs.createReadStream('./content/out.csv'),
        output: process.stdout,
        console: false
    });
    var writableStream = fs.createWriteStream('./data/parsed.json', {flags: 'w'});
    writableStream.write('[');
    var firstLine = true;
    var gameInfo = {};
    var lineOut = '';

    readInterface.on('line', function (line) {
        var splitLine = line.split(';');
        if(splitLine[0] == 'Rank'){
            return;
        }

        if(splitLine[0] == '1'){
            gameInfo.ClubID = splitLine[8];
            gameInfo.GameCode = splitLine[9];
            gameInfo.GameDate = splitLine[10];
            gameInfo.GameCost = splitLine[12];
        } 

        var playerInfo = { ...gameInfo };
        playerInfo.Rank = splitLine[0];
        playerInfo.Name = splitLine[1];
        playerInfo.Id = splitLine[2];
        playerInfo.Hands = splitLine[3];
        playerInfo.Profit = splitLine[4];
        playerInfo.RebuyCount = splitLine[5];

        if (firstLine == true) {
            lineOut = '';
            firstLine = false;
        } else {
            lineOut = ',';
        }

        lineOut = lineOut + JSON.stringify(playerInfo);
        writableStream.write(lineOut);
    });

    readInterface.on('close', ()=>{
        writableStream.write(']');
    })

}


