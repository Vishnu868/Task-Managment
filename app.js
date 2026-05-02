/* ============================================
   JustPickUp - Full Application JavaScript
   Template browsing, customization & orders
   ============================================ */

// ============================================
// Template Catalog
// ============================================

const TEMPLATES = [
    {
        id: 'yt-banner-light',
        slug: 'youtube-banner-profile-picture-light',
        name: 'YouTube Banner Profile Picture Light',
        category: 'youtube',
        cost: 8,
        previewType: 'youtube-banner',
        bgGradient: 'linear-gradient(135deg, #f0f4f8 0%, #e8eef5 100%)',
        description: 'Clean light-themed YouTube banner with profile picture and subscribe button.'
    },
    {
        id: 'yt-banner-dark',
        slug: 'youtube-banner-profile-picture-dark',
        name: 'YouTube Banner Profile Picture Dark',
        category: 'youtube',
        cost: 8,
        previewType: 'youtube-banner-dark',
        bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        description: 'Sleek dark-themed YouTube banner with neon accents.'
    },
    {
        id: 'yt-intro-modern',
        slug: 'youtube-intro-modern-swoosh',
        name: 'YouTube Intro - Modern Swoosh',
        category: 'intro',
        cost: 12,
        previewType: 'intro-outro',
        bgGradient: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)',
        description: 'Dynamic intro with modern swoosh animation and channel branding.'
    },
    {
        id: 'yt-outro-sub',
        slug: 'youtube-outro-subscribe-cta',
        name: 'YouTube Outro - Subscribe CTA',
        category: 'intro',
        cost: 10,
        previewType: 'intro-outro',
        bgGradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 100%)',
        description: 'Engaging outro with subscribe call-to-action and video slots.'
    },
    {
        id: 'logo-reveal-3d',
        slug: 'logo-reveal-3d-particles',
        name: 'Logo Reveal - 3D Particles',
        category: 'logo',
        cost: 15,
        previewType: 'logo-reveal',
        bgGradient: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 100%)',
        description: '3D particle explosion that reveals your logo dramatically.'
    },
    {
        id: 'logo-reveal-glitch',
        slug: 'logo-reveal-glitch-effect',
        name: 'Logo Reveal - Glitch Effect',
        category: 'logo',
        cost: 12,
        previewType: 'logo-reveal',
        bgGradient: 'linear-gradient(135deg, #0a0a0a 0%, #1f1f1f 100%)',
        description: 'Cyberpunk-style glitch animation revealing your brand.'
    },
    {
        id: 'social-story-gradient',
        slug: 'instagram-story-gradient-wave',
        name: 'Instagram Story - Gradient Wave',
        category: 'social',
        cost: 6,
        previewType: 'social-story',
        bgGradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        description: 'Vibrant gradient wave animation for Instagram stories.'
    },
    {
        id: 'social-post-minimal',
        slug: 'social-post-minimal-text',
        name: 'Social Post - Minimal Text',
        category: 'social',
        cost: 5,
        previewType: 'social-post',
        bgGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        description: 'Clean minimal text animation for social media posts.'
    },
    {
        id: 'title-cinematic',
        slug: 'title-card-cinematic',
        name: 'Title Card - Cinematic',
        category: 'title',
        cost: 10,
        previewType: 'title-card',
        bgGradient: 'linear-gradient(135deg, #0c0c0c 0%, #1c1c1c 100%)',
        description: 'Hollywood-style cinematic title card with lens flare.'
    },
    {
        id: 'title-lower-third',
        slug: 'lower-third-news-style',
        name: 'Lower Third - News Style',
        category: 'title',
        cost: 8,
        previewType: 'lower-third',
        bgGradient: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
        description: 'Professional lower third name plate for videos.'
    },
    {
        id: 'yt-subscribe-popup',
        slug: 'subscribe-button-animation',
        name: 'Subscribe Button Animation',
        category: 'youtube',
        cost: 6,
        previewType: 'subscribe-anim',
        bgGradient: 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
        description: 'Animated subscribe button popup overlay for your videos.'
    },
    {
        id: 'logo-reveal-smoke',
        slug: 'logo-reveal-smoke',
        name: 'Logo Reveal - Smoke',
        category: 'logo',
        cost: 14,
        previewType: 'logo-reveal',
        bgGradient: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
        description: 'Atmospheric smoke reveal with dramatic lighting.'
    }
];

// ============================================
// Data Store
// ============================================

const ORDERS_STORAGE_KEY = 'videoeffects_orders';
const PROFILES_STORAGE_KEY = 'videoeffects_profiles';

const DEFAULT_ORDERS = [
    {
        id: 'bbada2d3-c1ec-4cc9-81b4-dba9b60aefad',
        name: 'YouTube Banner Profile Picture Light',
        template: 'YouTube Banner Profile Picture Light',
        templateId: 'yt-banner-light',
        templateUrl: '#',
        createdAt: '2026-04-24T15:36:42',
        expiresAt: '2026-04-25T15:36:50',
        cost: 8,
        userInput: {
            username: 'hiditrgyggh',
            profilePicUrl: null
        },
        downloads: [
            { label: 'SD alpha / 540x270 / MOV / 7.7 MB', format: 'MOV', resolution: '540x270', quality: 'SD alpha', size: '7.7 MB' },
            { label: 'HD alpha / 1080x540 / MOV / 22.3 MB', format: 'MOV', resolution: '1080x540', quality: 'HD alpha', size: '22.3 MB' },
            { label: 'SD / 540x270 / MP4 / 4.2 MB', format: 'MP4', resolution: '540x270', quality: 'SD', size: '4.2 MB' },
            { label: 'HD / 1080x540 / MP4 / 12.1 MB', format: 'MP4', resolution: '1080x540', quality: 'HD', size: '12.1 MB' }
        ],
        previewType: 'youtube-banner'
    }
];

// ============================================
// Utility Functions
// ============================================

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
}

function getExpiryDate(createdAt) {
    const date = new Date(createdAt);
    date.setHours(date.getHours() + 24);
    return date.toISOString();
}

function isExpired(expiresAt) {
    return new Date(expiresAt) < new Date();
}

function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str || '';
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    document.querySelectorAll('.toast').forEach(t => t.remove());
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// Storage
// ============================================

function loadOrders() {
    try {
        const stored = localStorage.getItem(ORDERS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) { console.error('Failed to load orders:', e); }
    return [...DEFAULT_ORDERS];
}

function saveOrders(orders) {
    try { localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders)); }
    catch (e) { console.error('Failed to save orders:', e); }
}

