const viewNode = document.getElementById("view-count");

async function loadViewCount() {
  if (!viewNode) {
    return;
  }

  const namespace = "jeshwin.engineer";
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
