/* ---------- elifba (v8) ----------
   Müfredat → ders → alt sayfa. Sağda görüntüleyici (büyük öğe, sayaç, önceki/sonraki, sırayla göster/oku, slayt).
   Örnek kelimeler Kur'an metnimizden (D.t, Medine imlası) program ile seçilir; her örnek geçtiği âyete bağlıdır.
   Harf/kelime ses kaydı yok: yalnız âyet sesi (hafız) çalınır. Bu dosya build.py ile app.js'in içine eklenir. */
const ELF_LS='elf';let ELFP=LS.get(ELF_LS,{});
const ELS=Object.assign({les:1,sub:0},LS.get('elfpos',{}));if(!ELIFBA[ELS.les]||ELIFBA[ELS.les].part)ELS.les=1;let VW={items:[],k:0};let SEQ=null;
function lname(k){return (LNAME[S.lang]||LNAME.mn)[k]}
function formsOf(ch){const z='‍';const nj=NONJOIN.includes(ch);return [ch, nj?ch:ch+z, nj?z+ch:z+ch+z, z+ch]}
const AR_NAMES='ألف باء تاء ثاء جيم حاء خاء دال ذال راء زاي سين شين صاد ضاد طاء ظاء عين غين فاء قاف كاف لام ميم نون هاء واو ياء'.split(' ');
const HEAVY='خصضغطقظ';
const SIMILAR=[['ب','ت','ث','ن','ي'],['ج','ح','خ'],['د','ذ'],['ر','ز'],['س','ش'],['ص','ض'],['ط','ظ'],['ع','غ'],['ف','ق']];
const FA='\u064e',KA='\u0650',DA='\u064f',SK='\u06e1',SH='\u0651',TF='\u064b',TK='\u064d',TD='\u064c',MD='\u0653';
const BASE='بتثجحخدذرزسشصضطظعغفقكلمنهوي';
const MARKS=/[\u064b-\u065f\u0670\u06d6-\u06ed]/;

/* ders → alt sayfalar (x: content.js'teki ders anahtarı) */
function subsOf(l){return subsRaw(l).filter(s=>s!=='ayat'||!!l.refs)}
function subsRaw(l){const x=l.x||'';const vow={fa:FA,ka:KA,da:DA};
  if(x==='letters')return ['intro','letters','names','sounds','shapes','similar'];
  if(x==='forms')return ['intro','forms','shapes'];
  if(/^v:/.test(x))return ['intro','vgrid','words'];
  if(/^v[lt]:/.test(x))return ['intro','vgrid','compare','words'];
  if(x==='sukun')return ['intro','vgrid','kavrama','words'];
  if(x==='shadda')return ['intro','vgrid','words'];
  if(x==='review')return ['intro','ayat'];
  if(x==='vakf')return ['intro','signs','ayat'];
  if(x==='surah')return ['intro'].concat(l.refs.split(',').map((r,k)=>'surah:'+k));
  if(x==='ra'||x==='lafz')return ['intro','rw2','ayat'];
  if(['izhar','ihfa','idb','idm','mim2','iklab','ihfas','kalk'].includes(x))return ['intro','rletters','rwords','ayat'];
  if(['zamir','misl','mutek','madd1','madd2','tenv'].includes(x))return ['intro','rwords','ayat'];
  return ['intro','ayat']}
const lessons=()=>ELIFBA.map((l,k)=>[l,k]).filter(([l])=>!l.part);
const lesNo=k=>lessons().findIndex(([,j])=>j===k)+1;
function subTitle(l,s){if(s.startsWith('surah:')){const r=l.refs.split(',')[+s.slice(6)];const m=r.match(/^(\d+):(\d+)(?:-(\d+))?$/);
    const n=C[+m[1]-1],whole=+m[2]===1&&(m[3]?+m[3]:+m[2])===n;return esc(sn(+m[1]))+(whole?'':` ${m[2]}${m[3]?'–'+m[3]:''}`)}
  if(s==='vgrid')return esc(L(l.t));return esc(L(ELF_T.sub[s]||ELF_T.sub.intro))}
