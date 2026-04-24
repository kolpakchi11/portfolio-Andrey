/* =====================================================
   app.js — Core: i18n, State, Navigation, About, Admin
   Dependencies: none (must load first)
===================================================== */

/* ===================================================
   i18n
=================================================== */
const T={
  ru:{
    home_tag:"ИНТЕРАКТИВНОЕ ОБУЧЕНИЕ",
    home_title:"Выбери мир",
    home_lead:"Два пути. Один выбор. Узнай что такое Motion Design и Software Development — через квизы, игры и факты.",
    ae_card:"After Effects",dev_card:"Software Developer",
    btn_ae:"Что такое After Effects?",btn_dev:"Что такое разработка?",
    quiz_btn:"🧠 Квиз",back_btn:"← Назад",close_btn:"Закрыть ✕",
    next_btn:"Далее →",retry_btn:"↺ Заново",facts_btn:"📚 Факты",
    cat_ae:"Мир After Effects",cat_dev:"Мир Разработчика",
    cat_ae_desc:"MOTION DESIGN & VFX",cat_dev_desc:"CODE & BUILD",
    ae_tag:"ADOBE / MOTION",dev_tag:"CODE / BUILD",
    ae_title:"After Effects",dev_title:"Software Development",
    ae_text:"After Effects — профессиональный инструмент Adobe для создания motion graphics и визуальных эффектов. Анимации, кино-эффекты, UI переходы — всё создаётся здесь.",
    ae_list:["Анимация через кейфреймы","Слои, маски, эффекты","VFX и композитинг","Motion Graphics для рекламы и кино"],
    dev_text:"Разработчик ПО создаёт приложения, сайты и системы с помощью кода. Это превращение идей в работающие цифровые продукты.",
    dev_list:["HTML, CSS, JavaScript","Алгоритмы и структуры данных","API и базы данных","Git, деплой, командная работа"],
    rank_0:"BEGINNER",rank_1:"JUNIOR",rank_2:"MID-LEVEL",rank_3:"SENIOR",rank_4:"LEGEND 🔥",
    rmsg_0:"Не сдавайся! Повтори ещё раз.",rmsg_1:"Хорошее начало!",rmsg_2:"Неплохо! Ты шаришь.",rmsg_3:"Впечатляет!",rmsg_4:"ЛЕГЕНДА! Идеально!",
    rxp:"Заработано XP:",
    facts_ae_title:"Факты об After Effects",facts_dev_title:"Факты о разработке",
    bub_lbl:"💡 Факт",bub_next:"Ещё →",bub_close:"✕",
    stat_games:"Игр",stat_quiz:"Вопросов",stat_facts:"Фактов",about_btn:"✦ О создателе / About",
    ae_g1:"🎬 Поймай кейфреймы",ae_g2:"🔤 AE Слова",ae_g3:"🎨 Сортировщик",ae_g4:"⚡ Reaction",ae_g5:"🎭 Motion Builder",
    dev_g1:"🐛 Охота на баги",dev_g2:"🔤 Заполни код",dev_g3:"🔀 Сортировка строк",dev_g4:"❓ Что выведет?",dev_g5:"🔬 Debug Quest",
    ae_g1_hint:"Лови ◆◇✦★ кейфреймы — избегай ✖ ошибок. Управление: мышь",
    ae_g2_hint:"Видишь буквы AE терминов — нажимай нужную клавишу!",
    ae_g3_hint:"Кликай слои в правильном порядке / Click layers in the correct order",ae_g5_hint:"Собери нужные инструменты для эффекта / Select the right tools for the effect",
    ae_g4_hint:"Нажимай нужный параметр до того как таймер кончится!",
    dev_g1_hint:"Лови корректный код, избегай багов. Мышь или тач",
    dev_g2_hint:"Нажимай нужную клавишу — символ кода падает сверху!",
    dev_g3_hint:"Расставь строки кода в правильном порядке / Arrange code lines in the correct order",dev_g5_hint:"Найди строку с багом — кликни на неё / Find the bug line and click it",
    dev_g4_hint:"Определи что выведет код — тренируй чтение кода!",
  },
  en:{
    home_tag:"INTERACTIVE LEARNING",
    home_title:"Choose Your World",
    home_lead:"Two paths. One choice. Explore Motion Design and Software Development — through quizzes, games and facts.",
    ae_card:"After Effects",dev_card:"Software Developer",
    btn_ae:"What is After Effects?",btn_dev:"What is Software Dev?",
    quiz_btn:"🧠 Quiz",back_btn:"← Back",close_btn:"Close ✕",
    next_btn:"Next →",retry_btn:"↺ Retry",facts_btn:"📚 Facts",
    cat_ae:"After Effects World",cat_dev:"Developer World",
    cat_ae_desc:"MOTION DESIGN & VFX",cat_dev_desc:"CODE & BUILD",
    ae_tag:"ADOBE / MOTION",dev_tag:"CODE / BUILD",
    ae_title:"After Effects",dev_title:"Software Development",
    ae_text:"After Effects is Adobe's professional tool for motion graphics and visual effects. Animations, cinematic FX, UI transitions — all created here.",
    ae_list:["Keyframe-based animation","Layers, masks, effects","VFX & compositing","Motion Graphics for ads and film"],
    dev_text:"A software developer builds apps, websites and systems with code. Turning ideas into working digital products.",
    dev_list:["HTML, CSS, JavaScript","Algorithms & data structures","APIs & databases","Git, deployment, teamwork"],
    rank_0:"BEGINNER",rank_1:"JUNIOR",rank_2:"MID-LEVEL",rank_3:"SENIOR",rank_4:"LEGEND 🔥",
    rmsg_0:"Don't give up! Try again.",rmsg_1:"Good start!",rmsg_2:"Nice! You know this.",rmsg_3:"Impressive!",rmsg_4:"LEGEND! Perfect!",
    rxp:"XP Earned:",
    facts_ae_title:"After Effects Facts",facts_dev_title:"Dev World Facts",
    bub_lbl:"💡 Fact",bub_next:"More →",bub_close:"✕",
    stat_games:"Games",stat_quiz:"Questions",stat_facts:"Facts",about_btn:"✦ About / О создателе",
    ae_g1:"🎬 Catch Keyframes",ae_g2:"🔤 AE Words",ae_g3:"🎨 Layer Sorter",ae_g4:"⚡ Reaction",ae_g5:"🎭 Motion Builder",
    dev_g1:"🐛 Bug Hunt",dev_g2:"🔤 Fill The Code",dev_g3:"🔀 Code Sorter",dev_g4:"❓ What Outputs?",dev_g5:"🔬 Debug Quest",
    ae_g1_hint:"Catch ◆◇✦★ keyframes — dodge ✖ errors. Control: mouse",
    ae_g2_hint:"See AE term letters falling — press the right key!",
    ae_g3_hint:"Click layers in the correct AE pipeline order",ae_g5_hint:"Select the right tools for the effect",
    ae_g4_hint:"Press the right parameter before the timer runs out!",
    dev_g1_hint:"Catch correct code, dodge bugs. Mouse or touch",
    dev_g2_hint:"Press the key — a code character is falling from above!",
    dev_g3_hint:"Arrange code lines in the correct order — click to sort",dev_g5_hint:"Find the bug line and click it",
    dev_g4_hint:"Determine what the code outputs — train your code reading!",
  }
};

