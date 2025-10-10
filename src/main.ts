import './style.css';
import { Header } from "./assets/content/header";
import { Footer } from "./assets/content/footer";
import { Add_Todo } from "./assets/content/main";
import { Show_Todos } from "./assets/content/todos";
import { Admin_Panel } from "./assets/admin/admin";

const Page_Address = window.location.pathname;

function Start_DOM() {
    Header();
    Footer();
    
    // Routing logic
    switch (Page_Address.toLowerCase()) {
        case '/admin':
            Admin_Panel();
            break;
        case '/todos':
            Show_Todos();
            break;
        case '/':
        default:
            Add_Todo();
            break;
    }
    
    addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const loading = document.getElementById('loading');
            if (loading) {
                loading.style.opacity = '0';
                setTimeout(() => {
                    loading.classList.add('hidden');
                }, 500);
            }
        }, 2000);
    })
}

Start_DOM();