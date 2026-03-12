document.addEventListener('DOMContentLoaded', () => {
    // Poll for the navigation bar to appear (it's often rendered by JS)
    const injectLink = () => {
        // Try to find the standard ESPHome v2+ navigation area
        const nav = document.querySelector('nav ul') || document.querySelector('header div');
        if (nav && !document.getElementById('nav-reg-dump')) {
            const li = document.createElement('li');
            li.id = 'nav-reg-dump';
            const a = document.createElement('a');
            a.href = '/registers';
            a.textContent = 'Register Dump';
            a.style.marginLeft = '15px';
            a.style.opacity = '0.7';
            a.onmouseover = () => a.style.opacity = '1';
            a.onmouseout = () => a.style.opacity = '0.7';

            if (nav.tagName === 'UL') {
                li.appendChild(a);
                nav.appendChild(li);
            } else {
                nav.appendChild(a);
            }
            return true;
        }
        return false;
    };

    const timer = setInterval(() => {
        if (injectLink()) clearInterval(timer);
    }, 500);

    // Stop trying after 10 seconds
    setTimeout(() => clearInterval(timer), 10000);
});
