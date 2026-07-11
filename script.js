let startTime;
let elapsedTime = 0;
let timerInterval;

// Start Timer Function
function startTimer() {
    // Prevent multiple intervals running at once
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10); // Updates every 10 milliseconds
    }
}

// Pause Timer Function
function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        timerInterval = null;
    }
}

// Reset Timer Function
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    document.getElementById("display").innerText = "00:00:00.00";
    document.getElementById("laps").innerHTML = ""; // Clear lap history
}

// Record Lap Function
function recordLap() {
    if (timerInterval) {
        const lapTime = document.getElementById("display").innerText;
        const lapList = document.getElementById("laps");
        const li = document.createElement("li");
        
        const lapNumber = lapList.children.length + 1;
        li.innerHTML = `<span>Lap ${lapNumber}</span> <span>${lapTime}</span>`;
        
        // Add new lap to the top of the list
        lapList.prepend(li);
    }
}

// Update Display Function (Calculates hours, mins, secs, ms)
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    
    let milliseconds = Math.floor((elapsedTime % 1000) / 10);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

    // Add leading zeros if numbers are less than 10
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    document.getElementById("display").innerText = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}