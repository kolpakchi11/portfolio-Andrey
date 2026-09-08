        
import random
from colorama import init, Fore, Back, Style

init(autoreset=True)

def groen(tekst):
    """Witte tekst op groene achtergrond — juiste letter, juiste plek"""
    return Back.GREEN + Fore.WHITE + Style.BRIGHT + f" {tekst} " + Style.RESET_ALL
