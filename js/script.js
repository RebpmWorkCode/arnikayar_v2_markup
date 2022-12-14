// -----------------------------******** HEADER BUTTONS GROUP ********-----------------------------
// --------- OPEN MENU -----------
$('header .left .menu').on("click",".burger", function(e){
    e.preventDefault();
    $(this).siblings('.list').slideToggle();
    $(this).toggleClass('open');
    $('header .right .wrapper .list').hide();
});

// --------- OPEN LK -----------
$('header .right .wrapper').on("click",".open", function(e){
    e.preventDefault();
    $('header .left .menu .list').hide();
    $('header .left .menu .burger').removeClass('open');
    if($(this).siblings('.list').hasClass('active')){
        $(this).siblings('.list').toggleClass('active');
        $(this).siblings('.list').slideToggle();
    } else {
        $('header .right .wrapper .list').slideUp();
        $('header .right .wrapper .list').removeClass('active');
        $(this).siblings('.list').toggleClass('active');
        $(this).siblings('.list').slideToggle();
    }
});
$('header .right .wrapper .list ul').on("click",".mob", function(e){
    $(this).parents('.list').hide();
    $('header .right .bell').siblings('.list').slideToggle();
});
jQuery(function($){
	$(document).mouseup( function(e){
		var div = $( "header .right .wrapper" );
		if ( !div.is(e.target) && div.has(e.target).length === 0 ) {
            $('header .right .wrapper .list').slideUp();
            $('header .right .wrapper .list').removeClass('active');
		}
	});
});

// --------- OPEN SEARCH MOB -----------
$('header .left .search').on("click",".mob", function(e){
    $(this).siblings('form').addClass('open');
});
jQuery(function($){
	$(document).mouseup( function(e){
		var div = $( "header .left .search form" );
		if ( !div.is(e.target) && div.has(e.target).length === 0 ) {
            $('header .left .search form').removeClass('open');
		}
	});
});

// --------- WITH CLIENT -----------
$('header .right .wrapper .list ul li').on("click",".client", function(e){
    e.preventDefault();
    $(this).toggleClass('active');
    $('header .right .lk').toggleClass('active');
    $('.grid .cards .card .group .price .commission').toggleClass('close');
});

// --------- OPEN CITY MODAL -----------
$('header .left .city').on("click",".selected", function(e){
    e.preventDefault();
    $(this).siblings('.modal').addClass('open');
});
$('header .left .menu .list ul.second .mob').on("click","a", function(e){
    e.preventDefault();
    $('header .left .city .modal').addClass('open');
});

function cityModal() {
    $('.city .modal').removeClass('open');
}
$(".city .modal .bg").on("click", cityModal );
$(".city .modal .close").on("click", cityModal );

// -----------------------------******** CARD BUTTONS GROUP ********-----------------------------
// // --------- FAVOTITE -----------
// function favorite(e){
//     e.preventDefault();
//     $(this).toggleClass('active');
// }
// $(".cards .card .group .interface .favorite").on("click", favorite );
// $(".detail .heading .interface .favorite").on("click", favorite );


