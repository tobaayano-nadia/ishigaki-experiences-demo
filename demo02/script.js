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

            // 移動先のID（#retreat, #activity, #taste）を取得
            const targetId = tab.getAttribute('href');

            // 対象のセクションだけを表示し、他を非表示にする
            sections.forEach(section => {
                if (`#${section.id}` === targetId) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });

            // 切り替え時にスムーズにページ上部へスクロール
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 初期状態：現在 active なタブ（最初：retreat）のセクションだけを表示
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
