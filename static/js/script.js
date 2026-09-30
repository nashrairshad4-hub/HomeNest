// HomeNest — Interactive JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // 1. Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(alert => {
        setTimeout(() => {
            const bsAlert = bootstrap.Alert.getOrCreateInstance(alert);
            if (bsAlert) {
                bsAlert.close();
            }
        }, 5000);
    });

    // 2. Interactive Image Gallery Thumbnail Switcher
    const mainGalleryImage = document.getElementById('mainGalleryImage');
    const thumbFrames = document.querySelectorAll('.thumb-frame');

    if (mainGalleryImage && thumbFrames.length > 0) {
        thumbFrames.forEach((frame) => {
            frame.addEventListener('click', () => {
                const img = frame.querySelector('img');
                if (img) {
                    mainGalleryImage.style.opacity = '0.3';
                    setTimeout(() => {
                        mainGalleryImage.src = img.src;
                        mainGalleryImage.style.opacity = '1';
                    }, 150);

                    thumbFrames.forEach(f => f.style.borderColor = 'transparent');
                    frame.style.borderColor = 'var(--primary-color)';
                }
            });
        });
    }

    // 3. AJAX Favorite Toggle for smooth UX
    const favForms = document.querySelectorAll('.fav-form-inline');
    favForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const icon = btn.querySelector('i');
            
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Accept': 'application/json'
                    }
                });

                if (response.redirected) {
                    window.location.href = response.url;
                    return;
                }

                const data = await response.json();
                if (data.success) {
                    if (data.favorited) {
                        icon.classList.remove('fa-regular');
                        icon.classList.add('fa-solid', 'text-danger');
                        btn.style.transform = 'scale(1.25)';
                        setTimeout(() => btn.style.transform = 'scale(1)', 200);
                    } else {
                        icon.classList.remove('fa-solid', 'text-danger');
                        icon.classList.add('fa-regular');
                    }
                }
            } catch (err) {
                // Fallback to normal form submit if AJAX fails
                form.submit();
            }
        });
    });

    // 4. Smooth scrolling for internal anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 5. Price live formatter for custom inputs
    const priceInput = document.querySelector('input[name="price"]');
    if (priceInput) {
        priceInput.addEventListener('input', (e) => {
            const val = parseFloat(e.target.value);
            let helper = document.getElementById('priceHelperText');
            if (!helper) {
                helper = document.createElement('div');
                helper.id = 'priceHelperText';
                helper.className = 'small text-primary fw-bold mt-1';
                priceInput.parentElement.parentElement.appendChild(helper);
            }
            if (val && val >= 10000000) {
                helper.innerText = `≈ PKR ${(val / 10000000).toFixed(2)} Crore`;
            } else if (val && val >= 100000) {
                helper.innerText = `≈ PKR ${(val / 100000).toFixed(2)} Lakh`;
            } else if (val) {
                helper.innerText = `≈ PKR ${val.toLocaleString()}`;
            } else {
                helper.innerText = '';
            }
        });
    }
});
