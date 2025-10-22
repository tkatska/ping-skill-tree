// Smoke test to verify the shell renders and the app is mounted.
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../src/App'

describe('App smoke', () => {
  it('renders header', () => {
    render(<App />)
    expect(screen.getByText(/Skill Tree Builder/i)).toBeInTheDocument()
  })
})
