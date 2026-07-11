# 🎲 Damas 3D — Edição ECIT MSRQ

Jogo de damas completo, para navegador, com visual 3D inspirado no estilo *Chess Titans*, modo single player contra uma IA e modo multiplayer online por código de sala — tudo em uma única aplicação web, sem dependências externas.

Desenvolvido por **Prof. Alisson Meneses**, professor de Informática na Escola Cidadã Integral Técnica (ECIT) Maria do Socorro Ramalho Quirino, Imaculada/PB.

---

## ✨ Funcionalidades

- **Tabuleiro 3D estilizado** — perspectiva inclinada, texturas de madeira e mármore, peças com efeito de brilho e sombra.
- **Regras oficiais de damas** (padrão brasileiro/internacional):
  - Captura obrigatória, com regra de captura máxima (é obrigatório jogar a sequência que captura mais peças).
  - Peões capturam para frente e para trás.
  - Damas voadoras — movem e capturam a qualquer distância na diagonal.
  - Promoção automática ao alcançar a última linha.
- **Modo Single Player** — contra uma IA com busca *minimax* e poda alfa-beta, em 3 níveis de dificuldade (Fácil / Médio / Difícil).
- **Modo Multiplayer** — um jogador cria uma sala e recebe um código; o outro digita esse código para entrar. O tabuleiro é sincronizado automaticamente e gira 180° para o segundo jogador, para que cada um sempre veja suas próprias peças na parte de baixo.
- **Placar e histórico visual de capturas** — cada peça capturada aparece na bandeja lateral do jogador correspondente.
- **Sistema de desistência e desconexão** — botão de "Desistir" no multiplayer e detecção automática de oponente desconectado, com aviso e contagem regressiva de 30 segundos antes de encerrar a partida.
- **Sons sintetizados via Web Audio API** — música ambiente, cliques, movimentos, capturas, promoção a dama e vitória/derrota, sem nenhum arquivo de áudio externo.
- **Totalmente responsivo** — funciona em desktop e dispositivos móveis.

---

## 🚀 Como usar

Este projeto tem duas formas de publicação, dependendo de onde você quer hospedá-lo:

### Opção 1 — Arquivo HTML único (`damas.html`)

Basta abrir o arquivo `damas.html` diretamente em qualquer navegador moderno. Não requer servidor, build ou instalação de dependências.

> ⚠️ No modo multiplayer, essa versão depende de um recurso de armazenamento específico do ambiente onde foi originalmente criada. Para multiplayer funcionando de forma independente (ex: hospedado no GitHub Pages), utilize a Opção 2.

### Opção 2 — Google Apps Script + Google Sites (`Code.gs` + `Index.html`)

Essa é a versão recomendada para uso em sala de aula, incorporada a um Google Site:

1. Acesse [script.google.com](https://script.google.com) e crie um **Novo projeto**.
2. Cole o conteúdo de `Code.gs` em um arquivo chamado `Code.gs`.
3. Crie um novo arquivo HTML (**Arquivo → Novo → Arquivo HTML**) chamado exatamente `Index` e cole o conteúdo de `Index.html`.
4. Vá em **Implantar → Nova implantação → tipo "App da Web"**:
   - Executar como: **Eu**
   - Quem pode acessar: **Qualquer pessoa**
5. Copie a URL `.../exec` gerada.
6. No Google Sites: **Inserir → Incorporar → Por URL**, cole essa URL.

O multiplayer nessa versão usa `PropertiesService` do Apps Script como canal de sincronização simples entre os jogadores.

---

## 🧠 Como jogar

1. Na tela inicial, escolha **Jogar sozinho** (contra a CPU) ou **Multiplayer**.
2. No modo CPU, selecione a dificuldade e comece a partida — você joga com as peças brancas.
3. No modo Multiplayer:
   - **Criar sala** gera um código de 5 caracteres para compartilhar com o outro jogador.
   - **Entrar com um código** permite que o segundo jogador se conecte à sala existente.
4. Clique em uma peça para ver os movimentos possíveis destacados no tabuleiro e clique no destino para jogar.
5. Quando houver capturas disponíveis, o jogo obriga a jogá-las (conforme as regras oficiais).

---

## 🛠️ Tecnologias utilizadas

- **HTML5, CSS3 e JavaScript puro** (sem frameworks ou bibliotecas externas).
- **Web Audio API** para geração de sons sintetizados em tempo real.
- **Google Apps Script** (`PropertiesService` + `google.script.run`) como backend leve para a sincronização multiplayer na versão hospedada em Google Sites.
- Algoritmo de IA baseado em **Minimax com poda alfa-beta**.

---

## 📁 Estrutura do repositório

```
├── damas.html      # Versão standalone (single-file), pronta para abrir no navegador
├── Index.html       # Versão para deploy via Google Apps Script (front-end)
├── Code.gs          # Backend em Apps Script (serve o jogo + armazena salas multiplayer)
└── README.md         # Este arquivo
```

---

## 📌 Sobre o projeto

Este jogo foi desenvolvido como material didático e ferramenta de uso em sala de aula, integrando conceitos de lógica de programação, algoritmos de jogos e desenvolvimento web ao contexto do curso técnico integrado em Informática da ECIT Maria do Socorro Ramalho Quirino.

---

## 👤 Autor

**Prof. Alisson Meneses**
Professor de Informática — ECIT Maria do Socorro Ramalho Quirino, Imaculada/PB

---

## 📄 Licença

Este projeto está disponível para uso e modificação livre em contextos educacionais. Sinta-se à vontade para adaptar, melhorar e compartilhar.
