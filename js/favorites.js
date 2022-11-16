let TwigFavorite = {
    run: (favoriteClickable) => {
        favoriteClickable.addEventListener('click', (e) => {
            e.preventDefault();
            TwigFavorite.runElement(e.currentTarget)
        })
    },
    runElement: (favoriteClickable) => {
        let data = favoriteClickable.dataset;
        fetch(`/favorites/favorites/${data.favorite}_favorite?favorite=${data.favoriteId}&model=Advertisement`, {
            method: 'GET',
            data: {test: 1},
            headers: {
                Accept: 'application/json, text/javascript, */*; q=0.01',
                'Content-Type': 'application/json; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            }
        }).then(res => res.json()).then((res) => {
            if (res.error) {
                alert(res.error);
            } else {
                let prev = favoriteClickable.dataset.favorite;
                favoriteClickable.dataset.favorite = favoriteClickable.dataset.favoriteInvert;
                favoriteClickable.dataset.favoriteInvert = prev;

                if (favoriteClickable.querySelector('[data-title]')) {
                    favoriteClickable.querySelector('[data-title]').textContent = data[`favorite${TwigFavorite.capitalizeFirstLetter(favoriteClickable.dataset.favorite)}Title`];
                }
                if (favoriteClickable.querySelectorAll('[data-icon]').length === 2) {
                    favoriteClickable.querySelector(`[data-icon=${prev}]`).classList.toggle('d-none')
                    favoriteClickable.querySelector(`[data-icon=${favoriteClickable.dataset.favorite}]`).classList.toggle('d-none')
                }
            }
            if (res.count !== undefined) {
                if (document.querySelector('.favorite-counter')) {
                    document.querySelector('.favorite-counter').textContent = res.count;
                }
            }
        }).catch(alert)
    },
    capitalizeFirstLetter: (action) => {
        return action.charAt(0).toUpperCase() + action.slice(1)
    },
}

document.addEventListener('DOMContentLoaded', () => {
    $('body').on('click', '[data-favorite]', (e) => {
        e.preventDefault();
        TwigFavorite.runElement(e.currentTarget);
    });
    // if (document.querySelectorAll('[data-favorite]').length > 0) {
    //     document.querySelectorAll('[data-favorite]').forEach((favoriteClickable) => {
    //         TwigFavorite.run(favoriteClickable);
    //     })
    // }
});

$(()=>{
    if (window.location.pathname === '/favorites') {
        $('.heading .interface .share').on('click', function (e) {
            e.preventDefault();
            let title = 'Подборка избранных объектов';
            let url = window.location.origin + '/?sort=price%26direction=desc';
            let idsObject = document.querySelectorAll('.card > a');
            let query = '';

            idsObject.forEach(function (e){
                query += '%26id[]=' + e.getAttribute('data-id');
            });
            url += query;

            $('.share-modal').addClass('open');
            $('.share-modal .content .links').html(
                '<a class="share-link" target="_blank" title="Отправить в WhatsApp" href="https://api.whatsapp.com/send?text=' + title + ' ' + url + '"><img src="/uploads/assets/images/icon/social/wa.svg" alt="whatsapp"></a>' +
                '<a class="share-link" target="_blank" title="Отправить в Telegram" href="https://telegram.me/share/url?url=' + url + '"><img src="/uploads/assets/images/icon/social/Telegram.svg" alt="telegram"></a>' +
                '<a class="share-link" target="_blank" title="Отправить на почту" href="mailto:Введите адрес электронной почты?subject=Агентство недвижимости ПО ДОМАМ&amp;body=' + ' ' + url + '"><img src="/uploads/assets/images/icon/social/mail.svg" alt="mail"></a>' +
                '<a class="share-link" target="_blank" title="Отправить в Viber" href="viber://forward?text=' + title + ' ' + url + '"><img src="/uploads/assets/images/icon/social/Viber.svg" alt="viber"></a>' +
                '<a class="share-link" target="_blank" title="Отправить в VK" href="https://vk.com/share.php?url=' + url + '&title=' + title + '"><img src="/uploads/assets/images/icon/social/Vkontakte.svg" alt="vk"></a>' +
                '<a class="share-link copyLinkBtn" data-attr-url="' + url + '" title="Копировать в буфер обмена" href="#"><img src="/uploads/assets/images/icon/social/copy.svg" alt="copy"></a>'
            );
        });
    }
});


