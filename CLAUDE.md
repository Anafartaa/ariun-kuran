# Ариун Куръан — proje notları (Claude için)

Kullanıcıyla **Türkçe** konuş. Uygulamanın varsayılan arayüz dili **Moğolca** (MN), ikinci dil **Türkçe** (TR).

## Amaç
kuran.diyanet.gov.tr'deki Kur'an okuma deneyimini örnek alan, Moğolca konuşan kullanıcılar için bir Kur'an okuma sitesi.
Birebir kopya değil, daha iyisi isteniyor. Diyanet logosu ve adı kullanılmıyor; kendi markası "Ариун Куръан".

## Şu anki durum (v4, 11.11.2026)
`python3 build.py` → `site/` (yayın, ~53 MB, mushaf fontları dahil) + `preview/index.html` (tek dosya önizleme).
- **Tasarım (v4):** lacivert (Moğol göğü / tezhip lacivert) + altın; okuma sayfası parşömen; fontlar: Cormorant Garamond (başlık),
  Golos Text (arayüz), Literata (meal), Amiri Quran (Arapça). Tezhipli sayfa çerçevesi ve sure kartuşu imza öğesi. Stil: `src/style.css`.
- **Basılı Medine mushafı görünümü:** "Куран" görünümü gerçek sitede Kral Fahd Kompleksi QCF V1 sayfa fontlarıyla 15 satırlık birebir sayfa çizer
  (`mushaf/fonts/QCF_PNNN.woff2` + `mushaf/pages/NNN.json`). Ayarlardan kapatılabilir; önizlemede (claude.ai) akan metne döner.
- Ses: **cdn.islamic.network** (alquran.cloud), 12 hafız — ayrıntı aşağıda "Ses ve izinler". Kaydetme, not dışa aktarma, paylaş, arama filtreleri, PWA: v3'teki gibi.
- Meal **yalnızca** kullanıcının verdiği PDF'ten: `data/meals.json`. Birleşik 6 ayette ikinci ayete metin eklenmez, sadece "↑ 11:96–97" gösterilir.
- **Kaldırılanlar (kullanıcı isteği):** meal yükleme, meal karşılaştırma, Kur'an Sözlüğü / kelime kelime (Moğolca anlam verisi yok).
- Sure adları SABİT: Moğolca meal PDF'indeki adlar. Kullanıcı değiştirilmesini istemiyor.

## v5 düzeltmeleri (10.11.2026)
- Okuma genişliği: okurken `.wrap` 1560px'e kadar; tek sayfa en fazla 920px; QCF yazı boyu üst sınırı 54px.
  Çift sayfa artık ≥1500px ekranda (`isDbl`); daha dar ekranda tek, geniş sayfa. Üst çubuk ≥1480px'te tek satır.
- Üst üste binmeler: sure kartuşu (`.sban` min-height + line-height 2.1), Besmele (`.bsm` line-height 2.15),
  ana sayfa başlığı (`.hero .ttl` line-height 2). Ana sayfa kartları eşit uzamıyor (`.two` align-items:start).
- Ayraç noktaları önceki öğeye bağlı (`.smeta`, `.mt2`): satır başında yalnız nokta kalmıyor.
- Çalan ayet vurgusu sade dolgu (kenar çizgisi yok); mushaf (QCF) görünümünde kutu yerine yazı rengi (`.qw.pl`). Telefon: alt çubuk okumada değilken ortalı; görünüm seçici 118px.
- Ses yerelde/gerçek sitede çalışıyor (cdn.islamic.network, 206). claude.ai artifact'ında CSP yüzünden çalmaz.
- Yayın: GitHub Pages (`.github/workflows/pages.yml`, `site/` yayınlanır). Site herkese açık adreste olur;
  arama motorlarına kapalı (`robots.txt`, `noindex`). PDF depoya konmaz (.gitignore).

## v6: oynatıcı (10.11.2026)
- Oynatıcı küçültülebilir (`S.plMin`, ⌄ düğmesi): sağ altta ince çubuk (ayet, önceki/oynat/sonraki, alt yazı, kapat); ⌃ ile büyür.
- Meal alt yazısı (`S.cap`, varsayılan açık; `#plcap`, `renderCap`): çalan ayetin meali altta, sesle eşzamanlı; Besmele çalarken `m.bism`.
  Metin yalnız `mealTxt` (meals.json) — yeni metin yok. Telefonda büyük oynatıcı açıkken gizli. Takip kaydırması şeridin üstünde durur.
- **Akan metinde mushaf hattı** (`S.font='qcf'`, varsayılan; ayarda "Mushaf (KFGQPC)"): her kelime `mushaf/pages` + QCF sayfa fontundaki
  basılı glifle (`upgradeFlow`, `qfHTML`, `QW`); ayet sonraki sayfaya taşarsa iki sayfa fontu birlikte. Besmele QCF_BSML. Önizlemede (INL) yok → Amiri Quran.
