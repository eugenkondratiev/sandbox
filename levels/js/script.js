
const RIVERS_URL = "http://178.158.238.89:3003/api"
const POST_URL = "http://178.158.238.89:3003/api/post"

const btn = document.querySelector("#get-data-button")
const riverSelect = document.querySelector("#river-dropbox")
const postSelect = document.querySelector("#post-dropbox")

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log(riverSelect.value, postSelect.value);
})

async function main() {
    let riversList

    try {
        const riversRlt = await fetch(RIVERS_URL, { mode: 'no-cors' })
        console.log(riversRlt);
        riversList = await riversRlt.json()
    } catch (error) {
        console.log("fetching error", error);
    }
    Object.keys(riversList).forEach((r, i) => {
        console.log(i, r);
    });

    console.log(riversList);
    console.log(Object.keys(riversList));
    console.log(Object.values(riversList));

    // alert("done fetching")
}

main().then().catch(err => console.log("MAIN ERROR", err))