function markSeen(k,s){const a=ELFP[k]||(ELFP[k]=[]);if(!a.includes(s)){a.push(s);LS.set(ELF_LS,ELFP)}}
const lesDone=k=>{const l=ELIFBA[k];const sb=subsOf(l);const a=ELFP[k]||[];return sb.every((_,i)=>a.includes(i))};

/* ---- Kur'an metninden kelime/çift çıkarma (önbellekli) ---- */
let WDB=null;const WC={};
function wdb(){if(WDB)return WDB;const cnt=new Map(),first=new Map(),pairs=[];
  for(let i=0;i<N;i++){const ws=D.t[i].replace(/\u200f/g,'').split(' ').filter(Boolean);
    for(let k=0;k<ws.length;k++){const w=ws[k];cnt.set(w,(cnt.get(w)||0)+1);if(!first.has(w))first.set(w,i);if(k+1<ws.length)pairs.push([w,ws[k+1],i])}}
  const freq=[...cnt.keys()].sort((a,b)=>cnt.get(b)-cnt.get(a));return WDB={cnt,first,pairs,freq}}
const CLC=new Map();const clus=w=>{let out=CLC.get(w);if(out)return out;out=[];for(const ch of w){if(MARKS.test(ch)&&out.length)out[out.length-1]+=ch;else out.push(ch)}CLC.set(w,out);return out};
const bareOf=c=>c[0];const isBare=c=>c.length===1;
function hlw(w,idx){const cs=clus(w);return cs.map((c,k)=>idx.includes(k)?`<span class="hlr">${c}</span>`:c).join('')}
function pickWords(test,n){const db=wdb();const out=[];for(const w of db.freq){if(test(w)){out.push({w,i:db.first.get(w)});if(out.length>=n)break}}return out}
function pickPairs(test,n){const db=wdb();const out=[],seen=new Set();for(const [a,b,i] of db.pairs){const h=test(a,b);if(h&&!seen.has(a+' '+b)){seen.add(a+' '+b);out.push({a,b,i,h});if(out.length>=n)break}}return out}
const V3=FA+KA+DA;
const longOK=(w,v,m)=>new RegExp(v+m+'(?![\\u064b-\\u0652\\u06e1\\u0670])').test(w);
function vowelWords(x){const [kind,v]=x.split(':');const vc={fa:FA,ka:KA,da:DA}[v];
  if(WC[x])return WC[x];let t;
  const B='['+BASE+']';
  if(x==='v:fa')t=w=>new RegExp('^(?:'+B+FA+'){3}$').test(w);
  else if(x==='v:ka')t=w=>new RegExp('^(?:'+B+'['+FA+KA+']){3}$').test(w)&&w.includes(KA);
  else if(x==='v:da')t=w=>new RegExp('^(?:'+B+'['+V3+']){3,4}$').test(w)&&w.includes(DA);
  else if(x==='vl:fa')t=w=>new RegExp('^(?:'+B+FA+'(?:ا)?){2,3}$').test(w)&&longOK(w,FA,'ا');
  else if(x==='vl:ka')t=w=>new RegExp('^(?:'+B+'['+FA+KA+'](?:ي)?){2,3}$').test(w)&&longOK(w,KA,'ي');
  else if(x==='vl:da')t=w=>new RegExp('^(?:'+B+'['+V3+'](?:و)?){2,4}$').test(w)&&longOK(w,DA,'و');
  else if(x==='vt:fa')t=w=>new RegExp('^(?:'+B+'['+V3+']){1,3}'+B+TF+'ا$').test(w);
  else if(x==='vt:ka')t=w=>new RegExp('^(?:'+B+'['+V3+']){1,3}'+B+TK+'$').test(w);
  else if(x==='vt:da')t=w=>new RegExp('^(?:'+B+'['+V3+']){1,3}'+B+TD+'$').test(w);
  else if(x==='sukun')t=w=>new RegExp('^(?:'+B+'['+V3+SK+']){2,4}$').test(w)&&w.includes(SK);
  else if(x==='shadda')t=w=>new RegExp('^(?:'+B+'['+SH+V3+SK+']{1,2}){2,4}$').test(w)&&w.includes(SH);
  return WC[x]=pickWords(t,24).map(o=>({ar:o.w,i:o.i}))}
