// AI TECH LAB Website - JavaScript File

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
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
    
    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
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

// Fade-in Scroll Animations
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Function to check if element is in viewport
    const checkFade = () => {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    };
    
    // Set initial fade-in class to elements
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Check on load and scroll
    window.addEventListener('scroll', checkFade);
    window.addEventListener('load', checkFade);
    
    // Initial check
    checkFade();
}

// AI Chat Bot Logic
function initChatBot() {
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendButton = document.getElementById('sendButton');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    // Predefined AI responses
    const aiResponses = {
        greetings: [
            "Hello! How can I assist you with AI technology today?",
            "Hi there! I'm your AI assistant. What would you like to know about artificial intelligence?",
            "Greetings! I'm here to help you explore the world of AI and technology."
        ],
        ai: [
            "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. These intelligent systems can perform tasks that typically require human intelligence, such as visual perception, speech recognition, decision-making, and language translation.",
            "AI is a broad field of computer science focused on creating smart machines capable of performing tasks that typically require human intelligence. Modern AI includes machine learning, deep learning, natural language processing, and computer vision.",
            "At its core, AI is about creating systems that can learn, reason, and solve problems. From voice assistants like Siri to recommendation algorithms on Netflix, AI is already deeply integrated into our daily lives."
        ],
        services: [
            "We offer three main AI services: 1) AI Tools - Custom solutions for specific business challenges, 2) Automation - Streamlining workflows with intelligent systems, and 3) Machine Learning - Advanced algorithms that learn from your data to provide insights and predictions.",
            "Our services include AI tool development, intelligent automation, and machine learning solutions. Each service is tailored to help businesses leverage AI for improved efficiency, insights, and innovation.",
            "We provide end-to-end AI solutions including predictive analytics, natural language processing tools, robotic process automation, and custom ML models designed to solve your specific business problems."
        ],
        business: [
            "AI can help businesses in numerous ways: automating repetitive tasks, providing data-driven insights, enhancing customer experiences through personalization, improving decision-making with predictive analytics, and optimizing operations for efficiency.",
            "By implementing AI, businesses can gain competitive advantages through automation, predictive analytics, personalized customer experiences, and operational optimization. AI can transform how you interact with customers, manage data, and make strategic decisions.",
            "AI benefits businesses through cost reduction (via automation), revenue growth (through personalized recommendations), improved customer satisfaction (with 24/7 chatbots), and better decision-making (with data analytics)."
        ],
        future: [
            "The future of AI includes more advanced natural language processing, autonomous systems, AI-assisted creativity, personalized medicine, and smarter cities. As AI continues to evolve, it will become more integrated into every aspect of our lives.",
            "Future AI trends include explainable AI (making AI decisions understandable), AI ethics and governance, edge AI (processing data locally), and AI-human collaboration tools that enhance rather than replace human capabilities."
        ],
        default: [
            "That's an interesting question! Could you provide more details so I can give you a more specific answer?",
            "I'm not sure I understand completely. Could you rephrase that or ask about something specific related to AI?",
            "I'm designed to answer questions about artificial intelligence, technology, and our services. Feel free to ask me anything in those areas!"
        ]
    };
    
    // Function to get a random response from a category
    function getRandomResponse(category) {
        const responses = aiResponses[category] || aiResponses.default;
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Function to determine response category based on user input
    function getResponseCategory(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'greetings';
        } else if (message.includes('what is ai') || message.includes('artificial intelligence') || message.includes('define ai')) {
            return 'ai';
        } else if (message.includes('service') || message.includes('offer') || message.includes('provide')) {
            return 'services';
        } else if (message.includes('business') || message.includes('company') || message.includes('help my')) {
            return 'business';
        } else if (message.includes('future') || message.includes('next') || message.includes('trend')) {
            return 'future';
        } else {
            return 'default';
        }
    }
    
    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message fade-in'}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const messageText = document.createElement('p');
        messageText.textContent = content;
        
        const messageTime = document.createElement('div');
        messageTime.className = 'message-time';
        messageTime.textContent = getCurrentTime();
        
        messageContent.appendChild(messageText);
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        chatMessages.appendChild(messageDiv);
        
        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Trigger animation for bot messages
        if (!isUser) {
            setTimeout(() => {
                messageDiv.classList.add('visible');
            }, 100);
        }
    }
    
    // Function to simulate AI typing with a typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot-message';
        typingDiv.id = 'typingIndicator';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'typing-indicator';
        typingIndicator.innerHTML = '<span></span><span></span><span></span>';
        
        messageContent.appendChild(typingIndicator);
        typingDiv.appendChild(messageContent);
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return typingDiv;
    }
    
    // Function to get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }
    
    // Function to process user message
    function processUserMessage() {
        const userMessage = chatInput.value.trim();
        
        if (!userMessage) return;
        
        // Add user message to chat
        addMessage(userMessage, true);
        
        // Clear input field
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        // Simulate AI thinking time
        setTimeout(() => {
            // Remove typing indicator
            if (typingIndicator.parentNode) {
                typingIndicator.remove();
            }
            
            // Get AI response
            const category = getResponseCategory(userMessage);
            const aiResponse = getRandomResponse(category);
            
            // Add AI response to chat
            addMessage(aiResponse);
        }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
    }
    
    // Event Listeners for Chat
    sendButton.addEventListener('click', processUserMessage);
    
    chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            processUserMessage();
        }
    });
    
    // Suggestion buttons
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            chatInput.value = message;
            processUserMessage();
        });
    });
    
    // Initialize with a greeting from the bot
    setTimeout(() => {
        const greeting = getRandomResponse('greetings');
        addMessage(greeting);
    }, 1000);
}

// Contact Form Validation and Submission
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    const formSuccess = document.getElementById('formSuccess');
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (!name) {
            nameError.textContent = 'Name is required';
            return false;
        } else if (name.length < 2) {
            nameError.textContent = 'Name must be at least 2 characters';
            return false;
        } else {
            nameError.textContent = '';
            return true;
        }
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email) {
            emailError.textContent = 'Email is required';
            return false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address';
            return false;
        } else {
            emailError.textContent = '';
            return true;
        }
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (!message) {
            messageError.textContent = 'Message is required';
            return false;
        } else if (message.length < 10) {
            messageError.textContent = 'Message must be at least 10 characters';
            return false;
        } else {
            messageError.textContent = '';
            return true;
        }
    }
    
    // Real-time validation
    nameInput.addEventListener('blur', validateName);
    nameInput.addEventListener('input', function() {
        if (nameError.textContent) validateName();
    });
    
    emailInput.addEventListener('blur', validateEmail);
    emailInput.addEventListener('input', function() {
        if (emailError.textContent) validateEmail();
    });
    
    messageInput.addEventListener('blur', validateMessage);
    messageInput.addEventListener('input', function() {
        if (messageError.textContent) validateMessage();
    });
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Simulate form submission
            formSuccess.textContent = 'Thank you for your message! Our AI team will get back to you soon.';
            formSuccess.style.color = 'var(--success)';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                contactForm.reset();
                formSuccess.textContent = '';
            }, 5000);
            
            // In a real application, you would send the form data to a server here
            console.log('Form submitted with:', {
                name: nameInput.value,
                email: emailInput.value,
                message: messageInput.value
            });
        } else {
            formSuccess.textContent = 'Please fix the errors above before submitting.';
            formSuccess.style.color = 'var(--error)';
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
}