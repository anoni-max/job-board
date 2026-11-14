// ============================================
// Read ?id= from URL and render the job detail
// ============================================
const params = new URLSearchParams(window.location.search);
const jobId = params.get("id");
const job = getJobById(jobId);
const container = document.getElementById("jobDetail");

if (!job) {
  document.title = "Job not found — JobBoard";
  container.innerHTML = `
    <div class="no-results">
      <h3>Job not found</h3>
      <p>This job may have been removed.</p>
      <a href="index.html" style="color:#2563eb;margin-top:12px;display:inline-block;">← Back to jobs</a>
    </div>
  `;
} else {
  // Set page title for SEO / browser tab
  document.title = `${job.title} at ${job.company} — JobBoard`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", job.description.slice(0, 155));

  container.innerHTML = `
    <a href="index.html" class="back-link">← Back to all jobs</a>

    <div class="job-detail-card">
      <h1>${job.title}</h1>
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
        <a href="mailto:you@example.com?subject=Application for ${encodeURIComponent(job.title)} at ${encodeURIComponent(job.company)}"
           class="btn btn-primary">Apply via Email</a>
        <button class="btn btn-secondary" onclick="copyLink()">Copy Link</button>
        <button class="btn btn-secondary" onclick="shareJob()">Share</button>
      </div>

      <section class="job-detail-section">
        <h2>About this role</h2>
        <p>${job.description}</p>
      </section>

      <section class="job-detail-section">
        <h2>Requirements</h2>
        <ul>
          ${job.requirements.map((r) => `<li>${r}</li>`).join("")}
        </ul>
      </section>

      <section class="job-detail-section">
        <h2>How to apply</h2>
        <p>Click the "Apply via Email" button above. Include your resume and a short note about why you're a good fit.</p>
      </section>
    </div>
  `;
}

// ============================================
// Actions
// ============================================
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(
    () => showToast("Link copied!"),
    () => showToast("Failed to copy")
  );
}

function shareJob() {
  if (navigator.share) {
    navigator.share({
      title: `${job.title} at ${job.company}`,
      url: window.location.href,
    });
  } else {
    copyLink();
  }
}

function showToast(msg) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.className = "toast";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}