const fl=w=>{const c=clus(w);return c[0]||''};
const IHFA='تثجدذزسشصضطظفقك',HAMZ='ءأإؤئ';
function ruleItems(x){if(WC['r:'+x])return WC['r:'+x];let r=[];
  const endBare=(w,ch)=>{const c=clus(w);const l=c[c.length-1];return l===ch};
  const pairHL=(a,b)=>({ar:hlw(a,[clus(a).length-1])+' '+hlw(b,[0])});
  const P=(t)=>pickPairs(t,24).map(o=>({...pairHL(o.a,o.b),i:o.i}));
  if(x==='ihfa')r=P((a,b)=>endBare(a,'ن')&&IHFA.includes(bareOf(fl(b))));
  else if(x==='izhar')r=P((a,b)=>a.endsWith('ن'+SK)&&('ء'+'هعحغخ'+HAMZ).includes(bareOf(fl(b))));
  else if(x==='idb')r=P((a,b)=>endBare(a,'ن')&&'لر'.includes(bareOf(fl(b))));
  else if(x==='idm')r=P((a,b)=>endBare(a,'ن')&&'ينمو'.includes(bareOf(fl(b))));
  else if(x==='mim2')r=P((a,b)=>endBare(a,'م')&&bareOf(fl(b))==='م');
  else if(x==='ihfas')r=P((a,b)=>endBare(a,'م')&&bareOf(fl(b))==='ب');
  else if(x==='iklab')r=pickPairs((a,b)=>/ۢ$/.test(a)&&bareOf(fl(b))==='ب',24).map(o=>({...pairHL(o.a,o.b),i:o.i}));
  else if(x==='kalk')r=pickWords(w=>new RegExp('[قطبجد]'+SK).test(w)&&w.length<=9,24).map(o=>({ar:hlw(o.w,clus(o.w).map((c,k)=>'قطبجد'.includes(c[0])&&c.includes(SK)?k:-1).filter(k=>k>=0)),i:o.i}));
  else if(x==='zamir')r=pickWords(w=>/ه[ُِ][ۥۦ]/.test(w)&&w.length<=10,24).map(o=>({ar:hlw(o.w,clus(o.w).map((c,k)=>/^ه[ُِ]/.test(c)?k:-1).filter(k=>k>=0).concat(clus(o.w).map((c,k)=>/^[ۥۦ]/.test(c)?k:-1).filter(k=>k>=0))),i:o.i}));
  else if(x==='misl')r=P((a,b)=>{const c=clus(a),e=c[c.length-1];return isBare(e)&&!'نماويى'.includes(e)&&fl(b)[0]===e&&fl(b).includes(SH)});
  else if(x==='mutek'){const ok=['دت','تد','تط','طت','ذظ','ثذ','لر','بم','قك'];
    r=P((a,b)=>{const c=clus(a),e=c[c.length-1],f=fl(b);return isBare(e)&&f.includes(SH)&&ok.includes(e+f[0])})}
  else if(x==='madd1')r=pickWords(w=>/[اوي]\u0653[ءأؤئإ]/.test(w)&&w.length<=12,24).map(o=>({ar:hlw(o.w,clus(o.w).map((c,k)=>c.includes(MD)?k:-1).filter(k=>k>=0)),i:o.i}));
  else if(x==='madd2'){const mun=P((a,b)=>/[اوي]\u0653$/.test(a)&&HAMZ.includes(bareOf(fl(b)))).slice(0,12);
    const laz=pickWords(w=>/\u0653[^ ]\u0651/.test(w)||/\u0653.[\u064e-\u0650]\u0651/.test(w),12).map(o=>({ar:hlw(o.w,clus(o.w).map((c,k)=>c.includes(MD)?k:-1).filter(k=>k>=0)),i:o.i}));
    r=mun.concat(laz)}
  else if(x==='tenv')r=pickPairs((a,b)=>/[\u064b-\u064d]ا?$/.test(a)&&b.startsWith('ٱ'),24).map(o=>{const c=clus(o.a);const k=c[c.length-1]==='ا'?c.length-2:c.length-1;return {ar:hlw(o.a,[k])+' '+hlw(o.b,[0]),i:o.i}});
  else if(x==='ra'){const th=pickWords(w=>/ر[\u064e\u064f]/.test(w)&&w.length<=8,12),tn=pickWords(w=>/ر\u0650/.test(w)&&w.length<=8,12);
    const mk=(o,re)=>({ar:hlw(o.w,clus(o.w).map((c,k)=>re.test(c)?k:-1).filter(k=>k>=0)),i:o.i});
    r=[{g:L(ELF_T.thick)}].concat(th.map(o=>mk(o,/^ر[\u064e\u064f]/)),[{g:L(ELF_T.thin)}],tn.map(o=>mk(o,/^ر\u0650/)))}
  else if(x==='lafz'){const db=wdb();const thick=[],thin=[],seen=new Set();
    for(const [a,b,i] of db.pairs){if(thick.length>=12&&thin.length>=12)break;
      if(b.startsWith('ٱللَّه')){const m=a.match(/[\u064e\u064f\u0650](?=[^\u064e\u064f\u0650]*$)/);const lc=a[a.length-1];
        if(!m||MARKS.test(lc)&&lc!==m[0])continue;const key=a+' '+b;if(seen.has(key))continue;seen.add(key);
        const it={ar:a+' <span class="hlr">'+b+'</span>',i};/* «الله» bitişik çizildiği için lâmlar ayrı boyanamaz: kelimenin tamamı */(m[0]===KA?thin:thick).length<12&&(m[0]===KA?thin:thick).push(it)}}
    r=[{g:L(ELF_T.thick)}].concat(thick,[{g:L(ELF_T.thin)}],thin)}
  return WC['r:'+x]=r}
