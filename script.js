const viewNode = document.getElementById("view-count");
const resumeModal = document.getElementById("resume-modal");

async function loadViewCount() {
  if (!viewNode) {
    return;
  }

  const namespace = "jeshwin.com";
  const key = "portfolio-home";

  try {
    const response = await fetch(`https://api.countapi.xyz/hit/${namespace}/${key}`);
    if (!response.ok) {
      throw new Error("Counter request failed");
    }

    const data = await response.json();
    viewNode.textContent = Intl.NumberFormat("en-US").format(data.value);
  } catch (error) {
    viewNode.textContent = "private";
    viewNode.title = "Visitor counter can be connected at deploy time.";
  }
}

loadViewCount();

function openResumeModal(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!resumeModal) {
    return;
  }

  resumeModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeResumeModal(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (!resumeModal) {
    return;
  }

  resumeModal.hidden = true;
  document.body.style.overflow = "";
}

document.addEventListener("click", (event) => {
  const openTrigger = event.target.closest("[data-resume-open]");
  if (openTrigger) {
    openResumeModal(event);
    return;
  }

  const closeTrigger = event.target.closest("[data-resume-close]");
  if (closeTrigger) {
    closeResumeModal(event);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeModal && !resumeModal.hidden) {
    closeResumeModal();
  }
});
