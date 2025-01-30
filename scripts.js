// scripts.js
document.addEventListener("DOMContentLoaded", function () {
    // Typewriter Effect for Header
    const headerText = document.querySelector("header h1");
    const text = headerText.textContent; // Use textContent instead of innerText
    headerText.textContent = ""; // Clear the text
  
    let i = 0;
    const typewriter = setInterval(() => {
      if (i < text.length) {
        headerText.textContent += text.charAt(i); // Add characters one by one
        i++;
      } else {
        clearInterval(typewriter); // Stop the interval when done
      }
    }, 100); // Adjust typing speed (in milliseconds)
  
    // Scroll Animation for Sections
    const sections = document.querySelectorAll(".container");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
      }
    );
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    // Parallax Effect for Header
    document.addEventListener("scroll", function () {
      const header = document.querySelector("header");
      const scrollPosition = window.scrollY;
      header.style.backgroundPositionY = `${-scrollPosition * 0.5}px`; // Adjust the multiplier for the parallax speed
    });
  
    // Dark Mode Toggle
    const themeToggle = document.getElementById("theme-toggle");
  
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });
  });