const RLET={izhar:'ء ه ع ح غ خ',ihfa:'ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك',idb:'ل ر',idm:'ي ن م و',mim2:'م',iklab:'ب',ihfas:'ب',kalk:'ق ط ب ج د'};

/* ---- alt sayfa → öğe listesi + gövde ---- */
function buildSub(l,s){const it=[];const add=(o)=>{it.push(o);return it.length-1};
  const cell=(k,cls)=>{const o=it[k];return `<button class="eli${cls?' '+cls:''}${k===VW.k?' cur':''}" data-ei="${k}"><span class="ea" dir="rtl">${o.ar}</span>${o.small?`<small>${o.small}</small>`:''}</button>`};
  let body='';const note=s=>`<div class="elnote">${ic('info',16)}<span>${arIn(esc(L(s)))}</span></div>`;
  if(s==='letters'){body=note(ELF_T.n.letters)+`<div class="elg c5">${LETTERS.map((c,k)=>cell(add({ar:c,cap:lname(k)}))).join('')}</div>`}
  else if(s==='names'){body=note(ELF_T.n.names)+`<div class="elg c5">${LETTERS.map((c,k)=>cell(add({ar:c,cap:AR_NAMES[k]+' · '+lname(k),small:`<span dir="rtl" class="arn">${AR_NAMES[k]}</span>${esc(lname(k))}`}),'tall')).join('')}</div>`}
  else if(s==='sounds'){const H=LETTERS.filter(c=>HEAVY.includes(c)),Li=LETTERS.filter(c=>!HEAVY.includes(c));
    body=note(ELF_T.n.sounds)+`<h4 class="elh">${esc(L(ELF_T.light))}</h4><div class="elg c5">${Li.map(c=>cell(add({ar:c,cap:L(ELF_T.light)}))).join('')}</div>
    <h4 class="elh">${esc(L(ELF_T.heavy))}</h4><div class="elg c5">${H.map(c=>cell(add({ar:c,cap:L(ELF_T.heavy)}),'hv')).join('')}</div>`}
  else if(s==='shapes'){const db=wdb();const rows=LETTERS.map((ch,li)=>{const alt=ch==='ا'?'اأإٱ':ch;
      const find=pos=>{for(const w of db.freq){if(w.length>9)continue;const cs=clus(w);const n=cs.length;if(n<3)continue;
        const kk=pos==='s'?[0]:pos==='e'?[n-1]:cs.map((_,k)=>k).slice(1,n-1);
        for(const k of kk)if(alt.includes(cs[k][0])&&!(ch==='ا'&&pos==='s'&&cs[k][0]==='ا'))return {w,k,i:db.first.get(w)}}return null};
      const cs=['s','m','e'].map(find);
      return `<tr><th>${cell(add({ar:ch,cap:lname(li)}),'sm')}</th>${cs.map(o=>`<td>${o?cell(add({ar:hlw(o.w,[o.k]),i:o.i}),'sm'):'—'}</td>`).join('')}</tr>`}).join('');
    body=note(ELF_T.n.shapes)+`<div class="eltab-w"><table class="eltab"><tr><th>${esc(L(ELF_T.letter))}</th><th>${t('ini')}</th><th>${t('med')}</th><th>${t('fin')}</th></tr>${rows}</table></div>`}
  else if(s==='similar'){const db=wdb();
    body=note(ELF_T.n.similar)+SIMILAR.map(g=>{const ws=g.map(ch=>{for(const w of db.freq){if(w.length>8)continue;const cs=clus(w);const k=cs.findIndex(c=>c[0]===ch);if(k>=0&&cs.length>=3)return {w,k,i:db.first.get(w)}}return null});
      return `<div class="elgrp"><div class="elg c5">${g.map(ch=>cell(add({ar:ch,cap:lname(LETTERS.indexOf(ch))}),'sm')).join('')}</div><div class="elg c5">${ws.map(o=>o?cell(add({ar:hlw(o.w,[o.k]),i:o.i}),'sm'):'').join('')}</div></div>`}).join('')}
  else if(s==='forms'){body=note(ELF_T.n.forms)+`<div class="eltab-w"><table class="eltab"><tr><th></th><th>${t('iso')}</th><th>${t('ini')}</th><th>${t('med')}</th><th>${t('fin')}</th></tr>${LETTERS.map((c,k)=>`<tr><th>${esc(lname(k))}</th>${formsOf(c).map(f=>`<td>${cell(add({ar:f,cap:lname(k)}),'sm')}</td>`).join('')}</tr>`).join('')}</table></div>`}
  else if(s==='vgrid'){const x=l.x;const g=x==='sukun'?SK:x==='shadda'?FA+SH:{'v:fa':FA,'v:ka':KA,'v:da':DA,'vl:fa':FA+'ا','vl:ka':KA+'ي','vl:da':DA+'و','vt:fa':TF+'ا','vt:ka':TK,'vt:da':TD}[x];
    const pre=x==='sukun'||x==='shadda'?'أَ':'';const lets=LETTERS.filter(c=>c!=='ا'||/^v:/.test(x));
    const one=c=>c==='ا'?({[FA]:'أَ',[KA]:'إِ',[DA]:'أُ'}[g]||'أ'+g):pre+c+g;
    const H=lets.filter(c=>HEAVY.includes(c)),Li=lets.filter(c=>!HEAVY.includes(c));
    body=note(ELF_T.n.vgrid)+`<h4 class="elh">${esc(L(ELF_T.light))}</h4><div class="elg c5">${Li.map(c=>cell(add({ar:one(c),cap:lname(LETTERS.indexOf(c))}))).join('')}</div>
    <h4 class="elh">${esc(L(ELF_T.heavy))}</h4><div class="elg c5">${H.map(c=>cell(add({ar:one(c),cap:lname(LETTERS.indexOf(c))}),'hv')).join('')}</div>`}
  else if(s==='compare'){const x=l.x,v={fa:FA,ka:KA,da:DA}[x.split(':')[1]];const lng=x.startsWith('vl')?{fa:FA+'ا',ka:KA+'ي',da:DA+'و'}[x.split(':')[1]]:{fa:TF+'ا',ka:TK,da:TD}[x.split(':')[1]];
    const lets=LETTERS.filter(c=>c!=='ا');const rows=[];for(let k=0;k<lets.length;k+=5)rows.push(lets.slice(k,k+5));
    body=note(ELF_T.n.compare)+rows.map(r=>`<div class="elcmp"><div class="elg c5">${r.map(c=>cell(add({ar:c+v,cap:L(ELF_T.short)}))).join('')}</div><div class="elg c5">${r.map(c=>cell(add({ar:c+lng,cap:L(ELF_T.long)}),'lg2')).join('')}</div></div>`).join('')}
  else if(s==='kavrama'){const car='يتمقعرصكنف';const vs=[FA,KA,DA];const lets=LETTERS.filter(c=>c!=='ا');
    body=note(ELF_T.n.kavrama)+`<div class="elg c5">${lets.map((c,k)=>cell(add({ar:car[k%car.length]+vs[k%3]+c+SK,cap:lname(LETTERS.indexOf(c))}))).join('')}</div>`}
  else if(s==='words'){const ws=vowelWords(l.x);body=note(ELF_T.n.words)+`<div class="elg c4">${ws.map(o=>cell(add({ar:o.ar,i:o.i}))).join('')}</div>`}
  else if(s==='rletters'){body=note(ELF_T.n.rletters)+`<div class="elg c5">${RLET[l.x].split(' ').map(c=>cell(add({ar:c,cap:lname(LETTERS.indexOf(c))||''}))).join('')}</div>`}
  else if(s==='rwords'||s==='rw2'){const r=ruleItems(l.x);
    body=note(ELF_T.n.rwords)+`<div class="elg c3">${r.map(o=>o.g?`<h4 class="elh full">${esc(o.g)}</h4>`:cell(add({ar:o.ar,i:o.i}),'wide')).join('')}</div>`}
  else if(s==='signs'){body=`<div class="card">${signsHTML()}</div>`}
  else if(s==='ayat'||s.startsWith('surah:')){const spec=s==='ayat'?l.refs:l.refs.split(',')[+s.slice(6)];const ids=refIdx(spec||'');
    body=note(s==='ayat'?ELF_T.n.ayat:ELF_T.n.surah)+`<div class="elay">${ids.map(i=>{const [ss,a]=sa(i);const k=add({ar:D.t[i]+` <span class="am">${arD(a)}</span>`,i,ay:1,cap:`${sn(ss)} ${ss}:${a}`});
      return `<button class="eli ayi${k===VW.k?' cur':''}" data-ei="${k}"><span class="ref">${esc(sn(ss))} ${ss}:${a}</span><span class="ea" dir="rtl">${it[k].ar}</span></button>`}).join('')}</div>`}
  return {items:it,body}}

