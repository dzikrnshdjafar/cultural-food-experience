document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const page1 = document.getElementById('page1');
    const page2 = document.getElementById('page2');
    const page3 = document.getElementById('page3');
    
    const btnOpen = document.getElementById('btn-open');
    const btnNext = document.getElementById('btn-next');
    const btnBack = document.getElementById('btn-back');
    const inputName = document.getElementById('input-name');
    // const greetingText = document.getElementById('greeting-text');
    
    const menuCards = document.querySelectorAll('.menu-card');
    const btnConfirm = document.getElementById('btn-confirm');
    
    const popupModal = document.getElementById('popup-modal');
    const btnCancel = document.getElementById('btn-cancel');
    const btnSubmit = document.getElementById('btn-submit');
    const selectedMenuText = document.getElementById('selected-menu-text');
    const submitText = document.getElementById('submit-text');
    const submitLoader = document.getElementById('submit-loader');
    
    const successMessage = document.getElementById('success-message');

    // --- State ---
    let userName = '';
    let selectedMenu = '';

    // --- Navigation Functions ---
    function navigateTo(fromPage, toPage) {
        fromPage.classList.remove('active');
        fromPage.classList.add('leave');
        setTimeout(() => {
            fromPage.classList.add('hidden');
            fromPage.classList.remove('leave');
            
            toPage.classList.remove('hidden');
            
            setTimeout(() => {
                toPage.classList.add('active');
            }, 50);
        }, 500); // Wait for transition
    }

    // --- Event Listeners ---

    // 1. Landing -> Form
    btnOpen.addEventListener('click', () => {
        navigateTo(page1, page2);
        setTimeout(() => inputName.focus(), 600);
    });

    // Handle Input Name Changes
    inputName.addEventListener('input', (e) => {
        userName = e.target.value.trim();
        if (userName.length > 0) {
            btnNext.disabled = false;
        } else {
            btnNext.disabled = true;
        }
    });

    // 2. Form -> Menu
    btnNext.addEventListener('click', () => {
        if (!userName) return;
        // greetingText.textContent = `Halo ${userName}, silakan pilih satu menu yang ingin Anda nikmati.`;
        navigateTo(page2, page3);
        window.scrollTo(0, 0);
    });

    if (btnBack) {
        btnBack.addEventListener('click', () => {
            navigateTo(page3, page2);
        });
    }

    // Enter key support for input
    inputName.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && userName) {
            btnNext.click();
        }
    });

    // 3. Menu Selection
    menuCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove selection from all
            menuCards.forEach(c => c.classList.remove('selected'));
            
            // Add selection to clicked
            card.classList.add('selected');
            selectedMenu = card.getAttribute('data-menu');
            
            // Enable confirm button if it exists
            if (btnConfirm) {
                btnConfirm.disabled = false;
                btnConfirm.classList.remove('bg-gray-400', 'cursor-not-allowed', 'opacity-50', 'bg-zinc-800');
                // btnConfirm.classList.add('bg-[#d2691e]', 'hover:bg-[#b05819]', 'hover:-translate-y-1', 'bg-emerald-600', 'hover:bg-emerald-700');
            } else {
                // If there's no confirm button, immediately show popup modal
                if (!selectedMenu) return;
                selectedMenuText.textContent = selectedMenu;
                
                popupModal.classList.remove('hidden');
                setTimeout(() => {
                    popupModal.classList.remove('opacity-0');
                    popupModal.firstElementChild.classList.remove('scale-95');
                }, 10);
            }
        });
    });

    // 4. Show Confirmation Popup (Only if btnConfirm exists)
    if (btnConfirm) {
        btnConfirm.addEventListener('click', () => {
            if (!selectedMenu) return;
            selectedMenuText.textContent = selectedMenu;
            
            popupModal.classList.remove('hidden');
            // Small delay for transition
            setTimeout(() => {
                popupModal.classList.remove('opacity-0');
                popupModal.firstElementChild.classList.remove('scale-95');
            }, 10);
        });
    }

    // Close Popup
    function closePopup() {
        popupModal.classList.add('opacity-0');
        popupModal.firstElementChild.classList.add('scale-95');
        setTimeout(() => {
            popupModal.classList.add('hidden');
        }, 300);
    }

    btnCancel.addEventListener('click', closePopup);
    
    // Close modal if clicked outside
    popupModal.addEventListener('click', (e) => {
        if (e.target === popupModal) {
            closePopup();
        }
    });

    // 5. Submit to Google Spreadsheet
    btnSubmit.addEventListener('click', async () => {
        // UI Loading State
        submitText.classList.add('invisible');
        submitLoader.classList.remove('hidden');
        btnSubmit.disabled = true;
        btnCancel.disabled = true;


        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbysgvhJejzQJnsCjwinLv-QmkfTZV9ahLi-IIEzBH55d2Pp4_uYbgtAa56agvWY0XgdMg/exec'; // GANTI INI NANTI
        
        try {
            // Dummy network delay if SCRIPT_URL is not configured to show it works
            if(SCRIPT_URL.includes('XXXXXXXXX')) {
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log("Simulated Submit:", { nama: userName, menu: selectedMenu });
            } else {
                
                const urlencoded = new URLSearchParams();
                urlencoded.append('nama', userName);
                urlencoded.append('menu', selectedMenu);
                
                await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: urlencoded,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    mode: 'no-cors'
                });
            }

            // Success
            closePopup();
            
            inputName.value = '';
            userName = '';
            btnNext.disabled = true;
            
            showSuccess();
            
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
            
            // Reset UI
            submitText.classList.remove('invisible');
            submitLoader.classList.add('hidden');
            btnSubmit.disabled = false;
            btnCancel.disabled = false;
        }
    });

    function showSuccess() {
        successMessage.classList.remove('hidden');
        setTimeout(() => {
            successMessage.classList.remove('opacity-0');
        }, 10);
    }
});
