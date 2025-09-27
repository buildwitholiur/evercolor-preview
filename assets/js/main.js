(function ($) {
    "use strict";

    $(document).ready(function () {



        $('select').niceSelect();

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
            }, 10);
        });

        // Add cart message

        const cartMessage = document.querySelector(".add-cart-message");

        window.addEventListener("scroll", () => {
            const scrolled = window.scrollY;
            const windowHeight = window.innerHeight;
            const fullHeight = document.documentElement.scrollHeight;

            if (scrolled > windowHeight) {
                cartMessage.classList.add("show");
            } else {
                cartMessage.classList.remove("show");
            }

            if (window.innerHeight + scrolled >= fullHeight) {
                cartMessage.classList.remove("show");
            }
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



        // Set countdown target date/time
        const targetDate = new Date();
        targetDate.setHours(targetDate.getHours() + 1);

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                document.getElementById("hours").innerText = "00";
                document.getElementById("minutes").innerText = "00";
                document.getElementById("seconds").innerText = "00";
                clearInterval(timer);
                return;
            }

            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            document.getElementById("hours").innerText = String(hours).padStart(
                2,
                "0"
            );
            document.getElementById("minutes").innerText = String(minutes).padStart(
                2,
                "0"
            );
            document.getElementById("seconds").innerText = String(seconds).padStart(
                2,
                "0"
            );
        }

        // update every second
        updateCountdown();
        const timer = setInterval(updateCountdown, 1000);


        // Offcanvas menu toggle
        $('.open__menu').on('click', function () {
            $('.mobile__menu, .overlay').addClass('active');
        });
        $('.close__menu, .overlay').on('click', function () {
            $('.mobile__menu, .overlay').removeClass('active');
        });


        // Product customization item
        const items = document.querySelectorAll(".product-customization-item");
        const text = document.getElementById("customization-text");

        items.forEach(item => {
            const input = item.querySelector("input");

            input.addEventListener("change", () => {
                items.forEach(i => i.classList.remove("active"));
                item.classList.add("active");
                text.innerHTML = `Format <span>|</span> ${input.value}`;
            });
        });

        // Story length option
        const storyOptions = document.querySelectorAll(".story-length-option");
        const storyText = document.getElementById("story-length-text");

        storyOptions.forEach(option => {
            const input = option.querySelector("input");

            input.addEventListener("change", () => {
                storyOptions.forEach(o => o.classList.remove("active"));
                option.classList.add("active");
                storyText.innerHTML = `Story Length <span>|</span> ${input.value}`;
            });
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
                },
                576: {
                    slidesPerView: 2,
                },
                768: {
                    slidesPerView: 3,
                    slidesOffsetBefore: 0,
                },
                1199: {
                    slidesPerView: 2,
                    slidesOffsetBefore: 0,
                },
                1449: {
                    slidesPerView: 3,
                    slidesOffsetBefore: 0,
                },
            },
        });

        const gallerysSwiper = new Swiper(".gallery-small-images", {
            slidesPerView: 4,
            spaceBetween: 8,
            // disable dots and navigation
            pagination: false,
            navigation: false,
            breakpoints: {
                1200: {
                    enabled: false, // disable swiper above 1200px
                }
            }
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

        // Thumbnail slider (with navigation)
        var galleryThumbs = new Swiper(".gallery-thumbs", {
            spaceBetween: 10,
            slidesPerView: 6,
            freeMode: true, loop: true,
            watchSlidesProgress: true,
            navigation: {
                nextEl: ".gallery-button-next",
                prevEl: ".gallery-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 4,
                },
                576: {
                    slidesPerView: 5,
                },
                768: {
                    slidesPerView: 6,
                },
            },
        });

        // Main slider (no navigation here)
        var galleryTop = new Swiper(".gallery-top", {
            spaceBetween: 10,
            thumbs: {
                swiper: galleryThumbs,
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
                    slidesPerView: 2
                },
                1199: {
                    slidesPerView: 3
                },
                1449: {
                    slidesPerView: 4
                },
            },
        });



        new VenoBox({
            selector: '.venobox'
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

        // Nice Select
        $('select').niceSelect();

        // Box active class toggle
        $(".boxs").on('click', function () {
            $(this).toggleClass('active').siblings().removeClass('active');
        });


    }); // end of document ready

})(jQuery);