function viewerHTML(modal){const o=VW.items[VW.k];if(!o)return '';const n=VW.items.length;
  const hasAy=VW.items.some(x=>x.ay);const seqLbl=SEQ?L(ELF_T.stop):(hasAy?L(ELF_T.seqRead):L(ELF_T.seqShow));
  const cap=o.cap||(o.i!=null?`${sn(sa(o.i)[0])} ${sa(o.i)[0]}:${sa(o.i)[1]}`:'');
  return `<div class="elv${modal?' inm':''}"><div class="elv-hd"><b class="elv-n">${VW.k+1} / ${n}</b><span class="sp"></span>
    <button class="chip sm${SEQ?' on':''}" data-elf="seq">${ic(SEQ?'pause':'play',14)} ${esc(seqLbl)}</button>${modal?'':`<button class="ib" data-elf="slide" title="${t('slide')}" aria-label="${t('slide')}">${ic('fs',18)}</button>`}</div>
    <div class="elv-big ${o.ay?'ay':''}"><span class="in" dir="rtl">${o.ar}</span></div>
    <div class="elv-cap">${esc(cap)}</div>
    <div class="elv-ctl"><button class="ib" data-elf="next" aria-label="${t('next')}">${ic('cl',20)}</button>
      ${o.i!=null?`<button class="chip sm" data-elf="listen">${ic('head',14)} ${esc(L(ELF_T.listen))}</button><button class="chip sm" data-elf="open">${ic('book',14)} ${esc(L(ELF_T.open))}</button>`:`<span class="muted elv-na">${esc(L(ELF_T.noAudio))}</span>`}
      <button class="ib" data-elf="prev" aria-label="${t('prev')}">${ic('cr',20)}</button></div></div>`}
