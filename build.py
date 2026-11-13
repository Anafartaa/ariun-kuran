#!/usr/bin/env python3
"""Ариун Куран — derleme.
python3 build.py        → site/ (yayınlanacak web sitesi) + preview/index.html (tek dosya önizleme)
"""
import json, os, hashlib, shutil, pathlib
R = pathlib.Path(__file__).parent
SRC, DATA, SITE, PREV = R/'src', R/'data', R/'site', R/'preview'

def rd(p): return open(p, encoding='utf-8').read()
def js(o): return json.dumps(o, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/')

quran = json.load(open(DATA/'quran.json', encoding='utf-8'))
meals = json.load(open(DATA/'meals.json', encoding='utf-8'))
extra = {p.stem: json.load(open(p, encoding='utf-8')) for p in sorted(DATA.glob('meal-*.json'))}  # seçilince yüklenen ek mealler
css = rd(SRC/'style.css')
tpl = rd(SRC/'template.html').replace('/*CSS*/', css)
app, content = rd(SRC/'app.js'), rd(SRC/'content.js')
i18x = {p.stem: json.load(open(p, encoding='utf-8')) for p in sorted((R/'i18n').glob('*.json'))}
content = '/* Kazakça/Kırgızca arayüz (i18n/*.json) */\nconst I18X=' + js(i18x) + ';\n' + content
app = app.replace('/*@ELIFBA@*/', rd(SRC/'elifba.js'))  # Elifba modülü uygulamanın içine eklenir

# ---------- site/ ----------
if SITE.exists(): shutil.rmtree(SITE)
(SITE/'data').mkdir(parents=True); (SITE/'icons').mkdir()
for name, obj in [('quran', quran), ('meals', meals)] + list(extra.items()):
    open(SITE/'data'/f'{name}.json', 'w', encoding='utf-8').write(js(obj))
open(SITE/'app.js', 'w', encoding='utf-8').write(app)
open(SITE/'content.js', 'w', encoding='utf-8').write(content)
for f in (R/'assets').glob('*'): shutil.copy(f, SITE/'icons'/f.name)
shutil.copytree(R/'mushaf', SITE/'mushaf')
ver = hashlib.sha1((app + content + css + tpl).encode() + open(SITE/'data'/'meals.json','rb').read()[:2000]).hexdigest()[:10]
pwa = ('<link rel="manifest" href="manifest.webmanifest">\n<link rel="icon" href="icons/icon-192.png">\n'
       '<link rel="apple-touch-icon" href="icons/apple-touch-icon.png">\n<meta name="apple-mobile-web-app-capable" content="yes">\n'
       '<meta name="apple-mobile-web-app-title" content="Ариун Куран">')
html = tpl.replace('<!--PWA-->', pwa).replace('<!--INLINE-->', '').replace('src="app.js"', f'src="app.js?v={ver}"').replace('src="content.js"', f'src="content.js?v={ver}"')
open(SITE/'index.html', 'w', encoding='utf-8').write(html)
manifest = {"name": "Ариун Куран", "short_name": "Ариун Куран", "description": "Кураны араб эх ба монгол утга агуулга",
            "lang": "mn", "start_url": "./", "scope": "./", "display": "standalone", "background_color": "#f4efe2", "theme_color": "#0f5c4a",
            "icons": [{"src": "icons/icon-192.png", "sizes": "192x192", "type": "image/png"},
                      {"src": "icons/icon-512.png", "sizes": "512x512", "type": "image/png"},
                      {"src": "icons/icon-maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable"}]}
open(SITE/'manifest.webmanifest', 'w', encoding='utf-8').write(json.dumps(manifest, ensure_ascii=False, indent=1))
sw = rd(SRC/'sw.js').replace('__VER__', ver).replace('__APPV__', ver)
open(SITE/'sw.js', 'w', encoding='utf-8').write(sw)
open(SITE/'robots.txt','w').write('User-agent: *\nDisallow: /\n'); open(SITE/'.nojekyll','w').write('')
shutil.copy(SRC/'netlify.toml', SITE/'netlify.toml'); shutil.copy(SRC/'_headers', SITE/'_headers'); shutil.copy(SRC/'vercel.json', SITE/'vercel.json')

# ---------- preview/ (tek dosya, claude.ai önizlemesi için) ----------
PREV.mkdir(exist_ok=True)
inline = f'<script>window.__INLINE__={{quran:{js(quran)},meals:{js(meals)}' + ''.join(f',"{k}":{js(v)}' for k, v in extra.items()) + f'}};</script>\n<script>\n{content}\n</script>\n<script>\n{app}\n</script>'
ph = tpl.replace('<!--PWA-->', '').replace('<!--INLINE-->', inline).replace('<script src="content.js"></script>\n', '').replace('<script src="app.js"></script>\n', '')
open(PREV/'index.html', 'w', encoding='utf-8').write(ph)
tot = sum(f.stat().st_size for f in SITE.rglob('*') if f.is_file())
print('site/', round(tot/1e6, 2), 'MB · preview', round((PREV/'index.html').stat().st_size/1e6, 2), 'MB · ver', ver)
