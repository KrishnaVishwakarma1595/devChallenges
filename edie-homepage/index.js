try {
    const topNavLists = document.querySelectorAll('.edit__desktop_navbar_listitem');
    const footerNavLists = document.querySelectorAll('.footer__nav_listitem');
    const mobileNavLists = document.querySelectorAll('.edit__mobile_navbar_listitem');

    const navButton = document.querySelector('.nav_menu_icon');
    const navCloseButton = document.querySelector('.nav__close');
    const mobileMenu = document.querySelector('.edit__mobile_navbar');

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

    function smoothScrollToSection(e) {
        const targetId = this.dataset.href;
        const targetElement = document.getElementById(`${targetId}`);
      
        if (targetElement) { 
            targetElement.scrollIntoView({ behavior: "smooth", });
        }

        mobileMenu.classList.remove('animate__slideInRight');
        mobileMenu.classList.add('animate__slideOutRight');
        mobileMenu.style.display = 'none';
    }

    topNavLists.forEach((link) => {
        link.addEventListener("click", smoothScrollToSection);
    });

    mobileNavLists.forEach((link) => {
        link.addEventListener("click", smoothScrollToSection);
    });

    footerNavLists.forEach((link) => {
        link.addEventListener("click", smoothScrollToSection);
    });

} catch (error) {
    console.log('error detected...', error);
}