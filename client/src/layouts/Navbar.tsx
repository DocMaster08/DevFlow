
function Navbar() {
  return (
    <nav className="flex justify-between items-center h-16 px-6 border-b">
        <h1>FocusFlow</h1>
        <div className="flex gap-4">
            <p>Theme</p>
            <p>Avatar</p>
        </div>
    </nav>
  )
}

export default Navbar