document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-item');
    const sections = document.querySelectorAll('.content-container');

    // タブクリック時の切り替えイベント
    tabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            e.preventDefault();

            // すべてのタブから active クラスを削除
            tabs.forEach(t => t.classList.remove('active'));
            // クリックされたタブに active クラスを追加
            tab.classList.add('active');

            // クリックされたタブの移動先（#retreat など）を取得
            const targetId = tab.getAttribute('href');

            // すべてのセクションを一旦非表示にして、対象だけを表示
            sections.forEach(section => {
                if (`#${section.id}` === targetId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            // ページ最上部へ戻るスクロール（必要に応じて）
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 初期状態：最初のタブ（retreat）以外を非表示にする
    const activeTab = document.querySelector('.tab-item.active');
    if (activeTab) {
        const initialTarget = activeTab.getAttribute('href');
        sections.forEach(section => {
            if (`#${section.id}` === initialTarget) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }
});
