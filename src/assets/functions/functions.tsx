import { type Tloading } from "../types/type";

export function loading(Type:Tloading, path?:string): void {
    const site_title = document.title;
    document.title = "Loading...";
    const loadingdiv = document.querySelector("#Loading") as HTMLElement;
    if (!loadingdiv) return;
    loadingdiv.classList.remove("hidden");
    
    const loadingclass1 = "w-dvw h-dvh flex items-center";
    const loadingclass2 = "min-w-3/4 shadow-xl flex flex-row items-center justify-between py-10 px-30";

    function Starter() {
        if (!loadingdiv) return;

        loadingdiv.innerHTML = `
            <div class="${loadingclass1} justify-start">
                <div class="${loadingclass2}">
                    <div>
                        <h1 class="text-2xl" id="loading-title">در حال گرفتن اطلاعات دستگاه شما . . . .</h1>
                        <h2 class="text-xl">لطفا صبر کنید...</h2>
                    </div>
                    <div class="border-4 border-sky-700 dark:border-sky-400 dark:border-b-transparent border-b-transparent rounded-full w-10 h-10t animate-spin"></div>
                </div>
            </div>
        `;
        setTimeout(() => {
            document.getElementById("loading-title")!.innerHTML = "در حال ارسال اطلاعات شما به سرور . . . ";
            setTimeout(() => {
                document.getElementById("loading-title")!.innerHTML = `در حال بررسی اطلاعات شما . . .`;
                setTimeout(() => {
                    document.getElementById("loading-title")!.innerHTML = `اطلاعات شما تایید شد ✅ `;
                    setTimeout(() => {
                        loadingdiv.classList.add("fade-out");
                        setTimeout(() => {
                            loadingdiv.classList.add("hidden");
                            loadingdiv.classList.remove("fade-out");
                            localStorage.setItem("Checked", "true");
                            setTimeout(() => {
                                document.title = site_title;
                            }, 1500);
                            setTimeout(() => {
                                localStorage.removeItem("Checked");
                            }, 900000);
                        }, 100);
                    }, 1500);
                }, 5000);
            }, 4000);
        }, 3500);
    }

    function Page(path?: string) {
        if (!loadingdiv) return;
        let Page:string;
        switch (path?.toLowerCase()) {
            case "account":
                Page = "پروفایل";
                break;
            case "settings":
                Page = "تنظیمات";
                break;
            case "/":
            case "home":
                Page = "اصلی";
                break;
            default:
                Page = "اصلی";
                break;
        }
            loadingdiv.innerHTML = `
                <div class="${loadingclass1} justify-start">
                    <div class="${loadingclass2}">
                        <div>
                            <h1 class="text-2xl" id="loading-title">در حال انتقال شما به صفحه ${Page}</h1>
                            <h2 class="text-xl">لطفا صبر کنید...</h2>
                        </div>
                        <div class="border-4 border-sky-700 dark:border-sky-400 dark:border-b-transparent border-b-transparent rounded-full w-10 h-10  animate-spin"></div>
                    </div>
                </div>
            `;

                setTimeout(() => {
                    loadingdiv.classList.add("fade-out");
                    setTimeout(() => {
                        loadingdiv.classList.add("hidden");
                        loadingdiv.classList.remove("fade-out");
                        setTimeout(() => {
                            document.title = site_title;
                        }, 1500);
                        if (path) {
                            window.location.pathname = path;
                        }
                    }, 100);
                }, 1500);
    }

    function space_loading() {
        if (!loadingdiv) return;
            loadingdiv.innerHTML = `
                <div class="${loadingclass1} justify-center">
                    <div class="border-5 border-sky-700 dark:border-sky-400 dark:border-b-transparent border-b-transparent rounded-full p-5 animate-spin"></div>
                </div>
            `;
            setTimeout(() => {
                loadingdiv.classList.add("fade-out");
                setTimeout(() => {
                    loadingdiv.classList.add("hidden");
                    loadingdiv.classList.remove("fade-out");
                    setTimeout(() => {
                        document.title = site_title;
                    }, 1500);
                }, 100);
            }, 3500);
    }

    switch (Type.toLowerCase()) {
        case "starter":
            Starter();
            break;
        case "page":
            Page(path);
            break;
        case "loading":
            space_loading();
            break;
    }
}

export function card(id:number,username:string,ip:string,phone:string) {

    return(
    <>
        <div className="w-1/2 border-2 rounded-xl p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-bold mb-2">آیدی : {id}</h2>
            <p className="text-base">نام کاربری : {username}</p>
            <p className="text-base">شماره تلفن کاربر : {phone}</p>
            <p className="text-base">آدرس آی پی کاربر : {ip}</p>
        </div>
    </>
)}