'use strict';

const header = document.querySelector('header');
const nav = document.querySelector('nav');
const navbarMenuBtn = document.querySelector('.navbar-menu-btn');

const navbarForm = document.querySelector('.navbar-form');
const navbarFormCloseBtn = document.querySelector('.navbar-form-close');
const navbarSearchBtn = document.querySelector('.navbar-search-btn');

function navIsActive(){
    header.classList.toggle('active');
    nav.classList.toggle('active');
    navbarMenuBtn.classList.toggle('active');
}

navbarMenuBtn.addEventListener('click', navIsActive);

const searchBarIsActive = () => navbarForm.classList.toggle('active');

navbarSearchBtn.addEventListener('click', searchBarIsActive);
navbarFormCloseBtn.addEventListener('click', searchBarIsActive);

// ၁။ Genre Filter ပြုလုပ်ရန် Function
function filterSeason(selectedValue) {
    // Section အားလုံးကို အရင်ဖျောက်ထားပါမယ်
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // ရွေးချယ်လိုက်တဲ့ value အပေါ်မူတည်ပြီး သက်ဆိုင်ရာ ID ကို ပြပေးပါမယ်
    let targetId = "";
    
    switch(selectedValue) {
        case 'M': targetId = "management"; break;
        case 'S': targetId = "Strategy"; break;
        case 'D': targetId = "DataBase"; break;
        case 'H': targetId = "Hardware"; break;
        case 'N': targetId = "Network"; break;
    }

    const targetSection = document.getElementById(targetId);
    if (targetSection) {
        targetSection.style.display = 'block';
    }
}
const dropdownBtn = document.getElementById('dropdownBtn');
        const yearsMenu = document.getElementById('yearsMenu');

        // ခေါင်းစဉ်ကို နှိပ်ရင် Menu ပွင့်ရန်/ပိတ်ရန်
        dropdownBtn.addEventListener('click', function(e) {
            yearsMenu.classList.toggle('show');
            e.stopPropagation(); // Event bubble မဖြစ်အောင်တားခြင်း
        });

        // Menu ပြင်ပကို နှိပ်ရင် ပိတ်သွားစေရန်
        window.addEventListener('click', function(e) {
            if (!dropdownBtn.contains(e.target) && !yearsMenu.contains(e.target)) {
                yearsMenu.classList.remove('show');
            }
        });
// ၂။ Quiz Result ပြသရန် Function (အခြေခံပုံစံ)
function showResults() {
    const resultBox = document.getElementById('result-box');
    // ဤနေရာတွင် logic များထည့်သွင်းနိုင်သည် (ဥပမာ - အမှတ်ပေါင်းတွက်ခြင်း)
    resultBox.innerHTML = "<h3>Quiz ပြီးဆုံးပါပြီ။ သင်၏ အဖြေများကို စစ်ဆေးနေပါသည်။</h3>";
    
    // ခလုတ်ကို ခေတ္တပိတ်ထားရန်
    document.getElementById('finish-btn').disabled = true;
}

// စာမျက်နှာစဖွင့်ချင်းမှာ Management တစ်ခုပဲပြထားစေချင်ရင်
document.addEventListener('DOMContentLoaded', () => {
    filterSeason('M'); 
});



    const container = document.getElementById('questions-list');

    questions.forEach((item, idx) => {
        const qNum = idx + 1;
        let optHtml = '';
        for (const [k, v] of Object.entries(item.options)) {
            optHtml += `<label class="option-label" id="lbl-${qNum}-${k}"><input type="radio" name="q${qNum}" value="${k}"> ${k}) ${v}</label>`;
        }
        container.innerHTML += `
            <div class="question-item">
                <div class="question-text">${qNum}. ${item.q}</div>
                <div class="options-group">${optHtml}</div>
                <div class="explanation" id="exp-${qNum}">💡 <b>မြန်မာလို ရှင်းလင်းချက်:</b> ${item.mm}</div>
            </div>`;
    });

    function showResults() {
        let score = 0;
        questions.forEach((item, idx) => {
            const qNum = idx + 1;
            const selected = document.querySelector(`input[name="q${qNum}"]:checked`);
            const expBox = document.getElementById(`exp-${qNum}`);
            
            // ရှင်းလင်းချက်ကို ပြရန်
            expBox.style.display = "block";

            if (selected) {
                if (selected.value === item.correct) {
                    score++;
                    document.getElementById(`lbl-${qNum}-${item.correct}`).classList.add('correct');
                } else {
                    document.getElementById(`lbl-${qNum}-${selected.value}`).classList.add('wrong');
                    document.getElementById(`lbl-${qNum}-${item.correct}`).classList.add('correct');
                }
            } else {
                document.getElementById(`lbl-${qNum}-${item.correct}`).classList.add('correct');
            }
        });

        const resultBox = document.getElementById('result-box');
        resultBox.style.display = "block";
        resultBox.innerHTML = `စာမေးပွဲပြီးပါပြီ။ ရမှတ်: ${score} / ${questions.length}`;
        resultBox.style.backgroundColor = score > (questions.length/2) ? "#e6f4ea" : "#fce8e6";
        
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