/* ===================================================
   FACTS
=================================================== */
const FACTS={
  ae:{
    ru:[
      {t:"Анимация = иллюзия",b:"Кино работает потому что мозг объединяет 24 кадра/сек в движение. В AE ты создаёшь именно это — поток кейфреймов, который мозг читает как плавное движение."},
      {t:"wiggle — одна строка = 50 кейфреймов",b:"Expression wiggle(2,30) заставляет слой случайно дрожать. 2 = частота в секунду, 30 = амплитуда пикселей. Ни одного кейфрейма вручную!"},
      {t:"Первый Motion Graphics — 1955",b:"Saul Bass вручную анимировал титры фильма «Человек с золотой рукой». Сегодня то же самое делается в AE за минуты."},
      {t:"Pre-compose = папка слоёв",b:"Pre-compose группирует слои в одну вложенную Comp. Как группировка в Figma. Без этого в сложных проектах утонешь в 200 слоях."},
      {t:"Easy Ease имитирует физику",b:"Без Easy Ease объект движется с одинаковой скоростью — как робот. С Easy Ease он разгоняется и тормозит — как в реальном мире."},
      {t:"Adjustment Layer — магия",b:"Эффект на Adjustment Layer применяется ко ВСЕМ слоям ниже. Один слой с Color Grading — и весь проект меняет цвет. Мощнейший инструмент."},
      {t:"Парентинг слоёв",b:"Parent & Link связывает слои: дочерний повторяет движение родителя. Это основа персонажной анимации — двигаешь тело, руки идут автоматически."},
    ],
    en:[
      {t:"Animation = illusion",b:"Film works because the brain merges 24fps into motion. In AE you create exactly this — a flow of keyframes the brain reads as smooth movement."},
      {t:"wiggle — one line = 50 keyframes",b:"The expression wiggle(2,30) makes a layer randomly shake. 2 = frequency per second, 30 = pixel amplitude. Zero manual keyframes!"},
      {t:"First Motion Graphics — 1955",b:"Saul Bass manually animated the title sequence for 'The Man with the Golden Arm'. Today AE does the same in minutes."},
      {t:"Pre-compose = layer folder",b:"Pre-compose groups layers into one nested Comp. Like grouping in Figma. Without it you'd drown in 200 layers in complex projects."},
      {t:"Easy Ease mimics physics",b:"Without Easy Ease an object moves at constant speed — like a robot. With Easy Ease it accelerates and decelerates — like the real world."},
      {t:"Adjustment Layer — magic",b:"An effect on an Adjustment Layer applies to ALL layers below. One Color Grading layer changes the whole project's color. Incredibly powerful."},
      {t:"Layer parenting",b:"Parent & Link connects layers: the child follows the parent's movement. This is the foundation of character animation."},
    ]
  },
  dev:{
    ru:[
      {t:"Первый баг — настоящий жук",b:"В 1947 году в компьютере Гарварда нашли мотылька, застрявшего в реле. Его вклеили в журнал с надписью 'First actual case of bug found'. Отсюда слово «баг»."},
      {t:"JavaScript за 10 дней",b:"Brendan Eich создал JavaScript за 10 дней в 1995 году. Сейчас это самый популярный язык в мире — запускается в каждом браузере."},
      {t:"Git создан из злости",b:"Линус Торвальдс (создатель Linux) написал Git за 2 недели в 2005 году после ссоры с компанией BitKeeper. Сейчас им пользуется весь мир."},
      {t:"null — ошибка на $1 млрд",b:"Тони Хоар изобрёл null в 1965 году и позже назвал это «ошибкой на миллиард долларов» — столько потеряно из-за NullPointerException."},
      {t:"HTML — не язык программирования",b:"HTML (HyperText Markup Language) — язык разметки, а не программирования. В нём нет условий, циклов, переменных. Он просто описывает структуру."},
      {t:"Senior не знает всё наизусть",b:"Профессиональный разработчик не помнит синтаксис — он знает где искать. Google, MDN docs, Stack Overflow — это рабочий инструмент, не признак слабости."},
      {t:"console.log — лучший друг",b:"Самый используемый инструмент отладки в мире — это console.log(). Даже опытные разработчики пишут его 50 раз в день."},
    ],
    en:[
      {t:"First bug was a real bug",b:"In 1947, a moth was found stuck in a Harvard computer relay. It was taped into the logbook: 'First actual case of bug found'. That's where the word 'bug' comes from."},
      {t:"JavaScript in 10 days",b:"Brendan Eich created JavaScript in 10 days in 1995. It's now the world's most popular language — running in every browser."},
      {t:"Git was built in anger",b:"Linus Torvalds (creator of Linux) wrote Git in 2 weeks in 2005 after a dispute with BitKeeper. Now the whole world uses it."},
      {t:"null — $1 billion mistake",b:"Tony Hoare invented null in 1965 and later called it his 'billion dollar mistake' — that's how much has been lost to NullPointerException bugs."},
      {t:"HTML is not a programming language",b:"HTML (HyperText Markup Language) is markup, not programming. No conditions, no loops, no variables. It just describes structure."},
      {t:"Seniors don't memorize everything",b:"A professional developer doesn't remember syntax — they know where to look. Google, MDN docs, Stack Overflow are work tools, not signs of weakness."},
      {t:"console.log is your best friend",b:"The most-used debugging tool in the world is console.log(). Even experienced developers write it 50 times a day."},
    ]
  }
};

