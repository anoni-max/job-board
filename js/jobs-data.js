// ============================================
// FETCH REAL JOBS FROM REMOTEOK API
// ============================================
let jobs = []; // Start empty
let isLoading = true;

async function fetchJobs() {
  try {
    // Fetch jobs from RemoteOK
    const response = await fetch("https://remoteok.com/api");
    const data = await response.json();
    
    // The first item in the array is just legal info, so we skip it
    const rawJobs = data.slice(1);

    // We only want the first 30 jobs so it loads fast, and we format them to match our site
    jobs = rawJobs.slice(0, 30).map((job) => {
      // Clean up the HTML tags that RemoteOK sometimes puts in titles
      const cleanTitle = job.position.replace(/<[^>]*>?/gm, '');
      
      return {
        id: cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'), // Creates IDs like "senior-react-engineer"
        title: cleanTitle,
        company: job.company,
        location: job.location || "Remote",
        type: "Full-time",
        salaryMin: job.salary_min || 50000, // Fallback if no salary provided
        salaryMax: job.salary_max || 100000,
        currency: "$",
        tags: job.tags && job.tags.length > 0 ? job.tags.slice(0, 3) : ["Remote", "Tech"],
        postedDaysAgo: 0, // We'll treat all fetched jobs as "Today" for now
        description: job.description || "No description provided.",
        requirements: ["See full description for details."],
        apply_url: job.apply_url || job.url, // Get the real company URL
      };
    });

    isLoading = false;
    
    // If we are on the home page, re-render the jobs
    if (typeof filterJobs === "function") {
      filterJobs();
    }
    
    // If we are on the job detail page, re-render the detail
    if (typeof renderJobDetail === "function" && typeof jobId !== "undefined") {
      renderJobDetail();
    }

  } catch (error) {
    console.error("Failed to fetch jobs:", error);
    isLoading = false;
    document.getElementById("jobsList").innerHTML = `
      <div class="no-results">
        <h3>Could not load jobs</h3>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

// Helper functions remain the same
function getJobById(id) {
  return jobs.find((j) => j.id == id); // Using == because API IDs might be numbers
}

function postedText(daysAgo) {
  if (daysAgo === 0) return "Today";
  if (daysAgo === 1) return "Yesterday";
  if (daysAgo < 7) return `${daysAgo} days ago`;
  if (daysAgo < 30) return `${Math.floor(daysAgo / 7)} week${daysAgo < 14 ? "" : "s"} ago`;
  return `${Math.floor(daysAgo / 30)} month${daysAgo < 60 ? "" : "s"} ago`;
}

// Start fetching immediately when the file loads
fetchJobs();

// Helper: Guess company domain and get logo
function getCompanyLogo(companyName) {
  if (!companyName) return "https://ui-avatars.com/api/?name=Job&background=random";
  
  // Clean up company name (remove spaces, "Inc", "LLC", etc. for the URL)
  const cleanName = companyName
    .toLowerCase()
    .replace(/\s+inc\.?$|\s+llc\.?$/g, '')
    .replace(/[^a-z0-9]/g, ''); 
    
  // Clearbit API: returns a logo based on domain
  return `https://logo.clearbit.com/${cleanName}.com`;
}