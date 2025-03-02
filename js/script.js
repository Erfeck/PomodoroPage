let buttonStart = document.getElementById('start')
let buttonPause = document.getElementById('pause')
let buttonReset = document.getElementById('reset')
let buttonConfig = document.getElementById('config')

let titlePage = document.getElementById('titulo')

let timerWork = document.getElementById('timerWork')
let timerBreak = document.getElementById('timerBreak')

let catImage = document.getElementById('catImage')

let workMinutes = document.getElementById('workMinutes')
let workSeconds = document.getElementById('workSeconds')
let breakMinutes = document.getElementById('breakMinutes')
let breakSeconds = document.getElementById('breakSeconds')

let startTimerWork = 0;
let startTimerBreak = 0;

let isResting = false;

let userTimerWork = "30"
let userTimerBreak = "05"

function formatTime(numero) {
    return numero < 10 ? '0' + numero : numero
}

function temporizador(minutes, seconds) {
    if (minutes.innerText == "00" && seconds.innerText == "00") {
        if (startTimerWork != 0) {
            clearInterval(startTimerWork)
            startTimerWork = 0
            
            timerWork.style.display = "none"
            timerBreak.style.display = ""

            buttonPause.style.display = "none"
            catImage.src = "img/catPause.png"

            startTimerBreak = setInterval(() => temporizador(breakMinutes, breakSeconds), 1000);
        } else {
            clearInterval(startTimerBreak)
            startTimerBreak = 0
            breakMinutes.innerText = userTimerBreak
            breakSeconds.innerText = "00"
            isResting = false
            buttonReset.click()
        }
    } else if (seconds.innerText == "00") {
        minutes.innerText--
        minutes.innerText = formatTime(minutes.innerText)
        seconds.innerText = "59"
    // } else if (minutes.innerText != "00" && seconds.innerText != "00") {
    } else if (seconds.innerText != "00") {
        seconds.innerText--
        seconds.innerText = formatTime(seconds.innerText)
    }
}



buttonStart.addEventListener("click", () => {
    timerWork.className = "timerWork"

    titlePage.innerText = "¡Working! Dont touch your phone"

    catImage.src = "img/catWork.png"

    buttonStart.style.display = "none"
    buttonPause.style.display = ""
    buttonReset.style.display = "none"
    buttonConfig.style.display = "none"

    //TEMPORIZADOR A 0
    if (!isResting) {
        startTimerWork = setInterval(() => temporizador(workMinutes, workSeconds), 1000)
    } else {
        startTimerBreak = setInterval(() => temporizador(breakMinutes, breakSeconds), 1000)
        
    }
})
buttonPause.addEventListener("click", () => {
    if (startTimerWork != 0) {
        clearInterval(startTimerWork)
        startTimerWork = 0
    }
    if (startTimerBreak != 0)  {
        clearInterval(startTimerBreak)
        startTimerBreak = 0
        isResting = true
    } 

    // timerWork.className = "timerStop"

    titlePage.innerText = "¡¡PAUSE!!"

    //catImage.src = "img/catPause.png"

    buttonStart.style.display = ""
    buttonPause.style.display = "none"
    buttonReset.style.display = ""
})
buttonReset.addEventListener("click", () => {
    if (isResting) {
        breakMinutes.innerText = userTimerBreak
        breakSeconds.innerText = "00"
        isResting = false
    }
    timerWork.className = "timerStop"

    timerWork.style.display = ""
    timerBreak.style.display = "none"

    workMinutes.innerText = userTimerWork
    workSeconds.innerText = "00"

    titlePage.innerText = "Start Working!"

    catImage.src = "img/catWelcome.png"

    buttonStart.style.display = ""
    buttonPause.style.display = "none"
    buttonReset.style.display = "none"
    buttonConfig.style.display = ""
})

// Configuración para el Panel

buttonConfig.addEventListener("click", abrirPanel)

function abrirPanel() {
    document.getElementById('panelTiempo').style.display = 'block';
}

function cerrarPanel() {
    document.getElementById('panelTiempo').style.display = 'none';
}

function guardarDato() {
    const newWork = document.getElementById('newTimerWork').value
    const newBreak = document.getElementById("newTimerBreak").value
    if (newWork.trim() !== "" && newBreak.trim() !== "") {
        userTimerWork = newWork
        userTimerBreak = newBreak
        breakMinutes = newBreak
        alert(newBreak + "," + userTimerBreak + "," + breakMinutes)
        cerrarPanel();
        buttonReset.click()
    } else {
        alert("Por favor, ingresa un dato válido.");
    }
}