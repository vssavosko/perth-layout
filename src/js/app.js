$(document).ready(() => {
    const $buttonMenu = $('.button-menu');
    const $menuDropDown = $('.header__menu-drop-down');
    const $menuList = $('.header__menu-list');

    $buttonMenu.click(() => {
        $buttonMenu.toggleClass('button-menu_active');
        $menuDropDown.slideToggle(300);
        $menuDropDown.css('display', 'flex');
        $menuList.css('display', 'grid');
    });

    $('a[href^="#"]').click(function anchorScroll() {
        const href = $(this).attr('href');

        $('html, body').animate({
            scrollTop: `${$(href).offset().top}px`,
        });
    });
});
