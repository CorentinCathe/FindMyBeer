Vue.component('backtotop', {
    template: ` <button class="goTop" v-if="isVisible" @click="backToTop">
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                </button>`,
    data: function() {
        return {
            isVisible: false
        };
    },
    methods: {
        initToTopButton: function() {
            $(document).bind('scroll', function() {
                var backToTopButton = $('.goTop');
                if ($(document).scrollTop() > 250) {
                    backToTopButton.addClass('isVisible');
                    this.isVisible = true;
                } else {
                    backToTopButton.removeClass('isVisible');
                    this.isVisible = false;
                }
            }.bind(this));
        },
        backToTop: function() {
            $('html,body').stop().animate({
                scrollTop: 0
            }, 'slow', 'swing');
        }
    },
    mounted: function() {
        this.$nextTick(function() {
            this.initToTopButton();
        });
    }
});