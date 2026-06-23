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
    # hoofdfunctie die het spel aanstuurt
    # start
    print("\n" + Back.BLUE + Fore.WHITE + Style.BRIGHT +
          "                                        " + Style.RESET_ALL)
    print(Back.BLUE + Fore.WHITE + Style.BRIGHT +
          "   W E L K O M   B I J   L I N G O !    " + Style.RESET_ALL)
    print(Back.BLUE + Fore.WHITE + Style.BRIGHT +
          "                                        " + Style.RESET_ALL)
 
    # invoer namen
    print()
    team1_naam = input("  Team 1 naam: ").strip() or "Team 1"
    team2_naam = input("  Team 2 naam: ").strip() or "Team 2"
    opnieuw_spelen = True
 
    # HERHAAL SPELEN
    while opnieuw_spelen:
        spel = initialiseer_spel(team1_naam, team2_naam)
        spel_voorbij = False
        # rondes
        while not spel_voorbij:
            # Kies willekeurig woord
            woord = random.choice(WOORDENLIJST)
            t = spel["huidig_team"]
            naam = spel["team1_naam"] if t == 1 else spel["team2_naam"]
            # Toon spelstatus + bingo-kaart
            toon_spelstatus(spel)
            toon_bingo_kaart(spel["bingo_kaart"])
 
            # raadlus
            geraden = raad_woord_ronde(woord, naam)
 
            #  na de raadlus
            if geraden:
                spel["woorden_goed"] += 1
                spel["fouten_op_rij"] = 0
                spel["scores"][t] += 1
 
                spel["rode_ballen"], spel["groene_ballen"] = speel_ballenbak(
                    spel["ballenbak"],
                    spel["bingo_kaart"],
                    spel["rode_ballen"],
                    spel["groene_ballen"]
                )
            else:
                spel["fouten_op_rij"] += 1
                print("\n  " + Back.RED + Fore.WHITE + Style.BRIGHT + f"  Niet geraden. Het woord was: {woord.upper()}  " + Style.RESET_ALL)
                # Winconditie
                gewonnen, reden = controleer_winst(spel)
 
                if gewonnen:
                    print("\n  " + Back.GREEN + Fore.WHITE + Style.BRIGHT + f" {naam} WINT! {reden}  " + Style.RESET_ALL)
                spel_voorbij = True
                continue
 
            # Verliesconditie
            verloren, reden = controleer_verlies(spel)
            if verloren:
                print("\n  " + Back.RED + Fore.WHITE + Style.BRIGHT + f" {naam} VERLIEST! {reden}  " + Style.RESET_ALL)
                spel_voorbij = True
                continue
            # Wissel van team
            spel["huidig_team"] = 2 if t == 1 else 1
            input("\n  Druk op Enter om door te gaan...")
            # Eindstand
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
 
        # opnieuw spelen
        print()
        antwoord = input("  Nog een spel spelen? (j/n): ").lower().strip()
        opnieuw_spelen = antwoord in ["ja", "j"]
        # EINDE
        print("\n " + blauw_tekst("Bedankt voor het spelen! Tot ziens!"))
        print()
 
 
if __name__ == "__main__":
    speel()