# Portfólio Digital Galaxy

Site estático do portfólio comercial da Digital Galaxy, sem build. Mesma organização e mesmo visual do site principal (`ceodigitalgalaxy/digitalgalaxy-site`).

## Estrutura
- Tudo o que vai para o ar fica em `site/` (raiz do domínio). Ver a árvore completa no `README.md`.
- `site/index.html`: página inicial com abertura, fotografia, grade de projetos, método, outros trabalhos e chamada final.
- `site/projetos/<projeto>/index.html`: uma página por projeto (capa, desafio / o que fizemos / resultado, números, galeria, vídeos e "próximo projeto").
- `site/css/style.css` e `site/css/responsive.css`; `site/js/main.js`; imagens em `site/images/projetos/<projeto>/`; vídeos em `site/videos/`; fontes em `site/fonts/`.
- Topo, rodapé, chamada final e `<head>` se repetem em todas as páginas: ao mudar um deles, mude em todas.

## Publicação
Publicado no GitHub Pages pelo repositório `ceodigitalgalaxy/portfolio` (branch `main`), em https://portfolio.digitalgalaxy.com.br.
- O workflow `.github/workflows/pages.yml` publica a pasta `site/` a cada push na `main`.
- DNS (HostGator): CNAME `portfolio` → `ceodigitalgalaxy.github.io`. Domínio verificado na conta do GitHub (TXT `_github-pages-challenge-ceodigitalgalaxy.portfolio`). "Enforce HTTPS" ligado em *Settings → Pages*.
- Ao mudar CSS ou JS, aumente o `?v=` nos links do `<head>` de todas as páginas.

## Regras de visual
- Identidade do site principal em versão **minimalista** (decisão do dono em outubro de 2026, substituindo o visual claro anterior): fundo escuro #07010F, superfícies #0E0620, roxo da marca #3B008E / #5A1AC7, lilás #B794FF. Sem cartões com brilho nem blocos coloridos: seções com um rótulo só com o nome da seção, sem linhas separando, em 12px e lilás, 16px acima do título. Caixa alta só nos títulos grandes (abertura e páginas de projeto); rótulos, legendas, rodapé e demais textos ficam em letras normais. A chamada final é o bloco roxo com estrelas, igual ao site principal.
- Topo só com o símbolo (a estrela gira no hover) e o hambúrguer. O menu é igual ao do site principal: painel claro que desliza da direita, com a página desfocada atrás.
- Abertura no estilo editorial: título grande em caixa alta ("Projetos de outro universo.") com os rostos dos dois sócios em círculos encaixados na frase (Vitor Brock, designer, e Felipe dos Santos, marketing; o nome aparece no hover). Fotos em `site/images/equipe/`, quadradas de 320 px ocupando a largura da página, e logo abaixo uma linha fina com as informações em 12px (esquerda, centro e direita). No celular e no tablet a abertura fica centralizada.
- Fotografia logo depois da abertura: abas T&M Pets, Grupo Axia e Ramos Boxe, cada uma com 6 fotos num mosaico (duas empilhadas, uma alta, uma larga e duas pequenas). Os clientes trocam sozinhos a cada 6 segundos (uma barra fina preenche a aba ativa), com as fotos entrando em cascata num cruzamento suave; a troca pausa com o mouse ou o foco nas fotos, fora da tela e com a foto ampliada aberta, e não acontece com movimento reduzido. No hover a foto sobe de leve e mostra "Alta resolução"; ao clicar abre a versão grande com o fundo desfocado. Fotos em `site/images/fotografia/<cliente>/`, com `-thumb` (até 960 px) para o mosaico e a versão grande (até 2000 px) para a ampliação.
- Rodapé só com as redes e "© ano Digital Galaxy. Todos os direitos reservados."
- Fontes: Orbitron nos títulos (família "Galaxy", que pula as letras com til) e Sora no texto, com arquivos locais.
- Espaçamentos, tipografia, botões e grids em múltiplos de 8px; exceção: os textos de apoio (rótulos, linha da abertura, rodapé) em 12px. Cards com raio de 14px (`--border-radius`).
- Depois da grade, "Conteúdo para redes sociais" em três linhas: vídeo vertical rodando sem som ao lado de um texto curto (cliente, título e descrição), alternando o lado do vídeo a cada linha. O vídeo só carrega e toca quando aparece na tela e pausa ao sair; com movimento reduzido mostra os controles em vez de tocar sozinho.
- Botões iguais aos do site: branco com varredura roxa no hover (`btn--primary`).
- Grade de projetos no estilo de portfólio de produto: cabeçalho com texto de apoio, e título grande. Em cada card a imagem ocupa o quadro inteiro (sem fundo nem margem), com um círculo branco e a seta ↗ sempre visível no canto. Embaixo, o nome da empresa na ponta esquerda e o tipo de trabalho na ponta direita. No hover a imagem aproxima devagar (sem brilho roxo), a seta gira e o círculo fica roxo, e o nome fica lilás.
- Política de segurança (CSP) em `<meta>`: sem `style="..."` no HTML nem scripts ou fontes de terceiros.

## Regras de conteúdo
- A página é para enviar a clientes: não colocar pendências internas nem nomes de quem da equipe faz cada tarefa.
- Portfólio resumido: deixar claro que é só uma seleção de trabalhos. Linguagem para leigos ("anúncios no Instagram e Facebook", "perfil do Google", "exibições"), sem termos como Meta Ads, tráfego pago ou impressões.
- Conversão: as chamadas levam ao diagnóstico grátis (https://diagnostico.digitalgalaxy.com.br): botão no menu, link na abertura, chamada final de cada página e barra fixa no celular (aparece só depois da abertura). Reforçar "primeiro mês sem fidelidade". Não inventar números, depoimentos ou clientes.
- As páginas têm `noindex` para não aparecer no Google.
