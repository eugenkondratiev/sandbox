const fs = require('fs');
let _data = "";
const readDoubles = fs.createReadStream("./json/data/doubles.json", { encoding: "utf8", autoClose: true });

function isOnlySimilar(playersArray) {
    if (!Array.isArray(playersArray)) return false;
    const firstName = playersArray[0][0];
    return playersArray.slice(1).every(pl => pl[0] === firstName);
}

setTimeout(() => {

    readDoubles.on('start', chunk => {
        console.log("Start");

    })
    readDoubles.on('data', chunk => {
        _data += chunk;
    })
    readDoubles.on('end', () => {
        // console.log(_data);

        const doubles = JSON.parse(_data.replace(/[\r\n]/g, ""));
        // console.log("length  - ", _data.length);
        // console.log("doubles  - ", doubles, doubles.length);
        const similar = doubles.filter(players => isOnlySimilar(players));
        const notSimilar = doubles
            .filter(players => !isOnlySimilar(players))
            .sort((a, b) => (a.length > b.length));
        console.log(notSimilar);
        fs.writeFile('./data/not-equal-similar-names.json', JSON.stringify(notSimilar, null, ""), err => console.error);

        console.log(similar.length, notSimilar.length, similar.length + notSimilar.length, doubles.length)
    })

    readDoubles.on('error', (err) => {
        console.error(err);
    })
}, 2000);