const viewNode = document.getElementById("view-count");
const resumeModal = document.getElementById("resume-modal");
const assistantShell = document.getElementById("portfolio-assistant");
const assistantToggle = assistantShell?.querySelector(".assistant-toggle");
const assistantPanel = document.getElementById("assistant-panel");
const assistantClose = assistantShell?.querySelector(".assistant-close");
const assistantForm = document.getElementById("assistant-form");
const assistantInput = document.getElementById("assistant-input");
const assistantLog = document.getElementById("assistant-log");

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

const assistantResponses = [
  {
    match: ["currently working", "current work", "working on", "now", "current focus"],
    answer:
      "Jeshwin is currently focused on backend and transaction-heavy platform work across distributed services, reconciliation flows, and production-critical system design. The strongest themes are Java, Spring Boot, event-driven processing, Kafka, cloud infrastructure, and making high-volume systems more reliable under failure.",
    action: "experience",
  },
  {
    match: ["role", "roles", "targeting", "job", "opportunity"],
    answer:
      "Jeshwin is looking for backend, distributed systems, platform engineering, and cloud-native infrastructure roles where reliability, scale, and architecture depth matter. The best fit is a team building production-critical systems with real throughput, failure handling, and long-term ownership.",
  },
  {
    match: ["looking for", "what kind of roles", "seeking", "open to", "hiring"],
    answer:
      "Jeshwin is looking for backend and distributed-systems roles centered on event-driven architecture, platform reliability, cloud-native services, and high-throughput production workloads. He is strongest where system design, implementation depth, and operational resilience all matter together.",
  },
  {
    match: ["resume", "cv"],
    answer:
      "You can open the latest resume directly from the View Resume button in the header, hero, footer, or contact section.",
    action: "resume",
  },
  {
    match: ["contact", "email", "reach", "linkedin"],
    answer:
      "The fastest contact path is email at jeshwin.w.james@gmail.com. You can also use the contact form or open LinkedIn from the homepage.",
    action: "contact",
  },
  {
    match: ["project", "strongest", "best work", "flagship"],
    answer:
      "A strong starting point is the Distributed Order Processing Platform because it shows event-driven architecture, Kafka orchestration, idempotency, retries, and service-boundary design.",
    action: "projects",
  },
  {
    match: ["best system design", "system design thinking", "best architecture project", "best design project"],
    answer:
      "The Distributed Order Processing Platform is the clearest system design showcase. It brings together API boundaries, Kafka-driven workflows, saga coordination, idempotency, retry handling, observability, and database trade-offs in one architecture story.",
    action: "system-design",
  },
  {
    match: ["system design", "architecture", "case study", "design page"],
    answer:
      "The System Design Library highlights order processing, PR intelligence, reconciliation, and mobile payment security. Each one focuses on requirements, trade-offs, and failure handling.",
    action: "system-design",
  },
  {
    match: ["how he thinks", "how does", "distributed systems", "thinking", "trade-off", "tradeoffs"],
    answer:
      "Jeshwin thinks about distributed systems through reliability first: clear service boundaries, idempotency, retry safety, observability, failure isolation, and auditability. The goal is not just making services work on a happy path, but making them explainable, recoverable, and stable under scale and partial failure.",
    action: "system-design",
  },
  {
    match: ["publication", "paper", "research", "springer"],
    answer:
      "Jeshwin has a peer-reviewed Springer publication on improving mobile payment security using IMEI verification, and it is linked in the Publication section.",
    action: "publication",
  },
  {
    match: ["experience", "state street", "accenture", "flipkart"],
    answer:
      "Jeshwin’s experience spans State Street and Accenture / Flipkart, with work in fund transactions, reconciliation, payments, Kafka-based systems, and large-scale backend services.",
    action: "experience",
  },
];

function appendAssistantMessage(role, text) {
  if (!assistantLog) {
    return;
  }

  const message = document.createElement("article");
  message.className = `assistant-message assistant-message-${role}`;

  const heading = document.createElement("strong");
  heading.textContent = role === "user" ? "You" : "Assistant";

  const body = document.createElement("p");
  body.textContent = text;

  message.append(heading, body);
  assistantLog.append(message);
  assistantLog.scrollTop = assistantLog.scrollHeight;
}

function openAssistant() {
  if (!assistantPanel || !assistantToggle) {
    return;
  }

  assistantPanel.hidden = false;
  assistantToggle.setAttribute("aria-expanded", "true");
}

function closeAssistant() {
  if (!assistantPanel || !assistantToggle) {
    return;
  }

  assistantPanel.hidden = true;
  assistantToggle.setAttribute("aria-expanded", "false");
}

function routeAssistantAction(action) {
  if (!action) {
    return;
  }

  if (action === "resume") {
    openResumeModal();
    return;
  }

  const targetMap = {
    contact: "#contact",
    projects: "#projects",
    "system-design": "#system-design-library",
    publication: "#publication",
    experience: "#experience",
  };

  const href = targetMap[action];
  if (href) {
    window.location.hash = href;
  }
}

function getAssistantReply(question) {
  const normalized = question.toLowerCase();
  const matched = assistantResponses.find((entry) =>
    entry.match.some((token) => normalized.includes(token))
  );

  if (matched) {
    return matched;
  }

  return {
    answer:
      "I can help with experience, projects, system design, publication, resume, or contact. Try one of those topics for a faster answer.",
  };
}

function handleAssistantQuestion(question) {
  const trimmed = question.trim();
  if (!trimmed) {
    return;
  }

  appendAssistantMessage("user", trimmed);
  const reply = getAssistantReply(trimmed);
  appendAssistantMessage("bot", reply.answer);
  routeAssistantAction(reply.action);
}

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
  if (assistantToggle && event.target.closest(".assistant-toggle")) {
    if (assistantPanel?.hidden) {
      openAssistant();
    } else {
      closeAssistant();
    }
    return;
  }

  if (assistantClose && event.target.closest(".assistant-close")) {
    closeAssistant();
    return;
  }

  const assistantPrompt = event.target.closest("[data-assistant-question]");
  if (assistantPrompt) {
    openAssistant();
    handleAssistantQuestion(assistantPrompt.getAttribute("data-assistant-question") || "");
    return;
  }

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

if (assistantForm) {
  assistantForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!assistantInput) {
      return;
    }

    handleAssistantQuestion(assistantInput.value);
    assistantInput.value = "";
  });
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && resumeModal && !resumeModal.hidden) {
    closeResumeModal();
    return;
  }

  if (event.key === "Escape" && assistantPanel && !assistantPanel.hidden) {
    closeAssistant();
  }
});
