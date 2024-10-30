document.addEventListener('DOMContentLoaded', function() {
    // スムーズスクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // プライバシーポリシー同意チェックボックスと送信ボタンの制御
    const consentCheckbox = document.getElementById('privacy-consent');
    const submitButton = document.getElementById('submit-button');

    if (consentCheckbox && submitButton) {
        consentCheckbox.addEventListener('change', function() {
            submitButton.disabled = !this.checked;
        });
    }

    // お問い合わせフォームの送信
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('お問い合わせありがとうございます。まもなくご連絡いたします。');
            this.reset();
            if (consentCheckbox && submitButton) {
                consentCheckbox.checked = false;
                submitButton.disabled = true;
            }
        });
    }

    // ヒーローセクションのアニメーション
    function startHeroAnimation() {
        const heroElements = document.querySelectorAll('.hero-animation');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 500);
        });
    }

    setTimeout(startHeroAnimation, 200);

    // ヒーローセクションのマウス追従カーソルと波紋エフェクト
    const hero = document.getElementById('hero');
    const rippleContainer = document.querySelector('.ripple-container');
    
    if (hero && rippleContainer) {
        // カスタムカーソルの要素を作成
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        hero.appendChild(cursor);

        // マウスの動きに合わせてカーソルを移動（ヒーローセクション内のみ）
        hero.addEventListener('mousemove', function(e) {
            cursor.style.opacity = '1';
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // ヒーローセクションからマウスが離れた時
        hero.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
        });

        // クリック時の波紋エフェクト
        rippleContainer.addEventListener('click', function(e) {
            const rect = rippleContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            for (let i = 1; i <= 3; i++) {
                const ripple = document.createElement('div');
                ripple.className = `ripple ripple-${i}`;
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                rippleContainer.appendChild(ripple);
                
                ripple.addEventListener('animationend', function() {
                    ripple.remove();
                });
            }
        });
    }

    // フェードインアニメーション
    function fadeInElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, (index + 1) * 800 + 1600);
        });
    }

    // スライドインアニメーション
    function slideInElements() {
        const slideElements = document.querySelectorAll('.slide-in');
        slideElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 1200 + 700);
        });
    }

    // スクロール位置を監視し、ABOUTセクションが表示されたらアニメーションを開始
    function checkAnimationPosition() {
        const aboutSection = document.getElementById('about');
        const aboutSectionTop = aboutSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (aboutSectionTop < windowHeight * 0.8) {
            fadeInElements();
            slideInElements();
            window.removeEventListener('scroll', checkAnimationPosition);
        }
    }

    window.addEventListener('scroll', checkAnimationPosition);

    // PRODUCTSセクションの新しいアニメーション
    function animateProducts() {
        const productItems = document.querySelectorAll('.product-item');
        const triggerBottom = window.innerHeight * 0.85;
    
        productItems.forEach((item, index) => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                // ランダムな遅延を追加してより自然な動きに
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150); // 遅延時間を少し長めに
            }
        });
    }
    
    // スクロールイベントの最適化
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            animateProducts();
        });
    });

    // 初期チェック
    animateProducts();
});