function loadProfiles() {
    try {
        const stored = localStorage.getItem(PROFILES_STORAGE_KEY);
        if (stored) return JSON.parse(stored);
    } catch (e) { }
    return [];
}

function saveProfiles(profiles) {
    try { localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profiles)); }
    catch (e) { }
}

// ============================================
// Navigation
// ============================================

let currentPage = 'browse';

function getSelectedOrderFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('selected_order');
}

function updateURL(orderId) {
    const url = new URL(window.location);
    if (orderId) url.searchParams.set('selected_order', orderId);
    else url.searchParams.delete('selected_order');
    window.history.pushState({}, '', url);
}

function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.page-view').forEach(p => p.style.display = 'none');
    const target = document.getElementById(`page-${page}`);
    if (target) target.style.display = '';

    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const activeNav = document.getElementById(`nav-${page}`);
    if (activeNav) activeNav.classList.add('active');

    if (page === 'orders') renderOrders();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeMobileMenu() {
    document.getElementById('mobile-overlay').classList.remove('active');
    document.getElementById('mobile-menu').classList.remove('active');
    document.body.style.overflow = '';
}

// ============================================
// Preview Rendering (with animations)
// ============================================

function renderPreview(previewType, userData, container, animated, useGreenScreen) {
    const name = userData.username || 'Your Channel';
    const initial = escapeHTML(name.charAt(0).toUpperCase());
    const profilePic = userData.profilePicUrl;

    const checkerBg = useGreenScreen
        ? `background: #00B140;`
        : `background-image: linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%); background-size: 16px 16px; background-position: 0 0, 0 8px, 8px -8px, -8px 0;`;

    const avatarHTML = profilePic
        ? `<img src="${profilePic}" style="width:100%;height:100%;object-fit:cover;border-radius:50%;" alt="">`
        : `<span style="color:white;font-weight:bold;font-size:14px;font-family:sans-serif;">${initial}</span>`;

    // Animation classes: only added when animated=true (player preview)
    const anim = animated ? 'vfx-animate' : '';

    // Inject keyframes style (only once)
    if (animated && !document.getElementById('vfx-anim-style')) {
        const style = document.createElement('style');
        style.id = 'vfx-anim-style';
        style.textContent = `
            @keyframes vfxSlideUp { 0%{opacity:0;transform:translateY(30px)} 25%{opacity:1;transform:translateY(0)} 85%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
            @keyframes vfxScaleIn { 0%{opacity:0;transform:scale(0.5)} 20%{opacity:1;transform:scale(1.05)} 30%{opacity:1;transform:scale(1)} 85%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(0.95)} }
            @keyframes vfxSlideRight { 0%{opacity:0;transform:translateX(-40px)} 20%{opacity:1;transform:translateX(0)} 85%{opacity:1;transform:translateX(0)} 100%{opacity:0;transform:translateX(20px)} }
            @keyframes vfxFadeIn { 0%{opacity:0} 15%{opacity:1} 85%{opacity:1} 100%{opacity:0} }
            @keyframes vfxGlowPulse { 0%{box-shadow:0 0 10px rgba(28,147,255,0.1)} 50%{box-shadow:0 0 40px rgba(28,147,255,0.5)} 100%{box-shadow:0 0 10px rgba(28,147,255,0.1)} }
            @keyframes vfxLineGrow { 0%{width:0} 25%{width:40px} 85%{width:40px} 100%{width:0} }
            @keyframes vfxSubscribePop { 0%{opacity:0;transform:scale(0.3)} 15%{opacity:1;transform:scale(1.1)} 25%{transform:scale(1)} 85%{opacity:1;transform:scale(1)} 100%{opacity:0;transform:scale(0.8)} }
            .vfx-animate .vfx-avatar { animation: vfxScaleIn 4s ease infinite; }
            .vfx-animate .vfx-name { animation: vfxSlideRight 4s ease infinite; animation-delay: 0.3s; opacity: 0; }
            .vfx-animate .vfx-sub { animation: vfxSubscribePop 4s ease infinite; animation-delay: 0.8s; opacity: 0; }
            .vfx-animate .vfx-title { animation: vfxSlideUp 4s ease infinite; }
            .vfx-animate .vfx-line { animation: vfxLineGrow 4s ease infinite; animation-delay: 0.4s; width: 0; }
            .vfx-animate .vfx-logo-ring { animation: vfxScaleIn 4s ease infinite, vfxGlowPulse 4s ease infinite; }
            .vfx-animate .vfx-card { animation: vfxSlideUp 4s ease infinite; }
        `;
        document.head.appendChild(style);
    }

    switch (previewType) {
        case 'youtube-banner':
        case 'youtube-banner-dark': {
            const isDark = previewType.includes('dark');
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;${checkerBg} display:flex;align-items:center;justify-content:center;">
                    <div style="display:flex;align-items:center;gap:10px;max-width:90%;">
                        <div class="vfx-avatar" style="width:36px;height:36px;border-radius:50%;background:#CC0000;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;">${avatarHTML}</div>
                        <div class="vfx-name" style="min-width:0;${animated ? '' : 'opacity:1;'}">
                            <div style="font-size:13px;font-family:sans-serif;color:${isDark ? '#fff' : '#333'};font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:200px;">${escapeHTML(name)}</div>
                        </div>
                        <div class="vfx-sub" style="background:#CC0000;color:white;font-size:10px;padding:4px 12px;border-radius:3px;font-weight:600;flex-shrink:0;${animated ? '' : 'opacity:1;'}">Subscribe</div>
                    </div>
                </div>`;
            break;
        }
        case 'intro-outro':
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
                    <div class="vfx-title" style="font-family:'Oswald',sans-serif;font-size:24px;font-weight:700;color:#1C93FF;text-shadow:0 0 20px rgba(28,147,255,0.3);">${escapeHTML(name)}</div>
                    <div class="vfx-line" style="height:2px;background:#1C93FF;border-radius:2px;"></div>
                </div>`;
            break;
        case 'logo-reveal':
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;background:linear-gradient(135deg,#0c0c0c,#1a1a1a);display:flex;align-items:center;justify-content:center;">
                    <div class="vfx-logo-ring" style="width:80px;height:80px;border-radius:50%;border:3px solid #1C93FF;display:flex;align-items:center;justify-content:center;box-shadow:0 0 30px rgba(28,147,255,0.2);">
                        <span style="font-family:'Oswald',sans-serif;font-size:28px;font-weight:700;color:#1C93FF;">${initial}</span>
                    </div>
                </div>`;
            break;
        case 'social-story':
        case 'social-post':
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;background:linear-gradient(135deg,#f093fb,#f5576c);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;">
                    <div class="vfx-title" style="font-family:'Oswald',sans-serif;font-size:22px;font-weight:700;color:white;text-shadow:0 2px 4px rgba(0,0,0,0.3);">${escapeHTML(name)}</div>
                </div>`;
            break;
        case 'title-card':
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;background:linear-gradient(135deg,#0c0c0c,#1c1c1c);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;">
                    <div class="vfx-title" style="font-family:'Oswald',sans-serif;font-size:26px;font-weight:700;color:white;letter-spacing:0.15em;text-transform:uppercase;">${escapeHTML(name)}</div>
                </div>`;
            break;
        case 'lower-third':
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;${checkerBg}display:flex;align-items:flex-end;padding:16px;">
                    <div class="vfx-card" style="display:flex;align-items:stretch;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.2);">
                        <div style="width:4px;background:#1C93FF;flex-shrink:0;"></div>
                        <div style="background:rgba(0,0,0,0.85);padding:8px 16px;">
                            <div style="font-family:'Cabin',sans-serif;font-size:14px;font-weight:700;color:white;">${escapeHTML(name)}</div>
                        </div>
                    </div>
                </div>`;
            break;
        case 'subscribe-anim':
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;${checkerBg}display:flex;align-items:center;justify-content:center;">
                    <div style="display:flex;flex-direction:column;align-items:center;gap:8px;">
                        <div class="vfx-avatar" style="display:flex;align-items:center;gap:8px;background:white;padding:8px 16px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,0.1);">
                            <div style="width:28px;height:28px;border-radius:50%;background:#CC0000;display:flex;align-items:center;justify-content:center;overflow:hidden;">${avatarHTML}</div>
                            <span style="font-size:12px;font-family:sans-serif;font-weight:600;color:#333;">${escapeHTML(name)}</span>
                        </div>
                        <div class="vfx-sub" style="background:#CC0000;color:white;font-size:12px;padding:6px 24px;border-radius:4px;font-weight:600;${animated ? '' : 'opacity:1;'}">SUBSCRIBE</div>
                    </div>
                </div>`;
            break;
        default:
            container.innerHTML = `
                <div class="${anim}" style="width:100%;height:100%;${checkerBg}display:flex;align-items:center;justify-content:center;">
                    <div class="vfx-card" style="background:white;border-radius:8px;padding:16px 24px;box-shadow:0 2px 8px rgba(0,0,0,.1);">
                        <div style="font-family:'Cabin',sans-serif;font-size:16px;font-weight:600;color:#333;">${escapeHTML(name)}</div>
                    </div>
                </div>`;
    }
}

function getPreviewSVGForOrder(order) {
    const ui = order.userInput || {};
    const name = ui.username || 'Channel';
    const initial = escapeHTML(name.charAt(0).toUpperCase());

    switch (order.previewType) {
        case 'youtube-banner':
        case 'youtube-banner-dark':
            return `
                <div style="background:white;border-radius:6px;padding:6px 10px;display:flex;align-items:center;gap:6px;box-shadow:0 1px 3px rgba(0,0,0,.1);">
                    <div style="width:20px;height:20px;border-radius:50%;background:#CC0000;display:flex;align-items:center;justify-content:center;color:white;font-size:9px;font-weight:bold;">${initial}</div>
                    <span style="font-size:9px;font-family:sans-serif;color:#333;max-width:100px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHTML(name)}</span>
                    <div style="background:#CC0000;color:white;font-size:8px;padding:2px 8px;border-radius:2px;">Subscribe</div>
                </div>`;
        case 'intro-outro':
            return `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
                <span style="font-family:'Oswald',sans-serif;font-size:14px;font-weight:700;color:#1C93FF;">${escapeHTML(name)}</span>
                <div style="width:24px;height:1px;background:#1C93FF;"></div></div>`;
        case 'logo-reveal':
            return `<div style="width:40px;height:40px;border-radius:50%;border:2px solid #1C93FF;display:flex;align-items:center;justify-content:center;">
                <span style="font-family:'Oswald',sans-serif;font-size:16px;font-weight:700;color:#1C93FF;">${initial}</span></div>`;
        case 'lower-third':
            return `<div style="display:flex;align-items:stretch;border-radius:3px;overflow:hidden;">
                <div style="width:3px;background:#1C93FF;"></div>
                <div style="background:rgba(0,0,0,0.8);padding:4px 10px;">
                <span style="font-size:9px;color:white;font-weight:600;">${escapeHTML(name)}</span></div></div>`;
        default:
            return `<div style="background:white;border-radius:6px;padding:6px 12px;box-shadow:0 1px 3px rgba(0,0,0,.1);">
                <span style="font-size:10px;font-weight:600;color:#333;">${escapeHTML(name)}</span></div>`;
    }
}

// ============================================
// Browse Page
// ============================================

let activeCategory = 'all';
let searchQuery = '';

function renderTemplateGrid() {
    const grid = document.getElementById('template-grid');
    let filtered = TEMPLATES;
    if (activeCategory !== 'all') filtered = filtered.filter(t => t.category === activeCategory);
    if (searchQuery) {
        const q = searchQuery.toLowerCase();
        filtered = filtered.filter(t => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2"><circle cx="20" cy="20" r="14"/><path d="M30 30l10 10" stroke-linecap="round"/></svg><p>No templates found.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map((t, i) => `
        <div class="template-card" style="animation-delay:${0.05 * (i + 1)}s;" data-template-id="${t.id}">
            <div class="template-thumbnail">
                <div class="thumb-bg" style="background:${t.bgGradient};" id="thumb-${t.id}"></div>
                <div class="thumb-overlay">
                    <button class="use-btn" data-template-id="${t.id}">Use Template</button>
                </div>
            </div>
            <div class="template-card-body">
                <div class="template-card-name">${escapeHTML(t.name)}</div>
                <div class="template-card-meta">
                    <span class="template-card-category">${escapeHTML(t.category)}</span>
                    <span class="template-card-cost">${t.cost} credits</span>
                </div>
            </div>
        </div>
    `).join('');

    filtered.forEach(t => {
        const el = document.getElementById(`thumb-${t.id}`);
        if (el) renderPreview(t.previewType, { username: 'Your Channel' }, el);
    });

    // Attach click listeners (avoids inline onclick / CSP issues)
    grid.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const tid = card.getAttribute('data-template-id');
            if (tid) openNewOrder(tid);
        });
    });
    grid.querySelectorAll('.use-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tid = btn.getAttribute('data-template-id');
            if (tid) openNewOrder(tid);
        });
    });
}

function initBrowsePage() {
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.category;
            renderTemplateGrid();
        });
    });
    const searchInput = document.getElementById('template-search');
    let debounce;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => { searchQuery = searchInput.value.trim(); renderTemplateGrid(); }, 200);
    });
    renderTemplateGrid();
}

// ============================================
// New Order Page (Full-Page Customization)
// ============================================

let activeTemplateId = null;
let uploadedImageDataUrl = null;

function openNewOrder(templateId) {
    const template = TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    activeTemplateId = templateId;

    // Set page title
    document.getElementById('new-order-template-name').textContent = template.name;
    document.title = `${template.name} - JustPickUp`;

    // Reset form
    document.getElementById('new-order-username').value = '';
    document.getElementById('username-char-count').textContent = '0 / 100 characters';
    document.getElementById('autofill-username-input').value = '';

    uploadedImageDataUrl = null;

    // Reset dropzone
    const dropzoneContent = document.getElementById('dropzone-content');
    const dropzoneImg = document.getElementById('dropzone-preview-img');
    dropzoneContent.style.display = '';
    dropzoneImg.style.display = 'none';

    // Render saved profiles
    renderAutofillProfiles();

    // Show the page
    navigateTo('new-order');

    // Render initial preview (animated)
    updateNewOrderPreview();

    // Start preview player
    previewPlayer.start();

    // Render suggestions
    renderSuggestions(templateId);
}

function updateNewOrderPreview() {
    if (!activeTemplateId) return;
    const template = TEMPLATES.find(t => t.id === activeTemplateId);
    if (!template) return;
    const canvas = document.getElementById('new-order-preview-canvas');
    const username = document.getElementById('new-order-username').value.trim();
    renderPreview(template.previewType, {
        username: username || 'Your Channel',
        profilePicUrl: uploadedImageDataUrl
    }, canvas, true); // true = animated
}

// ============================================
// Preview Player Controller
// ============================================

const previewPlayer = {
    playing: false,
    duration: 4000, // 4 seconds per loop
    startTime: 0,
    rafId: null,

    start() {
        this.playing = true;
        this.startTime = performance.now();
        this.updatePlayBtn();
        this.tick();
    },

    stop() {
        this.playing = false;
        cancelAnimationFrame(this.rafId);
        this.updatePlayBtn();
    },

    toggle() {
        if (this.playing) {
            this.stop();
            // Pause CSS animations
            const canvas = document.getElementById('new-order-preview-canvas');
            if (canvas) canvas.style.animationPlayState = 'paused';
            canvas.querySelectorAll('*').forEach(el => el.style.animationPlayState = 'paused');
        } else {
            // Resume CSS animations
            const canvas = document.getElementById('new-order-preview-canvas');
            if (canvas) canvas.style.animationPlayState = 'running';
            canvas.querySelectorAll('*').forEach(el => el.style.animationPlayState = 'running');
            this.start();
        }
    },

    tick() {
        if (!this.playing) return;
        const elapsed = performance.now() - this.startTime;
        const progress = (elapsed % this.duration) / this.duration;
        const currentSec = ((elapsed % this.duration) / 1000).toFixed(0);
        const totalSec = (this.duration / 1000).toFixed(0);

        // Update progress bar
        const bar = document.getElementById('player-progress-bar');
        if (bar) bar.style.width = `${progress * 100}%`;

        // Update time
        const timeEl = document.getElementById('player-time');
        if (timeEl) {
            const mins = Math.floor(currentSec / 60);
            const secs = String(currentSec % 60).padStart(1, '0');
            timeEl.textContent = `${mins}:${secs.padStart(2, '0')} / 0:${String(totalSec).padStart(2, '0')}`;
        }

        this.rafId = requestAnimationFrame(() => this.tick());
    },

    updatePlayBtn() {
        const btn = document.getElementById('player-play-btn');
        if (!btn) return;
        if (this.playing) {
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>`;
        } else {
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4l15 8-15 8z"/></svg>`;
        }
    }
};

function renderAutofillProfiles() {
    const container = document.getElementById('autofill-profiles');
    const profiles = loadProfiles();
    if (profiles.length === 0) {
        container.innerHTML = '<p style="font-size:13px;color:var(--gray-400);padding:8px 0;">No saved profiles yet.</p>';
        return;
    }
    container.innerHTML = profiles.map((p, i) => `
        <div class="autofill-profile-pill" onclick="useProfile(${i})">
            <div class="autofill-avatar" style="background:${p.color || '#6B7280'};">
                ${p.avatar ? `<img src="${p.avatar}" alt="">` : `<span class="autofill-avatar-letter">${escapeHTML((p.handle || '?').charAt(0).toUpperCase())}</span>`}
            </div>
            <span class="autofill-handle">@${escapeHTML(p.handle)}</span>
            <button class="autofill-refresh" onclick="event.stopPropagation();removeProfile(${i});" aria-label="Remove profile">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 18L18 6M6 6l12 12" stroke-linecap="round"/></svg>
            </button>
        </div>
    `).join('');
}

function useProfile(index) {
    const profiles = loadProfiles();
    const p = profiles[index];
    if (!p) return;
    document.getElementById('new-order-username').value = p.handle;
    updateCharCount();
    if (p.avatar) {
        uploadedImageDataUrl = p.avatar;
        const dropzoneContent = document.getElementById('dropzone-content');
        const dropzoneImg = document.getElementById('dropzone-preview-img');
        dropzoneContent.style.display = 'none';
        dropzoneImg.src = p.avatar;
        dropzoneImg.style.display = 'block';
    }
    updateNewOrderPreview();
    showToast(`Profile @${p.handle} applied!`, 'success');
}

function removeProfile(index) {
    const profiles = loadProfiles();
    profiles.splice(index, 1);
    saveProfiles(profiles);
    renderAutofillProfiles();
}

function addProfileFromInput() {
    const input = document.getElementById('autofill-username-input');
    let handle = input.value.trim();
    if (!handle) return;

    // Strip @ and URL parts
    handle = handle.replace(/^@/, '').replace(/.*youtube\.com\/@?/, '').replace(/.*youtu\.be\//, '').split('/')[0].split('?')[0];
    if (!handle) return;

    const profiles = loadProfiles();
    if (profiles.some(p => p.handle.toLowerCase() === handle.toLowerCase())) {
        showToast('Profile already saved', 'error');
        return;
    }

    const colors = ['#CC0000', '#1C93FF', '#16A34A', '#9333EA', '#F59E0B', '#EC4899'];
    profiles.push({
        handle: handle,
        color: colors[profiles.length % colors.length],
        avatar: null
    });
    saveProfiles(profiles);
    renderAutofillProfiles();
    input.value = '';

    // Also fill in the username
    document.getElementById('new-order-username').value = handle;
    updateCharCount();
    updateNewOrderPreview();
    showToast(`Profile @${handle} added!`, 'success');
}

function updateCharCount() {
    const input = document.getElementById('new-order-username');
    document.getElementById('username-char-count').textContent = `${input.value.length} / 100 characters`;
}

function renderSuggestions(currentTemplateId) {
    const grid = document.getElementById('suggestions-grid');
    const others = TEMPLATES.filter(t => t.id !== currentTemplateId).slice(0, 4);
    grid.innerHTML = others.map(t => `
        <div class="template-card" data-template-id="${t.id}">
            <div class="template-thumbnail">
                <div class="thumb-bg" style="background:${t.bgGradient};" id="suggest-${t.id}"></div>
                <div class="thumb-overlay"><button class="use-btn" data-template-id="${t.id}">Use Template</button></div>
            </div>
            <div class="template-card-body">
                <div class="template-card-name">${escapeHTML(t.name)}</div>
                <div class="template-card-meta">
                    <span class="template-card-category">${escapeHTML(t.category)}</span>
                    <span class="template-card-cost">${t.cost} credits</span>
                </div>
            </div>
        </div>
    `).join('');
    others.forEach(t => {
        const el = document.getElementById(`suggest-${t.id}`);
        if (el) renderPreview(t.previewType, { username: 'Your Channel' }, el);
    });

    grid.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', () => {
            const tid = card.getAttribute('data-template-id');
            if (tid) openNewOrder(tid);
        });
    });
    grid.querySelectorAll('.use-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const tid = btn.getAttribute('data-template-id');
            if (tid) openNewOrder(tid);
        });
    });
}

