(async function(){
'use strict';
const INL=window.__INLINE__||null;
async function getJSON(name){if(INL&&INL[name]!==undefined)return INL[name];const r=await fetch('data/'+name+'.json');if(!r.ok)throw new Error(name);return r.json()}
const D=await getJSON('quran');
const N=D.t.length, C=D.c, P=D.p, J=D.j, ORD=D.o||[];
const START=[];{let s=0;for(const c of C){START.push(s);s+=c}}
const SUR=new Uint8Array(N);for(let s=0;s<114;s++)for(let a=0;a<C[s];a++)SUR[START[s]+a]=s;
const PFIRST=new Array(606).fill(-1);for(let i=N-1;i>=0;i--)PFIRST[P[i]]=i;PFIRST[605]=N;
const JFIRST=new Array(31).fill(-1);for(let i=N-1;i>=0;i--)JFIRST[J[i]]=i;
const BISM=D.t[0];
const sa=i=>[SUR[i]+1,i-START[SUR[i]]+1];
const gi=(s,a)=>START[s-1]+a-1;
const arD=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
const TOK=i=>D.t[i].split(' ').filter(x=>x&&!/^[ۖ-ۭ‏]+$/.test(x));
const pad3=n=>String(n).padStart(3,'0');
const M=(...a)=>a.filter(x=>x!==''&&x!=null).map(x=>`<span>${x}</span>`).join('');

/* ---------- i18n ---------- */
const NM={mn:"Фатиха|Бакара|Али Имран|Ниса|Майда|Ангам|Аграф|Анфал|Тауба|Юнус|Худ|Юсуф|Рагыд|Ибрахим|Хижр|Нахыл|Исра|Кахф|Мариям|Таха|Анбия|Хаж|Мүминун|Нур|Фуркан|Шугара|Намил|Касас|Ганкабут|Рум|Лукман|Саждэ|Ахзаб|Саба|Фатыр|Ясин|Саффат|Сад|Зүмар|Мүмин|Фуссилат|Шура|Зүхруф|Духан|Жасия|Ахкаф|Мухаммед|Фатх|Хужурат|Каф|Зариат|Тур|Нажим|Камар|Рахман|Уакига|Хадид|Мүжадала|Хашыр|Мүмтахина|Саф|Жума|Мүнафикун|Тагабун|Талак|Тахрим|Мүлк|Калам|Хакка|Магариж|Нух|Жин|Мүззаммил|Мүддассир|Киямет|Инсан|Мүрсалат|Наба|Назигат|Габаса|Такуир|Инфитар|Мутаффифин|Иншикак|Буруж|Тарик|Агла|Гашия|Фажир|Балад|Шамис|Лайл|Духа (Зуха)|Инширах|Тин|Галак|Кадр|Байина|Зилзал|Гадият|Карига|Такасүр|Гасыр|Хүмаза|Фил|Курайш|Магун|Каусар|Кафирун|Насыр|Таббат|Ыхлас|Фалак|Нас".split('|'),
tr:"Fâtiha|Bakara|Âl-i İmrân|Nisâ|Mâide|En'âm|A'râf|Enfâl|Tevbe|Yûnus|Hûd|Yûsuf|Ra'd|İbrâhîm|Hicr|Nahl|İsrâ|Kehf|Meryem|Tâ-Hâ|Enbiyâ|Hac|Mü'minûn|Nûr|Furkân|Şuarâ|Neml|Kasas|Ankebût|Rûm|Lokmân|Secde|Ahzâb|Sebe'|Fâtır|Yâsîn|Sâffât|Sâd|Zümer|Mü'min|Fussilet|Şûrâ|Zuhruf|Duhân|Câsiye|Ahkâf|Muhammed|Fetih|Hucurât|Kâf|Zâriyât|Tûr|Necm|Kamer|Rahmân|Vâkıa|Hadîd|Mücâdele|Haşr|Mümtehine|Saf|Cuma|Münâfikûn|Teğâbün|Talâk|Tahrîm|Mülk|Kalem|Hâkka|Meâric|Nûh|Cin|Müzzemmil|Müddessir|Kıyâme|İnsân|Mürselât|Nebe'|Nâziât|Abese|Tekvîr|İnfitâr|Mutaffifîn|İnşikâk|Bürûc|Târık|A'lâ|Gâşiye|Fecr|Beled|Şems|Leyl|Duhâ|İnşirâh|Tîn|Alak|Kadir|Beyyine|Zilzâl|Âdiyât|Kâria|Tekâsür|Asr|Hümeze|Fîl|Kureyş|Mâûn|Kevser|Kâfirûn|Nasr|Tebbet|İhlâs|Felak|Nâs".split('|'),
en:D.en||[]};
NM.kk=I18X.kk.sn;NM.ky=I18X.ky.sn;
const T={
mn:{qcfL:"Хэвлэмэл Мадина мусхафын хуудас (15 мөр)",app:"Ариун Куран",home:"Нүүр",read:"Унших",search:"Хайлт",surahs:"Сурегийн жагсаалт",juzs:"Жузууд",saved:"Хадгалсан",notes:"Тэмдэглэл",help:"Тусламж",settings:"Тохиргоо",
elifba:"Элифба",dict:"Кураны толь",topics:"Сэдвийн жагсаалт",intro:"Удиртгал",
page:"Хуудас",juz:"Жуз",ayah:"Айлдвар",surah:"Суре",ayahs:"айлдвар",quran:"Куран",both:"Хамт",meal:"Орчуулга",cmp:"Харьцуулах",
bm:"Уншсан газраа тэмдэглэх",bmSet:"Тэмдэг тавигдлаа",cont:"Үргэлжлүүлэн унших",bmGo:"Тэмдэг рүү очих",hatim:"Хатм",hatimP:"хуудас уншсан",
markRead:"Уншсан гэж тэмдэглэх",isRead:"Уншсан",copy:"Хуулах",copied:"Хуулагдлаа",copyT:"Хуулах сонголт",scopeSel:"Сонгосон айлдвар",scopePage:"Энэ хуудас",cAr:"Араб эх",cMeal:"Орчуулга",cBoth:"Хоёулаа",cTab:"Хүснэгт",
save:"Хадгалах",unsave:"Хасах",note:"Тэмдэглэл",bmHere:"Энд тэмдэглэх",close:"Хаах",cancel:"Болих",del:"Устгах",ok:"Хадгалах",go:"Очих",
noMeal:"Орчуулга хараахан ороогүй байна.",imp:"Орчуулга оруулах",impT:"Орчуулга файлаас оруулах",impH:"Текст (.txt) эсвэл JSON файл. Мөр бүр нэг айлдвар: «суре|айлдвар|текст» хэлбэртэй, эсвэл дараалсан 6236 мөр.",impOk:"Орчуулга орлоо",impErr:"Файлыг таньж чадсангүй",choose:"Файл сонгох",paste:"Эсвэл энд буулгана уу",mName:"Орчуулгын нэр",mLang:"Хэл",meals:"Орчуулгууд",active:"Идэвхтэй",other:"Бусад",
theme:"Загвар",light:"Цайвар",dark:"Бараан",sepia:"Сепиа",classic:"Сонгодог",afs:"Кураны үсэг",alh:"Мөрийн зай",afont:"Кураны фонт",mfs:"Орчуулгын үсэг",reset:"Анхны тохиргоо",dblp:"Хос хуудас (том дэлгэц)",flip:"Хуудас эргүүлэх эффект",on:"Асаах",off:"Унтраах",
mecca:"Мекке",medina:"Мадина",all:"Бүгд",filter:"Суре хайх…",searchPh:"Суре, айлдвар (2:255), араб эсвэл орчуулгын үг…",results:"илэрц",noRes:"Илэрц олдсонгүй",minCh:"Дор хаяж 2 тэмдэгт бичнэ үү",
emSaved:"Энд хадгалсан зүйл алга.",emNotes:"Тэмдэглэл алга. Айлдвар дээр дараад «Тэмдэглэл»-ийг сонгоно уу.",
quick:"Түгээмэл суре",votd:"Өдрийн айлдвар",starts:"Эхлэл",fs:"Бүтэн дэлгэц",lang:"Хэл",welcome:"Кураныг хуудсаар, айлдвараар уншиж, сонсож, хайж, тэмдэглэ.",
notePh:"Энэ айлдварын талаар тэмдэглэл бичнэ үү…",of:"/",
multi:"Олон айлдвар сонгох",nsel:"сонгосон",selHint:"Айлдваруудыг дарж сонгоно уу",
backup:"Нөөцлөх / сэргээх",backupH:"Тэмдэглэл, хадгалсан зүйл, тэмдэг, хатмын явцыг файл болгон татаж авах эсвэл текстээр хуулж болно. Өөр төхөөрөмж дээр файлаа оруулах эсвэл текстээ буулгаад «Сэргээх» дарна.",restore:"Сэргээх",restored:"Сэргээгдлээ",dlFile:"Нөөц файл татах",upFile:"Нөөц файл оруулах",dlNote:"Татаж авах ажиллахгүй бол «Хуулах»-ыг ашиглана уу.",
kb:"Гар",words:"Үгээр",root:"Язгуур",lemma:"Үгийн үндэс",occ:"удаа",noRoot:"Язгуургүй",dictH:"Куран дахь үгсийг язгуур (үндэс)-аар нь хайж, хаана хэдэн удаа орсныг харна. Утгын тайлбар одоогоор байхгүй.",dictPh:"Язгуур эсвэл үг (араб)…",
pos:{n:"нэр үг",v:"үйл үг",p:"сул үг",k:"оноосон нэр"},more:"Цааш нь",back:"Буцах",
lessons:"Хичээлүүд",slide:"Слайд",prev:"Өмнөх",next:"Дараах",iso:"Ганцаар",ini:"Эхэнд",med:"Дунд",fin:"Төгсгөлд",
src:"Эх сурвалж",loading:"Ачаалж байна…",
plMin:"Жижигрүүлэх",plMax:"Томруулах",capT:"Орчуулгыг доор харуулах",backToCur:"Уншиж буй айлдвар руу",notPrinted:"Энэ айлдварын орчуулга хэвлэлд байхгүй",fnotes:"Тайлбар",mealErr:"Орчуулгыг ачаалж чадсангүй",play:"Сонсох",pause:"Зогсоох",listenSurah:"Бисмиллахтай эхнээс нь сонсох",reciter:"Уншигч",speed:"Хурд",repAyah:"Айлдвар давтах",repRange:"Хүрээ давтах",none:"Үгүй",inf:"Тасралтгүй",rangeT:"Хүрээ",rgPage:"Хуудас дуустал",rgSurah:"Суре дуустал",rgAll:"Тасралтгүй",follow:"Дагаж гүйлгэх",audioErr:"Аудио тоглуулж чадсангүй. Интернэт холболтоо шалгана уу (claude.ai урьдчилсан харагдацад аудио ажиллахгүй).",
plist:"Сонсох жагсаалт",plMake:"Жагсаалт үүсгэх",plFav:"Хадгалсан жагсаалтууд",plName:"Жагсаалтын нэр",plFrom:"Эхлэх",plTo:"Дуусах",plEmpty:"Юу ч сонгоогүй байна",plAyR:"Айлдварын хүрээ",
saveT:"Хадгалах",svPage:"Энэ хуудсыг хадгалах",svAyah:"Сонгосон айлдварыг хадгалах",svSurah:"Энэ сурег хадгалах",svJuz:"Энэ жузыг хадгалах",svDone:"Хадгалагдлаа",tPages:"Хуудас",tAyahs:"Айлдвар",tSurahs:"Суре",tJuzs:"Жуз",
exWord:"Word файл",exExcel:"Excel (CSV) файл",share:"Хуваалцах",shared:"Холбоос хуулагдлаа",
wipe:"Бүх өгөгдлийг устгах",wipeQ:"Энэ төхөөрөмж дээрх тэмдэглэл, хадгалсан зүйл, тэмдэг, хатмын явц, оруулсан орчуулга, тохиргоо бүгд устана. Буцаах боломжгүй.",wipeDone:"Устгагдлаа",
tAll:"Бүгд",tAr:"Араб",tMeal:"Орчуулга",tSur:"Суре",adv:"Нарийвчилсан хайлт",whole:"Бүтэн үгээр",mic:"Дуугаар хайх",micNo:"Энэ хөтөч дуугаар хайхыг дэмждэггүй",listening:"Сонсож байна…",
sort:"Эрэмбэ",soMushaf:"Мусхафын дараалал",soRev:"Буусан дараалал",soName:"Нэрээр",soAr:"Араб нэрээр",soAy:"Айлдварын тоогоор",soPg:"Хуудасны тоогоор",revOrd:"буусан дараалал",pages:"хуудас",
sentAt:"-д илгээгдсэн.",install:"Утсанд апп болгон суулгах",installIOS:"iPhone дээр: Safari-ийн «Хуваалцах» товч → «Нүүр дэлгэцэнд нэмэх».",
about:"Сайтын тухай",aboutTx:"«Ариун Куран» нь Кураны араб эх, монгол утга агуулгыг уншиж, сонсож, судлах зорилготой үнэгүй вэб сайт юм. Утас, таблет, компьютер дээр адилхан ажиллана.",usage:"Хэрэглээ",faq:"Түгээмэл асуулт",readers:"Уншигчид",contact:"Санал хүсэлт",contactNone:"Санал хүсэлтийн хаяг удахгүй нэмэгдэнэ.",shortcuts:"Гарын товчлол",
srcList:["Араб эх: Хафс уншлагын Усмани бичвэр (Фахд хааны Куран хэвлэх цогцолбор; fawazahmed0/quran-api).","Монгол утга агуулга: Түрк Улсын Шашны Хэрэг Эрхлэх Газар, Анкара, 2020.","Казах ба киргиз орчуулга: Түрк Улсын Шашны Хэрэг Эрхлэх Газар (Анкара 2015; Истанбул 2016).","Мусхафын хуудас: Фахд хааны цогцолборын QCF фонт, хуудасны бүтэц: zonetecde/mushaf-layout.","Суре буусан дараалал: quran-meta (MIT).","Аудио: Islamic Network CDN (alquran.cloud) — уншигчид буюу өв залгамжлагчдаас ашгийн бус, үнэгүй түгээх зөвшөөрөлтэй бичлэгүүд. Хузайфи, Аюуб, Ахдар: Фахд хааны Куран хэвлэх цогцолборын уншигчид."],
faqL:[["Тэмдэглэл маань хаана хадгалагдах вэ?","Зөвхөн энэ төхөөрөмжийн хөтөч дээр. Өөр төхөөрөмж рүү шилжүүлэхийн тулд «Нөөцлөх» хэсгээс файл татаж аваад нөгөө төхөөрөмж дээрээ оруулна."],["Интернэтгүй ашиглаж болох уу?","Сайтыг нэг удаа бүрэн нээсний дараа араб эх, орчуулга интернэтгүй ажиллана. Аудио сонсоход интернэт хэрэгтэй."],["Сонсох функцийг хэрхэн ашиглах вэ?","Доод мөрний ▶ товч эсвэл айлдвар дээр дараад «Сонсох». Уншигч, хурд, давталтыг тоглуулагчаас сонгоно."],["Зарим айлдварт «хамт орчуулагдсан» гэж яагаад бичсэн бэ?","Хэвлэмэл орчуулгад тэр хоёр айлдварыг нэг өгүүлбэрээр орчуулсан тул текст нь өмнөх айлдварт байгаа."],["Хуудасны дугаар яагаад миний мусхафтай таарахгүй байна?","Энэ сайт Мадина мусхафын 604 хуудасны хуваалтыг ашигладаг."]],
helpTx:["Айлдвар дээр дарж сонсох, хуулах, хадгалах, хуваалцах, тэмдэглэл бичих цэсийг нээнэ.","Компьютер дээр айлдвар дээр давхар дарвал тэндээс уншиж эхэлнэ.","Ctrl (⌘) дарж байгаад олон айлдвар, Shift дарж байгаад хүрээг сонгоно. Утсан дээр «Олон айлдвар сонгох»-ыг ашиглана.","Утсан дээр хуудсыг баруун тийш шудрахад дараагийн хуудас, зүүн тийш өмнөх хуудас нээгдэнэ.","Хуудас бүрийг «Уншсан» гэж тэмдэглэн хатмын явцаа хянана."],
keys:[["← / →","Дараагийн / өмнөх хуудас"],["Space","Сонсох / зогсоох"],["/","Хайлт"],["Esc","Цонх хаах"]]},
tr:{qcfL:"Basılı Medine mushafı sayfası (15 satır)",app:"Kur'ân-ı Kerîm",home:"Anasayfa",read:"Oku",search:"Arama",surahs:"Sureler",juzs:"Cüzler",saved:"Kaydedilenler",notes:"Notlar",help:"Yardım",settings:"Ayarlar",
elifba:"Elifba",dict:"Kur'an Sözlüğü",topics:"Fihrist",intro:"Mukaddime",
page:"Sayfa",juz:"Cüz",ayah:"Ayet",surah:"Sure",ayahs:"ayet",quran:"Kur'an",both:"Birlikte",meal:"Meal",cmp:"Karşılaştır",
bm:"Ayraç koy (kaldığın yeri işaretle)",bmSet:"Ayraç konuldu",cont:"Okumaya devam et",bmGo:"Ayraca git",hatim:"Hatim",hatimP:"sayfa okundu",
markRead:"Okundu olarak işaretle",isRead:"Okundu",copy:"Kopyala",copied:"Kopyalandı",copyT:"Kopyalama seçenekleri",scopeSel:"Seçili ayet",scopePage:"Bu sayfa",cAr:"Arapça",cMeal:"Meal",cBoth:"İkisi",cTab:"Tablo",
save:"Kaydet",unsave:"Çıkar",note:"Not",bmHere:"Ayraç koy",close:"Kapat",cancel:"Vazgeç",del:"Sil",ok:"Kaydet",go:"Git",
noMeal:"Meal henüz yüklenmedi.",imp:"Meal yükle",impT:"Dosyadan meal yükle",impH:"Metin (.txt) veya JSON dosyası. Her satır bir ayet: «sure|ayet|metin» ya da sıralı 6236 satır.",impOk:"Meal yüklendi",impErr:"Dosya tanınamadı",choose:"Dosya seç",paste:"Ya da buraya yapıştırın",mName:"Meal adı",mLang:"Dil",meals:"Mealler",active:"Etkin",other:"Diğer",
theme:"Tema",light:"Aydınlık",dark:"Karanlık",sepia:"Sepya",classic:"Klasik",afs:"Kur'an yazı boyutu",alh:"Satır aralığı",afont:"Kur'an fontu",mfs:"Meal yazı boyutu",reset:"Sıfırla",dblp:"Çift sayfa (geniş ekran)",flip:"Sayfa çevirme efekti",on:"Açık",off:"Kapalı",
mecca:"Mekke",medina:"Medine",all:"Tümü",filter:"Sure ara…",searchPh:"Sure, ayet (2:255), Arapça veya meal kelimesi…",results:"sonuç",noRes:"Sonuç bulunamadı",minCh:"En az 2 karakter yazın",
emSaved:"Burada kayıt yok.",emNotes:"Not yok. Bir ayete dokunup «Not»u seçin.",
quick:"Sık okunan sureler",votd:"Günün ayeti",starts:"Başlangıç",fs:"Tam ekran",lang:"Dil",welcome:"Kur'an'ı sayfa sayfa, ayet ayet oku, dinle, ara ve not al.",
notePh:"Bu ayetle ilgili notunuzu yazın…",of:"/",
multi:"Birden çok ayet seç",nsel:"seçili",selHint:"Ayetlere dokunarak seçin",
backup:"Yedekle / geri yükle",backupH:"Notları, kaydedilenleri, ayracı ve hatim ilerlemesini dosya olarak indirin ya da metin olarak kopyalayın. Diğer cihazda dosyayı yükleyin veya metni yapıştırıp «Geri yükle»ye basın.",restore:"Geri yükle",restored:"Geri yüklendi",dlFile:"Yedek dosyasını indir",upFile:"Yedek dosyası yükle",dlNote:"İndirme başlamazsa «Kopyala»yı kullanın.",
kb:"Klavye",words:"Kelime kelime",root:"Kök",lemma:"Kelime kökü (lemma)",occ:"kez",noRoot:"Köksüz",dictH:"Kur'an'daki kelimeleri kökleriyle arayın, nerede ve kaç kez geçtiğini görün. Anlam açıklaması şimdilik yok.",dictPh:"Kök veya kelime (Arapça)…",
pos:{n:"isim",v:"fiil",p:"harf",k:"özel isim"},more:"Devamı",back:"Geri",
lessons:"Dersler",slide:"Slayt",prev:"Önceki",next:"Sonraki",iso:"Tek",ini:"Başta",med:"Ortada",fin:"Sonda",
src:"Kaynaklar",loading:"Yükleniyor…",
plMin:"Küçült",plMax:"Büyüt",capT:"Meali altta göster",backToCur:"Okunan âyete dön",notPrinted:"Bu âyetin çevirisi basılı mealde yok",fnotes:"Açıklama",mealErr:"Meal yüklenemedi",play:"Dinle",pause:"Durdur",listenSurah:"Sureyi besmeleyle baştan dinle",reciter:"Kari",speed:"Hız",repAyah:"Ayet tekrarı",repRange:"Aralık tekrarı",none:"Yok",inf:"Sürekli",rangeT:"Aralık",rgPage:"Sayfa sonuna kadar",rgSurah:"Sure sonuna kadar",rgAll:"Kesintisiz",follow:"Takip et",audioErr:"Ses çalınamadı. İnternet bağlantınızı kontrol edin (claude.ai önizlemesinde ses çalışmaz).",
plist:"Dinleme listesi",plMake:"Liste oluştur",plFav:"Favori listeler",plName:"Liste adı",plFrom:"Başlangıç",plTo:"Bitiş",plEmpty:"Hiçbir şey seçilmedi",plAyR:"Ayet aralığı",
saveT:"Kaydet",svPage:"Mevcut sayfayı kaydet",svAyah:"Seçili ayeti kaydet",svSurah:"Mevcut sureyi kaydet",svJuz:"Mevcut cüzü kaydet",svDone:"Kaydedildi",tPages:"Sayfalar",tAyahs:"Ayetler",tSurahs:"Sureler",tJuzs:"Cüzler",
exWord:"Word dosyası",exExcel:"Excel (CSV) dosyası",share:"Paylaş",shared:"Bağlantı kopyalandı",
wipe:"Tüm verileri sil",wipeQ:"Bu cihazdaki notlar, kaydedilenler, ayraç, hatim ilerlemesi, yüklenen mealler ve ayarlar silinecek. Geri alınamaz.",wipeDone:"Silindi",
tAll:"Tümü",tAr:"Arapça",tMeal:"Meal",tSur:"Sure",adv:"Detaylı arama",whole:"Tam kelime",mic:"Sesli ara",micNo:"Bu tarayıcı sesli aramayı desteklemiyor",listening:"Dinleniyor…",
sort:"Sıralama",soMushaf:"Mushaf sırası",soRev:"İniş sırası",soName:"Ada göre",soAr:"Arapça ada göre",soAy:"Ayet sayısına göre",soPg:"Sayfa sayısına göre",revOrd:"iniş sırası",pages:"sayfa",
sentAt:"'de inmiştir.",install:"Telefona uygulama olarak kur",installIOS:"iPhone'da: Safari'de «Paylaş» → «Ana Ekrana Ekle».",
about:"Site hakkında",aboutTx:"«Ariun Kuran», Kur'an'ın Arapça metnini ve Moğolca mealini okumak, dinlemek ve incelemek için ücretsiz bir web sitesidir. Telefon, tablet ve bilgisayarda aynı şekilde çalışır.",usage:"Kullanım",faq:"Sıkça sorulan sorular",readers:"Seslendirenler",contact:"İstek ve öneriler",contactNone:"İletişim adresi yakında eklenecek.",shortcuts:"Klavye kısayolları",
srcList:["Arapça metin: Hafs rivayeti Osmanî hat (Kral Fahd Kur'an Kompleksi; fawazahmed0/quran-api).","Moğolca meal: Diyanet İşleri Başkanlığı, Ankara, 2020.","Kazakça ve Kırgızca meal: Diyanet İşleri Başkanlığı (Ankara 2015; İstanbul 2016).","Mushaf sayfası: Kral Fahd Kompleksi QCF fontları, sayfa düzeni: zonetecde/mushaf-layout.","Sure iniş sırası: quran-meta (MIT).","Ses: Islamic Network CDN (alquran.cloud) — hafızlar veya vârislerince ücretsiz, ticari olmayan dağıtım için lisanslı kayıtlar. Huzeyfî, Eyyûb, Ahdar: Kral Fahd Kur'an Kompleksi'nin tilavet listesindeki hafızlar."],
faqL:[["Notlarım nerede saklanıyor?","Yalnızca bu cihazın tarayıcısında. Başka cihaza taşımak için «Yedekle» bölümünden dosyayı indirip diğer cihazda yükleyin."],["İnternetsiz kullanılabilir mi?","Site bir kez tamamen açıldıktan sonra Arapça metin ve meal internetsiz çalışır. Dinlemek için internet gerekir."],["Dinleme nasıl kullanılır?","Alt çubuktaki ▶ düğmesine basın ya da bir ayete dokunup «Dinle»yi seçin. Kari, hız ve tekrarı oynatıcıdan seçin."],["Bazı ayetlerde neden «birlikte çevrildi» yazıyor?","Basılı mealde bu iki ayet tek cümleyle çevrildiği için metin önceki ayettedir."],["Sayfa numaraları neden mushafımla uyuşmuyor?","Bu site Medine mushafının 604 sayfalık düzenini kullanır."]],
helpTx:["Bir ayete dokunarak dinleme, kopyalama, kaydetme, paylaşma ve not menüsünü açın.","Bilgisayarda bir ayete çift tıklayınca okuma oradan başlar.","Ctrl (⌘) ile birden çok ayet, Shift ile aralık seçin. Telefonda «Birden çok ayet seç»i kullanın.","Telefonda sağa kaydırınca sonraki, sola kaydırınca önceki sayfa açılır.","Her sayfayı «Okundu» işaretleyerek hatim ilerlemenizi takip edin."],
keys:[["← / →","Sonraki / önceki sayfa"],["Boşluk","Dinle / durdur"],["/","Arama"],["Esc","Pencereyi kapat"]]},
en:{qcfL:"Printed Madinah mushaf page (15 lines)",app:"The Holy Qur'an",home:"Home",read:"Read",search:"Search",surahs:"Surahs",juzs:"Juz",saved:"Saved",notes:"Notes",help:"Help",settings:"Settings",
elifba:"Alphabet",dict:"Qur'an dictionary",topics:"Topic index",intro:"Introduction",
page:"Page",juz:"Juz",ayah:"Verse",surah:"Surah",ayahs:"verses",quran:"Qur'an",both:"Both",meal:"Translation",cmp:"Compare",
bm:"Bookmark this place",bmSet:"Bookmark set",cont:"Continue reading",bmGo:"Go to bookmark",hatim:"Khatm",hatimP:"pages read",
markRead:"Mark as read",isRead:"Read",copy:"Copy",copied:"Copied",copyT:"Copy options",scopeSel:"Selected verse",scopePage:"This page",cAr:"Arabic",cMeal:"Translation",cBoth:"Both",cTab:"Table",
save:"Save",unsave:"Remove",note:"Note",bmHere:"Bookmark",close:"Close",cancel:"Cancel",del:"Delete",ok:"Save",go:"Go",
noMeal:"No translation loaded yet.",imp:"Load translation",impT:"Load translation from file",impH:"Text (.txt) or JSON. One verse per line: «surah|verse|text», or 6236 lines in order.",impOk:"Translation loaded",impErr:"File not recognised",choose:"Choose file",paste:"Or paste here",mName:"Translation name",mLang:"Language",meals:"Translations",active:"Active",other:"Other",
theme:"Theme",light:"Light",dark:"Dark",sepia:"Sepia",classic:"Classic",afs:"Arabic text size",alh:"Line spacing",afont:"Arabic font",mfs:"Translation text size",reset:"Reset",dblp:"Double page (wide screens)",flip:"Page turn effect",on:"On",off:"Off",
mecca:"Meccan",medina:"Medinan",all:"All",filter:"Find surah…",searchPh:"Surah, verse (2:255), Arabic or translation word…",results:"results",noRes:"No results",minCh:"Type at least 2 characters",
emSaved:"Nothing saved here.",emNotes:"No notes. Tap a verse and choose «Note».",
quick:"Popular surahs",votd:"Verse of the day",starts:"Starts",fs:"Full screen",lang:"Language",welcome:"Read, listen, search and take notes on the Qur'an — page by page, verse by verse.",
notePh:"Write a note about this verse…",of:"/",
multi:"Select verses",nsel:"selected",selHint:"Tap verses to select",
backup:"Backup / restore",backupH:"Download your notes, saved items, bookmark and progress as a file, or copy them as text. On another device upload the file or paste the text and press «Restore».",restore:"Restore",restored:"Restored",dlFile:"Download backup",upFile:"Upload backup",dlNote:"If the download doesn't start, use «Copy».",
kb:"Keyboard",words:"Word by word",root:"Root",lemma:"Lemma",occ:"times",noRoot:"No root",dictH:"Look up Qur'anic words by root and see where and how often they occur. Meanings are not included yet.",dictPh:"Root or word (Arabic)…",
pos:{n:"noun",v:"verb",p:"particle",k:"proper noun"},more:"More",back:"Back",
lessons:"Lessons",slide:"Slides",prev:"Previous",next:"Next",iso:"Isolated",ini:"Initial",med:"Medial",fin:"Final",
src:"Sources",loading:"Loading…",
plMin:"Minimize",plMax:"Expand",capT:"Show translation below",backToCur:"Back to current verse",notPrinted:"This verse is not translated in the printed edition",fnotes:"Notes",mealErr:"Could not load the translation",play:"Listen",pause:"Pause",listenSurah:"Listen from the start with basmala",reciter:"Reciter",speed:"Speed",repAyah:"Repeat verse",repRange:"Repeat range",none:"No",inf:"Endless",rangeT:"Range",rgPage:"To end of page",rgSurah:"To end of surah",rgAll:"Continuous",follow:"Follow",audioErr:"Audio could not be played. Check your connection (audio does not work in the claude.ai preview).",
plist:"Playlist",plMake:"Create list",plFav:"Saved lists",plName:"List name",plFrom:"From",plTo:"To",plEmpty:"Nothing selected",plAyR:"Verse range",
saveT:"Save",svPage:"Save this page",svAyah:"Save selected verse",svSurah:"Save this surah",svJuz:"Save this juz",svDone:"Saved",tPages:"Pages",tAyahs:"Verses",tSurahs:"Surahs",tJuzs:"Juz",
exWord:"Word file",exExcel:"Excel (CSV) file",share:"Share",shared:"Link copied",
wipe:"Delete all data",wipeQ:"All notes, saved items, bookmark, progress, loaded translations and settings on this device will be deleted. This cannot be undone.",wipeDone:"Deleted",
tAll:"All",tAr:"Arabic",tMeal:"Translation",tSur:"Surah",adv:"Advanced search",whole:"Whole word",mic:"Voice search",micNo:"This browser does not support voice search",listening:"Listening…",
sort:"Sort",soMushaf:"Mushaf order",soRev:"Revelation order",soName:"By name",soAr:"By Arabic name",soAy:"By verse count",soPg:"By page count",revOrd:"revelation order",pages:"pages",
sentAt:"",install:"Install as an app",installIOS:"On iPhone: Safari «Share» → «Add to Home Screen».",
about:"About",aboutTx:"«Ariun Kuran» is a free website for reading, listening to and studying the Arabic text of the Qur'an and its Mongolian translation. It works on phones, tablets and computers.",usage:"How to use",faq:"FAQ",readers:"Reciters",contact:"Feedback",contactNone:"A contact address will be added soon.",shortcuts:"Keyboard shortcuts",
srcList:["Arabic text: Hafs, Uthmani script (King Fahd Complex; fawazahmed0/quran-api).","Mongolian translation: Presidency of Religious Affairs of Türkiye, Ankara, 2020.","Kazakh and Kyrgyz translations: Presidency of Religious Affairs of Türkiye (Ankara 2015; Istanbul 2016).","Mushaf pages: King Fahd Complex QCF fonts, page layout: zonetecde/mushaf-layout.","Revelation order: quran-meta (MIT).","Audio: Islamic Network CDN (alquran.cloud) — recitations licensed by the reciters or their estates for free, non-commercial redistribution. Hudhaify, Ayyoub, Akhdar: reciters of the King Fahd Qur'an Complex."],
faqL:[["Where are my notes stored?","Only in this device's browser. To move them, download a backup file and upload it on the other device."],["Does it work offline?","After the site has fully loaded once, the Arabic text and translation work offline. Listening needs a connection."],["How do I listen?","Press ▶ in the bottom bar, or tap a verse and choose «Listen». Pick reciter, speed and repeat in the player."],["Why do some verses say «translated together»?","The printed translation renders those two verses in one sentence, so the text sits on the previous verse."],["Why don't page numbers match my mushaf?","This site uses the 604-page Madinah mushaf layout."]],
helpTx:["Tap a verse to listen, copy, save, share or add a note.","On a computer, double-click a verse to start reading from it.","Hold Ctrl (⌘) to pick several verses, Shift for a range. On phones use «Select verses».","On phones swipe right for the next page and left for the previous one.","Mark each page as read to track your khatm."],
keys:[["← / →","Next / previous page"],["Space","Play / pause"],["/","Search"],["Esc","Close dialogs"]]}
};
for(const l of ['kk','ky'])T[l]=Object.assign({},T.en,I18X[l].T);
['mn','tr','en','kk','ky'].forEach(l=>{T[l].sentAt=T[l].sentAt??''});

/* ---------- storage ---------- */
const LS={get(k,d){try{const v=localStorage.getItem('qk_'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem('qk_'+k,JSON.stringify(v))}catch(e){}}};
const FONTS_OK=['qcf','amiri','sch','amiri2'];
const DEF={qcf:true,theme:'light',fs:100,lh:2.3,font:'qcf',mfs:16,view:'quran',lang:'mn',meal:'',dbl:false,flip:true,rec:'ar.hudhaify',rate:1,repA:1,repR:1,range:'all',follow:true,plMin:false,cap:true};
let S=Object.assign({},DEF,LS.get('set',{}));if(S.view==='cmp')S.view='both';if(!FONTS_OK.includes(S.font))S.font='qcf';
/* v6 tek seferlik: mushaf hattı ve tek sayfa yeni varsayılan */if((S.setV|0)<2){S.font='qcf';S.dbl=false;S.setV=2}
let SV=LS.get('sv',null);if(!SV){SV={p:[],a:LS.get('saved',[]),s:[],j:[]}}
/* bozuk/eski kayıtlar sayfayı çökertmesin */for(const k of ['p','a','s','j'])if(!Array.isArray(SV[k]))SV[k]=[];
let NOTES=LS.get('notes',{}), BM=LS.get('bm',null), LAST=LS.get('last',1), PLS=LS.get('pls',[]);
let READ=LS.get('read','');
const saveSV=()=>LS.set('sv',SV);
const isRead=p=>READ.charAt(p)==='1';
function setRead(p,v){let a=READ.padEnd(605,'0').split('');a[p]=v?'1':'0';READ=a.join('');LS.set('read',READ);updHatim()}
const t=k=>(T[S.lang]||T.mn)[k]??T.mn[k]??k;
const sn=s=>((NM[S.lang]&&NM[S.lang][s-1])||NM.mn[s-1]);
const L=o=>o?(o[S.lang]||o.mn||o.tr||''):'';
/* yalnız Kur'an imlasını (Tanzil Osmanî: ۡ ۢ ۥ ۦ ٰ ٓ) doğru dizen fontlar; Noto Naskh iklab mimini üstünle birleştirdiği için çıkarıldı */
const FONTS={qcf:"'Amiri Quran','Scheherazade New',serif",amiri:"'Amiri Quran','Scheherazade New',serif",sch:"'Scheherazade New',serif",amiri2:"'Amiri',serif"};
const FONTN={qcf:'Mushaf (KFGQPC)',amiri:'Amiri Quran',sch:'Scheherazade New',amiri2:'Amiri'};

/* ---------- meals ---------- */
let MEALS=[];const MLOAD={};
function addMeal(m,src){const mg={};for(const g of (m.merged||[]))for(let x=g[1]+1;x<=g[2];x++)mg[gi(g[0],x)]=[g[0],g[1],g[2]];
  const o={id:m.id,name:m.name,lang:m.lang||'mn',arr:m.arr,bism:m.bism||'',src,mg,miss:new Set(m.miss||[]),notes:m.notes||{}};MEALS.push(o);return o}
function loadMeal(id){const x=EXTRA_MEALS.find(e=>e.id===id);if(!x||MLOAD[id]||MEALS.some(m=>m.id===id))return;
  MLOAD[id]=getJSON('meal-'+id).then(m=>{if(m&&Array.isArray(m.arr)&&m.arr.length===N){addMeal(m,'emb');IML[id]=null}}).catch(()=>{toast(t('mealErr'))}).then(()=>{delete MLOAD[id];rerenderMeal()})}
function rerenderMeal(){if(VIEW==='read')renderPage();else if(VIEW==='home'||VIEW==='search')show(VIEW);renderCap()}
const mealChoices=()=>[['mn',(MEALS.find(m=>m.id==='mn')||{name:'Монгол'}).name]].concat(EXTRA_MEALS.map(x=>[x.id,L(x.label)===x.name?x.name:L(x.label)+' — '+x.name]));
const curMealId=()=>{const id=S.meal||(EXTRA_MEALS.some(e=>e.id===S.lang)?S.lang:'');return MEALS.some(m=>m.id===id)||EXTRA_MEALS.some(e=>e.id===id)?id:'mn'};
const curMeal=()=>{const id=S.meal||(EXTRA_MEALS.some(e=>e.id===S.lang)?S.lang:'');const m=MEALS.find(m=>m.id===id);if(m)return m;if(EXTRA_MEALS.some(e=>e.id===id)){loadMeal(id);return null}return MEALS.find(m=>m.lang===S.lang)||MEALS[0]||null};
let IML={};
function idb(){return new Promise((res,rej)=>{try{const r=indexedDB.open('qk',1);r.onupgradeneeded=()=>r.result.createObjectStore('kv');r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}})}
async function idbGet(k){try{const db=await idb();return await new Promise(r=>{const q=db.transaction('kv').objectStore('kv').get(k);q.onsuccess=()=>r(q.result);q.onerror=()=>r(null)})}catch(e){return null}}
async function idbSet(k,v){try{const db=await idb();await new Promise(r=>{const tx=db.transaction('kv','readwrite');tx.objectStore('kv').put(v,k);tx.oncomplete=r;tx.onerror=r})}catch(e){}}

/* ---------- icons ---------- */
const IC={cdn:'<path d="M6 9l6 6 6-6"/>',cup:'<path d="M6 15l6-6 6 6"/>',cc:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M7 11h10M7 15h6"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',home:'<path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/>',search:'<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>',book:'<path d="M12 6c-2-1.5-5-2-8-1.5V19c3-.5 6 0 8 1.5 2-1.5 5-2 8-1.5V4.5c-3-.5-6 0-8 1.5z"/><path d="M12 6v14.5"/>',list:'<path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',layers:'<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 13l9 5 9-5"/>',bm:'<path d="M6 3h12v18l-6-4-6 4z"/>',star:'<path d="M12 3l2.8 6 6.2.6-4.8 4.2 1.4 6.2L12 16.8 6.4 20l1.4-6.2L3 9.6 9.2 9z"/>',note:'<path d="M5 3h10l4 4v14H5z"/><path d="M14 3v5h5M8 13h8M8 17h5"/>',copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h8"/>',set:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2"/><circle cx="9" cy="17" r="2"/>',fs:'<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',cl:'<path d="M15 5l-7 7 7 7"/>',cr:'<path d="M9 5l7 7-7 7"/>',help:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 015 0c0 2-2.5 2-2.5 4M12 17h.01"/>',check:'<path d="M5 12l5 5 9-10"/>',x:'<path d="M6 6l12 12M18 6L6 18"/>',up:'<path d="M12 16V4M7 9l5-5 5 5M4 20h16"/>',
abc:'<text x="12" y="17.4" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor" stroke="none" style="font-family:Amiri,\'Amiri Quran\',serif">ا ب</text>',dict:'<path d="M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3z"/><path d="M5 17a3 3 0 013-3h11"/><path d="M9 8h6"/>',tag:'<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>',info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/>',kb:'<rect x="2.5" y="6" width="19" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>',sel:'<rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M15 17.5l2 2 3.5-4"/>',sv:'<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
play:'<path d="M7 4.5v15l12.5-7.5z" fill="currentColor"/>',pause:'<path d="M7 4.5h3.5v15H7zM13.5 4.5H17v15h-3.5z" fill="currentColor"/>',prevT:'<path d="M18 5v14l-9-7zM6 5v14"/>',nextT:'<path d="M6 5v14l9-7zM18 5v14"/>',dots:'<circle cx="5" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="19" cy="12" r="1.6" fill="currentColor"/>',share:'<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="M8.2 10.8l7.6-4.4M8.2 13.2l7.6 4.4"/>',mic:'<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>',trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',head:'<path d="M4 15v-3a8 8 0 0116 0v3"/><rect x="3" y="14" width="4" height="6" rx="1.5"/><rect x="17" y="14" width="4" height="6" rx="1.5"/>',rep:'<path d="M4 11V9a3 3 0 013-3h12M16 3l3 3-3 3M20 13v2a3 3 0 01-3 3H5M8 21l-3-3 3-3"/>',dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'};
const ic=(n,s)=>`<svg class="i" viewBox="0 0 24 24"${s?` style="width:${s}px;height:${s}px"`:''}>${IC[n]}</svg>`;
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- state ---------- */
let VIEW='home', PAGE=Math.min(604,Math.max(1,LAST|0||1)), SEL=-1, MSEL=null, FLIPDIR=0, LASTMS=-1;
const isDbl=()=>S.dbl&&S.view==='quran'&&innerWidth>=1500;

function applySet(){
  document.documentElement.dataset.theme=S.theme;
  const r=document.documentElement.style;
  r.setProperty('--arfs',(30*S.fs/100)+'px');r.setProperty('--arlh',S.lh);r.setProperty('--mfs',S.mfs+'px');r.setProperty('--arfont',FONTS[S.font]||FONTS.amiri);
  document.documentElement.lang=S.lang;LS.set('set',S);
}

/* ---------- chrome ---------- */
const NAVS=[['home','home'],['read','book'],['search','search'],['surahs','list'],['juz','layers'],null,['elifba','abc'],['topics','tag'],['intro','info'],null,['saved','star'],['notes','note'],['help','help']];
const LANGL={mn:'MN',tr:'TR',en:'EN',kk:'KK',ky:'KY'};
const LANGS=['mn','tr','en','kk','ky'],LANGN={mn:'Монгол',tr:'Türkçe',en:'English',kk:'Қазақша',ky:'Кыргызча'};
function buildChrome(){
  document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
  document.title=t('app');
  $('nav').innerHTML=NAVS.map(n=>n?`<button data-go="${n[0]}">${ic(n[1])}<span>${t(n[0]==='juz'?'juzs':n[0])}</span></button>`:'<hr>').join('');
  $('menuB').innerHTML=ic('menu');
  $('tpNext').innerHTML=ic('cl');$('tpPrev').innerHTML=ic('cr');$('mbNext').innerHTML=ic('cl');$('mbPrev').innerHTML=ic('cr');
  $('saL').innerHTML=ic('cl');$('saR').innerHTML=ic('cr');
  $('bmB').innerHTML=ic('bm');$('bmB').title=t('bm');
  $('savedB').innerHTML=ic('star');$('savedB').title=t('saveT');
  $('notesB').innerHTML=ic('note');$('notesB').title=t('notes');
  $('copyB').innerHTML=ic('copy');$('copyB').title=t('copyT');
  $('setB').innerHTML=ic('set');$('setB').title=t('settings');
  $('fsB').innerHTML=ic('fs');$('fsB').title=t('fs');
  $('playTB').innerHTML=ic(PL.playing?'pause':'play');$('playTB').title=t('play');
  $('langB').textContent=LANGL[S.lang];$('langB').title=t('lang');
  $('mbRead').innerHTML=ic('check');$('mbRead').title=t('markRead');
  $('mbPlay').innerHTML=ic(PL.playing?'pause':'play');$('mbPlay').title=t('play');
  $('mbMore').innerHTML=ic('dots');
  document.querySelectorAll('#viewSeg button').forEach(b=>{b.textContent=t(b.dataset.v);b.classList.toggle('on',b.dataset.v===S.view)});
  $('selV').innerHTML=['quran','both','meal'].map(v=>`<option value="${v}"${S.view===v?' selected':''}>${t(v)}</option>`).join('');
  $('selS').innerHTML=C.map((c,i)=>`<option value="${i+1}">${i+1}. ${esc(sn(i+1))}</option>`).join('');
  $('selJ').innerHTML=Array.from({length:30},(_,i)=>`<option value="${i+1}">${t('juz')} ${i+1}</option>`).join('');
  syncSel();updHatim();markNav();renderPlayer();
}
function markNav(){document.querySelectorAll('#nav button').forEach(b=>b.classList.toggle('on',b.dataset.go===VIEW))}
function syncSel(){
  const i=SEL>=0&&P[SEL]===PAGE?SEL:PFIRST[PAGE];const [s,a]=sa(i);
  $('selS').value=s;
  const shortA=innerWidth<=900;$('selA').innerHTML=Array.from({length:C[s-1]},(_,k)=>`<option value="${k+1}">${shortA?'':t('ayah')+' '}${k+1}</option>`).join('');
  $('selA').value=a;$('selJ').value=J[i];
  $('tpIn').value=$('mbIn').value=PAGE;
  $('mbRead').classList.toggle('on',isRead(PAGE));
  $('bmB').classList.toggle('on',!!BM&&BM.p===PAGE);
}
function updHatim(){let n=0;for(let p=1;p<=604;p++)if(isRead(p))n++;const pc=Math.round(n/604*1000)/10;$('hpct').textContent=pc+'%';$('hbar').style.width=pc+'%'}

/* ---------- views ---------- */
const VIEWS=['home','read','surahs','juz','search','saved','notes','help','elifba','topics','intro'];
function show(v){
  VIEW=v;document.querySelectorAll('.view').forEach(e=>e.classList.toggle('on',e.id==='v-'+v));
  const rd=v==='read';
  $('saL').style.display=$('saR').style.display=rd&&innerWidth>900?'grid':'none';
  document.body.classList.toggle('reading',rd);
  if(!rd)endMulti();
  closeAll();markNav();closeSide();$('top').classList.remove('hid');
  ({home:renderHome,read:renderPage,surahs:renderSurahs,juz:renderJuz,search:renderSearch,saved:renderSaved,notes:renderNotes,help:renderHelp,elifba:renderElifba,topics:renderTopics,intro:renderIntro})[v]();
  setHash();scrollTo(0,0);
}
/* tarayıcı geçmişi: telefonda soldan kaydırma / geri tuşu önceki ekrana döner.
   Ekran, fihrist konusu, Elifba ders/alt sayfa değişimi yeni kayıt ekler; okurken sayfa çevirme eklemez.
   Pencere/alt menü/yan menü açılınca bir kayıt eklenir; geri hareketi önce onu kapatır. */
let NAVKEY='',RESTORING=false,OVPUSH=false,OVSTALE=false,SKIPPOP=false;
const navKey=()=>VIEW==='read'?'read':VIEW==='topics'?'topics:'+(TOPIC?TOPIC.join('-'):''):VIEW==='elifba'?'elifba:'+ELS.les+':'+ELS.sub:VIEW;
const navState=()=>({v:VIEW,p:PAGE,tp:TOPIC,els:VIEW==='elifba'?{les:ELS.les,sub:ELS.sub}:null});
function setHash(){const h=VIEW==='read'?'p-'+PAGE:VIEW;const k=navKey();
  try{if(OVSTALE||(history.state&&history.state.ov)){history.replaceState(navState(),'','#'+h);OVSTALE=false;OVPUSH=false}
    else if(RESTORING||!NAVKEY||k===NAVKEY)history.replaceState(navState(),'','#'+h);
    else history.pushState(navState(),'','#'+h)}catch(e){}
  NAVKEY=k}
function ovOpened(){if(OVPUSH)return;OVPUSH=true;if(OVSTALE){OVSTALE=false;return}try{history.pushState(Object.assign({},history.state||navState(),{ov:1}),'')}catch(e){}}
function ovClosed(){if(!OVPUSH)return;OVPUSH=false;OVSTALE=true;
  setTimeout(()=>{if(!OVSTALE)return;OVSTALE=false;try{if(history.state&&history.state.ov){SKIPPOP=true;history.back()}}catch(e){}},0)}
const anyOv=()=>$('modal').classList.contains('on')||$('sheet').classList.contains('on')||$('side').classList.contains('open');
addEventListener('popstate',e=>{if(SKIPPOP){SKIPPOP=false;return}
  if(anyOv()){OVPUSH=false;OVSTALE=false;$('ov').classList.remove('on');$('sheet').classList.remove('on');$('modal').classList.remove('on');$('side').classList.remove('open');$('scrim').classList.remove('on');return}
  OVPUSH=false;OVSTALE=false;const st=e.state;if(!st||!st.v||st.ov&&!st.v)return;
  RESTORING=true;try{TOPIC=st.tp||null;if(st.els){ELS.les=st.els.les;ELS.sub=st.els.sub}
    if(st.v==='read'){if(st.p)PAGE=st.p;show('read')}else show(st.v)}finally{RESTORING=false}});
function goPage(p,sel,noFlip){p=Math.min(604,Math.max(1,p|0));if(isDbl())p=p%2?p:p-1;
  FLIPDIR=!noFlip&&VIEW==='read'&&S.flip?(p>PAGE?1:p<PAGE?-1:0):0;
  PAGE=p;SEL=sel==null?-1:sel;LAST=p;LS.set('last',p);if(VIEW!=='read')show('read');else{renderPage();setHash();if(SEL<0)scrollTo(0,0)}
  if(SEL>=0)requestAnimationFrame(()=>{const e=document.querySelector(`#v-read [data-i="${SEL}"]`);if(e)e.scrollIntoView({block:'center',behavior:'smooth'})})}
const goAyah=i=>goPage(P[i],i);
const step=()=>isDbl()?2:1;
const onPage=i=>P[i]===PAGE||(isDbl()&&P[i]===PAGE+1);

function placeName(s){return D.r[s-1]==='M'?t('mecca'):t('medina')}
function surahHead(s){
  const m=curMeal();const mv=S.view!=='quran';
  let h=`<div class="sban"><div class="nm">سُورَةُ ${D.an[s-1]}</div></div><div class="smeta">${M(`${s}. ${esc(sn(s))}`,`${C[s-1]} ${t('ayahs')}`,placeName(s),ORD[s-1]?ORD[s-1]+' '+t('revOrd'):'')}</div>`;
  if(mv&&m&&m.lang==='mn')h+=`<div class="smeal">${D.r[s-1]==='M'?'Мекке':'Мадина'}-д илгээгдсэн. ${C[s-1]} айлдвар.</div>`;
  h+=`<div class="sact"><button class="chip sm" data-act="playSurah" data-s="${s}">${ic('play',14)} ${t('listenSurah')}</button></div>`;
  if(s!==1&&s!==9){h+=`<div class="bsm" data-qfb="1">${BISM}</div>`;if(mv&&m&&m.bism)h+=`<div class="bsmm">${esc(m.bism)}</div>`}
  return h;
}
function mealTxt(i,m){m=m||curMeal();if(!m)return '';const g=m.mg[i];if(g){return m.arr[gi(g[0],g[1])]?'('+g[0]+':'+g[1]+'–'+g[2]+') '+m.arr[gi(g[0],g[1])]:''}return m.arr[i]||''}
function mealOf(i){const m=curMeal();if(!m)return `<span class="nomeal">${t('loading')}</span>`;
  const g=m.mg[i];if(g)return `<span class="merged">↑ ${g[0]}:${g[1]}–${g[2]}</span>`;
  if(m.miss.has(i))return '';   /* basılı mealde olmayan âyet: boş */
  const x=mealTxt(i,m);if(!x)return `<span class="nomeal">${MEALS_LOADED?t('noMeal'):t('loading')}</span>`;
  const fn=m.notes[i];return esc(x)+(fn&&fn.length?`<details class="fnd"><summary>${t('fnotes')} (${fn.length})</summary><ol>${fn.map(n=>`<li>${esc(n)}</li>`).join('')}</ol></details>`:'')}
function cls(i){return (i===SEL?' sel':'')+(MSEL&&MSEL.has(i)?' ms':'')+(PL.cur===i?' pl':'')}
function pageBody(pg){
  const a=PFIRST[pg],b=PFIRST[pg+1];let body='';
  if(S.view==='quran'&&useQCF()){body=`<div class="qp" data-qp="${pg}" style="font-family:QCF${pg}"><div class="qload">${t('loading')}</div></div>`}
  else if(S.view==='quran'){
    let txt='';
    for(let i=a;i<b;i++){const [s,ay]=sa(i);if(ay===1){if(txt)body+=`<div class="ar">${txt}</div>`;txt='';body+=surahHead(s)}
      txt+=`<span class="ay${cls(i)}" data-i="${i}" data-qf="${i}">${D.t[i]} <span class="am">${arD(ay)}</span></span> `}
    if(txt)body+=`<div class="ar">${txt}</div>`;
  }else{
    let list='';const k=S.view==='both'?'mlist both':S.view==='cmp'?'mlist cmpl':'mlist';
    for(let i=a;i<b;i++){const [s,ay]=sa(i);if(ay===1){if(list)body+=`<div class="${k}">${list}</div>`;list='';body+=surahHead(s)}
      if(S.view==='both')list+=`<div class="it${cls(i)}" data-i="${i}"><div class="ar" data-qf="${i}">${D.t[i]} <span class="am">${arD(ay)}</span></div><div class="row"><span class="num">${s}:${ay}</span><div class="mt">${mealOf(i)}</div></div></div>`;
      else if(false)list+=`<div class="it${cls(i)}" data-i="${i}"><div class="ar">${D.t[i]} <span class="am">${arD(ay)}</span></div>${MEALS.length?MEALS.map(m=>`<div class="mrow"><span class="tag" title="${esc(m.name)}">${esc(m.name)}</span><div class="mt">${m.arr[i]?esc(m.arr[i]):'<span class="nomeal">—</span>'}</div></div>`).join(''):`<div class="mrow"><div class="mt nomeal">${t('noMeal')}</div></div>`}</div>`;
      else list+=`<div class="it${cls(i)}" data-i="${i}"><span class="num">${ay}</span><div class="mt">${mealOf(i)}</div></div>`}
    if(list)body+=`<div class="${k}">${list}</div>`;
  }
  const s0=SUR[a]+1;
  return `<div class="page"><div class="frame"><div>
    <div class="phead"><span>${D.an[s0-1]}</span><span class="pc"><button data-act="next" aria-label="${t('next')}">${ic('cl',20)}</button>${arD(pg)}<button data-act="prev" aria-label="${t('prev')}">${ic('cr',20)}</button></span><span>الجزء ${arD(J[a])}</span></div>${body}</div></div></div>`;
}
function mealHead(){return ''}
const QCF_OK=!INL;let QCF_FAIL=false;const useQCF=()=>QCF_OK&&!QCF_FAIL&&S.qcf;
const QPG={},QFN={};let QBS=null;
const getQP=pg=>QPG[pg]||(QPG[pg]=fetch(`mushaf/pages/${pad3(pg)}.json`).then(r=>{if(!r.ok)throw 0;return r.json()}));
const getQF=pg=>QFN[pg]||(QFN[pg]=new FontFace('QCF'+pg,`url(mushaf/fonts/QCF_P${pad3(pg)}.woff2)`).load().then(f=>{document.fonts.add(f);return f}));
const getQB=()=>QBS||(QBS=new FontFace('QCFBS','url(mushaf/fonts/QCF_BSML.woff2)').load().then(f=>{document.fonts.add(f);return f}));
function fitQCF(el){const W=el.clientWidth;if(!W)return;el.style.fontSize='40px';el.classList.add('meas');let mx=0;el.querySelectorAll('.qln').forEach(l=>{mx=Math.max(mx,l.scrollWidth)});el.classList.remove('meas');if(mx)el.style.fontSize=Math.min(54,40*W/mx*0.985)+'px'}
async function fillQCF(el,pg){try{const [L]=await Promise.all([getQP(pg),getQF(pg),getQB()]);if(!el.isConnected)return;
  el.innerHTML=L.map(l=>{if(l[0]==='h')return `<div class="sban qhd"><div class="nm">سُورَةُ ${D.an[l[1]-1]}</div></div>`;
    if(l[0]==='b')return `<div class="qbs" style="font-family:QCFBS">#"!</div>`;
    return `<div class="qln${pg<3?' c':''}">${l[1].map(w=>`<span class="qw${cls(w[0])}" data-i="${w[0]}">${w[1]}</span>`).join('')}</div>`}).join('');
  fitQCF(el);
  [pg+1,pg-1,pg+2].forEach(x=>{if(x>=1&&x<=604){getQP(x).catch(()=>{});getQF(x).catch(()=>{})}});
  if(PL.cur>=0&&S.follow&&followOK()&&onPage(PL.cur)){const e=el.querySelector('.pl');if(e)e.scrollIntoView({block:'center'})}
  }catch(e){QCF_FAIL=true;renderPage()}}
/* akan metinde mushaf hattı: her kelime basılı Medine mushafındaki QCF glifiyle (ayet bir sonraki sayfaya taşabilir) */
const QW={},QWP={};const useQF=()=>QCF_OK&&!QCF_FAIL&&S.font==='qcf';
function idxQP(pg,L){if(QWP[pg])return;QWP[pg]=1;const seen=new Set();
  for(const l of L)if(l[0]==='t')for(const w of l[1]){(QW[w[0]]||(QW[w[0]]=[])).push([pg,w[1]]);seen.add(w[0])}
  seen.forEach(i=>QW[i].sort((x,y)=>x[0]-y[0]))}
function qfHTML(i){const ws=QW[i];if(!ws||!ws.length)return null;let h='',cp=0,buf=[];
  const flush=()=>{if(buf.length)h+=`<span style="font-family:QCF${cp}">${buf.join(' ')}</span> `;buf=[]};
  for(const [p,g] of ws){if(p!==cp){flush();cp=p}buf.push(g.includes(' ')?`<span class="qn">${g}</span>`:g)}flush();return h.trim()}
async function upgradeFlow(root){const els=root.querySelectorAll('[data-qf]');if(!els.length)return;
  const idx=[...els].map(e=>+e.dataset.qf);const pages=new Set();idx.forEach(i=>{pages.add(P[i]);if(P[i]<604)pages.add(P[i]+1)});
  try{await Promise.all([...pages].map(pg=>Promise.all([getQP(pg),getQF(pg)]).then(([L])=>idxQP(pg,L))));
    const bs=root.querySelectorAll('[data-qfb]');if(bs.length){await getQB();bs.forEach(e=>{e.classList.add('qbs');e.style.fontFamily='QCFBS';e.textContent='#"!'})}
  }catch(e){return}
  if(!root.isConnected)return;
  els.forEach(e=>{const h=qfHTML(+e.dataset.qf);if(h){e.innerHTML=h;e.classList.add('qfd')}});
  root.classList.add('qflow')}
function renderPage(){
  const dbl=isDbl();if(dbl&&PAGE%2===0)PAGE--;
  const rd=isRead(PAGE);
  const pages=dbl&&PAGE<604?`<div class="dbl">${pageBody(PAGE)}${pageBody(PAGE+1)}</div>`:pageBody(PAGE);
  $('v-read').innerHTML=mealHead()+`<div id="pgwrap" class="${FLIPDIR>0?'flip-n':FLIPDIR<0?'flip-p':''}">${pages}</div>
  <div class="pfoot"><button class="chip${rd?' on':''}" data-act="read">${ic('check',18)} ${rd?t('isRead'):t('markRead')}</button><button class="chip${BM&&BM.p===PAGE?' on':''}" data-act="bm">${ic('bm',18)} ${t('bmHere')}</button><button class="chip${MSEL?' on':''}" data-act="multi">${ic('sel',18)} ${t('multi')}</button><button class="chip" data-act="saveMenu">${ic('star',18)} ${t('saveT')}</button><span class="chip" style="cursor:default">${t('page')} ${PAGE}${dbl&&PAGE<604?'–'+(PAGE+1):''} ${t('of')} 604 · ${t('juz')} ${J[PFIRST[PAGE]]}</span></div>`;
  FLIPDIR=0;
  document.querySelectorAll('#v-read [data-qp]').forEach(el=>fillQCF(el,+el.dataset.qp));
  if(useQF())upgradeFlow($('pgwrap'));
  if(PL.cur>=0&&S.follow&&followOK()&&onPage(PL.cur))requestAnimationFrame(()=>{const e=document.querySelector('#v-read .pl');if(e)e.scrollIntoView({block:'center'})});
  syncSel();
}
let DEFERRED_INSTALL=null;
function renderHome(){
  const d=new Date();const seed=(d.getFullYear()*372+d.getMonth()*31+d.getDate())*2654435761>>>0;const vi=seed%N;const [vs,va]=sa(vi);
  let n=0;for(let p=1;p<=604;p++)if(isRead(p))n++;
  const quick=[36,67,18,55,56,1,2,112].map(s=>sCard(s)).join('');
  const cards=[['read','book','quran'],['meal','note','meal'],['surahs','list','surahs'],['juz','layers','juzs'],['elifba','abc','elifba'],['topics','tag','topics']];
  const vt=mealTxt(vi);
  $('v-home').innerHTML=`<div class="hero"><div class="ttl">${BISM}</div><p>${t('welcome')}</p>
  <div class="btns"><button data-act="cont">${t('cont')} · ${t('page')} ${LAST}</button>${BM?`<button class="g" data-act="bmgo">${ic('bm',16)} ${t('bmGo')} · ${BM.p}</button>`:''}</div>
  <form class="hsearch" id="hs"><input id="hsq" placeholder="${t('searchPh')}" autocomplete="off"><button type="submit" aria-label="${t('search')}">${ic('search')}</button></form></div>
  <div class="cards6">${cards.map(c=>`<button class="c6" ${c[0]==='meal'?'data-act="mealview"':`data-go="${c[0]}"`}><span class="ic">${ic(c[1],24)}</span>${t(c[2])}</button>`).join('')}</div>
  <div class="two"><div class="card"><b>${t('hatim')}</b><div class="muted" style="font-size:13px;margin-top:4px">${n} / 604 ${t('hatimP')}</div><div class="bar" style="height:9px;margin-top:10px"><i style="width:${n/604*100}%"></i></div></div>
  <div class="card votd" data-i="${vi}" style="cursor:pointer"><b>${t('votd')}</b> <span class="muted" style="font-size:13px">· ${esc(sn(vs))} ${vs}:${va}</span><div class="ar">${D.t[vi]}</div>${vt?`<div class="mt">${esc(vt)}</div>`:''}</div></div>
  ${installCard()}
  <h3>${t('quick')}</h3><div class="grid">${quick}</div>`;
  $('hs').onsubmit=e=>{e.preventDefault();SQ=$('hsq').value;show('search')};
}
const isStandalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone;
function installCard(){if(INL||isStandalone())return '';const ios=/iphone|ipad|ipod/i.test(navigator.userAgent);
  if(DEFERRED_INSTALL)return `<div class="card" style="margin-top:12px;display:flex;align-items:center;gap:12px;flex-wrap:wrap"><b style="flex:1">${t('install')}</b><button class="btn" data-act="install">${ic('dl',16)} ${t('install')}</button></div>`;
  if(ios)return `<div class="card" style="margin-top:12px"><b>${t('install')}</b><p class="muted" style="margin:6px 0 0">${t('installIOS')}</p></div>`;return ''}
function sCard(s){const pg=P[START[s]?START[s]-1:N-1]-P[START[s-1]]+1;return `<button class="sc" data-s="${s}"><span class="n"><span>${s}</span></span><span class="tx"><b>${esc(sn(s))}</b><small class="mt2">${M(`${C[s-1]} ${t('ayahs')}`,placeName(s),`${t('page')} ${P[START[s-1]]}`)}</small></span><span class="a">${D.an[s-1]}</span></button>`}
let SF={q:'',r:'',j:'',so:'m',tq:''};
const surPages=s=>{const a=START[s-1],b=a+C[s-1]-1;return P[b]-P[a]+1};
function renderSurahs(){
  $('v-surahs').innerHTML=`<h2>${t('surahs')}</h2><div class="filters"><input id="sfq" placeholder="${t('filter')}" value="${esc(SF.q)}">
  <div class="seg" id="sfr"><button data-r="" class="${SF.r===''?'on':''}">${t('all')}</button><button data-r="M" class="${SF.r==='M'?'on':''}">${t('mecca')}</button><button data-r="D" class="${SF.r==='D'?'on':''}">${t('medina')}</button></div></div>
  <div class="filters"><select id="sfj"><option value="">${t('juzs')}: ${t('all')}</option>${Array.from({length:30},(_,k)=>`<option value="${k+1}"${SF.j==k+1?' selected':''}>${t('juz')} ${k+1}</option>`).join('')}</select>
  <select id="sfs">${[['m','soMushaf'],['o','soRev'],['n','soName'],['a','soAr'],['c','soAy'],['p','soPg']].map(o=>`<option value="${o[0]}"${SF.so===o[0]?' selected':''}>${t('sort')}: ${t(o[1])}</option>`).join('')}</select></div><div class="grid" id="sgrid"></div>`;
  fillSurahs();
  $('sfq').oninput=e=>{SF.q=e.target.value;fillSurahs()};
  $('sfj').onchange=e=>{SF.j=e.target.value;fillSurahs()};
  $('sfs').onchange=e=>{SF.so=e.target.value;fillSurahs()};
  $('sfr').onclick=e=>{const b=e.target.closest('button');if(!b)return;SF.r=b.dataset.r;$('sfr').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x===b));fillSurahs()};
}
function fillSurahs(){const q=nLat(SF.q);let list=[];for(let s=1;s<=114;s++){if(SF.r&&D.r[s-1]!==SF.r)continue;
    if(SF.j){const j=+SF.j,a=START[s-1],b=a+C[s-1]-1;if(J[a]>j||J[b]<j)continue}
    if(q&&!(nLat(NM.mn[s-1]+' '+NM.tr[s-1]+' '+(NM.en[s-1]||'')).includes(q)||String(s)===q))continue;list.push(s)}
  const coll=new Intl.Collator(S.lang==='en'?'en':S.lang);
  const so={m:(a,b)=>a-b,o:(a,b)=>ORD[a-1]-ORD[b-1],n:(a,b)=>coll.compare(sn(a),sn(b)),a:(a,b)=>D.an[a-1].localeCompare(D.an[b-1],'ar'),c:(a,b)=>C[b-1]-C[a-1],p:(a,b)=>surPages(b)-surPages(a)}[SF.so]||((a,b)=>a-b);
  list.sort(so);
  $('sgrid').innerHTML=list.map(s=>{let extra=SF.so==='o'?` · ${ORD[s-1]} ${t('revOrd')}`:SF.so==='p'?` · ${surPages(s)} ${t('pages')}`:'';return sCard(s).replace('</small>',(extra?`<span>${extra.replace(' · ','')}</span>`:'')+'</small>')}).join('')||`<div class="empty">${t('noRes')}</div>`}
function renderJuz(){let h='';for(let j=1;j<=30;j++){const i=JFIRST[j];const [s,a]=sa(i);h+=`<button class="sc" data-i="${i}"><span class="n"><span>${j}</span></span><span class="tx"><b>${t('juz')} ${j}</b><small class="mt2">${M(`${t('starts')}: ${esc(sn(s))} ${s}:${a}`,`${t('page')} ${P[i]}`)}</small></span><span class="a">الجزء ${arD(j)}</span></button>`}
  $('v-juz').innerHTML=`<h2>${t('juzs')}</h2><div class="grid">${h}</div>`}

/* ---------- keyboard ---------- */
function kbHTML(id,lay){lay=lay||'ar';const rows=KB[lay];
  return `<div class="kb" id="${id}"><div class="tb"><div class="seg">${['ar','mn','tr'].map(k=>`<button data-kbl="${k}" data-kb="${id}" class="${k===lay?'on':''}">${k==='ar'?'عربي':k==='mn'?'Кирилл':'Latin'}</button>`).join('')}</div><button class="ib" data-kbclose="${id}">${ic('x',16)}</button></div>
  ${rows.map(r=>`<div class="r ${lay==='ar'?'ar':''}">${r.split(' ').map(k=>`<button data-key="${esc(k)}" data-kb="${id}">${k}</button>`).join('')}</div>`).join('')}
  <div class="r"><button data-key=" " data-kb="${id}" style="flex:1;max-width:260px">␣</button><button data-key="BS" data-kb="${id}">⌫</button><button data-key="CL" data-kb="${id}">✕</button></div></div>`}
const KBT={};
function kbKey(id,k){const inp=$(KBT[id]);if(!inp)return;if(k==='BS')inp.value=inp.value.slice(0,-1);else if(k==='CL')inp.value='';else inp.value+=k;inp.dispatchEvent(new Event('input'))}

/* ---------- search ---------- */
const nAr=s=>s.replace(/[ً-ٰٟۖ-ࣰۭ-ࣲـ‏‎]/g,'').replace(/[ٱأإآ]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/ؤ/g,'و').replace(/ئ/g,'ي').replace(/\s+/g,' ');
const nLat=s=>String(s).toLocaleLowerCase().normalize('NFD').replace(/[̀-ͯ'’ʼ-]/g,'').replace(/ı/g,'i');
let IAR=null,SQ='',STAB='all',SADV={s:'',j:'',r:'',w:false},SADVOPEN=false;
const SRx=window.SpeechRecognition||window.webkitSpeechRecognition;
function renderSearch(){
  const tabs=[['all','tAll'],['ar','tAr'],['meal','tMeal'],['sur','tSur']];
  $('v-search').innerHTML=`<h2>${t('search')}</h2>
  <div class="seg tabs" id="stabs">${tabs.map(x=>`<button data-st2="${x[0]}" class="${STAB===x[0]?'on':''}">${t(x[1])}</button>`).join('')}</div>
  <div class="filters" style="margin-top:10px"><input id="sq" placeholder="${t('searchPh')}" value="${esc(SQ)}" autocomplete="off" dir="auto"><button class="ib" data-kbopen="kbS" title="${t('kb')}">${ic('kb')}</button><button class="ib" id="micB" title="${t('mic')}">${ic('mic')}</button></div>${kbHTML('kbS',STAB==='ar'?'ar':S.lang==='mn'?'mn':'ar')}
  <details class="adv" id="advD"${SADVOPEN?' open':''}><summary>${t('adv')}</summary><div class="filters" style="margin-top:8px">
  <select id="fS"><option value="">${t('surah')}: ${t('all')}</option>${C.map((c,k)=>`<option value="${k+1}"${SADV.s==k+1?' selected':''}>${k+1}. ${esc(sn(k+1))}</option>`).join('')}</select>
  <select id="fJ"><option value="">${t('juz')}: ${t('all')}</option>${Array.from({length:30},(_,k)=>`<option value="${k+1}"${SADV.j==k+1?' selected':''}>${t('juz')} ${k+1}</option>`).join('')}</select>
  <select id="fR"><option value="">${t('mecca')} / ${t('medina')}</option><option value="M"${SADV.r==='M'?' selected':''}>${t('mecca')}</option><option value="D"${SADV.r==='D'?' selected':''}>${t('medina')}</option></select>
  <label class="chk"><input type="checkbox" id="fW"${SADV.w?' checked':''}> ${t('whole')}</label></div></details><div id="sres"></div>`;
  KBT.kbS='sq';
  const inp=$('sq');let tm;inp.oninput=()=>{clearTimeout(tm);tm=setTimeout(()=>{SQ=inp.value;doSearch()},180)};
  ['fS','fJ','fR'].forEach(id=>$(id).onchange=e=>{SADV[{fS:'s',fJ:'j',fR:'r'}[id]]=e.target.value;doSearch()});
  $('fW').onchange=e=>{SADV.w=e.target.checked;doSearch()};
  $('advD').ontoggle=e=>{SADVOPEN=e.target.open};
  $('micB').onclick=voiceSearch;
  if(innerWidth>900)setTimeout(()=>inp.focus(),50);doSearch();
}
function voiceSearch(){if(!SRx){toast(t('micNo'));return}
  try{const r=new SRx();r.lang=STAB==='ar'?'ar-SA':({mn:'mn-MN',tr:'tr-TR',en:'en-US'})[S.lang];r.interimResults=false;r.maxAlternatives=1;
    r.onresult=e=>{const v=e.results[0][0].transcript;SQ=v;$('sq').value=v;doSearch()};r.onerror=()=>toast(t('micNo'));r.onstart=()=>toast(t('listening'));r.start()}catch(e){toast(t('micNo'))}}
function inFilter(i){const s=SUR[i]+1;if(SADV.s&&s!=SADV.s)return false;if(SADV.j&&J[i]!=SADV.j)return false;if(SADV.r&&D.r[s-1]!==SADV.r)return false;return true}
function doSearch(){
  const box=$('sres');if(!box)return;const q=SQ.trim();if(q.length<2&&!/^\d+$/.test(q)){box.innerHTML=q?`<p class="muted">${t('minCh')}</p>`:'';return}
  const isA=/[؀-ۿ]/.test(q);let hits=[];let sh='';const LIM=400;
  const wrap=x=>SADV.w?` ${x} `:x;
  if(STAB==='all'||STAB==='sur'){if(!isA){const qq=nLat(q);const ss=[];for(let s=1;s<=114;s++)if(nLat(NM.mn[s-1]+' '+NM.tr[s-1]+' '+(NM.en[s-1]||'')).includes(qq)||String(s)===q)ss.push(s);if(ss.length)sh=`<div class="grid" style="margin-bottom:12px">${ss.slice(0,30).map(sCard).join('')}</div>`}
    else{const nq=nAr(q);const ss=[];for(let s=1;s<=114;s++)if(nAr(D.an[s-1]).includes(nq))ss.push(s);if(ss.length)sh=`<div class="grid" style="margin-bottom:12px">${ss.map(sCard).join('')}</div>`}
    if(STAB==='sur'){box.innerHTML=sh||`<div class="empty">${t('noRes')}</div>`;return}}
  if(isA&&(STAB==='all'||STAB==='ar')){if(!IAR)IAR=D.t.map(x=>' '+nAr(x)+' ');const nq=wrap(nAr(q));for(let i=0;i<N&&hits.length<LIM;i++)if(inFilter(i)&&IAR[i].includes(nq))hits.push(i)}
  else if(!isA&&STAB!=='ar'){const m=q.match(/^(\d{1,3})\s*[:.\s]\s*(\d{1,3})$/);if(m){const s=+m[1],a=+m[2];if(s>=1&&s<=114&&a>=1&&a<=C[s-1])hits.push(gi(s,a))}
    const nq=nLat(q);if(nq.length>=2)for(const ml of MEALS){if(!IML[ml.id])IML[ml.id]=ml.arr.map(x=>' '+nLat(x||'').replace(/[.,;:!?“”"«»()\[\]]/g,' ')+' ');const ix=IML[ml.id];const w=wrap(nq);for(let i=0;i<N&&hits.length<LIM;i++)if(inFilter(i)&&ix[i].includes(w)&&!hits.includes(i))hits.push(i)}}
  const re=!isA&&q.length>=2?new RegExp('('+q.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi'):null;
  box.innerHTML=sh+`<p class="muted">${hits.length}${hits.length>=LIM?'+':''} ${t('results')}</p>`+(hits.length?hits.map(i=>{const [s,a]=sa(i);const mt=mealTxt(i);
    return `<button class="res" data-i="${i}"><div class="ref mt2">${M(`${esc(sn(s))} ${s}:${a}`,`${t('page')} ${P[i]}`)}</div><div class="ar">${D.t[i]}</div>${mt?`<div class="mt" style="font-size:14px">${re?esc(mt).replace(re,'<mark>$1</mark>'):esc(mt)}</div>`:''}</button>`}).join(''):(sh?'':`<div class="empty">${t('noRes')}</div>`));
}
function resItem(i,extra){const [s,a]=sa(i);const mt=mealTxt(i);return `<button class="res" data-i="${i}"><div class="ref mt2">${M(`${extra||''}${esc(sn(s))} ${s}:${a}`,`${t('page')} ${P[i]}`)}</div><div class="ar">${D.t[i]}</div>${mt?`<div class="mt" style="font-size:14px">${esc(mt)}</div>`:''}</button>`}

/* ---------- saved ---------- */
let SVTAB='a';
function renderSaved(){
  const tabs=[['a','tAyahs'],['p','tPages'],['s','tSurahs'],['j','tJuzs']];
  const list=SV[SVTAB].slice().sort((x,y)=>x-y);
  let h='';
  if(SVTAB==='a')h=list.map(i=>`<div class="svrow">${resItem(i,ic('star',14)+' ')}<button class="ib" data-svdel="a:${i}" title="${t('del')}">${ic('trash',16)}</button></div>`).join('');
  else h=`<div class="grid">${list.map(x=>{let lab,sub,go;if(SVTAB==='p'){const i=PFIRST[x];const [s,a]=sa(i);lab=`${t('page')} ${x}`;sub=`${esc(sn(s))} ${s}:${a}`;go=`data-svgo="p:${x}"`}
    else if(SVTAB==='s'){lab=`${x}. ${esc(sn(x))}`;sub=`${C[x-1]} ${t('ayahs')}`;go=`data-svgo="s:${x}"`}else{lab=`${t('juz')} ${x}`;const [s,a]=sa(JFIRST[x]);sub=`${esc(sn(s))} ${s}:${a}`;go=`data-svgo="j:${x}"`}
    return `<div class="sc"><button class="tx" ${go} style="border:0;background:none;text-align:left;padding:0;cursor:pointer"><b>${lab}</b><small>${sub}</small></button><button class="ib" data-svdel="${SVTAB}:${x}">${ic('trash',16)}</button></div>`}).join('')}</div>`;
  $('v-saved').innerHTML=`<h2>${t('saved')}</h2><div class="seg tabs" style="margin-bottom:12px">${tabs.map(x=>`<button data-svtab="${x[0]}" class="${SVTAB===x[0]?'on':''}">${t(x[1])} (${SV[x[0]].length})</button>`).join('')}</div>`+(list.length?h:`<div class="empty">${t('emSaved')}</div>`)+`<div class="btns" style="justify-content:flex-start"><button class="btn s" data-act="backup">${ic('sv',16)} ${t('backup')}</button></div>`;
}
function saveMenu(){const i=SEL>=0?SEL:PFIRST[PAGE];const [s]=sa(i);
  modal(`<div class="hd"><b>${t('saveT')}</b><button class="ib" data-act="close">${ic('x')}</button></div>
  <div class="mlist2"><button class="btn s wide" data-svadd="p">${ic('book',16)} ${t('svPage')} · ${PAGE}</button>
  <button class="btn s wide" data-svadd="a"${SEL<0&&!(MSEL&&MSEL.size)?' disabled style="opacity:.5"':''}>${ic('star',16)} ${t('svAyah')}${SEL>=0?' · '+sa(SEL).join(':'):''}</button>
  <button class="btn s wide" data-svadd="s">${ic('list',16)} ${t('svSurah')} · ${esc(sn(s))}</button>
  <button class="btn s wide" data-svadd="j">${ic('layers',16)} ${t('svJuz')} · ${J[i]}</button></div>
  <div class="btns"><button class="btn" data-go="saved">${t('saved')}</button></div>`)}
function svAdd(k){const i=SEL>=0?SEL:PFIRST[PAGE];const add=(key,v)=>{if(!SV[key].includes(v))SV[key].push(v)};
  if(k==='p')add('p',PAGE);else if(k==='a'){if(MSEL&&MSEL.size)MSEL.forEach(x=>add('a',x));else if(SEL>=0)add('a',SEL)}else if(k==='s')add('s',SUR[i]+1);else add('j',J[i]);saveSV();toast(t('svDone'))}

/* ---------- notes ---------- */
function renderNotes(){
  const ks=Object.keys(NOTES).map(Number).sort((x,y)=>x-y);
  const h=ks.map(i=>{const [s,a]=sa(i);return `<button class="res" data-i="${i}"><div class="ref">${ic('note',14)} ${esc(sn(s))} ${s}:${a}</div><div class="ar" style="font-size:20px">${D.t[i]}</div><div class="mt" style="white-space:pre-wrap;font-size:14px;border-left:3px solid var(--gold);padding-left:10px;margin-top:6px">${esc(NOTES[i])}</div></button>`}).join('');
  $('v-notes').innerHTML=`<h2>${t('notes')}</h2>${ks.length?`<div class="btns" style="justify-content:flex-start;margin:0 0 12px"><button class="btn s" data-ex="notes:word">${ic('dl',16)} ${t('exWord')}</button><button class="btn s" data-ex="notes:csv">${ic('dl',16)} ${t('exExcel')}</button></div>`:''}`+(h||`<div class="empty">${t('emNotes')}</div>`)+`<div class="btns" style="justify-content:flex-start"><button class="btn s" data-act="backup">${ic('sv',16)} ${t('backup')}</button></div>`;
}

/* ---------- help / intro ---------- */
function renderHelp(){const fq=t('faqL'),hk=t('keys');
  $('v-help').innerHTML=`<h2>${t('help')}</h2>
  <div class="card"><b>${t('about')}</b><p class="mt" style="margin:6px 0 0">${esc(t('aboutTx'))}</p></div>
  <h3>${t('usage')}</h3><div class="card help"><ul>${t('helpTx').map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  <h3>${t('faq')}</h3><div class="card">${fq.map(q=>`<details class="faq"><summary>${esc(q[0])}</summary><p class="mt">${esc(q[1])}</p></details>`).join('')}</div>
  <h3>${t('shortcuts')}</h3><div class="card">${hk.map(k=>`<div class="sgn" style="padding:6px 0"><kbd>${k[0]}</kbd><span>${esc(k[1])}</span></div>`).join('')}</div>
  <h3>${t('readers')}</h3><div class="card">${RECITERS.map(r=>`<div class="sgn" style="padding:6px 0">${ic('head',16)}<span>${esc(recLbl(r))}</span></div>`).join('')}</div>
  <h3>${t('meals')}</h3><div class="card"><p class="mt" style="margin:0 0 10px">${MEALS.length?MEALS.map(m=>esc(m.name)).join(', '):t('noMeal')}</p><button class="btn s" data-act="backup">${ic('sv',16)} ${t('backup')}</button></div>
  <h3>${t('src')}</h3><div class="card"><ul class="muted" style="margin:0;padding-left:18px;font-size:13px">${t('srcList').map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>
  ${kunyeHTML()}
  <h3>${t('contact')}</h3><div class="card">${CONTACT_EMAIL?`<a href="mailto:${esc(CONTACT_EMAIL)}">${esc(CONTACT_EMAIL)}</a>`:`<span class="muted">${t('contactNone')}</span>`}</div>
  <div class="btns" style="justify-content:flex-start;margin-top:16px"><button class="btn d" data-act="wipe">${ic('trash',16)} ${t('wipe')}</button></div>`}
function kunyeHTML(){const one=(title,lines)=>`<h3>${esc(title)}</h3><div class="card kunye">${lines.map(l=>`<div class="kl"><span class="muted">${esc(l[0])}</span><span>${esc(l[1])}</span></div>`).join('')}</div>`;
  return one(L(KUNYE.title),KUNYE.lines)+EXTRA_MEALS.map(x=>one(x.name,x.kunye)).join('')}
function renderIntro(){const tx=INTRO[S.lang]||INTRO.mn;
  $('v-intro').innerHTML=`<h2>${t('intro')}</h2><div class="card"><div class="ar" style="text-align:center;text-align-last:center;font-size:34px;color:var(--pri)">${BISM}</div>${tx.map(p=>`<h4 class="ih">${esc(p[0])}</h4><p class="mt">${esc(p[1])}</p>`).join('')}</div>
  ${kunyeHTML()}
  <h3>${L({mn:"Мусхаф дахь тэмдгүүд",tr:"Mushaftaki işaretler",en:"Signs in the mushaf"})}</h3><div class="card">${signsHTML()}</div>
  <h3>${t('src')}</h3><div class="card"><ul class="muted" style="margin:0;padding-left:18px;font-size:13px">${t('srcList').map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`}
/* metin içindeki Arapça parçaları Kur'an fontuyla göster (açıklama fontunda Arapça yok → harekeler noktalı daireye düşüyordu) */
const AR_RUN=/[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF](?:[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u200c\u200d ]*[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF])?/g;
const arIn=h=>h.replace(AR_RUN,m=>`<span class="arin" dir="rtl">${m}</span>`);
function signsHTML(){return SIGNS.map(s=>`<div class="sgn"><span class="s">${s[0]==='۩'||s[0]==='۞'?s[0]:'<i class="mk">\u00A0'+s[0]+'</i>'}</span><span>${esc(L(s[1]))}</span></div>`).join('')}

/* ---------- refs helper ---------- */
function refIdx(spec){const out=[];for(const part of spec.split(',')){const m=part.trim().match(/^(\d+):(\d+)(?:-(\d+))?$/);if(!m)continue;const s=+m[1],a=+m[2],b=m[3]?+m[3]:a;for(let x=a;x<=Math.min(b,C[s-1]);x++)out.push(gi(s,x))}return out}
function refLabel(spec){return spec.split(',').map(p=>{const m=p.match(/^(\d+):(.*)$/);return m?`${sn(+m[1])} ${p}`:p}).join(' · ')}

/* ---------- topics (fihrist) ---------- */
let TOPIC=null;
const tName=tp=>(S.lang==='kk'||S.lang==='ky')?(I18X[S.lang].topics[tp[1]]||tp[2]):tp[S.lang==='tr'?1:S.lang==='en'?2:0];
function renderTopics(){
  if(!TOPIC){const q=nLat(SF.tq||'');
    $('v-topics').innerHTML=`<h2>${t('topics')}</h2><div class="filters"><input id="tq" placeholder="${t('search')}…" value="${esc(SF.tq||'')}"></div><div id="tgrid"></div>`;
    const fill=()=>{const q=nLat(SF.tq||'');$('tgrid').innerHTML=TOPICS.map((cat,ci)=>{const items=cat.t.map((tp,k)=>[tp,k]).filter(([tp])=>!q||nLat(tp[0]+' '+tp[1]+' '+tp[2]).includes(q));if(!items.length)return '';
      return `<h3>${esc(L(cat.c))} <small class="muted">(${items.length})</small></h3><div class="grid">${items.map(([tp,k])=>`<button class="sc" data-topic="${ci}:${k}"><span class="tx"><b>${esc(tName(tp))}</b><small>${refIdx(tp[3]).length} ${t('ayahs')}</small></span>${ic('cr',16)}</button>`).join('')}</div>`}).join('')||`<div class="empty">${t('noRes')}</div>`};
    fill();$('tq').oninput=e=>{SF.tq=e.target.value;fill()};return}
  const [ci,k]=TOPIC;const tp=TOPICS[ci].t[k];const ids=refIdx(tp[3]);
  $('v-topics').innerHTML=`<button class="chip" data-topic="-">${ic('cl',16)} ${t('back')}</button><div class="muted" style="margin-top:12px;font-size:13px">${esc(L(TOPICS[ci].c))}</div><h2 style="margin-top:2px">${esc(tName(tp))}</h2><p class="muted">${esc(refLabel(tp[3]))}</p><div class="btns" style="justify-content:flex-start;margin:0 0 10px"><button class="btn s" data-playrefs="${tp[3]}">${ic('play',14)} ${t('play')}</button></div>`+ids.map(i=>resItem(i)).join('');
}

/*@ELIFBA@*/
/* ---------- audio player ---------- */
const AU=new Audio();AU.preload='auto';const PRE=new Audio();PRE.preload='auto';
const PL={queue:[],pos:0,playing:false,cur:-1,inBism:false,ayCnt:0,rgCnt:0,open:false,err:0};
const recOf=id=>RECITERS.find(x=>x[0]===(REC_OLD[id]||id))||RECITERS[0];
const recLbl=r=>(S.lang==='kk'||S.lang==='ky')?(I18X[S.lang].recit[RECITERS.indexOf(r)]||r[3]):r[S.lang==='tr'?2:S.lang==='en'?3:1];
const recName=id=>recLbl(recOf(id));
const ayURL=(i,rec)=>{const r=recOf(rec||S.rec);return `https://cdn.islamic.network/quran/audio/${r[4]}/${r[0]}/${i+1}.mp3`};
const repN=v=>v==='inf'?Infinity:(+v||1);
function buildQueue(from){let end;if(S.range==='page'){const lastPg=isDbl()&&P[from]%2===1?P[from]+1:P[from];end=PFIRST[Math.min(605,lastPg+1)]}else if(S.range==='surah'){end=START[SUR[from]]+C[SUR[from]]}else end=N;
  const q=[];for(let i=from;i<end;i++)q.push(i);return q}
function playQueue(q,pos){if(!q.length){toast(t('plEmpty'));return}PL.queue=q;PL.pos=pos||0;PL.ayCnt=0;PL.rgCnt=0;PL.open=true;playCur(true)}
function playFrom(i,withBism){playQueue(buildQueue(i),0);}
function playCur(allowBism){const i=PL.queue[PL.pos];if(i==null){stopPlay();return}const [s,a]=sa(i);
  PL.inBism=!!(allowBism&&a===1&&s!==1&&s!==9);
  AU.src=PL.inBism?ayURL(0):ayURL(i);AU.playbackRate=S.rate;
  const p=AU.play();if(p&&p.catch)p.catch(err=>{if(err&&err.name==='NotAllowedError'){PL.playing=false;renderPlayer();return}});
  PL.playing=true;setCur(i);renderPlayer();preloadNext();mediaMeta(i)}
function preloadNext(){const n=PL.queue[PL.pos+1];if(n!=null)try{PRE.src=ayURL(n)}catch(e){}}
const followOK=()=>!FPAUSE;
function setCur(i){const prev=PL.cur;PL.cur=i;elfSync(i);document.querySelectorAll('#v-read .pl').forEach(e=>e.classList.remove('pl'));
  if(VIEW==='read'){if(!onPage(i)&&S.follow&&followOK()){goPage(P[i],null,false);return}document.querySelectorAll(`#v-read [data-i="${i}"]`).forEach(e=>{e.classList.add('pl');if(S.follow&&followOK()){const r=e.getBoundingClientRect(),cp=$('plcap'),lim=innerHeight-(cp&&cp.classList.contains('on')?cp.offsetHeight+60:140);if(r.top<70||r.bottom>lim)e.scrollIntoView({block:'center',behavior:'smooth'})}})}}
AU.onended=()=>{if(PL.inBism){PL.inBism=false;const i=PL.queue[PL.pos];AU.src=ayURL(i);AU.playbackRate=S.rate;AU.play().catch(()=>{});return}
  PL.ayCnt++;if(PL.ayCnt<repN(S.repA)){AU.currentTime=0;AU.play().catch(()=>{});return}
  PL.ayCnt=0;PL.pos++;
  if(PL.pos>=PL.queue.length){PL.rgCnt++;if(PL.rgCnt<repN(S.repR)){PL.pos=0;playCur(true);return}stopPlay(true);return}
  const [s,a]=sa(PL.queue[PL.pos]);playCur(a===1)};
AU.onerror=()=>{if(!AU.src)return;PL.err++;stopPlay();toast(t('audioErr'))};
AU.ontimeupdate=()=>{const b=$('plbar');if(b&&AU.duration)b.style.width=(AU.currentTime/AU.duration*100)+'%'};
function togglePlay(){if(PL.playing){AU.pause();PL.playing=false;renderPlayer();return}
  if(PL.queue.length&&PL.cur>=0&&AU.src){AU.play().then(()=>{PL.playing=true;renderPlayer()}).catch(()=>toast(t('audioErr')));PL.playing=true;renderPlayer();return}
  const start=SEL>=0?SEL:(MSEL&&MSEL.size?[...MSEL].sort((a,b)=>a-b)[0]:PFIRST[PAGE]);
  if(MSEL&&MSEL.size){playQueue([...MSEL].sort((a,b)=>a-b),0);return}
  playFrom(start)}
function stopPlay(done){AU.pause();PL.playing=false;if(done){PL.cur=-1;document.querySelectorAll('#v-read .pl').forEach(e=>e.classList.remove('pl'))}renderPlayer()}
function skip(d){if(!PL.queue.length)return;PL.pos=Math.max(0,Math.min(PL.queue.length-1,PL.pos+d));PL.ayCnt=0;playCur(false)}
function mediaMeta(i){try{if('mediaSession' in navigator){const [s,a]=sa(i);navigator.mediaSession.metadata=new MediaMetadata({title:`${sn(s)} ${s}:${a}`,artist:recName(S.rec),album:t('app')});
  navigator.mediaSession.setActionHandler('play',()=>togglePlay());navigator.mediaSession.setActionHandler('pause',()=>togglePlay());
  navigator.mediaSession.setActionHandler('previoustrack',()=>skip(-1));navigator.mediaSession.setActionHandler('nexttrack',()=>skip(1))}}catch(e){}}
function renderCap(){const el=$('plcap');if(!el)return;
  const i=PL.cur;let txt='';if(PL.open&&S.cap&&i>=0){const m=curMeal();txt=PL.inBism?(m&&m.bism)||'':mealTxt(i)}
  if(!txt){el.classList.remove('on');el.innerHTML='';el.dataset.k='';return}
  const [s,a]=sa(i);const k=(PL.inBism?'b':'')+i;
  if(el.dataset.k!==k){el.dataset.k=k;el.innerHTML=`<div class="cref">${PL.inBism?'بِسۡمِ ٱللَّهِ':`${esc(sn(s))} ${s}:${a}`}</div><div class="ctx" lang="${(curMeal()||{}).lang||'mn'}">${esc(txt)}</div>`;el.scrollTop=0;
    el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash')}
  el.classList.add('on')}
function renderPlayer(){const el=$('player');if(!el)return;if(!PL.playing&&!PL.open)FPAUSE=false;renderFback();
  ['mbPlay','playTB'].forEach(id=>{const b=$(id);if(b)b.innerHTML=ic(PL.playing?'pause':'play')});
  document.body.classList.toggle('plopen',PL.open);document.body.classList.toggle('plmin',PL.open&&!!S.plMin);
  renderCap();
  if(!PL.open){el.classList.remove('on','min');return}
  const i=PL.cur>=0?PL.cur:(SEL>=0?SEL:PFIRST[PAGE]);const [s,a]=sa(i);
  if(S.plMin){
    el.innerHTML=`<div class="plprog thin"><i id="plbar"></i></div><div class="plmini"><button class="ib" data-act="plMax" aria-label="${t('plMax')}" title="${t('plMax')}">${ic('cup',18)}</button>
    <span class="plt"><b>${esc(sn(s))} ${s}:${a}</b></span>
    <button class="ib" data-act="plPrev" aria-label="${t('prev')}">${ic('nextT',18)}</button><button class="ib big" data-act="plToggle" aria-label="${t('play')}">${ic(PL.playing?'pause':'play',20)}</button><button class="ib" data-act="plNext" aria-label="${t('next')}">${ic('prevT',18)}</button>
    <button class="ib${S.cap?' on':''}" data-act="plCap" aria-pressed="${S.cap}" aria-label="${t('capT')}" title="${t('capT')}">${ic('cc',18)}</button>
    <button class="ib" data-act="plClose" aria-label="${t('close')}">${ic('x',16)}</button></div>`;
    el.classList.add('on','min');if(AU.duration)$('plbar').style.width=(AU.currentTime/AU.duration*100)+'%';return}
  el.classList.remove('min');
  const reps=['1','2','3','5','10','inf'];const repLab=v=>v==='1'?t('none'):v==='inf'?t('inf'):v+'×';
  el.innerHTML=`<div class="plhd"><span class="plt">${ic('head',16)} <b>${esc(sn(s))} ${s}:${a}</b>${PL.inBism?' · بِسۡمِ ٱللَّهِ':''}</span><span class="plhb"><button class="ib" data-act="plMin" aria-label="${t('plMin')}" title="${t('plMin')}">${ic('cdn',18)}</button><button class="ib" data-act="plClose" aria-label="${t('close')}">${ic('x',16)}</button></span></div>
  <div class="plprog"><i id="plbar"></i></div>
  <div class="plctl"><button class="ib" data-act="plPrev" aria-label="${t('prev')}">${ic('nextT')}</button><button class="ib big" data-act="plToggle" aria-label="${t('play')}">${ic(PL.playing?'pause':'play',26)}</button><button class="ib" data-act="plNext" aria-label="${t('next')}">${ic('prevT')}</button></div>
  <div class="plopts">
  <label>${t('reciter')}<select id="plRec">${RECITERS.map(r=>`<option value="${r[0]}"${recOf(S.rec)[0]===r[0]?' selected':''}>${esc(recLbl(r))}</option>`).join('')}</select></label>
  <label>${t('speed')}<select id="plRate">${[0.5,0.75,1,1.25,1.5,2].map(v=>`<option value="${v}"${+S.rate===v?' selected':''}>${v}x</option>`).join('')}</select></label>
  <label>${t('rangeT')}<select id="plRange">${[['page','rgPage'],['surah','rgSurah'],['all','rgAll']].map(o=>`<option value="${o[0]}"${S.range===o[0]?' selected':''}>${t(o[1])}</option>`).join('')}</select></label>
  <label>${t('repAyah')}<select id="plRepA">${reps.map(v=>`<option value="${v}"${String(S.repA)===v?' selected':''}>${repLab(v)}</option>`).join('')}</select></label>
  <label>${t('repRange')}<select id="plRepR">${reps.map(v=>`<option value="${v}"${String(S.repR)===v?' selected':''}>${repLab(v)}</option>`).join('')}</select></label>
  <label class="chk"><input type="checkbox" id="plFol"${S.follow?' checked':''}> ${t('follow')}</label>
  <label class="chk"><input type="checkbox" id="plCapC"${S.cap?' checked':''}> ${t('capT')}</label></div>
  <div class="btns" style="margin-top:8px;justify-content:flex-start"><button class="btn s" data-act="plList">${ic('list',16)} ${t('plMake')}</button></div>`;
  el.classList.add('on');
  $('plRec').onchange=e=>{S.rec=e.target.value;applySet();if(PL.cur>=0){const was=PL.playing;playCur(false);if(!was)AU.pause()}};
  $('plRate').onchange=e=>{S.rate=+e.target.value;AU.playbackRate=S.rate;applySet()};
  $('plRange').onchange=e=>{S.range=e.target.value;applySet();if(PL.cur>=0){PL.queue=buildQueue(PL.cur);PL.pos=0}};
  $('plRepA').onchange=e=>{S.repA=e.target.value;applySet()};
  $('plRepR').onchange=e=>{S.repR=e.target.value;applySet()};
  $('plFol').onchange=e=>{S.follow=e.target.checked;applySet()};
  $('plCapC').onchange=e=>{S.cap=e.target.checked;applySet();renderCap()};
  if(AU.duration){$('plbar').style.width=(AU.currentTime/AU.duration*100)+'%'}
}
let PLT='s';
function playlistModal(){
  const tabs=[['s','tSurahs'],['j','tJuzs'],['p','tPages'],['a','plAyR']];
  let body='';
  if(PLT==='s')body=`<div class="plgrid">${C.map((c,k)=>`<label class="plit"><input type="checkbox" value="${k+1}"> ${k+1}. ${esc(sn(k+1))}</label>`).join('')}</div>`;
  else if(PLT==='j')body=`<div class="plgrid">${Array.from({length:30},(_,k)=>`<label class="plit"><input type="checkbox" value="${k+1}"> ${t('juz')} ${k+1}</label>`).join('')}</div>`;
  else if(PLT==='p')body=`<div class="cols"><label>${t('plFrom')}<input id="plpf" type="number" min="1" max="604" value="${PAGE}"></label><label>${t('plTo')}<input id="plpt" type="number" min="1" max="604" value="${PAGE}"></label></div>`;
  else{const [s]=sa(SEL>=0?SEL:PFIRST[PAGE]);body=`<label>${t('surah')}<select id="plas" style="width:100%">${C.map((c,k)=>`<option value="${k+1}"${k+1===s?' selected':''}>${k+1}. ${esc(sn(k+1))}</option>`).join('')}</select></label><div class="cols" style="margin-top:8px"><label>${t('plFrom')}<input id="plaf" type="number" min="1" value="1"></label><label>${t('plTo')}<input id="plat" type="number" min="1" value="${C[s-1]}"></label></div>`}
  modal(`<div class="hd"><b>${t('plist')}</b><button class="ib" data-act="close">${ic('x')}</button></div>
  ${PLS.length?`<div class="lbl">${t('plFav')}</div>${PLS.map((p,k)=>`<div class="sgn" style="padding:6px 0"><span style="flex:1">${esc(p.n)} <small class="muted">(${p.q.length})</small></span><button class="btn s" data-plplay="${k}" style="padding:6px 10px">${ic('play',14)}</button><button class="btn s" data-pldel="${k}" style="padding:6px 10px">${ic('trash',14)}</button></div>`).join('')}`:''}
  <div class="lbl">${t('plMake')}</div><div class="seg tabs" style="margin-bottom:10px">${tabs.map(x=>`<button data-plt="${x[0]}" class="${PLT===x[0]?'on':''}">${t(x[1])}</button>`).join('')}</div>${body}
  <div class="cols" style="margin-top:12px"><input id="plnm" placeholder="${t('plName')}"><span></span></div>
  <div class="btns"><button class="btn s" data-act="plSave">${t('ok')}</button><button class="btn" data-act="plGo">${ic('play',14)} ${t('play')}</button></div>`);
  const as=$('plas');if(as)as.onchange=e=>{$('plat').value=C[+e.target.value-1]};
}
function plCollect(){let q=[];
  if(PLT==='s'||PLT==='j'){const v=[...document.querySelectorAll('#modal .plgrid input:checked')].map(x=>+x.value);
    for(const x of v){if(PLT==='s'){for(let a=1;a<=C[x-1];a++)q.push(gi(x,a))}else{for(let i=JFIRST[x];i<(x<30?JFIRST[x+1]:N);i++)q.push(i)}}}
  else if(PLT==='p'){let f=+$('plpf').value||1,to=+$('plpt').value||f;f=Math.max(1,Math.min(604,f));to=Math.max(f,Math.min(604,to));for(let i=PFIRST[f];i<PFIRST[to+1];i++)q.push(i)}
  else{const s=+$('plas').value;let f=+$('plaf').value||1,to=+$('plat').value||f;f=Math.max(1,Math.min(C[s-1],f));to=Math.max(f,Math.min(C[s-1],to));for(let a=f;a<=to;a++)q.push(gi(s,a))}
  return q}

/* ---------- sheet & modal ---------- */
function openOv(){$('ov').classList.add('on');ovOpened()}
function closeAll(){const was=$('modal').classList.contains('on')||$('sheet').classList.contains('on');$('ov').classList.remove('on');$('sheet').classList.remove('on');$('modal').classList.remove('on');if(was&&!$('side').classList.contains('open'))ovClosed()}
function openSheet(i){
  SEL=i;document.querySelectorAll('.ay.sel,.it.sel,.qw.sel').forEach(e=>e.classList.remove('sel'));document.querySelectorAll(`#v-read [data-i="${i}"]`).forEach(e=>e.classList.add('sel'));
  if(VIEW==='read')syncSel();
  const [s,a]=sa(i);const sv=SV.a.includes(i);
  const mealsBlock=`<div class="mt" style="margin-top:10px">${mealOf(i)}</div>`;
  $('sheet').innerHTML=`<div class="grab"></div><div class="hd"><b>${esc(sn(s))} · ${s}:${a}</b><button class="ib" data-act="close">${ic('x')}</button></div>
  <div class="ar" style="text-align:right;text-align-last:auto;font-size:calc(var(--arfs)*.9)">${D.t[i]} <span class="am">${arD(a)}</span></div>
  ${mealsBlock}
  ${NOTES[i]?`<div class="mt" style="white-space:pre-wrap;margin-top:10px;border-left:3px solid var(--gold);padding-left:10px;font-size:14px">${esc(NOTES[i])}</div>`:''}
  <div class="acts"><button data-act="plAy" data-i="${i}">${ic('play')}${t('play')}</button><button data-act="cpy" data-i="${i}">${ic('copy')}${t('copy')}</button><button data-act="sv" data-i="${i}" class="${sv?'on':''}">${ic('star')}${sv?t('unsave'):t('save')}</button><button data-act="shr" data-i="${i}">${ic('share')}${t('share')}</button><button data-act="nt" data-i="${i}">${ic('note')}${t('note')}</button><button data-act="bma" data-i="${i}">${ic('bm')}${t('bmHere')}</button>
  ${VIEW==='read'?`<button data-act="multiFrom" data-i="${i}">${ic('sel')}${t('multi')}</button>`:`<button data-act="goAy" data-i="${i}">${ic('book')}${t('read')}</button>`}</div>
`;
  openOv();$('sheet').classList.add('on');
}
function modal(html){$('modal').innerHTML=html;openOv();$('modal').classList.add('on')}
function moreMenu(){
  modal(`<div class="hd"><b>${t('app')}</b><button class="ib" data-act="close">${ic('x')}</button></div>
  <div class="seg langs" style="display:flex;margin-bottom:12px">${LANGS.map(l=>`<button data-lg="${l}" class="${S.lang===l?'on':''}" style="flex:1">${LANGN[l]}</button>`).join('')}</div>
  <div class="mgrid">
  <button data-act="bmNow">${ic('bm')}<span>${t('bmHere')}</span></button><button data-act="saveMenu">${ic('star')}<span>${t('saveT')}</span></button>
  <button data-go="saved">${ic('star')}<span>${t('saved')}</span></button><button data-go="notes">${ic('note')}<span>${t('notes')}</span></button>
  <button data-act="copyM">${ic('copy')}<span>${t('copy')}</span></button><button data-act="shrPage">${ic('share')}<span>${t('share')}</span></button>
  <button data-act="multi">${ic('sel')}<span>${t('multi')}</span></button><button data-act="plList">${ic('list')}<span>${t('plist')}</span></button>
  <button data-act="setM">${ic('set')}<span>${t('settings')}</span></button><button data-act="fsT">${ic('fs')}<span>${t('fs')}</span></button></div>`)}
function settingsModal(){
  const th=[['light','#fffaf0'],['dark','#151d19'],['sepia','#f5e9cf'],['classic','#0b4a3b']];
  const tog=(k)=>`<div class="seg" style="display:flex"><button data-tg="${k}:1" class="${S[k]?'on':''}" style="flex:1">${t('on')}</button><button data-tg="${k}:0" class="${!S[k]?'on':''}" style="flex:1">${t('off')}</button></div>`;
  modal(`<div class="hd"><b>${t('settings')}</b><button class="ib" data-act="close">${ic('x')}</button></div>
  <div class="lbl">${t('lang')}</div><div class="seg langs" style="display:flex">${LANGS.map(l=>`<button data-lg="${l}" class="${S.lang===l?'on':''}" style="flex:1">${LANGN[l]}</button>`).join('')}</div>
  <div class="lbl">${t('theme')}</div><div class="themes">${th.map(x=>`<button data-th="${x[0]}" class="${S.theme===x[0]?'on':''}"><span class="sw" style="background:${x[1]}"></span>${t(x[0])}</button>`).join('')}</div>
  <div class="lbl">${t('quran')}</div><div class="cols"><div><div class="muted" style="font-size:13px;margin-bottom:6px">${t('afs')}</div><div class="step"><button data-st="fs:-10">−</button><span>${S.fs}%</span><button data-st="fs:10">+</button></div></div>
  <div><div class="muted" style="font-size:13px;margin-bottom:6px">${t('alh')}</div><div class="step"><button data-st="lh:-0.1">−</button><span>${(+S.lh).toFixed(1)}</span><button data-st="lh:0.1">+</button></div></div></div>
  <div class="muted" style="font-size:13px;margin:12px 0 6px">${t('afont')}</div><select id="fontSel" style="width:100%">${Object.keys(FONTN).filter(k=>k!=='qcf'||QCF_OK).map(k=>`<option value="${k}"${S.font===k?' selected':''}>${FONTN[k]}</option>`).join('')}</select>
  ${QCF_OK?`<div style="margin-top:12px"><div class="muted" style="font-size:13px;margin-bottom:6px">${t('qcfL')}</div>${tog('qcf')}</div>`:''}
  <div class="cols" style="margin-top:12px"><div><div class="muted" style="font-size:13px;margin-bottom:6px">${t('dblp')}</div>${tog('dbl')}</div><div><div class="muted" style="font-size:13px;margin-bottom:6px">${t('flip')}</div>${tog('flip')}</div></div>
  <div class="lbl">${t('meal')}</div><select id="mealSel" style="width:100%;margin-bottom:10px">${mealChoices().map(c=>`<option value="${c[0]}"${(curMealId()===c[0])?' selected':''}>${esc(c[1])}</option>`).join('')}</select><div class="cols"><div><div class="muted" style="font-size:13px;margin-bottom:6px">${t('mfs')}</div><div class="step"><button data-st="mfs:-1">−</button><span>${S.mfs}px</span><button data-st="mfs:1">+</button></div></div>
</div>
  <div class="btns" style="justify-content:space-between"><button class="btn s" data-act="backup">${ic('sv',16)} ${t('backup')}</button><button class="btn s" data-act="reset">${t('reset')}</button></div>
  <div class="btns" style="justify-content:flex-start"><button class="btn d" data-act="wipe">${ic('trash',16)} ${t('wipe')}</button></div>`);
  $('fontSel').onchange=e=>{S.font=e.target.value;applySet();if(VIEW==='read')renderPage()};
  $('mealSel').onchange=e=>{S.meal=e.target.value;applySet();if(EXTRA_MEALS.some(x=>x.id===S.meal))loadMeal(S.meal);rerenderMeal()};
}
function copyModal(){
  const hasSel=MSEL&&MSEL.size||SEL>=0;const lab=MSEL&&MSEL.size?`${MSEL.size} ${t('nsel')}`:SEL>=0?sa(SEL).join(':'):'';
  const opts=['ar','meal','both','tab'];const nm=c=>t(c==='ar'?'cAr':c==='meal'?'cMeal':c==='both'?'cBoth':'cTab');
  modal(`<div class="hd"><b>${t('copyT')}</b><button class="ib" data-act="close">${ic('x')}</button></div>
  <div class="lbl">${t('scopeSel')}${lab?' · '+lab:''}</div><div class="cols">${opts.map(c=>`<button class="btn s" data-cp="sel:${c}"${hasSel?'':' disabled style="opacity:.5"'}>${nm(c)}</button>`).join('')}</div>
  <div class="cols" style="margin-top:8px"><button class="btn s" data-ex="sel:word"${hasSel?'':' disabled style="opacity:.5"'}>${ic('dl',14)} ${t('exWord')}</button><button class="btn s" data-ex="sel:csv"${hasSel?'':' disabled style="opacity:.5"'}>${ic('dl',14)} ${t('exExcel')}</button></div>
  <div class="lbl">${t('scopePage')} · ${PAGE}</div><div class="cols">${opts.map(c=>`<button class="btn s" data-cp="page:${c}">${nm(c)}</button>`).join('')}</div>
  <div class="cols" style="margin-top:8px"><button class="btn s" data-ex="page:word">${ic('dl',14)} ${t('exWord')}</button><button class="btn s" data-ex="page:csv">${ic('dl',14)} ${t('exExcel')}</button></div>
  <p class="muted" style="font-size:12px;margin:10px 0 0">${t('dlNote')}</p>`);
}
function noteModal(i){const [s,a]=sa(i);
  modal(`<div class="hd"><b>${t('note')} · ${esc(sn(s))} ${s}:${a}</b><button class="ib" data-act="close">${ic('x')}</button></div><textarea id="nta" placeholder="${t('notePh')}">${esc(NOTES[i]||'')}</textarea>
  <div class="btns">${NOTES[i]?`<button class="btn d" data-act="ndel" data-i="${i}">${t('del')}</button>`:''}<button class="btn s" data-act="close">${t('cancel')}</button><button class="btn" data-act="nsave" data-i="${i}">${t('ok')}</button></div>`);
  setTimeout(()=>$('nta').focus(),60)}
const backupData=()=>JSON.stringify({v:2,sv:SV,notes:NOTES,bm:BM,read:READ,last:LAST,pls:PLS});
function backupModal(){
  modal(`<div class="hd"><b>${t('backup')}</b><button class="ib" data-act="close">${ic('x')}</button></div><p class="muted" style="margin-top:0">${t('backupH')}</p>
  <div class="btns" style="justify-content:flex-start;margin:0 0 10px"><button class="btn" data-act="bdl">${ic('dl',16)} ${t('dlFile')}</button><button class="btn s" data-act="bup">${ic('up',16)} ${t('upFile')}</button></div>
  <textarea id="bta">${esc(backupData())}</textarea><p class="muted" style="font-size:12px">${t('dlNote')}</p>
  <div class="btns"><button class="btn s" data-act="bcopy">${ic('copy',16)} ${t('copy')}</button><button class="btn" data-act="brest">${t('restore')}</button></div>`)}
function restoreFrom(txt){try{const o=JSON.parse(txt);
  if(o.sv)SV=Object.assign({p:[],a:[],s:[],j:[]},o.sv);else if(Array.isArray(o.saved))SV.a=o.saved;
  if(o.notes)NOTES=o.notes;if('bm' in o)BM=o.bm;if(typeof o.read==='string')READ=o.read;if(o.last)LAST=o.last;if(Array.isArray(o.pls))PLS=o.pls;
  saveSV();LS.set('notes',NOTES);LS.set('bm',BM);LS.set('read',READ);LS.set('last',LAST);LS.set('pls',PLS);closeAll();toast(t('restored'));rerender()}catch(err){toast(t('impErr'))}}
function wipeModal(){modal(`<div class="hd"><b>${t('wipe')}</b><button class="ib" data-act="close">${ic('x')}</button></div><p class="mt">${t('wipeQ')}</p><div class="btns"><button class="btn s" data-act="close">${t('cancel')}</button><button class="btn d" data-act="wipeY">${ic('trash',16)} ${t('del')}</button></div>`)}
async function wipeAll(){try{Object.keys(localStorage).filter(k=>k.startsWith('qk_')).forEach(k=>localStorage.removeItem(k))}catch(e){}
  try{indexedDB.deleteDatabase('qk')}catch(e){}
  S=Object.assign({},DEF);SV={p:[],a:[],s:[],j:[]};NOTES={};BM=null;LAST=1;READ='';PLS=[];applySet();closeAll();toast(t('wipeDone'));rerender()}

/* ---------- copy / export / share ---------- */
function selIds(){return MSEL&&MSEL.size?[...MSEL].sort((a,b)=>a-b):SEL>=0?[SEL]:[]}
function pageIds(){const a=PFIRST[PAGE],b=PFIRST[(isDbl()&&PAGE<604?PAGE+2:PAGE+1)];const r=[];for(let i=a;i<b;i++)r.push(i);return r}
function txtFor(i,c){const [s,a]=sa(i);const m=mealTxt(i);
  return c==='ar'?`${D.t[i]} ﴿${arD(a)}﴾`:c==='meal'?`${a}. ${m}`:`${D.t[i]} ﴿${arD(a)}﴾\n${a}. ${m}`}
function tabFor(ids){const head=[t('surah'),t('ayah'),'Arabic',...MEALS.map(m=>m.name)].join('\t');
  return head+'\n'+ids.map(i=>{const [s,a]=sa(i);return [sn(s),`${s}:${a}`,D.t[i],...MEALS.map(m=>(m.arr[i]||'').replace(/\s+/g,' '))].join('\t')}).join('\n')}
function refRange(ids){const [s1,a1]=sa(ids[0]),[s2,a2]=sa(ids[ids.length-1]);return `${sn(s1)} ${s1}:${a1}${ids.length>1?'–'+(s2!==s1?s2+':':'')+a2:''}`}
function doCopy(scope,c){const ids=scope==='sel'?selIds():pageIds();if(!ids.length)return;
  const txt=c==='tab'?tabFor(ids):ids.map(i=>txtFor(i,c)).join(c==='ar'?' ':'\n\n')+`\n— ${refRange(ids)}`;copyText(txt)}
function copyText(txt){const ok=()=>toast(t('copied'));
  const fb=()=>{const ta=document.createElement('textarea');ta.value=txt;ta.style.position='fixed';ta.style.opacity='0';document.body.appendChild(ta);ta.select();try{document.execCommand('copy');ok()}catch(e){}ta.remove()};
  try{navigator.clipboard.writeText(txt).then(ok,fb)}catch(e){fb()}}
function download(name,mime,content){try{const b=new Blob([content],{type:mime});const u=URL.createObjectURL(b);const a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(u);a.remove()},1500)}catch(e){copyText(typeof content==='string'?content:'')}}
const csvCell=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
function exportRows(ids,withNotes){return ids.map(i=>{const [s,a]=sa(i);return {ref:`${sn(s)} ${s}:${a}`,ar:D.t[i],meals:MEALS.map(m=>m.arr[i]||''),note:NOTES[i]||''}})}
function doExport(kind,fmt){let ids,title;
  if(kind==='notes'){ids=Object.keys(NOTES).map(Number).sort((a,b)=>a-b);title=t('notes')}else if(kind==='sel'){ids=selIds();title=ids.length?refRange(ids):''}else{ids=pageIds();title=`${t('page')} ${PAGE}`}
  if(!ids.length)return;const rows=exportRows(ids);const wn=kind==='notes';const stamp=new Date().toISOString().slice(0,10);
  if(fmt==='csv'){const head=[t('ayah'),'Arabic',...MEALS.map(m=>m.name),...(wn?[t('note')]:[])].map(csvCell).join(',');
    const body=rows.map(r=>[r.ref,r.ar,...r.meals,...(wn?[r.note]:[])].map(csvCell).join(',')).join('\r\n');
    download(`ariun-kuran-${kind}-${stamp}.csv`,'text/csv;charset=utf-8','﻿'+head+'\r\n'+body)}
  else{const html=`<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word"><head><meta charset="utf-8"><title>${esc(title)}</title><style>body{font-family:Calibri,Arial}td,th{border:1px solid #999;padding:6px;vertical-align:top}.ar{font-family:'Traditional Arabic','Amiri',serif;font-size:18pt;direction:rtl;text-align:right}table{border-collapse:collapse;width:100%}</style></head><body><h2>${esc(t('app'))} — ${esc(title)}</h2><table><tr><th>${esc(t('ayah'))}</th><th>Arabic</th>${MEALS.map(m=>`<th>${esc(m.name)}</th>`).join('')}${wn?`<th>${esc(t('note'))}</th>`:''}</tr>${rows.map(r=>`<tr><td>${esc(r.ref)}</td><td class="ar">${esc(r.ar)}</td>${r.meals.map(x=>`<td>${esc(x)}</td>`).join('')}${wn?`<td>${esc(r.note)}</td>`:''}</tr>`).join('')}</table></body></html>`;
    download(`ariun-kuran-${kind}-${stamp}.doc`,'application/msword',html)}}
function shareLink(hash){return location.href.split('#')[0]+'#'+hash}
function doShare(text,hash){const url=shareLink(hash);const data={title:t('app'),text,url};
  try{if(navigator.share&&!INL){navigator.share(data).catch(()=>{});return}}catch(e){}
  copyText(text+'\n'+url);toast(t('shared'))}
let tt;function toast(m){const e=$('toast');e.textContent=m;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2200)}

/* ---------- multi select ---------- */
function startMulti(first){MSEL=new Set(first!=null?[first]:[]);LASTMS=first!=null?first:-1;closeAll();if(VIEW==='read')renderPage();updSelbar()}
function endMulti(){if(!MSEL)return;MSEL=null;$('selbar').classList.remove('on');if(VIEW==='read')renderPage()}
function updSelbar(){const b=$('selbar');if(!MSEL){b.classList.remove('on');return}
  b.innerHTML=`<b>${MSEL.size?MSEL.size+' '+t('nsel'):t('selHint')}</b><button data-act="mplay">${t('play')}</button><button data-act="mcopy">${t('copy')}</button><button data-act="msave">${t('save')}</button><button data-act="mshare">${t('share')}</button><button data-act="mend">✕</button>`;b.classList.add('on')}
function toggleMulti(i){if(MSEL.has(i))MSEL.delete(i);else MSEL.add(i);LASTMS=i;document.querySelectorAll(`#v-read [data-i="${i}"]`).forEach(e=>e.classList.toggle('ms',MSEL.has(i)));updSelbar()}
function rangeMulti(i){const from=LASTMS>=0?LASTMS:(SEL>=0?SEL:i);if(!MSEL)MSEL=new Set();const a=Math.min(from,i),b=Math.max(from,i);for(let x=a;x<=b;x++)MSEL.add(x);LASTMS=i;if(VIEW==='read')renderPage();updSelbar()}

function rerender(){buildChrome();show(VIEW)}
let FILEMODE='backup';

/* ---------- events ---------- */
let LASTCLICK={i:-1,t:0};
document.addEventListener('click',e=>{
  if(e.target.closest('details.fnd'))return;   /* dipnot kutusu: âyet menüsünü açmasın */
  const k=e.target.closest('[data-key]');if(k){kbKey(k.dataset.kb,k.dataset.key);return}
  const kl=e.target.closest('[data-kbl]');if(kl){const id=kl.dataset.kb;const box=$(id);box.outerHTML=kbHTML(id,kl.dataset.kbl);$(id).classList.add('on');return}
  const ko=e.target.closest('[data-kbopen]');if(ko){$(ko.dataset.kbopen).classList.toggle('on');return}
  const kc=e.target.closest('[data-kbclose]');if(kc){$(kc.dataset.kbclose).classList.remove('on');return}
  const g=e.target.closest('[data-go]');if(g){closeAll();const v=g.dataset.go;if(v==='read')goPage(PAGE);else{if(v==='topics')TOPIC=null;show(v)}return}
  const st=e.target.closest('[data-st]');if(st){const [kk,d]=st.dataset.st.split(':');const lim={fs:[50,220],lh:[1.4,3.4],mfs:[12,28]}[kk];S[kk]=Math.round(Math.min(lim[1],Math.max(lim[0],+S[kk]+ +d))*10)/10;applySet();settingsModal();return}
  const tg=e.target.closest('[data-tg]');if(tg){const [kk,v]=tg.dataset.tg.split(':');S[kk]=v==='1';applySet();settingsModal();if(VIEW==='read')renderPage();return}
  const th=e.target.closest('[data-th]');if(th){S.theme=th.dataset.th;applySet();settingsModal();return}
  const lg=e.target.closest('[data-lg]');if(lg){const inMore=!!lg.closest('#modal .mgrid')||!$('fontSel');S.lang=lg.dataset.lg;applySet();buildChrome();show(VIEW);if($('modal').classList.contains('on')){if(document.querySelector('#modal .mgrid'))moreMenu();else settingsModal()}return}
  const cp=e.target.closest('[data-cp]');if(cp){const [sc,c]=cp.dataset.cp.split(':');doCopy(sc,c);closeAll();return}
  const ex=e.target.closest('[data-ex]');if(ex){const [kind,fmt]=ex.dataset.ex.split(':');doExport(kind,fmt);return}
  const tp=e.target.closest('[data-topic]');if(tp){const v=tp.dataset.topic;TOPIC=v==='-'?null:v.split(':').map(Number);renderTopics();setHash();scrollTo(0,0);return}
  const pr=e.target.closest('[data-playrefs]');if(pr){playQueue(refIdx(pr.dataset.playrefs),0);return}
  if(elfClick(e))return;
  if(e.target.closest('#fback')){FPAUSE=false;renderFback();if(PL.cur>=0){if(!onPage(PL.cur))goPage(P[PL.cur],null,false);else{const x=document.querySelector('#v-read .pl');if(x)x.scrollIntoView({block:'center',behavior:'smooth'})}}return}
  const st2=e.target.closest('[data-st2]');if(st2){STAB=st2.dataset.st2;renderSearch();return}
  const svt=e.target.closest('[data-svtab]');if(svt){SVTAB=svt.dataset.svtab;renderSaved();return}
  const sva=e.target.closest('[data-svadd]');if(sva){svAdd(sva.dataset.svadd);closeAll();return}
  const svd=e.target.closest('[data-svdel]');if(svd){const [k2,v]=svd.dataset.svdel.split(':');SV[k2]=SV[k2].filter(x=>x!=+v);saveSV();renderSaved();return}
  const svg=e.target.closest('[data-svgo]');if(svg){const [k2,v]=svg.dataset.svgo.split(':');if(k2==='p')goPage(+v);else if(k2==='s')goAyah(START[+v-1]);else goAyah(JFIRST[+v]);return}
  const plt=e.target.closest('[data-plt]');if(plt){PLT=plt.dataset.plt;playlistModal();return}
  const plp=e.target.closest('[data-plplay]');if(plp){const p=PLS[+plp.dataset.plplay];closeAll();playQueue(p.q,0);return}
  const pld=e.target.closest('[data-pldel]');if(pld){PLS.splice(+pld.dataset.pldel,1);LS.set('pls',PLS);playlistModal();return}
  const act=e.target.closest('[data-act]');if(act){const a=act.dataset.act,i=+act.dataset.i;
    if(a==='close')closeAll();
    else if(a==='next')goPage(PAGE+step());else if(a==='prev')goPage(PAGE-step());
    else if(a==='read'){setRead(PAGE,!isRead(PAGE));if(isDbl()&&PAGE<604)setRead(PAGE+1,isRead(PAGE));renderPage()}
    else if(a==='bm'||a==='bmNow'){BM={p:PAGE,i:SEL>=0&&onPage(SEL)?SEL:PFIRST[PAGE]};LS.set('bm',BM);toast(t('bmSet'));closeAll();if(VIEW==='read')renderPage();else syncSel()}
    else if(a==='bma'){BM={p:P[i],i};LS.set('bm',BM);toast(t('bmSet'));closeAll();syncSel()}
    else if(a==='cont')goPage(LAST);else if(a==='bmgo'&&BM)goAyah(BM.i);
    else if(a==='mealview'){S.view=MEALS.length?'meal':'both';applySet();buildChrome();goPage(PAGE)}
    else if(a==='cpy'){SEL=i;copyModal()}
    else if(a==='copyM')copyModal();
    else if(a==='sv'){const k3=SV.a.indexOf(i);if(k3>=0)SV.a.splice(k3,1);else SV.a.push(i);saveSV();openSheet(i)}
    else if(a==='saveMenu')saveMenu();
    else if(a==='shr'){const [s,ay]=sa(i);doShare(`${D.t[i]}\n${mealTxt(i)}\n— ${sn(s)} ${s}:${ay}`,`a-${s}-${ay}`)}
    else if(a==='shrPage'){closeAll();doShare(`${t('app')} — ${t('page')} ${PAGE}`,`p-${PAGE}`)}
    else if(a==='nt')noteModal(i);
    else if(a==='goAy'){closeAll();goAyah(i)}
    else if(a==='plAy'){closeAll();playFrom(i)}
    else if(a==='playSurah'){const s=+act.dataset.s;S.range=S.range==='page'?'surah':S.range;applySet();playFrom(START[s-1])}
    else if(a==='nsave'){const v=$('nta').value.trim();if(v)NOTES[i]=v;else delete NOTES[i];LS.set('notes',NOTES);closeAll();if(VIEW==='notes')renderNotes()}
    else if(a==='ndel'){delete NOTES[i];LS.set('notes',NOTES);closeAll();if(VIEW==='notes')renderNotes()}
    else if(a==='reset'){const keep={lang:S.lang,view:S.view,meal:S.meal,rec:S.rec};S=Object.assign({},DEF,keep);applySet();settingsModal()}
    else if(a==='multi'){closeAll();if(MSEL)endMulti();else{if(VIEW!=='read')goPage(PAGE);startMulti()}}
    else if(a==='multiFrom')startMulti(i);
    else if(a==='mend')endMulti();
    else if(a==='mcopy')copyModal();
    else if(a==='mplay'){if(MSEL&&MSEL.size)playQueue([...MSEL].sort((x,y)=>x-y),0)}
    else if(a==='mshare'){const ids=selIds();if(ids.length){const [s,ay]=sa(ids[0]);doShare(ids.map(x=>txtFor(x,'both')).join('\n\n')+`\n— ${refRange(ids)}`,`a-${s}-${ay}`)}}
    else if(a==='msave'){for(const x of MSEL)if(!SV.a.includes(x))SV.a.push(x);saveSV();toast(t('svDone')+' · '+MSEL.size)}
    else if(a==='backup')backupModal();
    else if(a==='bcopy')copyText($('bta').value);
    else if(a==='bdl')download(`ariun-kuran-backup-${new Date().toISOString().slice(0,10)}.json`,'application/json',backupData());
    else if(a==='bup'){FILEMODE='backup';$('fileIn').click()}
    else if(a==='brest')restoreFrom($('bta').value);
    else if(a==='wipe')wipeModal();
    else if(a==='wipeY')wipeAll();
    else if(a==='setM')settingsModal();
    else if(a==='fsT'){closeAll();toggleFS()}
    else if(a==='install'){if(DEFERRED_INSTALL){DEFERRED_INSTALL.prompt();DEFERRED_INSTALL=null;if(VIEW==='home')renderHome()}}
    else if(a==='plToggle')togglePlay();else if(a==='plPrev')skip(-1);else if(a==='plNext')skip(1);
    else if(a==='plClose'){AU.pause();PL.playing=false;PL.open=false;renderPlayer()}
    else if(a==='plMin'||a==='plMax'){S.plMin=a==='plMin';applySet();renderPlayer()}
    else if(a==='plCap'){S.cap=!S.cap;applySet();renderPlayer()}
    else if(a==='plList')playlistModal();
    else if(a==='plGo'){const q=plCollect();if(!q.length){toast(t('plEmpty'));return}closeAll();playQueue(q,0)}
    else if(a==='plSave'){const q=plCollect();if(!q.length){toast(t('plEmpty'));return}const nm=($('plnm').value||'').trim()||`${t('plist')} ${PLS.length+1}`;PLS.push({n:nm,q});LS.set('pls',PLS);playlistModal()}
    return}
  const sc=e.target.closest('[data-s]');if(sc){goAyah(START[+sc.dataset.s-1]);return}
  const di=e.target.closest('[data-i]');if(di){const i=+di.dataset.i;
    if(di.matches('.ay,.it,.qw')){
      if(e.ctrlKey||e.metaKey){if(!MSEL){MSEL=new Set();updSelbar()}toggleMulti(i);return}
      if(e.shiftKey){rangeMulti(i);return}
      if(MSEL){toggleMulti(i);return}
      const now=Date.now();if(LASTCLICK.i===i&&now-LASTCLICK.t<350&&matchMedia('(pointer:fine)').matches){closeAll();playFrom(i);LASTCLICK={i:-1,t:0};return}
      LASTCLICK={i,t:now};openSheet(i)}
    else if(VIEW==='read'||VIEW==='home'||di.matches('.sc'))goAyah(i);else openSheet(i);return}
});
$('ov').onclick=closeAll;
$('menuB').onclick=()=>{$('side').classList.add('open');$('scrim').classList.add('on');ovOpened()};
$('scrim').onclick=closeSide;
function closeSide(){const was=$('side').classList.contains('open');$('side').classList.remove('open');$('scrim').classList.remove('on');if(was)ovClosed()}
$('selS').onchange=e=>goAyah(START[+e.target.value-1]);
$('selA').onchange=e=>goAyah(gi(+$('selS').value,+e.target.value));
$('selJ').onchange=e=>goAyah(JFIRST[+e.target.value]);
['tpIn','mbIn'].forEach(id=>{$(id).onchange=e=>goPage(+e.target.value||PAGE);$(id).onkeydown=e=>{if(e.key==='Enter')e.target.blur()}});
$('tpNext').onclick=$('mbNext').onclick=$('saL').onclick=()=>goPage(PAGE+step());
$('tpPrev').onclick=$('mbPrev').onclick=$('saR').onclick=()=>goPage(PAGE-step());
$('mbRead').onclick=()=>{setRead(PAGE,!isRead(PAGE));renderPage()};
$('mbPlay').onclick=$('playTB').onclick=()=>{PL.open=true;togglePlay()};
$('mbMore').onclick=moreMenu;
$('savedB').onclick=saveMenu;
$('notesB').onclick=()=>show('notes');
$('bmB').onclick=()=>{BM={p:PAGE,i:SEL>=0&&onPage(SEL)?SEL:PFIRST[PAGE]};LS.set('bm',BM);toast(t('bmSet'));if(VIEW==='read')renderPage();else syncSel()};
$('copyB').onclick=copyModal;$('setB').onclick=settingsModal;
$('langB').onclick=()=>{S.lang=LANGS[(LANGS.indexOf(S.lang)+1)%LANGS.length];applySet();rerender()};
function toggleFS(){try{if(document.fullscreenElement)document.exitFullscreen();else document.documentElement.requestFullscreen().catch(()=>{})}catch(e){}}
$('fsB').onclick=toggleFS;
function setView(v){S.view=v;applySet();document.querySelectorAll('#viewSeg button').forEach(x=>x.classList.toggle('on',x.dataset.v===v));$('selV').value=v;if(VIEW==='read')renderPage();else goPage(PAGE)}
$('viewSeg').onclick=e=>{const b=e.target.closest('button');if(b)setView(b.dataset.v)};
$('selV').onchange=e=>setView(e.target.value);
$('fileIn').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>restoreFrom(String(r.result));r.readAsText(f,'utf-8');e.target.value=''};
document.addEventListener('keydown',e=>{if(e.target.matches('input,textarea,select'))return;
  if(e.key==='Escape'){closeAll();endMulti()}
  else if(VIEW==='read'&&e.key==='ArrowLeft')goPage(PAGE+step());else if(VIEW==='read'&&e.key==='ArrowRight')goPage(PAGE-step());
  else if(e.key===' '&&VIEW==='read'){e.preventDefault();PL.open=true;togglePlay()}
  else if(e.key==='/'){e.preventDefault();show('search')}});
let tx0=0,ty0=0;
document.addEventListener('touchstart',e=>{const p=e.touches[0];tx0=p.clientX;ty0=p.clientY},{passive:true});
document.addEventListener('touchend',e=>{if(VIEW!=='read'||$('sheet').classList.contains('on')||$('modal').classList.contains('on'))return;const p=e.changedTouches[0];const dx=p.clientX-tx0,dy=p.clientY-ty0;
  if(Math.abs(dx)>70&&Math.abs(dy)<60&&!e.target.closest('.player,.selbar,select,input')){goPage(PAGE+(dx>0?1:-1)*step())}},{passive:true});
let lastY=0;addEventListener('scroll',()=>{const y=scrollY;if(innerWidth<=900){if(y>lastY+8&&y>80)$('top').classList.add('hid');else if(y<lastY-8)$('top').classList.remove('hid')}lastY=y},{passive:true});
/* yalnız genişlik değişince yeniden çiz: telefonda adres çubuğu inip kalkınca (yükseklik) sayfa yeniden çizilip okunan âyete atlamasın */
let rzT,rzW=innerWidth;addEventListener('resize',()=>{$('saL').style.display=$('saR').style.display=VIEW==='read'&&innerWidth>900?'grid':'none';if(innerWidth===rzW)return;rzW=innerWidth;clearTimeout(rzT);rzT=setTimeout(()=>{if(VIEW==='read')renderPage()},200)});
/* ses çalarken kullanıcı kendisi kaydırınca takip durur; okunan âyet yeniden ekrana gelince ya da «Okunan âyete dön» ile sürer */
let USCR=0,FPAUSE=false,uscT;const plVisible=()=>{const e=document.querySelector('#v-read .pl');if(!e)return false;const r=e.getBoundingClientRect();return r.bottom>60&&r.top<innerHeight-120};
function renderFback(){const b=$('fback');if(!b)return;const on=FPAUSE&&PL.playing&&VIEW==='read'&&S.follow;b.classList.toggle('on',on);if(on)b.innerHTML=`${ic('head',16)} ${t('backToCur')}`}
const userScrolled=()=>{USCR=Date.now();if(!(PL.playing&&VIEW==='read'&&S.follow))return;FPAUSE=true;clearTimeout(uscT);uscT=setTimeout(()=>{if(plVisible())FPAUSE=false;renderFback()},450);renderFback()};['wheel','touchmove'].forEach(ev=>addEventListener(ev,userScrolled,{passive:true}));addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','PageDown','PageUp','Home','End'].includes(e.key))userScrolled()});
function route(){const h=(location.hash||'').slice(1);let m;
  if((m=h.match(/^p-(\d+)$/))){PAGE=Math.min(604,Math.max(1,+m[1]));show('read')}
  else if((m=h.match(/^a-(\d+)-(\d+)$/))&&+m[1]>=1&&+m[1]<=114){const s=+m[1],a=Math.min(C[s-1],Math.max(1,+m[2]));goAyah(gi(s,a))}
  else if(VIEWS.includes(h))show(h);else show('home')}
addEventListener('hashchange',()=>{const h=location.hash.slice(1);if(h!==(VIEW==='read'?'p-'+PAGE:VIEW))route()});
addEventListener('beforeinstallprompt',e=>{e.preventDefault();DEFERRED_INSTALL=e;if(VIEW==='home')renderHome()});

/* ---------- init ---------- */
let MEALS_LOADED=false;
applySet();buildChrome();route();
const ld=$('boot');if(ld)ld.remove();
getJSON('meals').then(arr=>{for(const m of (Array.isArray(arr)?arr:[]))if(m&&Array.isArray(m.arr)&&m.arr.length===N)addMeal(m,'emb')}).catch(()=>{}).then(()=>{{const id=S.meal||S.lang;if(EXTRA_MEALS.some(e=>e.id===id))loadMeal(id)}
  MEALS_LOADED=true;if(VIEW==='read'||VIEW==='home'||VIEW==='search')show(VIEW)});
if('serviceWorker' in navigator&&!INL&&/^https?:/.test(location.protocol)){navigator.serviceWorker.register('sw.js').catch(()=>{})}
})().catch(err=>{const b=document.getElementById('boot');if(b)b.textContent='Error: '+err.message;console.error(err)});
