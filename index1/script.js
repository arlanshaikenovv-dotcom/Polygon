let currentScreen = 'screen-menu';

function openScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  currentScreen = id;
}

function calculateHealth() {
  const h = parseFloat(document.getElementById('inp-height').value);
  const w = parseFloat(document.getElementById('inp-weight').value);
  const age = parseFloat(document.getElementById('inp-age').value);
  const sleep = parseFloat(document.getElementById('inp-sleep').value);
  const scr = parseFloat(document.getElementById('inp-screen').value);

  if (!h || !w || !age) {
    alert('Пожалуйста, введи корректные рост, вес и возраст!');
    return;
  }

  const hMeters = h / 100;
  const imt = (w / (hMeters * hMeters)).toFixed(1);
  let imtStatus = 'Нормальный вес';
  if (imt < 18.5) imtStatus = 'Дефицит массы тела (нужно усилить белковое питание)';
  else if (imt > 24.9) imtStatus = 'Избыточная масса тела (рекомендуется больше кардио-активности)';

  const water = (w * 0.033).toFixed(1);
  const deskHeight = Math.round(h * 0.43);
  const chairHeight = Math.round(h * 0.25);

  let sleepAdvice = sleep < 8 
    ? `Ты спишь ${sleep} ч. Для возраста ${age} лет норма — 8–9 часов. Недосып снижает концентрацию памяти на 25–30%.`
    : `Отличный режим сна (${sleep} ч.) — мозг полностью восстанавливает нейронные связи.`;

  let screenAdvice = scr > 3
    ? `Экранное время (${scr} ч.) превышает норму. Используй правило 20-20-20: каждые 20 минут смотри вдаль на 20 футов (6 метров) в течение 20 секунд.`
    : `Экранная нагрузка (${scr} ч.) в пределах безопасной нормы.`;

  document.getElementById('health-result-box').innerHTML = `
    <h3>Результаты расчётов (Математика + Физиология)</h3>
    <div class="health-stat"><b>Индекс массы тела (ИМТ):</b> ${imt} кг/м² — ${imtStatus}</div>
    <div class="health-stat"><b>Суточная норма чистой воды:</b> ${water} литра (формула: вес × 33 мл)</div>
    <div class="health-stat"><b>Эргономика рабочего места:</b> высота стола — <b>${deskHeight} см</b>, высота стула — <b>${chairHeight} см</b> (защита от сколиоза)</div>
    <div class="health-stat"><b>Сон и ЦНС:</b> ${sleepAdvice}</div>
    <div class="health-stat"><b>Зрение:</b> ${screenAdvice}</div>
  `;
}

