"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Escrito por : Yerlinson Maturana (Matu Creativo).
  Email: yerlinmatu@gmail.com
  Github: https://github.com/YerlinMatu
  Twitter: @yerlinmatu 
*/

// USUARIO
var Aportante = [];
var TotalGanancia = 0;

var Usuario = function Usuario(nombre, apellidos, mes, kws) {
  _classCallCheck(this, Usuario);

  this.nombre = nombre.length != 0 ? nombre.Capitalize() : "Anonimo ".concat(cont++);
  this.apellidos = apellidos.trim().Capitalize() || "Sin apellidos";
  this.mes = +Math.abs(mes);
  this.kws = Math.abs(kws) || 0;
  this.deuda = this.kws * 450;
  TotalGanancia += this.deuda;
};

// Capitalizado :

String.prototype.Capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//  cont++
var cont = 1;

function SendData() {
  var n = $("#nombre").val(),
      a = $("#apellidos").val(),
      m = $("#mes").val(),
      kw = $("#kws").val();

  if (n !== '' && a !== '' && m !== '' && kw !== '') {
    var person = new Usuario(n, a, m, kw);
    var nameTemp = person.nombre;
    Aportante.push(person);
    console.log(Aportante);
    $Dom('formID').reset(); // Reseting.
    SucessMsg("Se registró " + nameTemp + " correctamente", 'Ya se ingreso a la base de datos.', 2500);
  } else {
    SucessMsg('Por favor ingrese los datos solicitados :(', 'Los campos están vacios', 2500);
  }
} // Client send.

function $Dom($id) {
  return document.getElementById($id);
}
var question = ["Nombre completo", "Apellidos", "Mes facturado", "Cantidad de kw consumidos", "Valor a aportar"];

var DeleteAportante = function DeleteAportante() {
  if (Aportante.length > 0) {
    var user_despachado = Aportante.shift();
    user_despachado = user_despachado.nombre;
    ViewTabla();
    SucessMsg("El cliente " + user_despachado + " saldó la deuda exitosamente", 'Puede seguir registrando');
  } else {
    SucessMsg("No hay aportantes registrados", 'Puede seguir registrando');
  }
};
// Busqueda.
var SearchAportante = function SearchAportante() {

  var user_req = $('#searching').val().trim().Capitalize();
  Aportante.map(function (user) {
    if (user.nombre === user_req || user.apellidos === user_req || user.mes === user_req) {
      return SucessMsg("\n              Nombre: " + user.nombre + "\n              Apellidos: " + user.apellidos + "\n\n              Mes: " + user.mes + "\n\n              Kw: " + user.kws + "\n\n                ", "Deuda " + user.deuda, 5000);
    } else {
      return swal({
        title: "No existe " + user_req + " aportante",
        text: user_req + " no sé registró",
        type: "error",
        confirmButtonText: "Cerrar",
        confirmButtonColor: '#490a3d'
      });
    }
  });
};

// FORMULARIO.
var FormRegistro = React.createClass({
  displayName: "FormRegistro",

  render: function render() {
    return React.createElement(
      "div",
      { className: "Formulario" },
      React.createElement(
        "h2",
        null,
        React.createElement("i", { className: "fa fa-universal-access", "aria-hidden": "true" }),
        " Inventario"
      ),
      React.createElement(
        "form",
        { id: "formID" },
        React.createElement(
          "label",
          { "for": "nombre" },
          "Nombre"
        ),
        React.createElement("input", { type: "text", placeholder: question[0], id: "nombre", required: true }),
        React.createElement(
          "label",
          { "for": "apellidos" },
          "Apellidos"
        ),
        React.createElement("input", { type: "text", placeholder: question[1], id: "apellidos", required: true }),
        React.createElement(
          "label",
          { "for": "mes" },
          "Mes facturado"
        ),
        React.createElement("input", { type: "number", placeholder: question[2], id: "mes", min: "1", max: "12", required: true }),
        React.createElement(
          "label",
          { "for": "kws" },
          "Kw consumidos"
        ),
        React.createElement("input", { type: "number", min: "1", max: "10", placeholder: question[3], id: "kws", readonly: "readonly", required: "required" }),
        React.createElement(
          "button",
          { className: "btn", type: "button", onClick: SendData },
          React.createElement("i", { className: "fa fa fa-plus", "aria-hidden": "true" }),
          " Registrar"
        ),
        React.createElement(
          "button",
          { className: "btn", type: "button", onClick: ViewTabla },
          React.createElement("i", { className: "fa fa fa fa-table", "aria-hidden": "true" }),
          " Ver registrados"
        )
      )
    );
  }
});

