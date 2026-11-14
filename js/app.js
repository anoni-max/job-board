// ============================================
// DATA: Replace these with real jobs later
// ============================================
const jobs = [
  {
    title: "Senior React Engineer",
    company: "Acme Corp",
    location: "Remote",
    type: "Full-time",
    salaryMin: 120000,
    salaryMax: 160000,
    currency: "$",
    tags: ["React", "TypeScript", "Remote"],
  },
  {
    title: "Backend Engineer (Go)",
    company: "Beta Co",
    location: "Berlin",
    type: "Full-time",
    salaryMin: 80000,
    salaryMax: 110000,
    currency: "€",
    tags: ["Go", "PostgreSQL", "Docker"],
  },
  {
    title: "Product Designer",
    company: "Gamma Studio",
    location: "New York",
    type: "Contract",
    salaryMin: 90000,
    salaryMax: 130000,
    currency: "$",
    tags: ["Figma", "UI/UX", "Design systems"],
  },
  {
    title: "Data Engineer",
    company: "Delta Analytics",
    location: "Remote",
    type: "Full-time",
    salaryMin: 140000,
    salaryMax: 180000,
    currency: "$",
    tags: ["Python", "SQL", "Airflow"],
  },
  {
    title: "Frontend Developer",
    company: "Epsilon Labs",
    location: "London",
    type: "Full-time",
    salaryMin: 60000,
    salaryMax: 85000,
    currency: "£",
    tags: ["Vue", "CSS", "JavaScript"],
  },
  {
    title: "DevOps Engineer",
    company: "Zeta Systems",
    location: "Remote",
    type: "Full-time",
    salaryMin: 130000,
    salaryMax: 170000,
    currency: "$",
    tags: ["Kubernetes", "AWS", "Terraform"],
  },
  {
    title: "Mobile Developer (iOS)",
    company: "Eta Mobile",
    location: "Berlin",
    type: "Full-time",
    salaryMin: 75000,
    salaryMax: 100000,
    currency: "€",
    tags: ["Swift", "iOS", "Mobile"],
  },
  {
    title: "Technical Writer",
    company: "Theta Docs",
    location: "Remote",
    type: "Part-time",
    salaryMin: 40000,
    salaryMax: 60000,
    currency: "$",
    tags: ["Writing", "Documentation", "Remote"],
  },
];

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
    <div class="job-card" onclick="alert('You clicked: ${job.title.replace(/'/g, "\\'")}')">
      <h3>${job.title}</h3>
      <div class="meta">${job.company} · ${job.location} · ${job.type}</div>
      <div class="salary">${job.currency}${job.salaryMin.toLocaleString()} – ${job.currency}${job.salaryMax.toLocaleString()}</div>
      <div class="tags">${job.tags.map((t) => `<span class="tag">${t}</span>`).join("")}</div>
    </div>
  `
    )
    .join("");
}

// ============================================
// FILTER: runs when user types or selects
// ============================================
function filterJobs() {
  const query = document.getElementById("searchInput").value.toLowerCase().trim();
  const location = document.getElementById("locationSelect").value;

  const filtered = jobs.filter((job) => {
    const matchesQuery =
      query === "" ||
      job.title.toLowerCase().includes(query) ||
      job.company.toLowerCase().includes(query) ||
      job.tags.some((t) => t.toLowerCase().includes(query));

    const matchesLocation = location === "" || job.location === location;

    return matchesQuery && matchesLocation;
  });

  renderJobs(filtered);
}

// ============================================
// WIRE UP EVENTS + INITIAL RENDER
// ============================================
document.getElementById("searchInput").addEventListener("input", filterJobs);
document.getElementById("locationSelect").addEventListener("change", filterJobs);

renderJobs(jobs);