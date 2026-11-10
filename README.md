# Ариун Куран — mobil uyumlu Kur'an sitesi (MN / TR / EN)

## Klasörler
- `site/`     → **yayınlanacak web sitesi** (bunu internete koyun)
- `preview/`  → tek dosyalık önizleme (claude.ai'de gösterilen sürüm; ses ve çevrimdışı mod burada çalışmaz)
- `src/`      → kaynak kod: `app.js`, `content.js`, `template.html`, `style.css`, `sw.js`
- `data/`     → `quran.json` (Arapça metin + sayfa/cüz/nüzul), `meals.json` (Moğolca meal)
- `mushaf/`   → basılı Medine mushafı sayfa fontları (Kral Fahd Kompleksi QCF) ve 604 sayfanın satır düzeni
- `assets/`   → uygulama ikonları
- `build.py`  → `python3 build.py` çalıştırınca `site/` ve `preview/` yeniden üretilir

## En kolay yayın (5 dakika, ücretsiz)
1. https://app.netlify.com/drop adresini açın (ücretsiz hesapla giriş yapın).
2. `site` klasörünü sayfaya sürükleyip bırakın.
3. Verilen adres (ör. `ariun-kuran.netlify.app`) hemen çalışır; ayarlardan kendi alan adınızı bağlayabilirsiniz.
Alternatif: Vercel veya GitHub Pages — `site/` klasörünü kök olarak yayınlayın.

## Telefona kurma
Site açıldıktan sonra Android'de "Uygulama olarak kur" düğmesi çıkar; iPhone'da Safari → Paylaş → "Ana Ekrana Ekle".
İlk açılıştan sonra metin ve meal internetsiz çalışır.

## Ayarlanacaklar
- `src/content.js` → `CONTACT_EMAIL` (öneri/iletişim adresi), sonra `python3 build.py`.

## Kaynaklar ve lisanslar
- Arapça metin: Kral Fahd Kur'an Kompleksi, Hafs (fawazahmed0/quran-api)
- Moğolca meal: © Diyanet İşleri Başkanlığı, Ankara 2020 (ISBN 978-625-7137-06-5) — yayın izni gerekir
- Mushaf sayfa fontları: Kral Fahd Kur'an Kompleksi (QCF, ücretsiz, değiştirilmeden); satır düzeni: zonetecde/mushaf-layout
- Nüzul sırası ve İngilizce sure adları: quran-meta (MIT)
- Ses: Islamic Network CDN (`cdn.islamic.network`, alquran.cloud) — kullanım şartlarına göre kayıtlar hafızlar/vârislerince
  ücretsiz, **ticari olmayan** dağıtım için lisanslı (https://alquran.cloud/terms-and-conditions). 12 hafız; ilk üçü
  (Huzeyfî, Eyyûb, Ahdar) Kral Fahd Kur'an Kompleksi'nin Hafs tilavet listesindeki hafızlar. Site ticarileşirse (reklam, ücret) ses izni yeniden alınmalı.

## Mushaf fontlarını yeniden indirme (mushaf/ klasörü yoksa)
`mushaf/pages/` paketin içinde gelir. Sayfa fontları büyük olduğu için ayrı indirilir:

    mkdir -p mushaf/fonts && cd mushaf/fonts
    for n in $(seq -w 1 604); do curl -sS -o QCF_P$n.woff2 https://raw.githubusercontent.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2/QCF_P$n.woff2; done
    curl -sS -o QCF_BSML.woff2 https://raw.githubusercontent.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2/QCF_BSML.woff2
    cd ../.. && python3 build.py

(`seq -w 1 604` 001…604 üretir.) Sonra `python3 build.py` fontları `site/mushaf/` içine kopyalar.
