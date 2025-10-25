document.addEventListener("DOMContentLoaded", () => {
  // LOGIN
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      
      // Simulated login
      if (email === "student@college.com" && password === "1234") {
        alert("Login successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
      } else {
        alert("Invalid credentials! Try again.");
      }
    });
  }

  // REGISTER
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const role = document.getElementById("role").value;
      alert(`Registered successfully as ${role}! Now login.`);
      window.location.href = "login.html";
    });
  }
});

// === DASHBOARD LOGIC ===
document.addEventListener("DOMContentLoaded", () => {
  const roleSelect = document.getElementById("roleSelect");
  const studentView = document.getElementById("studentView");
  const teacherView = document.getElementById("teacherView");
  const welcomeText = document.getElementById("welcomeText");
  const logoutBtn = document.getElementById("logoutBtn");

  if (roleSelect) {
    const studentExams = [
      { title: "Math Midterm", date: "2025-10-20", duration: "60 min" },
      { title: "Physics Quiz", date: "2025-10-25", duration: "30 min" }
    ];

    const pastResults = [
      { title: "Chemistry Test", score: "85/100", status: "Passed" },
      { title: "Biology Quiz", score: "70/100", status: "Passed" }
    ];

    const teacherExams = [
      { title: "C Programming Test", submissions: 32 },
      { title: "Data Structures Quiz", submissions: 27 }
    ];

    // Render student data
    const renderStudent = () => {
      studentView.classList.remove("hidden");
      teacherView.classList.add("hidden");
      welcomeText.textContent = "Welcome, Student!";
      document.getElementById("upcomingExams").innerHTML = studentExams
        .map(exam => `
          <div class="exam-card">
            <h4>${exam.title}</h4>
            <p>Date: ${exam.date}</p>
            <p>Duration: ${exam.duration}</p>
            <button onclick="alert('Starting ${exam.title}...')">Start Exam</button>
          </div>
        `).join("");
      
      document.getElementById("pastResults").innerHTML = pastResults
        .map(res => `
          <div class="exam-card">
            <h4>${res.title}</h4>
            <p>Score: ${res.score}</p>
            <p>Status: ${res.status}</p>
            <button onclick="alert('Viewing ${res.title} result...')">View Result</button>
          </div>
        `).join("");
    };

    // Render teacher data
    const renderTeacher = () => {
      studentView.classList.add("hidden");
      teacherView.classList.remove("hidden");
      welcomeText.textContent = "Welcome, Teacher!";
      document.getElementById("teacherExams").innerHTML = teacherExams
        .map(exam => `
          <div class="exam-card">
            <h4>${exam.title}</h4>
            <p>Submissions: ${exam.submissions}</p>
            <button onclick="alert('Opening ${exam.title} details...')">View Details</button>
          </div>
        `).join("");
    };

    // Role switcher
    roleSelect.addEventListener("change", (e) => {
      if (e.target.value === "teacher") renderTeacher();
      else renderStudent();
    });

    // Default view
    renderStudent();

    // Logout simulation
    logoutBtn.addEventListener("click", () => {
      alert("Logged out!");
      window.location.href = "login.html";
    });

    // Create Exam button
    const createBtn = document.getElementById("createExamBtn");
    if (createBtn) {
      createBtn.addEventListener("click", () => {
        alert("Redirecting to Exam Creation Page (coming soon)...");
      });
    }
  }
});

//Exam Page
// === EXAM PAGE LOGIC ===
document.addEventListener("DOMContentLoaded", () => {
  const questionDisplay = document.getElementById("questionDisplay");
  const questionList = document.getElementById("questionList");
  const submitExamBtn = document.getElementById("submitExamBtn");
  const timerEl = document.getElementById("timer");

  if (questionDisplay && questionList) {
    // Mock questions
    const questions = [
      {
        id: 1,
        type: "mcq",
        text: "Which language is used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: null
      },
      {
        id: 2,
        type: "mcq",
        text: "HTML stands for?",
        options: [
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language"
        ],
        answer: null
      },
      {
        id: 3,
        type: "short",
        text: "Explain the role of CSS in web design.",
        answer: ""
      }
    ];

    let currentIndex = 0;
    let timeLeft = 5 * 60; // 5 minutes (for demo)

    // Render sidebar question buttons
    questionList.innerHTML = questions
      .map((q, i) => `<button class="q-btn ${i === 0 ? "active" : ""}" data-index="${i}">${i + 1}</button>`)
      .join("");

    // Render question
    const renderQuestion = (index) => {
      const q = questions[index];
      let html = `<div class="question-card"><h3>Q${index + 1}. ${q.text}</h3>`;

      if (q.type === "mcq") {
        html += `<div class="options">`;
        q.options.forEach((opt, i) => {
          html += `
            <label>
              <input type="radio" name="q${q.id}" value="${opt}" ${q.answer === opt ? "checked" : ""}>
              ${opt}
            </label>`;
        });
        html += `</div>`;
      } else if (q.type === "short") {
        html += `<textarea id="shortAns">${q.answer || ""}</textarea>`;
      }

      html += `<div style="margin-top:20px;text-align:right;">
                <button id="prevQ">Previous</button>
                <button id="nextQ">Next</button>
               </div></div>`;
      questionDisplay.innerHTML = html;

      // Event listeners for navigation
      document.getElementById("prevQ").onclick = () => {
        if (currentIndex > 0) showQuestion(currentIndex - 1);
      };
      document.getElementById("nextQ").onclick = () => {
        if (currentIndex < questions.length - 1) showQuestion(currentIndex + 1);
      };

      // Save answer automatically
      const radios = document.querySelectorAll(`input[name="q${q.id}"]`);
      radios.forEach(r =>
        r.addEventListener("change", (e) => {
          questions[index].answer = e.target.value;
          markAnswered(index);
        })
      );

      const textArea = document.getElementById("shortAns");
      if (textArea) {
        textArea.addEventListener("input", (e) => {
          questions[index].answer = e.target.value;
          markAnswered(index);
        });
      }
    };

    const markAnswered = (i) => {
      const btn = questionList.children[i];
      if (questions[i].answer && btn) btn.classList.add("answered");
    };

    const showQuestion = (index) => {
      currentIndex = index;
      renderQuestion(index);
      document.querySelectorAll(".q-btn").forEach(btn => btn.classList.remove("active"));
      questionList.children[index].classList.add("active");
    };

    // Sidebar button clicks
    document.querySelectorAll(".q-btn").forEach(btn =>
      btn.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        showQuestion(index);
      })
    );

    renderQuestion(0);

    // Timer
    const updateTimer = () => {
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      timerEl.textContent = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
      timeLeft--;

      if (timeLeft < 0) {
        clearInterval(timer);
        alert("Time is up! Submitting exam automatically...");
        submitExam();
      }
    };
    const timer = setInterval(updateTimer, 1000);
    updateTimer();

    // Submit
    const submitExam = () => {
      clearInterval(timer);
      const answeredCount = questions.filter(q => q.answer && q.answer !== "").length;
      alert(`Exam submitted!\nAnswered: ${answeredCount}/${questions.length}`);
      window.location.href = "result.html";
    };

    submitExamBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (confirm("Are you sure you want to submit the exam?")) {
        submitExam();
      }
    });
  }
});
