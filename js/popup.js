$(function () {

    const $overlay = $('.modal_overlay');
    const $track = $('.slide_track');

    // 복제하기 전 실제 인물만 가져오기
    const $persons = $track.children('.person');
    const total = $persons.length;

    let currentIndex = 0;
    let moving = false;


    /* =========================================
       첫 번째 슬라이드 복제

       마지막 → 첫 번째
       자연스럽게 무한 슬라이드
    ========================================= */

    const $firstClone = $persons.first().clone();

    $track.append($firstClone);



    /* =========================================
       팝업 열기
    ========================================= */

    function openBooktalkPopup(index) {

        // 북토크 상세 팝업은 1200px 이상에서만 사용
        if (window.innerWidth < 1200) {
            return;
        }

        // 잘못된 index 방지
        if (index < 0 || index >= total) {
            index = 0;
        }

        currentIndex = index;
        moving = false;


        // 클릭한 인물 위치로 즉시 이동
        $track.css({
            transition: 'none',
            transform: `translateX(-${currentIndex * 100}%)`
        });


        // 브라우저에 위치 즉시 적용
        $track[0].offsetHeight;


        /* -----------------------------------------
           팝업 열렸을 때
           배경 스크롤 막기
        ----------------------------------------- */

        $('html, body').css('overflow', 'hidden');


        /* -----------------------------------------
           팝업 열기
        ----------------------------------------- */

        $overlay
            .stop(true, true)
            .css('display', 'flex')
            .hide()
            .fadeIn(200);

    }



    /* =========================================
       팝업 닫기
    ========================================= */

    function closeBooktalkPopup() {

        $overlay
            .stop(true, true)
            .fadeOut(200);


        /* -----------------------------------------
           배경 스크롤 다시 허용
        ----------------------------------------- */

        $('html, body').css('overflow', '');

    }



    /* =========================================
       다음 버튼

       1 → 2 → 3 → 4 → 5 → 6 → 1
    ========================================= */

    $('.next').on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();


        // 슬라이드 이동 중 중복 클릭 방지
        if (moving) return;


        moving = true;

        currentIndex++;


        $track.css({
            transition: 'transform 0.5s ease',
            transform: `translateX(-${currentIndex * 100}%)`
        });

    });



    /* =========================================
       이전 버튼

       1 → 6
    ========================================= */

    $('.prev').on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();


        // 슬라이드 이동 중 중복 클릭 방지
        if (moving) return;


        moving = true;


        /* -----------------------------------------
           현재 첫 번째 인물일 경우

           1 → 6
        ----------------------------------------- */

        if (currentIndex === 0) {


            // 복제된 첫 번째 슬라이드 위치로 순간 이동
            currentIndex = total;


            $track.css({
                transition: 'none',
                transform: `translateX(-${currentIndex * 100}%)`
            });


            // 순간 이동 위치 브라우저에 적용
            $track[0].offsetHeight;


            // 실제 마지막 인물로 이동
            currentIndex = total - 1;


            $track.css({
                transition: 'transform 0.5s ease',
                transform: `translateX(-${currentIndex * 100}%)`
            });


        } else {


            currentIndex--;


            $track.css({
                transition: 'transform 0.5s ease',
                transform: `translateX(-${currentIndex * 100}%)`
            });

        }

    });



    /* =========================================
       슬라이드 애니메이션 종료
    ========================================= */

    $track.on('transitionend', function (e) {


        // transform 애니메이션이 아니면 무시
        if (e.originalEvent.propertyName !== 'transform') {
            return;
        }


        /* -----------------------------------------
           마지막 복제 슬라이드까지 이동했다면

           복제된 1번
                ↓
           실제 1번으로 순간 이동
        ----------------------------------------- */

        if (currentIndex === total) {


            currentIndex = 0;


            $track.css({
                transition: 'none',
                transform: 'translateX(0%)'
            });

        }


        moving = false;

    });



    /* =========================================
       PC / 태블릿

       자세히 보기 버튼 클릭
       → 해당 인물 팝업 열기
    ========================================= */

    $('.speaker-detail-btn').on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();


        /*
            버튼 순서

            0 = 김영하
            1 = 한로로
            2 = 김민경
            3 = 신시연
            4 = 궤도
            5 = 이슬아
        */


        const index = $('.speaker-detail-btn').index(this);


        openBooktalkPopup(index);

    });



    /* =========================================
       모바일

       768px 이하에서
       인물 카드 클릭
       → 해당 인물 팝업 열기
    ========================================= */

    $('.speakerwrap figure').on('click', function () {

        // 1200px 미만에서는 북토크 상세 팝업을 사용하지 않음
        if (window.innerWidth < 1200) {
            return;
        }

        const index = $('.speakerwrap figure').index(this);

        openBooktalkPopup(index);

    });



    /* =========================================
       닫기 버튼
    ========================================= */

    $('.modal_close').on('click', function (e) {

        e.preventDefault();
        e.stopPropagation();


        closeBooktalkPopup();

    });



    /* =========================================
       회색 배경 클릭
       → 팝업 닫기
    ========================================= */

    $overlay.on('click', function (e) {


        /*
            modal 내부를 클릭한 경우에는
            닫히지 않음

            overlay 자체를 클릭했을 때만 닫힘
        */

        if (e.target === this) {

            closeBooktalkPopup();

        }

    });



    /* =========================================
       ESC 키
       → 팝업 닫기
    ========================================= */

    $(document).on('keydown', function (e) {


        if (
            e.key === 'Escape' &&
            $overlay.is(':visible')
        ) {

            closeBooktalkPopup();

        }

    });



    /* =========================================
       1200px 미만으로 리사이즈될 경우
       열려 있던 팝업 자동 닫기
    ========================================= */

    $(window).on('resize.booktalkPopup', function () {

        if (window.innerWidth < 1200 && $overlay.is(':visible')) {
            closeBooktalkPopup();
        }

    });


});