function initNewOrderPage() {
    // Username live updates
    const usernameInput = document.getElementById('new-order-username');
    usernameInput.addEventListener('input', () => {
        updateCharCount();
        updateNewOrderPreview();
    });

    // Player controls
    document.getElementById('player-play-btn').addEventListener('click', () => previewPlayer.toggle());
    document.getElementById('player-mute-btn').addEventListener('click', () => showToast('Sound is simulated in preview', 'success'));
    document.getElementById('player-fullscreen-btn').addEventListener('click', () => {
        const canvas = document.getElementById('new-order-preview-canvas');
        if (canvas.requestFullscreen) canvas.requestFullscreen();
        else if (canvas.webkitRequestFullscreen) canvas.webkitRequestFullscreen();
    });

    // Autofill Use button
    document.getElementById('autofill-use-btn').addEventListener('click', addProfileFromInput);
    document.getElementById('autofill-username-input').addEventListener('keydown', (e) => {
        if (e.key === 'Enter') { e.preventDefault(); addProfileFromInput(); }
    });

    // Dropzone
    const dropzone = document.getElementById('user-picture-dropzone');
    const fileInput = document.getElementById('user-picture-input');
    const dropzoneContent = document.getElementById('dropzone-content');
    const dropzoneImg = document.getElementById('dropzone-preview-img');

    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('keydown', (e) => { if (e.key === 'Enter') fileInput.click(); });

    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) handleImageUpload(file);
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files[0]) handleImageUpload(fileInput.files[0]);
    });

    function handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImageDataUrl = e.target.result;
            dropzoneContent.style.display = 'none';
            dropzoneImg.src = uploadedImageDataUrl;
            dropzoneImg.style.display = 'block';
            updateNewOrderPreview();
        };
        reader.readAsDataURL(file);
    }

    // Form submission
    document.getElementById('new-order-form').addEventListener('submit', (e) => {
        e.preventDefault();
        generateFromNewOrder();
    });
}

