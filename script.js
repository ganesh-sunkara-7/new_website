window.addEventListener("load", () => {
    document.getElementById("preloader").style.display = "none";
});

document.addEventListener("DOMContentLoaded", function () {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");

            tabButtons.forEach((btn) => btn.classList.remove("active"));
            tabPanes.forEach((pane) => {
                pane.classList.remove("active");
                pane.style.animation = "none";
            });

            this.classList.add("active");

            if (targetTab === "all") {
                tabPanes.forEach((pane) => {
                    pane.classList.add("active");
                    pane.style.animation = "fadeIn 0.5s ease-out";
                });
            } else {
                document.getElementById(targetTab).classList.add("active");
                document.getElementById(targetTab).style.animation = "fadeIn 0.5s ease-out";
            }
        });
    });
});

// Projects data for Ganesh
let projects = [
    {
        "title": "Blackjack Game",
        "description": "Developed a Blackjack game utilizing a standard deck of cards, allowing players to compete against the dealer and enhance their strategic thinking skills. Implemented core game mechanics, including hitting, standing, and bust detection, to provide an authentic gaming experience using Object-Oriented Programming principles in Python.",
        "technologies": ["Python", "OOP", "Game Development"],
        "features": [
            "Player vs Dealer competition",
            "Hit/Stand functionality", 
            "Bust detection system",
            "Modular code structure"
        ]
    },
    {
        "title": "Tic Tac Toe Game", 
        "description": "Developed a Tic Tac Toe game that allows two players to compete against each other on a single computer, enhancing user engagement and interaction. Utilized Python and Object-Oriented Programming principles to create a clean, efficient code structure, ensuring easy maintenance and scalability.",
        "technologies": ["Python", "OOP", "User Interface"],
        "features": [
            "Two-player functionality",
            "Turn management system",
            "Win detection algorithm",
            "Clean user interface"
        ]
    },
    {
        "title": "Python Learning Projects",
        "description": "Explored essential Python libraries such as math and datetime, and created small, practical projects to reinforce programming skills and apply theoretical knowledge. Learned effective Error Handling techniques to manage exceptions and ensure robust program execution.",
        "technologies": ["Python", "Error Handling", "Libraries"],
        "features": [
            "Math library implementation",
            "Datetime functionality",
            "Exception handling",
            "Modular project structure"
        ]
    }
];

// Function to display projects with enhanced styling
function displayProjects() {
    console.log("Projects data:", projects);
    const projectContainer = document.getElementById("projectContainer");

    projectContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
    `;

    projectContainer.innerHTML = ""; // Clear previous content

    projects.forEach((project, index) => {
        const projectDiv = document.createElement("div");
        projectDiv.style.cssText = `
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background: rgba(255, 255, 255, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.7);
            border-radius: 15px;
            box-shadow: 6px 6px 15px rgba(200, 200, 200, 0.3), -6px -6px 15px rgba(255, 255, 255, 0.2);
            padding: 20px;
            min-height: 300px;
            width: 100%;
            max-width: 800px;
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease, box-shadow 0.4s ease, border-color 0.3s ease;
        `;

        setTimeout(() => {
            projectDiv.style.opacity = 1;
            projectDiv.style.transform = "translateY(0)";
        }, index * 200);

        projectDiv.addEventListener("mouseover", () => {
            projectDiv.style.boxShadow = "inset 4px 4px 10px rgba(222, 20, 253, 0.4), inset -4px -4px 10px rgba(247, 91, 247, 0.2)";
            projectDiv.style.border = "2px solid rgba(220, 132, 237, 0.7)";
        });

        projectDiv.addEventListener("mouseout", () => {
            projectDiv.style.boxShadow = "6px 6px 15px rgba(200, 200, 200, 0.3), -6px -6px 15px rgba(255, 255, 255, 0.2)";
            projectDiv.style.border = "1px solid rgba(255, 255, 255, 0.7)";
        });

        // Create technologies tags
        const techTags = project.technologies.map(tech => 
            `<span style="background: #f56692; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; margin: 2px;">${tech}</span>`
        ).join(' ');

        projectDiv.innerHTML = `
            <div style="flex: 1; padding-right: 20px;">
                <h3 style="color: #333; margin-bottom: 10px; font-size: 1.5em;">${project.title}</h3>
                <p style="color: #666; line-height: 1.6; margin-bottom: 15px;">${project.description}</p>
                <div style="margin-bottom: 10px;">
                    <strong style="color: #333;">Technologies:</strong><br>
                    ${techTags}
                </div>
            </div>
        `;

        projectContainer.appendChild(projectDiv);
    });
}

// Initialize projects display
window.onload = () => {
    displayProjects();
};

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reveal animation on scroll
window.addEventListener('scroll', () => {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const subject = this.querySelector('input[type="text"]:nth-of-type(2)').value;
    const message = this.querySelector('textarea').value;

    // Simple validation
    if (name && email && subject && message) {
        alert(`Thank you ${name}! Your message has been received. I'll get back to you soon.`);
        this.reset();
    } else {
        alert('Please fill in all fields.');
    }
});