const aidCases = {
  cut: {
    title: 'Помощь при глубоком порезе',
    steps: [
      'Осмотреть рану и надеть перчатки (или чистый пакет)',
      'Прижать чистую салфетку или бинт прямо к ране',
      'Поднять повреждённую конечность выше уровня сердца',
      'Наложить давящую повязку поверх салфетки',
      'Обратиться в школьный медпункт или вызвать врача'
    ],
    explanation: 'Прямое давление на рану и поднятие конечности выше уровня сердца снижают гидростатическое давление крови в сосудах и позволяют тромбоцитам быстрее сформировать сгусток. Вату и спирт внутрь глубокой раны закладывать нельзя — это вызывает химический ожог тканей.'
  },
  choke: {
    title: 'Помощь подавившемуся человеку',
    steps: [
      'Спросить: «Ты подавился?» и оценить, может ли он кашлять',
      'Встать сбоку и чуть сзади, наклонить человека вперёд',
      'Нанести 5 резких ударов основанием ладони между лопаток',
      'Если не помогло — выполнить 5 толчков в живот (приём Геймлиха)',
      'Чередовать 5 ударов и 5 толчков до освобождения дыхательных путей'
    ],
    explanation: 'Наклон вперёд не даёт инородному телу провалиться глубже в трахею под действием силы тяжести. Приём Геймлиха резко повышает давление в диафрагме и лёгких, выталкивая предмет потоком воздуха.'
  },
  faint: {
    title: 'Помощь при обмороке',
    steps: [
      'Уложить человека на спину на ровную поверхность',
      'Приподнять ноги на 20–30 см выше уровня головы',
      'Расстегнуть тесный воротник и открыть окно для притока воздуха',
      'Проверить наличие дыхания и пульса',
      'После пробуждения не давать резко вставать, дать воды'
    ],
    explanation: 'Обморок возникает из-за кратковременного оттока крови от головного мозга. Поднятие ног обеспечивает венозный возврат крови к сердцу и мозгу. Сажать человека или брызгать ледяной водой нельзя.'
  },
  burn: {
    title: 'Помощь при термическом ожоге',
    steps: [
      'Прекратить контакт с горячим предметом или жидкостью',
      'Охлаждать место ожога прохладной водой 15–20 минут',
      'Аккуратно снять кольца, часы или браслеты до появления отёка',
      'Накрыть ожог стерильной влажной повязкой без тугого бинтования',
      'Вызвать врача при площади ожога больше ладони или появлении пузырей'
    ],
    explanation: 'Охлаждение водой останавливает прогрев глубоких слоёв кожи. Смазывать ожог маслом, сметаной или кремом запрещено: жирная плёнка удерживает тепло внутри тканей и усиливает повреждение.'
  },
  nose: {
    title: 'Помощь при носовом кровотечении',
    steps: [
      'Усадить пострадавшего и слегка наклонить голову ВПЕРЁД',
      'Зажать крылья носа пальцами на 10–15 минут',
      'Приложить холод (лёд в ткани) к переносице',
      'Дышать спокойно через рот, не сморкаться',
      'Если кровь не остановилась за 15 минут — вызвать скорую помощь'
    ],
    explanation: 'Запрокидывать голову назад категорически нельзя: кровь стекает по задней стенке глотки в желудок (вызывая рвоту) или попадает в дыхательные пути. Холод вызывает спазм сосудов слизистой носа.'
  },
  sprain: {
    title: 'Помощь при растяжении или вывихе',
    steps: [
      'Обеспечить полный покой повреждённому суставу',
      'Приложить холод через ткань на 15 минут для снятия отёка',
      'Наложить фиксирующую эластичную повязку (не слишком туго)',
      'Придать конечности возвышенное положение',
      'Направить пострадавшего в травмпункт для рентгена'
    ],
    explanation: 'В первые часы после травмы холод сужает сосуды, уменьшая внутреннее кровоизлияние и боль. Самостоятельно вправлять сустав запрещено, так как можно повредить нервы и связки.'
  }
};
let activeCaseKey = 'cut';
let player = { x: 640, y: 420, speed: 6 };
let keys = {};
let carriedCard = null;
let slots = [];
let cards = [];
let gameLoopId = null;

window.addEventListener('keydown', e => {
  keys[e.code] = true;
  if (e.code === 'KeyE' && currentScreen === 'screen-aid-game') {
    handleInteractE();
  }
});

window.addEventListener('keyup', e => {
  keys[e.code] = false;
});

