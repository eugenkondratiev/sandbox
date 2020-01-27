;
function ajaxGet(method, requestString) {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        // xhr.addEventListener("load", reqListener);
        xhr.addEventListener("error", () => { rej("xhr error") });
        xhr.addEventListener("abort", () => { rej("xhr aborted") });

        xhr.addEventListener("loadend", function () {
            res(this.responseText);
            // res(xhr.responseText);

        });

        xhr.addEventListener('progress', function (event) {
            if (event.lengthComputable) {
                console.log(`Received ${event.loaded} of ${event.total} bytes`);
            } else {
                console.log(`Received ${event.loaded} bytes totally`); // no Content-Length
            }

        });

        // xhr.onload = function () {
        //     console.log("this - " , this);
        //     // res(this.responseText);
        //     res(xhr.responseText);
        // }
        xhr.open(method, requestString);
        // xhr.open("GET", "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
        // xhr.open("POST", "http://95.158.47.15:3001/update-last-day/1");
        //  xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
        //  xhr.setRequestHeader('Content-Type','text/plain');

        xhr.send();
    });




}

const ans = (async () => {
    ;

    try {

        // const resp = await ajaxGet("POST", "http://95.158.47.15:3001/update-last-day/1");
        // const resp = await ajaxGet("GET", "https://mdn.mozillademos.org/files/16553/DgsZYJNXcAIPwzy.jpg");
        const resp = await ajaxGet("GET", "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
        console.log("response - ", resp);
        // return(["OK", ..."XXX"]);

    } catch (error) {
        console.log("ajaxGet Error", error);
    }


})();
// .then(ans => {console.log("ans", ans);});





// ajaxGet("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
//     .then(resp => {
//         console.log("response - ", resp);
//     })
//     .catch(err => {
//         console.log(err)
//     });


