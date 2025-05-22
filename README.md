# Vitrine X - Página de Produto E-commerce

Uma página de produto e-commerce moderna e responsiva construída com Next.js, React e Tailwind CSS. Este projeto apresenta uma interface dinâmica de exibição de produtos com recursos avançados e animações suaves.

## 🚀 Tecnologias

- [Next.js](https://nextjs.org/) - Framework React para produção
- [React Query](https://tanstack.com/query/latest) - Busca e cache de dados
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitário
- [Framer Motion](https://www.framer.com/motion/) - Biblioteca de animações
- [PWA (Progressive Web App)](https://web.dev/progressive-web-apps/) - Para funcionalidades offline
- [View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transitions_API) - Para transições suaves entre páginas

## 🎯 Funcionalidades

- **Galeria de Imagens do Produto**
  - Imagem principal ocupando ~35% da tela
  - Navegação por miniaturas com troca dinâmica de imagens
  - Transições suaves entre imagens usando View Transition API

- **Informações do Produto**
  - Exibição de título e preço
  - Seletores dinâmicos de variantes (Tamanho e Cor)
  - Gerenciamento de estado persistente (duração de 15 minutos)

- **Informações de Entrega**
  - Validação de CEP
  - Autopreenchimento de endereço usando API ViaCEP
  - Informações de entrega em tempo real

## 🛠️ Configuração e Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seunome/vitrine-x.git
cd vitrine-x
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
# ou
bun install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
# ou
bun dev
```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 📋 Requisitos do Projeto

### Exibição do Produto
- Imagem principal do produto (35% do espaço da tela)
- Galeria de miniaturas com interação por clique
- Título e preço dinâmicos do produto

### Seleção de Variantes
- Seletor dinâmico de tamanho
- Seletor dinâmico de cor
- Todas as variantes devem ser geradas a partir de estruturas de dados dinâmicas

### Informações de Entrega
- Campo de entrada de CEP com validação
- Integração com a API ViaCEP (https://viacep.com.br/)
- Exibição do endereço completo após entrada de CEP válido

### Persistência de Estado
- Todas as ações do usuário devem ser preservadas ao atualizar a página
- Duração da persistência: 15 minutos

## 💡 Notas de Implementação

- O projeto segue padrões modernos de UX de e-commerce inspirados em plataformas como Mercado Livre, Shopee e Amazon
- Foco em soluções práticas que permitam flexibilidade para modificações futuras
- Utiliza recursos PWA para funcionalidades offline
- Implementa transições e animações suaves usando Framer Motion e View Transition API

## 🌐 Integração com API

O projeto integra-se com a API ViaCEP para consulta de endereços:
```
GET https://viacep.com.br/ws/{cep}/json/
```

## 📱 Recursos PWA

- Funcionalidade offline
- Prompt de instalação para dispositivos móveis
- Carregamento rápido e animações suaves
- Design responsivo para todos os tamanhos de tela

## 🎨 Considerações de Design

- Interface moderna e limpa
- Layout responsivo
- Componentes acessíveis
- Animações e transições suaves
- Abordagem mobile-first

