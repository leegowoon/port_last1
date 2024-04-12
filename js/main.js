
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


AOS.init();
//-------------------------------------------------------------------------

let s = skrollr.init();
window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || window.scrollY;
    document.querySelector(".scrollTop").innerText = parseInt(scrollTop);
});

//-------------------------------------------------------------------------

var rellax = new Rellax('.rellax');

ScrollOut({
    threshold: .2,
    // once: true
});


//-------------------------------------------------------------------------
// 메인메뉴
let navs = document.querySelectorAll('nav ul li a');

navs.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        e.preventDefault(); 
        document.querySelector(element.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        })

    })
})

// 영역으로 이동하면 그에 해당하는 메뉴에 클래스명을 추가하기
window.addEventListener("scroll", () => {
    let scrollTop = window.scrollY;

    const parallaxItem = document.querySelectorAll('.cont_item');
    const parallaxNav = document.querySelectorAll('nav ul li');

    parallaxItem.forEach((element, index) => {
        if (scrollTop >= element.offsetTop - 200) {
            parallaxNav.forEach((li) => {
                li.classList.remove('active')
            })
            parallaxNav[index].classList.add('active')
        }
    })
})

//-------------------------------------------------------------------------
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

//-------------------------------------------------------------------------
/* spline */
/* let spline = document.querySelector(".spline");

gsap.timeline({
    scrollTrigger: {
        trigger: spline,
        start: "top top",
        end: "190% bottom",
        scrub: 5,
        pin: true,
    },
}) */


//-----------------------------------------------------------------

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


//-----------------------------------------------------------------

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
            roundProps: "innerText"
        })
    })
}

//--------------------------------------------------

function animateSkills(){
    //console.log("실행")
    document.querySelectorAll('.skill-per').forEach((perElement)=>{
        gsap.to(perElement,{
            duration:2,
            width:perElement.getAttribute('per') + "%",
            onUpdate:function(){
                console.log(perElement.style.width)
                perElement.setAttribute('per',Math.ceil(this.progress() * parseInt(perElement.style.width)) + "%"); //this는 화살표함수X
            }
        })
    })
}

ScrollTrigger.create({
    trigger:".main3",
    start:"top 50%",
    onEnter:()=>{
        animateSkills();
    }
})

//숫자로 변경하기
//Number(문자화된 숫자) --> Number("10.02") => 10.02
//parseInt(문자화된 숫자) --> parseInt("10.02") => 10 //parseInt : 숫자를 정수로 (parse:바꿔라Int:정수)


//--------------------------------------------------
const photos =
    gsap.utils.toArray(".slide:not(:first-child)")

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

    var scroll = $window.scrollTop() + ($window.height() / 3);

    $panel.each(function () {
        var $this = $(this);

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


// ------------------------------------------------
// 롤링 배너 복제본 생성
let roller = document.querySelector('.rolling-list');
roller.id = 'roller1';

let clone = roller.cloneNode(true)
// cloneNode : 노드 복제. 기본값은 false. 자식 노드까지 복제를 원하면 true 사용
clone.id = 'roller2';
document.querySelector('#page3_1').appendChild(clone); // wrap 하위 자식으로 부착

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

//----------------------------------------------------------------
const photos2 =
    gsap.utils.toArray(".slide2:not(:first-child)")

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

//-----------------------------------------------


//-----------------------------------------------

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

