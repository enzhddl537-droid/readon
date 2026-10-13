/* =========================
   GOTOP 버튼
========================= */

$('.gotopbtn').on('click', function () {

    $('html, body').stop(true).animate({
        scrollTop: 0
    }, 600);

});


/* PC / 1200px 구간: 300px 이상 스크롤 시 고탑 버튼 표시 */
function updateGoTopVisibility() {

    // 768px 이하는 responsive.css에서 항상 표시
    if ($(window).width() <= 768) {
        $('.gotopbtn').removeClass('on');
        return;
    }

    $('.gotopbtn').toggleClass('on', $(window).scrollTop() > 300);
}

$(window).on('scroll resize', updateGoTopVisibility);
updateGoTopVisibility();


/* =========================
   고탑 버튼 색상 변경 - PC에서만
========================= */

$(window).on('scroll', function () {

    // 768px 이하에서는 실행하지 않음
    if ($(window).width() <= 768) {
        $('.gotopbtn').removeClass('white');
        return;
    }

    let scrollTop = $(this).scrollTop();
    let windowHeight = $(window).height();

    let popupTop = $('#popup').offset().top;
    let popupBottom = popupTop + $('#popup').outerHeight();

    let booktalkTop = $('#booktalk').offset().top;
    let booktalkBottom = booktalkTop + $('#booktalk').outerHeight();

    let buttonPosition = scrollTop + windowHeight - 100;

    if (
        (buttonPosition >= popupTop && buttonPosition <= popupBottom) ||
        (buttonPosition >= booktalkTop && buttonPosition <= booktalkBottom)
    ) {

        $('.gotopbtn').addClass('white');

    } else {

        $('.gotopbtn').removeClass('white');

    }

});


/* =========================
   헤더 스크롤
========================= */

let prevScroll = $(window).scrollTop();

$(window).on('scroll', function () {

    let currentScroll = $(this).scrollTop();

    // PC에서만 헤더 숨김 효과 실행
    if ($(window).width() > 768) {

        if (currentScroll > 40) {

            $('header').addClass('on');

        } else {

            $('header').removeClass('on');

        }


        if (currentScroll > prevScroll && currentScroll > 100) {

            $('.headerinner').addClass('hide');

        } else if (currentScroll < prevScroll) {

            $('.headerinner').removeClass('hide');

        }

    } else {

        // 모바일에서는 헤더 숨기지 않음
        $('.headerinner').removeClass('hide');
        $('.resheader').removeClass('hide');

    }

    prevScroll = currentScroll;

});


/* =========================
   햄버거 메뉴
========================= */

$('.hamburger').on('click', function () {

    $('.mobilemenu').stop().slideToggle(300);

});


/* =========================
   언어 선택 표시
========================= */

$('.language p').on('click', function () {

    $('.language p').removeClass('active');

    $(this).addClass('active');

});


/* =========================
   북마크라이트 이미지 변경
========================= */

$('.gift_dots button').on('click', function () {

    let imageSrc = $(this).data('image');

    $('#booklightImage').attr('src', imageSrc);

    $('.gift_dots button').removeClass('active');

    $(this).addClass('active');

});


/* =========================
   공유 버튼
========================= */

function showToast() {

    $('.sharetoast').addClass('on');

    setTimeout(function () {

        $('.sharetoast').removeClass('on');

    }, 1800);

}


$('.sharebtn, .dmsharebtn').on('click', function () {

    const currentUrl = window.location.href;

    if (navigator.clipboard) {

        navigator.clipboard.writeText(currentUrl).then(function () {

            showToast();

        });

    } else {

        showToast();

    }

});


/* =========================
   ESC 키로 팝업 닫기
========================= */

$(document).on('keydown', function (event) {

    if (event.key === 'Escape') {

        if (typeof closePopup === 'function') {
            closePopup();
        }

    }

});


/* =========================
   스토리 슬라이드
========================= */

const storyProgress = document.querySelectorAll('.story-progress span');

const storySwiper = new Swiper('.story-swiper', {

    loop: true,

    speed: 500,

    autoplay: {

        delay: 3000,

        disableOnInteraction: false

    },

    on: {

        init: function () {

            updateStoryProgress(this.realIndex);

        },

        slideChange: function () {

            updateStoryProgress(this.realIndex);

        }

    }

});


/* =========================
   스토리 진행바
========================= */

function updateStoryProgress(index) {

    storyProgress.forEach(function (bar, barIndex) {

        bar.classList.remove('active', 'done');

        if (barIndex < index) {

            bar.classList.add('done');

        }

        if (barIndex === index) {

            void bar.offsetWidth;

            bar.classList.add('active');

        }

    });

}


/* =========================
   PC + 모바일 공통 카운트다운
========================= */

// 카운트다운 종료 날짜
const targetDate = new Date('2026-10-03T10:00:00').getTime();


function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;


    /* =========================
       카운트다운 종료
    ========================= */

    if (distance <= 0) {

        // PC
        $('#countdownText').text('00:00:00:00');

        // 모바일
        $('.m-days').text('00');
        $('.m-hours').text('00');
        $('.m-minutes').text('00');
        $('.m-seconds').text('00');

        return;

    }


    /* =========================
       남은 시간 계산
    ========================= */

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );


    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );


    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );


    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );


    /* =========================
       숫자 2자리로 변환
    ========================= */

    const dayText = String(days).padStart(2, '0');

    const hourText = String(hours).padStart(2, '0');

    const minuteText = String(minutes).padStart(2, '0');

    const secondText = String(seconds).padStart(2, '0');


    /* =========================
       PC 카운트다운 출력
    ========================= */

    const pcCountdownText =
        dayText + ':' +
        hourText + ':' +
        minuteText + ':' +
        secondText;


    $('#countdownText').text(pcCountdownText);


    /* =========================
       모바일 카운트다운 출력
    ========================= */

    $('.m-days').text(dayText);

    $('.m-hours').text(hourText);

    $('.m-minutes').text(minuteText);

    $('.m-seconds').text(secondText);

}


/* 페이지 접속 즉시 실행 */

updateCountdown();


/* 1초마다 갱신 */

setInterval(updateCountdown, 1000);


/* =========================
   모바일 하단 예약 버튼
========================= */

function updateReservationBar() {

    const windowWidth = $(window).width();

    const scrollTop = $(window).scrollTop();


    // 768px 이하에서만 작동
    if (windowWidth <= 768) {

        // 150px 이상 스크롤하면 등장
        if (scrollTop > 150) {

            $('.res_btn_bar').addClass('show');

        } else {

            $('.res_btn_bar').removeClass('show');

        }

    } else {

        // PC에서는 항상 숨김
        $('.res_btn_bar').removeClass('show');

    }

}


/* =========================
   스크롤할 때 예약바 체크
========================= */

$(window).on('scroll', function () {

    updateReservationBar();

});


/* =========================
   화면 크기 변경 시 체크
========================= */

$(window).on('resize orientationchange', function () {

    updateReservationBar();

});


/* =========================
   페이지 처음 열었을 때 체크
========================= */

updateReservationBar();