// ── Animation easing helpers (mirror CSS keyframes) ──────────────────────────

function _ease(t) { return t < 0.5 ? 2*t*t : -1+(4-2*t)*t; }

function _scaleIn(t, delaySec) {
    const ts = t * 4; // t is 0..1 over 4 seconds
    if (ts < delaySec) return { op: 0, sc: 0.5 };
    const lt = Math.min((ts - delaySec) / (4 - delaySec), 1);
    if (lt < 0.20) { const p = lt/0.20; return { op: p, sc: 0.5 + p*0.55 }; }
    if (lt < 0.30) { const p = (lt-0.20)/0.10; return { op: 1, sc: 1.05 - p*0.05 }; }
    if (lt < 0.85) return { op: 1, sc: 1 };
    const p = (lt-0.85)/0.15; return { op: 1-p, sc: 1-p*0.05 };
}

function _slideRight(t, delaySec) {
    const ts = t * 4;
    if (ts < delaySec) return { op: 0, tx: -60 };
    const lt = Math.min((ts - delaySec) / (4 - delaySec), 1);
    if (lt < 0.20) { const p = lt/0.20; return { op: p, tx: -60 + p*60 }; }
    if (lt < 0.85) return { op: 1, tx: 0 };
    const p = (lt-0.85)/0.15; return { op: 1-p, tx: p*20 };
}

