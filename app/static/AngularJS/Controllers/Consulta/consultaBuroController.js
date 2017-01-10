appControllers.controller('consultaBuroController', function($scope, $state, notificationFactory, sessionFactory, contratoRepository, contratoDetalleRepository) {

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //     Fechas de Inicio para la Consulta de los Documentos
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var f = new Date();
    var dia = f.getDate();
    var mes = f.getMonth() + 1;

    if (dia < 10) {
        dia = "0" + dia;
    }

    if (mes < 10) {
        mes = "0" + mes;
    }

    //Consigue la fecha actual
    $scope.fechaTermino = dia + "/" + mes + "/" + f.getFullYear();
    //Consigue 1 año antes de la fecha actual
    $scope.fechaInicio = dia + "/" + mes + "/" + (f.getFullYear() - 1);

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //Metodo de incio 
    $scope.init = function() {
        $('.datepicker').datepicker({});
    };

    //Limpiar variables de busqueda de Cliente
    $scope.clearControls = function() {
        $scope.txtBusqueda = undefined;
        $scope.idBusqueda = undefined;
    }

    //Buscar Cliente por Texto 
    $scope.BuscaCliente = function(idBusqueda, txtBusqueda) {
        if (idBusqueda != '' && idBusqueda != null) {
            $scope.BuscarClienteId(idBusqueda);
            $scope.clearControls();
        } else {
            if (txtBusqueda != '' && txtBusqueda != null) {
                $scope.BuscarCliente(txtBusqueda);
                $scope.clearControls();
            }
        }
    };

    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarCliente = function(txtBusqueda) {
        contratoRepository.obtieneDatosCliente($scope.txtBusqueda)
            .then(
                function succesCallback(response) {
                    $scope.listaClientes = response.data;
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                }
            );
        $scope.clearControls();
    };

    //Obtiene todos los clientes coincidentes con la busqueda
    $scope.BuscarClienteId = function(idBusqueda) {
        contratoRepository.obtieneCliente($scope.idBusqueda)
            .then(
                function succesCallback(response) {
                    $scope.listaClientes = response.data;
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudieron obtener los datos ' + response.data.message);
                }
            );
        $scope.clearControls();
    };

    $scope.verDetalleReporte = function(cliente, fechaInicio, fechaTermino, tipodetalle) {
        //////Begin Modificar fecha a año, mes, dia//////////
        var modifechaInic = fechaInicio.split('/');
        var newDateIni = modifechaInic[2] + modifechaInic[1] + modifechaInic[0];
        var modifechaTerm = fechaTermino.split('/');
        var newDateterm = modifechaTerm[2] + modifechaTerm[1] + modifechaTerm[0];
        $scope.fechaCreacion = newDateIni;
        $scope.fechaFin = newDateterm;
        //////End Modificar fecha a año, mes, dia///////////

        $scope.idcliente = cliente.idCliente;
        $scope.nombrecliente = cliente.nombre;

        //alert('Estoy en ver detalle Contrato : ' + $scope.idcliente + ' Nombre: ' + $scope.nombrecliente);
        $state.go('detallecontrato', {
            contratoObj: cliente,
            fechaInicio: $scope.fechaCreacion,
            fechaFin: $scope.fechaFin,
            fInicio: fechaInicio,
            fFin: fechaTermino,
            tipodetalle: tipodetalle
        }, {
            reload: true
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////BEGIN Valida fechas ////////////////////////////////////////////////////////////////////////
    $scope.validarFechar = function(fechaInicio, fechaFin) {
            $scope.ocultarBtnBuscar = 1;
            if (fechaFin != undefined) {
                valorInicio = fechaInicio.split("/");
                valorFin = fechaFin.split("/");
                var fInicio = new Date(valorInicio[2] + '-' + valorInicio[1] + '-' + valorInicio[0]);
                var fFin = new Date(valorFin[2] + '-' + valorFin[1] + '-' + valorFin[0]);
                if (fInicio < fFin) {
                    //console.log('entro a fecha Inicio si es menor fecha fin ')
                    $scope.ocultarBtnBuscar = 0;
                    //notificationFactory.success('La fecha es valida')

                } else {
                    //console.log('fecha inicio es mayor a fecha fin ')
                    notificationFactory.warning('La fecha de inicio es mayor o igual a la fecha de término')
                }
            }

        }
        //////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////END Valida fechas ////////////////////////////////////////////////////////////////////////


});
