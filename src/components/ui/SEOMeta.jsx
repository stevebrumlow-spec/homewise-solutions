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

    return () => {
      document.title = prevTitle
      if (descEl) descEl.content = ''
      if (kwEl) kwEl.content = ''
      if (ogTitleEl) ogTitleEl.content = ''
      if (ogDescEl) ogDescEl.content = ''
    }
  }, [title, description, keywords])

  return null
}
