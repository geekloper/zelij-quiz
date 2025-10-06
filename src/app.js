import i18nYaml from './i18n.yaml'

document.addEventListener('DOMContentLoaded', () => {

  // --- DATA & TRANSLATIONS ---
  const i18n = i18nYaml

  // --- DOM Elements ---
  const langSelect = document.getElementById('langSelect');
  const screens = { landing: document.getElementById('landing'), quiz: document.getElementById('quiz'), result: document.getElementById('result') };
  const buttons = { start: document.getElementById('startBtn'), next: document.getElementById('nextBtn'), share: document.getElementById('shareBtn'), replay: document.getElementById('replayBtn') };
  const elements = {
    title: document.getElementById('title'),
    desc: document.getElementById('desc'),
    opensource: document.getElementById('opensource'),
    progress: document.getElementById('progress'),
    questionText: document.getElementById('questionText'),
    options: document.getElementById('options'),
    feedback: document.getElementById('feedback'),
    verdict: document.getElementById('verdict'),
    score: document.getElementById('score'),
    details: document.getElementById('details'),
  };

  // --- State ---
  let currentLang = 'ar';
  let currentQuestionIndex = 0;
  let score = 0;
  let overestimations = 0;
  let underestimations = 0;

  // --- Functions ---

  function switchScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
  }

  function loadTexts() {
    const t = i18n[currentLang];
    document.documentElement.lang = currentLang;
    document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

    elements.title.textContent = t.title;
    elements.desc.textContent = t.desc;
    elements.opensource.textContent = t.opensource;
    buttons.start.textContent = t.start;
    buttons.next.textContent = t.next;
    buttons.share.textContent = t.share;
    buttons.replay.textContent = t.replay;
  }

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    overestimations = 0;
    underestimations = 0;
    switchScreen('quiz');
    showQuestion();
  }

  function showQuestion() {
    const questions = i18n[currentLang].questions;
    const q = questions[currentQuestionIndex];

    elements.progress.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    elements.questionText.textContent = q.question;
    elements.options.innerHTML = "";
    elements.feedback.innerHTML = "";
    buttons.next.disabled = true;
    buttons.next.classList.add('disabled-button');
    buttons.next.classList.remove('bg-green-600', 'hover:bg-green-700');

    q.options.forEach((opt, index) => {
      const btn = document.createElement("button");
      btn.textContent = opt;
      btn.dataset.index = index;
      btn.classList.add('w-full', 'text-left', 'p-4', 'bg-neutral-700', 'border', 'border-neutral-600', 'rounded-lg', 'hover:bg-neutral-600', 'transition-colors', 'hover:cursor-pointer', 'mb-2');
      if (currentLang === 'ar') {
        btn.classList.replace('text-left', 'text-right');
      }
      btn.onclick = () => selectAnswer(opt, q);
      elements.options.appendChild(btn);
    });
  }

  function selectAnswer(choice, q) {
    const optionButtons = elements.options.querySelectorAll("button");
    optionButtons.forEach(b => b.disabled = true);

    const choiceIndex = q.options.indexOf(choice);
    const correctIndex = q.options.indexOf(q.correct);

    const correctExplanationHtml = `<p class="text-green-400 font-bold text-2xl">✅ ${q.explanation}</p>`;
    const wrongExplantionHtml = `<p class="text-red-400 font-bold text-2xl">❌ ${q.explanation}</p>`;

    const sourcesHtml = q.sources
      .map(src =>
        `<a href="${src.source_link}" target="_blank" class="text-gray-400 hover:text-gray-50 underline block">
        Source: ${src.source}
      </a>`
      )
      .join("");

    if (choice === q.correct) {
      score++;
      elements.feedback.innerHTML = correctExplanationHtml + sourcesHtml;
    } else {
      elements.feedback.innerHTML = wrongExplantionHtml + sourcesHtml;
    }

    if (choiceIndex < correctIndex) {
      overestimations++;
    } else if (choiceIndex > correctIndex) {
      underestimations++;
    }

    // Highlight answers
    optionButtons.forEach((btn, index) => {
      if (index === correctIndex) {
        btn.classList.add('correct-answer');
      } else if (index === choiceIndex) {
        btn.classList.add('wrong-answer');
      }
    });

    buttons.next.disabled = false;
    buttons.next.classList.remove('disabled-button');
    buttons.next.classList.add('bg-green-600', 'hover:bg-green-700');
  }

  function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < i18n[currentLang].questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    switchScreen('result');
    const questions = i18n[currentLang].questions;
    const t = i18n[currentLang];

    elements.score.textContent = `Score: ${score}/${questions.length}`;

    let verdictText;
    if (overestimations > underestimations) verdictText = t.verdictSure;
    else if (underestimations > overestimations) verdictText = t.verdictSous;
    else verdictText = t.verdictNeutre;
    elements.verdict.textContent = verdictText;

    elements.details.innerHTML = `<p>${t.overestimations}: ${overestimations}</p><p>${t.underestimations}: ${underestimations}</p>`;
  }

  function shareResult() {
    const t = i18n[currentLang];
    const questions = i18n[currentLang].questions;
    const text = `Mon score au Zelij Quiz : ${score}/${questions.length}. ${elements.verdict.textContent}`;
    const url = window.location.href;
    if (navigator.share) {
      navigator.share({ title: "Zelij Quiz", text, url }).catch(console.error);
    } else {
      // Non-blocking fallback
      const shareText = `Copiez et partagez : ${text} ${url}`;
      elements.feedback.textContent = shareText; // Temporarily use a visible element
    }
  }

  // --- Event Listeners ---
  langSelect.addEventListener("change", (e) => {
    currentLang = e.target.value;
    loadTexts();
    startQuiz(); // Restart quiz on language change for consistency
  });
  buttons.start.addEventListener("click", startQuiz);
  buttons.next.addEventListener("click", nextQuestion);
  buttons.replay.addEventListener("click", startQuiz);
  buttons.share.addEventListener("click", shareResult);

  // --- Initial Load ---
  loadTexts();


});
