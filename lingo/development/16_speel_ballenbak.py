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
