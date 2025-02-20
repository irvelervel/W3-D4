// questo documento JS serve a rendere funzionante e soprattutto "dinamico" il nostro
// calendario. Senza JS non potrebbe mostrare in ogni situazione il mese corretto
// (corrente), e non saprebbe valutare in modo corretto in ogni situazione quante
// celle creare per la parte centrale della pagina.

// si parte!
// cominciamo con la parte alta: dobbiamo capire in che mese siamo e disegnare un numero
// di celle pari ai giorni del mese corrente

const now = new Date() // now è un oggetto di tipo DATA

const monthNames = [
  'Gennaio', // 0
  'Febbraio', // 1
  'Marzo', // 2
  'Aprile', // 3
  'Maggio', // 4
  'Giugno', // 5
  'Luglio', // 6
  'Agosto', // 7
  'Settembre', // 8
  'Ottobre', // 9
  'Novembre', // 10
  'Dicembre', // 11
]

const showMonthInHeader = function () {
  // dobbiamo riempire quell'<h1> lasciato volutamente vuoto in HTML
  // solo JS può sapere con che parola riempirlo!
  const monthIndex = now.getMonth() // nel caso di febbraio, sarebbe 1
  console.log('INDICE MESE CORRENTE', monthIndex)
  const currentMonth = monthNames[monthIndex] // 'Febbraio'
  console.log('MESE CORRENTE', currentMonth)
  // ma adesso andiamo a mettere il mese corrente nell'h1 lasciato vuoto in HTML!
  // 1) seleziono l'h1
  const h1Title = document.getElementById('current-month')
  //   const h1Title = document.getElementsByTagName('h1')[0]
  //   const h1Title = document.querySelector('h1')
  // 2) lo manipolo
  h1Title.innerText = currentMonth
}

showMonthInHeader()
