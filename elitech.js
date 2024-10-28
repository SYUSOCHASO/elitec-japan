document.addEventListener('DOMContentLoaded', function() {
    function createWaterAnimation() {
        const waterContainer = document.querySelector('.water-animation');
        const particleCount = 30;
        const particles = [];
        
        // オフスクリーンレンダリングの準備
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'water-particle';
            setParticlePosition(particle);
            fragment.appendChild(particle);
            particles.push(particle);
        }
        
        // 一括でDOMに追加
        waterContainer.appendChild(fragment);
        
        // アニメーションの一括開始
        particles.forEach(particle => startParticleAnimation(particle));
    }

    function setParticlePosition(particle) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        const z = Math.random() * 2000 - 1000;
        const scale = Math.random() * 0.5 + 0.4;
        
        particle.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
        particle.style.opacity = Math.random() * 0.7 + 0.3;
    }

    function startParticleAnimation(particle) {
        function animate() {
            const duration = Math.random() * 8000 + 7000;
            const targetX = Math.random() * window.innerWidth;
            const targetY = Math.random() * window.innerHeight;
            const targetZ = Math.random() * 2000 - 1000;
            const targetScale = Math.random() * 0.5 + 0.4;

            particle.animate([
                { transform: particle.style.transform },
                { 
                    transform: `translate3d(${targetX}px, ${targetY}px, ${targetZ}px) scale(${targetScale})`,
                    opacity: Math.random() * 0.7 + 0.3
                }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => {
                // アニメーション終了時に新しい位置を設定して再アニメーション
                particle.style.transform = `translate3d(${targetX}px, ${targetY}px, ${targetZ}px) scale(${targetScale})`;
                requestAnimationFrame(animate);
            };
        }
        
        animate();
    }

    // リサイズ時の処理を最適化
    let resizeTimeout;
    window.addEventListener('resize', () => {
        if (resizeTimeout) {
            clearTimeout(resizeTimeout);
        }
        resizeTimeout = setTimeout(() => {
            const particles = document.querySelectorAll('.water-particle');
            particles.forEach(setParticlePosition);
        }, 250);
    });

    // マウスインタラクション
    function addMouseInteraction() {
        const container = document.querySelector('.water-animation');
        let rafId;
        
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
                container.style.transform = `rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
            });
        });
        
        container.addEventListener('mouseleave', () => {
            if (rafId) cancelAnimationFrame(rafId);
            container.style.transform = 'rotateY(0deg) rotateX(0deg)';
        });
    }

    // アニメーションの初期化
    createWaterAnimation();
    addMouseInteraction();

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
