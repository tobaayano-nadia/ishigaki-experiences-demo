// クリックされたタブの下線をアクティブにする関数
function activateTab(type) {
    document.querySelectorAll('.tab-item').forEach(tab => {
        tab.classList.remove('active');
    });
    const targetTab = document.getElementById('tab-' + type);
    if (targetTab) {
        targetTab.classList.add('active');
    }
}

// 各タブボタンにクリックイベントを設定
document.getElementById('tab-stay').addEventListener('click', function() {
    activateTab('stay');
});

document.getElementById('tab-explore').addEventListener('click', function() {
    activateTab('explore');
});

// スクロール位置を監視して、自動でタブの下線を切り替える制御
window.addEventListener('scroll', () => {
    const staySection = document.getElementById('stay');
    const exploreSection = document.getElementById('explore');
    
    if (staySection && exploreSection) {
        const scrollPos = window.scrollY + 200;

        if (scrollPos >= exploreSection.offsetTop) {
            activateTab('explore');
        } else {
            activateTab('stay');
        }
    }
});
