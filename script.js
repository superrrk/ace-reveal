// Clean and Simple ACE Reveal Script
document.addEventListener('DOMContentLoaded', function() {
    console.log('ACE Reveal initialized');
    
    // Get DOM elements
    const envelope = document.getElementById('envelope');
    const envelopeFlap = document.getElementById('envelopeFlap');
    const revealButton = document.getElementById('revealButton');
    const letter = document.getElementById('letter');
    const closeButton = document.getElementById('closeButton');
    const familiesSection = document.getElementById('familiesSection');
    const familiesGrid = document.getElementById('familiesGrid');
    const confettiContainer = document.getElementById('confetti-container');
    
    // Family data
    const familyData = {
        "Fam 1": [
            { name: "Chante Vu Nguyen", role: "big" },
            { name: "Cathy Nguyen", role: "little" },
            { name: "Joseph Leisz", role: "little" },
            { name: "Kayla Pham", role: "big" },
            { name: "Caylene Nguyen", role: "little" },
            { name: "Alex Lam-Tang", role: "little" },
            { name: "Bao To", role: "big" },
            { name: "Conor Lee", role: "little" }
        ],
        "Fam 2": [
            { name: "Ruby Ho", role: "big" },
            { name: "Kyle Nguyen", role: "little" },
            { name: "Quynh Anh", role: "little" },
            { name: "Lily Pham", role: "big" },
            { name: "Hana Parker", role: "little" },
            { name: "Anna Pho", role: "little" },
            { name: "Lyna Huynh", role: "big" },
            { name: "Lindsay Phung", role: "little" },
            { name: "Mabel Vo", role: "big" }
        ],
        "Fam 3": [
            { name: "Kiet Anh Ma", role: "big" },
            { name: "Winston Vuong", role: "little" },
            { name: "Jordan Pham", role: "little" },
            { name: "Kai Do", role: "big" },
            { name: "Raymond Vo", role: "little" },
            { name: "Tiffany Vo", role: "big" },
            { name: "Trang Truong", role: "little" },
            { name: "Tam Truong", role: "big" }
        ],
        "Fam 4": [
            { name: "Justine Pui Ying Mach", role: "big" },
            { name: "Luciana Piro", role: "little" },
            { name: "Maddie Rejab", role: "little" },
            { name: "Lilian Nguyen", role: "big" },
            { name: "Kaili Kirschbaum", role: "little" },
            { name: "Minh Anh Bui", role: "little" },
            { name: "Ngan Nguyen (oregon 2028)", role: "big" },
            { name: "Henry Do", role: "little" },
            { name: "Donald Chu", role: "little" }
        ],
        "Fam 5": [
            { name: "Thuyvy Tran", role: "big" },
            { name: "Mia Le", role: "little" },
            { name: "Ngan Nguyen (syracuse 2029)", role: "little" },
            { name: "Stephanie Tran", role: "big" },
            { name: "Thia Joy Ostrander", role: "little" },
            { name: "Eva Stern", role: "big" },
            { name: "Linh Dang", role: "little" }
        ],
        "Fam 6": [
            { name: "Brian Phan", role: "big" },
            { name: "Victor Van", role: "little" },
            { name: "Nhi Duong", role: "big" },
            { name: "Kim Hoang", role: "little" },
            { name: "Kaylah Le", role: "little" },
            { name: "Vinh Vuong", role: "big" },
            { name: "Han Luu Nguyen", role: "little" }
        ]
    };
    
    // Create families HTML
    function createFamiliesHTML() {
        let html = '';
        Object.keys(familyData).forEach(familyName => {
            html += `<div class="family-group">
                <h4>${familyName}</h4>`;
            
            familyData[familyName].forEach(member => {
                html += `<div class="family-member ${member.role}">
                    <span class="member-role ${member.role}">${member.role === 'big' ? (['Alex', 'Joseph', 'Conor', 'Kyle', 'Winston', 'Jordan', 'Kai', 'Raymond', 'Henry', 'Donald', 'Victor', 'Vinh', 'Kiet', 'Bao', 'Tam', 'Brian'].some(name => member.name.toLowerCase().includes(name.toLowerCase())) ? 'Anh' : 'Chị') : 'Em'}</span>
                    <span class="member-name">${member.name}</span>
                </div>`;
            });
            
            html += '</div>';
        });
        return html;
    }
    
    // Initialize families
    familiesGrid.innerHTML = createFamiliesHTML();
    
    let isRevealed = false;
    
    // Reveal button click handler
    revealButton.addEventListener('click', function() {
        console.log('Reveal button clicked');
        
        if (isRevealed) {
            resetReveal();
            return;
        }
        
        // Disable button
        revealButton.disabled = true;
        revealButton.textContent = 'Opening...';
        
        // Open envelope flap
        envelopeFlap.classList.add('opened');
        
        // Show letter after flap opens
        setTimeout(() => {
            letter.classList.add('revealed');
            
            // Show families section
            setTimeout(() => {
                familiesSection.classList.add('revealed');
                
                // Animate family groups
                const familyGroups = document.querySelectorAll('.family-group');
                familyGroups.forEach((group, index) => {
                    setTimeout(() => {
                        group.classList.add('revealed');
                    }, index * 100);
                });
                
                // Create confetti
                createConfetti();
                
                // Update button
                revealButton.disabled = false;
                revealButton.textContent = 'Open Again';
                isRevealed = true;
                
            }, 500);
            
        }, 500);
    });
    
    // Close button click handler
    closeButton.addEventListener('click', function() {
        console.log('Close button clicked');
        resetReveal();
    });
    
    // Reset function
    function resetReveal() {
        // Hide letter
        letter.classList.remove('revealed');
        
        // Close envelope
        envelopeFlap.classList.remove('opened');
        
        // Hide families
        familiesSection.classList.remove('revealed');
        
        // Reset family groups
        const familyGroups = document.querySelectorAll('.family-group');
        familyGroups.forEach(group => {
            group.classList.remove('revealed');
        });
        
        // Reset button
        revealButton.textContent = 'Open';
        revealButton.disabled = false;
        
        // Clear confetti
        confettiContainer.innerHTML = '';
        
        isRevealed = false;
    }
    
    // Create confetti
    function createConfetti() {
        const colors = ['#dc143c', '#ffd700', '#ffffff'];
        const count = 30;
        
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confettiContainer.appendChild(confetti);
                
                // Remove confetti after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 3000);
            }, i * 50);
        }
    }
    
    console.log('All elements initialized:', {
        envelope: !!envelope,
        flap: !!envelopeFlap,
        button: !!revealButton,
        letter: !!letter,
        closeButton: !!closeButton,
        families: !!familiesSection
    });
});