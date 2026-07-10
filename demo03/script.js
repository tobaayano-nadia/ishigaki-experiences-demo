document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('.content-container');

    // スクロール位置に応じてアクティブなナビゲーションメニューの下線を切り替える（スクロールスパイ）
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 画面上部から少しオフセット（200px）を持たせてアクティブ判定
            if (window.scrollY >= sectionTop - 200) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            tabs.forEach(tab => {
                tab.classList.remove('active');
                if (tab.getAttribute('href') === `#${currentSectionId}`) {
                    tab.classList.add('active');
                }
            });
        }
    });
});
