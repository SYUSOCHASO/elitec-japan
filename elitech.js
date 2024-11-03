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
            
            // フォームの値を取得
            const name = document.getElementById('name').value;
            const furigana = document.getElementById('furigana').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const message = document.getElementById('message').value;

            // メール本文を作成
            const mailBody = `
お名前: ${name}
ふりがな: ${furigana}
電話番号: ${phone}
メールアドレス: ${email}
ご住所: ${address}

お問い合わせ内容:
${message}
            `.trim();

            // メールリンクを作成して自動的に開く
            const mailtoLink = `mailto:miura.elitech@elitechjapan.jp?subject=お問い合わせ&body=${encodeURIComponent(mailBody)}`;
            window.location.href = mailtoLink;

            // フォームをリセット
            this.reset();
            if (consentCheckbox && submitButton) {
                consentCheckbox.checked = false;
                submitButton.disabled = true;
            }
            
            alert('メーラーが起動します。送信ボタンを押して送信してください。');
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
                setTimeout(() => {
                    item.classList.add('animate');
                }, index * 150);
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
