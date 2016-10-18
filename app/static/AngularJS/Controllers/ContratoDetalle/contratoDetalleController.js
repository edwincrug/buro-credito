appControllers.controller('contratoDetalleController', function ($scope, $state, Utils,
    $sce, $stateParams, contratoDetalleRepository, notificationFactory, sessionFactory, datosClienteRepository) {

    $scope.message = 'Buscando...';

    //Metodo de incio 
    $scope.init = function () {
        $scope.detalle = sessionFactory.detalle;

        cargaDocumentos();
    };

    //Obtiene los datos del cliente
    var cargaInfoCliente = function (idcliente) {

        datosClienteRepository.cargaInfoCliente(idcliente)
            .then(
                function succesCallback(response) {
                    //Success
                    //notificationFactory.success('Cotrato obtenidos correctamente');
                    $scope.datosCliente = response.data;
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener los Contratos: ' + response.data.message);
                }
            );

    };

    //Genera el pdf 
    $scope.generarPdf = function () {
        $scope.idcontrato = $stateParams.contratoObj.idContrato;
        $scope.idcliente = $stateParams.contratoObj.idCliente;

        contratoDetalleRepository.generarPdf($scope.idcliente)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Success genero el pdf');
                    //
                    $scope.url = response.config.url;
                    window.open($scope.url + '?idCliente=' + $scope.idcliente, "ventana1", "width=700,height=600,scrollbars=NO");
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudo crear el pdf ');
                }
            );
    };

    /////////
    //Genera el pdf 
    $scope.generarPdf2 = function () {
        //$scope.idcliente = $stateParams.contratoObj.idCliente;

        contratoDetalleRepository.generarPdfServer()
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Success genero el pdf2');
                    $scope.htmlString = $sce.trustAsHtml(response.data);

                    setTimeout(function () {
                        window.open("http://189.204.141.193/jsreports/reporte.pdf");
                    }, 5000);

                    //Creo la URL
                    //                    var pdf = URL.createObjectURL(Utils.b64toBlob(response.data, "application/pdf"))
                    //
                    //                    console.log(pdf)
                    //                    $("<object  data='" + pdf + "' width='100%' height='500px' >").appendTo('#pdfInvoceContent');

                    //$scope.documentoIni = '<div><div class="css-label radGroup2">REPORTE BURO</div><object //id="ifDocument" data="' + pdf + '" type="application/pdf" width="100%"><p>Alternative text - //include a link <a href="' + pdf + '">to the PDF!</a></p></object> </div>';
                    //Muestra el documento
                    //$("#divDocumento").append($scope.documentoIni);
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudo crear el pdf2 ');
                }
            );
    };
    /////////

    $scope.verDetalleCliente = function (idcliente) {
        contratoDetalleRepository.obtieneDetalleCliente(idcliente)
            .then(
                function succesCallback(response) {
                    //alert('Success detalle Cliente Pagos');
                    //Success
                    //notificationFactory.success('Cotrato obtenidos correctamente');
                    sessionFactory.detalleCliente = response.data;
                    //location.href = '/detallecontrato';
                    //$state.go('detallecontrato');
                },
                function errorCallback(response) {
                    //Error
                    notificationFactory.error('No se pudieron obtener datos del Cliente: ' + response.data.message);
                }
            );
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    //  Documentos 
    //////////////////////////////////////////////////////////////////////////////////////////////////////////
    var cargaDocumentos = function () {
        //Datos Cliente
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.nombrecliente = $stateParams.contratoObj.nombreCliente;
        //Total Credito
        $scope.totalCredito = 0;
        $scope.totalNoPagado = 0;
        $scope.totalPagPuntual = 0;
        $scope.totalPagInPuntual = 0;
        //Porcentajes Credito
        $scope.porcCredito = 0;
        $scope.porcNoPagado = 0;
        $scope.porcPagPuntual = 0;
        $scope.porcPagInPuntual = 0;

        //alert('Estoy en ver detalle Empresa: ' + $scope.nombreCliente);
        $('#loadModal').modal('show');
        $scope.promise = contratoDetalleRepository.detallePagoDocumentos($scope.idcliente)
            .then(
                function succesCallback(response) {
                    notificationFactory.success('Detalle Documentos Pagados');
                    $scope.listaPagados = response.data;

                    for (var i = 0; i < response.data.length; i++) {
                        if (response.data[i].tipoPagoFecha == 1) {
                            $scope.totalPagPuntual += (response.data[i].cargo);
                        } else if (response.data[i].tipoPagoFecha == 2) {
                            $scope.totalPagInPuntual += (response.data[i].cargo);
                        }
                    }

                    contratoDetalleRepository.detalleNoPagados($scope.idcliente)
                        .then(
                            function succesCallback(response) {
                                notificationFactory.success('Detalle Documentos No Pagados');
                                $scope.listaNoPagados = response.data;

                                for (var i = 0; i < response.data.length; i++) {
                                    $scope.totalNoPagado += (response.data[i].saldo);
                                }

                                //Total de Credito
                                $scope.totalCredito = $scope.totalNoPagado + $scope.totalPagPuntual + $scope.totalPagInPuntual;
                                //Porcentajes
                                $scope.porcNoPagado = $scope.totalNoPagado * 100 / $scope.totalCredito;
                                $scope.porcPagInPuntual = $scope.totalPagInPuntual * 100 / $scope.totalCredito;
                                $scope.porcPagPuntual = $scope.totalPagPuntual * 100 / $scope.totalCredito;
                                $scope.porcCredito = $scope.porcNoPagado + $scope.porcPagInPuntual + $scope.porcPagPuntual;

                                setTimeout(function () {
                                    $('.estiloTabla').DataTable({});
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    //                   Gráfica
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                    if ($("#morris_donut_graph").length) {
                                        /*Donut Graph*/
                                        Morris.Donut({
                                            element: 'morris_donut_graph',
                                            data: [{
                                                value: $scope.porcNoPagado.toFixed(2),
                                                label: 'No Pagado'
                                                }, {
                                                value: $scope.porcPagInPuntual.toFixed(2),
                                                label: 'Pago Extemporáneo'
                                                }, {
                                                value: $scope.porcPagPuntual.toFixed(2),
                                                label: 'Pago Puntual'

                                                }],
                                            resize: true,
                                            redraw: true,
                                            backgroundColor: '#ffffff',
                                            labelColor: '#1D242B', //#999999',
                                            colors: [
//                                                        '#FF5656','#FFCC00','#B3E55E',
                                                       //Primera OPC
                                                      '#FF5656', '#FFCC00', '#9ACD32',
                                                      //Otros  Mate
                                                      //'#ed7e29', '#f0e428', '#8fbc21',
                                                      //OBSCUROS
                                                      //'#ce6800', '#ffd000', '#b2b206',
                                                        '#ffcc00'
                                                    ],
                                            formatter: function (x) {
                                                return x + "%"
                                            }
                                        });
                                    }
                                    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                }, 100);
                            },
                            function errorCallback(response) {
                                notificationFactory.error('No se pudo obtener el detalle de los Documentos No Pagados');
                            }
                        );
                    $('#loadModal').modal('hide');
                },
                function errorCallback(response) {
                    notificationFactory.error('No se pudo obtener el detalle de los Documentos Pagados');
                    $('#loadModal').modal('hide');
                }
            );
    }; //Fin de Documentos

    //Boton Cancelar
    $scope.Regresar = function () {
        $state.go('home');
    };



}); //FIN de appControllers
