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

## v7: Elifba ve masaüstü taraması (11.11.2026)
- Elifba harf tablosu: harf `.lg .gl` kendi yüksekliğinde (kuyruklu ج ح خ ع غ م ي ada binmiyor; mürekkep ölçümü ≥5,5px boşluk).
- Metin içi Arapça (`arIn`, `.arin`): ders açıklamalarındaki Arapça örnekler Kur'an fontuyla (önce noktalı daireye düşüyordu).
- Vakf işaretleri NBSP üstünde (`.sgn .s .mk`), tatvil/noktalı daire yok.
- Ayet kartları (`.res`, `.votd`): Arapça satır aralığı 2.3 + meal ile arasında boşluk/çizgi.
- Liste kartları (`.sc .mt2`): sayfa bilgisi her zaman ikinci satırda. Bozuk kayıtlı `sv` verisi sayfayı çökertmez.
- Tarama araçları: Elifba 33 dersin hepsi telefon + 1366 masaüstünde; diğer görünümler 1366 ve 1920'de.

## v8: Elifba yeniden (11.11.2026) — Diyanet'in Elifba yapısı örnek alındı, içeriği kopyalanmadı
- Kod: `src/elifba.js` (build.py `/*@ELIFBA@*/` işaretine app.js içine ekler). Metinler: `content.js` → `ELF_T`; dersler `ELIFBA[].x` anahtarıyla.
- Müfredat: bölüm → ders → alt sayfa (`subsOf`): intro (ders girişi + adımlar + ✓), letters, names (Arapça harf adları), sounds (ince/kalın),
  shapes (başta/ortada/sonda), similar (benzer harfler), forms, vgrid, compare, kavrama, words, rletters, rwords, rw2, signs, ayat, surah:k.
- Sağda görüntüleyici (`viewerHTML`): büyük öğe, n/N, önceki/sonraki (Arapça sırası: sonraki solda), Sırayla göster (1,7 sn) /
  Sırayla oku (âyet sesi, `elfSync` ile işaret), slayt, Âyeti dinle, Kur'an'da aç. Telefonda öğeye dokununca pencere.
- Örnekler Kur'an metninden program ile (`vowelWords`, `ruleItems`): sık geçen kelimeler, her biri ilk geçtiği âyete bağlı; kural yeri kırmızı (`.hlr`).
  İhfâ/izhar/idğam/iklab/mim kuralları Medine imlasındaki işaretlere dayanır (sükûnsuz nûn/mîm, ۢ, ۡ). «الله» bitişik çizildiği için kelimenin tamamı boyanır.
- Harf/kelime ses kaydı YOK (lisanslı kaynak bulunmadı); görüntüleyici bunu açıkça yazar. İlerleme: LS `elf`, konum: LS `elfpos`.

## Geri hareketi (11.11.2026)
- `setHash` artık geçmişe kayıt ekler (`pushState`): ekran, fihrist konusu, Elifba ders/alt sayfa; okurken sayfa çevirme eklemez (replace).
- Pencere/alt menü/yan menü açılınca `ovOpened` bir kayıt ekler; geri hareketi önce onu kapatır. X ile kapatılınca `ovClosed` kaydı geri alır
  (aynı adımda başka ekrana geçilirse kayıt yeni ekranla değiştirilir). `popstate` durumu (`navState`) geri yükler.

## Takip kaydırması (11.11.2026)
- Ses çalarken kullanıcı kaydırırsa (`touchmove`/`wheel`/tuş) takip durur (`FPAUSE`); okunan âyet ekranda kalıyorsa sürer.
  Üstte «Okunan âyete dön» düğmesi (`#fback`) takibi yeniden açar. `resize` yalnız genişlik değişince yeniden çizer (adres çubuğu atlatmasın).

## GİZLİ MOD (11.11.2026 açıldı, 13.11.2026 kullanıcı isteğiyle kapatıldı: site yeniden yayında)
- Kökte `KAPALI` dosyası varken iş akışı siteyi `kapali/` (boş sayfa + önbellek temizleyen sw.js) ile değiştirir. Yeniden açmak: `KAPALI`'yı sil, push.
- Depo GitHub'da herkese açıktı (meals.json dahil); gizli yapmak kullanıcının adımı (Settings → Change visibility → Private).

## v9: Kazakça ve Kırgızca meal (13.11.2026)
- Kaynak: kullanıcının verdiği Diyanet PDF'leri — Kazakça (Ankara 2015, ISBN 978-975-19-6377-2), Kırgızca (İstanbul 2016, ISBN 978-975-19-6631-5).
  PDF'ler depoya konmaz. Veri: `data/meal-kk.json`, `data/meal-ky.json` ({arr, bism, merged, miss, notes, kunye}); seçilince yüklenir (`loadMeal`).
  Künye ve etiketler `content.js` → `EXTRA_MEALS`. Ayarlarda «Meal» seçici (`#mealSel`, `S.meal`).
- Birleşik/eksik/dipnot her meale ayrı (`m.mg`, `m.miss`, `m.notes`; eski global `MERGED` kaldırıldı). Kırgızca 4590 dipnot ayet altında `details.fnd`.
- Ayrıştırma (scratchpad betikleri, depoda değil): PyMuPDF; metin 8.4–9.6 pt, ayet no satır başı + sekme, dipnot işareti <6.2 pt (ayıklanır),
  heceleme tiresi: kelime başka yerde satır ortasında tireli geçmiyorsa birleştirilir.
- Kazakça PDF dizgi hataları (metin eklenmedi): 12:23 ve 54:6 iki kez basılmış (ikincisi atıldı); 21:23 "22." basılmış; 21:58 "558." basılmış;
  7:199 numarası cümle içinde; 96:3, 106:3, 108:3 "З."; 5:28 ve 26:144 numarası yok (metni önceki ayette, birleşik gösterilir);
  **77:15 basılı mealde yok** (`miss`, «basılı mealde yok» yazar). PDF'te 69 birlikte çevrilmiş ayet grubu (N-M. / N-M-K.).

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
