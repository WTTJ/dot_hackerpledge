//jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

//jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a, a.autoscroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 120
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

$(document).ready(function () {
    $(".navbar li a").click(function(event) {

        if ($(".navbar-toggle").is(":visible")) {
            $(".navbar-toggle").click();
        }

    });

    $(".companies-list").html("Loading...");
    $.getJSON("https://www.dotconferences.com/api/pledges", function(pledges) {
        pledges = shuffle(pledges);

        var html = "";
        for (var i=0;i<pledges.length;i++) {
            html += "<div class='companies-list-one'>\
                <div class='company-image'><a target='_blank' href='"+pledges[i].url+"'><img src='"+pledges[i].picture+"' /></a></div>\
                <div class='company-name'><a target='_blank' href='"+pledges[i].url+"'>"+pledges[i].name+"</a></div>\
            </div>";
        }

        $(".companies-list").html(html);
    });
});