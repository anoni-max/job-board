// ============================================
// RENDER: turns data into HTML
// ============================================
function renderJobs(list) {
  const container = document.getElementById("jobsList");
  const info = document.getElementById("resultsInfo");

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

  container.innerHTML = list
    .map(
      (job) => `
    <a href="job.html?id=${job.id}" class="job-card" style="text-decoration:none;color:inherit;display:block;">
      <h3>${job.title}</h3>
      <div class="meta">${job.company} · ${job.location} · ${job.type} · ${postedText(job.postedDaysAgo)}</div>
      <div class="salary">${job.currency}${job.salaryMin.toLocaleString()} – ${job.currency}${job.salaryMax.toLocaleString()}</div>
      <div class="tags">${job.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </a>
  `
    )
    .join("");
}

// ============================================
// FILTER
// ============================================
function filterJobs() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const location = document.getElementById("locationSelect").value;
  const minSalary = Number(document.getElementById("salaryInput").value) || 0;

  const filtered = jobs.filter((job) => {
    const matchesQuery =
      query === "" ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.tags.some((t) => t.toLowerCase().includes(query));

    const matchesLocation = location === "" || job.location === location;
    const matchesSalary = job.salaryMax >= minSalary;

    return matchesQuery && matchesLocation && matchesSalary;
  });

  renderJobs(filtered);
}

// ============================================
// WIRE UP
// ============================================
document.getElementById("searchInput").addEventListener("input", filterJobs);
document.getElementById("locationSelect").addEventListener("change", filterJobs);
document.getElementById("salaryInput").addEventListener("input", filterJobs);

renderJobs(jobs);