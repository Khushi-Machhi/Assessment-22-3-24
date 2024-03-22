const timerDisplay = document.getElementById('timer-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const workDurationInput = document.getElementById('work-duration');
const breakDurationInput = document.getElementById('break-duration');
let isTimerRunning = false;
let currentDuration = 25 * 60; // Default work duration in seconds
let remainingTime = currentDuration;
let intervalId = null;
let isBreak = false; // Flag to identify work or break session

function updateTimerDisplay(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isTimerRunning) {
    intervalId = setInterval(() => {
      remainingTime--;
      updateTimerDisplay(remainingTime);
      if (remainingTime === 0) {
        stopTimer();
        if (isBreak) {
          // Break finished, switch to work session
          isBreak = false;
          currentDuration = workDurationInput.value * 60;
          remainingTime = currentDuration;
          updateTimerDisplay(currentDuration);
        } else {
          // Work finished, switch to break session
          isBreak = true;
          currentDuration = breakDurationInput.value * 60;
          remainingTime = currentDuration;
          updateTimerDisplay(currentDuration);
          alert('Time\'s up! Take a break.');
        }
      }
    }, 1000);
  }
  isTimerRunning = true;
  startPauseBtn.textContent = 'Pause';
  startPauseBtn.classList.add('active');
  resetBtn.disabled = true;
}

function pauseTimer() {
  if (isTimerRunning) {
    clearInterval(intervalId);
    intervalId = null;
  }
  isTimerRunning = false;
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.remove('active');
  resetBtn.disabled = false;
}

function resetTimer() {
  clearInterval(intervalId);
  intervalId = null;
  isTimerRunning = false;
  remainingTime = currentDuration;
  updateTimerDisplay(currentDuration);
  startPauseBtn.textContent = 'Start';
  startPauseBtn.classList.remove('active');
  resetBtn.disabled = true;
}

startPauseBtn.addEventListener('click', () => {
  if (isTimerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
});

resetBtn.addEventListener('click', resetTimer);