/* ===================================================
   MASCOT FACTS (quick tips)
=================================================== */
const MF={
  home:{ru:["Нажми на карточку мира — начни приключение! 👆","Оба мира реально крутые — сначала попробуй оба 😄","After Effects — про визуал. Dev — про логику. Что тебе ближе?"],
        en:["Click a world card to start! 👆","Both worlds are awesome — try both first 😄","AE is about visuals. Dev is about logic. What fits you?"]},
  ae:{ru:["💡 P, S, R, O, T — горячие клавиши для основных параметров в AE","🎬 wiggle(2,30) — один Expression заменяет десятки кейфреймов!","⚡ Easy Ease (F9) — делает любую анимацию живой","🌀 Pre-compose — это как группа слоёв, только умнее","🎯 Adjustment Layer — применяет эффект ко всем слоям ниже"],
     en:["💡 P, S, R, O, T — hotkeys for main AE parameters","🎬 wiggle(2,30) — one Expression replaces dozens of keyframes!","⚡ Easy Ease (F9) — makes any animation feel alive","🌀 Pre-compose — like a layer group but smarter","🎯 Adjustment Layer — applies effect to all layers below"]},
  dev:{ru:["💡 console.log() — твой лучший друг при отладке","🔥 var устарел — используй let и const","⚡ => это стрелочная функция: (x) => x * 2","🎯 undefined ≠ null: undefined — не задано, null — намеренно пусто","🤖 Git add → commit → push — три шага чтобы сохранить работу"],
      en:["💡 console.log() — your best friend for debugging","🔥 var is outdated — use let and const","⚡ => is an arrow function: (x) => x * 2","🎯 undefined ≠ null: undefined = not set, null = intentionally empty","🤖 Git add → commit → push — three steps to save your work"]}
};