// // --------- SHARE -----------
// function share(e){
//     e.preventDefault();
//     let target = $(e.currentTarget);
//     let url = window.location.href;
//     if (target.attr('data-attr-url')) {
//         url = 'https://' + window.location.hostname + target.attr('data-attr-url');
//     }
//     let title = target.attr('data-attr-title');
//     $('.share-modal').addClass('open');
//     $('.share-modal .content .links').html(
//         '<a class="share-link" target="_blank" title="?????????????????? ?? WhatsApp" href="https://api.whatsapp.com/send?text='+ title + ' ' + url + '"><img src="/uploads/assets/images/icon/social/wa.svg" alt="whatsapp"></a>'+
//         '<a class="share-link" target="_blank" title="?????????????????? ?? Telegram" href="https://telegram.me/share/url?url=' + url + '"><img src="/uploads/assets/images/icon/social/Telegram.svg" alt="telegram"></a>'+
//         '<a class="share-link" target="_blank" title="?????????????????? ???? ??????????" href="mailto:?????????????? ?????????? ?????????????????????? ???????????subject=?????????????????? ???????????????????????? ???? ??????????&amp;body=' + ' ' + url + '"><img src="/uploads/assets/images/icon/social/mail.svg" alt="mail"></a>'+
//         '<a class="share-link" target="_blank" title="?????????????????? ?? Viber" href="viber://forward?text='+ title + ' ' + url + '"><img src="/uploads/assets/images/icon/social/Viber.svg" alt="viber"></a>'+
//         '<a class="share-link" target="_blank" title="?????????????????? ?? VK" href="https://vk.com/share.php?url=' + url + '&title=' + title + '"><img src="/uploads/assets/images/icon/social/Vkontakte.svg" alt="vk"></a>'+
//         '<a class="share-link copyLinkBtn" data-attr-url="'+ url +'" title="???????????????????? ?? ?????????? ????????????" href="#"><img src="/uploads/assets/images/icon/social/copy.svg" alt="copy"></a>'
//     );
// }
// $(".cards .card .group .interface .share").on("click", share );
// $(".detail .heading .interface .share").on("click", share );
// $(".ads .tabs__content .object .inf .interface .share").on("click", share );
//
// function shareModal() {
//     $('.share-modal').removeClass('open');
// }
// $(".share-modal .bg").on("click", shareModal );
// $(".share-modal .close").on("click", shareModal );
//
// // --------- COPY LINK -----------
// $('body').on('click', '.copyLinkBtn', function (e) {
//     e.preventDefault();
//     var url = $(this).data('attr-url');
//     navigator.clipboard.writeText(url);
// });

