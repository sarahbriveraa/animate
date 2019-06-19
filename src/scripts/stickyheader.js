var stickyHeader = (function () {

    var element = document.documentElement,
        header = document.querySelector('.stickyHeader'),
        isScrolling = false,
        changeHeaderOn = 150;

    function init() {
        scrollPage();
        window.addEventListener('scroll', function (event) {
            if (!isScrolling) {
                isScrolling = true;
                setTimeout(scrollPage, 100);
            }
        }, false);
    }

    function scrollPage() {
        var sy = scrollY();
        var header = document.querySelector('.sticky-header');
        if (sy >= changeHeaderOn) {
            //Add stickyness
            header.classList.add('sticky', 'downIn');
        } else {
            //Remove stickyness
            header.classList.remove('sticky', 'downIn');
        }
        isScrolling = false;
    }

    function scrollY() {
        return window.pageYOffset || element.scrollTop;
    }

    init();

})();