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
        $('.favorites_share-button').on('click', function (e) {
            e.preventDefault();
            let title = 'Подборка избранных объектов';
            let url = window.location.origin + '/?sort=price%26direction=desc';
            let idsObject = document.querySelectorAll('.filter-objects > a');
            let query = '';

            idsObject.forEach(function (e){
                query += '%26id[]=' + e.getAttribute('data-id');
            });
            url += query;

            Swal.fire({
                title: '<strong>Поделиться избранным</strong>',
                html:
                    '<div id="share-block">' +
                    '    <div class="share-link__list">' +
                    // '        <a class="share-link" target="_blank" title="Отправить в WhatsApp" href="https://api.whatsapp.com/send?text='+ title + ' ' + url + '"><img src="/uploads/whatsapp.png" alt="whatsapp"></a>' +
                    '        <a class="share-link" target="_blank" title="Отправить в WhatsApp" href="https://web.whatsapp.com"><img src="/uploads/whatsapp.png" alt="whatsapp"></a>' +
                    '        <a class="share-link" target="_blank" title="Отправить в Telegram" href="https://telegram.me/share/url?url=' + url + '"><img src="/uploads/telegram.png" alt="telegram"></a>' +
                    '        <a class="share-link" target="_blank" title="Отправить на почту" href="mailto:Введите адрес электронной почты?subject=Агентство недвижимости ПО ДОМАМ&body=' + ' ' + url + '"><img src="/uploads/mail.png" alt="mail"></a>' +
                    '        <a class="share-link" target="_blank" title="Отправить в Viber" href="viber://forward?text='+ title + ' ' + url + '"><img src="/uploads/viber.png" alt="viber"></a>' +
                    '        <a class="share-link" target="_blank" title="Отправить в VK" href="https://vk.com/share.php?url=' + url + '&title=' + title + '"><img src="/uploads/vk.png" alt="vk"></a>' +
                    '        <a class="share-link" target="_blank" title="Перейти в Instagram Direct" href="https://www.instagram.com/direct"><img src="/uploads/instagram.png" alt="instagram"></a>' +
                    '        <a class="share-link" target="_blank" title="Отправить в Facebook" href="https://www.facebook.com/sharer/sharer.php?u=' + url +'"><img src="/uploads/1facebook.png" alt="facebook"></a>' +
                    '        <a class="share-link copyLinkBtn" title="Копировать в буфер обмена" href="#"><img src="/uploads/copy.png" alt="copy"></a>' +
                    '    </div>' +
                    '</div>',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
            });
            $('body').on('click', '.copyLinkBtn', function () {
                navigator.clipboard.writeText(url);
            });
        });
    }
});


