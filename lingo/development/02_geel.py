        
import random
from colorama import init, Fore, Back, Style

init(autoreset=True)



def geel(tekst):
    """Zwarte tekst op gele achtergrond — letter in woord, verkeerde plek"""
    return Back.YELLOW + Fore.BLACK + Style.BRIGHT + f" {tekst} " + Style.RESET_ALL