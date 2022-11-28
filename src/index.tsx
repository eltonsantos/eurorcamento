import React from 'react';
import ReactDOM from 'react-dom/client';
import { createServer, Model } from 'miragejs';
import { App } from './App';
import { Login } from './components/Login';

import { GlobalStyle } from './styles/globalLogin';

createServer({

  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      // transactions: [
      //   {
      //     id: 1,
      //     title: 'Freelance de Website',
      //     type: 'deposit',
      //     category: 'Dev',
      //     amount: 6000,
      //     createdAt: new Date('2022-02-12 09:00:00'),
      //   },
      //   {
      //     id: 2,
      //     title: 'Aluguel',
      //     type: 'withdraw',
      //     category: 'Casa',
      //     amount: 2000,
      //     createdAt: new Date('2022-02-14 11:00:00'),
      //   },
      // ]
    })
  },

  routes() {
    this.namespace = 'api';
    
    this.get('/transactions', () => {
      return this.schema.all('transaction')
    });

    this.post('/transactions', (schema, request) => {
      const data = JSON.parse(request.requestBody);
      return schema.create('transaction', data);
    });

    this.put('/transactions/:id', (schema, request): any => {
      const id = request.params.id
      return schema.find('transaction', id)?.update;
    })

    this.del('/transactions/:id', (schema, request): any => { // Por que esse any??
      const id = request.params.id // Vejo que ta sendo chamada, mas não acho que esteja fazendo nada
      return schema.find('transaction', id)?.destroy() // Não entendi por que fui obrigado a deixar o opcional ? Como por outra forma?
    })
  }
})

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <Login />
    <GlobalStyle /> */}
    <App />
  </React.StrictMode>
);