- Varsayılan tek sayfa (`dbl:false`); çift sayfa ayardan açılır. `setV<2` olan kayıtlı ayarlar bir kez qcf + tek sayfaya geçirildi.
- Diğer Kur'an fontları: Amiri Quran, Scheherazade New, Amiri. **Noto Naskh Arabic çıkarıldı**: Tanzil Osmanî metinde
  iklab mimini (U+06E2) üstünle tek işarete birleştiriyor (ör. 3:49 طَيۡرَۢا tenvin gibi görünüyor). Kayıtlı 'naskh' → 'sch' (`FONTS_OK`).

## Ses ve izinler (10.11.2026)
- Kural: yalnızca kullanım izni açıkça yazılı kayıtlar. Dayanak: alquran.cloud şartları §IV (son güncelleme 14.06.2026):
  kayıtlar hafızlar/vârislerince ücretsiz, ticari olmayan yeniden dağıtım için lisanslı; akış/gömme/indirme serbest.
- Adres: `https://cdn.islamic.network/quran/audio/{bitrate}/{edition}/{global ayet no}.mp3` (`ayURL`, `RECITERS[i][4]`=bitrate).
- Kalan 12: Huzeyfî, Eyyûb, Ahdar (Kompleks'in Hafs listesinde; listede önce; varsayılan Huzeyfî), Basfar, Afâsî,
  Abdulbâsit murattal, Minşâvî, Husarî, Şureym, Sudeys, Muaykılî, Şâtırî.
- Çıkarılan (yalnız everyayah.com'da; sitede lisans metni yok): Abdulbâsit mücevved, Husarî muallim, Gâmidî, Devserî.
  Cuhenî eklenmedi (aynı sebep; everyayah klasörü `Abdullaah_3awwaad_Al-Juhaynee_128kbps`).
- Kompleks'in ses sayfası (arşiv 09.09.2025, kullanıcı yapıştırdı) — Hafs: Huzeyfî, Muaykılî, Eyyûb, Hâlid el-Muhennâ, Ahdar;
  Şu'be ve Kālûn: Huzeyfî; Sûsî: Osman es-Sıddîkī; Dûrî: Cuhenî. Basfar listede YOK. Cuhenî'nin Kompleks kaydı Dûrî
  rivayeti (Hafs metniyle kullanılamaz). CDN'deki Muaykılî dosyasının Kompleks kaydı olduğu teyitsiz; Muhennâ ayet ayet yok.
- DOĞRULANAMADI: qurancomplex.gov.sa yenilendi (deneme yayını, "Sesli tilavetler — yakında"); eski izin sayfası 404,
  audio.qurancomplex.gov.sa kapalı. Kompleks'in "uygulama/yayın/web sitelerinde ücretsiz genel kullanım" ifadesi yalnız
  arama sonucu özetinde görüldü. Kesinlik için info@qurancomplex.gov.sa'ya yazılabilir.
- Eski kayıtlı tercihler `REC_OLD` ile yeni kimliklere çevrilir.

## Alınan kararlar
- Tefsir yok; Moğolca tefsir bulunmadığı için bilerek atlandı.
- Meal sadece PDF'ten; Claude meal metni yazmaz/çevirmez. Başka meal yok.
- Arapça metin Medine mushafı (Kral Fahd Kompleksi, Hafs). Sayfa bölümleri de Medine mushafına göre.
- Fihrist ve Mukaddime metinleri Claude'un yazdığı içerik; Diyanet'in metinleri değil.

## Kalan işler (kullanıcı adımı / dış veri gerekenler)
- [ ] **Yayın izni**: Moğolca meal © Diyanet İşleri Başkanlığı — Dini Yayınlar GM, Yabancı Dil ve Lehçelerde Yayınlar Daire Bşk.
- [x] **Yayına alma**: GitHub Pages — https://anafartaa.github.io/ariun-kuran/ (Anafartaa/ariun-kuran, `main`'e push → otomatik yayın).
- [ ] `CONTACT_EMAIL` (src/content.js).
- [ ] **Türkiye mushafı sayfa düzeni**: kuran.diyanet.gov.tr verisi şifreli API'de (çözülmeyecek). Diyanet Bilgi İşlem / Dini Yayınlar'dan resmî olarak
      sayfa→ayet eşlemesi + mushaf fontu (ShaikhHamdullahMushaf) istenmeli; gelince `mushaf/pages` biçimine dönüştürülüp ikinci düzen olarak eklenir.
- [ ] Moğolca meal sesi, kelime takibi, Elifba sesleri: ses kaydı/zamanlama verisi yok.
- [ ] Kütüphane, Aşr-ı Şerif, Mukabele videoları: içerik Diyanet'e ait.
- [ ] Tefsir: bilerek yok.

## Yapı
- `src/template.html`, `src/style.css`: HTML ve stiller
- `src/app.js`: uygulama mantığı (veriyi `data/*.json`'dan yükler; önizlemede `window.__INLINE__`)
- `src/content.js`: Fihrist, Elifba, Mukaddime, künye, hafızlar, klavye, `CONTACT_EMAIL`
- `src/sw.js`: service worker
- `data/quran.json` (t,c,r,p,j,sj,an,o=nüzul,en=İng. adlar), `data/meals.json` (arr, bism, merged)
- `mushaf/fonts/` (604 QCF sayfa fontu + QCF_BSML), `mushaf/pages/NNN.json` (satır → [ayet indeksi, glif])
- `build.py` → `site/` + `preview/index.html`
