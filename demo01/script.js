document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------
    // 1. モーダル機能の制御
    // --------------------------------------------------
    const cardItems = document.querySelectorAll('.card-item');
    const modalContainer = document.getElementById('modal-container');
    const modalClose = document.getElementById('modal-close');
    
    const modalImg = document.getElementById('modal-img');
    const modalTime = document.getElementById('modal-time');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalLink = document.getElementById('modal-link');

    cardItems.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const time = card.getAttribute('data-time');
            const desc = card.getAttribute('data-desc');
            const imgSrc = card.getAttribute('data-img');
            const tagsStr = card.getAttribute('data-tags');
            const linkHref = card.getAttribute('data-link');

            modalImg.src = imgSrc;
            modalTitle.textContent = title || '';
            modalTime.textContent = time || '';
            modalDesc.textContent = desc || '';

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

            if (linkHref) {
                modalLink.href = linkHref;
                modalLink.style.display = 'inline-flex';
            } else {
                modalLink.style.display = 'none';
            }

            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        modalContainer.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalContainer) {
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer && modalContainer.classList.contains('active')) {
            closeModal();
        }
    });

    // --------------------------------------------------
    // 2. 自動横スクロール（自動カルーセルアニメーション）
    // --------------------------------------------------
    const cardGrids = document.querySelectorAll('.card-grid');

    cardGrids.forEach(grid => {
        let isUserInteracting = false;
        let scrollTimer = null;

        const autoScroll = () => {
            if (isUserInteracting) return;

            const firstCard = grid.querySelector('.card-item');
            if (!firstCard) return;

            // カード1枚の幅 + カノジョの間隔(gap=16px)のスクロール移動量
            const cardWidth = firstCard.offsetWidth + 16;
            const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

            // スクロール位置が右端に達した場合は先頭（0）へ戻し、それ以外は1枚分右へ移動
            if (grid.scrollLeft >= maxScrollLeft - 10) {
                grid.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                grid.scrollBy({ left: cardWidth, behavior: 'smooth' });
            }
        };

        // 3.5秒（3500ms）ごとに自動スクロールを実行
        let autoScrollInterval = setInterval(autoScroll, 3500);

        // ユーザーが手動スクロール・スワイプした際は自動スライドを一時停止
        grid.addEventListener('touchstart', () => { isUserInteracting = true; }, { passive: true });
        grid.addEventListener('mouseenter', () => { isUserInteracting = true; });

        grid.addEventListener('mouseleave', () => {
            isUserInteracting = false;
        });

        grid.addEventListener('touchend', () => {
            clearTimeout(scrollTimer);
            scrollTimer = setTimeout(() => {
                isUserInteracting = false;
            }, 4000); // 手動スワイプ後、4秒間操作がなければ自動スライドを再開
        }, { passive: true });
    });
});
