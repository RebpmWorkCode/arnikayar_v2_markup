document.addEventListener('DOMContentLoaded', () => {
    /**----------------- PHONE MASKS -----------------**/
    $('.phone-mask').mask('8 (000) 000-00-00');
    $('.new-obj form input[type="tel"]').mask('+7 000 000 00 00');
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
        .on("click", ".ads .tabs__content .object .inf .interface .share", share)

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
    });

    /**----------------- SORTING -----------------**/
    if ($('div').is('.sort')) {
        $('select').styler();
    }

    /**----------------- SORTING -----------------**/
    if ($('div').is('.new-obj')) {
        $('select').styler({
            selectPlaceholder: 'Выберите вариант'
        });
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

        (function (s) {
            var n;
            s(".tabs_block ul").on("click", "li:not(.active)", function () {
                n = s(this).parents(".tabs_block"), s(this).dmtabs(n)
            }), s.fn.dmtabs = function (n) {
                s(this).addClass("active").siblings().removeClass("active"), n.find(".tab_box").eq(s(this).index()).show(1, function () {
                    s(this).addClass("open_tab")
                }).siblings(".tab_box").hide(1, function () {
                    s(this).removeClass("open_tab")
                })
            }
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

    /**----------------- NEW OBJECT MAP -----------------**/
    if ($('div').is('#address')) {
        // Houses
        ymaps.ready(function () {
            var suggestView = new ymaps.SuggestView('suggest')
            var myMap = new ymaps.Map('address', {
                    center: [43.578131, 39.730819],
                    zoom: 14,
                    controls: []
                }),
                mySearchControl = new ymaps.control.SearchControl({
                    options: {
                        noPlacemark: true,
                        position: {
                            top: -50
                        }
                    }
                }),
                mySearchResults = new ymaps.GeoObjectCollection(null, {
                    hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]'),
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'images/icon/marker.svg',
                    iconImageSize: [46, 46],
                    iconImageOffset: [-23, -46],
                });
            myMap.controls.add(mySearchControl);
            myMap.geoObjects.add(mySearchResults);

            mySearchControl.events.add('resultselect', function (e) {
                var index = e.get('index');
                mySearchControl.getResult(index).then(function (res) {
                    mySearchResults.add(res);
                });
            }).add('submit', function () {
                mySearchResults.removeAll();
            });

            suggestView.events.add('select', function () {
                Search()
            });

            function Search() {
                var request = $('#suggest').val();
                mySearchControl.search(request);
            }
        });

        // Townhouses
        ymaps.ready(function () {
            var suggestView1 = new ymaps.SuggestView('suggest1')
            var myMap1 = new ymaps.Map('address1', {
                    center: [43.578131, 39.730819],
                    zoom: 14,
                    controls: []
                }),
                mySearchControl1 = new ymaps.control.SearchControl({
                    options: {
                        noPlacemark: true,
                        position: {
                            top: -50
                        }
                    }
                }),
                mySearchResults1 = new ymaps.GeoObjectCollection(null, {
                    hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]'),
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'images/icon/marker.svg',
                    iconImageSize: [46, 46],
                    iconImageOffset: [-23, -46],
                });
            myMap1.controls.add(mySearchControl1);
            myMap1.geoObjects.add(mySearchResults1);

            mySearchControl1.events.add('resultselect', function (e) {
                var index1 = e.get('index');
                mySearchControl1.getResult(index1).then(function (res) {
                    mySearchResults1.add(res);
                });
            }).add('submit', function () {
                mySearchResults1.removeAll();
            });

            suggestView1.events.add('select', function () {
                Search()
            });

            function Search() {
                var request1 = $('#suggest1').val();
                mySearchControl1.search(request1);
            }
        });

        // Land plots
        ymaps.ready(function () {
            var suggestView2 = new ymaps.SuggestView('suggest2')
            var myMap2 = new ymaps.Map('address2', {
                    center: [43.578131, 39.730819],
                    zoom: 14,
                    controls: []
                }),
                mySearchControl2 = new ymaps.control.SearchControl({
                    options: {
                        noPlacemark: true,
                        position: {
                            top: -50
                        }
                    }
                }),
                mySearchResults2 = new ymaps.GeoObjectCollection(null, {
                    hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]'),
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'images/icon/marker.svg',
                    iconImageSize: [46, 46],
                    iconImageOffset: [-23, -46],
                });
            myMap2.controls.add(mySearchControl2);
            myMap2.geoObjects.add(mySearchResults2);

            mySearchControl2.events.add('resultselect', function (e) {
                var index2 = e.get('index');
                mySearchControl2.getResult(index2).then(function (res) {
                    mySearchResults2.add(res);
                });
            }).add('submit', function () {
                mySearchResults2.removeAll();
            });

            suggestView2.events.add('select', function () {
                Search()
            });

            function Search() {
                var request2 = $('#suggest2').val();
                mySearchControl2.search(request2);
            }
        });

        // Apartments
        ymaps.ready(function () {
            var suggestView3 = new ymaps.SuggestView('suggest3')
            var myMap3 = new ymaps.Map('address3', {
                    center: [43.578131, 39.730819],
                    zoom: 14,
                    controls: []
                }),
                mySearchControl3 = new ymaps.control.SearchControl({
                    options: {
                        noPlacemark: true,
                        position: {
                            top: -50
                        }
                    }
                }),
                mySearchResults3 = new ymaps.GeoObjectCollection(null, {
                    hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]'),
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'images/icon/marker.svg',
                    iconImageSize: [46, 46],
                    iconImageOffset: [-23, -46],
                });
            myMap3.controls.add(mySearchControl3);
            myMap3.geoObjects.add(mySearchResults3);

            mySearchControl3.events.add('resultselect', function (e) {
                var index3 = e.get('index');
                mySearchControl3.getResult(index3).then(function (res) {
                    mySearchResults3.add(res);
                });
            }).add('submit', function () {
                mySearchResults3.removeAll();
            });

            suggestView3.events.add('select', function () {
                Search()
            });

            function Search() {
                var request3 = $('#suggest3').val();
                mySearchControl3.search(request3);
            }
        });

        // Сommercial estate
        ymaps.ready(function () {
            var suggestView4 = new ymaps.SuggestView('suggest4')
            var myMap4 = new ymaps.Map('address4', {
                    center: [43.578131, 39.730819],
                    zoom: 14,
                    controls: []
                }),
                mySearchControl4 = new ymaps.control.SearchControl({
                    options: {
                        noPlacemark: true,
                        position: {
                            top: -50
                        }
                    }
                }),
                mySearchResults4 = new ymaps.GeoObjectCollection(null, {
                    hintContentLayout: ymaps.templateLayoutFactory.createClass('$[properties.name]'),
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: 'images/icon/marker.svg',
                    iconImageSize: [46, 46],
                    iconImageOffset: [-23, -46],
                });
            myMap4.controls.add(mySearchControl4);
            myMap4.geoObjects.add(mySearchResults4);

            mySearchControl4.events.add('resultselect', function (e) {
                var index4 = e.get('index');
                mySearchControl4.getResult(index4).then(function (res) {
                    mySearchResults4.add(res);
                });
            }).add('submit', function () {
                mySearchResults4.removeAll();
            });

            suggestView4.events.add('select', function () {
                Search()
            });

            function Search() {
                var request4 = $('#suggest4').val();
                mySearchControl4.search(request4);
            }
        });
    }


});
