const clockBox = document.getElementById("clock");
const watchBox = document.getElementById("stop-watch");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// ---------------- Clock ----------------

function updateClock() {
  const now = new Date();

  clockBox.innerHTML = `
    <h3>${days[now.getDay()]}</h3>
    <h1>${now.toLocaleTimeString()}</h1>
    <p>${now.toLocaleDateString()}</p>
  `;
}

updateClock();
setInterval(updateClock, 1000);

// ---------------- Stopwatch ----------------

let time = 0;
let timer = null;
let lapNo = 1;

const display = document.createElement("h1");
display.innerText = "00:00:00";

const controls = document.createElement("div");
controls.className = "controls";

const lapTitle = document.createElement("h3");
lapTitle.innerText = "Lap Times";

const lapList = document.createElement("div");
lapList.className = "laps";

function format(sec) {
  const h = String(Math.floor(sec / 3600)).padStart(2, "0");
  const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const s = String(sec % 60).padStart(2, "0");

  return `${h}:${m}:${s}`;
}

function createButton(text, handler) {
  const btn = document.createElement("button");
  btn.innerText = text;
  btn.addEventListener("click", handler);
  return btn;
}

const start = createButton("▶️ Start", () => {
  if (timer) return;

  timer = setInterval(() => {
    time++;
    display.innerText = format(time);
  }, 1000);
});

const stop = createButton("⏸ Stop", () => {
  clearInterval(timer);
  timer = null;
});

const reset = createButton("🔄 Reset", () => {
  clearInterval(timer);
  timer = null;
  time = 0;
  lapNo = 1;

  display.innerText = "00:00:00";
  lapList.innerHTML = "";
});

const lap = createButton("🏁 Lap", () => {
  if (time === 0) return;

  const item = document.createElement("p");
  item.innerHTML = `<b>Lap ${lapNo++}</b> : ${display.innerText}`;

  lapList.prepend(item);
});

controls.append(start, stop, lap, reset);

watchBox.append(
  display,
  controls,
  lapTitle,
  lapList
);