//  DATAGRIV:
var DataGriv = function (_React$Component) {
  _inherits(DataGriv, _React$Component);

  function DataGriv(props) {
    _classCallCheck(this, DataGriv);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      User: Aportante
    };
    return _this;
  }

  DataGriv.prototype.render = function render() {
    var data = this.state.User.map(function (Aportante, i) {
      return React.createElement(
        "tr",
        { key: i },
        React.createElement(
          "th",
          null,
          Aportante.nombre
        ),
        React.createElement(
          "th",
          null,
          Aportante.apellidos
        ),
        React.createElement(
          "th",
          null,
          Aportante.mes
        ),
        React.createElement(
          "th",
          null,
          Aportante.kws
        ),
        React.createElement(
          "th",
          null,
          Aportante.deuda,
          "$"
        )
      );
    });
    return React.createElement(
      "div",
      { className: "Formulario Griv" },
      React.createElement(
        "h2",
        null,
        React.createElement("i", { className: "fa fa-cubes", "aria-hidden": "true" }),
        " COLA EPSA "
      ),
      React.createElement(
        "label",
        { "for": "search" },
        React.createElement("i", { className: "fa fa-search", "aria-hidden": "true" }),
        " Buscador"
      ),
      React.createElement("input", { id: "searching", type: "search", placeholder: "Buscar por nombre..." }),
      React.createElement(
        "div",
        { "class": "container" },
        React.createElement(
          "strong",
          { className: "cont" },
          React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
          " Clientes :  ",
          data.length
        ),
        React.createElement(
          "strong",
          { className: "cont2" },
          React.createElement("i", { className: "fa fa-money", "aria-hidden": "true" }),
          "   Dinero : $",
          TotalGanancia
        ),
        React.createElement(
          "table",
          { id: "table" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement(
                    "i",
                    { className: "fa fa-user", "aria-hidden": "true" },
                    " "
                  ),
                  "Nombre"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement(
                    "i",
                    { className: "fa fa-users", "aria-hidden": "true" },
                    " "
                  ),
                  "Apellidos"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement("i", { className: "fa fa-calendar", "aria-hidden": "true" }),
                  "Mes"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement("i", { className: "fa fa-flash", "aria-hidden": "true" }),
                  "Kw"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement("i", { className: "fa fa-money", "aria-hidden": "true" }),
                  "Valor a pagar"
                )
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            data
          )
        )
      ),
      React.createElement(PadButton, null)
    ); // end render.
  };

  return DataGriv;
}(React.Component);

;

var PadButton = React.createClass({
  displayName: "PadButton",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "colum" },
          React.createElement(
            "button",
            { className: "btn", onClick: SearchAportante },
            React.createElement("i", { className: "fa fa fa fa-search", "aria-hidden": "true" }),
            " Buscar"
          ),
          React.createElement(
            "button",
            { className: "btn", onClick: ViewRegistro },
            React.createElement("i", { className: "fa fa fa fa-plus", "aria-hidden": "true" }),
            " Registrar"
          ),
          React.createElement(
            "button",
            { className: "btn", onClick: DeleteAportante },
            React.createElement("i", { className: "fa fa fa fa-trash", "aria-hidden": "true" }),
            " Eliminar en cola"
          )
        )
      )
    );
  }
});
/* RENDERS URLS */
GlobalRenderID(React.createElement(FormRegistro, null), 'app');

function ViewTabla() {
  return GlobalRenderID(React.createElement(DataGriv, null), 'app');
}

function ViewRegistro() {
  return GlobalRenderID(React.createElement(FormRegistro, null), 'app');
}
// Renderizador Global.
function GlobalRenderID($ComponentTag, $element) {
  return ReactDOM.render($ComponentTag, document.getElementById($element));
}

function SucessMsg(title, msg, time, btnBool) {
  swal({
    title: title,
    text: msg,
    timer: time || 1600,
    showConfirmButton: btnBool || false
  });
}