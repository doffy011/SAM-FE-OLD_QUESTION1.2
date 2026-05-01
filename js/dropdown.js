document.addEventListener('DOMContentLoaded', function() {
    const dropdownBtn = document.getElementById('dropdownBtn');
    const yearsMenu = document.getElementById('yearsMenu');

    if (dropdownBtn && yearsMenu) {
        // ခေါင်းစဉ်ကို နှိပ်ရင် Menu ပွင့်ရန်/ပိတ်ရန်
        dropdownBtn.addEventListener('click', function(e) {
            yearsMenu.classList.toggle('show');
            e.stopPropagation(); 
        });

        // Menu ပြင်ပကို နှိပ်ရင် ပိတ်သွားစေရန်
        window.addEventListener('click', function(e) {
            if (!dropdownBtn.contains(e.target) && !yearsMenu.contains(e.target)) {
                yearsMenu.classList.remove('show');
            }
        });
    }
});