function paintViewer(){const v=document.querySelector('#v-elifba .elv-slot');if(v)v.innerHTML=viewerHTML(false);
  document.querySelectorAll('#v-elifba .eli').forEach(e=>e.classList.toggle('cur',+e.dataset.ei===VW.k));
  if($('modal').classList.contains('on')&&document.querySelector('#modal .elv'))modal(viewerHTML(true)+`<div class="btns"><button class="btn s" data-act="close">${t('close')}</button></div>`)}
function goItem(k,scroll){const n=VW.items.length;if(!n)return;VW.k=(k+n)%n;paintViewer();
  if(scroll){const e=document.querySelector(`#v-elifba .eli[data-ei="${VW.k}"]`);if(e){const r=e.getBoundingClientRect();if(r.top<90||r.bottom>innerHeight-40)e.scrollIntoView({block:'center',behavior:'smooth'})}}}
function stopSeq(){if(SEQ&&SEQ!=='audio')clearInterval(SEQ);if(SEQ==='audio'){AU.pause();PL.playing=false;renderPlayer()}SEQ=null}
function elfSync(i){if(VIEW!=='elifba'||SEQ!=='audio')return;const k=VW.items.findIndex(o=>o.i===i&&o.ay);if(k>=0)goItem(k,true)}

function curriculum(){let n=0;return ELIFBA.map((l,k)=>{if(l.part)return `<div class="pt">${esc(L(l.part))}</div>`;n++;const on=k===ELS.les;const done=lesDone(k);
  const head=`<button data-les="${k}" class="${on?'on':''}"><span>${n}</span><em>${esc(L(l.t))}</em>${done?`<i class="ok">${ic('check',14)}</i>`:''}</button>`;
  if(!on)return head;const seen=ELFP[k]||[];
  return head+`<div class="lsub">${subsOf(l).map((s,i)=>`<button data-sub="${i}" class="${i===ELS.sub?'on':''}">${seen.includes(i)?ic('check',12):'<i class="dot"></i>'}${subTitle(l,s)}</button>`).join('')}</div>`}).join('')}

