const API = "http://localhost:5000/api";

/* ======================
   LOGIN
====================== */
async function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

const res=await fetch("http://localhost:5000/api/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
});

const data=await res.json();

if(data.message==="Login successful"){

// ✅ SAVE LOGIN STATUS
localStorage.setItem("isLoggedIn","true");
localStorage.setItem("User",data.user.name);

// ✅ GO TO INTRO PAGE
window.location.href="loading.html";

}else{
document.getElementById("error").innerText=data.message;
}
}

/* ======================
   REGISTER
====================== */
async function register() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const messageBox = document.getElementById("message");

  messageBox.innerText = "";
  messageBox.style.color = "red";

  if (!name || !email || !password) {
    messageBox.innerText = "All fields are required";
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      messageBox.style.color = "green";
      messageBox.innerText = "Registered successfully! Redirecting...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      messageBox.innerText = data.message || "Registration failed";
    }

  } catch (err) {
    messageBox.innerText = "Server not reachable";
  }
}

/* ======================
   LOAD CITY DATA
====================== */
let barChart, lineChart;

async function loadCity() {
  const city = document.getElementById("citySelect").value;
  if (!city) return;

  try {
    const res = await fetch(`${API}/water/${city}`);
    const data = await res.json();

    const usage = data.map(d => d.usage);
    const months = data.map(d => d.month);

    // Destroy old charts (important!)
    if (barChart) barChart.destroy();
    if (lineChart) lineChart.destroy();

    barChart = new Chart(document.getElementById("barChart"), {
      type: "bar",
      data: {
        labels: months,
        datasets: [{
          label: "Water Usage",
          data: usage,
          backgroundColor: "#3b82f6"
        }]
      }
    });

    lineChart = new Chart(document.getElementById("lineChart"), {
      type: "line",
      data: {
        labels: months,
        datasets: [{
          label: "Usage Trend",
          data: usage,
          borderColor: "#22c55e",
          fill: false
        }]
      }
    });

  } catch (err) {
    alert("Failed to load city data");
  }
}

/* ======================
   LOGOUT (OPTIONAL)
====================== */
function logout() {
  localStorage.removeItem("User");
  localStorage.removeItem("isLoggedIn");
  window.location.href = "login.html";
}
