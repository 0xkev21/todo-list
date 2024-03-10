const themeSwitchButtonContainer = document.querySelector('.theme-switch-btn');
const themeSwitchButton = document.querySelector('input[name="theme-switch"]');
const sidebarBtn = document.querySelector('.side-bar-toggle');

// Match user Theme
if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeSwitchButton.checked = true;
    themeSwitchButtonContainer.setAttribute('title', "Light Mode");
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    themeSwitchButton.checked = false;
    themeSwitchButtonContainer.setAttribute('title', "Dark Mode");
}

// Toggle Theme on Click
themeSwitchButtonContainer.addEventListener('click', (e) => {
    if(!themeSwitchButton.checked) {
        themeSwitchButton.checked = true;
        document.documentElement.setAttribute('data-theme', 'dark');
        themeSwitchButtonContainer.setAttribute('title', "Switch to Light");
    } else {
        themeSwitchButton.checked = false;
        document.documentElement.setAttribute('data-theme', 'light');
        themeSwitchButtonContainer.setAttribute('title', "Switch to Dark");
    }
});

// Toggle Sidebar
document.body.classList.add('show-side-bar');
sidebarBtn.addEventListener('click', () => {
    document.body.classList.toggle('show-side-bar');
})