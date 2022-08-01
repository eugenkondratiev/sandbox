const MILLISECONDS_TO_SKIP = 5000

const modalButton = document.getElementsByClassName('close-button')[0];
const modalPicture = document.querySelector('.insertion-content >picture>img');
// alert(modalButton)
console.log(modalPicture);
console.log(modalButton.textContent);

const msecToSecString = (msec) => Number(msec / 1000).toFixed(0) + "    >  "

let millisecondsToSkip = MILLISECONDS_TO_SKIP

modalButton.textContent = msecToSecString(millisecondsToSkip)

const timerHandler = setInterval(() => {
    millisecondsToSkip -= 500
    if (millisecondsToSkip < 1) {
        clearInterval(timerHandler);
        modalButton.textContent = "ОсознаЮ. Продолжить"
        return
    }

    modalButton.textContent = msecToSecString(millisecondsToSkip)

}, 500)

modalButton.addEventListener('click', () => {
    if (millisecondsToSkip > 0) return

    document.getElementById('modal-insertion').style.display = 'none'

})


document.querySelector('.insertion-content >picture').addEventListener('click', function (e) {
    console.log(e);
})

// document.querySelector('body').addEventListener('click', () => {
//     console.log(this);
//     alert("body")
// })