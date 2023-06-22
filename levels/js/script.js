
const RIVERS_URL = "http://178.158.238.89:3003/api"
const POST_URL = "http://178.158.238.89:3003/api/post"

const btn = document.querySelector("#get-data-button")
const riverSelect = document.querySelector("#river-dropbox")
const postSelect = document.querySelector("#post-dropbox")
const rawOutput = document.querySelector('#raw-output')


btn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(riverSelect.value, postSelect.value);


    let postData

    try {
        const postsRlt = await fetch(`${POST_URL}?river=${riverSelect.value}&post=${postSelect.value}`)   //, { mode: 'no-cors' })
        postData = await postsRlt.json()

        const postDataText = postData.reduce((acc, data) => {
            acc += `${new Date(data.dt).toLocaleDateString()}\t${data.level} см \n`
            return acc
        }, "")
        rawOutput.textContent = postDataText

    } catch (error) {
        console.log("fetching error", error);
    }

})
let rivers = {}
let riversIndexMax = 0
let postsIndexMax = 0

function clearPostsList() {
    for (let index = postsIndexMax; index > 0; index--) {
        postSelect.remove(index);
        riversIndexMax--
    }
}
function emptyRiverOption() {
    const newOption = document.createElement('option')
    newOption.text = "-"
    newOption.value = "-"
    riverSelect.add(newOption)
    riversIndexMax++
}

function emptyPostOption() {
    const newPostOption = document.createElement('option')
    newPostOption.text = "-"
    newPostOption.value = "-"
    postSelect.add(newPostOption)
    postsIndexMax++
}

async function main() {
    let riversList

    try {
        const riversRlt = await fetch(RIVERS_URL)   //, { mode: 'no-cors' })
        console.log("riversRlt", riversRlt);
        riversList = await riversRlt.json()
        rivers = { ...riversList }

    } catch (error) {
        console.log("fetching error", error);
    }

    emptyRiverOption()

    emptyPostOption()

    Object.keys(riversList).forEach((r, i) => {
        console.log(i, r);
        const newOption = document.createElement('option')
        newOption.text = r
        newOption.value = r
        riverSelect.add(newOption)
        riversIndexMax++
    });


}


riverSelect.addEventListener('change', (e) => {
    clearPostsList();
    // emptyPostOption();

    const currentRiver = riverSelect.value;
    // console.log("currentRiver", currentRiver);

    rivers[currentRiver].forEach(p => {

        const newPostOption = document.createElement('option')
        newPostOption.text = p
        newPostOption.value = p
        postSelect.add(newPostOption)
        postsIndexMax++

    })

    // postSelect.value = "-"
})


postSelect.addEventListener('change', async (e) => {
    // alert(riverSelect.value, postSelect.value)


})
main().then().catch(err => console.log("MAIN ERROR", err))