function _subPop(t, delaySec) {
    const ts = t * 4;
    if (ts < delaySec) return { op: 0, sc: 0.3 };
    const lt = Math.min((ts - delaySec) / (4 - delaySec), 1);
    if (lt < 0.15) { const p = lt/0.15; return { op: p, sc: 0.3 + p*0.8 }; }
    if (lt < 0.25) { const p = (lt-0.15)/0.10; return { op: 1, sc: 1.1 - p*0.1 }; }
    if (lt < 0.85) return { op: 1, sc: 1 };
    const p = (lt-0.85)/0.15; return { op: 1-p, sc: 1-p*0.2 };
}

function _slideUp(t, delaySec) {
    const ts = t * 4;
    if (ts < delaySec) return { op: 0, ty: 40 };
    const lt = Math.min((ts - delaySec) / (4 - delaySec), 1);
    if (lt < 0.25) { const p = lt/0.25; return { op: p, ty: 40 - p*40 }; }
    if (lt < 0.85) return { op: 1, ty: 0 };
    const p = (lt-0.85)/0.15; return { op: 1-p, ty: -p*10 };
}

function _lineW(t, delaySec, maxW) {
    const ts = t * 4;
    if (ts < delaySec) return 0;
    const lt = Math.min((ts - delaySec) / (4 - delaySec), 1);
    if (lt < 0.25) return (lt/0.25)*maxW;
    if (lt < 0.85) return maxW;
    return (1-(lt-0.85)/0.15)*maxW;
}

function _rrect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x+r, y);
    ctx.lineTo(x+w-r, y); ctx.quadraticCurveTo(x+w, y, x+w, y+r);
    ctx.lineTo(x+w, y+h-r); ctx.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
    ctx.lineTo(x+r, y+h); ctx.quadraticCurveTo(x, y+h, x, y+h-r);
    ctx.lineTo(x, y+r); ctx.quadraticCurveTo(x, y, x+r, y);
    ctx.closePath();
}

