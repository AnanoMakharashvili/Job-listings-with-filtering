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
        removeBtn.style.backgroundColor = "#5ca5a5";
        removeBtn.onclick = () => {
          filterArr = filterArr.filter((f) => f !== filter);
          renderFilters();
          renderJobs();
        };

        filterContainer.appendChild(filterTag);
        filterContainer.appendChild(removeBtn);
        filterSection.appendChild(filterContainer);
      });
    }

    function renderJobs() {
      jobsSection.innerHTML = "";

      const filteredJobs = data.filter((job) => {
        if (filterArr.length === 0) return true;
        const jobFilters = [
          job.role,
          job.level,
          ...job.languages,
          ...job.tools,
        ];
        return filterArr.every((filter) => jobFilters.includes(filter));
      });

      filteredJobs.forEach((job) => {
        const jobCard = document.createElement("div");
        jobCard.className = "job-section";

        const logo = document.createElement("img");
        logo.src = job.logo;
        logo.alt = `${job.company} logo`;
        logo.className = "job-logo";

        const jobInfo = document.createElement("div");
        jobInfo.className = "job-info";

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

        const jobMeta = document.createElement("div");
        jobMeta.className = "job-meta";
        jobMeta.innerHTML = `
          <h2 class="job-position">${job.position}</h2>
          <p class="job-details">
            ${job.postedAt} • ${job.contract} • ${job.location}
          </p>
        `;

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

          filterBtn.onclick = () => {
            if (!filterArr.includes(filter)) {
              filterArr.push(filter);
              renderFilters();
              renderJobs();
            }
          };

          filters.appendChild(filterBtn);
        });

        jobInfo.appendChild(companyDetails);
        jobInfo.appendChild(jobMeta);
        jobInfo.appendChild(filters);
        jobCard.appendChild(logo);
        jobCard.appendChild(jobInfo);

        jobsSection.appendChild(jobCard);
      });
    }

    renderJobs();
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
