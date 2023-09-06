function openTabPage(n, t) {
    $('#bottom-portfolio').hide()
    $('#gallery-loading').show()
    for (var r, u = document.getElementsByClassName("tabcontent"), i = 0; i < u.length; i++)
        u[i].style.display = "none";

    for (r = document.getElementsByClassName("tablinks"), i = 0; i < r.length; i++)
        r[i].className = r[i].className.replace(" active", "");
    
    $('#gallery-loading').fadeOut(800, function() {
        $(`#${t}`).fadeIn(100, function(){
            $('#bottom-portfolio').show()
            if(n.currentTarget)
            n.currentTarget.className += " active"

            $('html, body').animate({
                scrollTop: $('#portfolio').offset().top
            }, 'slow');
        })
        
    })
}

const selectRadios = document.getElementsByName("select")

selectRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
        $(`input[name="bottom-select"][value=${e.target.value}]`).click()
    })
})

const bottomSelectRadios = document.getElementsByName("bottom-select")

bottomSelectRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {

        openTabPage(e, e.target.value)
    })
})



window.addEventListener('DOMContentLoaded', function() {
    const observer = lozad();
    // console.log('observer', observer)
    observer.observe();

    document.getElementById("defaultTabPage").dispatchEvent(new Event('change'))
    // Code you want to execute after the DOM has been mounted
    // if(window.innerWidth < 768){
    //     const iconsCount = document.querySelectorAll(".icons .text-cyan").length
    //     if(iconsCount > 4) {
    //         document.querySelector("h2.name").style.setProperty('padding-bottom', '8px', 'important')
    //         document.querySelector(".banner").style.paddingTop = "64px"
    //         document.querySelector(".icons").style.marginTop = "24px"
    //     }
    // }

    jQuery(".gallery-container")
    .justifiedGallery({
        captions: false,
        rowHeight: 360, // This number determines how big the thumbnails will be and how many thumbnails will be shown in a row.
        margins: 6
    })
    .on("jg.complete", function () {
        // console.log('gallery-start', Date.now())
        window.lightGallery(
            this,
            {
                autoplayFirstVideo: false,
                pager: false,
                galleryId: "nature",
                plugins: [lgZoom, lgThumbnail],
                licenseKey: '08D8C119-0098-4FDC-94A8-58BE235087BC',
                download: false,
                mobileSettings: {
                    controls: true,
                    showCloseIcon: true,
                    download: false,
                    rotate: true
                }
            });
        // console.log('gallery-end', Date.now())

    });

    
    $('main').fadeIn(1000)
    $('header').fadeIn(1000)

});