function downloadPreviewAsVideo(previewType, userData, filenameBase, onDone) {
    const W = 1280, H = 720, FPS = 30, DURATION = 4;
    const name = (userData.username || 'Your Channel').substring(0, 40);
    const initial = name.charAt(0).toUpperCase();

    function startRecording(profileImg) {
        const canvas = document.createElement('canvas');
        canvas.width = W; canvas.height = H;
        const ctx = canvas.getContext('2d');

        const mimeType = ['video/mp4;codecs=avc1','video/mp4']
            .find(m => MediaRecorder.isTypeSupported(m)) || 'video/webm';

        const chunks = [];
        const stream = canvas.captureStream(FPS);
        const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 10000000 });
        recorder.ondataavailable = e => { if (e.data && e.data.size > 0) chunks.push(e.data); };
        recorder.onstop = () => {
            const blob = new Blob(chunks, { type: mimeType });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.download = filenameBase + '.mp4';

            a.href = url;
            document.body.appendChild(a); a.click(); document.body.removeChild(a);
            setTimeout(() => URL.revokeObjectURL(url), 8000);
            showToast('Video downloaded! Use chroma key in your editor to remove the green.', 'success');
            if (onDone) onDone();
        };

        recorder.start(200);

        const totalFrames = FPS * DURATION;
        let frameCount = 0;

        function drawNextFrame() {
            if (frameCount > totalFrames) {
                recorder.stop();
                return;
            }
            const t = frameCount / totalFrames; // 0..1

            ctx.clearRect(0, 0, W, H);

            switch (previewType) {
                case 'youtube-banner':
                case 'youtube-banner-dark':
                    _drawYTBanner(ctx, t, name, initial, profileImg, previewType.includes('dark'));
                    break;
                case 'intro-outro':
                    _drawIntroOutro(ctx, t, name);
                    break;
                case 'logo-reveal':
                    _drawLogoReveal(ctx, t, initial);
                    break;
                case 'social-story':
                case 'social-post':
                    _drawSocial(ctx, t, name);
                    break;
                case 'title-card':
                    _drawTitleCard(ctx, t, name);
                    break;
                case 'lower-third':
                    _drawLowerThird(ctx, t, name);
                    break;
                case 'subscribe-anim':
                    _drawSubscribe(ctx, t, name, initial, profileImg);
                    break;
                default:
                    _drawDefault(ctx, t, name);
            }

            frameCount++;
            setTimeout(drawNextFrame, 1000 / FPS);
        }

        drawNextFrame();
    }

    // Pre-load profile image
    if (userData.profilePicUrl) {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => startRecording(img);
        img.onerror = () => startRecording(null);
        img.src = userData.profilePicUrl;
    } else {
        startRecording(null);
    }

    // ── Per-template Canvas draw functions ────────────────────────────────────

    function _drawYTBanner(ctx, t, name, initial, img, isDark) {
        ctx.fillStyle = '#00B140';
        ctx.fillRect(0, 0, W, H);

        const cx = W/2, cy = H/2, ar = 56;

        // Avatar
        const av = _scaleIn(t, 0);
        ctx.save();
        ctx.globalAlpha = av.op;
        ctx.translate(cx - 180, cy);
        ctx.scale(av.sc, av.sc);
        ctx.beginPath();
        ctx.arc(0, 0, ar, 0, Math.PI*2);
        ctx.fillStyle = '#CC0000';
        ctx.fill();
        if (img) {
            ctx.save();
            ctx.beginPath(); ctx.arc(0, 0, ar, 0, Math.PI*2); ctx.clip();
            ctx.drawImage(img, -ar, -ar, ar*2, ar*2);
            ctx.restore();
        } else {
            ctx.fillStyle = 'white';
            ctx.font = 'bold 38px sans-serif';
            ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(initial, 0, 0);
        }
        ctx.restore();

        // Name
        const nm = _slideRight(t, 0.3);
        ctx.save();
        ctx.globalAlpha = nm.op;
        ctx.translate(cx - 100 + nm.tx, cy);
        ctx.fillStyle = isDark ? '#ffffff' : '#222222';
        ctx.font = 'bold 36px sans-serif';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(name.substring(0, 18), 0, 0);
        ctx.restore();

        // Subscribe
        const sb = _subPop(t, 0.8);
        ctx.save();
        ctx.globalAlpha = sb.op;
        const bW = 180, bH = 50;
        ctx.translate(cx + 220, cy);
        ctx.scale(sb.sc, sb.sc);
        ctx.fillStyle = '#CC0000';
        _rrect(ctx, -bW/2, -bH/2, bW, bH, 6); ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('Subscribe', 0, 0);
        ctx.restore();
    }

    function _drawIntroOutro(ctx, t, name) {
        const g = ctx.createLinearGradient(0,0,W,H);
        g.addColorStop(0,'#0f0c29'); g.addColorStop(0.5,'#302b63'); g.addColorStop(1,'#24243e');
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);

        const ti = _slideUp(t, 0);
        ctx.save();
        ctx.globalAlpha = ti.op;
        ctx.translate(W/2, H/2 - 20 + ti.ty);
        ctx.fillStyle = '#1C93FF';
        ctx.shadowColor = 'rgba(28,147,255,0.6)'; ctx.shadowBlur = 30;
        ctx.font = 'bold 80px Oswald,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(name.substring(0,22), 0, 0);
        ctx.restore();

        const lw = _lineW(t, 0.4, 160);
        ctx.fillStyle = '#1C93FF';
        ctx.fillRect(W/2 - lw/2, H/2 + 50, lw, 4);
    }

    function _drawLogoReveal(ctx, t, initial) {
        ctx.fillStyle = '#111'; ctx.fillRect(0,0,W,H);
        const av = _scaleIn(t, 0);
        const glow = 0.1 + 0.4 * Math.abs(Math.sin(t * Math.PI * 2));
        ctx.save();
        ctx.globalAlpha = av.op;
        ctx.translate(W/2, H/2);
        ctx.scale(av.sc, av.sc);
        ctx.shadowColor = `rgba(28,147,255,${glow})`; ctx.shadowBlur = 50;
        ctx.strokeStyle = '#1C93FF'; ctx.lineWidth = 5;
        ctx.beginPath(); ctx.arc(0,0,110,0,Math.PI*2); ctx.stroke();
        ctx.fillStyle = '#1C93FF';
        ctx.font = 'bold 90px Oswald,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(initial, 0, 0);
        ctx.restore();
    }

    function _drawSocial(ctx, t, name) {
        const g = ctx.createLinearGradient(0,0,W,H);
        g.addColorStop(0,'#f093fb'); g.addColorStop(1,'#f5576c');
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
        const ti = _slideUp(t, 0);
        ctx.save();
        ctx.globalAlpha = ti.op;
        ctx.translate(W/2, H/2 + ti.ty);
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.3)'; ctx.shadowBlur = 12;
        ctx.font = 'bold 72px Oswald,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(name.substring(0,22), 0, 0);
        ctx.restore();
    }

    function _drawTitleCard(ctx, t, name) {
        const g = ctx.createLinearGradient(0,0,W,H);
        g.addColorStop(0,'#0c0c0c'); g.addColorStop(1,'#1c1c1c');
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
        const ti = _slideUp(t, 0);
        ctx.save();
        ctx.globalAlpha = ti.op;
        ctx.translate(W/2, H/2 + ti.ty);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 88px Oswald,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(name.toUpperCase().substring(0,18), 0, 0);
        ctx.restore();
    }

    function _drawLowerThird(ctx, t, name) {
        ctx.fillStyle = '#00B140'; ctx.fillRect(0,0,W,H);
        const card = _slideUp(t, 0);
        ctx.save();
        ctx.globalAlpha = card.op;
        ctx.translate(80, H - 160 + card.ty);
        ctx.fillStyle = '#1C93FF';
        ctx.fillRect(0, 0, 8, 70);
        const tw = Math.max(220, name.length * 20);
        ctx.fillStyle = 'rgba(0,0,0,0.88)';
        ctx.fillRect(8, 0, tw + 40, 70);
        ctx.fillStyle = 'white';
        ctx.font = 'bold 34px Cabin,sans-serif';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(name.substring(0,28), 28, 35);
        ctx.restore();
    }

    function _drawSubscribe(ctx, t, name, initial, img) {
        ctx.fillStyle = '#00B140'; ctx.fillRect(0,0,W,H);
        const cx = W/2, cy = H/2;

        // Card
        const av = _scaleIn(t, 0);
        ctx.save();
        ctx.globalAlpha = av.op;
        ctx.translate(cx, cy - 60);
        ctx.scale(av.sc, av.sc);
        const cW = 300, cH = 64;
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.15)'; ctx.shadowBlur = 20;
        _rrect(ctx, -cW/2, -cH/2, cW, cH, 12); ctx.fill();
        ctx.shadowBlur = 0;
        const ar2 = 22;
        ctx.beginPath(); ctx.arc(-cW/2+42, 0, ar2, 0, Math.PI*2);
        ctx.fillStyle = '#CC0000'; ctx.fill();
        if (img) {
            ctx.save(); ctx.beginPath(); ctx.arc(-cW/2+42, 0, ar2, 0, Math.PI*2); ctx.clip();
            ctx.drawImage(img, -cW/2+20, -ar2, ar2*2, ar2*2); ctx.restore();
        } else {
            ctx.fillStyle='white'; ctx.font='bold 20px sans-serif';
            ctx.textAlign='center'; ctx.textBaseline='middle';
            ctx.fillText(initial, -cW/2+42, 0);
        }
        ctx.fillStyle = '#333';
        ctx.font = 'bold 24px sans-serif';
        ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(name.substring(0,16), -cW/2+76, 0);
        ctx.restore();

        // Subscribe btn
        const sb = _subPop(t, 0.8);
        ctx.save();
        ctx.globalAlpha = sb.op;
        ctx.translate(cx, cy + 40);
        ctx.scale(sb.sc, sb.sc);
        const bW = 220, bH = 60;
        ctx.fillStyle = '#CC0000';
        _rrect(ctx, -bW/2, -bH/2, bW, bH, 8); ctx.fill();
        ctx.fillStyle = 'white';
        ctx.font = 'bold 30px sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('SUBSCRIBE', 0, 0);
        ctx.restore();
    }

    function _drawDefault(ctx, t, name) {
        ctx.fillStyle = '#00B140'; ctx.fillRect(0,0,W,H);
        const card = _slideUp(t, 0);
        ctx.save();
        ctx.globalAlpha = card.op;
        ctx.translate(W/2, H/2 + card.ty);
        const cW = 340, cH = 80;
        ctx.fillStyle = 'white';
        ctx.shadowColor = 'rgba(0,0,0,0.12)'; ctx.shadowBlur = 20;
        _rrect(ctx, -cW/2, -cH/2, cW, cH, 14); ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = '#333';
        ctx.font = 'bold 32px Cabin,sans-serif';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(name.substring(0,22), 0, 0);
        ctx.restore();
    }
}



