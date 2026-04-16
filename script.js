const header = document.getElementById('site-header')
const heroSection = document.getElementById('hero')
const navToggle = document.getElementById('nav-toggle')
const navMobile = document.getElementById('nav-mobile')

const headerObserver = new IntersectionObserver(
  ([entry]) => header.classList.toggle('scrolled', !entry.isIntersecting),
  { threshold: 0, rootMargin: '-72px 0px 0px 0px' }
)

if (heroSection) headerObserver.observe(heroSection)

navToggle?.addEventListener('click', () => {
  const open = navMobile.classList.toggle('open')
  navToggle.classList.toggle('open', open)
  document.body.style.overflow = open ? 'hidden' : ''
})

navMobile?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navMobile.classList.remove('open')
    navToggle.classList.remove('open')
    document.body.style.overflow = ''
  })
})

const animEls = document.querySelectorAll('.fade-up, .fade-in')

const animObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('in-view')
      animObserver.unobserve(entry.target)
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
)

animEls.forEach((el, i) => {
  const siblings = el.parentElement?.querySelectorAll('.fade-up, .fade-in')
  let delay = 0
  if (siblings) {
    siblings.forEach((sib, si) => {
      if (sib === el) delay = si * 0.08
    })
  }
  el.style.transitionDelay = `${delay}s`
  animObserver.observe(el)
})

const lightbox = document.getElementById('lightbox')
const lightboxImg = document.getElementById('lightbox-img')
const lightboxClose = document.getElementById('lightbox-close')

document.querySelectorAll('.portfolio-lightbox').forEach(el => {
  el.addEventListener('click', () => {
    lightboxImg.src = el.dataset.src
    lightbox.classList.add('open')
    document.body.style.overflow = 'hidden'
  })
})

lightboxClose?.addEventListener('click', () => {
  lightbox.classList.remove('open')
  document.body.style.overflow = ''
})

lightbox?.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.classList.remove('open')
    document.body.style.overflow = ''
  }
})

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lightbox.classList.contains('open')) {
    lightbox.classList.remove('open')
    document.body.style.overflow = ''
  }
})

const form = document.getElementById('contact-form')

form?.addEventListener('submit', e => {
  e.preventDefault()
  const btn = form.querySelector('[type="submit"]')
  btn.textContent = 'Wysyłanie...'
  btn.disabled = true

  setTimeout(() => {
    form.innerHTML = `
      <div class="form-success">
        <div class="form-success-check">
          <svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3>Wiadomość wysłana</h3>
        <p>Dziękujemy za kontakt. Odezwiemy się w ciągu 24 godzin roboczych.</p>
      </div>
    `
  }, 1100)
})
