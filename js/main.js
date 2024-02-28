//------------------------------------------------

let lenis;

const initSmoothScrolling = () => {
    lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        ease: "linear"
    });


    lenis.on('scroll', () => ScrollTrigger.update());

    const scrollFn = (time) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
    };
    requestAnimationFrame(scrollFn);
};

initSmoothScrolling();

//------------------------


let s = skrollr.init();
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || window.scrollY;
    document.querySelector(".scrollTop").innerText = parseInt(scrollTop);
});


//-------------------------------------------------------------------------
var rellax = new Rellax('.rellax');

//  ScrollOut({
//     /* options */
//   });


ScrollOut({
    threshold: .2,
    // once: true
});


//-------------------------------------------------------------------------
Shery.mouseFollower({
    //Parameters are optional.
    skew: true,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 1,
});

Shery.makeMagnet(".magnet-target" /* Element to target.*/ , { //클래스명 붙이기
    //Parameters are optional.
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    duration: 0.5,
});

Shery.textAnimate(".text-target" /* Element to target.*/ , {
    //Parameters are optional.
    style: 1, //강도 1-5
    y: 10,
    delay: 0.1,
    duration: 0.5,
    ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    multiplier: 0.1,
});
//-------------------------------------------------------------------------
// 🌸메인메뉴
let navs = document.querySelectorAll('nav ul li a') //querySelector : 유사배열
//console.log(navs)

navs.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        e.preventDefault(); // 튕기는 것을 막아줌
        document.querySelector(element.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        })

    })
})

// 🌸영역으로 이동하면 그에 해당하는 메뉴에 클래스명을 추가하기
window.addEventListener("scroll", () => {
    //let scrollTop = window.pageYOffset; >> 밑에 코드와 똑같음
    let scrollTop = window.scrollY;
    //console.log(scrollTop)

    const parallaxItem = document.querySelectorAll('.cont_item');
    const parallaxNav = document.querySelectorAll('nav ul li')
    //console.log(parallaxNav)

    parallaxItem.forEach((element, index) => {
        if (scrollTop >= element.offsetTop - 200) {
            parallaxNav.forEach((li) => {
                li.classList.remove('active')
            })
            parallaxNav[index].classList.add('active')
        }
    })
})

//
const bar = document.querySelector(".scroll-indicator");

window.onscroll = () => {
    let winScroll = document.documentElement.scrollHeight;
    let height = winScroll - window.innerHeight;
    let scrolled = window.scrollY / height;
    console.log(scrolled) 
    let scrollY = scrolled * 100;
    bar.style.width = scrollY + "%"
}

//-------------------------------------------------------------------------
gsap.registerPlugin(ScrollTrigger);

window.onscroll = function () {
    scrollRotate("mr");
    scrollRotate("mr1");

};

function scrollRotate(elementId) {
    let image = document.getElementById(elementId);
    image.style.transform = "rotate(" + window.pageYOffset / 5 + "deg)";

}

//--------------------------------
/* spline */
let spline = document.querySelector(".spline");

gsap.timeline({
    scrollTrigger: {
        trigger: spline,
        start: "top top",
        end: "190% bottom",
        scrub: 5,
        pin: true,
    },
})

// .to(spline, { x:"-20%"});
// .to(spline, { yPercent : 30, duration:0.3})


//-----------
Splitting();

function header() {
    gsap.to(".title_paralax", {
        scrollTrigger: {
            trigger: "#page1",
            start: 'top top',
            scrub: 1.9
        },
        yPercent: -50
    })
}

header();


//-----------------------------------------------------------------


const content = "2024 (web) DESIGNER & \n DEVELOPER";
const text = document.querySelector(".text");
let i = 0;
let intervalId;

function typing() {
    let txt = content[i++];
    text.innerHTML += txt === "\n" ? "<br/>" : txt;
    if (i >= content.length) {
        clearInterval(intervalId);
    }
}

intervalId = setInterval(typing, 200);

//-----------------------------------
gsap.registerPlugin(ScrollTrigger);

//---------------------------------------------------------

gsap.to(".header__marq-wrapp", {
    scrollTrigger: {
        trigger: "#page2",
        start: 'top bottom',
        scrub: 1.9
    },
    xPercent: -50
})


gsap.to(".header__marq-star img", {
    scrollTrigger: {
        trigger: "#page2",
        start: 'top bottom',
        scrub: 1.9
    },
    rotate: -720
})


//-------------------------------------------------------------

const horSection = gsap.utils.toArray('.port_desc .port'); // 모든 요소들을 horSection이라는 변수에 배열로 저장한다.


const horiz = gsap.to(horSection, {
    //x: (- 94 * (horSection.length - 1))+"%", //horSection.length >> 20개를 보여준다. 1을 빼는 이유는 마지막거를 보여주기위해 //🍑
    xPercent: -80 * (horSection.length - 1), //위 코드와 똑같음
    scrollTrigger: {
        trigger: '.port_desc',
        start: 'top 15%',
        end: "+=2500", // += 는 애니메이션이 시작되는 시점으로부터 5000px 떨어진 곳에 도착하면 애니가 끝난다. //🍑
        //markers: true,
        scrub: 1, //스크롤반응
        pin: true //화면고정
    }
})



