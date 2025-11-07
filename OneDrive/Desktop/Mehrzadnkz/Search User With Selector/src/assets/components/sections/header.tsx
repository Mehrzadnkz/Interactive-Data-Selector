import "../../../index.css";

function Header() {

    function change_theme(clicked?: boolean) {
        const currentTheme = localStorage.getItem("Theme");
        const btn = document.getElementById('change-theme-btn');

        if (currentTheme === 'dark') {
            if (clicked == true) {
                document.body.className = 'light';
                localStorage.setItem("Theme", "light");
            }
            btn!.innerText = "🌙";
        } else {
            if (clicked == true) {
                document.body.className = 'dark';
                localStorage.setItem("Theme", "dark");
            }
            btn!.innerText = "☀️";
        }
    }

    function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
        const event = new CustomEvent('userSearch', { detail: e.target.value });
        window.dispatchEvent(event);
    }
    
    return (
    <>
        <div className="flex justify-around gap-5 items-center min-w-dvw">
            <h1 className="text-2xl">نمایش کاربر ها</h1>
            <input 
                type="search" 
                name="search" 
                id="search-input" 
                className="border-2 rounded-xl py-1.5 px-3 w-96" 
                placeholder="جستجو. . . . ."
                onInput={handleSearchInput}
            />
            <button type="button" id="change-theme-btn" className="p-2 rounded-xl hover:scale-110 bg-transparent!" onClick={() => change_theme(true)}>🌓</button>
        </div>
    </>
  )
}

export default Header;