function generateFromNewOrder() {
    const template = TEMPLATES.find(t => t.id === activeTemplateId);
    if (!template) return;

    const username = document.getElementById('new-order-username').value.trim();
    if (!username) {
        showToast('Please enter a username.', 'error');
        document.getElementById('new-order-username').focus();
        return;
    }

    const btn = document.getElementById('btn-generate-order');
    btn.classList.add('generating');
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v8m0 0l-3-3m3 3l3-3" stroke-linecap="round"/><circle cx="12" cy="12" r="9" opacity="0.3"/></svg> Preparing download...`;

    // Save the order
    const now = new Date().toISOString();
    const order = {
        id: generateUUID(),
        name: template.name,
        template: template.name,
        templateId: template.id,
        templateUrl: '#',
        createdAt: now,
        expiresAt: getExpiryDate(now),
        cost: template.cost,
        userInput: {
            username: username,
            profilePicUrl: uploadedImageDataUrl
        },
        downloads: [
            { label: 'PNG / Green Screen / High Quality', format: 'PNG', resolution: '1080x540', quality: 'HD', size: 'Auto' }
        ],
        previewType: template.previewType
    };

    const orders = loadOrders();
    orders.unshift(order);
    saveOrders(orders);

    const safeName = template.name.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();
    const safeUser = username.replace(/[^a-zA-Z0-9]+/g, '_');

    showToast('Recording video... please wait (~5s)', 'success');

    downloadPreviewAsVideo(
        template.previewType,
        { username, profilePicUrl: uploadedImageDataUrl },
        `${safeName}_${safeUser}`,
        () => {
            btn.classList.remove('generating');
            btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="7,10 12,15 17,10" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round"/></svg> Download (Green Screen)`;
        }
    );
}

// ============================================
// Orders Page
// ============================================

let selectedOrderId = null;

