### <img src="https://github.com/corabank/frontend-case/blob/16051123b026faaba02e6d0959fe471a6a6dac2a/src/assets/logo.svg" alt="Cora" title="Cora" width="50" />
### Frontend Teste
Teste para vagas de frontend da [Cora](https://www.cora.com.br) :heartbeat:
<br />

# Quick Menu

- [Hey There](#hey-there-wave)
  - [Principais tarefas](#principais-tarefas)
- [Como começar](#como-começar)
- [Contratos com APIs](#contratos-com-apis)
  - [Auth](#auth)
  - [List](#list)
- [License](#license)

# Hey There :wave:

Neste teste, gostaríamos que você simulasse a criação e manutenção de um projeto real e aplicasse todas as práticas e técnicas que você considera importantes em um projeto frontend.

O objetivo deste teste é avaliar sua capacidade de desenvolver interfaces web. Você será responsável por resolver bugs, efetuar melhorias, implementar funcionalidades e desenvolver **uma** nova página de acordo com as especificações fornecidas.

## Principais tarefas
1. Resolução de Problemas: Você será desafiado a identificar e corrigir possíveis erros e problemas relacionados à interface em páginas já existentes. Isso envolve a depuração de código, a correção de erros de exibição e a garantia de que todas as funcionalidades estejam funcionando corretamente.

2. Desenvolvimento de Páginas Novas: Você será responsável por desenvolver **uma** nova página para melhorar a experiência do usuário. Isso envolve a criação de layouts atraentes e a implementação de interações intuitivas e funcionais ([link do figma](https://www.figma.com/file/TXxt0VFxbzDoho4tmt9XPP/Teste_FrontWeb?type=design&node-id=0-1&mode=design)).

3. Integração com APIs: Você será responsavel por todas as integrações com APIs, de acordo com os contratos fornecidos.

# Como começar?

1. Faça o **fork** ou **clone** de projeto

2. Instale as dependencias

3. Inicie o projeto com o comando:

    ```bash
    npm run dev
    ```

    **Info**: Esse comando vai rodar o client e o server. O server vai sempre rodar na porta `3000`, e o client possivelmente vai rodar na porta `5173` (o proprio `vite` que faz essa escolha, então fique atento ao seu terminal)

    Se quiser conferir se o server esta rodando é só rodar o seguinte **cURL**:

    ```bash
    curl --location 'http://localhost:3000/health-check'
    ```

4. Agora é só seguir o passo a passo que vai aparecer no seu localhost (possivelmente na porta `5173`). Boa sorte :v:

# Contratos com APIs.

## Auth

cURL:
```bash
curl --location 'http://localhost:3000/auth' \
--header 'Content-Type: application/json' \
--data '{
    "cpf": "35819357833",
    "password": "123456"
}'
```

**Info**: O `cpf` e `password` são fixos, ou seja, são exatamente os mesmos que estão no **cURL** :)

Response:
```json
{
  "token": "$TOKEN"
}
```

## List

cURL:
```bash
curl --location 'http://localhost:3000/list' \
--header 'token: $TOKEN'
```

Response Interface:
```ts
interface IResponseList {
  results: {
    items: {
      "id": string
      "description": string
      "label": string
      "entry": "DEBIT" | "CREDIT"
      "amount": number //in cents
      "name": string
      "dateEvent": string //ex: 2024-01-11T14:47:46Z
      "status": string
    }[]
    date: string //ex: 2024-02-01
  }[]
  itemsTotal: number
}
```

# License

MIT © [corabank](https://github.com/corabank)