function startAidGame(caseKey) {
  activeCaseKey = caseKey;
  const data = aidCases[caseKey];
  document.getElementById('game-case-title').innerText = data.title;
  openScreen('screen-aid-game');

  player = { x: 640, y: 420, speed: 6 };
  carriedCard = null;
  slots = [];
  cards = [];

  const slotsContainer = document.getElementById('game-slots-container');
  const cardsContainer = document.getElementById('game-cards-container');
  slotsContainer.innerHTML = '';
  cardsContainer.innerHTML = '';

  const slotPositions = [
    { x: 140, y: 90 },
    { x: 530, y: 90 },
    { x: 920, y: 90 },
    { x: 330, y: 230 },
    { x: 730, y: 230 }
  ];

  slotPositions.forEach((pos, idx) => {
    const el = document.createElement('div');
    el.className = 'drop-slot';
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.innerHTML = `<div class="drop-slot-num">ШАГ ${idx + 1}</div><div>Положи карточку на [E]</div>`;
    slotsContainer.appendChild(el);
    slots.push({ index: idx, x: pos.x, y: pos.y, w: 220, h: 92, occupiedBy: null, el });
  });

  const shuffled = data.steps.map((text, correctIdx) => ({ text, correctIdx }))
    .sort(() => Math.random() - 0.5);

  const cardPositions = [
    { x: 180, y: 530 },
    { x: 535, y: 530 },
    { x: 890, y: 530 },
    { x: 350, y: 630 },
    { x: 710, y: 630 }
  ];

  shuffled.forEach((item, i) => {
    const pos = cardPositions[i];
    const el = document.createElement('div');
    el.className = 'drag-card';
    el.style.left = pos.x + 'px';
    el.style.top = pos.y + 'px';
    el.innerText = item.text;
    cardsContainer.appendChild(el);
    cards.push({
      id: i,
      text: item.text,
      correctIdx: item.correctIdx,
      x: pos.x,
      y: pos.y,
      w: 210,
      h: 68,
      inSlot: null,
      el
    });
  });

  if (gameLoopId) cancelAnimationFrame(gameLoopId);
  updateGame();
}

function handleInteractE() {
  if (carriedCard) {
    let placedSlot = null;
    for (let s of slots) {
      const cx = s.x + s.w / 2;
      const cy = s.y + s.h / 2;
      if (Math.hypot(player.x - cx, player.y - cy) < 130 && !s.occupiedBy) {
        placedSlot = s;
        break;
      }
    }

    carriedCard.el.classList.remove('carried');
    if (placedSlot) {
      carriedCard.x = placedSlot.x + 5;
      carriedCard.y = placedSlot.y + 12;
      carriedCard.inSlot = placedSlot.index;
      placedSlot.occupiedBy = carriedCard;
    }
    carriedCard.el.style.left = carriedCard.x + 'px';
    carriedCard.el.style.top = carriedCard.y + 'px';
    carriedCard = null;
    return;
  }

  let nearest = null;
  let minDist = 110;
  for (let c of cards) {
    const cx = c.x + c.w / 2;
    const cy = c.y + c.h / 2;
    const d = Math.hypot(player.x - cx, player.y - cy);
    if (d < minDist) {
      minDist = d;
      nearest = c;
    }
  }

  if (nearest) {
    if (nearest.inSlot !== null) {
      slots[nearest.inSlot].occupiedBy = null;
      nearest.inSlot = null;
    }
    carriedCard = nearest;
    carriedCard.el.classList.add('carried');
  }
}

function updateGame() {
  if (currentScreen === 'screen-aid-game') {
    if (keys['KeyW'] || keys['ArrowUp']) player.y -= player.speed;
    if (keys['KeyS'] || keys['ArrowDown']) player.y += player.speed;
    if (keys['KeyA'] || keys['ArrowLeft']) player.x -= player.speed;
    if (keys['KeyD'] || keys['ArrowRight']) player.x += player.speed;

    player.x = Math.max(30, Math.min(1250, player.x));
    player.y = Math.max(30, Math.min(730, player.y));

    const orb = document.getElementById('player-orb');
    orb.style.left = player.x + 'px';
    orb.style.top = player.y + 'px';

    if (carriedCard) {
      carriedCard.x = player.x - carriedCard.w / 2;
      carriedCard.y = player.y - carriedCard.h / 2 - 28;
      carriedCard.el.style.left = carriedCard.x + 'px';
      carriedCard.el.style.top = carriedCard.y + 'px';
    }
  }
  gameLoopId = requestAnimationFrame(updateGame);
}

