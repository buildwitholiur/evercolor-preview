(function ($) {
    "use strict";

    $(document).ready(function () {

        // Change main image script
        window.changeImage = function (element) {
            // Change the main image
            $('#mainImage').attr('src', element.src);

            // Remove 'active' class from all thumbnails
            $('.gallery-small-images .thumb-img').removeClass('active');

            // Add 'active' class to the clicked thumbnail
            $(element).addClass('active');
        }


        // Product customization active class toggle
        $('.product-customization-item').on('click', function () {
            $('.product-customization-item').removeClass('active');
            $(this).addClass('active');
        });

        // Show selected file name
        window.showFileName = function (input) {
            let fileName = input.files.length > 0 ? input.files[0].name : "No file chosen";
            $(".file-name").text(fileName);
        }

        // Progress circle animation
        const radius = 35;
        const circumference = 2 * Math.PI * radius;

        $('.progress-container').each(function () {
            const container = $(this);
            const targetPercent = parseInt(container.attr('data-percent'));
            const circle = container.find('.progress')[0];
            const text = container.find('.progress-text')[0];
            let current = 0;

            const interval = setInterval(() => {
                if (current <= targetPercent) {
                    const offset = circumference - (current / 100) * circumference;
                    circle.style.strokeDashoffset = offset;
                    text.textContent = `${current}%`;
                    current++;
                } else {
                    clearInterval(interval);
                }
            }, 20);
        });




        // Video card play/pause
        $('.video-card').on('click', function () {
            const card = $(this);
            const video = card.find('video')[0];
            const thumbnail = card.find('.thumbnail')[0];
            const playBtn = card.find('.play-btn')[0];

            // Pause other videos and reset their UI
            $('.video-card').not(card).each(function () {
                const otherVideo = $(this).find('video')[0];
                const otherThumbnail = $(this).find('.thumbnail')[0];
                const otherPlayBtn = $(this).find('.play-btn')[0];
                otherVideo.pause();
                otherVideo.style.display = 'none'; // Hide video
                otherPlayBtn.style.display = 'block'; // Show play button
                otherThumbnail.style.display = 'block'; // Show thumbnail for others
            });

            if (video.paused) {
                // First click - play video
                thumbnail.style.display = 'none'; // Hide thumbnail (permanently)
                playBtn.style.display = 'none'; // Hide play button
                video.style.display = 'block'; // Show video
                video.play();
            } else {
                // Second click - pause video
                video.pause();
                video.style.display = 'block'; // Keep video visible (paused)
                playBtn.style.display = 'block'; // Show play button
                // Do NOT show thumbnail again
            }
        });



        // Offcanvas menu toggle
        $('.open__menu').on('click', function () {
            $('.mobile__menu, .overlay').addClass('active');
        });
        $('.close__menu, .overlay').on('click', function () {
            $('.mobile__menu, .overlay').removeClass('active');
        });


        // video slider
        const swiper = new Swiper(".video-wrapper", {
            slidesPerView: 3,
            spaceBetween: 15,
            loop: true,
            slidesPerGroup: 1,
            centeredSlides: false,
            speed: 1000,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    slidesOffsetBefore: 70,
                },
                576: {
                    slidesPerView: 2,
                    slidesOffsetBefore: 50,
                },
                768: {
                    slidesPerView: 3,
                    slidesOffsetBefore: 0,
                },
            },
        });


        // gallery slider
        const gallerySwiper = new Swiper(".gellary-wrapper", {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            slidesPerGroup: 1,
            centeredSlides: false,
            speed: 1000,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: false, // arrow off
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                },
                992: {
                    slidesPerView: 4,
                },
            },
        });

        // customers slider
        const customersSwiper = new Swiper(".customers-card-wrapper", {
            slidesPerView: 4,
            spaceBetween: 20,
            loop: true,
            slidesPerGroup: 1,
            speed: 1000,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: ".customer-button-next",
                prevEl: ".customer-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                576: {
                    slidesPerView: 2
                },
                768: {
                    slidesPerView: 3
                },
                992: {
                    slidesPerView: 4
                },
            },
        });




        // Announcement marquee swiper
        const marqueeSwiper = new Swiper(".announcementSwiper", {
            slidesPerView: "auto", // each item tar width onujayi
            spaceBetween: 70, // 70px gap
            loop: true,
            allowTouchMove: false, // swipe off
            freeMode: true, // continuous scroll effect
            freeModeMomentum: false, // ekdom smooth without snap
            speed: 6000, // jotota barale toto smoothly cholbe
            autoplay: {
                delay: 0, // no delay
                disableOnInteraction: false,
            },
        });

        
        // Product announcement marquee swiper
        const productAnnouncementSwiper = new Swiper(".product-announcement", {
            slidesPerView: "auto",
            spaceBetween: 70,
            loop: true,
            allowTouchMove: false, // swipe off
            freeMode: true, // continuous scroll
            freeModeMomentum: false,
            speed: 6000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
        });



        // Owl dots numbering
        $('.hero-slier-main.owl-carousel .owl-dot').each(function (index) {
            $(this).text(index + 1);
        });

        // AOS init
        AOS.init({
            disable: false,
            startEvent: 'DOMContentLoaded',
            initClassName: 'aos-init',
            animatedClassName: 'aos-animate',
            useClassNames: false,
            disableMutationObserver: false,
            debounceDelay: 50,
            throttleDelay: 99,
            offset: 120,
            delay: 0,
            duration: 400,
            easing: 'ease',
            once: true,
            mirror: false,
            anchorPlacement: 'top-bottom',
        });

        // Magnific Popup
        $('.play__button').magnificPopup({
            type: 'iframe'
        });

        // CounterUp
        $('.counting').counterUp({
            delay: 10,
            time: 3000
        });

        // Venobox
        $('.venobox').venobox();

        // Nice Select
        $('select').niceSelect();

        // Box active class toggle
        $(".boxs").on('click', function () {
            $(this).toggleClass('active').siblings().removeClass('active');
        });

    }); // end of document ready

})(jQuery);