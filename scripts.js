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
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      document.body.classList.toggle("dark-mode");
    });
  }
});

// Function to check if an image is landscape or portrait
const checkAspectRatio = (img) => {
    return img.width > img.height ? 'landscape' : 'portrait';
  };
  
  // Open modal with dynamic image sizing
  const openModal = (imageSrc) => {
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
  
    const img = new Image();
    img.src = imageSrc;
  
    img.onload = () => {
      const aspectRatio = checkAspectRatio(img);
      img.classList.add(aspectRatio);
      modalContent.appendChild(img);
    };
  
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.appendChild(modalContent);
  
    modalBackdrop.onclick = () => {
      document.body.removeChild(modalBackdrop);
    };
  
    document.body.appendChild(modalBackdrop);
  };
  