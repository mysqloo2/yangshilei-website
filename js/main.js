// 导航栏HTML模板
const navHTML = `
    <div class="top-bar">
        <div class="logo-area">
            <div class="site-logo">样式雷</div>
            <div class="sub">雷氏世家 · 样式房掌案</div>
        </div>
        <ul class="nav-links">
            <li><a href="index.html">首页</a></li>
            <li><a href="about.html">家族溯源</a></li>
            <li><a href="achievement.html">建筑成就</a></li>
            <li><a href="craft.html">烫样技艺</a></li>
            <li><a href="digital.html">数字展厅</a></li>
            <li><a href="literature.html">文献资料</a></li>
            <li><a href="workshop.html">匠心工坊</a></li>
        </ul>
    </div>
`;

// 页脚HTML模板
const footerHTML = `
    <div class="footer">
        <p>© 样式雷数字人文 · 半部古建史 | 清代皇家建筑世家 江西永修 · 承紫禁营造之魂</p>
        <p style="margin-top: 0.6rem;"><i class="fas fa-crown"></i> 致敬雷氏家族 · 世界记忆遗产 · 烫样天工</p>
    </div>
`;

// 页面加载时自动插入导航、页脚和视频背景
document.addEventListener('DOMContentLoaded', function() {
    // 检查并插入视频背景（避免重复插入）
    if (!document.querySelector('.video-background')) {
        const videoBg = document.createElement('div');
        videoBg.innerHTML = `
            <video class="video-background" autoplay loop muted playsinline>
                <source src="video/bg-video.mp4" type="video/mp4">
                您的浏览器不支持视频播放。
            </video>
            <div class="video-overlay"></div>
        `;
        document.body.insertBefore(videoBg, document.body.firstChild);
    }
    
    // 插入导航和页脚
    const navPlaceholder = document.querySelector('[data-include-nav]');
    const footerPlaceholder = document.querySelector('[data-include-footer]');
    
    if (navPlaceholder) {
        navPlaceholder.innerHTML = navHTML;
    }
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = footerHTML;
    }
    
    // 高亮当前页面
    setTimeout(() => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                link.style.borderBottom = '2px solid #e9c97c';
                link.style.color = '#e9c97c';
            }
        });
    }, 100);
    
    // 确保视频自动播放（解决某些浏览器策略）
    const video = document.querySelector('.video-background');
    if (video) {
        video.play().catch(e => console.log('视频自动播放被阻止，点击页面即可播放'));
        // 点击页面任意位置尝试播放视频
        document.body.addEventListener('click', function() {
            if (video && video.paused) {
                video.play();
            }
        }, { once: true });
    }
});

// 通用提示函数
function showMessage(msg, duration = 2000) {
    const toast = document.createElement('div');
    toast.innerText = msg;
    toast.style.position = 'fixed';
    toast.style.bottom = '80px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#2a241e';
    toast.style.color = '#f3e7ce';
    toast.style.border = '1px solid #e9c97c';
    toast.style.padding = '10px 22px';
    toast.style.borderRadius = '48px';
    toast.style.fontSize = '0.9rem';
    toast.style.zIndex = '1000';
    toast.style.backdropFilter = 'blur(8px)';
    toast.style.whiteSpace = 'nowrap';
    toast.style.maxWidth = '90%';
    toast.style.whiteSpace = 'normal';
    toast.style.textAlign = 'center';
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}