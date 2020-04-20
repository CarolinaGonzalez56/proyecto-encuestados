/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasBorradas = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.preguntasGuardadas = new Evento(this);
  this.verificarLocalStorage();
  this.preguntaVotada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    //var ultimoId = 0;
    for(var i = 0; i < this.preguntas.length; i++){
      var listId = [this.preguntas[i].id]
      if(listId > this.ultimoId)
        this.ultimoId = listId;
    }
        return this.ultimoId
},

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  borrarPregunta: function(id) {
    this.preguntas = this.preguntas.filter(function(pregunta) { return pregunta.id != id; });
    this.guardar();
    this.preguntaEliminada.notificar();
  },

  //se guardan las preguntas
  verificarLocalStorage: function(){
    if (localStorage.getItem('preguntas') !== null) {
      this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
    }
  },
  
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },

  borrarTodo: function(){
    this.preguntas = [];
    this.guardar();
    this.preguntasBorradas.notificar()
  },

  editarPregunta: function(id, texto) {
  for(var i = 0; i < this.preguntas.length; i++){
    if(this.preguntas[i].id === id){
      this.preguntas[i].textoPregunta = texto
      //console.log(texto)
      }
      this.guardar();
      this.preguntaEditada.notificar();
    } 
  },
  
  agregarVoto: function(pregunta, respuestas) {
      //Refactorizado
   this.preguntas.forEach( el => {
     if(el.textoPregunta === pregunta){
       el.cantidadPorRespuesta.forEach( res => {
         if(res.textoRespuesta === respuestas){
           res.cantidad++
         }
       })
     }
   })
   this.guardar();
   this.preguntaVotada.notificar();
  }
};
//Primer codigo
   /* for(var i = 0; i < this.preguntas.length ; i++){
      if(this.preguntas[i].textoPregunta === pregunta) {
        for(var j = 0; j < this.preguntas[i].cantidadPorRespuesta.length; j++){
          if(this.preguntas[i].cantidadPorRespuesta[j].textoRespuesta === respuestas){
            this.preguntas[i].cantidadPorRespuesta[j].cantidad ++;
          }
      }
      }
      this.guardar();
      this.preguntaVotada.notificar();
    }*/
  