function renderOrderCard(order, isSelected) {
    const card = document.createElement('div');
    card.className = `order-card${isSelected ? ' selected' : ''}`;
    card.setAttribute('data-order-id', order.id);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
        <div class="order-thumbnail">
            <div class="checker-bg">
                <div class="preview-content">${getPreviewSVGForOrder(order)}</div>
            </div>
        </div>
        <div class="order-info">
            <div class="order-name">${escapeHTML(order.name)}</div>
            <div class="order-created">Created on<br><span>${formatDate(order.createdAt)}</span></div>
            <div class="order-expiry">${isExpired(order.expiresAt) ? 'Expired' : 'Will be removed'} on ${formatDate(order.expiresAt)}</div>
        </div>`;
    card.addEventListener('click', () => selectOrder(order.id));
    return card;
}

function renderPropertiesPanel(order) {
    const panelContent = document.getElementById('panel-content');
    if (!order) {
        panelContent.innerHTML = `<div class="panel-empty"><svg width="48" height="48" viewBox="0 0 48 48" fill="none" style="margin-bottom:12px;opacity:0.3;"><rect x="4" y="8" width="40" height="32" rx="4" stroke="currentColor" stroke-width="2"/><path d="M4 16h40" stroke="currentColor" stroke-width="2"/></svg><p>Select an order to view its properties</p></div>`;
        return;
    }

    const downloadsOptions = order.downloads.map((d, i) => `<option value="${i}">${escapeHTML(d.label)}</option>`).join('');

    panelContent.innerHTML = `
        <div class="downloads-section">
            <div class="downloads-label">Downloads</div>
            <div class="downloads-select-wrapper">
                <select class="downloads-select" id="download-format-select">${downloadsOptions}</select>
            </div>
            <button class="btn-download" id="btn-download-order">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke-linecap="round" stroke-linejoin="round"/><polyline points="7,10 12,15 17,10" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Download WebM (Green Screen)
            </button>
        </div>
        <div class="preview-section">
            <div class="preview-image" id="panel-preview-render"></div>
        </div>
        <div class="details-table">
            <div class="details-row"><span class="details-label">Template</span><span class="details-value"><a href="#" id="template-link">${escapeHTML(order.template)}</a></span></div>
            <div class="details-row"><span class="details-label">Generated</span><span class="details-value">${formatDate(order.createdAt)}</span></div>
            <div class="details-row"><span class="details-label">Cost</span><span class="details-value">${order.cost} credits</span></div>
            <div class="details-row"><span class="details-label danger">Will be removed</span><span class="details-value">${formatDate(order.expiresAt)}</span></div>
        </div>
        <div class="removal-notice">To save space and keep the free offering, we're removing orders of non-pro users after 24h. Be sure to download them before then, or <a href="#" onclick="navigateTo('upgrade');return false;">upgrade to pro</a></div>`;

    // Render preview with user data
    const previewEl = document.getElementById('panel-preview-render');
    if (previewEl && order.templateId && order.userInput) {
        renderPreview(order.previewType, order.userInput, previewEl);
    }

    const dlBtn = document.getElementById('btn-download-order');
    if (dlBtn) {
        dlBtn.addEventListener('click', () => {
            const safeName = order.name.replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase();
            const safeUser = (order.userInput.username || 'template').replace(/[^a-zA-Z0-9]+/g, '_');
            dlBtn.textContent = 'Recording...';
            dlBtn.disabled = true;
            showToast('Recording video... please wait (~5s)', 'success');
            downloadPreviewAsVideo(
                order.previewType,
                order.userInput,
                `${safeName}_${safeUser}`,
                () => {
                    dlBtn.disabled = false;
                    dlBtn.textContent = 'Download WebM (Green Screen)';
                }
            );
        });
    }
}

function selectOrder(orderId) {
    selectedOrderId = orderId;
    updateURL(orderId);
    document.querySelectorAll('.order-card').forEach(c => c.classList.toggle('selected', c.getAttribute('data-order-id') === orderId));
    const orders = loadOrders();
    renderPropertiesPanel(orders.find(o => o.id === orderId));
}

function renderOrders() {
    const orders = loadOrders();
    const list = document.getElementById('orders-list');
    list.innerHTML = '';

    let selectedId = getSelectedOrderFromURL() || (orders.length > 0 ? orders[0].id : null);
    if (selectedId && !orders.find(o => o.id === selectedId)) selectedId = orders.length > 0 ? orders[0].id : null;
    selectedOrderId = selectedId;

    if (orders.length === 0) {
        list.innerHTML = `<div style="text-align:center;padding:60px 20px;color:var(--gray-400);"><svg width="64" height="64" viewBox="0 0 64 64" fill="none" style="margin-bottom:16px;opacity:0.3;"><rect x="8" y="12" width="48" height="40" rx="4" stroke="currentColor" stroke-width="2"/><path d="M8 24h48" stroke="currentColor" stroke-width="2"/></svg><p style="font-size:16px;margin-bottom:8px;">No orders yet</p><p style="font-size:14px;margin-bottom:20px;">Browse templates and generate your first effect!</p><button class="btn-start" onclick="navigateTo('browse');">Browse Templates</button></div>`;
        renderPropertiesPanel(null);
        return;
    }

    orders.forEach(o => list.appendChild(renderOrderCard(o, o.id === selectedId)));
    renderPropertiesPanel(orders.find(o => o.id === selectedId));
    if (selectedId) updateURL(selectedId);
}

// ============================================
// Init
// ============================================

function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        document.getElementById('main-header').classList.toggle('scrolled', window.scrollY > 10);
    }, { passive: true });
}

function initMobileMenu() {
    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
        document.getElementById('mobile-overlay').classList.add('active');
        document.getElementById('mobile-menu').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    document.getElementById('mobile-close-btn').addEventListener('click', closeMobileMenu);
    document.getElementById('mobile-overlay').addEventListener('click', closeMobileMenu);
}

document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMobileMenu();
    initBrowsePage();
    initNewOrderPage();

    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
        e.preventDefault();
        if (document.getElementById('newsletter-email').value) {
            showToast('Thanks for subscribing!', 'success');
            e.target.reset();
        }
    });

    if (!localStorage.getItem(ORDERS_STORAGE_KEY)) saveOrders(DEFAULT_ORDERS);

    const urlOrderId = getSelectedOrderFromURL();
    if (urlOrderId) navigateTo('orders');
    else navigateTo('browse');
});

window.addEventListener('popstate', () => {
    const orderId = getSelectedOrderFromURL();
    if (orderId) { navigateTo('orders'); selectOrder(orderId); }
});

// Global functions for inline handlers
window.navigateTo = navigateTo;
window.closeMobileMenu = closeMobileMenu;
window.showToast = showToast;
window.openNewOrder = openNewOrder;
window.useProfile = useProfile;
window.removeProfile = removeProfile;