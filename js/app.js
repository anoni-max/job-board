// ============================================
// RENDER: turns data into HTML
// ============================================
function renderJobs(list) {
  const container = document.getElementById("jobsList");
  const info = document.getElementById("resultsInfo");

  if (isLoading) {
    info.textContent = "";
    container.innerHTML = `<div class="loading">Fetching live jobs from RemoteOK...</div>`;
    return;
  }

  info.textContent = `${list.length} job${list.length === 1 ? "" : "s"} found`;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="no-results">
        <h3>No jobs match your search</h3>
        <p>Try different keywords or clear the filters</p>
      </div>
    `;
    return;
  }

  // ... keep the rest of your map(...) function exactly the same ...
  container.innerHTML = list
    .map(
      (job) => `
        <a href="/job.html?id=${job.id}" class="job-card" style="text-decoration:none;color:inherit;display:block;">
      <div class="job-header-flex">
        <img src="${getCompanyLogo(job.company)}" class="company-logo" alt="${job.company}" onerror="this.src='https://ui-avatars.com/api/?name=${job.company}&background=random'" />
        <h3>${job.title}</h3>
      </div>
      <div class="meta">${job.company} · ${job.location} · ${job.type} · ${postedText(job.postedDaysAgo)}</div>
      <div class="salary">${job.currency}${job.salaryMin.toLocaleString()} – ${job.currency}${job.salaryMax.toLocaleString()}</div>
      <div class="tags">${job.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </a>
  `
    )
    .join("");
}

function filterJobs() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const location = document.getElementById("locationSelect").value;
  const minSalary = Number(document.getElementById("salaryInput").value) || 0;
  const sortBy = document.getElementById("sortSelect").value;

  let filtered = jobs.filter((job) => {
    const matchesQuery =
      query === "" ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.tags.some((t) => t.toLowerCase().includes(query));

    const matchesLocation = location === "" || job.location === location;
    const matchesSalary = job.salaryMax >= minSalary;

    return matchesQuery && matchesLocation && matchesSalary;
  });

  // Sort
  if (sortBy === "recent") {
    filtered.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
  } else if (sortBy === "salary") {
    filtered.sort((a, b) => b.salaryMax - a.salaryMax);
  } else if (sortBy === "title") {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  renderJobs(filtered);
}

// ============================================
// WIRE UP
// ============================================
document.getElementById("searchInput").addEventListener("input", filterJobs);
document.getElementById("locationSelect").addEventListener("change", filterJobs);
document.getElementById("salaryInput").addEventListener("input", filterJobs);

renderJobs(jobs);
document.getElementById("sortSelect").addEventListener("change", filterJobs);