// Footer
export function Footer() {
    const FooterElement: HTMLElement | null = document.querySelector('footer');
    if (FooterElement) {
        FooterElement.classList.add('bg-gray-800', 'text-white', 'p-4', 'mt-auto');
        FooterElement.innerHTML = `
            <div class="max-w-4xl mx-auto text-center text-sm">
                Created By Mehrzad_nkz | © 2025
            </div>
        `;
    }
}