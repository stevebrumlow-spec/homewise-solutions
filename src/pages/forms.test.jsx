// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact from './Contact'
import Estimate from './Estimate'

beforeEach(() => {
  // jsdom has no viewport; form behavior does not depend on scroll animations.
  vi.stubGlobal('IntersectionObserver', class {
    observe() {}
    unobserve() {}
    disconnect() {}
  })
})
afterEach(() => { cleanup(); vi.unstubAllGlobals() })

describe.each([
  ['Contact', Contact, 'Send Message', 'Message Sent!'],
  ['Estimate', Estimate, 'Submit Estimate Request', 'Estimate Request Received!'],
])('%s lead form', (_name, Page, button, success) => {
  async function fillForm() {
    const user = userEvent.setup()
    const { container } = render(<Page />)
    await user.type(container.querySelector('[name="name"]'), 'Test Customer')
    await user.type(container.querySelector('[name="phone"]'), '5551234567')
    await user.type(container.querySelector('[name="email"]'), 'test@example.com')
    await user.selectOptions(container.querySelector('[name="service"]'), 'painting')
    await user.type(container.querySelector('textarea'), 'Repair the kitchen ceiling')
    return { user, container }
  }

  it.each(['rejected', 'offline'])('preserves the inquiry after %s submission and allows a successful retry', async (failure) => {
    let attempts = 0
    vi.stubGlobal('fetch', async () => {
      attempts++
      if (attempts === 1 && failure === 'offline') throw new TypeError('Network unavailable')
      return new Response(null, { status: attempts === 1 ? 422 : 200 })
    })
    const { user, container } = await fillForm()
    await user.click(screen.getByRole('button', { name: button }))
    await waitFor(() => expect(screen.getByText(/Something went wrong/)).toBeTruthy())
    expect(screen.queryByText(success)).toBeNull()
    expect(container.querySelector('textarea').value).toBe('Repair the kitchen ceiling')
    await user.click(screen.getByRole('button', { name: button }))
    await waitFor(() => expect(screen.getByText(success)).toBeTruthy())
  })

  it('waits for acceptance before confirming the inquiry', async () => {
    let accept
    vi.stubGlobal('fetch', () => new Promise(resolve => { accept = resolve }))
    const { user } = await fillForm()
    await user.click(screen.getByRole('button', { name: button }))
    expect(screen.getByRole('button', { name: 'Sending...' }).disabled).toBe(true)
    expect(screen.queryByText(success)).toBeNull()
    accept(new Response(null, { status: 200 }))
    await waitFor(() => expect(screen.getByText(success)).toBeTruthy())
  })
})
