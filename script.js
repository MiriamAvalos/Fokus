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
//escuchar musica por el tiempo que se requiera
musica.loop = true;
let tiempoTranscurridoEnSegundos = 5;
let idIntervado = null;

//musica
inputEnfoqueMusica.addEventListener('change', ()=>{
    if (musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

botonCorto.addEventListener('click', () => {
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')
})

botonEnfoque.addEventListener('click', () => {
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

botonLargo.addEventListener('click', () => {
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
    })

    function cambiarContexto(contexto){

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
        iniciarPausar()
        tiempoTranscurridoEnSegundos -= 1
        console.log("temporizador", tiempoTranscurridoEnSegundos);
    }

    botonIniciarPausar.addEventListener('click', cuentaRegresiva)

    function iniciarPausar(){
        idIntervado = setInterval(cuentaRegresiva, 1000)
    }