# Smpolish.pl - Oficjalna Strona AI Startup

Profesjonalna strona lądowania dla **Smpolish** (Warszawa, Polska) – startupu deep-tech budującego autonomicznych agentów inżynierii oprogramowania w oparciu o modele Claude i Claude Agent SDK.

---

## 🚀 Live Preview (Strona już działa na żywo!)
- **Adres tymczasowy / GitHub Pages:** [https://svnekxqqhub.github.io/smpolish-website/](https://svnekxqqhub.github.io/smpolish-website/)
- **Docelowa domena:** `https://smpolish.pl`

---

## 📁 Zawartość paczki
- `index.html` – Główna struktura strony (Hero, interaktywny symulator agenta, 6 filarów, architektura, o firmie, formularz kontaktowy, stopka).
- `styles.css` – Nowoczesny, ciemny design system (Dark obsidian + Claude amber & cyber cyan, glassmorphism, responsywność 100%).
- `app.js` – Interaktywny symulator 5 faz pracy agenta (Plan -> Write -> Test -> Self-Heal -> Deploy), animowane tło cząsteczkowe, obsługa formularza kontaktowego (`contact@smpolish.pl`).
- `favicon.svg` – Nowoczesny wektorowy sygnet Smpolish.
- `robots.txt` & `sitemap.xml` – Pliki SEO dla wyszukiwarek.
- `smpolish-website.zip` – Gotowa spakowana paczka do natychmiastowego wrzucenia na hosting OVH.

---

## 🔒 Jak podpiąć domenę smpolish.pl na OVH (NIE PSUJĄC POCZTY)?

Masz dwie wygodne opcje:

### Opcja 1: Wrzucenie bezpośrednio na Twój hosting w OVH (ZALECANE - 0 zmian w DNS)
Twoja domena już teraz wskazuje na serwer OVH (`213.186.33.5`), gdzie obecnie wyświetla się komunikat OVH *"Site en construction"*.
1. Zaloguj się do panelu OVH: [panel.ovh.com](https://www.ovh.com/auth/).
2. W menu po lewej kliknij **Web Cloud** -> **Hosting** -> wybierz swój hosting dla `smpolish.pl`.
3. Przejdź do zakładki **FTP - SSH** i kliknij przycisk **WebFTP** (lub zaloguj się programem FileZilla).
4. Otwórz katalog **`www`**.
5. Usuń domyślny plik `index.html` (ten z napisem "Site en construction").
6. Wgraj pliki z tego folderu (lub zawartość `smpolish-website.zip`): `index.html`, `styles.css`, `app.js`, `favicon.svg`, `robots.txt`, `sitemap.xml`.
7. W zakładce **Multidomena / Certyfikat SSL** upewnij się, że certyfikat SSL (Let's Encrypt) jest wygenerowany (trwa to kilka minut, jest w 100% darmowy w OVH).
> **Zaleta:** Żadne rekordy DNS nie są zmieniane! Twoja poczta w OVH (`mx0.mail.ovh.net`, itp.) działa stabilnie bez najmniejszego ryzyka.

---

### Opcja 2: Podpięcie pod darmowy hosting GitHub Pages (Global CDN)
Strona jest już zahostowana w Twoim repozytorium GitHub:
1. Zaloguj się do panelu OVH -> **Domeny** -> `smpolish.pl` -> zakładka **Strefa DNS** (DNS Zone).
2. Odszukaj rekord **A** dla `smpolish.pl` (zwykle wskazuje na `213.186.33.5`) i zmień go na adresy IP GitHub Pages:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`
3. Odszukaj rekord **CNAME** dla subdomeny `www.smpolish.pl` i ustaw wartość: `svnekxqqhub.github.io.`
4. **UWAGA:** NIE usuwaj ani nie modyfikuj rekordów **MX** (`mx0.mail.ovh.net`, `mx1.mail.ovh.net`, etc.) ani rekordów SPF/DKIM! Dzięki temu poczta nie zostanie w żaden sposób naruszona.
