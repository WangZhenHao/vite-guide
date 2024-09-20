// create connection
const source = new EventSource("/random");

// SSE connection open
source.addEventListener("open", (e) => {
  log("connected");
});

// SSE message
source.addEventListener("message", (e) => {
  log("RECEIVED data:", e.data);
});

// SSE error or termination
source.addEventListener("error", (e) => {
  if (e.eventPhase === EventSource.CLOSED) {
    log("disconnected");
  } else {
    log("error", e.message);
  }
});

const outlog = document.getElementById("sselog");
function log(...msg) {
    debugger
  msg.forEach((m) => (outlog.textContent += m + " "));
  outlog.textContent += "\n";
  outlog.scrollTop = outlog.scrollHeight;
}
