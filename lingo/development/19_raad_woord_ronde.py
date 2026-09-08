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

