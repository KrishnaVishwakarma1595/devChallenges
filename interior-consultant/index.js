try {
    const navButton = document.querySelector('.nav_menu_icon');
    const navCloseButton = document.querySelector('.nav__close');
    const mobileMenu = document.querySelector('.interior-navbar__mobile');

    navButton.addEventListener('click', () => {
        mobileMenu.style.display = 'flex';
        mobileMenu.classList.add('animate__slideInRight');
        mobileMenu.classList.remove('animate__slideOutRight');
    })

    navCloseButton.addEventListener('click', () => {
        mobileMenu.classList.remove('animate__slideInRight');
        mobileMenu.classList.add('animate__slideOutRight');
        mobileMenu.style.display = 'none';
    })
} catch (error) {
    console.log('Error occured', error);
}