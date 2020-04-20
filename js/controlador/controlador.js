/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
  },

  borrarPregunta: function(id) {
    var id = parseInt($('.list-group-item.active').attr('id'));
    if (id != -0)
      this.modelo.borrarPregunta(id);
    },

    borrarTodo: function() {
      this.modelo.borrarTodo();
    },

    editarPregunta: function() {
      var id = parseInt($('.list-group-item.active').attr('id'));
      if(id != 0)
      var edit = window.prompt('Editar pregunta:', '');
      if (edit !== null)
        //console.log(edit)
          this.modelo.editarPregunta(id, edit);
    },

    agregarVoto: function(pregunta,respuestaSeleccionada) {
      this.modelo.agregarVoto(pregunta,respuestaSeleccionada);
    },
};
