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
