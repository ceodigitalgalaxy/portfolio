# Digital Galaxy — Portfólio

Portfólio comercial da **Digital Galaxy**, enviado a clientes: uma seleção de projetos, cada um com uma página própria e os resultados alcançados. Publicado em **https://portfolio.digitalgalaxy.com.br** (com `noindex`, fora do Google).

Segue o mesmo visual e a mesma organização do site principal ([ceodigitalgalaxy/digitalgalaxy-site](https://github.com/ceodigitalgalaxy/digitalgalaxy-site)).

## Tecnologias

- **HTML5**, **CSS3** com variáveis e **JavaScript** vanilla, sem build
- [Lenis](https://github.com/darkroomengineering/lenis) para a rolagem suave (arquivo local em `site/js/vendor/`)
- Fontes locais iguais às do site principal (Sora e Orbitron)

## Estrutura

Tudo o que vai para o ar fica em `site/`, que é a raiz do domínio. Fora dela ficam só arquivos de manutenção.

```
/
├── site/                                  ← publicado em https://portfolio.digitalgalaxy.com.br/
│   ├── index.html                         Página inicial: abertura, fotografia, grade de projetos, método e contato
│   ├── projetos/
│   │   └── <projeto>/index.html           Página de cada projeto (endereço /projetos/<projeto>/)
│   ├── css/
│   │   ├── style.css                      Variáveis, componentes e páginas
│   │   └── responsive.css                 Ajustes para tablet e celular
│   ├── js/
│   │   ├── main.js                        Rolagem, menu em tela cheia, entrada dos cards, foto ampliada e barra do celular
│   │   └── vendor/lenis.min.js            Rolagem suave (biblioteca de terceiros)
│   ├── images/
│   │   ├── logo/                          Favicons e ícones (os mesmos do site principal)
│   │   ├── projetos/<projeto>/            Imagens de cada projeto (.webp) e capas dos vídeos (.jpg)
│   │   ├── equipe/                        Fotos dos sócios nos círculos da abertura (320 px)
│   │   └── fotografia/<cliente>/          Fotos da seção Fotografia: <foto>-thumb.webp (mosaico) e <foto>.webp (alta resolução)
│   ├── videos/                            Vídeos .mp4 dos projetos
│   └── fonts/                             Sora e Orbitron (woff2)
├── .github/workflows/pages.yml            Publicação automática no GitHub Pages
├── .gitattributes                         Quebras de linha e arquivos binários
├── .gitignore
├── CLAUDE.md                              Regras de conteúdo e visual para o Claude
└── README.md
```

## Projetos

| Projeto | Página | Imagens |
|---|---|---|
| Santuário Pet | `site/projetos/santuario-pet/` | `site/images/projetos/santuario-pet/` |
| Agropet Bichão | `site/projetos/agropet-bichao/` | `site/images/projetos/agropet-bichao/` |
| Do anúncio à conversa (anúncios) | `site/projetos/anuncios-whatsapp/` | `site/images/projetos/anuncios-whatsapp/` |
| Painel de Compras (sistema) | `site/projetos/painel-de-compras/` | `site/images/projetos/painel-de-compras/` |
| Grupo Axia | `site/projetos/grupo-axia/` | `site/images/projetos/grupo-axia/` |
| T&M Pets | `site/projetos/tm-pets/` | `site/images/projetos/tm-pets/` |
| Conteúdo para redes sociais | `site/projetos/conteudo/` | `site/images/projetos/conteudo/` |

### Adicionar um projeto

1. Crie `site/images/projetos/<novo-projeto>/` com as imagens em .webp (e o vídeo em `site/videos/`, se houver).
2. Copie a pasta de um projeto parecido em `site/projetos/` para `site/projetos/<novo-projeto>/` e troque textos, números e imagens.
3. Na `site/index.html`, copie um card `<a class="project">` da grade `#projetos` e aponte para `projetos/<novo-projeto>/`.
4. Ajuste o "Próximo projeto" no fim da página anterior para levar ao novo.

## Executar localmente

```bash
python3 -m http.server 8080 --directory site
# abra http://localhost:8080
```

## Publicação

- A cada push na branch `main`, o workflow publica a pasta `site/` no GitHub Pages.
- **DNS (HostGator):** CNAME `portfolio` → `ceodigitalgalaxy.github.io`. Mudanças de plano na HostGator podem apagar esse registro: se o portfólio sair do ar, confira o Editor de Zona do cPanel.
- **HTTPS:** em *Settings → Pages*, "Enforce HTTPS" marcado.
- **Cache:** o GitHub Pages guarda os arquivos por 10 minutos. Ao mudar CSS ou JS, aumente o número em `?v=` nos links do `<head>` de todas as páginas.
- **Segurança:** a política de conteúdo (CSP) fica numa `<meta>` no `<head>` de cada página e só permite arquivos do próprio site. Evite `style="..."` no HTML (a CSP bloqueia); use classes no CSS.
