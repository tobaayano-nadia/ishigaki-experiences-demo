document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('.content-container');

    // スクロール位置を感知して、上部メニューのアクティブ下線を切り替える（スクロールスパイ）
    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // メニュー切り替えの判定タイミング（画面上部から200px）
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
