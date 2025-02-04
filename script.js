fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    const jobsSection = document.getElementById("box-container");
    const filterSection = document.getElementById("filter-tag");
    const jobInfoContainer = document.getElementById("job-filter");

    let filterArr = [];

    function renderFilters() {
      filterSection.innerHTML = "";

      filterArr.forEach((filter) => {
        const filterContainer = document.createElement("div");
        filterContainer.className = "info-panel";

        const filterTag = document.createElement("span");
        filterTag.className = "extra-section";
        filterTag.innerText = filter;

        const removeBtn = document.createElement("img");
        removeBtn.src = "assets/x.png";
        removeBtn.alt = "delete";
        removeBtn.className = "filter-btn";
        removeBtn.style.backgroundColor = "#5ca5a5;";
        removeBtn.onclick = () => {
          filterArr = filterArr.filter((f) => f !== filter);
          renderFilters();
          renderJobs(data);
        };

        filterContainer.appendChild(filterTag);
        filterContainer.appendChild(removeBtn);
        filterSection.appendChild(filterContainer);
      });
    }

    // Function to render jobs dynamically
    function renderJobs(jobs) {
      jobsSection.innerHTML = ""; // Clear previous content
      jobs.forEach((job) => {
        // Create job card
        const jobCard = document.createElement("div");
        jobCard.className = "job-section";

        // Company logo
        const logo = document.createElement("img");
        logo.src = job.logo;
        logo.alt = `${job.company} logo`;
        logo.className = "job-logo";

        // Job info container
        const jobInfo = document.createElement("div");
        jobInfo.className = "job-info";

        // Company name, new/featured badges
        const companyDetails = document.createElement("div");
        companyDetails.className = "company-details";
        companyDetails.innerHTML = `
          <h3 class="company-name">${job.company}</h3>
          ${job.new ? `<span class="badge new-badge">NEW!</span>` : ""}
          ${
            job.featured
              ? `<span class="badge featured-badge">FEATURED</span>`
              : ""
          }
        `;

        // Position, posted time, contract, and location
        const jobMeta = document.createElement("div");
        jobMeta.className = "job-meta";
        jobMeta.innerHTML = `
          <h2 class="job-position">${job.position}</h2>
          <p class="job-details">
            ${job.postedAt} • ${job.contract} • ${job.location}
          </p>
        `;

        // Filters (role, level, languages, tools)
        const filters = document.createElement("div");
        filters.className = "job-filters";

        const allFilters = [
          job.role,
          job.level,
          ...job.languages,
          ...job.tools,
        ];

        allFilters.forEach((filter) => {
          const filterBtn = document.createElement("button");
          filterBtn.className = "job-title-container";
          filterBtn.innerText = filter;

          // Add event listener to add the filter to filterArr
          filterBtn.onclick = () => {
            if (!filterArr.includes(filter)) {
              filterArr.push(filter); // Add filter to array
              renderFilters(); // Re-render filters
              renderJobs(data); // Re-render jobs
            }
          };

          filters.appendChild(filterBtn);
        });

        // Append all sections to the job card
        jobInfo.appendChild(companyDetails);
        jobInfo.appendChild(jobMeta);
        jobInfo.appendChild(filters);

        jobCard.appendChild(logo);
        jobCard.appendChild(jobInfo);

        // Append job card to the jobs section
        jobsSection.appendChild(jobCard);
      });
    }

    // Initial rendering of jobs
    renderJobs(data);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
