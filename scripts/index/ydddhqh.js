// 移动端导航栏切换
(function () {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // 点击汉堡切换菜单显示
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function (e) {
            e.preventDefault();
            mobileMenu.classList.toggle('show');
        });

        // 点击页面其他区域关闭菜单（可选）
        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.remove('show');
            }
        });

        // 窗口大小改变时，如果变为大屏，强制隐藏移动菜单
        window.addEventListener('resize', function () {
            if (window.innerWidth > 1100) {
                mobileMenu.classList.remove('show');
            }
        });
    }

    // 移动端子菜单交互
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // 阻止跳转，仅用于展开子菜单
            const parent = this.closest('.mobile-nav-item');
            const submenu = parent.querySelector('.mobile-submenu');
            const isActive = this.classList.contains('active');

            // 可选：关闭其他所有子菜单（如果需要一次只展开一个）
            document.querySelectorAll('.mobile-nav-link.active').forEach(activeLink => {
                if (activeLink !== this) {
                    activeLink.classList.remove('active');
                    const otherSub = activeLink.closest('.mobile-nav-item').querySelector('.mobile-submenu');
                    if (otherSub) otherSub.classList.remove('show');
                }
            });

            // 切换当前子菜单
            this.classList.toggle('active');
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });
})();