// --------- ADD FOLDER -----------
let collectionBlock = $('#collection-block');
function folder(e){
    e.preventDefault();
    let agencyCompilationId = $(this).data('agency-compilation-id');
    let id = $(this).data('id');

    if (!agencyCompilationId) {
        fetch(`/agency/agency_compilations/add/${id}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(res => res.text()).then((res) => {
            collectionBlock.html(res);
            $('.compilition').addClass('open');
        })
    } else {
        fetch(`/agency/agency_compilations/delete/${agencyCompilationId}/${id}`, {headers: {'X-Requested-With': 'XMLHttpRequest'}}).then(res => {
            window.location.reload();
        })
    }
}
$("body").on("click", ".cards .card .group .interface .folder", folder );
$("body").on("click", ".detail .heading .interface .folder", folder );

function closeModal() {
    $('.compilition').removeClass('open');
    $('.compilition .content .list form')[0].reset();
    $('.compilition .content button').attr('disabled','disabled');
    $('.compilition .content button').html('???????????????? ????????????????');
}
$(collectionBlock).on("click", ".compilition .bg", closeModal );
$(collectionBlock).on("click", ".compilition .close", closeModal );

$(collectionBlock).on('click', '.compilition .content .list .group label input', function (e){
    var str = '';
    $('.compilition .content .list .group label input[type="radio"]').each(function(){
        if ($(this).is(":checked")) {
          str = 1;
        }
    });
    if(str == ''){
        $('.compilition .content button').attr('disabled','disabled');
        $('.compilition .content button').html('???????????????? ????????????????');
    } else {
        $('.compilition .content button').removeAttr('disabled');
        $('.compilition .content button').html('????????????');
    }
});
$(collectionBlock).on('submit', '.compilition form', function (e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetch(e.currentTarget.getAttribute('action')+'.json', {
        method: 'POST',
        body: data,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then((res) => {
        if (res.status === 200) {
            // window.location.reload()
            $(".compilition button[type=submit]").css('background-color', 'green');
            setTimeout(function () {
                closeModal();
            }, 2000)
        } else {
            console.log(res);
        }
    })
});

// --------- NEW FOLDER -----------
$('body').on('click', '.newfolder', function (e){
    e.preventDefault();
    $('.compilition').removeClass('open');
    $('.new-folder').addClass('open');
});
$("body").on('keyup', '.new-folder form input', function (e){
    var str = '';
    $('.new-folder form input[type="text"]').each(function(){
        if ($(this).val() != "") {
            str = 1;
        }
    });
    if(str == ''){
        $('.new-folder form button').attr('disabled','disabled');
    } else {
        $('.new-folder form button').removeAttr('disabled');
    }
});
$("body").on('submit', '.new-folder form', function (e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetch(e.currentTarget.getAttribute('action'), {
        method: 'POST',
        body: data,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then((res) => {
        if (res.status === 200) {
            window.location.reload()
        } else {
            console.log(res);
        }
    })
});
function closeNewFolder() {
    $('.new-folder').removeClass('open');
    $('.new-folder form')[0].reset();
    $('.new-folder form button').attr('disabled','disabled');
}
$(collectionBlock).on("click", ".new-folder .bg", closeNewFolder );
$(collectionBlock).on("click", ".new-folder .close", closeNewFolder );

// --------- EDIT FOLDER -----------
$('body').on('click', '.interface .edit', function (e){
    e.preventDefault();
    $('.edit-folder form').attr('action', $('.edit-folder form').attr('action') + '/' + $(this).data('idFolder'));
    $('.edit-folder').addClass('open');
});
$("body").on('keyup', '.edit-folder form input', function (e){
    var str = '';
    $('.edit-folder form input[type="text"]').each(function(){
        if ($(this).val() != "") {
            str = 1;
        }
    });
    if(str == ''){
        $('.edit-folder form button').attr('disabled','disabled');
    } else {
        $('.edit-folder form button').removeAttr('disabled');
    }
});
$("body").on('submit', '.edit-folder form', function (e){
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    fetch(`${e.currentTarget.getAttribute('action')}/`, {
        method: 'POST',
        body: data,
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }).then((res) => {
        if (res.status === 200) {
            window.location.reload()
        } else {
            console.log(res);
        }
    })
});
function closeEditFolder() {
    $('.edit-folder').removeClass('open');
    $('.edit-folder form')[0].reset();
    $('.edit-folder form button').attr('disabled','disabled');
}
$("body").on("click", ".edit-folder .bg", closeEditFolder );
$("body").on("click", ".edit-folder .close", closeEditFolder );

// --------- DEL FOLDER -----------
$('.folders .block .interface').on('click', '.del', function (e){
    e.preventDefault();
    $('.del-folder').addClass('open');
    var idfolder = $(this).data('id-folder');
    console.log(idfolder);
    var block = $(this).parents('.block').html();
    $('.del-folder input').val(idfolder);
    $('.del-folder .preview .block').html(block);
});

function closeDelFolder() {
    $('.del-folder').removeClass('open');
    $('.del-folder form')[0].reset();
}
$(".del-folder .bg").on("click", closeDelFolder );
$(".del-folder .close").on("click", closeDelFolder );
$(".del-folder .cancel").on("click", closeDelFolder );

$('body').on('click', '.del-folder [data-delete]', (e) => {
    e.preventDefault();
    let folderId = $('a.del').data('id-folder');
    fetch(`/agency/agency_compilations/drop/${folderId}.json`, {
        method: 'POST',
        body: JSON.stringify({
            agency_compilation_id: folderId,
        }),
        headers: {
            Accept: 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest'
        }
    }).then((res) => {
        if (res.status === 200) {
            window.location.reload()
        } else {
            console.log(res);
        }
    })
});

// --------- ADD NOTES -----------
$('.detail .heading .interface').on('click', '.note', function (e){
    e.preventDefault();
    $('.detail .heading .interface a').toggleClass('close');
    $('.detail .heading .interface .notes form').addClass('open');
    $('.detail .heading .interface .notes input').val('');
    $('.detail .heading .interface .notes input').focus();
});
$('.detail .heading .interface .notes').on('click', 'button', function (e){
    e.preventDefault();
    var title = $(this).siblings('input').val();
    $('.detail .heading .interface .favorite').addClass('active');
    $('.detail .heading .interface a').removeClass('close');
    $('.detail .heading .interface .notes form').removeClass('open');
    $('.detail .heading .interface .notes').addClass('close');
    $('.detail .heading .interface .notes').append('<div class="active-note"><span>'+ title+ '</span><button class="del"></button></div>');
});
$('.detail .heading .interface .notes').on('click', '.active-note .del', function (e){
    e.preventDefault();
    $('.detail .heading .interface .notes').removeClass('close');
    $('.detail .heading .interface .notes .active-note').remove();
});
jQuery(function($){
	$(document).mouseup( function(e){
		var div = $( ".detail .heading .interface .notes" );
		if ( !div.is(e.target) && div.has(e.target).length === 0 ) {
			$('.detail .heading .interface a').removeClass('close');
            $('.detail .heading .interface .notes form').removeClass('open');
		}
	});
});

// -----------------------------******** SLIDERS GROUP ********-----------------------------

// // --------- CHANGE PHOTO -----------
// $('.swiper-container-item').on("mouseover",".swiper-pagination-bullet", function(){
//     $(this).click();
// });

// -----------------------------******** OTHER GROUP ********-----------------------------
// --------- RESET FILTERS FORM -----------
$('.grid .filters').on("click",".reset", function(e){
    e.preventDefault();
    $(this).parents('form')[0].reset();
    $(this).removeClass('open');
});

function showValues() {
    var str = '';
    $('.grid .filters form input[type="checkbox"]').each(function(){
        if ($(this).is(":checked")) {
          str = 1;
        }
    });
    $('.grid .filters form input[type="text"]').each(function(){
        if ($(this).val() != "") {
          str = 1;
        }
    });
    if(str == ''){
        $('.grid .filters .reset').removeClass('open');
    } else {
        $('.grid .filters .reset').addClass('open');
    }
}
$("input").on("click", showValues );
$("input").on("keyup", showValues );

// --------- OPEN and CLOSE FILTERS mob -----------
function closeFilters() {
    $(this).parents('.filters').removeClass('open');
    $('.grid .filters .title').remove();
}
$(".grid .filters .buttons .out").on("click", closeFilters );
$(".grid .filters").on("click", ".close", closeFilters );

$('.grid').on("click",".open-filter", function(e){
    $('.filters').addClass('open');
    $('.grid .filters').prepend('<p class="title mob">??????????????</p><div class="close"><span></span><span></span></div>');
});

// --------- BUTTON UP -----------
$(document).ready(function() {
    var button = $('.button-up button');
        $(window).scroll (function () {
        if ($(this).scrollTop () > 300) {
            button.fadeIn(200);
        } else {
            button.fadeOut(200);
        }
    });
    button.on('click', function(){
        $('body, html').animate({
            scrollTop: 0
        }, 800);
        return false;
    });
});
window.onscroll = function () {
    var block = $('footer').offset().top;
    var bottom = $(window).scrollTop() + $(window).height();;
    if (block >= bottom) {
        $('.button-up button').removeClass('stop');
    } else {
        $('.button-up button').addClass('stop');
    }
}


// -----------------------------******** NEW OBJECT ********-----------------------------
// $('.new-obj .tabs .wrapper ul').on("click","li", function(){
//     $('.new-obj .step').removeClass('active');
//     $('.new-obj .step1').addClass('active');
//     setTimeout(function() {
//         $('select').trigger('refresh');
//     }, 1);
// });

// --------- NEXT BUTTON -----------
$('.new-obj').on("click","a.next", function(e){
    e.preventDefault();
    // ----------- VALIDATION --------------
    // var errors = 0;
    // $('.new-obj').find('.error').remove();
    // $('.new-obj form input').removeClass('err');
    // $('.new-obj form .jq-selectbox__select').removeClass('err');

    // var inputs = $(this).parents('.step').find('input');
    // var selects = $(this).parents('.step').find('select');
    // $.each(inputs, function( key, value ) {
    //     if($(value).parents().hasClass("case")){
    //     } else{
    //         if($(value).val() == ''){
    //             $(value).parents('.group').append('<div class="error"><span>?????????????? ???????????????? ??????????????????</span></div>');
    //             $(value).addClass('err');
    //             errors++;
    //         }
    //     }
    // });
    // $(this).parents('.step').find('.radio').each(function() {
    //     if ($(this).find("input:radio:checked").length==0) {
    //         $(this).append('<div class="error"><span>???????????????? ???????? ???? ??????????????????</span></div>');
    //         errors++;
    //     }
    // });
    // $.each(selects, function( key, value ) {
    //     if($(value).parents().hasClass("case")){
    //     } else{
    //         if($(value).val() == ''){
    //             $(value).parents('.group').append('<div class="error"><span>?????????????? ???????????????? ??????????????????</span></div>');
    //             $(value).siblings('.jq-selectbox__select').addClass('err');
    //             errors++;
    //         }
    //     }
    // });
    // console.log( '????????????: ' +errors );
    // if(errors == 0){
        var myClass = $(this).data('step');
        $('.new-obj .wrapper').hide();
        $(this).parents('.step').removeClass('active');
        $(this).parents('.step').siblings('.'+myClass+'').addClass('active');
        $('body, html').animate({scrollTop: 0}, 800);
    // }
});

// --------- PREV BUTTON -----------
$('.new-obj').on("click","a.prev", function(e){
    e.preventDefault();
    var myClass = $(this).data('step');
    $(this).parents('.step').removeClass('active');
    $(this).parents('.step').siblings('.'+myClass+'').addClass('active');
    $('body, html').animate({scrollTop: 0}, 800);
});

// --------- OUT BUTTON -----------
$('.new-obj').on("click","a.out", function(e){
    e.preventDefault();
    window.location.reload();
    // $('.new-obj .wrapper').show();
    // $(this).parents('.step').removeClass('active');
    // $('.new-obj .step1').addClass('active');
    // $('body, html').animate({scrollTop: 0}, 800);
});

$('.new-obj .additionals label').on("click",'input[type="checkbox"]', function(){
    $(this).parent().siblings('.group').toggleClass('open');
});

// --------- SUBMIT BUTTON (?????????????????? ??????????????, ???????????????????? ???? ?????????????? ???????????????? ???????????????? ??????????)-----------
// $('.new-obj').on("submit","form", function(e){
//     e.preventDefault();
//     $('.new-obj').html('<div class="success"><p>???????? ???????????????????? ?????????????? ??????????????????</p><img src="images/icon/house-g.svg"></div>');
//     $('body, html').animate({
//         scrollTop: 0
//     }, 800);
//     setTimeout(function() {
//         $('select').trigger('refresh');
//     }, 1);
// });

// --------- ADD PHOTO -----------
// jQuery(document).ready(function () {
//     ImgUpload();
// });

// function ImgUpload() {
//     var imgWrap = "";
//     var imgArray = [];

//     $('.new-obj .mediabox .right label input').each(function () {
//         $(this).on('change', function (e) {
//             imgWrap = $(this).closest('.new-obj .mediabox .right').find('.previews');
//             var maxLength = $(this).attr('data-max_length');

//             var files = e.target.files;
//             var filesArr = Array.prototype.slice.call(files);
//             var iterator = 0;
//             filesArr.forEach(function (f, index) {

//                 if (!f.type.match('image.*')) {
//                 return;
//                 }

//                 if (imgArray.length > maxLength) {
//                 return false
//                 } else {
//                 var len = 0;
//                 for (var i = 0; i < imgArray.length; i++) {
//                     if (imgArray[i] !== undefined) {
//                     len++;
//                     }
//                 }
//                 if (len > maxLength) {
//                     return false;
//                 } else {
//                     imgArray.push(f);

//                     var reader = new FileReader();
//                     reader.onload = function (e) {
//                     var html = "<div class='item'><div style='background-image: url(" + e.target.result + ")' data-number='" + $(".delete-link").length + "' data-file='" + f.name + "' class='img'><div class='delete-link'></div></div></div>";
//                     imgWrap.prepend(html);
//                     iterator++;
//                     }
//                     reader.readAsDataURL(f);
//                 }
//                 }
//             });
//         });
//     });

//     $('body').on('click', ".delete-link", function (e) {
//         var file = $(this).parent().data("file");
//         for (var i = 0; i < imgArray.length; i++) {
//             if (imgArray[i].name === file) {
//                 imgArray.splice(i, 1);
//                 break;
//             }
//         }
//         $(this).parent().parent().remove();
//     });
// }

// --------- ADD VIDEO-----------

// $(document).on("change", ".mediabox.video input", function(evt) {
//     var $source = $(this).parent().siblings('.video-prev').find('source');
//     $source.parents('.video-prev').show();
//     $source[0].src = URL.createObjectURL(this.files[0]);
//     $source.parent()[0].load();
//   });

$('.detail .all-inf .about-object').on('click', ' .full', function (e) {
    e.preventDefault();
    $(this).hide();
    $('.about-object').addClass('open');
    $('.detail .all-inf .content .add-tags').addClass('open');
});
$('.detail .all-inf .description').on('click', ' .full', function (e) {
    e.preventDefault();
    $(this).hide();
    $('.detail .all-inf .description').addClass('open');
});

// $('.group.tags label input').each(function() {
//     $(this).on('change', function () {
//         if ($(this).attr('checked') == 'checked') {
//             $(this).attr('checked', false);
//         }
//     })
// });
