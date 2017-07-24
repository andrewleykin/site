$(document).ready(function () {
    var chbox = $('.checkbox'),
        course = $(".course:visible").length,
        bgAnimate = $('.bg-animate'),
        complete = $('.complete'),
        courseTitle = $('#course-title'),
        courseText = $('#course-text');

    chbox.on("click", function () {
        var $this = $(this);

        $this.parent().parent().addClass('bg-animate');

        setTimeout(function () {
            $this.parent().parent().fadeOut(1000);
        }, 2000);
        course--;

        if (!course) {
            setTimeout(function () {
                courseTitle.css("opacity", "0");
                courseText.css("opacity", "0");
            }, 2800);
            setTimeout(function () {
                complete.css("opacity", "1");
            }, 3500);
        }
    });


});
