function showSection(sectionId, clickedButton = null) {
  const sections = document.querySelectorAll(".tab-section");
  const buttons = document.querySelectorAll(".nav-pill");

  sections.forEach(section => section.classList.remove("active"));
  buttons.forEach(button => button.classList.remove("active"));

  const targetSection = document.getElementById(sectionId);

  if (targetSection) {
    targetSection.classList.add("active");
  }

  if (clickedButton) {
    clickedButton.classList.add("active");
  } else {
    const matchingButton = [...buttons].find(button => {
      const text = button.textContent.trim().toLowerCase();

      return (
        (sectionId === "projects" && text === "projekt") ||
        (sectionId === "skills" && text === "färdigheter") ||
        (sectionId === "about" && text === "om mig") ||
        (sectionId === "contact" && text === "kontakt")
      );
    });

    if (matchingButton) {
      matchingButton.classList.add("active");
    }
  }
}

function goToSection(sectionId) {
  showSection(sectionId);

  const contentSwitcher = document.querySelector(".content-switcher");

  if (contentSwitcher) {
    contentSwitcher.scrollIntoView({
      behavior: "smooth"
    });
  }
}

/* Kontaktformulär - skickar utan att lämna sidan */
const form = document.getElementById("contactForm");
const status = document.getElementById("form-status");

if (form && status) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = new FormData(form);
    const button = form.querySelector("button");

    button.disabled = true;
    button.textContent = "Skickar...";

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        status.textContent = "✅ Tack! Meddelandet skickades.";
        status.style.color = "lightgreen";
        form.reset();
      } else {
        status.textContent = "❌ Något gick fel, försök igen.";
        status.style.color = "red";
      }
    } catch (error) {
      status.textContent = "❌ Kunde inte skicka meddelandet.";
      status.style.color = "red";
    }

    button.disabled = false;
    button.textContent = "Skicka meddelande";
  });
}