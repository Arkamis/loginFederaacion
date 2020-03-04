/*
    Carousel
*/
$('#carousel-example').carousel({
    interval: 3000
});

$('#carousel-example').on('slide.bs.carousel', function (e) {
    /*
        CC 2.0 License Iatek LLC 2018 - Attribution required
    */
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 5;
    var totalItems = $('.carousel-item.sponsor').length;
 
    if (idx >= totalItems-(itemsPerSlide-1)) {
        var it = itemsPerSlide - (totalItems - idx);
        for (var i=0; i<it; i++) {
            // append slides to end
            if (e.direction=="left") {
                $('.carousel-item.sponsor').eq(i).appendTo('.carousel-inner.sponsor');
            }
            else {
                $('.carousel-item.sponsor').eq(0).appendTo('.carousel-inner.sponsor');
            }
        }
    }
});