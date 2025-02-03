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

    let filterArr = []; // Array to store selected filters

    // Function to render filters dynamically at the top of the page
    function renderFilters() {
      filterSection.innerHTML = ""; // Clear the previous filters
      filterArr.forEach((filter) => {
        const filterTag = document.createElement("span");
        filterTag.className = "filter-tag";
        filterTag.innerText = filter;

        // Add remove button for filters
        const removeBtn = document.createElement("filter-btn");
        removeBtn.className = "remove-btn";
        removeBtn.innerText = "×";
        removeBtn.onclick = () => {
          // Remove filter from array
          filterArr = filterArr.filter((f) => f !== filter);
          renderFilters(); // Re-render filters
          renderJobs(data); // Re-render jobs
        };

        filterTag.appendChild(removeBtn);
        filterSection.appendChild(filterTag);
      });
    }

    // Function to render jobs dynamically
    function renderJobs(jobs) {
      jobsSection.innerHTML = ""; // Clear previous content
      jobs.forEach((job) => {
        // Create job card
        const jobCard = document.createElement("div");
        jobCard.className = "box-container";

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
          filterBtn.className = "filter-btn";
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
