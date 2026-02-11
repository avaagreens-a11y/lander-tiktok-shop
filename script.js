// Recent claims data
const recentClaims = [
    { name: "Sarah M.", location: "Los Angeles, CA", amount: "$750" },
    { name: "Michael R.", location: "New York, NY", amount: "$750" },
    { name: "Jessica L.", location: "Miami, FL", amount: "$750" },
    { name: "David K.", location: "Chicago, IL", amount: "$750" },
    { name: "Emily T.", location: "Austin, TX", amount: "$750" },
    { name: "James P.", location: "Seattle, WA", amount: "$750" },
    { name: "Ashley B.", location: "Boston, MA", amount: "$750" },
    { name: "Ryan K.", location: "Denver, CO", amount: "$750" }
];

let currentClaimIndex = 0;

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    startLiveClaimsTicker();
    addSmoothScrolling();
    trackUserEngagement();
});

// Live claims ticker
function startLiveClaimsTicker() {
    const liveTextElement = document.getElementById('liveText');
    const stickyLiveTextElement = document.getElementById('stickyLiveText');
    
    setInterval(() => {
        currentClaimIndex = (currentClaimIndex + 1) % recentClaims.length;
        const claim = recentClaims[currentClaimIndex];
        const claimText = `${claim.name} from ${claim.location} just claimed ${claim.amount}!`;
        
        // Update main ticker
        if (liveTextElement) {
            liveTextElement.style.opacity = '0';
            setTimeout(() => {
                liveTextElement.textContent = claimText;
                liveTextElement.style.opacity = '1';
            }, 300);
        }
        
        // Update sticky ticker
        if (stickyLiveTextElement) {
            stickyLiveTextElement.style.opacity = '0';
            setTimeout(() => {
                stickyLiveTextElement.textContent = claimText;
                stickyLiveTextElement.style.opacity = '1';
            }, 300);
        }
    }, 3000);
}

// Handle claim button clicks
function handleClaimClick() {
    // Show loading state
    event.target.classList.add('loading');
    event.target.textContent = 'Processing...';
    
    // Simulate processing
    setTimeout(() => {
        // Remove loading state
        event.target.classList.remove('loading');
        event.target.textContent = 'Claim $750 Credits Now';
        
        // Show success message
        showSuccessModal();
        
        // Track conversion
        trackConversion();
    }, 1500);
}

// Show success modal
function showSuccessModal() {
    const modal = document.createElement('div');
    modal.className = 'success-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="success-icon">
                    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <h2>Claim Started!</h2>
                <p>You're on your way to claiming $750 in TikTok Shop credits. Follow the instructions to complete your claim.</p>
                <button onclick="closeModal(this)">Continue</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .success-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 9999;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-content {
            background: white;
            border-radius: 16px;
            padding: 30px;
            text-align: center;
            max-width: 400px;
            width: 100%;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        .success-icon {
            margin-bottom: 20px;
        }
        
        .modal-content h2 {
            font-size: 24px;
            font-weight: 700;
            color: #000000;
            margin-bottom: 10px;
        }
        
        .modal-content p {
            font-size: 16px;
            color: #666666;
            line-height: 24px;
            margin-bottom: 25px;
        }
        
        .modal-content button {
            background-color: #FE2C55;
            color: #FFFFFF;
            font-size: 16px;
            font-weight: 600;
            padding: 12px 24px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.2s ease;
        }
        
        .modal-content button:hover {
            background-color: #E02447;
        }
    `;
    document.head.appendChild(style);
}

// Close modal
function closeModal(button) {
    const modal = button.closest('.success-modal');
    modal.remove();
}

// Add smooth scrolling
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Track user engagement
function trackUserEngagement() {
    // Track time on page
    let timeOnPage = 0;
    setInterval(() => {
        timeOnPage++;
    }, 1000);
    
    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        maxScroll = Math.max(maxScroll, scrollPercent);
    });
    
    // Track before page unload
    window.addEventListener('beforeunload', () => {
        // Send analytics data (in a real app, this would go to an analytics service)
        console.log('Analytics:', {
            timeOnPage,
            maxScroll,
            deviceType: getDeviceType(),
            timestamp: new Date().toISOString()
        });
    });
}

// Track conversion
function trackConversion() {
    // In a real app, this would send conversion data to analytics
    console.log('Conversion tracked:', {
        timestamp: new Date().toISOString(),
        deviceType: getDeviceType(),
        userAgent: navigator.userAgent
    });
}

// Get device type
function getDeviceType() {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
}

// Add hover effects to buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.cta-button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.step, .testimonial, .badge');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.success-modal');
        if (modal) {
            modal.remove();
        }
    }
});

// Performance optimization - lazy load images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Service Worker registration for PWA (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
