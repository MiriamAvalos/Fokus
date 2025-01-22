const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonLargo = document.querySelector('.app__card-button--largo');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const botonAccion = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

//escuchar musica por el tiempo que se requiera
musica.loop = true;
let tiempoTranscurridoEnSegundos = 1500;
let idIntervalo = null;
musicaComenzar = new Audio('./sonidos/play.wav');
musicaPausa = new Audio('./sonidos/pause.mp3');
musicaTerminoTiempo = new Audio('./sonidos/beep.mp3');

//musica
inputEnfoqueMusica.addEventListener('change', ()=>{
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnSegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
    })

    function cambiarContexto(contexto){
     mostrarTiempo();
     //for para que detecte segun el contexto que botones limpiar cuando se presiona uno
     botones.forEach(function(contexto){
        contexto.classList.remove('active')
     })


        html.setAttribute('data-contexto', contexto)
        banner.setAttribute('src', `./imagenes/${contexto}.png`)


        switch (contexto){
            case "enfoque":
                titulo.innerHTML = `
                Optimiza tu productividad, <br>
                <strong class="app__title-strong">sumérgete en lo que importa. </strong>
                `
                break;
    
                case "descanso-corto":
                    titulo.innerHTML= `
                    ¿Qué tal tomar un respiro?
                    <strong class="app__title-strong"> ¡Haz una pausa corta! </strong>
    
                    `
                    break;
    
                    case "descanso-largo":
                        titulo.innerHTML = ` Hora de volver a la superficie
                          <strong class="app__title-strong"> Haz una pausa larga. </strong>
                        `
                        break;
                        default:
                            break;
        }
    }

   
    //FUNCION PARA TEMPORIZADOR
    const cuentaRegresiva = () =>{
        if(tiempoTranscurridoEnSegundos <= 0 ){
            musicaTerminoTiempo.play();
            alert("tiempo final");
            reiniciar();
            return
            
        }
        textoIniciarPausar.textContent = 'Pausar';
        botonAccion.src = "./imagenes/pause.png";
        tiempoTranscurridoEnSegundos -= 1;
        mostrarTiempo();
    }

    botonIniciarPausar.addEventListener('click', iniciarPausar)

    function iniciarPausar(){
        
        if(idIntervalo){
            musicaPausa.play();
            reiniciar()
            return;
        }else{
            musicaComenzar.play();
            idIntervalo = setInterval(cuentaRegresiva, 1000)
        }
      
    }

    function reiniciar(){
        clearInterval(idIntervalo);
        idIntervalo = null;
        textoIniciarPausar.textContent = 'Comenzar';
        botonAccion.src = "./imagenes/play_arrow.png";
    }




    function mostrarTiempo() {
        const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
        const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit', second: '2-digit'})
        tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
    }

    mostrarTiempo();