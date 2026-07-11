/**
 * DAMAS 3D
 * Backend em Google Apps Script.
 *
 * Este arquivo:
 *  1) Serve o jogo (Index.html) como um Web App, pronto para incorporar
 *     no Google Sites via <iframe> (ou pelo bloco "Incorporar" > "Por URL").
 *  2) Fornece um pequeno "banco de dados" de salas de multiplayer usando
 *     PropertiesService, acessado pelo front-end via google.script.run.
 *
 * COMO PUBLICAR:
 *  1. Extensões > Apps Script (ou script.google.com > Novo projeto).
 *  2. Cole este conteúdo em um arquivo chamado "Code.gs".
 *  3. Crie um arquivo HTML chamado "Index" (Arquivo > Novo > Arquivo HTML,
 *     nome exatamente "Index") e cole o conteúdo do arquivo Index.html.
 *  4. Implantar > Nova implantação > tipo "App da Web".
 *     - Executar como: Eu (seu usuário)
 *     - Quem pode acessar: Qualquer pessoa
 *  5. Copie a URL gerada (.../exec). Essa é a URL do jogo.
 *  6. No Google Sites: Inserir > Incorporar > Por URL, cole a URL do app.
 *
 * LIMITAÇÕES DO MULTIPLAYER:
 *  - As salas ficam guardadas em PropertiesService.getScriptProperties(),
 *    que tem limite de ~9KB por valor e ~500KB no total — suficiente para
 *    várias partidas simultâneas de uma turma, mas não para uso em massa.
 *  - Não há expiração automática de salas antigas; a função limparSalasAntigas()
 *    abaixo pode ser agendada (gatilho de tempo) para limpar salas com mais
 *    de X horas, se desejar.
 */

// ---------- SERVIR O JOGO ----------

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Damas 3D (Em desenvolvimento)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

// ---------- ARMAZENAMENTO DE SALAS (usado pelo multiplayer) ----------

/**
 * Salva (ou sobrescreve) um valor de string associado a uma chave.
 * Usado pelo front-end como storageSet(key, value).
 */
function gsSetItem(key, value) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    PropertiesService.getScriptProperties().setProperty(key, value);
  } finally {
    lock.releaseLock();
  }
  return true;
}

/**
 * Lê o valor de string associado a uma chave (ou null se não existir).
 * Usado pelo front-end como storageGet(key).
 */
function gsGetItem(key) {
  return PropertiesService.getScriptProperties().getProperty(key);
}

/**
 * Remove uma sala manualmente (opcional, não usado automaticamente pelo jogo).
 */
function gsDeleteItem(key) {
  PropertiesService.getScriptProperties().deleteProperty(key);
  return true;
}

/**
 * Limpeza opcional de salas antigas. Toda sala salva tem, dentro do JSON,
 * um campo implícito de atividade recente (o "version" cresce a cada jogada).
 * Como não guardamos timestamp por padrão, esta função remove TODAS as
 * chaves "damas_room_*" — rode manualmente quando quiser "zerar" as salas
 * (por exemplo, no início de cada dia de aula). Se preferir expiração
 * automática por tempo, adicione um campo "createdAt" no JSON do lado do
 * front-end e filtre aqui.
 */
function limparTodasAsSalas() {
  var props = PropertiesService.getScriptProperties();
  var all = props.getProperties();
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    for (var key in all) {
      if (key.indexOf('damas_room_') === 0) {
        props.deleteProperty(key);
      }
    }
  } finally {
    lock.releaseLock();
  }
}
