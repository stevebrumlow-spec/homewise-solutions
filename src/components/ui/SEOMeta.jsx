import { useEffect } from 'react'

export default function SEOMeta({ title, description, keywords }) {
  useEffect(() => {
    const prevTitle = document.title
    document.title = title

    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
      el.content = content
      return el
    }
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el) }
      el.content = content
      return el
    }

    const descEl = description ? setMeta('description', description) : null
    const kwEl = keywords ? setMeta('keywords', keywords) : null
    const ogTitleEl = setOG('og:title', title)
    const ogDescEl = description ? setOG('og:description', description) : null
    const url = `https://homewisesolutionsga.com${window.location.pathname}`
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url
    setOG('og:url', url)
    setOG('og:type', 'website')
    setOG('og:image', 'https://homewisesolutionsga.com/images/kitchen-after-1280.webp')

    return () => {
      document.title = prevTitle
      if (descEl) descEl.content = ''
      if (kwEl) kwEl.content = ''
      if (ogTitleEl) ogTitleEl.content = ''
      if (ogDescEl) ogDescEl.content = ''
      canonical.remove()
    }
  }, [title, description, keywords])

  return null
}
