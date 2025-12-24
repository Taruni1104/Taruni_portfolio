// Initialize Animate On Scroll (AOS)
document.addEventListener('DOMContentLoaded', function () {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 50
    });

    // Handle View Switching (Tabs)
    const navLinks = document.querySelectorAll('.nav-link, .navbar-brand, .nav-trigger');
    const sections = document.querySelectorAll('.section-view');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    function switchView(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0); // Reset scroll to top

            // Re-trigger AOS to animate elements in the new view
            setTimeout(() => {
                AOS.refresh();
            }, 100);
        }

        // Update Navbar Active State
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Add click event listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const sectionId = this.dataset.section;
            if (sectionId) {
                e.preventDefault();
                switchView(sectionId);

                // Close mobile menu if open
                if (window.getComputedStyle(navbarToggler).display !== 'none' && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Default View (Home) - processed by HTML structure, but good to reinforce
    // switchView('home'); 
    // switchView('home'); 
    
    // Custom Cursor Logic
    const cursorOuter = document.querySelector('.custom-cursor-outer');
    const cursorInner = document.querySelector('.custom-cursor-inner');
    const hoverLinks = document.querySelectorAll('a, button, .btn, .nav-link, .project-card, .skill-card, .profile-pic');

    // Only activate on non-touch devices
    if (matchMedia('(pointer:fine)').matches) {
        document.addEventListener('mousemove', function(e) {
            cursorOuter.style.top = e.clientY + 'px';
            cursorOuter.style.left = e.clientX + 'px';
            cursorInner.style.top = e.clientY + 'px';
            cursorInner.style.left = e.clientX + 'px';
        });

        document.addEventListener('mousedown', function() {
            cursorOuter.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorInner.style.transform = 'translate(-50%, -50%) scale(0.8)';
        });

        document.addEventListener('mouseup', function() {
            cursorOuter.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorInner.style.transform = 'translate(-50%, -50%) scale(1)';
        });

        hoverLinks.forEach(link => {
            link.addEventListener('mouseenter', () => {
                document.body.classList.add('hovering');
            });
            link.addEventListener('mouseleave', () => {
                document.body.classList.remove('hovering');
            });
        });
    }
});
