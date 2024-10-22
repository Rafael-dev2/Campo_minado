'use strict';

// TODO - Change this to API call to get records from the server
async function fetchRecords() {
  const records = [
    {
      name: 'John Doe',
      score: 100,
      mode: 'Classico'
    },
    {
      name: 'Jane Doe',
      score: 200,
      mode: 'Classico'
    },
    {
      name: 'John Doe',
      score: 300,
      mode: 'Classico'
    },
    {
      name: 'Jane Doe',
      score: 400,
      mode: 'Classico'
    },
    {
      name: 'John Doe',
      score: 500,
      mode: 'Classico'
    },
    {
      name: 'Jane Doe',
      score: 600,
      mode: 'Classico'
    },
    {
      name: 'John Doe',
      score: 700,
      mode: 'Classico'
    },
    {
      name: 'Jane Doe',
      score: 800,
      mode: 'Classico'
    },
    {
      name: 'John Doe',
      score: 900,
      mode: 'Classico'
    },
    {
      name: 'Jane Doe',
      score: 1000,
      mode: 'Classico'
    },
  ].reverse();

  return records;
}

async function fetchHistory() {
  return [
    {
      name: 'John Doe',
      date: '2021-01-01',
      dimension: 10,
      bombs: 10,
      mode: 'Classico',
      time: 60,
      win: true
    },
    {
      name: 'Jane Doe',
      date: '2021-01-02',
      dimension: 10,
      bombs: 10,
      mode: 'Classico',
      time: 72,
      win: true
    },
    {
      name: 'John Doe',
      date: '2021-01-03',
      dimension: 10,
      bombs: 10,
      mode: 'Classico',
      time: 59,
      win: true
    },
    {
      name: 'Jane Doe',
      date: '2021-01-04',
      dimension: 10,
      bombs: 10,
      mode: 'Classico',
      time: 24,
      win: false
    },
  ]
}

async function login(user, password) {
  return {
    data: {
      name: 'John Doe',
      email: 'j271924@dac.unicamp.br',
      cpf: '82391405175',
      birthdate: '1999-01-01',
      phone: '19999999999',
    },
    statusCode: 200,
  }
}