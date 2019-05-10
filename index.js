import anime from 'animejs';
import { ElementObserver } from 'viewprt';

const isHeader = tagName => {
  if (tagName === 'P') {
    return false;
  }
  if (tagName === 'H1' || 'H2' || 'H3' || 'H4' || 'H5' || 'H6') {
    return true;
  }
};

const titleManagement = (title, tl) => {
  const current = title;
  const text = current.innerHTML;
  const words = text.split(' ');
  current.innerHTML = words[0];
  let height = current.offsetHeight;
  current.innerHTML = '';
  const array = [];
  let linestart = 0;

  words.forEach((word, index) => {
    current.innerHTML = `${current.innerHTML} ${words[index]}`;
    if (current.offsetHeight > height) {
      height = current.offsetHeight;
      array.push(words.slice(linestart, index));
      linestart = index;
    }
  });

  array.push(words.slice(linestart, words.length));

  title.innerHTML = '';

  array.forEach((text, index) => {
    const outerSpan = document.createElement('div');
    outerSpan.classList.add('outerSpan');
    const line = document.createElement('div');
    line.innerHTML = text.join(' ');
    line.classList.add(`line`);
    line.classList.add(`line--${index}`);
    line.style.opacity = 0;
    line.style.transform = 'translateY(100%)';
    outerSpan.appendChild(line);
    title.appendChild(outerSpan);
  });

  tl.add({
    targets: title.querySelectorAll('.line'),
    translateY: 0,
    opacity: 1,
    delay: anime.stagger(200),
    duration: 600,
    easing: 'easeInOutSine',
  });
};

const otherManagement = (item, tl) => {
  const itemSpan = document.createElement('div');
  const clone = item.cloneNode(true);
  itemSpan.innerHTML = clone.innerHTML;
  itemSpan.style.transform = 'translateY(2rem)';
  itemSpan.style.opacity = 0;
  itemSpan.style.display = 'block';
  item.style.display = 'block';
  item.innerHTML = '';
  item.appendChild(itemSpan);

  tl.add(
    {
      targets: itemSpan,
      translateY: 0,
      opacity: 1,
      duration: 600,
      easing: 'easeInOutSine',
    },
    '-=100',
  );
};

const cleanup = (lineboy, clone) => {
  lineboy.innerHTML = clone.innerHTML;
};

const playAnimation = tl => {
  tl.play();
};

const lineboy = () => {
  const lineboys = Array.from(document.querySelectorAll('.lineboy'));
  lineboys.forEach(lineboy => {
    const clone = lineboy.cloneNode(true);
    const tl = anime.timeline({
      easing: 'easeInOutSine',
      duration: 400,
      autoplay: false,
      complete(anim) {
        cleanup(lineboy, clone);
      },
    });
    const contents = Array.from(lineboy.children);
    contents.forEach(item => {
      if (isHeader(item.tagName)) {
        titleManagement(item, tl);
      } else {
        otherManagement(item, tl);
      }
    });

    const elementObserver = ElementObserver(lineboy, {
      onEnter(element, viewport) {
        playAnimation(tl);
      }, // callback when the element enters the viewport
      offset: 0, // offset from the edges of the viewport in pixels
      once: true, // if true, observer is detroyed after first callback is triggered
    });
  });
};
export { lineboy };
