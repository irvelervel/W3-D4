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

// oggi siamo nel mese di febbraio
// febbraio ha 28 giorni
// per ognuno di questi 28 giorni, potremo salvare un numero INFINITO di appuntamenti
// un evento voglio salvarlo così: ["18:00 - Dentista", "13:00 - Pastasciutta", etc.]

// questa è la nostra struttura dati per salvare infiniti appuntamenti
// nel nostro calendario
// un array contentente n array, dove n è il numero dei giorni del mese
// [
//   [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], [], [], [], [], [], [], [],
//   [], [], [], [], [], [], [], [], [], [], [], [], [], [], []
// ]

const memory = []

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

// vado a capire quanti giorni ha il mese corrente
const daysInThisMonth = function () {
  // il ragionamento è: dato il giorno corrente, vado a ricercare il primo giorno
  // del mese successivo. Da questa data che ottengo, sottraggo 1 giorno. Ottengo
  // quindi l'ultimo giorno del mese corrente, il cui numero rappresenta anche
  // il numero TOTALE dei giorni del mese corrente.

  // calcoliamo ora la data per trovare il primo giorno del prossimo mese
  // in che anno siamo
  const year = now.getFullYear() // 2025
  const month = now.getMonth() // 1

  // a questo punto, utilizzo queste informazioni per generare una NUOVA DATA
  // che rappresenterà il PRIMO GIORNO del mese successivo:
  const lastDayOfCurrentMonth = new Date(year, month + 1, 0) // "lo 0 di marzo" (il 28 febbraio)
  // questa variabile che ho appena trovato rappresenta la data dell'ultimo giorno del mese corrente
  // da questa data io estraggo il numero del giorno
  console.log('ULTIMO GIORNO DEL MESE', lastDayOfCurrentMonth)
  const numberOfDays = lastDayOfCurrentMonth.getDate() // 28
  console.log('da questa data estrapoliamo il numero del giorno', numberOfDays)
  return numberOfDays
}

const createCalendarCells = function (numberOfDays) {
  // questa funzione si occupa di creare da zero le celle per il calendario
  // e di appenderle nel DOM

  // numberOfDays rappresenta il NUMERO di celle che devono venire create
  // devo eseguire la creazione di UNA cella NUMBEROFDAYS volte!

  for (let i = 0; i < numberOfDays; i++) {
    // in febbraio, questo ciclo viene eseguito 28 volte!

    // aggiungo alla memoria del calendario una "sottosezione" per questa giornata
    memory.push([])

    // creiamone una!
    const cell = document.createElement('div') // <div></div>
    cell.classList.add('day') // <div class="day"></div>

    // rendiamo cliccabile la cella appena creata!
    cell.addEventListener('click', () => {
      // questo succederà al click di una qualsiasi cella

      // al click di una cella, devo prima di tutto deselezionare l'ultima cella
      // cliccata, se esiste
      //   const alreadySelected = document.querySelector('.selected')
      const alreadySelected = document.querySelector('.selected')
      // a questo punto alreadySelected può essere NULL o un'altra cella precedentemente
      // cliccata
      if (alreadySelected !== null) {
        // vado a togliere la classe "selected" dalla cella alreadySelected
        alreadySelected.classList.remove('selected')
      }

      //  versione con getElementsByClassName
      //   const alreadySelected = document.getElementsByClassName('selected')
      //   // a questo punto alreadySelected può essere NULL o un'altra cella precedentemente
      //   // cliccata
      //   console.log('alreadySelected', alreadySelected)
      //   if (alreadySelected.length > 0) {
      //     // vado a togliere la classe "selected" dalla cella alreadySelected
      //     alreadySelected[0].classList.remove('selected')
      //   }

      // questa riga aggiunge la classe "selected" alla cella cliccata
      cell.classList.add('selected') // inserire il nome della classe

      // oltre a colorare la cella, dobbiamo trasportarne il valore in basso a sx
      //   nella sezione che ho chiamato "newMeetingDay"
      const spanToReplace = document.getElementById('newMeetingDay')
      spanToReplace.innerText = i + 1
      spanToReplace.classList.add('hasDay')
    })

    // contenuto di cell
    const cellValue = document.createElement('h3')
    cellValue.innerText = i + 1

    // calcoliamoci qual è il giorno di oggi
    // solo ad UNA cella verrà assegnata la classe "color-epic"
    const today = now.getDate() // 20
    if (i + 1 === today) {
      // se il numero della cella è 20...
      cellValue.classList.add('color-epic')
    }

    // appendo il contenuto della cella alla cella
    cell.appendChild(cellValue) // <div class="day"> <h3>1</h3> </div>

    // trovo un riferimento alla section con id="calendar"
    const calendarSection = document.getElementById('calendar')
    calendarSection.appendChild(cell) // appendo la singola cella alla section calendario
  }

  // finito il for
  // vado a vedere com'è fatto memory
  console.log('MEMORY', memory)
}

// da qui cominciano le INVOCAZIONI delle mie funzioni
showMonthInHeader() // metto il nome del mese nell'h1

// popoliamo il calendario

// 1) capire quante celle bisogna creare
const numberOfDays = daysInThisMonth() // calcolare il numero dei giorni del mese
// numberOfDays è 28!
// 2) per tot volte (28), creo una cella
createCalendarCells(numberOfDays)

// gestiamo la logica del form per SALVARE gli appuntamenti
const meetingForm = document.getElementById('newMeetingForm')
meetingForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log('SALVIAMO APPUNTAMENTO')

  // su quale giorno ho cliccato? lo prendo dallo span in basso a sx
  const spanToReplace = document.getElementById('newMeetingDay') // lo span
  const selectedDay = parseInt(spanToReplace.innerText) // il valore dello span
  // '22' -> 22
  const timeInput = document.getElementById('newMeetingTime') // <input />
  const selectedTime = timeInput.value
  const meetingInput = document.getElementById('newMeetingName')
  const selectedName = meetingInput.value

  const appointment = `${selectedTime} - ${selectedName}` // "18:00 - Dentista"
})
