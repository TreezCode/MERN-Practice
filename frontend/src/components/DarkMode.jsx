import '../DarkMode.css'

const setDark = () => {
  localStorage.setItem('theme', 'dark')
  document.documentElement.setAttribute('data-theme', 'dark')
}

const setLight = () => {
  localStorage.setItem('theme', 'light')
  document.documentElement.setAttribute('data-theme', 'light')
}

// Check and store user theme preference
const storedTheme = localStorage.getItem('theme')
const prefersDark =
  window.matchMedia && window.matchMedia('prefers-color-scheme: dark').matches
const defaultDark =
  storedTheme === 'dark' || (storedTheme === null && prefersDark)
if (defaultDark) {
  setDark()
}

const toggleTheme = (e) => {
  if (e.target.checked) {
    setDark()
  } else {
    setLight()
  }
}

function DarkMode() {
  return (
    <section className="dark-mode">
      <span>☀️ </span>
      <input
        type="checkbox"
        name="switch"
        id="switch"
        onChange={toggleTheme}
        defaultChecked={defaultDark}
      />
      <label htmlFor="switch"></label>
      <span> 🌘</span>
    </section>
  )
}

export default DarkMode