/* ===================================================
   QUIZ DATA
=================================================== */
const QD={
  ae:[
    {q:{ru:"Для чего используют After Effects?",en:"What is After Effects used for?"},a:[{ru:"Монтаж видео",en:"Video editing"},{ru:"Анимация и визуальные эффекты",en:"Animation and VFX"},{ru:"Работа со звуком",en:"Audio production"},{ru:"3D-моделирование",en:"3D modeling"}],c:1,i:{ru:"AE — для motion graphics и VFX. Для монтажа — Premiere Pro.",en:"AE is for motion graphics and VFX. Editing is done in Premiere Pro."}},
    {q:{ru:"Что такое keyframe?",en:"What is a keyframe?"},a:[{ru:"Плагин Adobe",en:"An Adobe plugin"},{ru:"Ключевая точка анимации",en:"A key animation point"},{ru:"Тип медиа-файла",en:"A media file type"},{ru:"Команда экспорта",en:"An export command"}],c:1,i:{ru:"Кейфрейм = значение параметра в момент времени. AE сам строит переход между двумя кейфреймами.",en:"Keyframe = parameter value at a point in time. AE automatically builds the transition between two keyframes."}},
    {q:{ru:"Что делает Easy Ease (F9)?",en:"What does Easy Ease (F9) do?"},a:[{ru:"Удаляет кейфреймы",en:"Deletes keyframes"},{ru:"Ускоряет рендер",en:"Speeds up render"},{ru:"Сглаживает вход и выход",en:"Smooths in and out"},{ru:"Добавляет звук",en:"Adds audio"}],c:2,i:{ru:"Easy Ease имитирует физику — объект плавно разгоняется и замедляется, как в реальном мире.",en:"Easy Ease mimics physics — objects accelerate and decelerate, just like in the real world."}},
    {q:{ru:"Composition в AE — это?",en:"What is a Composition in AE?"},a:[{ru:"Рабочая сцена проекта",en:"A project working scene"},{ru:"Тип слоя",en:"A layer type"},{ru:"Плагин",en:"A plugin"},{ru:"Формат экспорта",en:"An export format"}],c:0,i:{ru:"Composition — рабочая сцена. Как холст для художника. Здесь ты размещаешь слои и создаёшь анимацию.",en:"Composition is the working scene. Like a canvas for a painter. You place layers here and create animation."}},
    {q:{ru:"Что такое Adjustment Layer?",en:"What does an Adjustment Layer do?"},a:[{ru:"Добавляет фон",en:"Adds background"},{ru:"Применяет эффект ко всем слоям ниже",en:"Applies effect to all layers below"},{ru:"Управляет камерой",en:"Controls camera"},{ru:"Импортирует видео",en:"Imports footage"}],c:1,i:{ru:"Adjustment Layer невидим, но его эффекты применяются ко всем слоям ниже. Идеален для цветокоррекции.",en:"Adjustment Layer is invisible but its effects apply to all layers below. Perfect for color grading."}},
    {q:{ru:"Что делает функция wiggle(2,30)?",en:"What does wiggle(2,30) do?"},a:[{ru:"Удаляет кейфреймы",en:"Removes keyframes"},{ru:"Добавляет случайное движение",en:"Adds random movement"},{ru:"Меняет цвет",en:"Changes color"},{ru:"Ускоряет анимацию",en:"Speeds up animation"}],c:1,i:{ru:"wiggle — Expression (мини-код). 2 раза в секунду, 30 пикселей. Слой дрожит без единого кейфрейма вручную!",en:"wiggle is an Expression (mini-code). 2 times/sec, 30px amplitude. Layer shakes with zero manual keyframes!"}},
    {q:{ru:"Pre-compose делает что?",en:"What does Pre-compose do?"},a:[{ru:"Удаляет слои",en:"Deletes layers"},{ru:"Группирует слои во вложенную Comp",en:"Groups layers into a nested Comp"},{ru:"Применяет размытие",en:"Applies blur"},{ru:"Экспортирует в MP4",en:"Exports to MP4"}],c:1,i:{ru:"Pre-compose = несколько слоёв → одна вложенная Composition. Как группировка в Figma, только для анимации.",en:"Pre-compose = multiple layers → one nested Composition. Like grouping in Figma, but for animation."}},
    {q:{ru:"Motion Blur — это?",en:"What is Motion Blur?"},a:[{ru:"Шум и зернистость",en:"Noise and grain"},{ru:"Размытие движущихся объектов",en:"Blur on moving objects"},{ru:"Цветовой фильтр",en:"Color filter"},{ru:"Сжатие видео",en:"Video compression"}],c:1,i:{ru:"Motion Blur добавляет физически корректное размытие — анимация выглядит как реальная киносъёмка.",en:"Motion Blur adds physically accurate blur — animation looks like real film footage."}},
    {q:{ru:"Mask (маска) нужна для?",en:"What is a Mask used for?"},a:[{ru:"Аудио-эффектов",en:"Audio effects"},{ru:"Ограничения видимой области слоя",en:"Restricting the visible area"},{ru:"3D рендера",en:"3D rendering"},{ru:"Экспорта GIF",en:"GIF export"}],c:1,i:{ru:"Маска = трафарет. Скрывает или открывает часть слоя. Незаменима для текстовых анимаций и переходов.",en:"Mask = stencil. Hides or reveals part of a layer. Essential for text reveals and transitions."}},
    {q:{ru:"Graph Editor управляет?",en:"What does Graph Editor control?"},a:[{ru:"Цветом слоя",en:"Layer color"},{ru:"FPS проекта",en:"Project FPS"},{ru:"Кривыми скорости анимации",en:"Animation speed curves"},{ru:"Настройками экспорта",en:"Export settings"}],c:2,i:{ru:"Graph Editor = кривые скорости. Здесь превращают деревянную анимацию в плавную и живую.",en:"Graph Editor = speed curves. This is where you turn stiff animation into smooth and alive motion."}},
  ],
  dev:[
    {q:{ru:"Что такое переменная?",en:"What is a variable?"},a:[{ru:"Ошибка кода",en:"A code error"},{ru:"Контейнер для данных",en:"A data container"},{ru:"Тип файла",en:"A file type"},{ru:"Браузер",en:"A browser"}],c:1,i:{ru:"Переменная = имя для данных. let score = 0 — score хранит ноль. const нельзя менять, let — можно.",en:"Variable = name for data. let score = 0 — score holds zero. const can't be changed, let can."}},
    {q:{ru:"JavaScript нужен для?",en:"What is JavaScript used for?"},a:[{ru:"Стили страницы",en:"Page styles"},{ru:"Структура HTML",en:"HTML structure"},{ru:"Интерактивность и логика",en:"Interactivity and logic"},{ru:"Хранение файлов",en:"File storage"}],c:2,i:{ru:"JS = мозг страницы: клики, анимации, запросы к серверу. HTML — кости, CSS — одежда, JS — мозг.",en:"JS = brain of the page: clicks, animations, server requests. HTML is bones, CSS is clothes, JS is the brain."}},
    {q:{ru:"HTML — это?",en:"HTML is?"},a:[{ru:"Язык программирования",en:"A programming language"},{ru:"База данных",en:"A database"},{ru:"Язык разметки страницы",en:"Page markup language"},{ru:"Серверный язык",en:"A server language"}],c:2,i:{ru:"HTML НЕ язык программирования! Это разметка. Тегами описываешь структуру: <h1> заголовок, <p> параграф.",en:"HTML is NOT a programming language! It's markup. Tags describe structure: <h1> heading, <p> paragraph."}},
    {q:{ru:"CSS отвечает за?",en:"CSS controls?"},a:[{ru:"Серверную логику",en:"Server logic"},{ru:"Внешний вид",en:"Appearance"},{ru:"Данные",en:"Data"},{ru:"Алгоритмы",en:"Algorithms"}],c:1,i:{ru:"CSS = стиль. Цвета, шрифты, отступы, анимации. Без CSS сайт выглядит как txt файл из 1994 года.",en:"CSS = style. Colors, fonts, spacing, animations. Without CSS a website looks like a txt file from 1994."}},
    {q:{ru:"Что делает цикл for?",en:"What does a for loop do?"},a:[{ru:"Шифрует данные",en:"Encrypts data"},{ru:"Удаляет файлы",en:"Deletes files"},{ru:"Повторяет код",en:"Repeats code"},{ru:"Подключает API",en:"Connects to API"}],c:2,i:{ru:"for(let i=0; i<5; i++) выполнит код 5 раз. Без цикла пришлось бы писать одно и то же вручную 5 раз.",en:"for(let i=0; i<5; i++) runs code 5 times. Without it you'd write the same thing manually 5 times."}},
    {q:{ru:"Что такое функция?",en:"What is a function?"},a:[{ru:"Ошибка",en:"An error"},{ru:"Тип данных",en:"A data type"},{ru:"Переиспользуемый блок кода",en:"A reusable code block"},{ru:"База данных",en:"A database"}],c:2,i:{ru:"Функция — код с именем. Написал раз — вызываешь много раз. Принцип DRY: Don't Repeat Yourself.",en:"Function = named code. Write once, call many times. DRY principle: Don't Repeat Yourself."}},
    {q:{ru:"Что такое API?",en:"What is an API?"},a:[{ru:"Язык программирования",en:"A programming language"},{ru:"Интерфейс общения программ",en:"Interface for programs to communicate"},{ru:"База данных",en:"A database"},{ru:"ОС",en:"An OS"}],c:1,i:{ru:"API = меню в ресторане. Говоришь что хочешь (запрос) — получаешь ответ. Погода на сайте — это API.",en:"API = restaurant menu. Say what you want (request) — get a response. Weather on a website is an API call."}},
    {q:{ru:"Git нужен для?",en:"What is Git used for?"},a:[{ru:"Дизайна",en:"Design"},{ru:"Звука",en:"Audio"},{ru:"Контроля версий кода",en:"Version control"},{ru:"3D",en:"3D"}],c:2,i:{ru:"Git = Ctrl+Z для всего проекта. Хранит историю изменений, позволяет работать в команде.",en:"Git = Ctrl+Z for the whole project. Stores change history, enables teamwork."}},
    {q:{ru:"Frontend — это?",en:"Frontend is?"},a:[{ru:"Серверная часть",en:"Server side"},{ru:"База данных",en:"Database"},{ru:"То что видит пользователь",en:"What the user sees"},{ru:"Алгоритм",en:"Algorithm"}],c:2,i:{ru:"Frontend = HTML+CSS+JS. Всё что видит пользователь в браузере. Backend = сервер и базы данных.",en:"Frontend = HTML+CSS+JS. Everything the user sees in the browser. Backend = server and databases."}},
    {q:{ru:"Что делает console.log()?",en:"What does console.log() do?"},a:[{ru:"Удаляет код",en:"Deletes code"},{ru:"Выводит данные в консоль",en:"Outputs data to console"},{ru:"Компилирует JS",en:"Compiles JS"},{ru:"Отправляет запрос",en:"Sends a request"}],c:1,i:{ru:"console.log() выводит данные в консоль браузера (F12). Самый используемый инструмент отладки в мире.",en:"console.log() outputs data to the browser console (F12). The world's most-used debugging tool."}},
  ]
};

/* ===================================================
   STATE
=================================================== */
let lang=localStorage.getItem("lang")||"ru";
let cat=null, gameId=0;
let qi=0,sc=0,xp=0,combo=0,aq=[];
let gRun=false, gAnim=null;
let mfIdx=0, mfList=[];

/* ===================================================
   LANGUAGE
=================================================== */
function applyLang(){
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k=el.dataset.i18n; if(T[lang][k]) el.textContent=T[lang][k];
  });
  document.getElementById("langBtn").textContent=lang==="ru"?"EN":"RU";
  if(cat){
    document.getElementById("catTitle").textContent=T[lang]["cat_"+cat];
    document.getElementById("catDesc").textContent=T[lang]["cat_"+cat+"_desc"];
    buildMenu();
  }
  document.getElementById("modalCloseBtn").textContent=T[lang]["close_btn"];
  const acb=document.getElementById("aboutCloseBtn");if(acb)acb.textContent=lang==="ru"?"ЗАКРЫТЬ ✕":"CLOSE ✕";
  document.getElementById("bubNext").textContent=T[lang]["bub_next"];
  document.getElementById("bubClose").textContent=T[lang]["bub_close"];
  document.getElementById("bubLbl").textContent=T[lang]["bub_lbl"];
}
document.getElementById("langBtn").onclick=()=>{
  lang=lang==="ru"?"en":"ru"; localStorage.setItem("lang",lang); applyLang();
  if(aq.length&&!document.getElementById("quiz").classList.contains("hidden")) loadQ();
};

