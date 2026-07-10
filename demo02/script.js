document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('.content-container');

    // 画面のスクロール位置に応じて、上部メニューのアクティブ下線を自動で切り替える
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 判定位置を画面中央〜やや上部に合わせるためのオフセット（200px）
            if (window.scrollY >= sectionTop - 200) {
                currentSectionId = section.getAttribute('id');
            }
        });

        // 該当するセクションのメニューにだけ .active クラス（黒い下線）を付与する
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
