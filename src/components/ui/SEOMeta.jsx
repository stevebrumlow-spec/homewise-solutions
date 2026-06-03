import { useEffect } from 'react'

export default function SEOMeta({ title, description, keywords }) {
  useEffect(() => {
    document.title = title
    const setMeta = (name, content) => {
      let el = document.querySelector(`meta[name="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.name = name; document.head.appendChild(el) }
      el.content = content
    }
    const setOG = (prop, content) => {
      let el = document.querySelector(`meta[property="${prop}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute('property', prop); document.head.appendChild(el) }
      el.content = content
    }
    if (description) { setMeta('description', description); setOG('og:description', description) }
    if (keywords) setMeta('keywords', keywords)
    setOG('og:title', title)
  }, [title, description, keywords])

  return null
}
