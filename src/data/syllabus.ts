/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Lesson, Achievement, DailyMission, LeaderboardUser } from '../types';

export const SYLLABUS: Lesson[] = [
  // ==================== HTML TRACK ====================
  // --- INICIANTE (5 lessons) ---
  {
    id: 'html_ini_1',
    title: 'A Fundação Divina',
    description: 'Toda página web precisa de um título principal e um parágrafo que dê as boas-vindas aos aventureiros.',
    concept: 'A tag `<h1>` cria o título de maior importância, enquanto a tag `<p>` define um parágrafo convencional.',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Crie uma tag `<h1>` contendo o texto "CodeQuest" e uma tag `<p>` contendo o texto "A jornada começou!"',
    initialCode: '<!-- Escreva seu código aqui -->\n',
    solutionExample: '<h1>CodeQuest</h1>\n<p>A jornada começou!</p>',
    tests: [
      { id: 't1', description: 'Deve conter uma tag <h1>', ruleType: 'regex', expected: '<h1[^>]*>.*<\\/h1>' },
      { id: 't2', description: 'O título h1 deve conter "CodeQuest"', ruleType: 'regex', expected: '<h1[^>]*>\\s*CodeQuest\\s*<\\/h1>' },
      { id: 't3', description: 'Deve conter uma tag <p>', ruleType: 'regex', expected: '<p[^>]*>.*<\\/p>' },
      { id: 't4', description: 'O parágrafo deve conter "A jornada começou!"', ruleType: 'regex', expected: '<p[^>]*>\\s*A jornada começou!\\s*<\\/p>' }
    ],
    hint: 'Verifique se abriu e fechou as tags corretamente: <h1>SeuTexto</h1> e <p>SeuTexto</p>',
    coinsReward: 15,
    xpReward: 100,
    order: 1
  },
  {
    id: 'html_ini_2',
    title: 'Lista de Suprimentos',
    description: 'Guerreiros precisam estocar suprimentos. Utilize uma lista não ordenada para enumerar os itens essenciais.',
    concept: 'Listas não ordenadas usam a tag `<ul>` como contêiner de itens individuais representados por `<li>`.',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Crie uma lista `<ul>` contendo três elementos `<li>` com as palavras: "Espada", "Escudo" e "Poção de XP".',
    initialCode: '<!-- Monte sua lista de suprimentos -->\n<ul>\n  \n</ul>',
    solutionExample: '<ul>\n  <li>Espada</li>\n  <li>Escudo</li>\n  <li>Poção de XP</li>\n</ul>',
    tests: [
      { id: 't1', description: 'Deve conter a tag de abertura e fechamento <ul>', ruleType: 'regex', expected: '<ul[^>]*>[\\s\\S]*<\\/ul>' },
      { id: 't2', description: 'Deve conter pelo menos 3 tags <li>', ruleType: 'regex', expected: '(<li[^>]*>[\\s\\S]*?<\\/li>[\\s\\S]*?){3,}' },
      { id: 't3', description: 'Deve conter "Espada" em um dos itens', ruleType: 'regex', expected: '<li>\\s*Espada\\s*<\\/li>' },
      { id: 't4', description: 'Deve conter "Escudo" em um dos itens', ruleType: 'regex', expected: '<li>\\s*Escudo\\s*<\\/li>' },
      { id: 't5', description: 'Deve conter "Poção de XP" em um dos itens', ruleType: 'regex', expected: '<li>\\s*Poção de XP\\s*<\\/li>' }
    ],
    hint: 'Cada espada, escudo e poção deve estar envolta por <li> e </li>, todos aninhados dentro de um <ul>...</ul>.',
    coinsReward: 15,
    xpReward: 100,
    order: 2
  },
  {
    id: 'html_ini_3',
    title: 'Portal de Hiperlink',
    description: 'Para viajar entre reinos da internet, você deve forjar um link mágico de navegação.',
    concept: 'A tag `<a>` define hiperlinks. O atributo essencial `href` indica o destino e `target="_blank"` abre em nova aba.',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Crie um link `<a>` apontando para "https://example.com" que abra em uma nova aba com o texto: "Mundo Externo".',
    initialCode: '<!-- Forje o portal para o mundo externo -->\n',
    solutionExample: '<a href="https://example.com" target="_blank">Mundo Externo</a>',
    tests: [
      { id: 't1', description: 'Deve conter a tag <a>', ruleType: 'regex', expected: '<a[^>]*>[\\s\\S]*?<\\/a>' },
      { id: 't2', description: 'Deve conter o atributo href apontando para https://example.com', ruleType: 'regex', expected: 'href="https:\\/\\/example\\.com"' },
      { id: 't3', description: 'Deve possuir target="_blank"', ruleType: 'regex', expected: 'target="_blank"' },
      { id: 't4', description: 'Deve exibir o texto descritivo "Mundo Externo"', ruleType: 'regex', expected: '>\\s*Mundo Externo\\s*<\\/a>' }
    ],
    hint: 'Exemplo de tag: <a href="LINK" target="_blank">Texto do Link</a>',
    coinsReward: 20,
    xpReward: 110,
    order: 3
  },
  {
    id: 'html_ini_4',
    title: 'Retrato do Herói',
    description: 'Imagens comunicam instantaneamente. Insira o brasão ou imagem oficial do herói na plataforma.',
    concept: 'A tag `<img>` é auto-fechável. Ela requer o atributo `src` para o arquivo de imagem e `alt` para acessibilidade textual.',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Insira uma imagem utilizando a URL "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" com largura (width) de "150" e atributo alt "Brasão CodeQuest".',
    initialCode: '<!-- Coloque o brasão aqui -->\n',
    solutionExample: '<img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" alt="Brasão CodeQuest" width="150" />',
    tests: [
      { id: 't1', description: 'Deve conter tag img', ruleType: 'regex', expected: '<img[^>]*>' },
      { id: 't2', description: 'O atributo src deve conter a URL do Unsplash', ruleType: 'regex', expected: 'src="https:\\/\\/images\\.unsplash\\.com\\/photo-1618005182384-a83a8bd57fbe"' },
      { id: 't3', description: 'O atributo alt deve descrever "Brasão CodeQuest"', ruleType: 'regex', expected: 'alt="Brasão CodeQuest"' },
      { id: 't4', description: 'Deve possuir width definido em 150', ruleType: 'regex', expected: 'width="150"' }
    ],
    hint: 'Insira os atributos src, alt e width dentro de uma única tag <img />.',
    coinsReward: 20,
    xpReward: 120,
    order: 4
  },
  {
    id: 'html_ini_5',
    title: 'Ênfase no Código',
    description: 'Importância textual na web. Altere o peso e estilo da sua escrita para dar destaque às instruções militares.',
    concept: 'Use `<strong>` para destacar texto em negrito (forte relevância) e `<em>` para italicizar (ênfase oral).',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Escreva um parágrafo `<p>` que diga "Atenção: Fuja do Dragão!". A palavra "Atenção:" deve estar em negrito forte e a palavra "Fuja" deve estar em itálico.',
    initialCode: '<!-- Alerte os novos aprendizes -->\n<p></p>',
    solutionExample: '<p><strong>Atenção:</strong> <em>Fuja</em> do Dragão!</p>',
    tests: [
      { id: 't1', description: 'Deve conter tag <strong>', ruleType: 'regex', expected: '<strong[^>]*>.*<\\/strong>' },
      { id: 't2', description: 'O texto dentro de strong deve ser "Atenção:"', ruleType: 'regex', expected: '<strong[^>]*>\\s*Atenção:\\s*<\\/strong>' },
      { id: 't3', description: 'Deve conter tag <em>', ruleType: 'regex', expected: '<em[^>]*>.*<\\/em>' },
      { id: 't4', description: 'O texto dentro de em deve ser "Fuja"', ruleType: 'regex', expected: '<em[^>]*>\\s*Fuja\\s*<\\/em>' }
    ],
    hint: 'Aninhe tags <strong> e <em> de forma ordenada dentro do seu parágrafo <p>.',
    coinsReward: 20,
    xpReward: 130,
    order: 5
  },

  // --- INTERMEDIÁRIO (5 lessons) ---
  {
    id: 'html_int_1',
    title: 'Recrutamento Guerreiro',
    description: 'Para coletar inscrições no torneio de código, configure um formulário interativo simples.',
    concept: 'A tag `<form>` agrupa inputs. Elementos `<input>` levam atributos de `type` e `placeholder` para orientar o usuário.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Crie um elemento `<form>`. Dentro dele, insira um input do tipo "text" com o placeholder "Nome do Guerreiro" e um botão `<button>` de tipo "submit" com o texto "Cadastrar".',
    initialCode: '<!-- Monte seu formulário de recrutamento -->\n',
    solutionExample: '<form>\n  <input type="text" placeholder="Nome do Guerreiro" />\n  <button type="submit">Cadastrar</button>\n</form>',
    tests: [
      { id: 't1', description: 'Deve ter um elemento <form>', ruleType: 'regex', expected: '<form[^>]*>[\\s\\S]*<\\/form>' },
      { id: 't2', description: 'Deve conter um <input> dentro do form', ruleType: 'regex', expected: '<input[^>]*>' },
      { id: 't3', description: 'O input deve ser do tipo text e possuir placeholder', ruleType: 'regex', expected: 'type="text"[\\s\\S]*placeholder="Nome do Guerreiro"|placeholder="Nome do Guerreiro"[\\s\\S]*type="text"' },
      { id: 't4', description: 'Deve ter um <button> tipo submit com texto Cadastrar', ruleType: 'regex', expected: 'type="submit"[^>]*>\\s*Cadastrar\\s*<\\/button>|<button[^>]*>\\s*Cadastrar\\s*<\\/button>' }
    ],
    hint: 'Garanta que fechou devidamente as tags <form> e <button>, e o input de texto possui o atributo placeholder exato.',
    coinsReward: 25,
    xpReward: 150,
    order: 6
  },
  {
    id: 'html_int_2',
    title: 'Tabela de Pontuações',
    description: 'Ranks organizados. Estruturar dados tabulares permite aos comandantes vigiar o progresso de suas tropas.',
    concept: 'A tag `<table>` usa `<tr>` para linhas, `<th>` para cabeçalhos e `<td>` para os dados normais.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Construa uma tabela `<table>` que tenha uma linha de cabeçalho (`<tr>`) contendo "Herói" e "Level". Em seguida, adicione uma linha de dados com "Galahad" e "15".',
    initialCode: '<!-- Tabela de rankings militares -->\n',
    solutionExample: '<table>\n  <tr>\n    <th>Herói</th>\n    <th>Level</th>\n  </tr>\n  <tr>\n    <td>Galahad</td>\n    <td>15</td>\n  </tr>\n</table>',
    tests: [
      { id: 't1', description: 'Deve conter tag de abertura e fechamento <table>', ruleType: 'regex', expected: '<table[^>]*>[\\s\\S]*<\\/table>' },
      { id: 't2', description: 'Deve conter pelo menos duas linhas <tr>', ruleType: 'regex', expected: '(<tr[^>]*>[\\s\\S]*?<\\/tr>[\\s\\S]*?){2,}' },
      { id: 't3', description: 'A primeira linha deve conter dois cabeçalhos <th>: Herói e Level', ruleType: 'regex', expected: '<th>\\s*Herói\\s*<\\/th>[\\s\\S]*?<th>\\s*Level\\s*<\\/th>' },
      { id: 't4', description: 'A segunda linha deve conter duas células <td>: Galahad e 15', ruleType: 'regex', expected: '<td>\\s*Galahad\\s*<\\/td>[\\s\\S]*?<td>\\s*15\\s*<\\/td>' }
    ],
    hint: 'Organize a estrutura em <table>, <tr>, as células de títulos com <th> e os conteúdos das linhas com <td>.',
    coinsReward: 30,
    xpReward: 160,
    order: 7
  },
  {
    id: 'html_int_3',
    title: 'Arquitetura Sagrada',
    description: 'Chega de div-soup! Páginas profissionais usam tags com nomes reais que expressam o significado do layout.',
    concept: 'Tags semânticas expressam sua função estrutural: `<header>` (topo), `<main>` (conteúdo central), `<section>` (área temática) e `<footer>` (rodapé).',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Crie uma casca semântica composta por um contêiner `<header>`, um `<main>` que envelope uma `<section>`, e finalmente um rodapé `<footer>`.',
    initialCode: '<!-- Estrutura semântica do Castelo -->\n',
    solutionExample: '<header></header>\n<main>\n  <section></section>\n</main>\n<footer></footer>',
    tests: [
      { id: 't1', description: 'Deve conter a seção de topo <header>', ruleType: 'regex', expected: '<header[^>]*>.*<\\/header>' },
      { id: 't2', description: 'Deve conter o corpo principal <main>', ruleType: 'regex', expected: '<main[^>]*>[\\s\\S]*<\\/main>' },
      { id: 't3', description: 'Uma tag <section> deve estar aninhada em <main>', ruleType: 'regex', expected: '<main>[\\s\\S]*<section[^>]*>[\\s\\S]*<\\/section>[\\s\\S]*<\\/main>' },
      { id: 't4', description: 'Deve conter o rodapé institucional <footer>', ruleType: 'regex', expected: '<footer[^>]*>.*<\\/footer>' }
    ],
    hint: 'Deixe as tags vazias, apenas aninhando a <section> perfeitamente dentro de <main>.',
    coinsReward: 30,
    xpReward: 170,
    order: 8
  },
  {
    id: 'html_int_4',
    title: 'Escolhas do Destino',
    description: 'Mecânicas de decisão. Adicione caixas de decisão para que usuários possam escolher seus caminhos de armas.',
    concept: 'Os inputs de tipo `radio` exigem o mesmo atributo `name` para que apenas uma opção seja elegível simultaneamente. O tipo `checkbox` permite escolhas livres.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Insira um input de tipo "radio" com nome "classe" e id "mago" e um input de tipo "checkbox" com id "concordo".',
    initialCode: '<!-- Selecione sua classe e aceite os termos -->\n',
    solutionExample: '<input type="radio" name="classe" id="mago" />\n<input type="checkbox" id="concordo" />',
    tests: [
      { id: 't1', description: 'Deve possuir input com type="radio"', ruleType: 'regex', expected: '<input[^>]*type="radio"' },
      { id: 't2', description: 'O input do tipo radio deve ter name="classe" e id="mago"', ruleType: 'regex', expected: 'name="classe"[\\s\\S]*id="mago"|id="mago"[\\s\\S]*name="classe"' },
      { id: 't3', description: 'Deve possuir input com type="checkbox"', ruleType: 'regex', expected: '<input[^>]*type="checkbox"' },
      { id: 't4', description: 'O checkbox deve possuir id="concordo"', ruleType: 'regex', expected: 'id="concordo"' }
    ],
    hint: 'Verifique atentamente os atributos passados aos inputs auto-fecháveis.',
    coinsReward: 30,
    xpReward: 180,
    order: 9
  },
  {
    id: 'html_int_5',
    title: 'Grito de Batalha Multimídia',
    description: 'Som e áudio encantam os jogadores. Adicione um canal de música para sonorizar as terras desertas de CodeQuest.',
    concept: 'A tag `<audio>` permite embutir playlists de som com o atributo utilitário `controls` para interatividade nativa do navegador.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Declare uma tag `<audio>` com controles habilitados (`controls`) e uma fonte contendo "vazio" ou uma URL fictícia.',
    initialCode: '<!-- Insira as cornetas de batalha -->\n',
    solutionExample: '<audio controls src="audio.mp3">Seu navegador não suporta áudio nativo.</audio>',
    tests: [
      { id: 't1', description: 'Deve conter tag de abertura <audio>', ruleType: 'regex', expected: '<audio[^>]*>' },
      { id: 't2', description: 'O token controls deve estar habilitado', ruleType: 'regex', expected: 'controls' },
      { id: 't3', description: 'Deve conter o encerramento da tag </audio>', ruleType: 'regex', expected: '<\\/audio>' }
    ],
    hint: 'Basta declarar <audio controls src="url_qualquer"></audio> para aprovar este desafio!',
    coinsReward: 35,
    xpReward: 190,
    order: 10
  },

  // --- AVANÇADO (5 lessons) ---
  {
    id: 'html_adv_1',
    title: 'A Profecia SEO',
    description: 'Mecanismos de busca governam a descoberta global. Prepare os metadados do oráculo heróico.',
    concept: 'Tags `<meta>` carregadas no `<head>` especificam propriedades como descrições e autor para robôs de indexação Google.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Declare uma tag `<meta>` que defina a descrição (`name="description"`) da página como "Portal de aprendizado gamificado de programação".',
    initialCode: '<!-- Preencha os segredos para os buscadores crawler -->\n',
    solutionExample: '<meta name="description" content="Portal de aprendizado gamificado de programação" />',
    tests: [
      { id: 't1', description: 'Deve conter tag meta', ruleType: 'regex', expected: '<meta[^>]*>' },
      { id: 't2', description: 'O atributo name deve ser igual a description', ruleType: 'regex', expected: 'name="description"' },
      { id: 't3', description: 'O content deve explicar o portal exatamente', ruleType: 'regex', expected: 'content="Portal de aprendizado gamificado de programação"' }
    ],
    hint: 'Lembre-se que tags meta não possuem tag de fechamento separada, utilize o formato padrão.',
    coinsReward: 40,
    xpReward: 220,
    order: 11
  },
  {
    id: 'html_adv_2',
    title: 'Santuário da Acessibilidade',
    description: 'Uma fortaleza deve ser inclusiva. Adicione tags ARIA permitindo a leitores de tela interpretar botões abstratos.',
    concept: 'Atributos `aria-label` e propriedades de `role` permitem que elementos customizados ou enigmáticos permaneçam acessíveis.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Crie um botão `<button>` que mostre o caractere "X" em texto padrão, porém possua um `aria-label` igual a "Fechar painel" para leitores assistivos.',
    initialCode: '<!-- Botão acessível -->\n',
    solutionExample: '<button aria-label="Fechar painel">X</button>',
    tests: [
      { id: 't1', description: 'Deve possuir elemento button', ruleType: 'regex', expected: '<button[^>]*>' },
      { id: 't2', description: 'O botão deve carregar o aria-label "Fechar painel"', ruleType: 'regex', expected: 'aria-label="Fechar painel"' },
      { id: 't3', description: 'O texto visível deve ser X', ruleType: 'regex', expected: '>X<\\/button>' }
    ],
    hint: 'Aplique aria-label="Fechar painel" como um atributo comum do seu elemento button.',
    coinsReward: 40,
    xpReward: 230,
    order: 12
  },
  {
    id: 'html_adv_3',
    title: 'Arena Canvas Gráfica',
    description: 'Para renderizar gráficos complexos, declare a malha primitiva de desenho 2D dinâmico.',
    concept: 'O elemento `<canvas>` serve como receptáculo de desenho que o JavaScript consegue manipular diretamente.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Crie uma tag `<canvas>` configurada com id="game-stage", largura (width) de "400" e altura (height) de "300".',
    initialCode: '<!-- Posicione a lousa de draw do jogo -->\n',
    solutionExample: '<canvas id="game-stage" width="400" height="300"></canvas>',
    tests: [
      { id: 't1', description: 'Deve conter tag canvas', ruleType: 'regex', expected: '<canvas[^>]*>[\\s\\S]*<\\/canvas>' },
      { id: 't2', description: 'O id deve ser game-stage', ruleType: 'regex', expected: 'id="game-stage"' },
      { id: 't3', description: 'Deve ter largura de 400', ruleType: 'regex', expected: 'width="400"' },
      { id: 't4', description: 'Deve ter altura de 300', ruleType: 'regex', expected: 'height="300"' }
    ],
    hint: 'Não se esqueça que o canvas exige tag de fechamento explicita: </canvas>.',
    coinsReward: 45,
    xpReward: 240,
    order: 13
  },
  {
    id: 'html_adv_4',
    title: 'Iframe do Espectador',
    description: 'Projete painéis secundários de monitoria englobando páginas secundárias externas de estatísticas.',
    concept: 'A tag `<iframe>` incorpora de forma isolada outros portais e mídias integradas na interface.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Insira um `<iframe>` contendo a URL de origem src="https://example.com" e o atributo para sandbox habilitado de forma simples: `sandbox=""`.',
    initialCode: '<!-- Embuta o portal orbital -->\n',
    solutionExample: '<iframe src="https://example.com" sandbox=""></iframe>',
    tests: [
      { id: 't1', description: 'Deve carregar elemento iframe', ruleType: 'regex', expected: '<iframe[^>]*>[\\s\\S]*?<\\/iframe>' },
      { id: 't2', description: 'src deve apontar para https://example.com', ruleType: 'regex', expected: 'src="https:\\/\\/example\\.com"' },
      { id: 't3', description: 'Deve carregar o atributo de segurança "sandbox"', ruleType: 'regex', expected: 'sandbox=""|sandbox' }
    ],
    hint: 'Deixe o conteúdo entre a abertura e fechamento do iframe inteiramente vazio.',
    coinsReward: 45,
    xpReward: 250,
    order: 14
  },
  {
    id: 'html_adv_5',
    title: 'O Enigma de Seleção',
    description: 'Preencha o pergaminho estruturado com opções de armas e textos descritivos extensos para fechar o ciclo de tags HTML.',
    concept: 'Tags `<select>` com opções `<option>` encapsulam escolhas múltiplas em menus drop-down, e `<textarea>` cria caixas multilinhas.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Construa um `<select>` contendo uma `<option>` com valor "fogo" e texto "Divindade do Fogo". Crie também um `<textarea>` com id "relato".',
    initialCode: '<!-- Formulário avançado final -->\n',
    solutionExample: '<select>\n  <option value="fogo">Divindade do Fogo</option>\n</select>\n<textarea id="relato"></textarea>',
    tests: [
      { id: 't1', description: 'Deve conter tag select', ruleType: 'regex', expected: '<select[^>]*>[\\s\\S]*<\\/select>' },
      { id: 't2', description: 'O select deve embalar a Option com value="fogo"', ruleType: 'regex', expected: '<option[^>]*value="fogo"' },
      { id: 't3', description: 'O texto da option deve ser Divindade do Fogo', ruleType: 'regex', expected: '>Divindade do Fogo<\\/option>' },
      { id: 't4', description: 'Deve conter tag textarea com id relato', ruleType: 'regex', expected: '<textarea[^>]*id="relato"|id="relato"[\\s\\S]*<textarea' }
    ],
    hint: 'Aninhe a option dentro do select. Declare a tag do textarea ao lado separadamente.',
    coinsReward: 50,
    xpReward: 300,
    order: 15
  },

  // ==================== CSS TRACK ====================
  // --- INICIANTE (5 lessons) ---
  {
    id: 'css_ini_1',
    title: 'A Forja das Cores',
    description: 'Mude as cores frias e cinzentas do reino para um belo tema escarlate heroico.',
    concept: 'No CSS, mudamos a tonalidade de palavras com `color` e coberturas de fundo com `background-color`.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Estilize a declaração de elemento h1 para possuir cor de texto vermelha (`red`) e cor de fundo preta (`black`).',
    initialCode: 'h1 {\n  \n}',
    solutionExample: 'h1 {\n  color: red;\n  background-color: black;\n}',
    tests: [
      { id: 't1', description: 'Deve conter propriedade color definida em red', ruleType: 'regex', expected: 'color\\s*:\\s*red\\s*;' },
      { id: 't2', description: 'Deve conter propriedade background-color definida em black', ruleType: 'regex', expected: 'background-color\\s*:\\s*black\\s*;' }
    ],
    hint: 'Não se esqueça de aplicar os dois pontos e o ponto-e-vírgula em cada declaração CSS.',
    coinsReward: 15,
    xpReward: 100,
    order: 1
  },
  {
    id: 'css_ini_2',
    title: 'Muros do Forte',
    description: 'Cerque seus parágrafos com muralhas de pedra sólidas e cantos arredondados e elegantes.',
    concept: 'A propriedade `border` engloba a espessura, o tipo de linha e a cor. `border-radius` define o quão redondas serão as bordas.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Aplique no seletor `.card` uma borda sólida de 2px de cor verde (`2px solid green`) e arredondamento (border-radius) de "10px".',
    initialCode: '.card {\n  \n}',
    solutionExample: '.card {\n  border: 2px solid green;\n  border-radius: 10px;\n}',
    tests: [
      { id: 't1', description: 'Deve possuir propriedade border configurada com 2px solid green', ruleType: 'regex', expected: 'border\\s*:\\s*2px\\s+solid\\s+green\\s*;' },
      { id: 't2', description: 'O arredondamento da borda deve ser de 10px', ruleType: 'regex', expected: 'border-radius\\s*:\\s*10px\\s*;' }
    ],
    hint: 'O seletor de classe .card já está declarado. Insira as regras dentro das chaves.',
    coinsReward: 15,
    xpReward: 100,
    order: 2
  },
  {
    id: 'css_ini_3',
    title: 'Espaço Vital',
    description: 'Diga não ao sufocamento dos textos! Use preenchimentos internos e distâncias externas decorosas.',
    concept: '`padding` define o respiro interno do contêiner, enquanto `margin` estabelece o distanciamento das fronteiras externas.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Adicione no seletor `section` um espaçamento interno (`padding`) de "20px" em todas as direções e uma distância externa (`margin`) de "15px" apenas na base (`margin-bottom`).',
    initialCode: 'section {\n  \n}',
    solutionExample: 'section {\n  padding: 20px;\n  margin-bottom: 15px;\n}',
    tests: [
      { id: 't1', description: 'Deve aplicar padding de 20px', ruleType: 'regex', expected: 'padding\\s*:\\s*20px\\s*;' },
      { id: 't2', description: 'Deve aplicar margin-bottom de 15px', ruleType: 'regex', expected: 'margin-bottom\\s*:\\s*15px\\s*;' }
    ],
    hint: 'Use a subpropriedade margin-bottom para focar o efeito apenas na face inferior do contêiner.',
    coinsReward: 20,
    xpReward: 110,
    order: 3
  },
  {
    id: 'css_ini_4',
    title: 'Tipografia de Prestígio',
    description: 'Crie uma experiência legível e perfeitamente equilibrada configurando fontes e centralização textual.',
    concept: 'Controlamos o tamanho com `font-size`, a família com `font-family` e o alinhamento com `text-align`.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Configure os parágrafos tipográficos `p` para ter fonte de tamanho "18px", serem alinhados ao centro (`center`), e definir o estilo em negrito através de `font-weight: bold;`.',
    initialCode: 'p {\n  \n}',
    solutionExample: 'p {\n  font-size: 18px;\n  text-align: center;\n  font-weight: bold;\n}',
    tests: [
      { id: 't1', description: 'font-size em 18px', ruleType: 'regex', expected: 'font-size\\s*:\\s*18px\\s*;' },
      { id: 't2', description: 'text-align em center', ruleType: 'regex', expected: 'text-align\\s*:\\s*center\\s*;' },
      { id: 't3', description: 'font-weight em bold', ruleType: 'regex', expected: 'font-weight\\s*:\\s*bold\\s*;' }
    ],
    hint: 'Altere as propriedades na tag p.',
    coinsReward: 20,
    xpReward: 120,
    order: 4
  },
  {
    id: 'css_ini_5',
    title: 'A Mira dos Seletores',
    description: 'Acerte o alvo mirado! Aprenda a direcionar o estilo para o ID exclusivo do herói lendário.',
    concept: 'Seletores de classes usam o prefixo ponto (`.`), enquanto o símbolo da tralha/cerquilha (`#`) direciona para o ID exclusivo correspondente.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Estilize o ID exclusivo `#guerreiro` com cor branca (`white`) e a classe `.inimigo` com a cor vermelha (`red`).',
    initialCode: '/* Alvos especiais */\n',
    solutionExample: '#guerreiro {\n  color: white;\n}\n.inimigo {\n  color: red;\n}',
    tests: [
      { id: 't1', description: 'Estilização do ID #guerreiro deve ter color: white', ruleType: 'regex', expected: '#guerreiro\\s*\\{[\\s\\S]*?color\\s*:\\s*white\\s*;?[\\s\\S]*?\\}' },
      { id: 't2', description: 'Estilização da classe .inimigo deve ter color: red', ruleType: 'regex', expected: '\\.inimigo\\s*\\{[\\s\\S]*?color\\s*:\\s*red\\s*;?[\\s\\S]*?\\}' }
    ],
    hint: 'Fique atento: #guerreiro deve levar o símbolo cerquilha e .inimigo leva o ponto no início.',
    coinsReward: 20,
    xpReward: 130,
    order: 5
  },

  // --- INTERMEDIÁRIO (5 lessons) ---
  {
    id: 'css_int_1',
    title: 'Aliança Horizontal (Flexbox)',
    description: 'Ordene suas forças! Posicione caixas lado a lado em um layout fluido de forma profissional sem usar tabelas antigas.',
    concept: 'Ativar `display: flex;` transforma o contêiner em uma via flexível. `justify-content: space-around;` distribui o espaço uniformemente.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Alinha as caixas filhas horizontalmente definindo na classe `.container` o display como "flex" e o alinhamento central utilizando `justify-content: space-between;`.',
    initialCode: '.container {\n  \n}',
    solutionExample: '.container {\n  display: flex;\n  justify-content: space-between;\n}',
    tests: [
      { id: 't1', description: 'display deve ser flex', ruleType: 'regex', expected: 'display\\s*:\\s*flex\\s*;' },
      { id: 't2', description: 'justify-content em space-between', ruleType: 'regex', expected: 'justify-content\\s*:\\s*space-between\\s*;' }
    ],
    hint: 'Não se esqueça do hífen em justify-content e a exatidão do valor space-between.',
    coinsReward: 25,
    xpReward: 150,
    order: 6
  },
  {
    id: 'css_int_2',
    title: 'Mosaico Sagrado (Grid)',
    description: 'Arranjos bidimensionais. Crie a estrutura de um inventário clássico de RPG usando uma grade de colunas equilibrada.',
    concept: 'Declarar `display: grid;` cria uma malha flexível. A propriedade `grid-template-columns` divide o espaço em faixas proporcionais.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'No seletor `.mochila`, defina display "grid", configure três colunas simétricas usando `grid-template-columns: repeat(3, 1fr);` e defina um espaçamento (`gap`) de "10px".',
    initialCode: '.mochila {\n  \n}',
    solutionExample: '.mochila {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 10px;\n}',
    tests: [
      { id: 't1', description: 'Deve ser display: grid', ruleType: 'regex', expected: 'display\\s*:\\s*grid\\s*;' },
      { id: 't2', description: 'Devem ser três colunas estruturadas', ruleType: 'regex', expected: 'grid-template-columns\\s*:\\s*repeat\\s*\\(\\s*3\\s*,\\s*1fr\\s*\\)\\s*;' },
      { id: 't3', description: 'gap entre slots deve ser de 10px', ruleType: 'regex', expected: 'gap\\s*:\\s*10px\\s*;' }
    ],
    hint: 'Utilize exatamente repeat(3, 1fr) para criar as três colunas.',
    coinsReward: 30,
    xpReward: 160,
    order: 7
  },
  {
    id: 'css_int_3',
    title: 'Levitação Absoluta',
    description: 'Defina as amarras geométricas de posicionamento no espaço sobrepondo as poções de aviso ao card principal.',
    concept: 'Atribuir `position: absolute;` permite soltar o elemento livremente do fluxo. Seu ponto de origem é balizado pela primeira tag pai declarada como `position: relative;`.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Estilize `.card-pai` para possuir posicionamento relativo (`position: relative;`) e stiles `.pin-filho` para ter posicionamento absoluto (`position: absolute;`) e estar alinhado no topo ("0") e na direita ("0").',
    initialCode: '.card-pai {\n  \n}\n\n.pin-filho {\n  \n}',
    solutionExample: '.card-pai {\n  position: relative;\n}\n.pin-filho {\n  position: absolute;\n  top: 0;\n  right: 0;\n}',
    tests: [
      { id: 't1', description: 'Seletor .card-pai deve ser position: relative', ruleType: 'regex', expected: '\\.card-pai\\s*\\{[\\s\\S]*?position\\s*:\\s*relative\\s*;?[\\s\\S]*?\\}' },
      { id: 't2', description: 'Seletor .pin-filho deve ser position: absolute', ruleType: 'regex', expected: '\\.pin-filho\\s*\\{[\\s\\S]*?position\\s*:\\s*absolute\\s*;?[\\s\\S]*?\\}' },
      { id: 't3', description: '.pin-filho no topo (top: 0) e direita (right: 0)', ruleType: 'regex', expected: 'top\\s*:\\s*0\\s*;[\\s\\S]*?right\\s*:\\s*0\\s*;|right\\s*:\\s*0\\s*;[\\s\\S]*?top\\s*:\\s*0\\s*;' }
    ],
    hint: 'Combine as propriedades position e as coordenadas top e right.',
    coinsReward: 30,
    xpReward: 170,
    order: 8
  },
  {
    id: 'css_int_4',
    title: 'Aparência Mutante (Media Query)',
    description: 'Prepare os escudos de responsividade! Mude o pano de fundo do campo de batalhas em telas compactas de celulares.',
    concept: 'Media queries escutam o tamanho físico da tela de exibição, aplicando estilos especiais como `max-width` dinamicamente.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Defina uma regra de mídia `@media` escutando telas de no máximo 600px (`max-width: 600px`). Dentro dela, configure a classe `.batalha` para possuir `background-color: blue;`.',
    initialCode: '/* Regra de responsividade celular */\n',
    solutionExample: '@media (max-width: 600px) {\n  .batalha {\n    background-color: blue;\n  }\n}',
    tests: [
      { id: 't1', description: 'Deve registrar a cláusula @media', ruleType: 'regex', expected: '@media' },
      { id: 't2', description: 'A cláusula deve avaliar max-width de 600px', ruleType: 'regex', expected: 'max-width\\s*:\\s*600px' },
      { id: 't3', description: '.batalha com background-color: blue dentro da media query', ruleType: 'regex', expected: '\\.batalha\\s*\\{[\\s\\S]*background-color\\s*:\\s*blue\\s*' }
    ],
    hint: 'Lembre-se de aninhar as chaves do seletor dentro das chaves principais da declaração @media.',
    coinsReward: 30,
    xpReward: 180,
    order: 9
  },
  {
    id: 'css_int_5',
    title: 'Sombra da Revelação',
    description: 'Adicione profundidade misteriosa aos seus elementos aplicando sombras dignas de relíquias divinas.',
    concept: '`box-shadow` aceita deslocamento horizontal, vertical, difusão e cor da sombra para criar um efeito tridimensional realista.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Estilize o seletor `.reliquia` aplicando uma sombra (`box-shadow`) com 5px horizontal, 5px vertical, 10px de desfoque e cor cinza escura (`rgba(0,0,0,0.5)`).',
    initialCode: '.reliquia {\n  \n}',
    solutionExample: '.reliquia {\n  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);\n}',
    tests: [
      { id: 't1', description: 'Deve aplicar a propriedade box-shadow', ruleType: 'regex', expected: 'box-shadow\\s*:\\s*5px\\s+5px\\s+10px\\s+rgba\\s*\\(\\s*0\\s*,\\s*0\\s*,\\s*0\\s*,\\s*0\\.5\\s*\\)\\s*;' }
    ],
    hint: 'Insira os valores na ordem exata e separados por espaços simples.',
    coinsReward: 35,
    xpReward: 190,
    order: 10
  },

  // --- AVANÇADO (5 lessons) ---
  {
    id: 'css_adv_1',
    title: 'Feitiço da Transição',
    description: 'Basta um toque do mouse para ver a mágica surgir de forma graciosa, sem deformar a vista repentinamente.',
    concept: 'A propriedade `transition` determina o tempo de duração e a rampa matemática de velocidade para suavizar variações de estilo.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Insira no seletor `.botao` transições suaves para qualquer alteração configurando `transition: all 0.3s ease;`.',
    initialCode: '.botao {\n  \n}',
    solutionExample: '.botao {\n  transition: all 0.3s ease;\n}',
    tests: [
      { id: 't1', description: 'Propriedade transition definida em all 0.3s ease', ruleType: 'regex', expected: 'transition\\s*:\\s*all\\s+0\\.3s\\s+ease\\s*;' }
    ],
    hint: 'Os parâmetros essenciais são o alvo (all), o cronômetro (0.3s) e a transição dinâmica (ease).',
    coinsReward: 40,
    xpReward: 220,
    order: 11
  },
  {
    id: 'css_adv_2',
    title: 'A Dança Flutuante',
    description: 'Animações vivas continuas! Forje uma pulsação infinita que capture as atenções do jogador.',
    concept: 'Declarar regras `@keyframes` cria sequências animadas que executam loops infinitos ao serem ligadas via `animation`.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Crie uma animação `@keyframes pulsar` com estado final `100% { transform: scale(1.1); }`.',
    initialCode: '/* Crie o pulsar dinâmico */\n',
    solutionExample: '@keyframes pulsar {\n  100% {\n    transform: scale(1.1);\n  }\n}',
    tests: [
      { id: 't1', description: 'Deve possuir declaração @keyframes pulsar', ruleType: 'regex', expected: '@keyframes pulsar' },
      { id: 't2', description: 'Configurado com transform scale de 1.1 em 100%', ruleType: 'regex', expected: '100%\\s*\\{[\\s\\S]*?transform\\s*:\\s*scale\\s*\\(\\s*1\\.1\\s*\\)' }
    ],
    hint: 'Use @keyframes pulsar { 100% { transform: scale(1.1); } } para liberar o progresso.',
    coinsReward: 40,
    xpReward: 230,
    order: 12
  },
  {
    id: 'css_adv_3',
    title: 'Alquimia das Variáveis',
    description: 'Simplifique sua legibilidade guardando as cores principais em cofres sistêmicos globalizados.',
    concept: 'CSS Variables declaradas em `:root` iniciam com traços duplos (`--`) e são instanciadas em qualquer lugar com `var(--nome)`.',
    track: 'css',
    difficulty: 'avancado',
    task: 'No seletor `:root`, declare a variável `--cor-tema` com valor `#ff0055` e utilize-a como cor de texto do seletor `h2`.',
    initialCode: ':root {\n  \n}\n\nh2 {\n  \n}',
    solutionExample: ':root {\n  --cor-tema: #ff0055;\n}\nh2 {\n  color: var(--cor-tema);\n}',
    tests: [
      { id: 't1', description: 'Definir variavel --cor-tema no :root com valor #ff0055', ruleType: 'regex', expected: '--cor-tema\\s*:\\s*#ff0055\\s*;' },
      { id: 't2', description: 'Seletor h2 usufruindo de color: var(--cor-tema)', ruleType: 'regex', expected: 'color\\s*:\\s*var\\s*\\(\\s*--cor-tema\\s*\\)\\s*;' }
    ],
    hint: 'Aplique a sintaxe exata var(--cor-tema) no campo color de h2.',
    coinsReward: 45,
    xpReward: 240,
    order: 13
  },
  {
    id: 'css_adv_4',
    title: 'Vélos de Neblina (Filtros)',
    description: 'Ilusões ópticas avançadas. Esconda ou desfoque fatias da interface gerando mistério ao redor do dragão.',
    concept: 'A propriedade `filter: blur()` adiciona gaussian mists e desfoques elegantes nas tags selecionadas instantaneamente.',
    track: 'css',
    difficulty: 'avancado',
    task: 'No seletor `.dragao-mistico`, aplique um filtro de desfoque (`filter`) de exatamente "8px".',
    initialCode: '.dragao-mistico {\n  \n}',
    solutionExample: '.dragao-mistico {\n  filter: blur(8px);\n}',
    tests: [
      { id: 't1', description: 'filter deve ter o padrão blur(8px)', ruleType: 'regex', expected: 'filter\\s*:\\s*blur\\s*\\(\\s*8px\\s*\\)\\s*;' }
    ],
    hint: 'A sintaxe apropriada exige o termo blur englobando os valores numéricos.',
    coinsReward: 45,
    xpReward: 250,
    order: 14
  },
  {
    id: 'css_adv_5',
    title: 'Giro Dimensional 3D',
    description: 'As famosas cartas tridimensionais. Complete o feitiço aplicando giros nos eixos do espaço nos cards heróicos.',
    concept: 'Atribuir `transform: rotateY(180deg);` vira o item para o outro lado horizontalmente gerando efeitos espetaculares.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Modifique as propriedades do seletor `.carta` aplicando giradas de 180 graus no eixo Y utilizando `transform: rotateY(180deg);`.',
    initialCode: '.carta {\n  \n}',
    solutionExample: '.carta {\n  transform: rotateY(180deg);\n}',
    tests: [
      { id: 't1', description: 'carta deve carregar transform rotateY de 180deg', ruleType: 'regex', expected: 'transform\\s*:\\s*rotateY\\s*\\(\\s*180deg\\s*\\)\\s*;' }
    ],
    hint: 'Utilize o comando rotateY(180deg) nas propriedades da classe da carta.',
    coinsReward: 50,
    xpReward: 300,
    order: 15
  },

  // ==================== JAVASCRIPT TRACK ====================
  // --- INICIANTE (5 lessons) ---
  {
    id: 'js_ini_1',
    title: 'Cofre das Variáveis',
    description: 'Na lógica da programação, as caixas seguras guardam dados cruciais que computamos ao longo da batalha.',
    concept: '`const` define uma caixa permanente que não pode ser modificada depois de criada. `let` aceita novas atribuições.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Declare uma constante de nome `heroi` com valor textual "Galahad", e uma variável `energia` com valor numérico "100".',
    initialCode: '// Forje suas primeiras caixas lógicas\n',
    solutionExample: 'const heroi = "Galahad";\nlet energia = 100;',
    tests: [
      { id: 't1', description: 'Declarar const heroi com "Galahad"', ruleType: 'regex', expected: 'const\\s+heroi\\s*=\\s*["\']Galahad["\']\\s*;?' },
      { id: 't2', description: 'Declarar let energia com 100', ruleType: 'regex', expected: 'let\\s+energia\\s*=\\s*100\\s*;?' }
    ],
    hint: 'Note o uso de aspas para strings e números puros para valores decimais ou inteiros.',
    coinsReward: 15,
    xpReward: 100,
    order: 1
  },
  {
    id: 'js_ini_2',
    title: 'Fronteiras da Decisão',
    description: 'Encruzilhadas morais. Crie um sinaleiro lógico para desviar guerreiros debilitados longe das garras do dragão.',
    concept: 'Estruturas condicionais (`if` e `else`) desviam o código dependendo se a expressão booleana é verdadeira ou falsa.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Crie uma verificação: se `vida` for menor que 30, retorne a string "Recuar", caso contrário retorne "Avançar".',
    initialCode: 'function decidirRota(vida) {\n  // Implemente sua condição\n  \n}',
    solutionExample: 'function decidirRota(vida) {\n  if (vida < 30) {\n    return "Recuar";\n  } else {\n    return "Avançar";\n  }\n}',
    tests: [
      { id: 't1', description: 'Deve conter estrutura if (vida < 30)', ruleType: 'regex', expected: 'if\\s*\\(\\s*vida\\s*<\\s*30\\s*\\)' },
      { id: 't2', description: 'Retornar "Recuar" quando vida menor que 30', ruleType: 'regex', expected: 'return\\s*["\']Recuar["\']' },
      { id: 't3', description: 'Retornar "Avançar" no bloco else', ruleType: 'regex', expected: 'else\\s*\\{[\\s\\S]*?return\\s*["\']Avançar["\']' }
    ],
    hint: 'Não se esqueça das chaves abrindo e fechando cada uma das escolhas do fluxo.',
    coinsReward: 15,
    xpReward: 100,
    order: 2
  },
  {
    id: 'js_ini_3',
    title: 'Grito das Funções',
    description: 'Máquinas utilitárias que repetem lógicas sob demanda ao invocarmos seus nomes especiais.',
    concept: 'Definimos funções com `function nome(parametro) { ... }` para devolver resultados computados usando `return`.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Declare uma função `saudarGuerreiro` que receba um parâmetro `nome` e retorne "Olá, " concatenado com o valor de `nome`.',
    initialCode: '// Crie a saudação de batalha\n',
    solutionExample: 'function saudarGuerreiro(nome) {\n  return "Olá, " + nome;\n}',
    tests: [
      { id: 't1', description: 'Deve declarar a função saudarGuerreiro', ruleType: 'regex', expected: 'function\\s+saudarGuerreiro\\s*\\(\\s*nome\\s*\\)' },
      { id: 't2', description: 'Deve possuir retorno concatenado adequado', ruleType: 'regex', expected: 'return\\s*["\']Olá,\\s*["\']\\s*\\+\\s*nome|return\\s*[`]Olá,\\s*\\$\\{\\s*nome\\s*\\}[`]' }
    ],
    hint: 'Exemplo: return "Olá, " + nome; ou use templates strings.',
    coinsReward: 20,
    xpReward: 110,
    order: 3
  },
  {
    id: 'js_ini_4',
    title: 'Arqueiro Matemático',
    description: 'Cálculos de dano crítico. Multiplique as estatísticas de ataque heróicos de acordo com modificadores de força.',
    concept: 'Operadores matemáticos como multiplicação (`*`), divisão (`/`), soma (`+`) e subtração (`-`) são fundamentais no motor de jogos.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Crie uma função `calcularAtaque(forca, multiplicador)` que retorne o resultado da multiplicação entre as duas variáveis passadas.',
    initialCode: '// Implemente a multiplicação\n',
    solutionExample: 'function calcularAtaque(forca, multiplicador) {\n  return forca * multiplicador;\n}',
    tests: [
      { id: 't1', description: 'Função calcularAtaque declarada com argumentos', ruleType: 'regex', expected: 'function\\s+calcularAtaque\\s*\\(\\s*forca\\s*,\\s*multiplicador\\s*\\)' },
      { id: 't2', description: 'Deve conter o retorno multiplicativo (*)', ruleType: 'regex', expected: 'return\\s+forca\\s*\\*\\s*multiplicador' }
    ],
    hint: 'Basta retornar o valor de forca multiplicado pelo multiplicador.',
    coinsReward: 20,
    xpReward: 120,
    order: 4
  },
  {
    id: 'js_ini_5',
    title: 'Mochila de Itens (Arrays)',
    description: 'Inventários organizados guardam relíquias em sequências numeradas e fáceis de carregar.',
    concept: 'Arrays `[...]` listam valores sob coordenadas numéricas que se iniciam em zero. Acessamos modificando as chaves indexadoras.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Dado um array de itens, retorne o primeiro elemento contido no mesmo (index 0).',
    initialCode: 'function obterPrimeiroItem(inventario) {\n  // Devolva o item principal da mochila\n  \n}',
    solutionExample: 'function obterPrimeiroItem(inventario) {\n  return inventario[0];\n}',
    tests: [
      { id: 't1', description: 'Deve retornar o index 0 do array', ruleType: 'regex', expected: 'return\\s+inventario\\s*\\[\\s*0\\s*\\]' }
    ],
    hint: 'A sintaxe correta para ler arrays exige colchetes ao invés de parênteses tradicionais.',
    coinsReward: 20,
    xpReward: 130,
    order: 5
  },

  // --- INTERMEDIÁRIO (5 lessons) ---
  {
    id: 'js_int_1',
    title: 'Laço dos Ecos (Loop)',
    description: 'Repetições exaustivas. Faça o mensageiro heróico repetir os avisos de invasão seguidas vezes.',
    concept: 'Estruturas `for` rodam o mesmo bloco lógico múltiplas vezes controlando contadores para evitar loops eternos.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Construa uma função `dispararEcos(interacoes)` que acumule a palavra "Eco" em uma frase e a retorne separada por espaços usando um loop for.',
    initialCode: 'function dispararEcos(interacoes) {\n  let resultado = "";\n  // Complete o loop for aqui\n  \n  return resultado.trim();\n}',
    solutionExample: 'function dispararEcos(interacoes) {\n  let resultado = "";\n  for (let i = 0; i < interacoes; i++) {\n    resultado += "Eco ";\n  }\n  return resultado.trim();\n}',
    tests: [
      { id: 't1', description: 'Deve conter a instrução loop for', ruleType: 'regex', expected: 'for\\s*\\(.*?;\\s*.*?;\\s*.*?\\)' },
      { id: 't2', description: 'Devem ser adicionadas concatenações com resultado', ruleType: 'regex', expected: 'resultado\\s*\\+=\\s*["\']Eco\\s*["\']' }
    ],
    hint: 'Defina a variável let i = 0 no seu loop, medindo se é menor que o parâmetro interacoes.',
    coinsReward: 25,
    xpReward: 150,
    order: 6
  },
  {
    id: 'js_int_2',
    title: 'Convocação do DOM',
    description: 'Controle vivo da tela! Utilize JavaScript para rastrear e ler elementos declarados na sua interface.',
    concept: '`document.getElementById` localiza tags instantaneamente que possuam o id correspondente e permite ler ou alterar textos.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Crie uma função `capturarStatus()` que retorne o conteúdo interno de texto (`textContent` ou `innerHTML`) do elemento de id "vidas-restantes".',
    initialCode: 'function capturarStatus() {\n  // Invoque e resgate os dados do DOM\n  \n}',
    solutionExample: 'function capturarStatus() {\n  return document.getElementById("vidas-restantes").textContent;\n}',
    tests: [
      { id: 't1', description: 'Deve invocar document.getElementById', ruleType: 'regex', expected: 'document\\.getElementById\\s*\\(\\s*["\']vidas-restantes["\']\\s*\\)' },
      { id: 't2', description: 'Deve retornar a propriedade de texto', ruleType: 'regex', expected: 'textContent|innerHTML|innerText' }
    ],
    hint: 'Lembre-se de usar exatamente document.getElementById("vidas-restantes").textContent.',
    coinsReward: 30,
    xpReward: 160,
    order: 7
  },
  {
    id: 'js_int_3',
    title: 'Gatilho de Evento',
    description: 'Cliques reativos! Amarre ações inteligentes em botões para que a interface reaja aos golpes do jogador.',
    concept: '`element.addEventListener` registra callbacks executados assim que eventos como "click", "submit" ou "keydown" disparam.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Complete a função vinculando um evento de clique ("click") no botão recebido como argumento que chame a função `baterBumbo`.',
    initialCode: 'function prenderEvento(botao, baterBumbo) {\n  // Conecte o evento\n  \n}',
    solutionExample: 'function prenderEvento(botao, baterBumbo) {\n  botao.addEventListener("click", baterBumbo);\n}',
    tests: [
      { id: 't1', description: 'Deve chamar botao.addEventListener', ruleType: 'regex', expected: 'botao\\.addEventListener\\s*\\(\\s*["\']click["\']' },
      { id: 't2', description: 'Deve passar baterBumbo como callback', ruleType: 'regex', expected: 'addEventListener\\s*\\(\\s*["\']click["\']\\s*,\\s*baterBumbo\\s*\\)' }
    ],
    hint: 'Passe apenas a referência paterna do método baterBumbo, sem os parênteses executores.',
    coinsReward: 30,
    xpReward: 170,
    order: 8
  },
  {
    id: 'js_int_4',
    title: 'Filtro dos Eleitos (Arrays e Métodos)',
    description: 'Estatísticas refinadas. Faça buscas refinadas nas caruanas de guerreiros recolhendo apenas campeões de level alto.',
    concept: 'O método `.filter()` cria uma array novinha avaliando callback booleana elemento por elemento de forma funcional.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Dada a lista `guerreiros` (onde cada item possui a propriedade `.level`), retorne apenas quem tem level maior ou igual a 50 usando o método `.filter()`.',
    initialCode: 'function selecionarElites(guerreiros) {\n  // Use filter para apurar os dados\n  \n}',
    solutionExample: 'function selecionarElites(guerreiros) {\n  return guerreiros.filter(g => g.level >= 50);\n}',
    tests: [
      { id: 't1', description: 'Deve utilizar o seletor .filter', ruleType: 'regex', expected: '\\.filter\\s*\\(' },
      { id: 't2', description: 'A lógica avalia level >= 50', ruleType: 'regex', expected: 'level\\s*>=\\s*50|\\w+\\s*=>\\s*\\w+\\.level\\s*>=\\s*50' }
    ],
    hint: 'filter() recebe um predicado de retorno condicional.',
    coinsReward: 30,
    xpReward: 180,
    order: 9
  },
  {
    id: 'js_int_5',
    title: 'A Criação de Matéria (DOM Dinâmico)',
    description: 'Faça brotar poções mágicas na tela inserindo tags novas de forma dinâmica ao derrotar monstros.',
    concept: '`document.createElement` gera novos nós que o método `appendChild` do objeto pai aninha dinamicamente ao DOM.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Crie uma tag "div" usando `document.createElement`, defina seu texto interno como "Item Lendário" e anexe no contêiner pai.',
    initialCode: 'function spawnLoote(conteinerPai) {\n  // Gere o loot\n  \n}',
    solutionExample: 'function spawnLoote(conteinerPai) {\n  const item = document.createElement("div");\n  item.textContent = "Item Lendário";\n  conteinerPai.appendChild(item);\n}',
    tests: [
      { id: 't1', description: 'Chamar document.createElement("div")', ruleType: 'regex', expected: 'document\\.createElement\\s*\\(\\s*["\']div["\']\\s*\\)' },
      { id: 't2', description: 'Aplicar texto "Item Lendário"', ruleType: 'regex', expected: '["\']Item Lendário["\']' },
      { id: 't3', description: 'Parent recebe appendChild', ruleType: 'regex', expected: 'conteinerPai\\.appendChild' }
    ],
    hint: 'Lembre-se de chamar appendChild no elemento conteinerPai repassando a nova div criada.',
    coinsReward: 35,
    xpReward: 190,
    order: 10
  },

  // --- AVANÇADO (5 lessons) ---
  {
    id: 'js_adv_1',
    title: 'A Promessa Heroica (Promises)',
    description: 'Promessas assíncronas. Aprenda a lidar com operações diferidas que levam tempo a se resolver.',
    concept: 'O objeto `Promise` serve de contrato que resolve dados favoráveis ou rejeita defeitos de forma não-bloqueante.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Crie uma função `prometerRecompensa()` que retorne uma Promessa resolvida com o texto "Tesouro Concedido".',
    initialCode: 'function prometerRecompensa() {\n  // Forje a Promessa contratual\n  \n}',
    solutionExample: 'function prometerRecompensa() {\n  return Promise.resolve("Tesouro Concedido");\n}',
    tests: [
      { id: 't1', description: 'Deve devolver objeto Promise', ruleType: 'regex', expected: 'Promise' },
      { id: 't2', description: 'Deve resolver ou devolver resolvida com Tesouro Concedido', ruleType: 'regex', expected: '["\']Tesouro Concedido["\']' }
    ],
    hint: 'A forma mais rápida de criar é usar Promise.resolve("seu texto").',
    coinsReward: 40,
    xpReward: 220,
    order: 11
  },
  {
    id: 'js_adv_2',
    title: 'Oração do Oráculo (Fetch API)',
    description: 'Comunicação remota. Requisite dados vitais sobre novos monstros em servidores distantes usando o feitiço de busca.',
    concept: '`fetch()` retorna promessas contendo respostas de servidores. Usar `async/await` simplifica requisições assíncronas.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Crie uma função assíncrona `buscarMonstro(url)` que faça um `fetch` na URL, converta a resposta para JSON usando `.json()` e retorne o resultado final.',
    initialCode: 'async function buscarMonstro(url) {\n  // Busque monstruosidades fora do castelo\n  \n}',
    solutionExample: 'async function buscarMonstro(url) {\n  const response = await fetch(url);\n  return await response.json();\n}',
    tests: [
      { id: 't1', description: 'Função deve ser assíncrona (async)', ruleType: 'regex', expected: 'async\\s+function' },
      { id: 't2', description: 'Deve fazer chamada fetch(url)', ruleType: 'regex', expected: 'fetch\\s*\\(\\s*url\\s*\\)' },
      { id: 't3', description: 'Deve fazer a conversão de dados .json()', ruleType: 'regex', expected: '\\.json\\s*\\(\\s*\\)' }
    ],
    hint: 'Use a palavra reservada await tanto para a resposta de fetch quanto para a conversão de .json().',
    coinsReward: 40,
    xpReward: 230,
    order: 12
  },
  {
    id: 'js_adv_3',
    title: 'O Segredo Codificado (JSON)',
    description: 'Manipulação estrutural. Transforme objetos complexos de guerreiros em dados textuais compactados para transporte seguro.',
    concept: '`JSON.stringify()` converte estruturas em texto puro, e `JSON.parse()` decodifica textos voltando ao modelo original.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Escreva uma função `serializarHeroi(objeto)` que converta o herói recebido em texto de modelo JSON estruturado e retorne este texto.',
    initialCode: 'function serializarHeroi(objeto) {\n  // Compacte os pergaminhos de dados\n  \n}',
    solutionExample: 'function serializarHeroi(objeto) {\n  return JSON.stringify(objeto);\n}',
    tests: [
      { id: 't1', description: 'Deve invocar o método estático JSON.stringify', ruleType: 'regex', expected: 'JSON\\.stringify\\s*\\(\\s*objeto\\s*\\)' }
    ],
    hint: 'Basta acionar JSON.stringify(objeto) no comando de retorno.',
    coinsReward: 45,
    xpReward: 240,
    order: 13
  },
  {
    id: 'js_adv_4',
    title: 'O Cofre de Alquimia (LocalStorage)',
    description: 'Salvar heróis das perdas de sessão. Escreva os dados e pontuações na memória imorredoura do navegador.',
    concept: '`localStorage.setItem(chave, valor)` guarda dados nos confins do navegador, sobrevivendo aos recarregamentos de página.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Crie uma função `salvarXP(valor)` que guarde o valor recebido na chave "pontos_xp" do localStorage do usuário.',
    initialCode: 'function salvarXP(valor) {\n  // Salve com maestria imorredoura\n  \n}',
    solutionExample: 'function salvarXP(valor) {\n  localStorage.setItem("pontos_xp", valor);\n}',
    tests: [
      { id: 't1', description: 'Deve chamar o Storage API localStorage.setItem', ruleType: 'regex', expected: 'localStorage\\.setItem\\s*\\(\\s*["\']pontos_xp["\']\\s*,\\s*valor\\s*\\)' }
    ],
    hint: 'Passe a chave exata "pontos_xp" como o primeiro parâmetro de setItem.',
    coinsReward: 45,
    xpReward: 250,
    order: 14
  },
  {
    id: 'js_adv_5',
    title: 'Relógio Rúnico (SetInterval)',
    description: 'Sistemas solares iterativos. Projete o coração pulsante do tempo do jogo, computando ticks constantes de ação.',
    concept: '`setInterval(callback, delay)` dispara fatias de código repetidamente em intervalos de milissegundos exatos.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Complete a função retornando o identificador de um cronômetro `setInterval` que execute a função `causarDanos` a cada "1000" milissegundos.',
    initialCode: 'function loopDeDano(causarDanos) {\n  // Inicie a pulsação temporal do loop de ataque\n  \n}',
    solutionExample: 'function loopDeDano(causarDanos) {\n  return setInterval(causarDanos, 1000);\n}',
    tests: [
      { id: 't1', description: 'Deve instanciar setInterval', ruleType: 'regex', expected: 'setInterval\\s*\\(\\s*causarDanos\\s*,\\s*1000\\s*\\)' }
    ],
    hint: 'A função causarDanos já está pronta na memória, apenas a ordene no temporizador a cada 1000ms.',
    coinsReward: 50,
    xpReward: 300,
    order: 15
  },
  {
    id: 'html_int_6',
    title: 'Ancoragem de Formulários (Fieldset & Legend)',
    description: 'A organização é o escudo do programador. Agrupar campos de entrada relacionados é uma lição indispensável para formulários corporativos sustentáveis e estruturalmente impecáveis.',
    concept: 'A tag `<fieldset>` cria uma borda elegante demarcando um grupo de elementos relacionados em formulários. O elemento `<legend>` é aninhado como primeiro filho e serve como rótulo semântico incorporado à borda do fieldset para acessibilidade superior.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Desenvolva uma divisão estruturada de formulário criando um elemento de abertura e fechamento `<fieldset>` e, aninhado dentro dele, declare uma tag de legenda `<legend>` exibindo o texto "Classe Seleta".',
    initialCode: '<!-- Agrupe os dados com fieldset e legend -->\n',
    solutionExample: '<fieldset>\n  <legend>Classe Seleta</legend>\n</fieldset>',
    tests: [
      { id: 't1', description: 'Deve possuir contêiner <fieldset> de abertura e fechamento', ruleType: 'regex', expected: '<fieldset[^>]*>[\\s\\S]*<\\/fieldset>' },
      { id: 't2', description: 'Deve carregar elemento de cabeçalho <legend> interno', ruleType: 'regex', expected: '<fieldset[^>]*>[\\s\\S]*?<legend[^>]*>[\\s\\S]*?<\\/legend>[\\s\\S]*?<\\/fieldset>' },
      { id: 't3', description: 'O cabeçalho legend deve exibir exatamente "Classe Seleta"', ruleType: 'regex', expected: '<legend[^>]*>\\s*Classe Seleta\\s*<\\/legend>' }
    ],
    hint: 'Desenvolva a tag <fieldset> e insira a tag <legend>Classe Seleta</legend> logo dentro para criar o contorno demarcador.',
    coinsReward: 35,
    xpReward: 185,
    order: 11
  },
  {
    id: 'html_adv_6',
    title: 'Painéis de Revelação (Details & Summary)',
    description: 'Para otimizar o espaço do portfólio ou das páginas de perguntas frequentes do clã, aprenda a ocultar respostas complexas de forma puramente nativa, sem carregar sequer um byte de scripts.',
    concept: 'A tag `<details>` atua criando um painel expansível interativo que opera no nível nativo do navegador. O elemento `<summary>` atua como o cabeçalho clicável fixo. Quando o usuário clica sobre o botão de sumário, o navegador exibe o restante dos parágrafos contidos.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Crie uma tag `<details>`. Dentro dela, declare uma tag `<summary>` contendo o texto "Segredos Cósmicos" e, logo abaixo, um parágrafo `<p>` com o texto "Parabéns, você colocou detalhes!".',
    initialCode: '<!-- Forje o painel expansível -->\n',
    solutionExample: '<details>\n  <summary>Segredos Cósmicos</summary>\n  <p>Parabéns, você colocou detalhes!</p>\n</details>',
    tests: [
      { id: 't1', description: 'Deve carregar elemento contêiner expansível <details>', ruleType: 'regex', expected: '<details[^>]*>[\\s\\S]*<\\/details>' },
      { id: 't2', description: 'O details deve possuir um botão rígido <summary> com o título correto', ruleType: 'regex', expected: '<summary[^>]*>\\s*Segredos Cósmicos\\s*<\\/summary>' },
      { id: 't3', description: 'Deve carregar a resposta envolta em parágrafo <p>', ruleType: 'regex', expected: '<p[^>]*>\\s*Parabéns,\\s+você\\s+colocou\\s+detalhes!\\s*<\\/p>' }
    ],
    hint: 'Escreva <details> de forma geral. Aninhe dentro o <summary>Segredos Cósmicos</summary> e em seguida o parágrafo explicativo.',
    coinsReward: 45,
    xpReward: 255,
    order: 16
  },
  {
    id: 'css_int_6',
    title: 'Alinhamento Vertical e Quebra (Flex wrap & Align items)',
    description: 'Quando seu navio de layout encontra portos de tamanhos variáveis, os caixotes de itens precisam se organizar ordenadamente para evitar deformações ou quebra no visual.',
    concept: 'As propriedades de preenchimento de fluxo central do Flexbox são comandadas por `flex-wrap` e `align-items`. Aplicar `flex-wrap: wrap;` autoriza as caixas de itens secundários a se acomodarem na linha seguinte se os limites físicos se estreitarem. Por outro lado, `align-items: center;` equilibra todas as células filhas centralizadas na linha perpendicular.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Estilize na classe `.linha-frente` um container flexível definindo o display como "flex", a quebra como "wrap" (`flex-wrap: wrap;`) e alinhe seus filhos ao centro verticalmente usando `align-items: center;`.',
    initialCode: '.linha-frente {\n  \n}',
    solutionExample: '.linha-frente {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n}',
    tests: [
      { id: 't1', description: 'Deve registrar display flexível na classe .linha-frente', ruleType: 'regex', expected: 'display\\s*:\\s*flex\\s*;' },
      { id: 't2', description: 'Deve autorizar quebras de linha com flex-wrap wrap', ruleType: 'regex', expected: 'flex-wrap\\s*:\\s*wrap\\s*;' },
      { id: 't3', description: 'Deve registrar alinhamento vertical centralizado por align-items center', ruleType: 'regex', expected: 'align-items\\s*:\\s*center\\s*;' }
    ],
    hint: 'Insira as diretivas CSS selecionadas dadas na classe .linha-frente fechando-as com eixos de ponto e vírgula.',
    coinsReward: 35,
    xpReward: 185,
    order: 11
  },
  {
    id: 'css_adv_6',
    title: 'Manto do Degradê Tridimensional (CSS Gradients)',
    description: 'A sofisticação visual separam as cascas comuns dos portais lendários. Sature de profundidade suas placas gerando misturas de cores fluidas.',
    concept: 'A diretiva `linear-gradient` cria transições de cores em intervalos geométricos, devendo ser colocada como valor no atributo `background-image` (ou a simplficação `background`). Exemplo: `linear-gradient(to right, color1, color2)`.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Escreva nas regras da classe `.manto-sagrado` um plano de fundo contendo gradiente linear se movendo em direção à direita que transite entre as cores azul e vermelho (`linear-gradient(to right, blue, red)`).',
    initialCode: '.manto-sagrado {\n  \n}',
    solutionExample: '.manto-sagrado {\n  background-image: linear-gradient(to right, blue, red);\n}',
    tests: [
      { id: 't1', description: 'Estilização .manto-sagrado deve possuir propriedade background-image ou background', ruleType: 'regex', expected: 'background(-image)?\\s*:\\s*linear-gradient' },
      { id: 't2', description: 'O gradiente linear deve progredir para a direita (to right)', ruleType: 'regex', expected: 'to\\s+right' },
      { id: 't3', description: 'A paleta de cores deve fundir blue e red na ordem exata', ruleType: 'regex', expected: 'blue\\s*,\\s*red' }
    ],
    hint: 'Atribua background-image: linear-gradient(to right, blue, red); na classe descrita.',
    coinsReward: 45,
    xpReward: 255,
    order: 16
  },
  {
    id: 'js_int_6',
    title: 'O Mapeador Alquímico (Array.map)',
    description: 'Em vez de usar loops chatos, mutáveis e propensos a falhas de índice para alterar listas, domine a imutabilidade funcional transformando matrizes em frações de segundos.',
    concept: 'O método nativo de arrays `.map()` cria uma cópia completamente limpa e transformada de um array original. Ele roda um callback e mapeia cada elemento processado para o novo array correspondente sem jamais ofender a fonte inicial.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Desenvolva uma função `dobrarValores(lista)` que retorne as parcelas filtradas e duplicadas multiplicando cada entrada numérica de `lista` por exatamente "2" usando o método `.map()`.',
    initialCode: 'function dobrarValores(lista) {\n  // Transforme os números com .map()\n  \n}',
    solutionExample: 'function dobrarValores(lista) {\n  return lista.map(item => item * 2);\n}',
    tests: [
      { id: 't1', description: 'Deve possuir chamada para o método map estruturado', ruleType: 'regex', expected: '\\.map\\s*\\(' },
      { id: 't2', description: 'A lógica de callback deve multiplicar por 2', ruleType: 'regex', expected: '\\*\\s*2|item\\s*\\*\\s*2' }
    ],
    hint: 'Chame return lista.map(x => x * 2); para fechar com maestria a lição de arrays funcionais.',
    coinsReward: 35,
    xpReward: 185,
    order: 11
  },
  {
    id: 'js_adv_6',
    title: 'Sincronização Cósmica (Promise.all)',
    description: 'Quando seu script heróico requisita inventários, frentes de dados e estatísticas ao mesmo tempo, esperar uma fila de forma alternada atrasa o jogo. Chame todos os dados de forma perfeitamente concorrente.',
    concept: 'A diretiva assíncrona `Promise.all(array)` é extraordinariamente performática. Ela aguarda que todo o pacote de promessas seja completamente bem-sucedido juntas para liberar o resultado de lote consolidado de dados.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Implemente uma função `buscarDadosEmParalelo(promessaCard, promessaXP)` que retorne o resultado integrado em array das resoluções simultâneas usando `Promise.all`.',
    initialCode: 'function buscarDadosEmParalelo(promessaCard, promessaXP) {\n  // Junte as promessas em paralelo\n  \n}',
    solutionExample: 'function buscarDadosEmParalelo(promessaCard, promessaXP) {\n  return Promise.all([promessaCard, promessaXP]);\n}',
    tests: [
      { id: 't1', description: 'Deve invocar o método Promise.all de controle assíncrono', ruleType: 'regex', expected: 'Promise\\.all\\s*\\(' },
      { id: 't2', description: 'Deve agrupar as promessas dentro de um array', ruleType: 'regex', expected: '\\[\\s*promessaCard\\s*,\\s*promessaXP\\s*\\]|promessaCard\\s*,\\s*promessaXP' }
    ],
    hint: 'Chame o retorno de Promise.all enviando as variáveis promessaCard e promessaXP juntas em formato de array de argumentos: Promise.all([p1, p2]).',
    coinsReward: 45,
    xpReward: 255,
    order: 16
  },
  {
    id: 'html_adv_7',
    title: 'Forjando o Portal de Portfólio (Site Semântico Completo)',
    description: 'Um mestre desenvolvedor deve saber estruturar sua primeira página de apresentação no clã! Una as tags mais profissionais do HTML5 para criar a fundação robusta do seu próprio portfólio na web.',
    concept: 'Para criar um site semântico moderno e altamente legível para os buscadores da web, cada elemento tem seu lugar sagrado: `<header>` abraça o topo do cabeçalho, `<nav>` alinha a barra de links de navegação, `<main>` reúne o conteúdo principal de impacto, e as páginas ganham contornos profissionais.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Monte o esqueleto de um site de portfólio. Você deve criar:\n1. Um elemento `<header>` que possua um título `<h2>` com o texto exato "Guardião Dev".\n2. Um elemento `<nav>` contendo um link `<a>` com atributo `href="#contato"` e texto exato "Contato".\n3. Um elemento `<main>` contendo uma imagem `<img>` com o atributo `alt="Foto do Desenvolvedor"`.',
    initialCode: '<!-- Crie aqui o seu site de portfólio semântico -->\n',
    solutionExample: '<header>\n  <h2>Guardião Dev</h2>\n  <nav>\n    <a href="#contato">Contato</a>\n  </nav>\n</header>\n<main>\n  <img src="avatar.jpg" alt="Foto do Desenvolvedor" />\n</main>',
    tests: [
      { id: 't1', description: 'Deve conter um contêiner <header> de cabeçalho do site', ruleType: 'regex', expected: '<header[^>]*>[\\s\\S]*<\\/header>' },
      { id: 't2', description: 'O <header> deve possuir título <h2> contendo exato "Guardião Dev"', ruleType: 'regex', expected: '<h2[^>]*>\\s*Guardião Dev\\s*<\\/h2>' },
      { id: 't3', description: 'Deve carregar elemento <nav> com link para href="#contato" e texto "Contato"', ruleType: 'regex', expected: '<nav[^>]*>[\\s\\S]*<a[^>]*href="#contato"[^>]*>\\s*Contato\\s*<\\/a>[\\s\\S]*<\\/nav>' },
      { id: 't4', description: 'Deve carregar o corpo principal <main> aninhando imagem com alt="Foto do Desenvolvedor"', ruleType: 'regex', expected: '<main[^>]*>[\\s\\S]*<img[^>]*alt="Foto do Desenvolvedor"[^>]*>[\\s\\S]*<\\/main>' }
    ],
    hint: 'Crie a tag <header> envolvendo o <h2> e a tag <nav>. Logo abaixo dele, crie a tag de corpo <main> contendo sua respectiva imagem <img alt="Foto do Desenvolvedor">.',
    coinsReward: 60,
    xpReward: 350,
    order: 17
  },
  {
    id: 'css_adv_7',
    title: 'Cartão de Aventura Responsivo (Página de Captura do Clã)',
    description: 'Muralhas rígidas que não se adaptam às telas de visualização celulares quebram a experiência do usuário. Vamos estilizar um cartão de captura (Hero Card) simulando o design de uma página real!',
    concept: 'Uma caixa de conteúdo ou section de site moderno atrai atenção se possuir espaçamento interno adequado (`padding`), cantos polidos (`border-radius`), profundidade sombreada (`box-shadow`) e um fundo escuro elegante (`background-color`).',
    track: 'css',
    difficulty: 'avancado',
    task: 'Estilize a classe `.cartao-site` do seu micro-site. Seu estilo deve aplicar de forma rigorosa as seguintes diretivas:\n1. Espaçamento de margem interna de exatamente `24px` (`padding: 24px;`).\n2. Cantos arredondados com curvatura de exatamente `12px` (`border-radius: 12px;`).\n3. Uma cor de fundo grafite escuro com o código hex `#0f172a` (`background-color: #0f172a;`).\n4. Uma sombra difusa de elevação física usando exato `box-shadow: 0 4px 10px rgba(0,0,0,0.5);`.',
    initialCode: '.cartao-site {\n  \n}',
    solutionExample: '.cartao-site {\n  padding: 24px;\n  border-radius: 12px;\n  background-color: #0f172a;\n  box-shadow: 0 4px 10px rgba(0,0,0,0.5);\n}',
    tests: [
      { id: 't1', description: 'Deve aplicar padding interno de exatos 24px', ruleType: 'regex', expected: 'padding\\s*:\\s*24px\\s*;' },
      { id: 't2', description: 'Deve aplicar cantos arredondados de 12px', ruleType: 'regex', expected: 'border-radius\\s*:\\s*12px\\s*;' },
      { id: 't3', description: 'Deve possuir cor de fundo escura #0f172a para o estilo do cartão', ruleType: 'regex', expected: 'background-color\\s*:\\s*#0f172a\\s*;' },
      { id: 't4', description: 'Deve carregar sombra com box-shadow: 0 4px 10px rgba(0,0,0,0.5);', ruleType: 'regex', expected: 'box-shadow\\s*:\\s*0\\s+4px\\s+10px\\s+rgba\\(\\s*0\\s*,\\s*0\\s*,\\s*0\\s*,\\s*0\\.5\\s*\\)\\s*;' }
    ],
    hint: 'Atribua as quatro propriedades solicitadas dentro da classe .cartao-site. Se atente para a sintaxe exata da cor hex e dos espaçamentos em pixels.',
    coinsReward: 60,
    xpReward: 350,
    order: 17
  },
  {
    id: 'js_adv_7',
    title: 'A Forja Dinâmica do DOM (Injeção de Sites sob Demanda)',
    description: 'Páginas web profissionais não são placas de metal estáticas de texto; elas reagem às ações dos heróis e injetam elementos de forma reativa e sob demanda em tempo real. Domine a manipulação avançada de elementos em páginas!',
    concept: 'Com o JavaScript moderno, podemos selecionar elementos do navegador dinamicamente usando `document.querySelector(\'seletor\')`. Após capturá-lo, alterar sua propriedade `.innerHTML` permite redesenhar novos componentes visuais na tela sob comando de funções e gatilhos.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Crie uma função simples chamada `gerarSiteDoHeroi(nomeHeroi)`. Esta função deve ler e editar dinamicamente o site:\n1. Ela deve recuperar o container com id `#preview-container` utilizando `document.querySelector(\'#preview-container\')`.\n2. Em seguida, ela deve substituir o HTML interno desse container (`innerHTML`) pelo título formatado: `\'<h1>\' + nomeHeroi + \'</h1>\'`.\n3. Por fim, ela deve retornar exatamente a mensagem de publicação: `\'Site de \' + nomeHeroi + \' publicado!\'`.',
    initialCode: 'function gerarSiteDoHeroi(nomeHeroi) {\n  // Integre o DOM e publique o site dinamicamente\n  \n}',
    solutionExample: 'function gerarSiteDoHeroi(nomeHeroi) {\n  const container = document.querySelector(\'#preview-container\');\n  container.innerHTML = \'<h1>\' + nomeHeroi + \'</h1>\';\n  return "Site de " + nomeHeroi + " publicado!";\n}',
    tests: [
      { id: 't1', description: 'Declarar a função gerarSiteDoHeroi recebendo o parâmetro nomeHeroi', ruleType: 'regex', expected: 'function\\s+gerarSiteDoHeroi\\s*\\(\\s*nomeHeroi\\s*\\)' },
      { id: 't2', description: 'Deve recuperar o container usando document.querySelector com ID "#preview-container"', ruleType: 'regex', expected: 'document\\.querySelector\\s*\\(\\s*["\']#preview-container["\']\\s*\\)' },
      { id: 't3', description: 'Deve alterar o innerHTML do container para injetar o element h1 com o nome', ruleType: 'regex', expected: 'innerHTML\\s*=\\s*["\']<h1>["\']\\s*\\+\\s*nomeHeroi\\s*\\+\\s*["\']</h1>["\']|innerHTML\\s*=\\s*[`]<h1>\\$\\{\\s*nomeHeroi\\s*\\}</h1>[`]' },
      { id: 't4', description: 'Deve retornar a string confirmando a publicação com o nome de forma concatenada', ruleType: 'regex', expected: 'return\\s*["\']Site de ["\']\\s*\\+\\s*nomeHeroi\\s*\\+\\s*["\'] publicado!["\']|return\\s*[`]Site de \\$\\{\\s*nomeHeroi\\s*\\} publicado![`]' }
    ],
    hint: 'Declare a variável recolhendo querySelector(\'#preview-container\'), assinale a propriedade .innerHTML with h1 concatenando a variável, e finalize com o retorno exato.',
    coinsReward: 60,
    xpReward: 350,
    order: 17
  },
  {
    id: 'html_ini_6',
    title: 'Projeto: Cartão de Perfil Pessoal de Recruta',
    description: 'Agora que você conhece a estrutura elementar, reúna tudo para criar o seu próprio cartão virtual de cidadão dev!',
    concept: 'Ao unificar títulos, parágrafos, listas e hiperlinks em um único arquivo, começamos a visualizar a engenharia de sites semióticos e portfólios no mundo exterior.',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Monte o cartão de apresentação do soldado estruturando as seguintes tags:\n1. Um cabeçalho `<h1>` com o texto "Aventureiro Iniciante".\n2. Um parágrafo de introdução `<p>` com o texto "Minhas metas de aprendizado:".\n3. Uma lista não de marcadores `<ul>` com dois itens `<li>` com os textos exatos "Aprender HTML" e "Dominar CSS" (respeitando esta ordem).\n4. Forje um hiperlink simples `<a>` com o atributo `href="https://codequest.com"` e o texto exato "Voltar ao Início".',
    initialCode: '<!-- Forje o cartão de perfil pessoal completo -->\n',
    solutionExample: '<h1>Aventureiro Iniciante</h1>\n<p>Minhas metas de aprendizado:</p>\n<ul>\n  <li>Aprender HTML</li>\n  <li>Dominar CSS</li>\n</ul>\n<a href="https://codequest.com">Voltar ao Início</a>',
    tests: [
      { id: 't1', description: 'Deve possuir o visualizador de cabeçalho principal <h1> com o texto adequado', ruleType: 'regex', expected: '<h1[^>]*>\\s*Aventureiro Iniciante\\s*<\\/h1>' },
      { id: 't2', description: 'Deve possuir o enunciado de parágrafo <p> correto', ruleType: 'regex', expected: '<p[^>]*>\\s*Minhas metas de aprendizado:\\s*<\\/p>' },
      { id: 't3', description: 'Deve possuir a lista não ordenada com itens detalhados "Aprender HTML" e "Dominar CSS"', ruleType: 'regex', expected: '<ul[^>]*>[\\s\\S]*?<li>\\s*Aprender HTML\\s*<\\/li>[\\s\\S]*?<li>\\s*Dominar CSS\\s*<\\/li>[\\s\\S]*?<\\/ul>' },
      { id: 't4', description: 'Deve fechar com o botão a hiperlink apontando para https://codequest.com e texto Voltar ao Início', ruleType: 'regex', expected: '<a[^>]*href="https:\\/\\/codequest\\.com"[^>]*>\\s*Voltar ao Início\\s*<\\/a>' }
    ],
    hint: 'Preencha de forma consecutiva cada um dos quatro elementos solicitados cuidando para fechar cada uma das tags (h1, p, ul, li e a).',
    coinsReward: 40,
    xpReward: 200,
    order: 6
  },
  {
    id: 'html_int_7',
    title: 'Projeto: Central de Feedback de Recrutas do Clã',
    description: 'Mostre seu domínio sobre dados e entradas interativas! Conecte formulários, agrupadores de dados e novos elementos rádio/texto de feedback.',
    concept: 'Ao preencher formulários aninhados a fieldset, organizamos componentes gráficos de entrada relacionados de forma profissional e escalável nos navegadores modernos.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Monte a área de feed de recrutamento com as especificações:\n1. Construa um elemento pai `<form>`.\n2. Aninhado dentro do formulário, inclua uma tag de agrupamento `<fieldset>`.\n3. O primeiro elemento filho no fieldset deve ser uma legenda `<legend>` exibindo o título "Pesquisa".\n4. Logo abaixo do legend, adicione um `<input>` do tipo "text" com o placeholder "Seu Clã".\n5. Finalize o formulário adicionando um botão de tipo submit `<button type="submit">` com o texto exato "Enviar Opinião".',
    initialCode: '<!-- Forje o formulário corporativo do clã -->\n',
    solutionExample: '<form>\n  <fieldset>\n    <legend>Pesquisa</legend>\n    <input type="text" placeholder="Seu Clã" />\n    <button type="submit">Enviar Opinião</button>\n  </fieldset>\n</form>',
    tests: [
      { id: 't1', description: 'Deve possuir a tag form principal', ruleType: 'regex', expected: '<form[^>]*>[\\s\\S]*<\\/form>' },
      { id: 't2', description: 'Deve introduzir agrupamento por fieldset carregando seletor legend contendo "Pesquisa"', ruleType: 'regex', expected: '<fieldset[^>]*>[\\s\\S]*?<legend[^>]*>\\s*Pesquisa\\s*<\\/legend>[\\s\\S]*?<\\/fieldset>' },
      { id: 't3', description: 'O fieldset deve possuir o input text com placeholder "Seu Clã"', ruleType: 'regex', expected: '<input[^>]*type="text"[^>]*placeholder="Seu Clã"' },
      { id: 't4', description: 'Deve conter botão de envio submit com o título "Enviar Opinião"', ruleType: 'regex', expected: '<button[^>]*type="submit"[^>]*>\\s*Enviar Opinião\\s*<\\/button>' }
    ],
    hint: 'Aninhe corretamente fieldset, legend, input e button dentro da tag form conforme ordenado.',
    coinsReward: 50,
    xpReward: 250,
    order: 12
  },
  {
    id: 'css_ini_6',
    title: 'Projeto: Botão de Comando do Comandante',
    description: 'Transforme botões feios e cruéis do sistema operacional em comandos vistosos, profissionais e coloridos usando CSS estruturado!',
    concept: 'Definindo simultaneamente altura/largura internas (padding), cores sólidas, fontes de destaque e molduras, conferimos às nossas interações identidade polida.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Estilize as diretivas de layout na classe `.botao-acao` definindo as seguintes configurações:\n1. Uma cor de fundo azul escuro corporativo com o valor `#1e3a8a` (`background-color: #1e3a8a;`).\n2. Cor do texto fixa em branco com o valor `#ffffff` (`color: #ffffff;`).\n3. Preenchimento interno (padding) com `12px` de dimensão vertical e `24px` de dimensão horizontal (`padding: 12px 24px;`).\n4. Uma borda resistente sólida de espessura `2px` com a tonalidade `#475569` (`border: 2px solid #475569;`).',
    initialCode: '.botao-acao {\n  \n}',
    solutionExample: '.botao-acao {\n  background-color: #1e3a8a;\n  color: #ffffff;\n  padding: 12px 24px;\n  border: 2px solid #475569;\n}',
    tests: [
      { id: 't1', description: 'Deve aplicar a cor do fundo azul escuro #1e3a8a ao botão', ruleType: 'regex', expected: 'background-color\\s*:\\s*#1e3a8a\\s*;' },
      { id: 't2', description: 'O texto deve ser pintado na cor branca #ffffff', ruleType: 'regex', expected: 'color\\s*:\\s*(#ffffff|white)\\s*;' },
      { id: 't3', description: 'Deve possuir espaçamento interno padding com 12px de altura e 24px de largura', ruleType: 'regex', expected: 'padding\\s*:\\s*12px\\s+24px\\s*;' },
      { id: 't4', description: 'Deve declarar a borda de 2px sólida cinza com a cor hexadeciamal #475569', ruleType: 'regex', expected: 'border\\s*:\\s*(2px\\s+solid\\s+#475569|#475569\\s+solid\\s+2px|2px\\s+solid\\s+rgb\\(71,\\s*85,\\s*105\\))' }
    ],
    hint: 'Aplique as quatro diretivas dadas em cima da classe .botao-acao com cuidado para fechar cada uma com ponto e vírgula.',
    coinsReward: 40,
    xpReward: 200,
    order: 6
  },
  {
    id: 'css_int_7',
    title: 'Projeto: Galeria de Aventuras Responsiva',
    description: 'Estruture o posicionamento centralizado de itens em grade flexível com gap uniforme para simular as principais seções de cartões de portfólios profissionais.',
    concept: 'O uso conjugado de recursos Flexbox como wrap ao lado de gaps uniformes impede que itens quebrem a margem do navegador e se reorganizem automaticamente.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Determine e configure as propriedades de estilização da classe `.grade-aventura` respondendo pelas seguintes regras:\n1. Acione o layout flexível (`display: flex;`).\n2. Adicione quebra fluida automática de conteúdo (`flex-wrap: wrap;`).\n3. Ordene o alinhamento centralizado ortogonal de todos os eixos dos elementos filhos (`align-items: center;`).\n4. Forje um distanciamento de lacuna (gap) idêntico por todos os eixos de exatamente `16px` (`gap: 16px;`).',
    initialCode: '.grade-aventura {\n  \n}',
    solutionExample: '.grade-aventura {\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center;\n  gap: 16px;\n}',
    tests: [
      { id: 't1', description: 'Atribuir display flexível de layout', ruleType: 'regex', expected: 'display\\s*:\\s*flex\\s*;' },
      { id: 't2', description: 'Habilitar quebra automática flex-wrap como wrap', ruleType: 'regex', expected: 'flex-wrap\\s*:\\s*wrap\\s*;' },
      { id: 't3', description: 'Alinhar colunas no centro vertical por align-items', ruleType: 'regex', expected: 'align-items\\s*:\\s*center\\s*;' },
      { id: 't4', description: 'Estabelecer espaçamento de intervalo gap em 16px', ruleType: 'regex', expected: 'gap\\s*:\\s*16px\\s*;' }
    ],
    hint: 'Configure o layout flexível aplicando display: flex; flex-wrap: wrap; align-items: center; e o tamanho de gap: 16px; dentro do container.',
    coinsReward: 50,
    xpReward: 250,
    order: 12
  },
  {
    id: 'js_ini_6',
    title: 'Projeto: Divisor de Recompensas das Masmorras',
    description: 'Aplique variáveis de controle dinâmico de recursos juntamente com argumentos de funções para gerar relatórios automatizados de saque em moedas!',
    concept: 'Através de funções JavaScript, podemos orquestrar dados manipulando somas e multiplicações matemáticas ao lado do operador de concatenação de strings.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Desenvolva uma função declarativa com o nome exato `calcularEspolios(quantidadeInimigos, moedasPorInimigo)`. Ela deve:\n1. Multiplicar a quantidade de inimigos pelas moedas ganhas por cada inimigo e, em seguida, adicionar ao montante uma recompensa fixa bônus de `50` moedas de ouro.\n2. Retornar exatamente a frase estruturada de consolidação: `"Total de moedas: X"`, substituindo "X" pela soma matemática de ouro calculado.',
    initialCode: 'function calcularEspolios(quantidadeInimigos, moedasPorInimigo) {\n  // Forje a consolidação de moedas e retorne o total\n  \n}',
    solutionExample: 'function calcularEspolios(quantidadeInimigos, moedasPorInimigo) {\n  const total = (quantidadeInimigos * moedasPorInimigo) + 50;\n  return "Total de moedas: " + total;\n}',
    tests: [
      { id: 't1', description: 'Deve declarar a função calcularEspolios com a assinatura e parâmetros requisitados', ruleType: 'regex', expected: 'function\\s+calcularEspolios\\s*\\(\\s*quantidadeInimigos\\s*,\\s*moedasPorInimigo\\s*\\)' },
      { id: 't2', description: 'Deve calcular o produto dos inputs acrescentando o bônus fixo de 50', ruleType: 'regex', expected: '\\*|\\+.*50|50.*\\+' },
      { id: 't3', description: 'Deve retornar a string pré-formatada correta concatenando o resultado obtido', ruleType: 'regex', expected: 'return\\s*["\']Total de moedas: ["\']\\s*\\+|return\\s*[`]Total de moedas: \\$\\{' }
    ],
    hint: 'Efetue a operação let total = (quantidadeInimigos * moedasPorInimigo) + 50; e finalize com o comando de retorno return "Total de moedas: " + total;',
    coinsReward: 40,
    xpReward: 200,
    order: 6
  },
  {
    id: 'js_int_7',
    title: 'Projeto: Filtro e Multiplicação de Nível (Filter & Map)',
    description: 'Demonstre a robustez da engenharia de dados! Combine a filtragem condicional refinada em arrays junto a transformações em lote imutáveis nas listas.',
    concept: 'Encadear .filter() com o mapeador .map() em cascata é o padrão padrão mais estável para tratar dados que populam tabelas e relatórios de sites comerciais.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Escreva uma função nomeada `filtrarEDobrarXPs(listaXP)`. Sua lógica operacional interna deve:\n1. Filtrar o array de entrada retendo exclusivamente as frações de XP que forem maiores ou idênticas a `100` (`>= 100`) recorrendo à propriedade `.filter()`.\n2. Do resultado retido, aplique o mapeador `.map()` transformando e duplicando cada numeral de entrada por `2` (`* 2`).\n3. Devolva com o comando de retorno esse novo array imutável totalmente remodelado.',
    initialCode: 'function filtrarEDobrarXPs(listaXP) {\n  // Retorne os XPs maiores que 100 e duplicados\n  \n}',
    solutionExample: 'function filtrarEDobrarXPs(listaXP) {\n  return listaXP.filter(xp => xp >= 100).map(xp => xp * 2);\n}',
    tests: [
      { id: 't1', description: 'Deve invocar o método filter no array comparando valores >= 100', ruleType: 'regex', expected: '\\.filter\\s*\\([\\s\\S]*?(>=|>=Value)\\s*100[\\s\\S]*?\\)' },
      { id: 't2', description: 'Deve encadear a transformação map multiplicando cada entrada por 2', ruleType: 'regex', expected: '\\.map\\s*\\([\\s\\S]*?\\*\\s*2[\\s\\S]*?\\)' }
    ],
    hint: 'Chame o pipeline contínuo: return listaXP.filter(item => item >= 100).map(item => item * 2);',
    coinsReward: 50,
    xpReward: 250,
    order: 12
  },
  {
    id: 'html_adv_8',
    title: 'Gráficos de Vetor Vetorial (Inline SVG)',
    description: 'Para criar interfaces ultranítidas em qualquer densidade de tela sem carregar arquivos pesados de imagem, desenhe formas geométricas elementares diretamente no código usando marcação SVG.',
    concept: 'A tag `<svg>` é um contêiner XML para gráficos vetoriais bidimensionais. Elementos como `<circle>` com coordenadas centrais (`cx`, `cy`) e raio (`r`), ou `<rect>` com dimensões (`width`, `height`), definem formas perfeitas e redimensionáveis sem perda de resolução de imagem.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Crie uma runa solar vetorial. Escreva uma tag `<svg>` com largura (width) de "100" e altura (height) de "100". Dentro dela, aninha uma tag `<circle>` com as seguintes propriedades: cx="50", cy="50", r="40" e fill="red".',
    initialCode: '<!-- Desenhe a runa solar com SVG inline -->\n',
    solutionExample: '<svg width="100" height="100">\n  <circle cx="50" cy="50" r="40" fill="red" />\n</svg>',
    tests: [
      { id: 't1', description: 'Deve conter a tag de abertura e fechamento <svg>', ruleType: 'regex', expected: '<svg[^>]*>[\\s\\S]*<\\/svg>' },
      { id: 't2', description: 'A tag <svg> deve medir 100 de width e height', ruleType: 'regex', expected: 'width="100"[\\s\\S]*height="100"|height="100"[\\s\\S]*width="100"' },
      { id: 't3', description: 'Deve conter um elemento <circle> com raio r="40"', ruleType: 'regex', expected: '<circle[^>]*r="40"' },
      { id: 't4', description: 'O elemento <circle> deve carregar cx="50", cy="50" e cor vermelha (fill="red")', ruleType: 'regex', expected: 'cx="50"[\\s\\S]*cy="50"[\\s\\S]*fill="red"|fill="red"[\\s\\S]*cy="50"[\\s\\S]*cx="50"|cx="50"[\\s\\S]*fill="red"[\\s\\S]*cy="50"' }
    ],
    hint: 'Garanta que fechou devidamente as tags <svg> e <circle />, e usou o fechamento auto-fechável para o círculo se preferir.',
    coinsReward: 60,
    xpReward: 350,
    order: 18
  },
  {
    id: 'css_int_8',
    title: 'Estados Dinâmicos (:hover & :active)',
    description: 'A interatividade física se destaca nos detalhes. Forje transições suaves de layout para quando o mouse passar por cima ou clicar nos seus botões estruturados.',
    concept: 'As pseudo-classes de eventos de ponteiro interativo (`:hover` e `:active`) alteram estilos com base em ações do ponteiro. Adicionar `transition` no estado padrão garante que o hover transicione suavemente.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Estilize o botão definindo as reações do mouse:\n1. Na classe do botão padrão `.botao-reativo`, declare a transição de cor de fundo configurando `transition: background 0.2s linear;`.\n2. Na pseudo-classe de hover `.botao-reativo:hover`, altere a cor de fundo para verde (`background-color: green;`).',
    initialCode: '.botao-reativo {\n  \n}\n\n.botao-reativo:hover {\n  \n}',
    solutionExample: '.botao-reativo {\n  transition: background 0.2s linear;\n}\n.botao-reativo:hover {\n  background-color: green;\n}',
    tests: [
      { id: 't1', description: 'A classe .botao-reativo deve possuir transition definida', ruleType: 'regex', expected: '\\.botao-reativo\\s*\\{[\\s\\S]*?transition\\s*:\\s*background\\s+0\\.2s\\s+linear' },
      { id: 't2', description: 'A pseudo-classe .botao-reativo:hover deve mudar o background-color para green', ruleType: 'regex', expected: '\\.botao-reativo:hover\\s*\\{[\\s\\S]*?background-color\\s*:\\s*green' }
    ],
    hint: 'Declare a propriedade transition no primeiro bloco e mude a propriedade background-color no seletor :hover.',
    coinsReward: 50,
    xpReward: 250,
    order: 13
  },
  {
    id: 'css_adv_8',
    title: 'Controle Dimensional Máximo (Box-Sizing)',
    description: 'Evite quebras inexplicáveis de layout! Quando incluímos paddings e bordas em um elemento, o navegador soma esses tamanhos dilatando o objeto de forma invisível. Mude este comportamento em lote.',
    concept: 'Aplicar `box-sizing: border-box;` no seletor universal `*` força o navegador a acomodar espaçamentos e bordas no interior das dimensões atribuídas, oferecendo total estabilidade de largura e altura nos layouts modernos.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Configure uma regra de modelo de caixa seguro. Estilize o seletor universal de tags `*` aplicando com maestria a regra de dimensionamento `box-sizing: border-box;`.',
    initialCode: '/* Estabilize todos os dimensionamentos das caixas */\n',
    solutionExample: '* {\n  box-sizing: border-box;\n}',
    tests: [
      { id: 't1', description: 'Deve estilizar o seletor universal *', ruleType: 'regex', expected: '\\*[\\s\\S]*?\\{' },
      { id: 't2', description: 'Deve determinar a propriedade box-sizing em border-box', ruleType: 'regex', expected: 'box-sizing\\s*:\\s*border-box\\s*;' }
    ],
    hint: 'Use o seletor especial asterisco * e mude box-sizing para border-box para resetar as caixas.',
    coinsReward: 60,
    xpReward: 350,
    order: 18
  },
  {
    id: 'js_int_8',
    title: 'O Operador Ternário (Escolhas Rápidas)',
    description: 'Declarações extensas de if-else para tomadas de decisão curtas e atribuições simples de strings parecem lixo visual. Codifique escolhas inline rápidas de forma elegante.',
    concept: 'O operador condicional ternário utiliza a interrogação e os dois pontos: `condicao ? valorSeVerdadeiro : valorSeFalso`. É ideal para encurtar retornos diretamente em uma única linha.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Escreva uma função chamada `avaliarNivel(xp)`. Ela deve conter apenas uma linha de execução retornando de forma condicional as seguintes strings:\n- Se o XP for maior ou igual a 1000 (`xp >= 1000`), retorne a string "Veterano".\n- Caso contrário, retorne a string "Recruta".\nUse estritamente a sintaxe do operador ternário (? :).',
    initialCode: 'function avaliarNivel(xp) {\n  // Forje a decisão rápida em uma única linha\n  \n}',
    solutionExample: 'function avaliarNivel(xp) {\n  return xp >= 1000 ? "Veterano" : "Recruta";\n}',
    tests: [
      { id: 't1', description: 'Deve possuir a assinatura da função avaliarNivel(xp)', ruleType: 'regex', expected: 'function\\s+avaliarNivel\\s*\\(\\s*xp\\s*\\)' },
      { id: 't2', description: 'Deve retornar os termos Veterano e Recruta usando ternário (? e :)', ruleType: 'regex', expected: '\\?\\s*["\']Veterano["\']\\s*:\\s*["\']Recruta["\']' }
    ],
    hint: 'Use return xp >= 1000 ? "Veterano" : "Recruta"; para obter a resposta de primeira.',
    coinsReward: 50,
    xpReward: 250,
    order: 13
  },
  {
    id: 'js_adv_8',
    title: 'Feitiço Anti-Ruína (Tratamento Try-Catch)',
    description: 'Aplicações reais falham: quedas de internet, integrações instáveis ou arquivos JSON mal-formados. Proteja seu código crítico evitado travar a tela inteira com escudos try-catch.',
    concept: 'O bloco `try` gerencia operações estocásticas ou propensas a falha. Se alguma linha de código de risco falhar, o fluxo desvia imediatamente para o bloco `catch(error)` sem interromper os scripts paralelos do navegador.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Crie uma função descritiva `analisarJSON(texto)`. Ela deve:\n1. Tentar decodificar o parâmetro usando `JSON.parse(texto)` dentro de um bloco `try` de abertura e fechamento, retornando o resultado.\n2. Se o dado JSON recebido estiver quebrado, capture a exceção no bloco `catch(error)` retornando a mensagem de aviso: `"Fracasso: "` concatenado diretamente à propriedade `error.message`.',
    initialCode: 'function analisarJSON(texto) {\n  // Proteja sua aplicação contra formatações quebradas de dados\n  \n}',
    solutionExample: 'function analisarJSON(texto) {\n  try {\n    return JSON.parse(texto);\n  } catch (error) {\n    return "Fracasso: " + error.message;\n  }\n}',
    tests: [
      { id: 't1', description: 'Deve usar bloco try para decodificar JSON.parse', ruleType: 'regex', expected: 'try\\s*\\{[\\s\\S]*?JSON\\.parse\\s*\\(\\s*texto\\s*\\)[\\s\\S]*?\\}\\s*catch\\s*\\(\\s*error\\s*\\)' },
      { id: 't2', description: 'Deve capturar erro e retornar Fracasso concatenando error.message', ruleType: 'regex', expected: 'return\\s+["\']Fracasso: ["\']\\s*\\+\\s*error\\.message' }
    ],
    hint: 'Lembre-se de colocar JSON.parse(texto) dentro do bloco try e retornar a mensagem com error.message na captura do catch.',
    coinsReward: 60,
    xpReward: 350,
    order: 18
  },
  {
    id: 'js_adv_9',
    title: 'A Forja do Acumulador (Array.reduce)',
    description: 'Tratar inventários longos combinando laços tradicionais é deselegante e instável. Domine a última joia da programação funcional: reduza matrizes completas a um único dígito consolidado!',
    concept: 'O acumulador `.reduce(callback, valorInicial)` processa iterativamente arrays retroalimentando uma variável acumuladora consolidada. Seu retorno é imutável e preserva a fonte original intacta.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Desenvolva uma função `somarOuro(listaSacos)`. Ela deve aplicar o redutor `.reduce()` somando todos os numerais contidos no array de sacas e retornar a conta final consolidada, definindo o valor inicial em "0".',
    initialCode: 'function somarOuro(listaSacos) {\n  // Somar sacas de moedas em um único resultado agregado com .reduce()\n  \n}',
    solutionExample: 'function somarOuro(listaSacos) {\n  return listaSacos.reduce((soma, sacola) => soma + sacola, 0);\n}',
    tests: [
      { id: 't1', description: 'Declarar a função somarOuro recebendo listaSacos', ruleType: 'regex', expected: 'function\\s+somarOuro' },
      { id: 't2', description: 'Deve acionar o método .reduce() combinando os parâmetros', ruleType: 'regex', expected: '\\.reduce\\s*\\(' },
      { id: 't3', description: 'Deve inicializar o acumulador com valor base de 0', ruleType: 'regex', expected: '0\\s*\\)' }
    ],
    hint: 'Aplique listaSacos.reduce((acumulador, item) => acumulador + item, 0) para fechar o ciclo com chave de ouro!',
    coinsReward: 60,
    xpReward: 350,
    order: 19
  },
  {
    id: 'html_ini_7',
    title: 'HTML Semântico: Seções de Conteúdo Estruturadas',
    description: 'Conecte o leitor à estrutura interna de uma página! Aprenda a agrupar partes cruciais de um documento com tags dedicadas em vez de usar divs unônimas puras.',
    concept: 'Tags semânticas como `<header>`, `<main>` e `<footer>` informam o conteúdo exato que carregam aos leitores de tela e motores de busca, melhorando sensivelmente o SEO e a acessibilidade global.',
    track: 'html',
    difficulty: 'iniciante',
    task: 'Crie as seções semânticas básicas de uma página de aventura. Declare uma tag `<header>` que envolva um elemento `<h1>` com o texto "Título Principal". Logo abaixo do header (totalmente fora dele), crie a tag `<main></main>` para acomodar o conteúdo principal e, por fim, declare um `<footer>` (fora do main) contendo o texto "Rodapé".',
    initialCode: '<!-- Declare o esqueleto semântico da página abaixo -->\n',
    solutionExample: '<header>\n  <h1>Título Principal</h1>\n</header>\n<main></main>\n<footer>\n  Rodapé\n</footer>',
    tests: [
      { id: 't1', description: 'Deve conter a tag <header> envolvendo um título <h1> com texto "Título Principal"', ruleType: 'regex', expected: '<header>[\\s\\S]*<h1>Título Principal<\\/h1>[\\s\\S]*<\\/header>' },
      { id: 't2', description: 'Deve possuir o elemento semântico principal <main></main> fora do header', ruleType: 'regex', expected: '<\\/header>[\\s\\S]*<main>\\s*<\\/main>' },
      { id: 't3', description: 'Deve possuir a tag semântica <footer>contendo Rodapé no encerramento', ruleType: 'regex', expected: '<\\/main>[\\s\\S]*<footer>[\\s\\S]*Rodapé[\\s\\S]*<\\/footer>' }
    ],
    hint: 'Assegure que as tags estão perfeitamente aninhadas e fechadas na ordem descrita.',
    coinsReward: 40,
    xpReward: 200,
    order: 7
  },
  {
    id: 'html_int_9',
    title: 'HTML Acessível: Associação de Labels e Inputs',
    description: 'Formulários acessíveis começam com o direcionamento preciso de leitores de tela. Associe rótulos aos seus elementos de entrada de forma explícita!',
    concept: 'Usar a propriedade `for` no elemento `<label>` vinculando-a ao atributo `id` de um `<input>` garante que cliques na legenda foquem automaticamente no campo, além de guiar leitores assistivos perfeitamente.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Desenvolva um campo de e-mail acessível para novos aventureiros. Crie um elemento `<label>` com o atributo `for="email-usuario"` contendo o texto "E-mail:". Logo em seguida, crie um elemento `<input>` do tipo e-mail (`type="email"`) carregando o atributo de identificação `id="email-usuario"`.',
    initialCode: '<!-- Monte o campo de e-mail integrado e acessível -->\n',
    solutionExample: '<label for="email-usuario">E-mail:</label>\n<input type="email" id="email-usuario" />',
    tests: [
      { id: 't1', description: 'Deve possuir a tag <label> com atributo for configurado para "email-usuario"', ruleType: 'regex', expected: '<label[^>]*for="email-usuario"[^>]*>' },
      { id: 't2', description: 'Deve existir um <input> com id definido exatamente como "email-usuario"', ruleType: 'regex', expected: '<input[^>]*id="email-usuario"[^>]*>|<input[^>]*id=\'email-usuario\'[^>]*>' },
      { id: 't3', description: 'O tipo (type) do input deve ser configurado como "email"', ruleType: 'regex', expected: 'type="email"|type=\'email\'' }
    ],
    hint: 'Escreva a tag <label for="email-usuario">E-mail:</label> e imediatamente depois adicione <input type="email" id="email-usuario" />.',
    coinsReward: 50,
    xpReward: 250,
    order: 14
  },
  {
    id: 'css_ini_9',
    title: 'CSS Variables (Propriedades Customizadas)',
    description: 'Simplifique a manutenção de cores e temas no seu projeto utilizando variáveis customizadas, facilitando mudanças globais em segundos como nos grandes builds profissionais!',
    concept: 'Declaramos variáveis com dois traços (`--nome-variavel`) dentro dos seletores CSS, e as invocamos usando a função nativa `var(--nome-variavel)`.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Redefina a paleta de cores de um card. Na classe `.cartao-tematico`:\n1. Declare uma variável customizada de cor chamada `--cor-sucesso` com o valor hexadecimal `#2ecc71`.\n2. Defina a propriedade `border-color` utilizando a função `var()` passando a variável `--cor-sucesso` recém-criada.',
    initialCode: '.cartao-tematico {\n  /* Declare e consuma a variável local de cor */\n  \n}',
    solutionExample: '.cartao-tematico {\n  --cor-sucesso: #2ecc71;\n  border-color: var(--cor-sucesso);\n}',
    tests: [
      { id: 't1', description: 'Deve possuir a declaração da variável --cor-sucesso com valor hexadecimal #2ecc71', ruleType: 'regex', expected: '--cor-sucesso\\s*:\\s*#2ecc71' },
      { id: 't2', description: 'A propriedade border-color deve ser definida por var(--cor-sucesso)', ruleType: 'regex', expected: 'border-color\\s*:\\s*var\\(\\s*--cor-sucesso\\s*\\)' }
    ],
    hint: 'Configure o seletor declarando as propriedades na mesma classe.',
    coinsReward: 40,
    xpReward: 200,
    order: 7
  },
  {
    id: 'css_adv_9',
    title: 'CSS Grid: Áreas Visuais Dinâmicas',
    description: 'Pare de misturar floats e margens erráticas para erguer colunas complexas de sites! Domine a fantástica propriedade Grid-Template-Areas para mapear layouts de forma visual e literal.',
    concept: 'A propriedade `grid-template-areas` nos permite desenhar o esquema de exibição escrevendo strings de nomes de áreas. Associamos elementos filhos a essas áreas utilizando a propriedade `grid-area`.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Forje um painel de faturamento em grade. Complete as classes CSS do contêiner e dos itens:\n1. Na regra `.conteiner-grade`, ative o layout com `display: grid;` e estabeleça as áreas com `grid-template-areas: "topo topo" "lateral principal";`.\n2. Na regra `.item-topo`, associe a área topo aplicando o comando `grid-area: topo;`.',
    initialCode: '.conteiner-grade {\n  \n}\n\n.item-topo {\n  \n}',
    solutionExample: '.conteiner-grade {\n  display: grid;\n  grid-template-areas: "topo topo" "lateral principal";\n}\n.item-topo {\n  grid-area: topo;\n}',
    tests: [
      { id: 't1', description: 'O conteiner .conteiner-grade deve de fato possuir display: grid;', ruleType: 'regex', expected: 'display\\s*:\\s*grid' },
      { id: 't2', description: 'O conteiner deve ter grid-template-areas definindo "topo topo" e "lateral principal"', ruleType: 'regex', expected: 'grid-template-areas\\s*:\\s*["\']topo topo["\']\\s+["\']lateral principal["\']' },
      { id: 't3', description: 'A classe .item-topo deve possuir o mapeamento de área grid-area: topo;', ruleType: 'regex', expected: 'grid-area\\s*:\\s*topo' }
    ],
    hint: 'Use a sintaxe exata para grid-template-areas com as aspas duplas idênticas ao enunciado e defina grid-area: topo; no filho.',
    coinsReward: 60,
    xpReward: 350,
    order: 19
  },
  {
    id: 'js_ini_8',
    title: 'JavaScript Moderno: Encadeamento Opcional (Optional Chaining)',
    description: 'Evite o infame erro "Cannot read properties of undefined" e salve sua aplicação de crashar de forma inesperada na produção ao buscar subpropriedades profundas em objetos dinâmicos ou de APIs.',
    concept: 'O operador de encadeamento opcional `?.` verifica se a referência anterior é nula ou indefinida antes de prosseguir com a leitura da propriedade subsequente. Se for nula, ele aborta e devolve `undefined` em vez de disparar uma exceção de quebra de script.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Forje uma função segura de recuperação de perfil. Escreva a função `obterApelido(avatares)`. Ela deve navegar de forma segura e retornar o valor de `avatares?.jogador?.perfil?.nickname` usando estritamente o operador de encadeamento opcional.',
    initialCode: 'function obterApelido(avatares) {\n  // Resgate de forma 100% segura sem usar condicionais longas\n  \n}',
    solutionExample: 'function obterApelido(avatares) {\n  return avatares?.jogador?.perfil?.nickname;\n}',
    tests: [
      { id: 't1', description: 'Deve conter a declaração da função obterApelido', ruleType: 'regex', expected: 'function\\s+obterApelido\\s*\\(\\s*avatares\\s*\\)' },
      { id: 't2', description: 'Deve utilizar o operador ?. para navegar por jogador, perfil e retornar nickname', ruleType: 'regex', expected: 'avatares\\?\\.jogador\\?\\.perfil\\?\\.nickname' }
    ],
    hint: 'Aplique as interrogações seguidas de pontos: return avatares?.jogador?.perfil?.nickname;',
    coinsReward: 40,
    xpReward: 200,
    order: 8
  },
  {
    id: 'js_adv_10',
    title: 'Mestre das Requisições Paralelas: Promise.all',
    description: 'Em vez de aguardar uma chamada de API demorada após a outra consecutiva de forma letárgica e ineficiente, execute requisições de forma simultânea poupando tempo crítico de carregamento de páginas!',
    concept: 'O método `Promise.all(arrayDePromises)` aguarda todas as promessas da lista serem resolvidas de forma simultânea no runtime e retorna um array consolidado com todas as respostas na mesma ordem do vetor inicial.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Desenvolva uma função auxiliar assíncrona com o nome exato `carregarDadosParalelos(promiseMoedas, promiseVidas)`. Ela deve aguardar concorrentemente o fechamento das duas promessas enviadas usando `Promise.all` em uma estrutura com `async/await`.',
    initialCode: 'async function carregarDadosParalelos(promiseMoedas, promiseVidas) {\n  // Desperte as chamadas concorrentemente para poupar tempo precioso\n  \n}',
    solutionExample: 'async function carregarDadosParalelos(promiseMoedas, promiseVidas) {\n  return await Promise.all([promiseMoedas, promiseVidas]);\n}',
    tests: [
      { id: 't1', description: 'Deve declarar a função assíncrona utilizando a palavra-chave async', ruleType: 'regex', expected: 'async\\s+function\\s+carregarDadosParalelos' },
      { id: 't2', description: 'Deve invocar a resolução simultânea com Promise.all', ruleType: 'regex', expected: 'Promise\\.all' },
      { id: 't3', description: 'Deve agrupar as promessas correspondentes em um array no argumento', ruleType: 'regex', expected: 'Promise\\.all\\(\\s*\\[\\s*promiseMoedas\\s*,\\s*promiseVidas\\s*\\]\\s*\\)' }
    ],
    hint: 'Insira as promessas de moedas e vidas em um colchete e use: return await Promise.all([promiseMoedas, promiseVidas]);',
    coinsReward: 60,
    xpReward: 350,
    order: 20
  },
  {
    id: 'html_adv_9',
    title: 'A Bússola do Destino (Meta Viewport)',
    description: 'Toda página moderna precisa se adaptar perfeitamente aos displays de celulares e tablets. No freeCodeCamp, aprendemos que sem calibrar a janela de visualização (viewport), os navegadores de celular simulam uma tela larga de desktop, deixando os textos minúsculos.',
    concept: 'A meta tag `<meta name="viewport" content="...">` instrui o navegador a ajustar as proporções de escala do site baseando-se no dispositivo do usuário. Definir o atributo content com as especificações `width=device-width` e `initial-scale=1.0` é o passo fundamental obrigatório para a conformidade responsiva e acessibilidade de qualquer projeto web.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Configure o viewport responsivo do castelo móvel. Adicione uma tag unificadora `<meta>` que carregue o atributo `name="viewport"` e o atributo de controle `content="width=device-width, initial-scale=1.0"`.',
    initialCode: '<!-- Insira a configuração de viewport responsiva -->\n',
    solutionExample: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    tests: [
      { id: 't1', description: 'Deve ser uma tag <meta> válida', ruleType: 'regex', expected: '<meta[^>]*>' },
      { id: 't2', description: 'Deve possuir o atributo name definido em viewport', ruleType: 'regex', expected: 'name=["\']viewport["\']' },
      { id: 't3', description: 'Deve possuir o atributo content configurado com width=device-width e initial-scale=1.0', ruleType: 'regex', expected: 'content=["\']width=device-width,\\s*initial-scale=1\\.0["\']' }
    ],
    hint: 'Use exatamente: <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    coinsReward: 50,
    xpReward: 250,
    order: 21
  },
  {
    id: 'html_int_8',
    title: 'O Selo Imperial (Atributo Pattern)',
    description: 'Seus formulários nunca devem aceitar dados mal-formados. No freeCodeCamp, aprendemos a utilizar as capacidades nativas de validação do HTML5 para criar regras instantâneas de integridade sem depender do JavaScript.',
    concept: 'O atributo `pattern` aceita uma Expressão Regular (Regex) no cliente. Quando o formulário é submetido, o navegador automaticamente valida a entrada do usuário e impede o envio disparando um balão nativo de alerta se o dado estiver incorreto.',
    track: 'html',
    difficulty: 'intermediario',
    task: 'Crie uma caixa de entrada imperial obrigatória com validação de código secreto. Crie uma tag `<input type="text">` aplicando os atributos:\n1. O atributo booleano de obrigatoriedade `required`.\n2. O validador de regra rúnica `pattern="[A-Z]{3}[0-9]{4}"` (que exige exatamente 3 letras maiúsculas seguidas de 4 números).',
    initialCode: '<!-- Forje o input com validação imperial de segurança -->\n',
    solutionExample: '<input type="text" pattern="[A-Z]{3}[0-9]{4}" required>',
    tests: [
      { id: 't1', description: 'Deve conter a tag de abertura <input>', ruleType: 'regex', expected: '<input[^>]*>' },
      { id: 't2', description: 'O input deve possuir o atributo required presente', ruleType: 'regex', expected: 'required' },
      { id: 't3', description: 'O input deve aplicar a expressão regular pattern="[A-Z]{3}[0-9]{4}"', ruleType: 'regex', expected: 'pattern=["\']\\[A-Z\\]\\{3\\}\\[0-9\\]\\{4\\}["\']' }
    ],
    hint: 'Forje um input de texto com o atributo required e o pattern="[A-Z]{3}[0-9]{4}" correspondente.',
    coinsReward: 50,
    xpReward: 250,
    order: 15
  },
  {
    id: 'html_adv_10',
    title: 'O Portal de Telas (A tag picture)',
    description: 'Carregar imagens pesadas de desktop em conexões móveis lenta é um erro de performance crucial. O freeCodeCamp nos ensina que podemos servir imagens perfeitamente resolvidas e recortadas dependendo da largura do dispositivo.',
    concept: 'O contêiner `<picture>` trabalha em harmonia com elementos `<source>` e um elemento de fallback definitivo `<img>`. O elemento `<source>` monitora anomalias de tela com recursos de `media` e injeta a fonte ideal em `srcset`. Se nenhuma consulta condicional for atendida, a tag de fallback `<img>` é desenhada na tela.',
    track: 'html',
    difficulty: 'avancado',
    task: 'Desenvolva uma imagem responsiva inteligente. Declare uma tag contêiner `<picture></picture>`. No seu interior aninhe:\n1. Uma tag `<source media="(min-width: 800px)" srcset="highres.jpg">` para layouts largos.\n2. Uma tag fallback `<img>` com `src="lowres.jpg"` para dispositivos compactos.',
    initialCode: '<!-- Prepare o picture com carregamento seletivo de resoluções -->\n',
    solutionExample: '<picture>\n  <source media="(min-width: 800px)" srcset="highres.jpg">\n  <img src="lowres.jpg">\n</picture>',
    tests: [
      { id: 't1', description: 'Deve possuir a tag picture envolvendo o conteúdo do portal', ruleType: 'regex', expected: '<picture>[\\s\\S]*<\\/picture>' },
      { id: 't2', description: 'Deve declarar o elemento source com media="(min-width: 800px)" e srcset="highres.jpg"', ruleType: 'regex', expected: '<source[^>]*media=["\']\\s*\\(\\s*min-width:\\s*800px\\s*\\)\\s*["\'][^>]*srcset=["\']highres\\.jpg["\']|<source[^>]*srcset=["\']highres\\.jpg["\'][^>]*media=["\']\\s*\\(\\s*min-width:\\s*800px\\s*\\)\\s*["\']' },
      { id: 't3', description: 'Deve possuir a tag img com src="lowres.jpg" definida', ruleType: 'regex', expected: '<img[^>]*src=["\']lowres\\.jpg["\']' }
    ],
    hint: 'Construa a hierarquia aninhando o <source> e o <img src="lowres.jpg"> no interior de <picture>.',
    coinsReward: 60,
    xpReward: 350,
    order: 22
  },
  {
    id: 'css_ini_7',
    title: 'O Escudo Rúnico (Valores de Fallback)',
    description: 'Ao projetar grandes sistemas de design com temas (claro/escuro), as variáveis globais podem ocasionalmente falhar ou não serem resolvidas. O freeCodeCamp nos ensina a forjar estilos ultra-resistentes definindo alternativas de contingência.',
    concept: 'Ao invocar variáveis de folha usando a função clássica `var()`, você pode prover um valor de fallback como segundo argumento opcional separado por vírgula: `var(--nome-variavel, cor-fallback)`. Caso o navegador não encontre a variável no escopo, adota no mesmo instante a cor padrão de segurança.',
    track: 'css',
    difficulty: 'iniciante',
    task: 'Estilize o escudo blindado do guerreiro. Na classe `.escudo`, configure a propriedade `background-color` chamando a variável `--cor-mana`. Lembre-se de prover como fallback seguro a cor `"blue"` caso ela esteja inacessível.',
    initialCode: '.escudo {\n  /* Traga estabilidade de cor ao escudo rúnico */\n  \n}',
    solutionExample: '.escudo {\n  background-color: var(--cor-mana, blue);\n}',
    tests: [
      { id: 't1', description: 'Deve conter a classe .escudo ativa no escopo', ruleType: 'regex', expected: '\\.escudo\\s*\\{' },
      { id: 't2', description: 'Deve definir background-color usando var() combinando --cor-mana e fallback blue', ruleType: 'regex', expected: 'background-color\\s*:\\s*var\\s*\\(\\s*--cor-mana\\s*,\\s*blue\\s*\\)' }
    ],
    hint: 'Forje exatamente a linha: background-color: var(--cor-mana, blue);',
    coinsReward: 40,
    xpReward: 200,
    order: 8
  },
  {
    id: 'css_int_9',
    title: 'A Torre Adaptativa (Unidade dvh Móvel)',
    description: 'Desenhar interfaces que medem a tela cheia com a antiga unidade `100vh` quebra o design de celulares por conta do menu dinâmico que o Safari ou Google Chrome exibem no topo ou no rodapé. O freeCodeCamp ensina a projetar designs robustos usando medições dinâmicas.',
    concept: 'A unidade moderna `dvh` (Dynamic Viewport Height) resolve os gargalos de displays móveis. Ela calcula a altura da tela dinamicamente em tempo real, compensando instantaneamente a compressão física quando as barras utilitárias do navegador surgem ou colapsam.',
    track: 'css',
    difficulty: 'intermediario',
    task: 'Ajuste o tamanho modular da masmorra vertical. Estilize a classe `.torre-dinamica` atribuindo a sua altura `height` para medir exatamente cem por cento da altura dinâmica do celular usando a unidade moderna `100dvh`.',
    initialCode: '.torre-dinamica {\n  /* Calibre a altura total adaptativa de torre */\n  \n}',
    solutionExample: '.torre-dinamica {\n  height: 100dvh;\n}',
    tests: [
      { id: 't1', description: 'Deve carregar as propriedades para a classe .torre-dinamica', ruleType: 'regex', expected: '\\.torre-dinamica\\s*\\{' },
      { id: 't2', description: 'Deve ajustar height para reter exatamente 100dvh', ruleType: 'regex', expected: 'height\\s*:\\s*100dvh\\s*;' }
    ],
    hint: 'No bloco operacional insira a instrução: height: 100dvh;',
    coinsReward: 50,
    xpReward: 250,
    order: 15
  },
  {
    id: 'css_adv_9',
    title: 'A Proporção Áurea (aspect-ratio)',
    description: 'Imagens de perfil redondas, cartões de aventura e tocadores de música devem reter suas formatos quadrados ou retangulares perfeitos enquanto encolhem ou esticam responsivamente de forma automática.',
    concept: 'A propriedade nativa `aspect-ratio` do CSS3 permite estipular uma proporção de caixas direta (como 16/9, 4/3 ou 1/1). O navegador calcula a altura correspondente automaticamente com base na largura atual do elemento, mantendo a geometria intacta de forma fluida sem requerer hacks.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Determine a proporção do pergaminho de vídeo. Insira na classe `.pergaminho` a propriedade de proporção `aspect-ratio` configurando-a no formato clássico de cinema `16/9`.',
    initialCode: '.pergaminho {\n  /* Preserve a proporção geométrica do pergaminho */\n  \n}',
    solutionExample: '.pergaminho {\n  aspect-ratio: 16/9;\n}',
    tests: [
      { id: 't1', description: 'Deve configurar a classe .pergaminho nas regras', ruleType: 'regex', expected: '\\.pergaminho\\s*\\{' },
      { id: 't2', description: 'Deve ditar a propriedade aspect-ratio contendo 16/9', ruleType: 'regex', expected: 'aspect-ratio\\s*:\\s*16\\s*/\\s*9' }
    ],
    hint: 'Insira a diretriz aspect-ratio: 16/9; no corpo da classe de estilo.',
    coinsReward: 60,
    xpReward: 350,
    order: 21
  },
  {
    id: 'css_adv_10',
    title: 'A Runa Pulsante (Animações @keyframes)',
    description: 'A interatividade sofisticada do freeCodeCamp demonstra como criar movimentos que chamam a atenção do recruta sem requerer pacotes JavaScript externos de manipulação de coordenadas.',
    concept: 'A regra `@keyframes` permite descrever um trajeto de movimentos ou transformações estéticas especificando frações (como `from`/`to`, ou `0%`/`100%`). Associamos esse feitiço estético a qualquer classe de elemento HTML usando a propriedade agregadora `animation`.',
    track: 'css',
    difficulty: 'avancado',
    task: 'Monte uma animação pulsante eterna de runa solar. Escreva a folha aplicando:\n1. A regra `@keyframes pulsar` que transicione de `from { transform: scale(1); }` até `to { transform: scale(1.15); }`.\n2. Na classe `.runa`, vincule a animação definindo: `animation: pulsar 1.5s infinite alternate;`.',
    initialCode: '.runa {\n  \n}\n\n/* Implemente o @keyframes pulsar abaixo */\n',
    solutionExample: '.runa {\n  animation: pulsar 1.5s infinite alternate;\n}\n@keyframes pulsar {\n  from { transform: scale(1); }\n  to { transform: scale(1.15); }\n}',
    tests: [
      { id: 't1', description: 'Deve declarar o elemento @keyframes pulsar na folha', ruleType: 'regex', expected: '@keyframes\\s+pulsar\\s*\\{[\\s\\S]*?from[\\s\\S]*?transform\\s*:\\s*scale\\s*\\(\\s*1\\s*\\)[\\s\\S]*?to[\\s\\S]*?transform\\s*:\\s*scale\\s*\\(\\s*1\\.15\\s*\\)' },
      { id: 't2', description: 'Deve invocar a animação pulsar na classe .runa de modo infinito e alternado', ruleType: 'regex', expected: '\\.runa\\s*\\{[\\s\\S]*?animation\\s*:\\s*pulsar\\s+1\\.5s\\s+infinite\\s+alternate' }
    ],
    hint: 'Certifique de fechar perfeitamente as chaves das regras internas do @keyframes e as chaves do .runa.',
    coinsReward: 60,
    xpReward: 350,
    order: 22
  },
  {
    id: 'js_ini_7',
    title: 'Desestruturando o Baú (Destructuring Objetos)',
    description: 'Acessar dados repetidamente em estruturas complexas com instruções como let ouro = bau.ouro polui as vistas de código. O freeCodeCamp nos ensina a abrir contêineres colhendo exclusivamente o que precisamos na mesma linha.',
    concept: 'A desestruturação de objetos (`destructuring`) permite extrair variáveis de chaves de objetos diretamente usando uma sintaxe limpa de espelho: `const { ouro, gemas } = bau;`. O compilador mapeia as chaves locais na mesma declaração.',
    track: 'js',
    difficulty: 'iniciante',
    task: 'Abra o baú do mago rúnico. Escreva a função `abrirBau(bau)` para que:\n1. Desestruture de forma limpa as variáveis de propriedade `ouro` e `gemas` do argumento de objeto `bau` em uma única linha.\n2. Retorne o alerta exato juntando strings: `"Você obteve: "` concatenando à variável extraída `ouro`.',
    initialCode: 'function abrirBau(bau) {\n  // Desestruture as propriedades do baú imperial\n  \n}',
    solutionExample: 'function abrirBau(bau) {\n  const { ouro, gemas } = bau;\n  return "Você obteve: " + ouro;\n}',
    tests: [
      { id: 't1', description: 'Deve declarar a desestruturação legítima extraindo ouro e gemas de bau', ruleType: 'regex', expected: '(const|let|var)\\s*\\{\\s*ouro\\s*,\\s*gemas\\s*\\}\\s*=\\s*bau' },
      { id: 't2', description: 'Deve retornar a string fundida conforme explicitado acima', ruleType: 'regex', expected: 'return\\s+["\']Você obteve: ["\']\\s*\\+\\s*ouro|return\\s*[`]Você obteve: \\$\\{ouro\\}[`]' }
    ],
    hint: 'Inicie extraindo as chaves: const { ouro, gemas } = bau; e complete retornando a frase pedida.',
    coinsReward: 40,
    xpReward: 200,
    order: 9
  },
  {
    id: 'js_int_9',
    title: 'A Expansão Spread (Concatenação de Mochilas)',
    description: 'Tentar mesclar múltiplos arrays ou criar cópias independentes sem passar lógicas de referência em arrays exige laços e rotinas prolixas. Domine o simplificado operador spread de descompactar listas.',
    concept: 'O operador rest/spread (`...`) atua como um descompactador de coleções de dados. Ao usarmos `[...mochilaA, ...mochilaB]`, o runtime extrai individualmente as marcas de cada array fundindo-os em um novíssimo arranjo.',
    track: 'js',
    difficulty: 'intermediario',
    task: 'Concatene inventários imperiais. Escreva uma função chamada `mesclarMochilas(mochilaA, mochilaB)` que recolha ambos arrays e retorne uma única lista contendo a fusão deles recorrendo exclusivamente ao operador spread (`...`).',
    initialCode: 'function mesclarMochilas(mochilaA, mochilaB) {\n  // Espalhe e funda os arrays em uma lista unificada\n  \n}',
    solutionExample: 'function mesclarMochilas(mochilaA, mochilaB) {\n  return [...mochilaA, ...mochilaB];\n}',
    tests: [
      { id: 't1', description: 'Deve conter a assinatura e parâmetros para a função mesclarMochilas', ruleType: 'regex', expected: 'function\\s+mesclarMochilas\\s*\\(\\s*mochilaA\\s*,\\s*mochilaB\\s*\\)' },
      { id: 't2', description: 'Deve devolver um array contendo a concatenação via spread de mochilaA e mochilaB', ruleType: 'regex', expected: 'return\\s*\\[\\s*\\.\\.\\.mochilaA\\s*,\\s*\\.\\.\\.mochilaB\\s*\\]' }
    ],
    hint: 'Retorne diretamente o array composto: return [...mochilaA, ...mochilaB];',
    coinsReward: 50,
    xpReward: 250,
    order: 15
  },
  {
    id: 'js_adv_11',
    title: 'Sincronia Assíncrona: Async e Await',
    description: 'Quando lidamos com comunicações externas que demoram (carregar dados de servidores ou consultar bancos de dados), encadear blocos de callback ou infinidades de métodos .then() cria o chamado callback hell. O freeCodeCamp ensina a organizar fluxes assíncronos de forma sequencial com async/await.',
    concept: 'A diretriz `async` declara que a função retornará uma Promise de forma intrínseca. No corpo operacional dela, a palavra-chave mágicas `await` faz o motor suspender a progressão do fluxo até que a Promise correlata retorne com êxito, entregando clareza de fluxo idêntica a códigos síncronos.',
    track: 'js',
    difficulty: 'avancado',
    task: 'Codifique uma comunicação assíncrona rúnica. Crie uma função assíncrona chamada `recrutarGuerreiro(api)`. No corpo dela, suspenda a rotina esperando a chamada concorrente `api.getDados()` usando `await`, armazene-a em uma constante e retorne esse valor obtido.',
    initialCode: '// Forje a comunicação assíncrona com os comandos do templo\n',
    solutionExample: 'async function recrutarGuerreiro(api) {\n  const resultado = await api.getDados();\n  return resultado;\n}',
    tests: [
      { id: 't1', description: 'A função deve conter a identificação async na assinatura do método', ruleType: 'regex', expected: 'async\\s+function\\s+recrutarGuerreiro' },
      { id: 't2', description: 'Deve utilizar a parada await antes de disparar o método api.getDados()', ruleType: 'regex', expected: 'await\\s+api\\.getDados\\s*\\(\\s*\\)' },
      { id: 't3', description: 'Deve devolver o valor recuperado da Promise com instrução de retorno', ruleType: 'regex', expected: 'return\\s+' }
    ],
    hint: 'Use a estrutura async function recrutarGuerreiro(api) { const d = await api.getDados(); return d; }.',
    coinsReward: 60,
    xpReward: 350,
    order: 21
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'badge_first', title: 'Primeiro Passo', description: 'Concluiu com sucesso a primeira lição prática.', icon: '🎓' },
  { id: 'badge_html_master', title: 'Rei do Marcador', description: 'Concluiu integralmente a trilha de HTML Iniciante.', icon: '🏰', trackRequirement: 'html' },
  { id: 'badge_css_master', title: 'Artista do Estilo', description: 'Concluiu integralmente a trilha de CSS Iniciante.', icon: '🎨', trackRequirement: 'css' },
  { id: 'badge_js_master', title: 'Alquimista do Script', description: 'Concluiu integralmente a trilha de JS Iniciante.', icon: '🧪', trackRequirement: 'js' },
  { id: 'badge_streak_3', title: 'Foco Lendário', description: 'Alcançou uma ofensiva diária de pelo menos 3 dias.', icon: '🔥' },
  { id: 'badge_hoarder', title: 'Magnata do CodeQuest', description: 'Alcançou a marca de 150 moedas de ouro ou mais.', icon: '🪙' }
];

