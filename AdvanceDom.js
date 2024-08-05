"use strict";
// Modal window
////////////////////////////////////////////////////////////////////////////////////////////////////     :    [PROJECT WEBSITE ]
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener("click", openModal); // Instead we do : == >

// Click to open Model : == >
btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

// Close Model : >
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);
// press Escape to Close Model : ==>
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// Btn / Selecting Dom  :== >
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const navLinks = document.querySelector(".nav__links");

// Click The Learn More Button to MOve page Down : ==  >
btnScrollTo.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

// adding smooth behavior to nav-links : == >
navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  // Matching Strategy ..
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Building Tabbed Component : ---->
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

// Event Delegation : == >
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //   console.log(clicked);
  // Gaurd clause ...  Ignore clicks when result is null :
  if (!clicked) return; // when we have null (falsey value) then !clicked(not Falsey) will become true  :> and none of the code that's after it will be executed..
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  tabsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );

  // Activate Content-area : == >
  //   console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

//

//  Menu Fade Animation .... ==>  Navigation : >
const handleHover = function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector(".nav__logo");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// __________________ STICKY NAVIGATION ........ THE SCROLL EVENT =>
// << ========== : By Using :> The Intersection Observer API : ============= >>
const header = document.querySelector(".header");
// ... Calculating height dynamically ...
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  //   console.log(entry);
  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
}; // if nav is intersacting then add sticky class else remove .. >

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // cuz we are intrested in the entire viewPort ..
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

////////////////////////////////////////////////////////////////// ==>

// << ---------- : REVEALING ELEMENTS ON SCROLL : ==================>>
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return; // ... If not intersecting then return  right Away ...
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // full viewport
  threshold: 0.15, // something above > 0
});
allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//

// < ------------------------ : BUILDING SLIDER COMPONENT : PART 1  : ------------======= >
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnRight = document.querySelector(".slider__btn--right");
  const btnLeft = document.querySelector(".slider__btn--left");
  const dotContainer = document.querySelector(".dots");
  const maxSlide = slides.length;
  let curSlide = 0;

  // slider.style.transform = "scale(0.4) translateX(-800px)";
  // slider.style.overflow = `visible`;

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

  //  --------------------- : Functions  : ---------------------------- //
  /// Creating Dots = >
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>;`
      );
    });
  };

  const activateDots = function (slide) {
    document
      .querySelectorAll(`.dots__dot`) //  removing active from all dots...
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    //  ... then we will add it on the one that we are intrested in ...
    // Selecting the dot which we actually want by using : (data attribute ) =>
    document
      .querySelector(`.dots__dot[data-slide='${slide}']`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    // slide  equals to => 0 / curSlide = 0;
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    ); // 0%, 100%, 200%
  };
  // goToSlide(curSlide);

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      //  if we are at maxSlide or (cur = maxSlide) then we want the curSlide to become 0 again...
      // length is not 0 based so we subtract 1 :
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
      // if curSide equals to 0 then curSlide will be eal to max Slide ...
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDots(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();
    activateDots(0);
  };
  init();
  //  <<  --------------  :  FUNCTION  : -- END =________________________  >>
  // Event-handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  // <<<<----------------------------- : BUILDING SLIDER COMPONENT : PART 2 : ==========================================  ________ >>>>
  document.addEventListener("keydown", function (e) {
    console.log(e);
    if (e.key === "ArrowLeft") prevSlide();
    // Doing ShortCircuiting ...
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // const slide  = e.target.dataset.slide;
      const { slide } = e.target.dataset; // destructuring ...
      goToSlide(slide);
      activateDots(slide);
    }
  });
};
slider();
