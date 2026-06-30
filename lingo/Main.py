import random
from colorama import Fore, Back, Style
 
from Data import WOORDENLIJST
from Functies import (
    initialiseer_spel,
    toon_spelstatus,
    toon_bingo_kaart,
    raad_woord_ronde,
    speel_ballenbak,
    controleer_winst,
    controleer_verlies,
    wit_tekst,
    blauw_tekst,
    groen_tekst,
    geel_tekst,
)
 
 
#  HOOFD SPELLOOP
 
def speel():
    # ── start + Print welkomstbericht ──
    print("\n" + Back.BLUE + Fore.WHITE + Style.BRIGHT +
          "                                        " + Style.RESET_ALL)
    print(Back.BLUE + Fore.WHITE + Style.BRIGHT +
          "   W E L K O M   B I J   L I N G O !    " + Style.RESET_ALL)
    print(Back.BLUE + Fore.WHITE + Style.BRIGHT +
          "                                        " + Style.RESET_ALL)
 
    # ── Input: namen team 1 en team 2 ──
    print()
    team1_naam = input("  Team 1 naam: ").strip() or "Team 1"
    team2_naam = input("  Team 2 naam: ").strip() or "Team 2"
    opnieuw_spelen = True
 
    # ── HERHAAL SPELEN (opnieuw spelen? ja -> Initialiseer spel) ──
    while opnieuw_spelen:
        # Initialiseer spel (scores, bingo, tellers)
        spel = initialiseer_spel(team1_naam, team2_naam)
        spel_voorbij = False
 
        # ── RONDES ──
        while not spel_voorbij:
            # Kies willekeurig woord uit lijst
            woord = random.choice(WOORDENLIJST)
            t = spel["huidig_team"]
            naam = spel["team1_naam"] if t == 1 else spel["team2_naam"]
 
            # Toon spelstatus + bingo-kaart
            toon_spelstatus(spel)
            toon_bingo_kaart(spel["bingo_kaart"])
 
            # Raadlus: print eerste letter -> invoer -> controleer letters ->
            #          woord geraden? (max 5 pogingen)
            geraden = raad_woord_ronde(woord, naam)
 
            # ── na de raadlus: beide takken komen samen bij de controles ──
            if geraden:
                # woord geraden? -> JA
                # wordteller +1, foutteller = 0, score +1
                spel["woorden_goed"] += 1
                spel["fouten_op_rij"] = 0
                spel["scores"][t] += 1
 
                # begin ballen spel ... einde ballen spel (update bingo-kaart zit hierin)
                spel["rode_ballen"], spel["groene_ballen"] = speel_ballenbak(
                    spel["ballenbak"],
                    spel["bingo_kaart"],
                    spel["rode_ballen"],
                    spel["groene_ballen"]
                )
            else:
                # woord geraden? -> NEE
                # Print: woord niet geraden, toon het juiste woord
                print("\n  " + Back.RED + Fore.WHITE + Style.BRIGHT +
                      f"  Niet geraden. Het woord was: {woord.upper()}  " + Style.RESET_ALL)
                # Foutteller + 1 (pogingen worden elke ronde opnieuw op 0 gezet)
                spel["fouten_op_rij"] += 1
 
            # ── Winconditie: 3 groen / lijn / 10 woorden?  (na ELKE ronde) ──
            gewonnen, reden = controleer_winst(spel)
            if gewonnen:
                print("\n  " + Back.GREEN + Fore.WHITE + Style.BRIGHT +
                      f" {naam} WINT! {reden}  " + Style.RESET_ALL)
                spel_voorbij = True
                continue
 
            # ── Verliesconditie: 3 rood / 3 fouten op rij? ──
            verloren, reden = controleer_verlies(spel)
            if verloren:
                print("\n  " + Back.RED + Fore.WHITE + Style.BRIGHT +
                      f" {naam} VERLIEST! {reden}  " + Style.RESET_ALL)
                spel_voorbij = True
                continue
 
            # ── Wissel van team (1 - 2) en ga door ──
            spel["huidig_team"] = 2 if t == 1 else 1
            input("\n  Druk op Enter om door te gaan...")
 
        # ── Print: winnend team en eindstand ──
        print("\n  " + wit_tekst("━" * 40))
        print("  " + wit_tekst("  EINDSTAND"))
        print("  " + wit_tekst("━" * 40))
        s = spel["scores"]
        print(f"  {groen_tekst(spel['team1_naam'])}: {s[1]} punten")
        print(f"  {blauw_tekst(spel['team2_naam'])}: {s[2]} punten")
        if s[1] > s[2]:
            print("\n  " + Back.GREEN + Fore.WHITE + Style.BRIGHT +
                  f" Winnaar: {spel['team1_naam']}!  " + Style.RESET_ALL)
        elif s[2] > s[1]:
            print("\n  " + Back.GREEN + Fore.WHITE + Style.BRIGHT +
                  f" Winnaar: {spel['team2_naam']}!  " + Style.RESET_ALL)
        else:
            print("\n  " + geel_tekst(" Gelijkspel!"))
 
        # ── opnieuw spelen? ──
        print()
        antwoord = input("  Nog een spel spelen? (j/n): ").lower().strip()
        opnieuw_spelen = antwoord in ["ja", "j"]
 
    # ── Print: "Bedankt voor het spelen!" -> end ──
    print("\n " + blauw_tekst("Bedankt voor het spelen! Tot ziens!"))
    print()
 
 
if __name__ == "__main__":
    speel()