let boxs = document.querySelectorAll('.boxs')

boxs.forEach((box) => {
    let h3Element = box.querySelector('h3');
    let targetValue = h3Element.getAttribute('data-rate');

    ScrollTrigger.create({
        trigger: '.easypiechart',
        start: "top 40%",
        onEnter: () => {
            num();
            pieChart();
        }
    })
})

function pieChart() {
    let chartElements = document.querySelector('h3');
    let chartCanvas = document.querySelectorAll('.cartCanvas');




    chartCanvas.forEach(function (element) {
        //const ctx = document.getElementById('myChart');
        let percent = element.parentElement.getAttribute('data-percent');

        //캔버스 엘리먼트에 이미 Chart 인스턴스가 있는지 확인
        const existingChart = Chart.getChart(element);

        if (existingChart) {
            // 기존의 Chart 인스턴스 파괴
            existingChart.destroy();
        }

        new Chart(element, {
            type: 'doughnut',
            data: {
                //labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    //label: '# of Votes',
                    data: [percent, 100 - percent],
                    borderWidth: 0,
                    borderRadius: 30,
                    cutout: 100,
                    backgroundColor: [
                        'rgb(102, 101, 238)',
                        'rgba(255, 99, 132,0)',

                    ],
                }]
            },
            options: {
                animation: {
                    duration: 1500
                },
                scales: {
                    //   y: {
                    //     beginAtZero: true
                    //   }
                }
            }
        });
    })

}


function num() {
    boxs.forEach((box) => {
        let h3Element = box.querySelector('h3');
        let targetValue = h3Element.getAttribute('data-rate');
        gsap.fromTo(h3Element, {
            innerText: 0
        }, {
            duration: 1.5,
            innerText: targetValue,
            roundProps: "innerText" //소수점을 반올림
        })
    })
}

//--------------------------------------------------
const photos =
    gsap.utils.toArray(".hong:not(:first-child)")

gsap.set(photos, {
    yPercent: 101
})

const animation3 = gsap.to(photos, {
    yPercent: 0,
    duration: 1,
    stagger: 1
})

ScrollTrigger.create({
    trigger: ".sec10",
    start: "top top",
    end: "100% bottom",
    pin: ".show_img_wrap",
    animation: animation3,
    scrub: true
})

//---------------------------------------------------

/* bgc */
$(window).scroll(function () {

    // selectors
    var $window = $(window),
        $body = $('body'),
        $panel = $('.panel');

    // Change 33% earlier than scroll position so colour is there when you arrive.
    var scroll = $window.scrollTop() + ($window.height() / 3);

    $panel.each(function () {
        var $this = $(this);

        // if position is within range of this panel.
        // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
        // Remember we set the scroll to 33% earlier in scroll var.
        if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {

            // Remove all classes on body with color-
            $body.removeClass(function (index, css) {
                return (css.match(/(^|\s)color-\S+/g) || []).join(' ');
            });

            // Add class of currently active div
            $body.addClass('color-' + $(this).data('color'));
        }
    });

}).scroll();


//------------------------
// 롤링 배너 복제본 생성
let roller = document.querySelector('.rolling-list');
roller.id = 'roller1'; // 아이디 부여

let clone = roller.cloneNode(true)
// cloneNode : 노드 복제. 기본값은 false. 자식 노드까지 복제를 원하면 true 사용
clone.id = 'roller2';
document.querySelector('#page5_1').appendChild(clone); // wrap 하위 자식으로 부착

document.querySelector('#roller1').style.left = '0px';
document.querySelector('#roller2').style.left = document.querySelector('.rolling-list ul').offsetWidth + 'px';
// offsetWidth : 요소의 크기 확인(margin을 제외한 padding값, border값까지 계산한 값)

roller.classList.add('original');
clone.classList.add('clone');


let roller1 = document.querySelector('#roller1');
let roller2 = document.querySelector('#roller2');

let rollers = [roller1, roller2];

rollers.forEach(roller => {
    roller.addEventListener('mouseover', stopRolling);
    roller.addEventListener('mouseout', startRolling);
});

function stopRolling() {
    rollers.forEach(roller => {
        roller.style.animationPlayState = 'paused';
    });
}

function startRolling() {
    rollers.forEach(roller => {
        roller.style.animationPlayState = 'running';
    });
}

//--------------------------------
const photos2 =
    gsap.utils.toArray(".hong2:not(:first-child)")

gsap.set(photos2, {
    yPercent: 101
})

const animation4 = gsap.to(photos2, {
    yPercent: 0,
    duration: 1,
    stagger: 1
})

ScrollTrigger.create({
    trigger: ".sec11",
    start: "top top",
    end: "100% bottom",
    pin: ".show_img_wrap2",
    animation: animation4,
    scrub: true
})

//---------------
AOS.init();

//----------
//footer
function txt_welcome() {
    gsap.from(".welcome__div span", {
        scrollTrigger: {
            trigger: ".txt_welcome",
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: 1.9
        },
        y: (i, el) => (1 - el.getAttribute('data-speed'))
    })
}

txt_welcome();