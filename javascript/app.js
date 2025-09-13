document.addEventListener('DOMContentLoaded', () => {
  // === I18N ===
  const dictionaries = {
    pt: {
      langCode: 'pt-br',
      title: 'Conversor de Bases Numéricas',
      header: 'Conversor de Bases',
      labels: {
        btr: 'Ternário B.',
        bin: 'Binário',
        oct: 'Octal',
        non: 'Nonário',
        dec: 'Decimal',
        hex: 'Hex'
      },
      placeholders: {
        btr: 'Base 3 (a mais eficiente)',
        bin: 'Base 2',
        oct: 'Base 8',
        non: 'Base 9',
        dec: 'Base 10',
        hex: 'Base 16'
      },
      info: {
        title: 'Símbolos e Ordem',
        intro: 'A ordem das bases segue o princípio de <strong>Radix Economy</strong>, da mais eficiente para a menos eficiente.',
        list: `
          <li><strong>Ternário B.:</strong> <code>-</code>, <code>0</code>, <code>+</code> <small>(Balanceado)</small></li>
          <li><strong>Binário:</strong> <code>0, 1</code></li>
          <li><strong>Octal:</strong> <code>0-7</code></li>
          <li><strong>Nonário:</strong> <code>0-8</code></li>
          <li><strong>Decimal:</strong> <code>0-9</code></li>
          <li><strong>Hexadecimal:</strong> <code>0-9</code>, <code>a-f</code></li>
        `,
        help: 'Digite um número em qualquer campo para converter para todas as outras bases.',
        why: 'Por que o Ternário é melhor?',
        paragraph: "A base mais econômica para representar números é a constante de Euler, <em>e</em> (≈2.718). O sistema ternário (base 3) é o inteiro mais próximo de <em>e</em>, tornando-se a base mais eficiente em termos de custo e complexidade. O Ternário Balanceado é ainda mais elegante, pois representa números negativos sem a necessidade de um bit de sinal."
      },
      error: 'Erro',
      toggleAria: 'Alternar idioma'
    },
    en: {
      langCode: 'en',
      title: 'Number Base Converter',
      header: 'Base Converter',
      labels: {
        btr: 'Balanced Ternary',
        bin: 'Binary',
        oct: 'Octal',
        non: 'Nonary',
        dec: 'Decimal',
        hex: 'Hex'
      },
      placeholders: {
        btr: 'Base 3 (most efficient)',
        bin: 'Base 2',
        oct: 'Base 8',
        non: 'Base 9',
        dec: 'Base 10',
        hex: 'Base 16'
      },
      info: {
        title: 'Symbols and Order',
        intro: 'The order of the bases follows the principle of <strong>Radix Economy</strong>, from the most efficient to the least efficient.',
        list: `
          <li><strong>Balanced Ternary:</strong> <code>-</code>, <code>0</code>, <code>+</code> <small>(Balanced)</small></li>
          <li><strong>Binary:</strong> <code>0, 1</code></li>
          <li><strong>Octal:</strong> <code>0-7</code></li>
          <li><strong>Nonary:</strong> <code>0-8</code></li>
          <li><strong>Decimal:</strong> <code>0-9</code></li>
          <li><strong>Hexadecimal:</strong> <code>0-9</code>, <code>a-f</code></li>
        `,
        help: 'Type a number in any field to convert it to all the other bases.',
        why: 'Why is Ternary better?',
        paragraph: "The most economical base for representing numbers is Euler's constant, <em>e</em> (≈2.718). The ternary system (base 3) is the integer closest to <em>e</em>, making it the most efficient base in terms of cost and complexity. Balanced Ternary is even more elegant because it represents negative numbers without the need for a sign bit."
      },
      error: 'Error',
      toggleAria: 'Toggle language'
    }
  };

  function detectInitialLang() {
    const saved = localStorage.getItem('lang');
    if (saved === 'pt' || saved === 'en') return saved;
    const nav = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
    if (nav.startsWith('pt')) return 'pt';
    return 'en';
  }

  let currentLang = detectInitialLang();

  const $ = (sel) => document.querySelector(sel);

  function applyTranslations() {
    const dict = dictionaries[currentLang];
    document.documentElement.setAttribute('lang', dict.langCode);

    // Title and header
    const titleEl = document.querySelector('title[data-i18n="title"]');
    if (titleEl) titleEl.textContent = dict.title;
    const headerEl = document.querySelector('[data-i18n="header"]');
    if (headerEl) headerEl.textContent = dict.header;

    // Labels
    const labelMap = [
      ['label_btr', 'btr'],
      ['label_bin', 'bin'],
      ['label_oct', 'oct'],
      ['label_non', 'non'],
      ['label_dec', 'dec'],
      ['label_hex', 'hex']
    ];
    labelMap.forEach(([key, id]) => {
      const el = document.querySelector(`[data-i18n="${key}"]`);
      if (el) el.textContent = dict.labels[id];
    });

    // Placeholders
    const placeholders = dict.placeholders;
    const pmap = {
      btr: $('#btr'), bin: $('#bin'), oct: $('#oct'), non: $('#non'), dec: $('#dec'), hex: $('#hex')
    };
    Object.keys(pmap).forEach(k => {
      if (pmap[k]) pmap[k].setAttribute('placeholder', placeholders[k]);
    });

    // Info content
    const info = dict.info;
    const infoTitle = $('#info-title');
    if (infoTitle) infoTitle.textContent = info.title;
    const infoIntro = $('#info-intro');
    if (infoIntro) infoIntro.innerHTML = info.intro;
    const infoList = $('#info-list');
    if (infoList) infoList.innerHTML = info.list;
    const infoHelp = $('#info-help');
    if (infoHelp) infoHelp.textContent = info.help;
    const infoWhy = $('#info-why');
    if (infoWhy) infoWhy.textContent = info.why;
    const infoParagraph = $('#info-paragraph');
    if (infoParagraph) infoParagraph.innerHTML = info.paragraph;

    // Toggle aria
    const toggle = $('#lang-toggle');
    if (toggle) toggle.setAttribute('aria-label', dict.toggleAria);
  }

  function toggleLanguage() {
    currentLang = currentLang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('lang', currentLang);
    applyTranslations();
  }

  const langToggleBtn = document.getElementById('lang-toggle');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // === Converter logic ===
  const inputs = document.querySelectorAll('.input-grid input');
  let isUpdating = false; // Flag para evitar loops de atualização

  // --- FUNÇÕES DE CONVERSÃO ---

  function decimalToBalancedTernary(n) {
    if (n === 0) return '0';
    let num = n;
    let trits = '';
    while (num !== 0) {
      const remainder = (num + 1) % 3 - 1;
      trits = { '-1': '-', '0': '0', '1': '+' }[remainder] + trits;
      num = Math.trunc((num - remainder) / 3);
    }
    return trits;
  }

  function balancedTernaryToDecimal(btr) {
    let n = 0;
    for (let i = 0; i < btr.length; i++) {
      const trit = btr[btr.length - 1 - i];
      const value = { '-': -1, '0': 0, '+': 1 }[trit];
      if (value === undefined) throw new Error('Invalid character in balanced ternary string');
      n += value * Math.pow(3, i);
    }
    return BigInt(n);
  }

  /**
   * Converte uma string de uma base arbitrária para BigInt.
   * Necessário para bases não suportadas nativamente por BigInt (como base 9).
   */
  function parseBigInt(value, base) {
    const bigBase = BigInt(base);
    let result = 0n;
    for (let i = 0; i < value.length; i++) {
      const digit = parseInt(value[i], base);
      if (isNaN(digit)) throw new Error('Invalid digit for base');
      result = result * bigBase + BigInt(digit);
    }
    return result;
  }

  // --- VALIDAÇÃO ---
  function isValidInput(value, base) {
    let regex;
    switch(base) {
      case 'btr': regex = /^[+\-0]+$/; break;
      case '2': regex = /^[01]+$/; break;
      case '8': regex = /^[0-7]+$/; break;
      case '9': regex = /^[0-8]+$/; break;
      case '10': regex = /^-?[0-9]+$/; break;
      case '16': regex = /^[0-9a-fA-F]+$/; break;
      default: return false;
    }
    return value === '' || regex.test(value);
  }

  // --- LÓGICA PRINCIPAL ---
  function handleInput(event) {
    if (isUpdating) return;

    const sourceInput = event.target;
    const sourceBase = sourceInput.dataset.base;
    let value = sourceInput.value.trim();

    sourceInput.classList.remove('error');

    if (!isValidInput(value, sourceBase)) {
      sourceInput.classList.add('error');
      return;
    }

    if (value === '' || value === '-') {
      clearAllInputs(sourceInput);
      return;
    }

    let decimalValue;

    // 1. Converte o valor de entrada para BigInt (base decimal)
    try {
      switch (sourceBase) {
        case 'btr':
          decimalValue = balancedTernaryToDecimal(value);
          break;
        case '10':
          decimalValue = BigInt(value);
          break;
        case '16':
          decimalValue = BigInt('0x' + value);
          break;
        case '8':
          decimalValue = BigInt('0o' + value);
          break;
        case '2':
          decimalValue = BigInt('0b' + value);
          break;
        case '9':
          decimalValue = parseBigInt(value, 9);
          break;
      }
    } catch (e) {
      sourceInput.classList.add('error');
      return;
    }

    // 2. Atualiza todos os outros campos com base no valor decimal
    updateAllInputs(decimalValue, sourceInput);
  }

  function clearAllInputs(exceptInput) {
    isUpdating = true;
    inputs.forEach(input => {
      if (input !== exceptInput) {
        input.value = '';
        input.classList.remove('error');
      }
    });
    isUpdating = false;
  }

  function updateAllInputs(decimalValue, sourceInput) {
    isUpdating = true;

    inputs.forEach(input => {
      if (input === sourceInput) return;

      const targetBase = input.dataset.base;
      let result = '';

      try {
        if (decimalValue === undefined) throw new Error();

        switch (targetBase) {
          case 'btr':
            result = decimalToBalancedTernary(Number(decimalValue));
            break;
          case '10':
            result = decimalValue.toString(10);
            break;
          case '16':
            result = decimalValue.toString(16);
            break;
          case '8':
            result = decimalValue.toString(8);
            break;
          case '2':
            result = decimalValue.toString(2);
            break;
          case '9':
            result = decimalValue.toString(9);
            break;
        }
        input.value = result;
        input.classList.remove('error');
      } catch (e) {
        // Localized error string inside input
        const errText = dictionaries[currentLang].error;
        input.value = errText;
        input.classList.add('error');
      }
    });

    isUpdating = false;
  }

  inputs.forEach(input => {
    input.addEventListener('input', handleInput);
  });

  // Apply initial language
  applyTranslations();
});
