// PC 팝업 공간의 지도와 상세 카드 선택 상태
$(function () {
    var $section = $('#popup');
    var $scene = $section.find('.popup0928-scene');
    var $zones = $scene.find('.popup0928-zone');
    var $slides = $scene.find('.popup0928-slide');
    function updatePopupScale() {
        // 768px 이하에서는 기존 태블릿/모바일 팝업 구조 사용
        if (window.matchMedia('(max-width: 768px)').matches) {
            $scene.css('transform', '');
            $section.css('height', '');
            return;
        }

        // 769px 이상에서는 1920px PC 구성을 섹션 실제 너비에 맞춰 통째로 축소
        var sectionWidth = $section.innerWidth();
        var scale = Math.min(1, sectionWidth / 1920);

        $scene.css({
            'transform': 'scale(' + scale + ')',
            'transform-origin': 'top left'
        });
        $section.css('height', (950 * scale) + 'px');
    }
    $scene.on('click', '[data-zone]', function () {
        var zone = $(this).data('zone');
        if (!$slides.filter('[data-panel="' + zone + '"]').length) return;
        $section.addClass('has-selection');
        $zones.removeClass('is-selected').attr('aria-pressed', 'false');
        $zones.filter('[data-zone="' + zone + '"]').addClass('is-selected').attr('aria-pressed', 'true');
        $slides.removeClass('is-active').attr('aria-hidden', 'true');
        $slides.filter('[data-panel="' + zone + '"]').addClass('is-active').attr('aria-hidden', 'false');
    });
    $(window).on('resize.popup0928', updatePopupScale);
    updatePopupScale();
});
