// Main JavaScript for Smart Student Tools

document.addEventListener('DOMContentLoaded', function () {

    // Search Functionality
    const searchInput = document.getElementById('toolSearch');
    const searchResults = document.getElementById('searchResults');

    // Tool Dictionary - Add all your tools here
    const tools = [
        { name: 'Percentage Calculator', url: 'student-tools/percentage-calculator.html', category: 'Student' },
        { name: 'Grade Calculator', url: 'student-tools/grade-calculator.html', category: 'Student' },
        { name: 'CGPA Calculator', url: 'student-tools/cgpa-calculator.html', category: 'Student' },
        { name: 'Word Counter', url: 'student-tools/word-counter.html', category: 'Student' },
        { name: 'Password Generator', url: 'student-tools/password-generator.html', category: 'Student' },
        { name: 'Study Timer', url: 'student-tools/study-timer.html', category: 'Student' },
        { name: 'Case Converter', url: 'student-tools/case-converter.html', category: 'Student' },

        { name: 'Unit Converter', url: 'calculators/unit-converter.html', category: 'Calculator' },
        { name: 'Scientific Calculator', url: 'calculators/scientific-calculator.html', category: 'Calculator' },
        { name: 'Age Calculator', url: 'calculators/age-calculator.html', category: 'Calculator' },
        { name: 'BMI Calculator', url: 'calculators/bmi-calculator.html', category: 'Calculator' },
        { name: 'Loan EMI Calculator', url: 'calculators/loan-calculator.html', category: 'Calculator' },
        { name: 'Discount Calculator', url: 'calculators/discount-calculator.html', category: 'Calculator' },
        { name: 'Profit Calculator', url: 'calculators/profit-calculator.html', category: 'Calculator' },

        { name: 'Image Resizer', url: 'image-tools/image-resizer.html', category: 'Image' },
        { name: 'Image Compressor', url: 'image-tools/image-compressor.html', category: 'Image' },
        { name: 'JPG to PNG Converter', url: 'image-tools/jpg-to-png.html', category: 'Image' },
        { name: 'PDF to JPG Converter', url: 'image-tools/pdf-to-jpg.html', category: 'Image' },
        { name: 'QR Code Generator', url: 'image-tools/qr-generator.html', category: 'Image' }
    ];

    if (searchInput && searchResults) {
        searchInput.addEventListener('input', function (e) {
            const term = e.target.value.toLowerCase().trim();

            if (term.length === 0) {
                searchResults.classList.remove('show');
                return;
            }

            const filteredTools = tools.filter(tool =>
                tool.name.toLowerCase().includes(term)
            );

            renderResults(filteredTools);
        });

        // Hide results when clicking outside
        document.addEventListener('click', function (e) {
            if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('show');
            }
        });

        // Show results again if input is focused and has text
        searchInput.addEventListener('focus', function () {
            if (searchInput.value.trim().length > 0) {
                searchResults.classList.add('show');
            }
        });
    }

    function renderResults(results) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No tools found matching your search.</div>';
        } else {
            // Determine if we are in a subfolder to adjust links
            const path = window.location.pathname;
            const isSubfolder = path.includes('/student-tools/') || path.includes('/calculators/') || path.includes('/image-tools/');
            const prefix = isSubfolder ? '../' : '';

            results.forEach((tool) => {
                const div = document.createElement('div');
                div.className = 'search-result-item';
                div.innerHTML = `
                    <a href="${prefix}${tool.url}" style="display: flex; align-items: center; gap: 15px; width: 100%;">
                        <div class="search-result-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <div class="search-result-info">
                            <h4 style="margin:0;font-size:1rem;">${tool.name}</h4>
                            <p style="margin:0;font-size:0.8rem;color:#666;">${tool.category} Tool</p>
                        </div>
                    </a>
                `;
                searchResults.appendChild(div);
            });
        }

        searchResults.classList.add('show');
    }

    // FAQ Accordion Functionality
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const item = question.parentElement;
            const isActive = item.classList.contains("active");

            // Close all other items
            document.querySelectorAll(".faq-item").forEach(otherItem => {
                otherItem.classList.remove("active");
                const otherAnswer = otherItem.querySelector(".faq-answer");
                if (otherAnswer) otherAnswer.style.maxHeight = null;
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add("active");
                const answer = item.querySelector(".faq-answer");
                if (answer) answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});

// Mobile Menu Toggle Functionality
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const navMenu = document.getElementById("navMenu");

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener("click", () => {
        mobileMenuToggle.classList.toggle("active");
        navMenu.classList.toggle("show");
    });

    // Close menu when clicking a link
    document.querySelectorAll(".nav-menu a").forEach(link => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active");
            navMenu.classList.remove("show");
        });
    });
}