function renderElifba(){stopSeq();LS.set('elfpos',{les:ELS.les,sub:ELS.sub});
  const l=ELIFBA[ELS.les];const sb=subsOf(l);if(ELS.sub>=sb.length)ELS.sub=0;const s=sb[ELS.sub];markSeen(ELS.les,ELS.sub);
  let main='';
  if(s==='intro'){const seen=ELFP[ELS.les]||[];VW={items:[],k:0};
    main=`<div class="card elintro"><div class="eln">${esc(L(ELF_T.lesson)).replace('{n}',lesNo(ELS.les))}</div><h3>${esc(L(l.t))}</h3><p class="mt">${arIn(esc(L(l.d)))}</p>
      <button class="btn" data-sub="1">${esc(L(ELF_T.start))} ${ic('cr',16)}</button>
      <ol class="elsteps">${sb.slice(1).map((x,i)=>`<li><button data-sub="${i+1}"><span>${subTitle(l,x)}</span>${seen.includes(i+1)?`<i class="ok">${ic('check',14)}</i>`:'<i class="dot"></i>'}</button></li>`).join('')}</ol></div>`}
  else{const prevK=VW._key===ELS.les+':'+ELS.sub?VW.k:0;const r=buildSub(l,s);VW={items:r.items,k:Math.min(prevK,Math.max(0,r.items.length-1)),_key:ELS.les+':'+ELS.sub};
    const r2=buildSub(l,s);/* cur sınıfı doğru işaretlensin diye ikinci kez (ucuz, önbellekli) */
    main=`<div class="elhead"><h3>${subTitle(l,s)}</h3>${subTitle(l,s)===esc(L(l.t))?'':`<span class="muted">${esc(L(l.t))}</span>`}</div>
      <div class="elwrap"><div class="elbody">${r2.body}</div>${VW.items.length?`<aside class="elv-slot">${viewerHTML(false)}</aside>`:''}</div>`}
  $('v-elifba').innerHTML=`<h2>${t('elifba')}</h2><div class="lay"><nav class="lnav">${curriculum()}</nav><div>
    <div class="eltabs">${sb.map((x,i)=>`<button data-sub="${i}" class="${i===ELS.sub?'on':''}">${subTitle(l,x)}</button>`).join('')}</div>${main}
    <div class="btns" style="justify-content:space-between;margin-top:14px"><button class="btn s" data-elf="back">${ic('cl',16)} ${t('prev')}</button><button class="btn" data-elf="fwd">${t('next')} ${ic('cr',16)}</button></div></div></div>`;
  const on=document.querySelector('#v-elifba .lnav button.on');if(on&&innerWidth>900)on.scrollIntoView({block:'nearest'})}