function finishAidGame() {
  const data = aidCases[activeCaseKey];
  let correctCount = 0;

  slots.forEach((s, idx) => {
    if (s.occupiedBy && s.occupiedBy.correctIdx === idx) {
      correctCount++;
    }
  });

  let stepsHtml = data.steps.map((st, i) => `<li><b>Шаг ${i + 1}:</b> ${st}</li>`).join('');

  document.getElementById('aid-explanation-box').innerHTML = `
    <h2 style="margin-bottom:10px; color:#111;">Результат симуляции: ${correctCount} из 5 шагов верно!</h2>
    <p style="margin-bottom:14px;"><b>Почему именно такая последовательность правильная (физиология и медицина):</b><br>${data.explanation}</p>
    <p style="margin-bottom:6px;"><b>Эталонный алгоритм действий:</b></p>
    <ol style="padding-left:22px;">${stepsHtml}</ol>
  `;
  openScreen('screen-aid-result');
}
const foods = [
  {
    name: 'Чипсы (пачка 90 г)',
    sugar: '2 г (0.5 ч.л.)',
    salt: '1.8 г (36% нормы)',
    calories: '480 ккал',
    harm: 'Акриламид, трансжиры и избыток соли',
    desc: 'При жарке картофеля при высокой температуре образуется акриламид — вещество, раздражающее слизистую желудка и нагружающее печень. Избыток соли задерживает воду и повышает артериальное давление, а усилитель вкуса глутамат натрия вызывает привыкание к яркому вкусу.',
    svg: `<svg width="64" height="64" viewBox="0 0 16 16" shape-rendering="crispEdges">
      <rect x="3" y="1" width="10" height="14" fill="#1d4ed8"/>
      <rect x="2" y="1" width="12" height="2" fill="#1e3a8a"/>
      <rect x="2" y="13" width="12" height="2" fill="#1e3a8a"/>
      <rect x="4" y="4" width="8" height="4" fill="#facc15"/>
      <rect x="5" y="5" width="6" height="2" fill="#dc2626"/>
      <rect x="5" y="9" width="3" height="3" fill="#fde047"/>
      <rect x="9" y="10" width="2" height="2" fill="#4ade80"/>
    </svg>`
  },
  {
    name: 'Газировка Кола (0.5 л)',
    sugar: '53 г (~10.5 ч.л.!)',
    salt: '0.1 г',
    calories: '210 ккал',
    harm: 'Ортофосфорная кислота и ударная доза сахара',
    desc: 'В одной бутылке 0.5 л содержится более 10 чайных ложек сахара — это вдвое превышает суточную норму ВОЗ для подростка! Резкий скачок глюкозы вызывает выброс инсулина, после чего через 40 минут наступает резкая усталость. Ортофосфорная кислота вымывает кальций из эмали.',
    svg: `<svg width="64" height="64" viewBox="0 0 16 16" shape-rendering="crispEdges">
      <rect x="5" y="2" width="6" height="1" fill="#9ca3af"/>
      <rect x="4" y="3" width="8" height="10" fill="#dc2626"/>
      <rect x="5" y="4" width="1" height="8" fill="#fca5a5"/>
      <rect x="5" y="13" width="6" height="1" fill="#9ca3af"/>
      <rect x="6" y="7" width="4" height="2" fill="#ffffff"/>
    </svg>`
  },
  {
    name: 'Энергетик (0.45 л)',
    sugar: '50 г (~10 ч.л.)',
    salt: '0.4 г',
    calories: '220 ккал',
    harm: 'Кофеин (140 мг) + таурин + сахар',
    desc: 'Энергетик не даёт организму реальной энергии, а лишь берёт её «в кредит» у нервной системы, блокируя рецепторы усталости. Для сердечно-сосудистой системы подростка сочетание кофеина, таурина и сахара вызывает тахикардию и истощение нервных клеток.',
    svg: `<svg width="64" height="64" viewBox="0 0 16 16" shape-rendering="crispEdges">
      <rect x="5" y="2" width="6" height="12" fill="#111827"/>
      <rect x="5" y="2" width="6" height="1" fill="#9ca3af"/>
      <rect x="7" y="4" width="2" height="3" fill="#22c55e"/>
      <rect x="6" y="7" width="4" height="2" fill="#22c55e"/>
      <rect x="7" y="9" width="2" height="3" fill="#22c55e"/>
    </svg>`
  },
  {
    name: 'Бургер фастфуд',
    sugar: '9 г (2 ч.л.)',
    salt: '2.3 г (46% нормы)',
    calories: '540 ккал',
    harm: 'Насыщенные жиры + соусы + быстрые углеводы',
    desc: 'Сочетание белой булки, жареной котлеты и майонезного соуса создаёт высокую калорийную плотность при минимуме клетчатки. Такой перекус тяжело переваривается и вызывает сонливость на уроках из-за притока крови к желудку.',
    svg: `<svg width="64" height="64" viewBox="0 0 16 16" shape-rendering="crispEdges">
      <rect x="3" y="3" width="10" height="3" fill="#d97706"/>
      <rect x="2" y="6" width="12" height="1" fill="#22c55e"/>
      <rect x="2" y="7" width="12" height="2" fill="#78350f"/>
      <rect x="3" y="9" width="10" height="1" fill="#facc15"/>
      <rect x="3" y="10" width="10" height="2" fill="#d97706"/>
    </svg>`
  },
  {
    name: 'Шоколадный батончик',
    sugar: '28 г (~5.5 ч.л.)',
    salt: '0.2 г',
    calories: '250 ккал',
    harm: 'Пальмовое масло + чистый сахар',
    desc: 'Один маленький батончик сразу перекрывает дневной лимит сахара. Вместо длительной энергии для мозга он даёт кратковременный всплеск глюкозы на 20–30 минут, после чего концентрация внимания резко падает.',
    svg: `<svg width="64" height="64" viewBox="0 0 16 16" shape-rendering="crispEdges">
      <rect x="2" y="5" width="12" height="6" fill="#7f1d1d"/>
      <rect x="4" y="6" width="8" height="4" fill="#451a03"/>
      <rect x="5" y="7" width="6" height="2" fill="#facc15"/>
    </svg>`
  },
  {
    name: 'Лапша б/п (пачка)',
    sugar: '3 г',
    salt: '3.8 г (76% нормы!)',
    calories: '390 ккал',
    harm: 'Критическая доза натрия и пальмовый олеин',
    desc: 'Главная опасность пакетика со специями — почти полная суточная норма соли за один приём пищи плюс глутамат натрия. Сама лапша обжарена в пальмовом масле и практически не содержит белка и витаминов.',
    svg: `<svg width="64" height="64" viewBox="0 0 16 16" shape-rendering="crispEdges">
      <rect x="3" y="6" width="10" height="7" fill="#ef4444"/>
      <rect x="4" y="4" width="8" height="2" fill="#fde047"/>
      <rect x="5" y="8" width="6" height="3" fill="#ffffff"/>
    </svg>`
  }
];

const foodGrid = document.getElementById('food-grid');
foods.forEach(f => {
  const card = document.createElement('div');
  card.className = 'food-item';
  card.innerHTML = `${f.svg}<span>${f.name}</span>`;
  card.onclick = () => {
    document.querySelectorAll('.food-item').forEach(el => el.classList.remove('selected'));
    card.classList.add('selected');
    document.getElementById('food-title').innerText = f.name;
    document.getElementById('food-metrics').innerHTML = `
      <div class="metric-badge">Сахар: ${f.sugar}</div>
      <div class="metric-badge">Соль: ${f.salt}</div>
      <div class="metric-badge" style="border-color:#f59e0b;">Калорийность: ${f.calories}</div>
      <div class="metric-badge" style="border-color:#8b5cf6;">Фактор риска: ${f.harm}</div>
    `;
    document.getElementById('food-desc').innerText = f.desc;
  };
  foodGrid.appendChild(card);
});
