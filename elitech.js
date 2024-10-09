// DOMの読み込みが完了したら実行
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
            // ここにフォーム送信の処理を追加
            alert('お問い合わせありがとうございます。まもなくご連絡いたします。');
            this.reset();
            // チェックボックスと送信ボタンの状態をリセット
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
            }, index * 500); // 各要素を0.5秒ずつ遅らせてアニメーション開始
        });
    }

    // ページ読み込み後、200ミリ秒後にヒーローセクションのアニメーションを開始
    setTimeout(startHeroAnimation, 200);

    // フェードインアニメーション
    function fadeInElements() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, (index + 1) * 800 + 1600); // 各要素を0.5秒ずつ遅らせてフェードイン
        });
    }

    // スライドインアニメーション
    function slideInElements() {
        const slideElements = document.querySelectorAll('.slide-in');
        slideElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 1200 + 700); // 各要素を0.5秒ずつ遅らせてスライドイン
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

    // ヒーローセクションの画像切り替え
    const heroImages = document.querySelectorAll('.hero-image');
    let currentImageIndex = 0;

    function changeHeroImage() {
        const nextImageIndex = (currentImageIndex + 1) % heroImages.length;
        heroImages[nextImageIndex].style.zIndex = 3;
        heroImages[nextImageIndex].classList.add('active');
        
        setTimeout(() => {
            heroImages[currentImageIndex].classList.remove('active');
            heroImages[currentImageIndex].style.zIndex = 1;
            heroImages[nextImageIndex].style.zIndex = 2;
            currentImageIndex = nextImageIndex;
        }, 1000); // トランジション時間と同じ1秒後に実行
    }

    // 5秒ごとに画像を切り替え
    setInterval(changeHeroImage, 5000);

    // PRODUCTSセクションのカルーセル機能を追加
    function setupProductCarousel() {
        const carousel = document.querySelector('.product-carousel');
        const items = carousel.querySelectorAll('.product-item');
        let currentIndex = 0;

        function positionItems() {
            items.forEach((item, index) => {
                const offset = (index - currentIndex + items.length) % items.length;
                const angle = offset * (360 / items.length);
                const radius = 860; // カルーセルの半径を縮小
                const x = Math.sin(angle * Math.PI / 180) * radius;
                const z = Math.cos(angle * Math.PI / 180) * radius - radius;
        
                item.style.transform = `translateX(${x}px) translateZ(${z}px) scale(${offset === 0 ? 1.1 : 0.8})`;
                item.style.opacity = offset === 0 ? 1 : 0.7;
                item.classList.toggle('active', offset === 0);
            });
        }

        function rotateCarousel() {
            currentIndex = (currentIndex + 1) % items.length;
            positionItems();
        }

        positionItems();
        setInterval(rotateCarousel, 6000); // 8秒ごとに回転
    }

    // PRODUCTSセクションのカルーセルを初期化
    setupProductCarousel();
});
