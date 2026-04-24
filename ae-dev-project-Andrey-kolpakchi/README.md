# AE & DEV WORLD

Interactive learning site — quiz, mini-games, facts about After Effects and Software Development.

## Project Structure

```
ae-dev-world/
├── index.html          ← HTML (links to css/ and js/)
├── index_bundle.html   ← Single self-contained file (open directly)
├── css/
│   └── style.css       ← All styles + mobile/cross-browser fixes
└── js/
    ├── app.js          ← i18n, quiz data, navigation, about, admin panel
    ├── quiz.js         ← Quiz logic, facts, result, canvas backgrounds
    └── game.js         ← All 10 mini-games + touch support
```

## How to Open

### Option 1 — Single file (easiest)
Double-click `index_bundle.html` — works in any browser, no setup needed.

### Option 2 — Dev mode with separate files (VS Code)
1. Install **Live Server** extension in VS Code
2. Right-click `index.html` → **Open with Live Server**
3. Opens at `http://localhost:5500`

### Option 3 — Python server
```bash
cd ae-dev-world
python -m http.server 8080
# open http://localhost:8080
```

> ⚠️ `index.html` (multi-file version) does NOT work with double-click  
> because Chrome/Edge block local JS file loading for security.  
> Use `index_bundle.html` for direct opening.

## Admin Panel

- **Trigger:** Type `admin` anywhere on keyboard (not in input fields)
- **Alt trigger:** Double-double-click the RU/EN language button
- **Code:** `Andreykaa11`
- **Tabs:** Answers · Full Quiz · Games · Debug

## Browser Support

| Browser | Status |
|---------|--------|
| Chrome 90+ | ✅ Full |
| Edge 90+ | ✅ Full |
| Firefox 88+ | ✅ Full |
| Safari 14+ | ✅ Full (-webkit- prefixes added) |
| iOS Safari | ✅ Touch support |
| Android Chrome | ✅ Touch support |

## Features

- 🌐 Bilingual RU / EN (toggle top-right)
- 🎬 After Effects world — aurora sky background, blue theme
- 💻 Software Dev world — matrix canvas, green theme  
- 📝 10 quiz questions per world
- 🎮 5 mini-games per world (10 total)
- 📚 7 educational facts per world
- 🤖 Mascot "Debugger" with tips
- ⚡ Admin panel with red restricted-access design
- 📱 Fully mobile responsive