export const SIMULATED_LEADERBOARD: LeaderboardUser[] = [
  { rank: 1, name: 'Arthur_Pendragon', xp: 5200, level: 12, avatar: '🧙‍♂️' },
  { rank: 2, name: 'Morgana_Code', xp: 4850, level: 11, avatar: '🧝‍♀️' },
  { rank: 3, name: 'Lancelot_CSS', xp: 4100, level: 9, avatar: '⚔️' },
  { rank: 4, name: 'Galahad_JS', xp: 3900, level: 8, avatar: '🛡️' },
  { rank: 5, name: 'Você (Aventureiro)', xp: 0, level: 1, avatar: '🚀', isCurrentUser: true },
  { rank: 6, name: 'Merlin_DOM', xp: 3200, level: 7, avatar: '🔮' },
  { rank: 7, name: 'Guinevere_Tags', xp: 2800, level: 6, avatar: '👑' }
];

export const INITIAL_MISSIONS: DailyMission[] = [
  { id: 'm1', title: 'Desbravador Cósmico', description: 'Complete 2 lições práticas para evoluir.', target: 2, current: 0, xpReward: 50, coinsReward: 15, completed: false },
  { id: 'm2', title: 'Investimento em Sabedoria', description: 'Compre uma dica ou restaure corações gastando moedas de ouro.', target: 1, current: 0, xpReward: 30, coinsReward: 10, completed: false },
  { id: 'm3', title: 'Código Impecável', description: 'Escreva um código que passe de primeira sem perder vidas.', target: 1, current: 0, xpReward: 40, coinsReward: 15, completed: false }
];
