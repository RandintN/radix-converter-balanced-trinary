# Radix Converter — Balanced Ternary

[PT-BR](#pt-br) | [EN](#en)

---

<a id="pt-br"></a>
## 🇧🇷 Visão Geral (PT-BR)
Um conversor de bases numéricas com foco no Ternário Balanceado (−, 0, +). Permite inserir um número em qualquer base e ver a conversão em tempo real para as demais. A interface traz um botão para alternar o idioma entre Português e Inglês e explica, de forma resumida, o conceito de Radix Economy que motiva a ordem das bases.

### Recursos
- Conversões entre várias bases: Ternário Balanceado, Binário, Octal, Nonário, Decimal e Hexadecimal.
- Tradução PT/EN com persistência de preferência via localStorage.
- Interface limpa e responsiva, com destaques visuais ao focar nos campos.
- Validações básicas de entrada e feedback visual de erro.

### Estrutura do Projeto
- index.html — HTML principal da aplicação.
- css/styles.css — Estilos (CSS) extraídos do HTML.
- javascript/app.js — Lógica (JavaScript) extraída do HTML, incluindo i18n e conversões.
- LICENSE — Licença MIT do projeto.
- README.md — Este arquivo (PT-BR e EN).

### Como Usar
1. Abra o arquivo `index.html` no navegador.
2. Digite um número em qualquer campo (ex.: Decimal) e veja as conversões automáticas nos demais campos.
3. Use o botão “PT • EN” no canto superior esquerdo para alternar o idioma da interface.

### Desenvolvimento Local
Não há dependências de build. Basta clonar/baixar o projeto e abrir o `index.html` em um navegador moderno. Opcionalmente, sirva via um servidor estático local para evitar restrições de origem em alguns ambientes.

### Licença
Este projeto é distribuído sob a Licença MIT. Consulte o arquivo `LICENSE` na raiz para o texto completo. Os arquivos de código incluem comentários referenciando a licença.

---

<a id="en"></a>
## 🇺🇸 Overview (EN)
A number base converter focused on Balanced Ternary (−, 0, +). You can input a number in any base and see real-time conversions to the others. The UI includes a language toggle between Portuguese and English and a brief explanation of Radix Economy, which motivates the base ordering.

### Features
- Conversions across multiple bases: Balanced Ternary, Binary, Octal, Nonary, Decimal, and Hexadecimal.
- PT/EN translation with preference persisted via localStorage.
- Clean, responsive interface with visual focus highlights.
- Basic input validation with visual error feedback.

### Project Structure
- index.html — Main application HTML.
- css/styles.css — CSS extracted from the HTML.
- javascript/app.js — JavaScript logic extracted from the HTML, including i18n and conversions.
- LICENSE — Project MIT License.
- README.md — This file (PT-BR and EN).

### How to Use
1. Open `index.html` in your browser.
2. Type a number in any field (e.g., Decimal) to see automatic conversions across the other fields.
3. Use the “PT • EN” button in the top-left corner to switch the interface language.

### Local Development
No build dependencies required. Simply clone/download the project and open `index.html` in a modern browser. Optionally serve via a local static server to avoid origin restrictions in some environments.

### License
This project is distributed under the MIT License. See the `LICENSE` file at the project root for the full text. Source files include comments referencing the license.
