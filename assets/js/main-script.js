document.addEventListener('DOMContentLoaded', () => {
    new Swiper('.reasons__carousel', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        spaceBetween: 10,
        slidesPerView: 'auto',
    });

    new Swiper('.goods__carousel', {
        spaceBetween: 12,
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
        },
    });
});
