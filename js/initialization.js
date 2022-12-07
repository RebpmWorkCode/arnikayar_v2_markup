document.addEventListener('DOMContentLoaded', () => {
    /**----------------- PHONE MASKS -----------------**/
    $('.phone-mask').mask('8 (000) 000-00-00');
    $('.cadastre').mask('00:00:0000000:0000');
    $('.pool').mask("000 м", {reverse: true});
    $('.price-mask').mask("000 000 000 000 000", {reverse: true});
    $('.mask1').mask("AAA м", {
        reverse: true,
        translation: {A: {pattern: /[0-9,.]/},}
    });
    $('.mask2').mask("AAAAAA м²", {
        reverse: true,
        translation: {A: {pattern: /[0-9,.]/},}
    });
    $('.mask3').mask("AAAA сот", {
        reverse: true,
        translation: {A: {pattern: /[0-9,.]/},}
    });
    $('.mask4').mask("AAAA кВт", {
        reverse: true,
        translation: {A: {pattern: /[0-9,.]/},}
    });

    /**--------- FAVOTITE -----------**/
    function favorite(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    }

    $('body')
        .on("click", ".cards .card .group .interface .favorite", favorite)
        .on("click", ".detail .heading .interface .favorite", favorite);

    /**--------- SHARE -----------**/
    function share(e) {
        e.preventDefault();
        let target = $(e.currentTarget);
        let url = window.location.href;
        if (target.attr('data-attr-url')) {
            url = 'https://' + window.location.hostname + target.attr('data-attr-url');
        }
        let title = target.attr('data-attr-title');
        $('.share-modal').addClass('open');
        $('.share-modal .content .links').html(
            '<a class="share-link" target="_blank" title="Отправить в WhatsApp" href="https://api.whatsapp.com/send?text=' + title + ' ' + url + '"><img src="/uploads/assets/images/icon/social/wa.svg" alt="whatsapp"></a>' +
            '<a class="share-link" target="_blank" title="Отправить в Telegram" href="https://telegram.me/share/url?url=' + url + '"><img src="/uploads/assets/images/icon/social/Telegram.svg" alt="telegram"></a>' +
            '<a class="share-link" target="_blank" title="Отправить на почту" href="mailto:Введите адрес электронной почты?subject=Агентство недвижимости ПО ДОМАМ&amp;body=' + ' ' + url + '"><img src="/uploads/assets/images/icon/social/mail.svg" alt="mail"></a>' +
            '<a class="share-link" target="_blank" title="Отправить в Viber" href="viber://forward?text=' + title + ' ' + url + '"><img src="/uploads/assets/images/icon/social/Viber.svg" alt="viber"></a>' +
            '<a class="share-link" target="_blank" title="Отправить в VK" href="https://vk.com/share.php?url=' + url + '&title=' + title + '"><img src="/uploads/assets/images/icon/social/Vkontakte.svg" alt="vk"></a>' +
            '<a class="share-link copyLinkBtn" data-attr-url="' + url + '" title="Копировать в буфер обмена" href="#"><img src="/uploads/assets/images/icon/social/copy.svg" alt="copy"></a>'
        );
    }

    $("body").on("click", ".cards .card .group .interface .share", share)
        .on("click", ".detail .heading .interface .share", share)
        .on("click", ".ads .tabs__content .object .inf .interface .share", share);
    $(".folders .block .interface .share").on("click", share);

    function shareModal() {
        $('.share-modal').removeClass('open');
    }

    $("body").on("click", ".share-modal .bg", shareModal)
        .on("click", ".share-modal .close", shareModal)

    /**--------- COPY LINK -----------**/
    $('body').on('click', '.copyLinkBtn', function (e) {
        e.preventDefault();
        var url = $(this).data('attr-url');
        navigator.clipboard.writeText(url);
        $(this).addClass('copyed');
        setTimeout(function() {
            $('.share-modal').removeClass('open');
        }, 1000);
    });

    /**----------------- SORTING -----------------**/
    if ($('div').is('.sort')) {
        $('select').styler();
    }

    /**----------------- TABS -----------------**/
    if ($('div').is('.tabs')) {
        (function ($) {
            $(function () {
                $('ul.tabs__caption').on('click', 'li:not(.active)', function () {
                    $(this)
                        .addClass('active').siblings().removeClass('active')
                        .closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
                });

            });
        })(jQuery);
    }

    /**----------------- DETAIL OBJECT MAP -----------------**/
    if ($('div').is('#detail-map')) {
        var myMap;
        ymaps.ready(init);

        function init() {
            myMap = new ymaps.Map('detail-map', {
                center: [43.578131, 39.730819],
                zoom: 14,
                controls: []
            }, {
                searchControlProvider: 'yandex#search'
            });
            myMap.controls.remove('geolocationControl');
            myMap.controls.remove('searchControl');
            myMap.controls.remove('trafficControl');
            myMap.controls.remove('typeSelector');
            myMap.controls.remove('fullscreenControl');
            myMap.controls.remove('rulerControl');
            myMap.behaviors.disable('scrollZoom');
            var circle = new ymaps.Circle([[43.578131, 39.730819], 750], {}, {
                geodesic: true,
                fillColor: "#52758E",
                fillOpacity: 0.3,
                strokeWidth: 0
            });
            myMap.geoObjects.add(circle);
        }
    }
});
