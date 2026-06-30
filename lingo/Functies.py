
import random
from colorama import init, Fore, Back, Style

# colorama 1x initialiseren bij het importeren van deze module
init(autoreset=True)


#  KLEUREN HELPERS

def groen(tekst):
    """Witte tekst op groene achtergrond — juiste letter, juiste plek"""
    return Back.GREEN + Fore.WHITE + Style.BRIGHT + f" {tekst} " + Style.RESET_ALL


def geel(tekst):
    """Zwarte tekst op gele achtergrond — letter in woord, verkeerde plek"""
    return Back.YELLOW + Fore.BLACK + Style.BRIGHT + f" {tekst} " + Style.RESET_ALL


def grijs(tekst):
    """Witte tekst op grijze achtergrond — letter niet in woord"""
    return Back.WHITE + Fore.BLACK + f" {tekst} " + Style.RESET_ALL


def rood_tekst(tekst):
    return Fore.RED + Style.BRIGHT + tekst + Style.RESET_ALL


def groen_tekst(tekst):
    return Fore.GREEN + Style.BRIGHT + tekst + Style.RESET_ALL


def geel_tekst(tekst):
    return Fore.YELLOW + Style.BRIGHT + tekst + Style.RESET_ALL


def blauw_tekst(tekst):
    return Fore.CYAN + Style.BRIGHT + tekst + Style.RESET_ALL


def wit_tekst(tekst):
    return Fore.WHITE + Style.BRIGHT + tekst + Style.RESET_ALL


def dim_tekst(tekst):
    return Style.DIM + tekst + Style.RESET_ALL


#  BALLENBAK

def maak_ballenbak():
    """
    Maakt de ballenbak aan.
    3 groene, 3 rode, en nummers (even voor team1, oneven voor team2)
    """
    ballen = (
        ["groen"] * 3 +
        ["rood"]  * 3 +
        list(range(2, 50, 2)) +   # even nummers: team 1
        list(range(1, 50, 2))     # oneven nummers: team 2
    )
    random.shuffle(ballen)
    return ballen


def trek_bal(ballen):
    """Trekt een willekeurige bal uit de bak (bal verdwijnt)"""
    if not ballen:
        return None
    index = random.randrange(len(ballen))
    return ballen.pop(index)


#  BINGO-KAART

def maak_bingo_kaart():
    """Maakt een lege 4x4 bingo-kaart"""
    nummers = random.sample(range(1, 50), 16)
    return {
        "nummers":    nummers,
        "gemarkeerd": [False] * 16
    }


def toon_bingo_kaart(kaart):
    """Print de bingo-kaart mooi in de terminal"""
    print("\n  " + blauw_tekst("BINGO-KAART:"))
    print("  +" + "------+" * 4)
    for rij in range(4):
        print("  |", end="")
        for kolom in range(4):
            index = rij * 4 + kolom
            nummer = kaart["nummers"][index]
            if kaart["gemarkeerd"][index]:
                # Zachtjes gekleurd als aangevinkt
                print(Back.GREEN + Fore.WHITE + f"  {nummer:2}  " + Style.RESET_ALL + "|", end="")
            else:
                print(f"  {nummer:2}  |", end="")
        print()
    print("  +" + "------+" * 4)


def update_bingo_kaart(kaart, bal_nummer):
    """Kruis een nummer aan op de bingo-kaart"""
    for i, nummer in enumerate(kaart["nummers"]):
        if nummer == bal_nummer:
            kaart["gemarkeerd"][i] = True
            print("  " + groen_tekst(f"✓ Nummer {bal_nummer} aangevinkt op de kaart!"))
            return
    print("  " + dim_tekst(f"Nummer {bal_nummer} staat niet op jouw kaart."))


def heeft_lijn(kaart):
    """
    Controleert of er een lijn is op de bingo-kaart.
    Kijkt naar: 4 rijen, 4 kolommen, 2 diagonalen
    """
    g = kaart["gemarkeerd"]

    # Horizontale rijen
    for rij in range(4):
        start = rij * 4
        if all(g[start:start + 4]):
            return True

    # Verticale kolommen
    for kolom in range(4):
        if all([g[kolom], g[kolom+4], g[kolom+8], g[kolom+12]]):
            return True

    # Diagonaal links → rechts (0, 5, 10, 15)
    if all([g[0], g[5], g[10], g[15]]):
        return True

    # Diagonaal rechts → links (3, 6, 9, 12)
    if all([g[3], g[6], g[9], g[12]]):
        return True

    return False


#  LETTERS CONTROLEREN