/* ===================================================
   SCREENS
=================================================== */
function show(id){
  ["home","category","quiz","game","factsScreen","result"].forEach(s=>
    document.getElementById(s).classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if(id==="home"){document.body.className="";stopGame();}
}

/* ===================================================
   CATEGORY + MENU
=================================================== */
document.querySelectorAll(".card").forEach(c=>c.onclick=()=>openCat(c.dataset.cat));
function openCat(c){
  cat=c; document.body.classList.remove("theme-ae","theme-dev");
  document.body.classList.add("theme-"+c);
  document.getElementById("catTitle").textContent=T[lang]["cat_"+c];
  document.getElementById("catDesc").textContent=T[lang]["cat_"+c+"_desc"];
  buildMenu(); show("category");
  document.getElementById("mascotEmoji").textContent=c==="dev"?"🤖":"🎬";
}

function buildMenu(){
  const grid=document.getElementById("menuGrid");
  grid.innerHTML="";
  const isAE=cat==="ae";

  const lead={ru:isAE?"Изучай Motion Design через игры и квизы":"Учись программировать через игры и квизы",
               en:isAE?"Learn Motion Design through games & quizzes":"Learn coding through games & quizzes"};
  document.getElementById("catLead").textContent=lead[lang];

  const descs={
    ru:{quiz:"10 вопросов",ae_g1:"Лови кейфреймы",ae_g2:"Набирай AE термины",ae_g3:"Расставь по порядку",ae_g4:"Горячие клавиши AE",ae_g5:"Собери анимацию",
        dev_g1:"Лови код, уворачивайся",dev_g2:"Синтаксис JS/CSS/HTML",dev_g3:"Сложи программу",dev_g4:"Угадай вывод кода",dev_g5:"Найди баг в коде",facts:"7 фактов"},
    en:{quiz:"10 questions",ae_g1:"Catch keyframes",ae_g2:"Type AE terms",ae_g3:"Sort layers",ae_g4:"AE hotkeys",ae_g5:"Build animation",
        dev_g1:"Catch code, dodge bugs",dev_g2:"JS/CSS/HTML syntax",dev_g3:"Build from lines",dev_g4:"Guess output",dev_g5:"Find the bug",facts:"7 facts"}
  };

  const items=[
    {k:"quiz",cls:"m-quiz",lbl:T[lang]["quiz_btn"],dk:"quiz"},
    {k:"g1",cls:"m-g1",lbl:T[lang][cat+"_g1"],dk:cat+"_g1"},
    {k:"g2",cls:"m-g2",lbl:T[lang][cat+"_g2"],dk:cat+"_g2"},
    {k:"g3",cls:"m-g3",lbl:T[lang][cat+"_g3"],dk:cat+"_g3"},
    {k:"g4",cls:"m-g4",lbl:T[lang][cat+"_g4"],dk:cat+"_g4"},
    {k:"g5",cls:"m-g5",lbl:T[lang][cat+"_g5"]||"🎭 Bonus",dk:cat+"_g5"},
    {k:"facts",cls:"m-facts",lbl:T[lang]["facts_btn"],dk:"facts"},
  ];

  // Compute orbit center and radius from actual viewport
  function placeCards(){
    const W=window.innerWidth, H=window.innerHeight;
    const cx=W/2, cy=H/2;
    // adaptive radius
    const R=Math.min(W,H)*0.32;
    const R2=Math.min(W,H)*0.28;
    // angle offsets: top=270°, then clockwise 60° steps
    const angles=[270,321,12,64,116,167,218]; // 7 items evenly
    // Store positions for canvas lines
    window._orbitPositions={cx,cy,pts:[],R,isAE};
    items.forEach((it,i)=>{
      const ang=angles[i]*Math.PI/180;
      const px=cx+R*Math.cos(ang);
      const py=cy+R2*Math.sin(ang);
      window._orbitPositions.pts.push({x:px,y:py});

      let btn=document.getElementById("ob_"+it.k);
      if(!btn){
        btn=document.createElement("button");
        btn.id="ob_"+it.k;
        btn.className="orbit-card "+it.cls;
        if(it.k==="quiz") btn.onclick=startQuiz;
        else if(it.k==="facts") btn.onclick=showFacts;
        else btn.onclick=()=>launchGame(parseInt(it.k[1]),it.k);
        grid.appendChild(btn);
      }
      const icon=it.lbl.split(" ")[0];
      const lbl=it.lbl.split(" ").slice(1).join(" ") || it.lbl;
      const desc=descs[lang][it.dk]||"";
      btn.innerHTML=`<span class="orbit-icon">${icon}</span><span class="orbit-label">${lbl}</span><span class="orbit-desc">${desc}</span>`;
      btn.style.cssText=`left:${px}px;top:${py}px;transform:translate(-50%,-50%);animation-delay:${i*.08}s`;
    });
  }
  placeCards();
  // recompute on resize
  if(window._orbitResizeHandler) window.removeEventListener("resize",window._orbitResizeHandler);
  window._orbitResizeHandler=()=>{grid.innerHTML="";buildMenu();};
  window.addEventListener("resize",window._orbitResizeHandler);

  // Start canvas orbit animation
  startOrbitCanvas();
}

function startOrbitCanvas(){
  const canvas=document.getElementById("orbitCanvas");
  if(!canvas)return;
  const ctx=canvas.getContext("2d");
  const isAE=cat==="ae";
  const col=isAE?"60,140,255":"0,255,100";

  let animating=true;
  let t=0;

  // particles along lines
  const particles=[];
  function initParticles(){
    particles.length=0;
    const pos=window._orbitPositions;
    if(!pos) return;
    pos.pts.forEach((_,i)=>{
      // 3 particles per line
      for(let j=0;j<3;j++){
        particles.push({lineIdx:i,progress:Math.random(),speed:.004+Math.random()*.006,size:2.5+Math.random()*2});
      }
    });
  }

  function resize(){
    canvas.width=canvas.offsetWidth||window.innerWidth;
    canvas.height=canvas.offsetHeight||window.innerHeight;
  }
  resize();

  // cancel previous
  if(window._orbitAnimCancel) window._orbitAnimCancel();
  let cancelled=false;
  window._orbitAnimCancel=()=>{cancelled=true;};

  function draw(){
    if(cancelled||!document.getElementById("category")||document.getElementById("category").classList.contains("hidden")){
      return;
    }
    requestAnimationFrame(draw);
    t+=.018;

    const pos=window._orbitPositions;
    if(!pos){requestAnimationFrame(draw);return;}

    ctx.clearRect(0,0,canvas.width,canvas.height);

    const cx=pos.cx, cy=pos.cy;

    // ---- Outer glow ring ----
    const ringR=pos.R*1.05;
    const ringGrd=ctx.createRadialGradient(cx,cy,ringR*.92,cx,cy,ringR*1.08);
    ringGrd.addColorStop(0,`rgba(${col},0.0)`);
    ringGrd.addColorStop(.5,`rgba(${col},0.06)`);
    ringGrd.addColorStop(1,`rgba(${col},0.0)`);
    ctx.beginPath();ctx.arc(cx,cy,ringR,0,Math.PI*2);
    ctx.strokeStyle=`rgba(${col},0.08)`;ctx.lineWidth=1.5;ctx.stroke();

    // ---- Animated dashed ring ----
    ctx.save();
    ctx.translate(cx,cy);ctx.rotate(t*.15);
    ctx.setLineDash([8,16]);
    ctx.strokeStyle=`rgba(${col},0.12)`;ctx.lineWidth=1;
    ctx.beginPath();ctx.arc(0,0,ringR*.98,0,Math.PI*2);ctx.stroke();
    ctx.setLineDash([]);ctx.restore();

    // ---- Lines from center to each card ----
    if(particles.length===0) initParticles();

    pos.pts.forEach((pt,i)=>{
      // pulsing alpha
      const pulse=.1+.07*Math.sin(t*1.4+i*.8);
      const grad=ctx.createLinearGradient(cx,cy,pt.x,pt.y);
      grad.addColorStop(0,`rgba(${col},${pulse*2})`);
      grad.addColorStop(.5,`rgba(${col},${pulse})`);
      grad.addColorStop(1,`rgba(${col},0)`);
      ctx.strokeStyle=grad;ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(pt.x,pt.y);ctx.stroke();

      // dot at card end
      const dotPulse=.3+.2*Math.sin(t*2+i*.9);
      ctx.beginPath();ctx.arc(pt.x,pt.y,4+2*dotPulse,0,Math.PI*2);
      const dg=ctx.createRadialGradient(pt.x,pt.y,0,pt.x,pt.y,6+2*dotPulse);
      dg.addColorStop(0,`rgba(${col},${.7+.3*dotPulse})`);
      dg.addColorStop(1,`rgba(${col},0)`);
      ctx.fillStyle=dg;ctx.fill();
    });

    // ---- Moving particles along lines ----
    particles.forEach(p=>{
      p.progress+=p.speed;
      if(p.progress>1) p.progress=0;
      const pt=pos.pts[p.lineIdx];
      if(!pt)return;
      const x=cx+(pt.x-cx)*p.progress;
      const y=cy+(pt.y-cy)*p.progress;
      const alpha=(1-p.progress)*0.85;
      const pg=ctx.createRadialGradient(x,y,0,x,y,p.size*2);
      pg.addColorStop(0,`rgba(${col},${alpha})`);
      pg.addColorStop(1,"transparent");
      ctx.fillStyle=pg;
      ctx.beginPath();ctx.arc(x,y,p.size,0,Math.PI*2);ctx.fill();
    });

    // ---- Center pulsing core ----
    const cp=.5+.35*Math.sin(t*1.8);
    const cg=ctx.createRadialGradient(cx,cy,0,cx,cy,28+8*cp);
    cg.addColorStop(0,`rgba(${col},${.35*cp})`);
    cg.addColorStop(.4,`rgba(${col},${.12*cp})`);
    cg.addColorStop(1,"transparent");
    ctx.fillStyle=cg;ctx.beginPath();ctx.arc(cx,cy,28+8*cp,0,Math.PI*2);ctx.fill();

    // ---- Floating ambient particles ----
    for(let k=0;k<3;k++){
      const angle2=t*.4+k*2.09;
      const drift=pos.R*.15;
      const px=cx+Math.cos(angle2+k*1.2)*drift*(1+.3*Math.sin(t+k));
      const py=cy+Math.sin(angle2*1.3+k)*drift*.7;
      const pa=.12+.08*Math.sin(t*2.5+k*1.8);
      ctx.fillStyle=`rgba(${col},${pa})`;
      ctx.beginPath();ctx.arc(px,py,3+k,0,Math.PI*2);ctx.fill();
    }
  }
  draw();
}

document.getElementById("backHome").onclick=()=>show("home");
document.getElementById("backCatQ").onclick=()=>show("category");
document.getElementById("backCatG").onclick=()=>{stopGame();show("category");}
document.getElementById("backCatF").onclick=()=>show("category");
document.getElementById("backFromRes").onclick=()=>show("category");

/* ===================================================
   QUIZ
=================================================== */

function openAbout(){
  const modal=document.getElementById("aboutModal");
  const isAE=cat==="ae";
  const isDev=cat==="dev";
  const col=isDev?"0,255,100":isAE?"60,140,255":"155,92,255";
  const colHex=isDev?"#00ff88":isAE?"#3c8fff":"#9b5cff";

  // gradient bg
  const gbg=document.getElementById("aboutGradBg");
  gbg.style.background=`radial-gradient(ellipse at 20% 30%,rgba(${col},.18),transparent 50%),radial-gradient(ellipse at 80% 70%,rgba(${col},.1),transparent 50%),linear-gradient(140deg,#04070e,#080d18)`;

  // accent line
  document.getElementById("aboutAccentLine").style.background=`linear-gradient(90deg,${colHex},transparent)`;

  // avatar
  const av=document.getElementById("aboutAvatar");
  av.style.background=`rgba(${col},.1)`;
  av.style.border=`2px solid rgba(${col},.3)`;
  av.style.boxShadow=`0 0 22px rgba(${col},.2)`;

  // role
  document.getElementById("aboutRoleLine").style.color=colHex;
  document.getElementById("aboutRoleLine").textContent=lang==="ru"?"Motion + Dev обучение":"Motion + Dev Learning";

  // desc
  document.getElementById("aboutDesc").textContent=lang==="ru"
    ?"Этот сайт создан чтобы показать — мир After Effects и программирования не скучный, а крутой. Здесь ты можешь попробовать оба направления через игры, квизы и реальные факты."
    :"This site was built to show that After Effects and software development are not boring — they're awesome. Explore both worlds through games, quizzes and real facts.";

  // email color
  document.getElementById("aboutEmail").style.color=colHex;

  // built with
  document.getElementById("aboutBuilt").textContent=lang==="ru"
    ?"Сделано с ❤️  на чистом HTML + CSS + JS"
    :"Built with ❤️  in pure HTML + CSS + JS";

  modal.classList.remove("hidden");
}
document.getElementById("aboutBtn").onclick=openAbout;
document.getElementById("aboutCloseBtn").onclick=()=>document.getElementById("aboutModal").classList.add("hidden");
document.getElementById("aboutModal").onclick=e=>{if(e.target===document.getElementById("aboutModal"))document.getElementById("aboutModal").classList.add("hidden");}


/* ===================================================
   ADMIN / DEVELOPER PANEL
   Secret code: Andreykaa11
   Trigger: type "admin" on keyboard, OR double-dblclick lang button
=================================================== */
const ADMIN_CODE="Andreykaa11";
let adminLogs=[];

function adminLog(msg){
  const t=new Date().toLocaleTimeString();
  adminLogs.push("["+t+"] "+msg);
  if(adminLogs.length>60)adminLogs.shift();
  const el=document.getElementById("dbg-console");
  if(el){el.innerHTML=adminLogs.map(l=>"<div>"+l+"</div>").join("");el.scrollTop=el.scrollHeight;}
}

// Intercept console.log and window errors
(function(){
  const _orig=console.log.bind(console);
  console.log=function(...a){
    _orig(...a);
    try{adminLog([...a].map(x=>typeof x==="object"?JSON.stringify(x):String(x)).join(" "));}catch(e){}
  };
  window.onerror=(msg,_src,line)=>{adminLog("❌ ERROR: "+msg+" (line "+line+")");return false;};
  window.onunhandledrejection=ev=>{adminLog("❌ PROMISE: "+ev.reason);};
})();

function showAdminLogin(){
  const el=document.getElementById("adminLogin");
  el.style.display="flex";
  document.getElementById("adminCodeInput").value="";
  document.getElementById("adminCodeErr").textContent="";
  setTimeout(()=>document.getElementById("adminCodeInput").focus(),120);
}

function checkAdminCode(){
  const val=document.getElementById("adminCodeInput").value;
  if(val===ADMIN_CODE){
    document.getElementById("adminLogin").style.display="none";
    openAdminPanel();
  } else {
    document.getElementById("adminCodeErr").textContent="❌ Wrong code / Неверный код";
    document.getElementById("adminCodeInput").value="";
    setTimeout(()=>document.getElementById("adminCodeInput").focus(),50);
  }
}

function adminTab(btn,name){
  document.querySelectorAll(".adm-tab").forEach(b=>b.classList.remove("active"));
  document.querySelectorAll(".adm-pane").forEach(p=>p.style.display="none");
  btn.classList.add("active");
  document.getElementById("adm-"+name).style.display="block";
  if(name==="debug")adminRefreshDebug();
}

function adminRefreshDebug(){
  const d=document.getElementById.bind(document);
  d("dbg-cat").textContent=(cat||"none").toUpperCase();
  d("dbg-lang").textContent=lang.toUpperCase();
  d("dbg-grun").textContent=gRun?"✅ running":"⬜ stopped";
  d("dbg-qi").textContent=qi+" / "+(aq.length||"–");
}

function openAdminPanel(){
  adminRefreshDebug();
  buildAdminAnswers();
  buildAdminQuiz();
  buildAdminGames();
  document.getElementById("adminPanel").style.display="block";
  adminLog("✅ Admin panel opened. World="+cat+" Lang="+lang);
}

function buildAdminAnswers(){
  const el=document.getElementById("adminAnswerList");if(!el)return;
  let html="";
  // World filter buttons
  html+=`<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
    <button class="adm-btn" id="admAnsAll" onclick="filterAdminAnswers('all')" style="background:rgba(255,255,255,.1);color:#fff">ALL / ВСЕ</button>
    <button class="adm-btn" id="admAnsAe" onclick="filterAdminAnswers('ae')">🎬 AE Only</button>
    <button class="adm-btn" id="admAnsDev" onclick="filterAdminAnswers('dev')">💻 DEV Only</button>
  </div>`;
  ["ae","dev"].forEach(world=>{
    const col=world==="ae"?"#7dd8ff":"#00ff88";
    const icon=world==="ae"?"🎬":"💻";
    const worldName=world==="ae"?"After Effects":"Software Dev";
    html+=`<div class="adm-world-block" data-world="${world}">
      <div style="display:flex;align-items:center;gap:10px;font-size:10px;color:${col};font-family:'Orbitron',sans-serif;font-weight:700;letter-spacing:2px;margin:18px 0 12px;padding:10px 14px;background:rgba(255,255,255,.03);border-left:3px solid ${col};border-radius:0 8px 8px 0">
        <span style="font-size:16px">${icon}</span>
        <div>
          <div>${worldName.toUpperCase()} QUIZ</div>
          <div style="font-size:8px;opacity:.5;font-weight:400;letter-spacing:1px">CORRECT ANSWERS / ПРАВИЛЬНЫЕ ОТВЕТЫ (${QD[world].length} questions)</div>
        </div>
      </div>`;
    QD[world].forEach((q,i)=>{
      const a=q.a[q.c];
      html+=`<div class="adm-qrow" style="border-left:2px solid ${col}33">
        <div class="adm-qnum" style="color:${col}">Q${i+1} / ${QD[world].length}</div>
        <div class="adm-qtext">🇷🇺 ${q.q.ru}<br><span style="color:rgba(255,255,255,.4)">🇬🇧 ${q.q.en}</span></div>
        <div style="margin-top:8px;padding:8px 12px;background:rgba(0,0,0,.3);border-radius:7px;border-left:2px solid ${col}">
          <div style="font-size:10px;color:${col};font-weight:700;margin-bottom:2px">✅ RU: ${a.ru}</div>
          <div style="font-size:10px;color:${col};opacity:.75">✅ EN: ${a.en}</div>
        </div>
        <div style="margin-top:5px;font-size:9px;color:rgba(255,255,255,.28);line-height:1.5">💡 ${q.i.ru}</div>
      </div>`;
    });
    html+=`</div>`;
  });
  el.innerHTML=html;
  window._filterAdminWorld='all';
}
function filterAdminAnswers(world){
  window._filterAdminWorld=world;
  document.querySelectorAll(".adm-world-block").forEach(el=>{
    el.style.display=(world==="all"||el.dataset.world===world)?"block":"none";
  });
  ["admAnsAll","admAnsAe","admAnsDev"].forEach(id=>{
    const btn=document.getElementById(id);
    if(btn)btn.style.background=
      (id==="admAnsAll"&&world==="all")||(id==="admAnsAe"&&world==="ae")||(id==="admAnsDev"&&world==="dev")
        ?"rgba(255,255,255,.18)":"rgba(0,255,100,.08)";
  });
}

function buildAdminQuiz(){
  const el=document.getElementById("adminQuizFull");if(!el)return;
  let html=`<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
    <button class="adm-btn" onclick="filterAdminQuiz('all')" style="background:rgba(255,255,255,.1);color:#fff">ALL / ВСЕ</button>
    <button class="adm-btn" onclick="filterAdminQuiz('ae')">🎬 AE</button>
    <button class="adm-btn" onclick="filterAdminQuiz('dev')">💻 DEV</button>
  </div>`;
  ["ae","dev"].forEach(world=>{
    const col=world==="ae"?"#7dd8ff":"#00ff88";
    const icon=world==="ae"?"🎬":"💻";
    html+=`<div class="adm-quiz-block" data-world="${world}">
      <div style="display:flex;align-items:center;gap:10px;font-size:10px;color:${col};font-family:'Orbitron',sans-serif;font-weight:700;letter-spacing:2px;margin:18px 0 12px;padding:10px 14px;background:rgba(255,255,255,.03);border-left:3px solid ${col};border-radius:0 8px 8px 0">
        <span style="font-size:16px">${icon}</span>
        <div><div>${world.toUpperCase()} — ALL QUESTIONS & EXPLANATIONS</div></div>
      </div>`;
    QD[world].forEach((q,i)=>{
      html+=`<div class="adm-qrow" style="border-left:2px solid ${col}33">
        <div class="adm-qnum" style="color:${col}">Q${i+1}</div>
        <div class="adm-qtext">🇷🇺 ${q.q.ru}<br><span style="color:rgba(255,255,255,.38)">🇬🇧 ${q.q.en}</span></div>
        <div class="adm-ans">${q.a.map((a,ai)=>`<span class="adm-ans-opt${ai===q.c?" ok":""}">${ai===q.c?"✅ ":""}${a.ru} / ${a.en}</span>`).join("")}</div>
        <div style="margin-top:8px;font-size:10px;color:rgba(255,255,255,.35);line-height:1.6;padding:8px;background:rgba(0,0,0,.2);border-radius:6px">💡 RU: ${q.i.ru}<br><span style="opacity:.75">💡 EN: ${q.i.en}</span></div>
      </div>`;
    });
    html+=`</div>`;
  });
  el.innerHTML=html;
}
function filterAdminQuiz(world){
  document.querySelectorAll(".adm-quiz-block").forEach(el=>{
    el.style.display=(world==="all"||el.dataset.world===world)?"block":"none";
  });
}

function buildAdminGames(){
  const el=document.getElementById("adminGamesData");if(!el)return;
  const gamesRef=[
    {name:"AE G3 — Layer Sorter",col:"#7dd8ff",data:[
      "Level 1: Composition → Import Media → Add Layers → Set Keyframes → Easy Ease → Render",
      "Level 2: Opacity → Scale → Position → Rotation → Anchor Point → Expression",
      "Level 3: Solid → Shape Layer → Text Layer → Null Object → Adjustment Layer → Camera",
      "Level 4: Timeline → Composition → Graph Editor → Effects & Presets → Render Queue",
    ]},
    {name:"AE G4 — Reaction (Hotkeys)",col:"#c8b4ff",data:[
      "P = POSITION | S = SCALE | R = ROTATION | T = OPACITY (not O!) | A = ANCHOR POINT",
    ]},
    {name:"AE G5 — Motion Builder",col:"#ffb880",data:[
      "Fade out → OPACITY + KEYFRAME",
      "Movement → POSITION + KEYFRAME",
      "Random shake → EXPRESSION + WIGGLE",
      "Clip by shape → MASK + SHAPE LAYER",
      "Smooth motion → EASY EASE + GRAPH EDITOR",
      "Global effect → ADJUSTMENT LAYER + EFFECT",
    ]},
    {name:"DEV G3 — Code Sorter",col:"#00ff88",data:[
      "function greet: fn declaration → return → }",
      "if/else: if(cond){ → body → }else{ → body → }",
      "for loop: for(init;cond;step){ → body → }",
      "forEach: array → .forEach(fn => { → body → });",
      "async: async fn → await fetch → await .json() → return → }",
      "class: class Name{ → constructor(){ → property → } → }",
    ]},
    {name:"DEV G4 — What Outputs?",col:"#60e8ff",data:[
      "1+2*3=7 | '5'+3='53' | typeof undefined='undefined'",
      "[1,2,3].length=3 | 2>1?'yes':'no'='yes' | Boolean('')=false",
      "Math.max(1,2,3)=3 | (x=>x*2)(5)=10 | null==undefined=true",
    ]},
    {name:"DEV G5 — Debug Quest",col:"#dd88ff",data:[
      "Bug 1: return a-b → should be a+b",
      "Bug 2: const reassign → use let",
      "Bug 3: i<=3 extra iteration → should be i<3",
      "Bug 4: no return → result = undefined",
      "Bug 5: missing await before fetch",
      "Bug 6: = is assignment → use === for comparison",
      "Bug 7: arr[3] out of bounds → use arr[arr.length-1]",
    ]},
  ];
  let html="";
  gamesRef.forEach(g=>{
    html+=`<div class="adm-qrow" style="border-color:${g.col}22">
      <div style="color:${g.col};font-family:'Orbitron',sans-serif;font-size:10px;font-weight:700;letter-spacing:1px;margin-bottom:10px">${g.name}</div>
      ${g.data.map(d=>`<div style="font-size:11px;color:rgba(255,255,255,.62);margin-bottom:4px;line-height:1.6">▸ ${d}</div>`).join("")}
    </div>`;
  });
  el.innerHTML=html;
}

// === Triggers to open admin ===
// 1. Type "admin" anywhere on the page
let _adminTyped="";
document.addEventListener("keydown",ev=>{
  if(ev.target.tagName==="INPUT"||ev.target.tagName==="TEXTAREA")return;
  _adminTyped=((_adminTyped+ev.key.toLowerCase()).slice(-8));
  if(_adminTyped.endsWith("admin"))showAdminLogin();
});
// 2. Double-double-click on the lang button
let _admClicks=0,_admTimer=null;
document.getElementById("langBtn").addEventListener("dblclick",()=>{
  _admClicks++;
  if(_admTimer)clearTimeout(_admTimer);
  _admTimer=setTimeout(()=>{_admClicks=0;},900);
  if(_admClicks>=2)showAdminLogin();
});

/* ===================================================
   INIT
=================================================== */
applyLang();