function elfStep(d){const sb=subsOf(ELIFBA[ELS.les]);let k=ELS.les,s=ELS.sub+d;
  if(s<0||s>=sb.length){do{k+=d}while(ELIFBA[k]&&ELIFBA[k].part);if(!ELIFBA[k])return;ELS.les=k;s=d>0?0:subsOf(ELIFBA[k]).length-1}
  ELS.sub=s;renderElifba();scrollTo(0,0)}
function elfClick(e){if(VIEW!=='elifba'&&!e.target.closest('#modal .elv'))return false;
  const ls=e.target.closest('[data-les]');if(ls){ELS.les=+ls.dataset.les;ELS.sub=0;renderElifba();if(innerWidth<=900)$('v-elifba').querySelector('.eltabs').scrollIntoView({block:'start'});return true}
  const sb=e.target.closest('[data-sub]');if(sb){ELS.sub=+sb.dataset.sub;renderElifba();if(innerWidth<=900)$('v-elifba').querySelector('.eltabs').scrollIntoView({block:'start'});else scrollTo(0,0);return true}
  const ei=e.target.closest('[data-ei]');if(ei){if(SEQ)stopSeq();goItem(+ei.dataset.ei,false);if(innerWidth<=900)modal(viewerHTML(true)+`<div class="btns"><button class="btn s" data-act="close">${t('close')}</button></div>`);return true}
  const a=e.target.closest('[data-elf]');if(!a)return false;const act=a.dataset.elf;
  if(act==='prev'||act==='next'){if(SEQ)stopSeq();goItem(VW.k+(act==='next'?1:-1),true);return true}
  if(act==='back'||act==='fwd'){elfStep(act==='fwd'?1:-1);return true}
  if(act==='slide'){modal(viewerHTML(true)+`<div class="btns"><button class="btn s" data-act="close">${t('close')}</button></div>`);return true}
  if(act==='listen'){const o=VW.items[VW.k];if(o&&o.i!=null)playQueue([o.i],0);return true}
  if(act==='open'){const o=VW.items[VW.k];if(o&&o.i!=null){closeAll();goAyah(o.i)}return true}
  if(act==='seq'){if(SEQ){stopSeq();paintViewer();return true}
    const ay=VW.items.map((o,k)=>[o,k]).filter(([o])=>o.ay);
    if(ay.length){SEQ='audio';const from=VW.items[VW.k]&&VW.items[VW.k].ay?VW.k:ay[0][1];playQueue(ay.filter(([,k])=>k>=from).map(([o])=>o.i),0);paintViewer();return true}
    SEQ=setInterval(()=>{if(VIEW!=='elifba'){stopSeq();return}if(VW.k>=VW.items.length-1){stopSeq();paintViewer();return}goItem(VW.k+1,true)},1700);paintViewer();return true}
  return false}
