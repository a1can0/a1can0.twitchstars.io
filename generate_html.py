# generate_html.py

from jinja2 import Template
import yaml
import os

with open('_data/creators.yml') as f:
    creators = yaml.safe_load(f)

template = Template('''<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,minimum-scale=1">
<title>Turbo Creators</title>
<style>
:root{--gap:1rem;--radius:8px}
body{margin:0;font:1em/1.4 system-ui}
.entry{align-items:center;gap:var(--gap);padding:var(--gap);display:grid;grid-template-columns:auto 1fr auto}
.grid{display:grid;gap:var(--gap);padding:var(--gap);max-width:80ch;margin:0 auto}
img{width:3rem;height:3rem;object-fit:cover;border-radius:var(--radius)}
svg{width:1.5rem;height:1.5rem;fill:#9146FF}
a{color:inherit;text-decoration:none}
</style>
</head>
<body>
<div class="grid">
{% for creator in creators %}
<article class="entry">
<a href="{{ creator.url }}">
<img src="{{ creator.image }}" width="48" height="48" loading="lazy" decoding="async" alt="">
<span>{{ creator.name }}</span>
<svg aria-hidden="true">
<use href="#icon"/>
</svg>
</a>
</article>
{% endfor %}
</div>
<svg hidden>
<symbol id="icon" viewBox="0 0 2400 2800">
<!-- SVG paths here -->
</symbol>
</svg>
</body>
</html>
''')

with open('index.html', 'w') as f:
    f.write(template.render(creators=creators))