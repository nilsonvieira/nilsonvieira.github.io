document.addEventListener('DOMContentLoaded', () => {
    // Reveal Animations
    const reveals = document.querySelectorAll('.reveal');

    const reveal = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', reveal);
    reveal(); // Trigger on load
});
