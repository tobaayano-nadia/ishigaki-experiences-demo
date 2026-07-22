document.addEventListener('DOMContentLoaded', () => {
    const cardItems = document.querySelectorAll('.card-item');
    const modalContainer = document.getElementById('modal-container');
    const modalClose = document.getElementById('modal-close');
    
    const modalImg = document.getElementById('modal-img');
    const modalTime = document.getElementById('modal-time');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');

    // パネルタップ/クリックでモーダル開く
    cardItems.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const time = card.getAttribute('data-time');
            const desc = card.getAttribute('data-desc');
            const imgSrc = card.getAttribute('data-img');
            const tagsStr = card.getAttribute('data-tags');
            const linkHref = card.getAttribute('data-link');

            // データ反映
            modalImg.src = imgSrc;
            modalTitle.textContent = title || '';
            modalTime.textContent = time || '';
            modalDesc.textContent = desc || '';

            // タグの動的生成
            modalTags.innerHTML = '';
            if (tagsStr) {
                const tagsArray = tagsStr.split(',');
                tagsArray.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'modal-tag-chip';
                    span.textContent = tag.trim();
                    modalTags.appendChild(span);
                });
            }

            // リンクボタン
            if (linkHref) {
                modalLink.href = linkHref;
                modalLink.style.display = 'inline-flex';
            } else {
                modalLink.style.display = 'none';
            }

            // モーダル表示
            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden'; // 背景スクロール制御
        });
    });

    // モーダル閉じる
    const closeModal = () => {
        modalContainer.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);

    // モーダルの外側タップで閉じる
    modalContainer.addEventListener('click', (e) => {
        if (e.target === modalContainer) {
            closeModal();
        }
    });

    // ESCキー対応
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
            closeModal();
        }
    });
});
