const jobFrontEnd = document.getElementById("front-end-style");
const jobSenior = document.getElementById("senior-style");
const jobHtml = document.getElementById("html-style");
const jobCssStyle = document.getElementById("css-style");
const jobJavascript = document.getElementById("javascript-style");
const jobFullStack = document.getElementById("fullstack-style");
const jobMidweight = document.getElementById("midweight-style");
const jobPython = document.getElementById("python-style");
const jobReact = document.getElementById("react-style");
const jobJunior = document.getElementById("junior-style");
const jobSass = document.getElementById("sass-style");
const jobRuby = document.getElementById("ruby-style");
const jobBackend = document.getElementById("backend-style");
const jobRor = document.getElementById("ror-style");
const jobVue = document.getElementById("vue-style");
const jobDjango = document.getElementById("django-style");
const jobInput = document.getElementById("filter-input");
const allJobs = document.querySelectorAll(".job");

jobInput.addEventListener("input", function () {
  const filterValue = jobInput.value.toLowerCase();

  allJobs.forEach((job) => {
    const jobText = job.textContent.toLowerCase();

    if (jobText.includes(filterValue)) {
      job.style.display = "block";
    } else {
      job.style.display = "none";
    }
  });
});
