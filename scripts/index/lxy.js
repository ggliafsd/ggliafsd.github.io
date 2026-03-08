// 流星雨特效脚本
(function () {
    // ----- 流星雨特效 -----
    const canvas = document.getElementById('meteor-canvas');
    if (!canvas) return;

    let ctx = canvas.getContext('2d');
    let width, height;

    // 星星数组
    let stars = [];
    const STAR_COUNT = 800;        // 星星数量
    // 流星数组
    let meteors = [];
    const METEOR_COUNT = 30;       // 同时出现的流星数量

    // 初始化星星
    function initStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 2 + 1,        // 大小 1~3px
                brightness: Math.random() * 0.8 + 0.2, // 亮度 0.2~1.0
                speed: 0.002 + Math.random() * 0.01   // 闪烁速度
            });
        }
    }

    // 星星闪烁（更新亮度）
    function updateStars() {
        for (let s of stars) {
            // 简单的正弦波动改变亮度
            s.brightness += (Math.random() - 0.5) * 0.02;
            if (s.brightness > 1) s.brightness = 1;
            if (s.brightness < 0.2) s.brightness = 0.2;
        }
    }

    // 绘制星星
    function drawStars() {
        for (let s of stars) {
            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${s.brightness})`;
            ctx.arc(s.x, s.y, s.size * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // 流星构造函数 (参数基于原MeteorRain)
    class Meteor {
        constructor() {
            this.reset();
        }
        reset() {
            // 随机起始位置（在屏幕外右上区域）
            this.x = Math.random() * width + width * 0.3;     // 偏右
            this.y = Math.random() * height * 0.3;            // 偏上
            this.length = 80 + Math.random() * 120;           // 流星长度
            this.angle = 30;                                   // 倾斜角度（度）
            this.speed = 4 + Math.random() * 5;                // 移动速度
            this.width = this.length * Math.cos(this.angle * Math.PI / 180);
            this.height = this.length * Math.sin(this.angle * Math.PI / 180);
            this.offsetX = this.speed * Math.cos(this.angle * Math.PI / 180);
            this.offsetY = this.speed * Math.sin(this.angle * Math.PI / 180);
            // 流星颜色（头部亮白，尾部渐暗）
            this.opacity = 0.9 + Math.random() * 0.1;
        }

        // 更新位置
        update() {
            this.x -= this.offsetX;
            this.y += this.offsetY;
            // 超出屏幕下边界或左边界则重置
            if (this.y > height + 100 || this.x < -100) {
                this.reset();
                // 重置时确保新位置合理
                this.x = Math.random() * width + width * 0.3;
                this.y = Math.random() * height * 0.2;
            }
        }

        // 绘制流星
        draw() {
            const gradient = ctx.createLinearGradient(
                this.x, this.y,
                this.x + this.width, this.y - this.height
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
            gradient.addColorStop(0.4, `rgba(200, 220, 255, ${this.opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(180, 180, 255, 0)`);

            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + this.width, this.y - this.height);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5 + Math.random() * 1.5;
            ctx.stroke();
        }
    }

    // 初始化流星
    function initMeteors() {
        meteors = [];
        for (let i = 0; i < METEOR_COUNT; i++) {
            meteors.push(new Meteor());
        }
    }

    // 调整画布尺寸
    function resizeCanvas() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        // 重新初始化星星和流星（适应新尺寸）
        initStars();
        initMeteors();
    }

    // 动画循环
    function animate() {
        if (!ctx) return;

        // 清除画布（完全透明背景，让背景图片透出）
        ctx.clearRect(0, 0, width, height);

        // 更新星星亮度
        updateStars();
        // 绘制星星
        drawStars();

        // 更新并绘制流星
        for (let m of meteors) {
            m.update();
            m.draw();
        }

        requestAnimationFrame(animate);
    }

    // 启动特效
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();  // 初始化尺寸
    animate();

    // 可选：如果页面有入场视频，可以在视频结束后再显示流星雨？但z-index已设为1，会在视频下方，无妨。
})();