class JJCarousel extends HTMLElement {
  constructor() {
    super();
    console.log('JJCarousel Initialized');
    this.slideIndex = 1;
  }

  connectedCallback() {
    let ret = [];
    let count = this.children.length;
    for (let i = 0; i < count; i++) {
      const elm = this._wrapChild(this.children.item(0));
      ret.push(elm);
    }
    this.classList.add('carousel');
    this.classList.add('slide');
    this.dataset.ride = 'carousel';

    ret.forEach((item, i) => {
      this.appendChild(item);
    });
    this._createControls();
    this._showSlides(this.slideIndex);
  }
  _wrapChild(child) {
    const container = document.createElement('div');
    container.classList.add('item');
    container.appendChild(child);
    return container;
  }
  _createControls() {
    const prev = this._createControl('prev');
    prev.innerHTML = `&#10094;`;
    prev.addEventListener('click', () => this._plusSlides(-1));
    const next = this._createControl('next');
    next.innerHTML = `&#10095;`;
    next.addEventListener('click', () => this._plusSlides(1));
    [prev, next].forEach((item) => this.appendChild(item));
  }
  _createControl(direction) {
    const elm = document.createElement('a');
    elm.setAttribute('href', '#' + this.id);
    elm.classList.add(direction);
    elm.classList.add('carousel-control');
    return elm;
  }

  _showSlides(n) {
    let i;
    let slides = this.querySelectorAll(':scope .item');
    // let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = 'none';
    }
    // for (i = 0; i < dots.length; i++) {
    //   dots[i].className = dots[i].className.replace(" active", "");
    // }
    slides[this.slideIndex - 1].style.display = 'block';
    // dots[slideIndex-1].className += " active";
  }
  _plusSlides(n) {
    this._showSlides((this.slideIndex += n));
  }
}

const initElements = () => {
  customElements.define('jj-carousel', JJCarousel);
};
