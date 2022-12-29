let RecaptchaV3 = {
    recaptchaExecute: (form) => {
        let recaptchaBlock = form.querySelector('.recaptcha-block');
        if (recaptchaBlock) {
            let {sitekey, action} = recaptchaBlock.dataset;
            if (! form.classList.contains('recaptcha-rendered')) {
                grecaptcha.ready(() => {
                    grecaptcha.execute(sitekey, {action: action ?? recaptchaBlock.id}).then(token => {
                        form.classList.add('recaptcha-rendered')
                        recaptchaBlock.innerHTML = `<input type="hidden" name="g-recaptcha-response" value="${token}" />`;
                        setTimeout(() => { //через 2 минуты делаем сброс, иначе будет ошибка - что слишком долго были на странице
                            form.classList.remove('recaptcha-rendered');
                            recaptchaBlock.innerHTML = '';
                        }, 120000);
                    })
                });
            }
        }
    },
    handle: (form, events) => {
        events.forEach((selectorEvent) => {
            const [selector, event] = selectorEvent.split(':;');
            form.querySelectorAll(selector).forEach((formField) => {
                formField.addEventListener(event, (e) => {
                    RecaptchaV3.recaptchaExecute(form)
                })
            })
        })
    },
}
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.recaptcha-block').forEach((recaptchaBlock) => {
        RecaptchaV3.handle(recaptchaBlock.closest('form'), [
            'input:not([type="submit"]):not([type="hidden"]):;focus',
            'textarea:;focus',
            'button[type="submit"]:;click',
            'input[type="submit"]:;click'
        ])
    })
})

const GalleryIndex = {
    run: () => {

        /**----------------- SLIDER PRODUCT -----------------**/
        if ($('div').is('.swiper-container-item')) {
            $(".swiper-container-item").each(function (index, element) {
                var $this = $(this);
                $this.addClass("instance-" + index);
                $this.find(".swiper-pagination").addClass("pagination-" + index);
                var swiper = new Swiper(".instance-" + index, {
                    speed: 500,
                    effect: 'fade',
                    pagination: {
                        el: '.pagination-' + index,
                        clickable: true,
                    }
                });
            });
            /**--------- CHANGE PHOTO -----------**/
            $('.swiper-container-item').on("mouseover", ".swiper-pagination-bullet", function () {
                $(this).click();
            });
        }
        /**----------------- SLIDER PRODUCT DETAIL -----------------**/
        if ($('div').is('.gallery-thumbs')) {
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                slidesPerView: 8,
                spaceBetween: 6,
                freeMode: true,
                allowTouchMove: false,
                watchSlidesVisibility: true,
                watchSlidesProgress: true,
                breakpoints: {
                    375: {
                        allowTouchMove: true,
                        slidesPerView: 6,
                        spaceBetween: 2,
                    },
                    768: {
                        allowTouchMove: true,
                        slidesPerView: 8,
                        spaceBetween: 6,
                    },
                    1110: {
                        allowTouchMove: false,
                    }
                }
            });
            var galleryTop = new Swiper('.gallery-top', {
                spaceBetween: 0,
                effect: 'fade',
                thumbs: {
                    swiper: galleryThumbs
                },
                pagination: {
                    el: ".swiper-pagination",
                    type: "fraction",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });

            $('.gallery-thumbs .swiper-slide').on('mouseover', function () {
                galleryTop.slideTo($(this).index());
            })
        }
    }
}

const RealtyAdd = {
    currentCategoryId: undefined,
    paramsFilter: undefined,
    mapContainers: {},
    run: () => {
        $('.new-obj form input[type="tel"]').mask('+7 000 000 00 00');
        if ($('div').is('.new-obj')) {
            $('select.styler').styler({
                selectPlaceholder: 'Выберите вариант'
            });
            $('select.select2').select2({
                placeholder: 'Выберите вариант',
                allowClear: true,
            });

            $('.JS-add-photo').on('click', function (event) {
                $('.fileinput-button input').click();
                event.preventDefault();
            });
        }
        if (RealtyAdd.existElement('.tabs__categories label')) {
            $('.tabs__categories label').on('click', (e) => {
                $(e.target).closest('label').addClass('active').siblings().removeClass('active');
                $('.tabs__content[data-category]').removeClass('active');
                $(`.tabs__content[data-category="${e.currentTarget.dataset.categoryId}"]`).addClass('active');
            })
        }
        if(RealtyAdd.existElement('.JS-street')) {
            RealtyAdd.runAddress();
        }

        $('[data-swap]').on('change', e => {
            let isSwap = e.target.checked;
            $(`.${e.target.dataset.swap}`).find('[data-swap-id]').each((i, swapEl) => {
                let swapIds = JSON.parse(swapEl.dataset.swapId);
                swapEl.value = isSwap ? swapIds[1] : swapIds[0];
            })
        })

        ymaps.ready(() => {
            document.querySelectorAll('.map .map-area').forEach((mapArea) => {
                let mapId = mapArea.querySelector('div').id;
                RealtyAdd.mapContainers[mapId] = Object.assign({}, Is2bMapObject);
                RealtyAdd.mapContainers[mapId].init(mapId, '.map-area');
            })
        })
    },
    runAddress: () => {
        $('.JS-street').on('change.select2', (e) => {
            let mapId = e.target.closest('form').querySelector('.map-area div').id;
            setTimeout(() => {
                RealtyAdd.mapContainers[mapId]._map_up();
            }, 2000);
        })
    },
    existElement: (selector) => {
        return $(selector).length > 0;
    }
}

const PasswordToggle = {
    run: () => {
        document.querySelector('.btn-toggle-password')?.addEventListener('click', (e) => {
            let passwordElement = e.target.closest('div').querySelector('input'),
                iconShowPassword = e.target.closest('div').querySelector('[data-password-show]'),
                iconHidePassword = e.target.closest('div').querySelector('[data-password-hide]')
            if(passwordElement.type == 'password') {
                passwordElement.type = 'text';
                iconShowPassword.classList.add('hidden')
                iconHidePassword.classList.remove('hidden')
            } else {
                passwordElement.type = 'password';
                iconHidePassword.classList.add('hidden')
                iconShowPassword.classList.remove('hidden')
            }
        })

        document.querySelector('#UserNotMyCompucter')?.addEventListener('change', e => {
            document.querySelector('#UserRemember').value = e.target.checked ? '' : '1';
        });

    }
}

$(() => {
    GalleryIndex.run();
    PasswordToggle.run();

    if(RealtyAdd.existElement('.new-obj')){
        RealtyAdd.run();
    }

    $('.select-sorting').on('change', (e) => {
        console.log(e);
        let url = new URL(location.href), value = e.target.value, values = value.split('_');
        let [sortValue, directionValue] = values.length === 3 ? [`${values[0]}_${values[1]}`, values[2]] : values;
        sortValue ? url.searchParams.set('sort', sortValue) : url.searchParams.delete('sort');
        directionValue ? url.searchParams.set('direction', directionValue) : url.searchParams.delete('direction');
        window.location.href = url.toString();
    });
});
