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
