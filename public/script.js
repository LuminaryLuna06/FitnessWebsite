document.getElementById("workout-form").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const workout = document.getElementById("workout").value;
    const duration = document.getElementById("duration").value;
  
    const response = await fetch("/workouts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workout, duration }),
    });
  
    if (response.ok) {
      loadWorkouts();
    }
  });
  
  async function loadWorkouts() {
    const response = await fetch("/workouts");
    const workouts = await response.json();
  
    const workoutList = document.getElementById("workout-list");
    workoutList.innerHTML = "";
  
    workouts.forEach(({ workout, duration }) => {
      const li = document.createElement("li");
      li.textContent = `${workout} - ${duration} mins`;
      workoutList.appendChild(li);
    });
  
    updateChart(workouts);
  }
  
  function updateChart(workouts) {
    const ctx = document.getElementById("progress-chart").getContext("2d");
    const labels = workouts.map(w => w.workout);
    const data = workouts.map(w => w.duration);
  
    new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Workout Duration (mins)",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
        }],
      },
    });
  }
  
  loadWorkouts();
  