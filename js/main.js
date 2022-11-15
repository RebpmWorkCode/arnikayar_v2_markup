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
        }

        if(RealtyAdd.existElemement('.params-filter')) {
            RealtyAdd.paramsFilter = $('.params-filter');
            RealtyAdd.runParamsFilter();
        }
        if(RealtyAdd.existElemement('[name="data[Advertisement][category_id]"]')) {
            RealtyAdd.currentCategoryId = RealtyAdd._getCategoryValue();
            RealtyAdd._getCategoryField().on("change", (e) => {
                RealtyAdd.currentCategoryId = RealtyAdd._getCategoryValue();
                $(e.target).closest('label').addClass('active').siblings().removeClass('active');
            });
        }
        if(RealtyAdd.existElemement('.JS-street')) {
            RealtyAdd.runAddress();
        }
    },
    runAddress: () => {
        $('.JS-street').on('change.select2', (e) => {
            setTimeout(() => {
                Is2bMapObject._map_up();
            }, 2000);
        })
    },
    runParamsFilter: () => {
        if (RealtyAdd.paramsFilter.length > 0) {
            RealtyAdd.hideParamsFilter();
            let categoryValue = RealtyAdd._getCategoryValue();
            // let rentValue = RealtyAdd._getRentValue();
            if (categoryValue) {
                RealtyAdd.showParamsFilter(categoryValue/* , rentValue */);
            }
            RealtyAdd._getCategoryField().on('change', RealtyAdd.toggleParamsFilter)
            // RealtyAdd._getRentField().on('change', RealtyAdd.toggleParamsFilter)

            RealtyAdd.toggleParamsFilter();
        }
    },
    hideParamsFilter: () => {
        RealtyAdd.paramsFilter.addClass('hidden');

    },
    showParamsFilter: (categoryId, rentValue) => {
        let classRent = '';
        switch (rentValue) {
            case 'rent':
                classRent = `._r1-${categoryId}`;
                break;
            case 'sale':
                classRent = `._r0-${categoryId}`;
                break;
            default:
                break;
        }
        $(`.params-filter.category-${categoryId}${classRent}`).removeClass('hidden');
    },
    toggleParamsFilter: (e) => {
        RealtyAdd.hideParamsFilter();
        RealtyAdd.showParamsFilter(RealtyAdd._getCategoryValue()/* , RealtyAdd._getRentValue() */)
    },
    _getCategoryField: () => {
        return $('[name="data[Advertisement][category_id]"]');
    },
    _getCategoryValue: () => {
        return Number($('[name="data[Advertisement][category_id]"]:checked').val());
    },
    // _getRentField: () => {
    //     return $('[name="data[Advertisement][rent]"]');
    // },
    // _getRentValue: () => {
    //     if (RealtyIndexForm.isCheckedField) {
    //         return $('[name="data[Advertisement][rent]"]:checked').val();
    //     }
    //     return $('[name="data[Advertisement][rent]"]').val();
    // },
    existElemement: (selector) => {
        return $(selector).length > 0;
    }
}

$(() => {
    GalleryIndex.run();

    if(RealtyAdd.existElemement('.new-obj')){
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
