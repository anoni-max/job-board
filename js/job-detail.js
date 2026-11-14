const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");
const container = document.getElementById("jobDetail");

function renderJobDetail() {
  if (isLoading) {
    container.innerHTML = `<div class="loading">Loading job details...</div>`;
    return;
  }

  const job = getJobById(jobId);

  if (!job) {
    document.title = "Job not found — JobBoard";
    container.innerHTML = `
      <div class="no-results">
        <h3>Job not found</h3>
        <p>This job may have been removed or the link is invalid.</p>
        <a href="index.html" style="color:#2563eb;margin-top:12px;display:inline-block;">← Back to jobs</a>
      </div>
    `;
    return;
  }

  // Set page title for SEO / browser tab
  document.title = `${job.title} at ${job.company} — JobBoard`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", job.description.slice(0, 155).replace(/<[^>]*>?/gm, ''));

  container.innerHTML = `
    <a href="index.html" class="back-link">← Back to all jobs</a>

        <div class="job-detail-card">
      <div class="job-detail-header">
        <img src="${getCompanyLogo(job.company)}" class="company-logo-large" alt="${job.company}" onerror="this.src='https://ui-avatars.com/api/?name=${job.company}&background=random'" />
        <div>
          <h1>${job.title}</h1>
          <p class="job-detail-meta" style="margin-top: 8px;">${job.company} · ${job.location}</p>
        </div>
      </div>
      <p class="job-detail-meta">
        <strong>${job.company}</strong> · ${job.location} · ${job.type} · Posted ${postedText(job.postedDaysAgo)}
      </p>
      <p class="job-detail-salary">
        ${job.currency}${job.salaryMin.toLocaleString()} – ${job.currency}${job.salaryMax.toLocaleString()} per year
      </p>

      <div class="tags" style="margin:16px 0;">
        ${job.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
      </div>

    <div class="job-detail-actions">
        <a href="${job.apply_url}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          Apply Now ↗
        </a>
        <button class="btn btn-secondary" onclick="copyLink()">Copy Link</button>
      </div>

      <section class="job-detail-section">
        <h2>About this role</h2>
        <div class="job-description">${job.description}</div>
      </section>
    </div>
  `;
}

// Render immediately (will show loading state if data isn't ready)
renderJobDetail();

// Actions
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(
    () => showToast("Link copied!"),
    () => showToast("Failed to copy")
  );
}

function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.className = "toast";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}