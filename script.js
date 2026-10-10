
document.addEventListener("DOMContentLoaded", function () {
    const pageSections = document.querySelectorAll(".page-section");
    const pageLinks = document.querySelectorAll("[data-page]");
    const navLinks = document.querySelectorAll(
        ".nav-menu > .nav-link, .nav-dropdown > .nav-link"
    );

    const menuButton = document.getElementById("menuButton");
    const navMenu = document.getElementById("navMenu");
    const currentYear = document.getElementById("currentYear");

    // Display the selected page
    function showPage(pageId) {
        const targetPage = document.getElementById(pageId);

        if (
            !targetPage ||
            !targetPage.classList.contains("page-section")
        ) {
            pageId = "home";
        }

        pageSections.forEach(function (section) {
            section.classList.toggle(
                "active-page",
                section.id === pageId
            );
        });

        navLinks.forEach(function (link) {
            link.classList.toggle(
                "active",
                link.dataset.page === pageId
            );
        });

        // Close mobile menu
        if (navMenu && menuButton) {
            navMenu.classList.remove("show-menu");
            menuButton.setAttribute("aria-expanded", "false");
        }

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Handle navigation links and Home cards
    pageLinks.forEach(function (link) {
        link.addEventListener("click", function (event) {
            const pageId = link.dataset.page;

            if (!pageId) {
                return;
            }

            event.preventDefault();

            if (window.location.hash !== "#" + pageId) {
                history.pushState(
                    { page: pageId },
                    "",
                    "#" + pageId
                );
            }

            showPage(pageId);
        });
    });

    // Mobile menu toggle
    if (menuButton && navMenu) {
        menuButton.addEventListener("click", function () {
            const isOpen = navMenu.classList.toggle("show-menu");

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );
        });
    }

    // Browser Back and Forward buttons
    window.addEventListener("popstate", function () {
        const pageId = window.location.hash.substring(1) || "home";
        showPage(pageId);
    });

    // Current year in footer
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Always open Home first when the website loads
    history.replaceState(
        { page: "home" },
        "",
        window.location.pathname + window.location.search
    );

    showPage("home");
});
