// 入场动画特效
document.addEventListener('DOMContentLoaded', function () {
    const introVideo = document.querySelector('.intro-video');
    const videoElement = document.querySelector('.intro-video video');
    const introButton = document.getElementById('intro-video-button');
    const loadingOverlay = document.querySelector('.video-loading-overlay');
    const titleElement = document.querySelector('.section0-title');  // 获取标题元素

    // 视频加载完成后隐藏遮罩
    videoElement.addEventListener('loadeddata', function () {
        loadingOverlay.style.display = 'none';
    });

    // 如果视频加载失败，也隐藏遮罩
    videoElement.addEventListener('error', function () {
        loadingOverlay.style.display = 'none';
    });

    // 视频播放3秒后按钮滑入
    setTimeout(function () {
        if (introButton) {
            introButton.classList.add('slide-in-left');
        }
    }, 3000);

    // 按钮点击事件
    if (introButton && introVideo) {
        introButton.addEventListener('click', function (e) {
            // 防止重复点击添加多个动画
            if (introVideo.classList.contains('slide-out-right')) return;
            // 添加滑出动画类
            introVideo.classList.add('slide-out-right');
            if (videoElement) videoElement.pause();
            // 使用 { once: true } 确保只执行一次
            introVideo.addEventListener('animationend', function onAnimationEnd() {
                introVideo.style.display = 'none';
                if (titleElement) {
                    titleElement.classList.add('title-visible');
                }

                // 记得解除注释%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
                // window.scrollTo({ top: 0, behavior: 'smooth' });
                // 1秒后让毛玻璃溶解
                setTimeout(() => {
                    const section0 = document.querySelector('.section0');
                    if (section0) {
                        section0.classList.add('no-blur');
                    }
                }, 1000);  // 延迟1秒
            }, { once: true });
        });
    }
});