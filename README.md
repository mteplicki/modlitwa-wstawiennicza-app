# O projekcie

Jest to aplikacja PWA do wysyłania i sprawdzania przydzielonych intencji działająca w ramach grupy modlitwy wstawienniczej Salezjańskiego Duszpasterstwa Akademickiego MOST. Wspołpracuje ona z panelem administratora (modlitwa-wstawiennicza-projekt). Stworzona z myślą o jak najlepszym doświadczeniu użytkownika, jak najbliżej natywnej aplikacji.

https://modlitwa-wstawiennicza-23992.web.app/intencje

## Funkcjonalności

Aplikacja posiada dwie następujące funkcjonalności:
 1. Wysyłanie intencji do omodlenia
 2. Sprawdzanie przydzielonych intencji

Wysyłać intencje może każdy użytkownik, zalogowanie nie jest konieczne. Formularz jest chroniony przez reCAPTCHA v3. Natomiast uczestnik inicjatywy modlitwy wstawienniczej może sprawdzić na aplikacji, jakie intencje zostały mu przydzielone na dany tydzień. W tym celu musi się zalogować mailem, na który dostaje wiadomości z intencjami. Co więcej, przy pomocy Firebase Cloud Messaging użytkownik otrzymuje powiadomienia push, gdy nowe intencje zostaną przydzielone.

## Technologie

Aplikacja została napisana w języku Typescript. Został użyty framework Solid.js, który bardzo umiejętnie wprowadza zmiany w drzewie DOM podczas aktualizacji. 

Wykorzystano tutaj ideę PWA (ang. *Progressive Web App*), która umożliwia tworzenie aplikacji webowych tak, by doświadczenie użytkownika było możliwie jak najbardziej zbliżone do aplikacji natywnej. W tym celu wykorzystano następujące technologie:
 - Solid Router - przejścia pomiędzy stronami są płynne, tylko fragment drzewa DOM się zmienia,
 - View Transition API (eksperymentalne, działa tylko w Chrome) - pozwala na estetyczne przejścia pomiędzy stronami, estetyczne zmianę z trybu ciemnego na jasny i odwrotnie oraz animowanie niektórych elementów,
 - możliwość zainstalowania aplikacji na ekranie głównym
 - obecność powiadomień push
