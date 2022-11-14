const myLazyLoad = new LazyLoad();
let RealtyAjaxLoad = {
    itemClass: '.card',
    linkUrl: '',
    page: 1,
    pageLimit: 1,

    init: function () {
        RealtyAjaxLoad.linkUrl = window.paginator_url;
        RealtyAjaxLoad.pageLimit = window.paginator_limit;
        RealtyAjaxLoad.page = window.paginator_request_page;
        $('#more').on('click', function (e) {
           e.preventDefault();
            RealtyAjaxLoad._load();
        });

    },
    _getUrl: () => {
        RealtyAjaxLoad.page++;
        if (RealtyAjaxLoad.page <= RealtyAjaxLoad.pageLimit) {
            let linkUrl = `${RealtyAjaxLoad.linkUrl.replace('page-id', RealtyAjaxLoad.page)}&limit=${window.paginator_request_limit}`;
            console.log(`page - ${RealtyAjaxLoad.page}, pageLimit - ${RealtyAjaxLoad.pageLimit}, linkUrl - ${linkUrl}`);
            return linkUrl;
        }
        return false;
    },
    _load: function () {
        let url = RealtyAjaxLoad._getUrl();
        if (url) {
            RealtyAjaxLoad._loadedData(url).then(data => {
                $('#cards').append($(data).find(RealtyAjaxLoad.itemClass))
                GalleryIndex.run();
            })
        }
    },
    _loadedData: function (linkUrl){
        return new Promise((resolve, reject) => {
            fetch(linkUrl, {method: 'get', headers: {'X-Requested-With': 'XMLHttpRequest',}})
                .then(response => response.text()).then(resolve).catch(reject)
        })
    }
}

$(document).ready(function () {
    RealtyAjaxLoad.init();
    myLazyLoad.update();
});
