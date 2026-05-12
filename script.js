(function () {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const fill = preloader.querySelector('.progress-fill');

    function setProgress(p) {
        const percent = Math.max(0, Math.min(100, p));
        if (fill) {
        
            fill.style.animation = 'none';
            fill.style.width = percent + '%';
        }
    }

    function hidePreloader() {
        preloader.style.transition = 'opacity 0.35s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 350);
    }

    
    document.addEventListener('DOMContentLoaded', () => {
        setProgress(10);

        const images = Array.from(document.images || []);
        let total = images.length;
        let loaded = 0;

        if (total === 0) {
            setProgress(100);
            setTimeout(hidePreloader, 120);
            return;
        }

        const maxWaitMs = 2500;
        const start = Date.now();

        function maybeFinish() {
            const elapsed = Date.now() - start;
            const done = loaded >= total;
            const timeout = elapsed >= maxWaitMs;
            if (done || timeout) {
                setProgress(100);
                setTimeout(hidePreloader, 120);
            }
        }

   
        let tick = 0;
        const timer = setInterval(() => {
            tick++;
            if (preloader.style.display === 'none') {
                clearInterval(timer);
                return;
            }
            const current = fill ? parseFloat((fill.style.width || '0').replace('%', '')) : 0;
            const target = Math.min(90, current + (tick % 2 === 0 ? 2 : 1.5));
            setProgress(target);
            if (Date.now() - start > maxWaitMs - 250) clearInterval(timer);
        }, 110);

        images.forEach((img) => {
            if (!img) {
                loaded++;
                maybeFinish();
                return;
            }

            
            if (img.complete) {
                loaded++;
                setProgress(10 + (loaded / total) * 80);
                maybeFinish();
                return;
            }

            const onDone = () => {
                loaded++;
                setProgress(10 + (loaded / total) * 80);
                maybeFinish();
            };

            img.addEventListener('load', onDone, { once: true });
            img.addEventListener('error', onDone, { once: true });
        });


        setTimeout(maybeFinish, maxWaitMs);
    });
})();
document.addEventListener('mousemove', (e) => {

    const img = document.querySelector('.image-wrapper');
    if (img) {
        const x = (window.innerWidth / 2 - e.pageX) / 30;
        const y = (window.innerHeight / 2 - e.pageY) / 30;
        img.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    }

    
    document.body.style.setProperty('--mouseX', `${e.clientX}px`);
    document.body.style.setProperty('--mouseY', `${e.clientY}px`);
});


function updateScrollVar() {
    document.body.style.setProperty('--scrollY', `${window.scrollY}px`);
}
window.addEventListener('scroll', updateScrollVar, { passive: true });
updateScrollVar();



const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if(menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100; 

    reveals.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();