def controleer_letters(raadwoord, woord):
    """
    Vergelijkt raadwoord met het echte woord.
    Stap 1: zoek groene letters (exacte match)
    Stap 2: zoek gele letters (letter bestaat maar verkeerde plek)
    """
    resultaat    = ["grijs"] * len(woord)
    woord_letters = list(woord)

    # Stap 1 — groen
    for i in range(len(woord)):
        if raadwoord[i] == woord[i]:
            resultaat[i]    = "groen"
            woord_letters[i] = None   # al gebruikt

    # Stap 2 — geel
    for i in range(len(woord)):
        if resultaat[i] == "groen":
            continue
        if raadwoord[i] in woord_letters:
            resultaat[i] = "geel"
            woord_letters[woord_letters.index(raadwoord[i])] = None

    return resultaat


def toon_resultaat(raadwoord, resultaat):
    """
    Print het woord met gekleurde vakjes — zoals echt Lingo/Wordle!
    Bovenste rij = letters, onderste rij = kleur
    """
    print("\n  ", end="")
    for i, letter in enumerate(raadwoord):
        kleur = resultaat[i]
        if kleur == "groen":
            print(groen(letter.upper()), end=" ")
        elif kleur == "geel":
            print(geel(letter.upper()), end=" ")
        else:
            print(grijs(letter.upper()), end=" ")
    print()


#  Groene letters onthouden voor de volgende poging

def vul_bevestigde_letters_in(bevestigd, raadwoord, resultaat):
    """Sla groene letters op zodat ze bij de volgende poging al staan"""
    for i in range(len(raadwoord)):
        if resultaat[i] == "groen":
            bevestigd[i] = raadwoord[i]


def toon_bevestigde_letters(bevestigd):
    """
    Laat zien welke letters al bekend zijn.
    Groene letters zichtbaar, onbekend = grijs vakje
    """
    print("\n  Bekende letters:")
    print("  ", end="")
    for letter in bevestigd:
        if letter:
            print(groen(letter.upper()), end=" ")
        else:
            print(Back.WHITE + Fore.WHITE + "   " + Style.RESET_ALL, end=" ")
    print()


#  BALLENBAK SPELEN

def speel_ballenbak(ballen, bingo_kaart, rode_ballen, groene_ballen):
    """
    Flowchart: begin ballen spel → einde ballen spel
    Trek bal 1 → als rood: stop (geen 2e bal)
    Niet rood: verwerk bal 1, trek bal 2, verwerk bal 2
    """
    print("\n  " + wit_tekst("━" * 40))
    print("  " + blauw_tekst("  BALLENBAK — Jij mag grabbelen!"))
    print("  " + wit_tekst("━" * 40))

    # Trek bal 1 uit bak
    bal1 = trek_bal(ballen)
    print(f"\n  Bal 1:  ", end="")

    # bal 1 = rood ?
    if bal1 == "rood":
        rode_ballen += 1
        print(Back.RED + Fore.WHITE + Style.BRIGHT + "  ROOD  " + Style.RESET_ALL)
        print("  " + rood_tekst("Rode bal! Geen tweede kans."))
        print(f"  " + rood_tekst(f"Rode ballen totaal: {rode_ballen}/3"))
        return rode_ballen, groene_ballen

    # Bal 1 niet rood — verwerk bal 1
    if bal1 == "groen":
        groene_ballen += 1
        print(Back.GREEN + Fore.WHITE + Style.BRIGHT + " GROEN  " + Style.RESET_ALL)
        print("  " + groen_tekst(f"Groene bal! Totaal: {groene_ballen}/3"))
    else:
        print(Back.CYAN + Fore.BLACK + Style.BRIGHT + f"  {bal1:2}   " + Style.RESET_ALL)
        update_bingo_kaart(bingo_kaart, bal1)

    # Trek bal 2 uit bak
    bal2 = trek_bal(ballen)
    print(f"\n  Bal 2:  ", end="")

    if bal2 == "rood":
        rode_ballen += 1
        print(Back.RED + Fore.WHITE + Style.BRIGHT + "  ROOD  " + Style.RESET_ALL)
        print("  " + rood_tekst(f"Rode bal! Totaal: {rode_ballen}/3"))
    elif bal2 == "groen":
        groene_ballen += 1
        print(Back.GREEN + Fore.WHITE + Style.BRIGHT + " GROEN  " + Style.RESET_ALL)
        print("  " + groen_tekst(f"Groene bal! Totaal: {groene_ballen}/3"))
    else:
        print(Back.CYAN + Fore.BLACK + Style.BRIGHT + f"  {bal2:2}   " + Style.RESET_ALL)
        update_bingo_kaart(bingo_kaart, bal2)

    return rode_ballen, groene_ballen


#  INVOER VALIDATIE

def invoer_is_geldig(raadwoord, woord, bevestigd):
    """
    Controleert of het ingevoerde woord geldig is:
    1. Juiste lengte?
    2. Alleen letters?
    3. Bevestigde letters op de juiste plek?
    """
    if len(raadwoord) != len(woord):
        print("  " + rood_tekst(f"✗ Het woord moet {len(woord)} letters hebben!"))
        return False
    if not raadwoord.isalpha():
        print("  " + rood_tekst("✗ Alleen letters toegestaan!"))
        return False
    for i, letter in enumerate(bevestigd):
        if letter and raadwoord[i] != letter:
            print("  " + rood_tekst(f"✗ Positie {i+1} moet '{letter.upper()}' zijn!"))
            return False
    return True


