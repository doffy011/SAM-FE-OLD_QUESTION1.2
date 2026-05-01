
const ANSWERS = {};

function render() {
    const root = document.getElementById('quiz-root');
    // _2024S ကို _2025A သို့ ပြောင်းရန်
    _2025A.questions.forEach((q) => { 
        const card = document.createElement('div');
        card.className = 'q-card';
        card.innerHTML = `
            <div class="q-head">
                <span class="q-num">Question ${q.id}</span>
                <div class="q-title">${q.question}</div>
            </div>
            <div class="options" id="opts-${q.id}"></div>
            <div class="explanation" id="exp-${q.id}">
                <strong style="display: block; font-size: 11px; margin-bottom: 4px; color: var(--primary);">ANSWER KEY:</strong>
                ${q.explanation || "Correct response determined from source."}
            </div>
        `;
        root.appendChild(card);
        
        const optBox = document.getElementById(`opts-${q.id}`);
        q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'opt-btn';
            btn.innerHTML = `
                <div class="opt-bullet">${opt.id.toUpperCase()}</div>
                <div class="opt-txt">${opt.text}</div>
            `;
            btn.onclick = () => {
                ANSWERS[q.id] = opt.id;
                Array.from(optBox.children).forEach(c => c.classList.remove('active'));
                btn.classList.add('active');
            };
            optBox.appendChild(btn);
        });
    });
}

function submit() {
    let score = 0;
    // _2024S ကို _2025A သို့ ပြောင်းရန်
    _2025A.questions.forEach(q => { 
        const box = document.getElementById(`opts-${q.id}`);
        const exp = document.getElementById(`exp-${q.id}`);
        exp.style.display = 'block';

        Array.from(box.children).forEach((btn, idx) => {
            const optId = q.options[idx].id;
            btn.onclick = null;
            btn.classList.remove('active');

            if (optId === q.correctAnswerId) btn.classList.add('correct');
            if (ANSWERS[q.id] === optId && optId !== q.correctAnswerId) btn.classList.add('wrong');
        });

        if (ANSWERS[q.id] === q.correctAnswerId) score++;
    });

    document.getElementById('footer').style.display = 'none';
    document.getElementById('results').style.display = 'block';
    // _2024S ကို _2025A သို့ ပြောင်းရန်
    document.getElementById('score-text').innerText = score + ' / ' + _2025A.questions.length;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

render();