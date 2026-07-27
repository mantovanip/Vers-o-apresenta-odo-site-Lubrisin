/*==================================================
LUBRISIN DISTRIBUIDORA DE LUBRIFICANTES
script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. HEADER SCROLL (Muda estilo ao rolar)
    // =========================================
    const header = document.querySelector("header");

    const checkScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", checkScrollHeader);
    checkScrollHeader(); // Checa na carga inicial


    // =========================================
    // 2. MENU MOBILE
    // =========================================
    const menuButton = document.getElementById("menu-mobile");
    const menu = document.querySelector("nav");
    const menuIcon = menuButton ? menuButton.querySelector("i") : null;

    const toggleMenu = () => {
        const isActive = menu.classList.toggle("active");
        menuButton.classList.toggle("active");

        // Alterna ícone entre hambúrguer (fa-bars) e fechar (fa-xmark)
        if (menuIcon) {
            if (isActive) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-xmark");
            } else {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }
    };

    const closeMenu = () => {
        if (menu && menu.classList.contains("active")) {
            menu.classList.remove("active");
            menuButton.classList.remove("active");
            if (menuIcon) {
                menuIcon.classList.remove("fa-xmark");
                menuIcon.classList.add("fa-bars");
            }
        }
    };

    if (menuButton) {
        menuButton.addEventListener("click", (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Fecha o menu ao clicar em qualquer link do menu
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Fecha o menu se o usuário clicar fora dele
    document.addEventListener("click", (e) => {
        if (menu && menu.classList.contains("active") && !menu.contains(e.target) && !menuButton.contains(e.target)) {
            closeMenu();
        }
    });


    // =========================================
    // 3. BOTÃO VOLTAR AO TOPO
    // =========================================
    const btnTop = document.getElementById("btnTop");

    window.addEventListener("scroll", () => {
        if (btnTop) {
            if (window.scrollY > 400) {
                btnTop.classList.add("show");
            } else {
                btnTop.classList.remove("show");
            }
        }
    });

    if (btnTop) {
        btnTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // =========================================
    // 4. SCROLL SUAVE PARA ANCORAS (#)
    // =========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            
            // Ignora se o href for apenas "#"
            if (href === "#") return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                // Compensa a altura do header fixo na rolagem
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    // =========================================
    // 5. ANIMAÇÃO AO ENTRAR NA TELA (Scroll Reveal)
    // =========================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
                // Para de observar o elemento após a animação rodar uma vez
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll(
        ".produto-card, .sobre-imagem, .sobre-texto, .beneficio, .timeline-item, .cta-content"
    );

    animatedElements.forEach(el => {
        el.classList.add("hidden");
        observer.observe(el);
    });


    // =========================================
    // 6. ATUALIZAÇÃO DO ANO NO FOOTER
    // =========================================
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});