#  SPELSTATUS TONEN

def toon_spelstatus(spel):
    """Print een overzicht van de huidige spelstand"""
    t = spel["huidig_team"]
    naam1 = spel["team1_naam"]
    naam2 = spel["team2_naam"]
    s = spel["scores"]

    print("\n  " + wit_tekst("━" * 40))
    print("  " + wit_tekst("  L I N G O"))
    print("  " + wit_tekst("━" * 40))
    print(f"  {groen_tekst(naam1)}: {s[1]} pt   {dim_tekst('|')}   {blauw_tekst(naam2)}: {s[2]} pt")
    print()

    # Groene ballen weergeven
    groene_display = (Back.GREEN + Fore.WHITE + " ● " + Style.RESET_ALL) * spel["groene_ballen"]
    groene_leeg    = (Back.WHITE + Fore.WHITE + " ○ " + Style.RESET_ALL) * (3 - spel["groene_ballen"])
    print(f"  Groene ballen : {groene_display}{groene_leeg}")

    # Rode ballen weergeven
    rode_display = (Back.RED + Fore.WHITE + " ● " + Style.RESET_ALL) * spel["rode_ballen"]
    rode_leeg    = (Back.WHITE + Fore.WHITE + " ○ " + Style.RESET_ALL) * (3 - spel["rode_ballen"])
    print(f"  Rode ballen   : {rode_display}{rode_leeg}")

    print(f"  Woorden goed  : {groen_tekst(str(spel['woorden_goed']))}/10")
    print(f"  Fouten op rij : {rood_tekst(str(spel['fouten_op_rij']))}/3")
    print()
    print(f"  Nu aan de beurt: " + geel_tekst(f"Team {t} ({naam1 if t==1 else naam2})"))
    print("  " + wit_tekst("━" * 40))


#  RAADLUS — één ronde (max 5 pogingen)

def raad_woord_ronde(woord, team_naam):
    pogingen = 0
    geraden = False
    bevestigd = [None] * len(woord)  # onthoudt groene letters
    bevestigd[0] = woord[0]  # eerste letter is altijd bekend
    print(f"\n  Woord heeft " + geel_tekst(str(len(woord))) + " letters.")
    print(f"  Eerste letter: " + groen(woord[0].upper()))

    # ── ZOLANG pogingen < 5 EN woord niet geraden ──
    while pogingen < 5 and not geraden:

        print(f"\n  " + blauw_tekst(f"── Poging {pogingen + 1} van 5 ──"))

        # Bevestigde letters tonen
        if pogingen > 0:
            toon_bevestigde_letters(bevestigd)

        # Invoer
        raadwoord = input(f"\n  {team_naam} → voer woord in: ").lower().strip()

        # Invoer geldig?
        if not invoer_is_geldig(raadwoord, woord, bevestigd):
            continue   # GA TERUG — poging telt niet mee

        # Woord geraden?
        if raadwoord == woord:
            geraden = True
            toon_resultaat(raadwoord, ["groen"] * len(woord))
            print("\n  " + Back.GREEN + Fore.WHITE + Style.BRIGHT +
                  f"  CORRECT! Het woord was {woord.upper()}!  " + Style.RESET_ALL)
        else:
            # Controleer letters groen / geel / grijs
            resultaat = controleer_letters(raadwoord, woord)
            toon_resultaat(raadwoord, resultaat)

            # Bevestigde letters opslaan voor volgende poging
            vul_bevestigde_letters_in(bevestigd, raadwoord, resultaat)
            pogingen += 1

    # ── EINDE ZOLANG ──
    return geraden


#  WIN / VERLIES CONTROLE

def controleer_winst(spel):
    if spel["groene_ballen"] >= 3:
        return True, "3 groene ballen getrokken!"
    if heeft_lijn(spel["bingo_kaart"]):
        return True, "Lijn op de bingo-kaart!"
    if spel["woorden_goed"] >= 10:
        return True, "10 woorden goed geraden!"
    return False, ""


def controleer_verlies(spel):
    if spel["rode_ballen"] >= 3:
        return True, "3 rode ballen getrokken!"
    if spel["fouten_op_rij"] >= 3:
        return True, "3 woorden op rij fout geraden!"
    return False, ""


#  INITIALISEER SPEL

def initialiseer_spel(naam1, naam2):
    # Reset alles naar 0 — nieuw spel
    return {
        "scores":        {1: 0, 2: 0},
        "bingo_kaart":   maak_bingo_kaart(),
        "ballenbak":     maak_ballenbak(),
        "rode_ballen":   0,
        "groene_ballen": 0,
        "woorden_goed":  0,
        "fouten_op_rij": 0,
        "huidig_team":   1,
        "team1_naam":    naam1,
        "team2_naam":    naam2,
    }