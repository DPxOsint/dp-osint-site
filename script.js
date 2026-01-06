// AI TECH LAB Website - JavaScript File

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initNavigation();
    initScrollAnimations();
    initChatBot();
    initContactForm();
    initBackToTop();
    initSmoothScrolling();

    console.log('AI TECH LAB Website initialized successfully!');
});

// Navigation Menu Toggle (Mobile)
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fade-in Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const checkFade = () => {
        fadeElements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight - 150) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
    checkFade();
}

// ================= CHATBOT (GROQ AI) =================
function initChatBot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');

    // 🔑 GROQ CONFIG
    const GROQ_API_KEY = "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";
    const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

    function getCurrentTime() {
        const now = new Date();
        return ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')};
    }

    function addMessage(content, isUser = false) {
        const div = document.createElement('div');
        div.className = message ${isUser ? 'user-message' : 'bot-message fade-in'};

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';

        const p = document.createElement('p');
        p.textContent = content;

        const time = document.createElement('div');
        time.className = 'message-time';
        time.textContent = getCurrentTime();

        contentDiv.appendChild(p);
        div.appendChild(contentDiv);
        div.appendChild(time);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        if (!isUser) {
            setTimeout(() => div.classList.add('visible'), 100);
        }
    }

    function showTypingIndicator() {
        const div = document.createElement('div');
        div.className = 'message bot-message';
        div.id = 'typingIndicator';

        const content = document.createElement('div');
        content.className = 'message-content';

        const typing = document.createElement('div');
        typing.className = 'typing-indicator';
        typing.innerHTML = '<span></span><span></span><span></span>';

        content.appendChild(typing);
        div.appendChild(content);
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        return div;
    }

    async function processUserMessage() {
        const msg = chatInput.value.trim();
        if (!msg) return;

        addMessage(msg, true);
        chatInput.value = '';

        const typing = showTypingIndicator();

        try {
            const res = await fetch(GROQ_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": Bearer ${GROQ_API_KEY}
                },
                body: JSON.stringify({
                    model: "llama3-70b-8192",
                    messages: [
                        { role: "system", content: "You are a powerful AI assistant." },
                        { role: "user", content: msg }
                    ],
                    temperature: 0.7
                })
            });

            const data = await res.json();
            typing.remove();

            addMessage(data.choices[0].message.content);

        } catch (e) {
            typing.remove();
            addMessage("⚠️ AI error. Please try again.");
            console.error(e);
        }
    }

    sendButton.addEventListener('click', processUserMessage);
    chatInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') processUserMessage();
    });

    suggestionButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            chatInput.value = btn.getAttribute('data-message');
            processUserMessage();
        });
    });

    setTimeout(() => {
        addMessage("👋 Hello! Main AI TECH LAB ka real AI assistant hoon. Aap kya puchhna chahoge?");
    }, 1000);
}

// Contact Form
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        document.getElementById('formSuccess').textContent =
            'Thank you for your message! Our AI team will get back to you soon.';
    });
}

// Back to Top
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 300);
    });
}
