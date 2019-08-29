import anime from 'animejs';

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

  title.style.opacity = 1;
  tl.add({
    targets: title.querySelectorAll('.line'),
    translateY: '0%',
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
  item.style.opacity = 1;
  tl.add(
    {
      targets: itemSpan,
      translateY: 0,
      opacity: 1,
      duration: 600,
      delay: 600,
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

const lineboy = (function() {
  const lineboys = Array.from(document.querySelectorAll('[data-lineboy]'));

  lineboys.forEach(lineboy => {
    const clone = lineboy.cloneNode(true);

    const tl = anime.timeline({
      easing: 'easeInOutSine',
      autoplay: false,
      complete(anim) {
        cleanup(lineboy, clone);
      },
    });

    if (isHeader(lineboy.tagName)) {
      titleManagement(lineboy, tl);
    } else {
      otherManagement(lineboy, tl);
    }

    let observer = new IntersectionObserver(
      function(entries, self) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Stop watching and load the image
            playAnimation(tl);
            self.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '500px',
        threshold: 0,
      },
    );

    observer.observe(lineboy);
  });
})();
