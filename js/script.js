document.addEventListener("DOMContentLoaded", function () {
    // Activate Bottom Navbar
    loadNav();

    function loadNav() {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status !== 200) return;

                // Daftarkan event listener untuk setiap tautan menu
                document.querySelectorAll(".tombol-nav").forEach(function (elm) {
                    elm.addEventListener("click", function (event) {
                        // Muat konten halaman yang dipanggil
                        let page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };
        xhttp.open("GET", "index.html", true);
        xhttp.send();
    }

    // Load page content
    let page = window.location.hash.substr(1);
    if (page === "") page = "home";
    loadPage(page);

    function loadPage(page) {
        let xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                let content = document.querySelector("#body-content");
                if (this.status == 200) {
                    if (page === 'favorite') {
                        getSavedFavorite();
                    }
                    content.innerHTML = xhttp.responseText;
                } else if (this.status == 404) {
                    content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
                } else {
                    content.innerHTML = "<p>Ups.. halaman tidak dapat diakses.</p>";
                }
            }
        };
        xhttp.open("GET", "pages/" + page + ".html", true);
        xhttp.send();
    }
});