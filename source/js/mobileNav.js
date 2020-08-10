const showMobileNav = () => {
    let width = document.body.clientWidth;

    const btnOpen = document.querySelector('.header__nav-open');
    let navContent = document.querySelector('.nav-mobile');

    navContent.style.display = 'none';

    btnOpen.addEventListener('click',handleOpenNav);

    const mobNavLinks = document.querySelectorAll('.nav-mobile__link');
    mobNavLinks.forEach((link) => {
        link.addEventListener('click',handleOpenNav);
    })
    
}

const handleOpenNav = () => {
    const navContent = document.querySelector('.nav-mobile');

    if(navContent) {
        if(navContent.style.display === 'none') {
            navContent.style.display = 'flex';
        } else {
            navContent.style.display = 'none';
        }
    }
}