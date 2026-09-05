(() => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  const wrap = document.querySelector('[data-efn-binary-feedback]');
  if (!wrap || wrap.dataset.youthFeedbackUi === 'true') return;

  const [positive, negative] = wrap.querySelectorAll('button');
  const ack = wrap.querySelector('.efn-feedback-ack');
  if (!positive || !negative || !ack) return;

  wrap.dataset.youthFeedbackUi = 'true';

  const style = document.createElement('style');
  style.dataset.efnYouthFeedbackStyle = 'true';
  style.textContent = `
    .efn-binary-feedback{gap:44px;min-height:48px}
    .efn-binary-feedback button{width:48px;height:48px;font-size:0;border-width:1px;transition:filter .14s ease}
    .efn-binary-feedback button svg{width:23px;height:23px;fill:none;stroke:currentColor;stroke-width:2.15;stroke-linecap:round;stroke-linejoin:round}
    .efn-binary-feedback button[data-feedback-tone="positive"]{color:#176b45;background:#e5f7ed;border-color:#9bd5b4}
    .efn-binary-feedback button[data-feedback-tone="negative"]{color:#a33d4c;background:#fdebed;border-color:#efb5bd}
    .efn-binary-feedback button.efn-pressed{background:inherit;border-color:currentColor}
    .efn-binary-feedback button.efn-youth-pressed{animation:efnYouthFeedbackTap .28s ease}
    .efn-binary-feedback button.efn-youth-pressed svg{fill:currentColor}
    .efn-feedback-ack{font-size:1.15rem;font-weight:800}
    .efn-feedback-ack.efn-positive{color:#176b45}
    .efn-feedback-ack.efn-negative{color:#a33d4c}
    .efn-feedback-ack.efn-show{animation:efnYouthFeedbackAck 2s ease forwards}
    @keyframes efnYouthFeedbackTap{0%{transform:scale(1)}40%{transform:scale(.88)}72%{transform:scale(1.05)}100%{transform:scale(1)}}
    @keyframes efnYouthFeedbackAck{0%{opacity:0;transform:translateY(3px)}14%,68%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(-2px)}}
    @media (hover:hover){.efn-binary-feedback button:hover{filter:brightness(.96)}}
    @media (prefers-reduced-motion:reduce){.efn-binary-feedback button.efn-youth-pressed{animation:none}.efn-feedback-ack.efn-show{animation:none;opacity:1}}
  `;
  document.head.appendChild(style);

  const icon = (direction) => direction === 'up'
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 14V2"></path><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"></path></svg>';

  positive.dataset.feedbackTone = 'positive';
  negative.dataset.feedbackTone = 'negative';
  positive.innerHTML = icon('up');
  negative.innerHTML = icon('down');
  ack.textContent = '';

  let ackTimer = 0;
  const confirm = (outcome, button) => {
    window.clearTimeout(ackTimer);
    button.classList.remove('efn-youth-pressed');
    ack.classList.remove('efn-show', 'efn-positive', 'efn-negative');
    ack.textContent = '✓';
    ack.classList.add(`efn-${outcome}`);
    void button.offsetWidth;
    button.classList.add('efn-youth-pressed');
    ack.classList.add('efn-show');
    ackTimer = window.setTimeout(() => {
      button.classList.remove('efn-youth-pressed');
      ack.classList.remove('efn-show');
    }, 2000);
  };

  positive.addEventListener('click', () => confirm('positive', positive), { capture: true });
  negative.addEventListener('click', () => confirm('negative', negative), { capture: true });
})();

