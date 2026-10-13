$(function () {

    // 날짜 선택
    $('.date-options .chip').click(function () {
        $('.date-options .chip').removeClass('selected');
        $(this).addClass('selected');

        updateSummary();
    });

    // 인원 선택
    $('.people-options .chip').click(function () {
        $('.people-options .chip').removeClass('selected');
        $(this).addClass('selected');

        updateSummary();
    });


    // 예약 정보 업데이트
    function updateSummary() {
        let selectedDate = $('.date-options .selected').data('date-label');
        let selectedPeople = $('.people-options .selected').data('people');

        let text = selectedDate + ' · ' + selectedPeople;

        $('#bookingSummary').text(text);
        $('#modalSummary').text(text);
    }


    // FAQ
    $('.faq-question').click(function () {

        let currentItem = $(this).closest('.faq-item');

        if (currentItem.hasClass('open')) {

            currentItem.removeClass('open');
            currentItem.find('.faq-icon').text('+');

        } else {

            $('.faq-item').removeClass('open');
            $('.faq-icon').text('+');

            currentItem.addClass('open');
            currentItem.find('.faq-icon').text('−');
        }

    });


    // 예약 모달 열기
    $('#openReservationModal').click(function () {

        updateSummary();

        $('#reservationModal').addClass('show');
        $('body').addClass('modal-open');

    });


    // 예약 모달 닫기
    $('[data-modal-close]').click(function () {

        $('#reservationModal').removeClass('show');
        $('body').removeClass('modal-open');

    });


    // ESC 누르면 모달 닫기
    $(document).keydown(function (e) {

        if (e.key === 'Escape') {
            $('#reservationModal').removeClass('show');
            $('body').removeClass('modal-open');
        }

    });


    // 예약하기
    $('#reservationForm').submit(function (e) {

        e.preventDefault();

        alert('예약이 접수되었습니다.');

        $('#reservationModal').removeClass('show');
        $('body').removeClass('modal-open');

    });

});