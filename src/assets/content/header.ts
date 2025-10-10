// Header
export function Header() {
    const headerElement: HTMLElement | null = document.querySelector("header");
    if (headerElement) {
        headerElement.classList.add('bg-blue-600', 'text-white', 'p-4', 'shadow-md');
        headerElement.innerHTML = `
            <div class="max-w-4xl mx-auto flex justify-between items-center">
                <h1 class="text-xl font-bold">📝 Todo App</h1>
                <nav>
                    <a href="/" class="mx-2 px-4 py-2 border border-transparent rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">Home</a>
                    <a href="Admin" class="mx-2 px-4 py-2 border border-transparent rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300">Admin Panel</a>
                </nav>
            </div>
        `;
    }
}