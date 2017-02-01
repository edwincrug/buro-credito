appControllers.controller('contratoDetalleController', function ($scope, $state, Utils,
    $sce, $stateParams, contratoDetalleRepository, notificationFactory, sessionFactory, datosClienteRepository, uiGridGroupingConstants) {
    //Consigue la fecha actual
    $scope.tipodetalle = '';
    var f = new Date();
    $scope.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    $scope.message = 'Buscando...';
    $scope.fInicio = $stateParams.fInicio;
    $scope.fFin = $stateParams.fFin;
    $scope.ocultaCartera = 0;

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

    //    //Genera el pdf 
    //    $scope.generarPdf = function () {
    //        $scope.idcontrato = $stateParams.contratoObj.idContrato;
    //        $scope.idcliente = $stateParams.contratoObj.idCliente;
    //
    //        contratoDetalleRepository.generarPdf($scope.idcliente)
    //            .then(
    //                function succesCallback(response) {
    //                    notificationFactory.success('Success genero el pdf');
    //                    //
    //                    $scope.url = response.config.url;
    //                    window.open($scope.url + '?idCliente=' + $scope.idcliente, "ventana1", "width=700,height=600,scrollbars=NO");
    //                },
    //                function errorCallback(response) {
    //                    //Error
    //                    notificationFactory.error('No se pudo crear el pdf ');
    //                }
    //            );
    //    };

    //    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //    //Genera el pdf 
    //    $scope.generarPdf2 = function () {
    //        notificationFactory.success('Estoy en pdf2');
    //        //$scope.idcliente = $stateParams.contratoObj.idCliente;
    //
    //        contratoDetalleRepository.generarPdfServer()
    //            .then(
    //                function succesCallback(response) {
    //                    notificationFactory.success('Success genero el pdf2');
    //                    $scope.htmlString = $sce.trustAsHtml(response.data);
    //
    //                    setTimeout(function () {
    //                        window.open("http://189.204.141.193/jsreports/reporte.pdf");
    //                    }, 5000);
    //
    //                    //Creo la URL
    //                    //                    var pdf = URL.createObjectURL(Utils.b64toBlob(response.data, "application/pdf"))
    //                    //
    //                    //                    console.log(pdf)
    //                    //                    $("<object  data='" + pdf + "' width='100%' height='500px' >").appendTo('#pdfInvoceContent');
    //
    //                    //$scope.documentoIni = '<div><div class="css-label radGroup2">REPORTE BURO</div><object //id="ifDocument" data="' + pdf + '" type="application/pdf" width="100%"><p>Alternative text - //include a link <a href="' + pdf + '">to the PDF!</a></p></object> </div>';
    //                    //Muestra el documento
    //                    //$("#divDocumento").append($scope.documentoIni);
    //                },
    //                function errorCallback(response) {
    //                    //Error
    //                    notificationFactory.error('No se pudo crear el pdf2 ');
    //                }
    //            );
    //    };
    //    /////////////////////////////////////////////////////////////////////////////////////////////////////////


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

        //        $scope.gridOptions = {
        //            enableFiltering: true,
        //            treeRowHeaderAlwaysVisible: false,
        //            columnDefs: [
        //                {
        //                    name: 'empresa',
        //                    grouping: {
        //                        groupPriority: 0
        //                    }
        //                },
        //                {
        //                    name: 'sucursal',
        //                    grouping: {
        //                        groupPriority: 1
        //                    }
        //                },
        //                {
        //                    name: 'departamento',
        //                    grouping: {
        //                        groupPriority: 1
        //                    }
        //                    // treeAggregationType: uiGridGroupingConstants.aggregation.MAX
        //                },
        //                {
        //                    name: 'tipoDocumento'
        //                },
        //                {
        //                    name: 'idDocumento'
        //                },
        //                {
        //                    name: 'fechaDocumento'
        //                },
        //                {
        //                    name: 'fechaVencimiento'
        //                },
        //                {
        //                    name: 'importe'
        //                },
        //                {
        //                    name: 'saldo'
        //                },
        //                {
        //                    name: 'dias0'
        //                },
        //                {
        //                    name: 'dias30'
        //                },
        //                {
        //                    name: 'dias60'
        //                },
        //                {
        //                    name: 'dias90'
        //                },
        //                {
        //                    name: 'dias120'
        //                },
        //                {
        //                    name: 'diasMas120'
        //                }
        //
        //    ]
        //        };

        $('#loadModal').modal('show');

        //Datos Cliente
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.nombrecliente = $stateParams.contratoObj.nombreCliente;

        //Total Credito
        $scope.totalCredito = 0;

        $scope.totalPagPuntual = 0;
        $scope.totalPagInPuntual = 0;

        //Porcentajes Credito
        $scope.porcCredito = 0;
        $scope.porcNoPagado = 0; /////////// Total Cartera (Vencida y Por Vencer)
        $scope.porcPagPuntual = 0;
        $scope.porcPagInPuntual = 0;

        //Fechas de la busqueda para los detalles del contrato
        $scope.fechaInicio = $stateParams.fechaInicio;
        $scope.fechaFin = $stateParams.fechaFin;
        //Tipo de detalle soliccitado 1.-Detalle Agrupado 2.-Detalle
        $scope.tipodetalle = $stateParams.tipodetalle;

        //////////////////////////////////////////////////////////////////////////////////////////////////////// 
        //                           Oculto cartera si la consulta no es el dia Actual
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        var f = new Date();

        var annioActual = f.getFullYear();
        var mesActual = f.getMonth() + 1;
        var diaActual = f.getDate();

        var annioFin = $stateParams.fechaFin.substring(0, 4);
        var mesFin = $stateParams.fechaFin.substring(4, 6);
        var diaFin = $stateParams.fechaFin.substring(6, 8);
        //alert('Fecha Fin: ' + annioFin + mesFin + diaFin);

        if (annioActual != annioFin || mesActual != mesFin || diaActual != diaFin) {
            $scope.ocultaCartera = 1;
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Si el detalle es agrupado $scope.tipodetalle=1
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        if ($scope.tipodetalle == 1) {
            $scope.promise = contratoDetalleRepository.detallePagoDocumentos($scope.idcliente, $scope.fechaInicio, $scope.fechaFin) //Cambia
                .then(
                    //Succes Pagados
                    function succesCallback(response) {
                        notificationFactory.success('Detalle Documentos Pagados');
                        $scope.listaPagados = response.data;

                        //For Total Porcentajes Variables 
                        for (var i = 0; i < response.data.length; i++) {
                            //if (response.data[i].tipoPagoFecha == 1) {
                            $scope.totalPagPuntual += (response.data[i].cargoTotal);
                            //}
                        }

                        contratoDetalleRepository.detalleNoPagados($scope.idcliente, $scope.fechaInicio, $scope.fechaFin) //Se queda igual
                            .then(
                                //Succes Cartera
                                function succesCallback(response) {
                                    notificationFactory.success('Detalle Documentos No Pagados');

                                    $scope.listaNoPagados = response.data;

                                    //$scope.gridOptions.data = response.data;

                                    $scope.totalNoPagado = 0;
                                    $scope.totalNoPagadoVencido = 0;
                                    $scope.totalNoPagadoNoVencido = 0;
                                    $scope.totalPorVencer = 0;
                                    $scope.totalVencido = 0;

                                    for (var i = 0; i < response.data.length; i++) {
                                        //$scope.totalNoPagado += (response.data[i].importeTotal);
                                        $scope.totalPorVencer += (response.data[i].dias0);
                                        $scope.totalVencido += (response.data[i].saldoVencido);
                                    }

                                    $scope.totalNoPagado = $scope.totalPorVencer + $scope.totalVencido;


                                    contratoDetalleRepository.detallePagoDocumentosExtemporaneo($scope.idcliente, $scope.fechaInicio, $scope.fechaFin) //Cambia
                                        .then(
                                            //Succes Pago No puntual
                                            function succesCallback(response) {
                                                $scope.listaPagadosExtemporaneo = response.data;

                                                for (var i = 0; i < response.data.length; i++) {
                                                    //if (response.data[i].tipoPagoFecha == 2) {
                                                    $scope.totalPagInPuntual += (response.data[i].cargoTotal);
                                                    //}
                                                }

                                                //Total de Credito
                                                $scope.totalCredito = $scope.totalNoPagado + $scope.totalPagPuntual + $scope.totalPagInPuntual;
                                                //Cartera Vencida       
                                                $scope.porcNoPagadoVencido = $scope.totalVencido * 100 / $scope.totalCredito;

                                                //Cartera por Vencer     
                                                $scope.porcNoPagadoNoVencido = $scope.totalPorVencer * 100 / $scope.totalCredito;

                                                //Pagados
                                                $scope.porcPagInPuntual = $scope.totalPagInPuntual * 100 / $scope.totalCredito;
                                                $scope.porcPagPuntual = $scope.totalPagPuntual * 100 / $scope.totalCredito;

                                                //Total
                                                $scope.porcCredito = $scope.porcNoPagado + $scope.porcPagInPuntual + $scope.porcPagPuntual;

                                                setTimeout(function () {
                                                    $('.estiloTabla').DataTable({});
                                                    $("#nopagado_length").removeClass("dataTables_info").addClass("hide-div");
                                                    $("#inpuntual_length").removeClass("dataTables_info").addClass("hide-div");
                                                    $("#puntual_length").removeClass("dataTables_info").addClass("hide-div");

                                                    ///////////////////////////////////////////////////
                                                    ////                   Gráfica
                                                    ///////////////////////////////////////////////////
                                                    if ($("#morris_donut_graph").length) {
                                                        /*Donut Graph*/
                                                        Morris.Donut({
                                                            element: 'morris_donut_graph',
                                                            data: [{
                                                                value: $scope.porcNoPagadoVencido.toFixed(2),
                                                                label: 'Cartera Vencida'
                                                            }, {
                                                                value: $scope.porcNoPagadoNoVencido.toFixed(2),
                                                                label: 'Cartera Por Vencer'
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
                                                            labelColor: '#1D242B',
                                                            colors: [
                                                                //Primera OPC //Cartera No vencida :  '#2EA1D9',
                                                                '#FF5656', '#2EA1D9', '#FFCC00', '#9ACD32',
                                                                '#ffcc00'
                                                            ],
                                                            formatter: function (x) {
                                                                return x + "%"
                                                            }
                                                        });
                                                    }
                                                }, 1000);

                                            },
                                            //Error Pago No Puntual 
                                            function errorCallback(response) {
                                                //Error
                                                notificationFactory.error('No se pudieron obtener datos del Cliente: ' + response.data.message);
                                            }
                                        );
                                },
                                //Error Cartera 
                                function errorCallback(response) {
                                    notificationFactory.error('No se pudo obtener el detalle de los Documentos No Pagados');
                                }
                            );
                        $('#loadModal').modal('hide');
                    },
                    //Error Pagados
                    function errorCallback(response) {
                        notificationFactory.error('No se pudo obtener el detalle de los Documentos Pagados');
                        $('#loadModal').modal('hide');
                    }
                );
        }
        ////////////////////////////////////////////////////////////////////////////////////////////////////////
        //Si el detalle es "detallado" :P  $scope.tipodetalle=2
        ///////////////////////////////////////////////////////////////////////////////////////////////////////
        else if ($scope.tipodetalle == 2) {
            $scope.promise = contratoDetalleRepository.detallePagoDocumentosDet($scope.idcliente, $scope.fechaInicio, $scope.fechaFin) //Cambia
                .then(
                    //Succes Pagados
                    function succesCallback(response) {
                        notificationFactory.success('Detalle Documentos Pagados');
                        $scope.listaPagados = response.data;

                        //For Total Porcentajes Variables 
                        for (var i = 0; i < response.data.length; i++) {
                            //if (response.data[i].tipoPagoFecha == 1) {
                            $scope.totalPagPuntual += (response.data[i].cargoTotal);
                            //}
                        }

                        contratoDetalleRepository.detalleNoPagados($scope.idcliente, $scope.fechaInicio, $scope.fechaFin) //Se queda igual
                            .then(
                                //Succes Cartera
                                function succesCallback(response) {
                                    notificationFactory.success('Detalle Documentos No Pagados');

                                    $scope.listaNoPagados = response.data;

                                    //$scope.gridOptions.data = response.data;

                                    $scope.totalNoPagado = 0;
                                    $scope.totalNoPagadoVencido = 0;
                                    $scope.totalNoPagadoNoVencido = 0;
                                    $scope.totalPorVencer = 0;
                                    $scope.totalVencido = 0;

                                    for (var i = 0; i < response.data.length; i++) {
                                        //$scope.totalNoPagado += (response.data[i].importeTotal);
                                        $scope.totalPorVencer += (response.data[i].dias0);
                                        $scope.totalVencido += (response.data[i].saldoVencido);
                                    }

                                    $scope.totalNoPagado = $scope.totalPorVencer + $scope.totalVencido;


                                    contratoDetalleRepository.detallePagoDocumentosExtemporaneoDet($scope.idcliente, $scope.fechaInicio, $scope.fechaFin) //Cambia
                                        .then(
                                            //Succes Pago No puntual
                                            function succesCallback(response) {
                                                $scope.listaPagadosExtemporaneo = response.data;

                                                for (var i = 0; i < response.data.length; i++) {
                                                    //if (response.data[i].tipoPagoFecha == 2) {
                                                    $scope.totalPagInPuntual += (response.data[i].cargoTotal);
                                                    //}
                                                }

                                                //Total de Credito
                                                $scope.totalCredito = $scope.totalNoPagado + $scope.totalPagPuntual + $scope.totalPagInPuntual;
                                                //Cartera Vencida       
                                                $scope.porcNoPagadoVencido = $scope.totalVencido * 100 / $scope.totalCredito;

                                                //Cartera por Vencer     
                                                $scope.porcNoPagadoNoVencido = $scope.totalPorVencer * 100 / $scope.totalCredito;

                                                //Pagados
                                                $scope.porcPagInPuntual = $scope.totalPagInPuntual * 100 / $scope.totalCredito;
                                                $scope.porcPagPuntual = $scope.totalPagPuntual * 100 / $scope.totalCredito;

                                                //Total
                                                $scope.porcCredito = $scope.porcNoPagado + $scope.porcPagInPuntual + $scope.porcPagPuntual;

                                                setTimeout(function () {
                                                    $('.estiloTabla').DataTable({});
                                                    $("#nopagado_length").removeClass("dataTables_info").addClass("hide-div");
                                                    $("#inpuntual_length").removeClass("dataTables_info").addClass("hide-div");
                                                    $("#puntual_length").removeClass("dataTables_info").addClass("hide-div");

                                                    ///////////////////////////////////////////////////
                                                    ////                   Gráfica
                                                    ///////////////////////////////////////////////////
                                                    if ($("#morris_donut_graph").length) {
                                                        /*Donut Graph*/
                                                        Morris.Donut({
                                                            element: 'morris_donut_graph',
                                                            data: [{
                                                                value: $scope.porcNoPagadoVencido.toFixed(2),
                                                                label: 'Cartera Vencida'
                                                            }, {
                                                                value: $scope.porcNoPagadoNoVencido.toFixed(2),
                                                                label: 'Cartera Por Vencer'
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
                                                            labelColor: '#1D242B',
                                                            colors: [
                                                                //Primera OPC //Cartera No vencida :  '#2EA1D9',
                                                                '#FF5656', '#2EA1D9', '#FFCC00', '#9ACD32',
                                                                '#ffcc00'
                                                            ],
                                                            formatter: function (x) {
                                                                return x + "%"
                                                            }
                                                        });
                                                    }
                                                }, 1000);

                                            },
                                            //Error Pago No Puntual 
                                            function errorCallback(response) {
                                                //Error
                                                notificationFactory.error('No se pudieron obtener datos del Cliente: ' + response.data.message);
                                            }
                                        );
                                },
                                //Error Cartera 
                                function errorCallback(response) {
                                    notificationFactory.error('No se pudo obtener el detalle de los Documentos No Pagados');
                                }
                            );
                        $('#loadModal').modal('hide');
                    },
                    //Error Pagados
                    function errorCallback(response) {
                        notificationFactory.error('No se pudo obtener el detalle de los Documentos Pagados');
                        $('#loadModal').modal('hide');
                    }
                );
        } else {
            notificationFactory.error('Ocurrio un error');
        }
    }; //Fin de Documentos

    //Boton Cancelar
    $scope.Regresar = function () {
        $state.go('home');
    };


    //////////////////////////////////////////////////////////////////////////////////////////////////
    //    Manda a Generar el PDF con Grafica
    //////////////////////////////////////////////////////////////////////////////////////////////////

    $scope.clasificar = function (obj, status) {
        var arr = [];

        for (var i = 0; i < obj.length; i++) {
            if (obj[i].tipoPagoFecha == status) {
                arr.push(obj[i]);
            }
        };

        return arr;
    };

    $scope.sumar = function (obj, fieldName) {
        var total = 0;

        for (var i = 0; i < obj.length; i++) {
            total += obj[i][fieldName];
        }

        return total;
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //    Manda a Generar el PDF con Grafica ultima version (18/nov/2016)
    //////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.generarPdfdata = function () {
        $('#loadModal').modal('show');
        $scope.idcliente = $stateParams.contratoObj.idCliente;

        contratoDetalleRepository.generarPdfdata($scope.idcliente, $scope.fechaInicio, $scope.fechaFin).then(function (result) {

            var lstEmpresa = [];
            var lstGraficas = [];

            for (var i = 0; i < result.data.listaTotales.length; i++) {

                var empresa = {};
                var obj = {};
                var graficaObj = {};

                if (result.data.listaTotales[i][0] == null) {
                    obj = {
                        "showPage": false,
                        "empresa": {
                            tabla: "0",
                            idEmpresa: "0",
                            empresa: "",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            cartera: "0",
                            credito: "0"
                        },
                        "cliente": {},
                        "limites": [{
                            tabla: "0",
                            idEmpresa: "0",
                            empresa: "",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            cartera: "0",
                            credito: "0"
                        }],
                        "cartera": [{
                            idEmpresa: "0",
                            empresa: "",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            conteoTotal: "0",
                            importeTotal: "0",
                            saldoTotal: "0",
                            porVencer: "0",
                            saldo: "0",
                            saldoP: "0",
                            saldoS: "0",
                            saldoT: "0",
                            saldoC: "0"
                        }],
                        "extemporaneo": [{
                            tabla: "0",
                            tipoPagoFecha: "0",
                            idEmpresa: "0",
                            empresa: "0",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            totalDoctos: "0",
                            cargo: "0",
                            saldo: "0",
                            saldoAFavor: "0",
                            saldoTotalTipo: "0",
                            dias: "0" //Agregado para nuevo Requerimiento
                        }], //estatus =2
                        "puntual": [{
                            tabla: "0",
                            tipoPagoFecha: "0",
                            idEmpresa: "0",
                            empresa: "0",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            totalDoctos: "0",
                            cargo: "0",
                            saldo: "0",
                            saldoAFavor: "0",
                            saldoTotalTipo: "0",
                            dias: "0" //Agregado para nuevo Requerimiento
                        }]
                    };

                    graficaObj = {
                        "colorSet": "greenShades",
                        "data": [{
                            "type": "doughnut",
                            "dataPoints": [{
                                    "y": 1,
                                    "indexLabel": "Cartera Vencida"
                                }, {
                                    "y": 1,
                                    "indexLabel": "Cartera No Vencida"
                                }, //saldoP
                                {
                                    "y": 1,
                                    "indexLabel": "Pago No Puntual"
                                }, {
                                    "y": 1,
                                    "indexLabel": "Pago Puntual"
                                }

                            ]
                        }]
                    };

                } else {
                    obj = {
                        "showPage": true,
                        "empresa": result.data.listaTotales[i][0],
                        "cliente": result.data.informacioncliente,
                        "limites": result.data.listaTotales[i],
                        "cartera": result.data.listaDocNoPagados[i],
                        "extemporaneo": $scope.clasificar(result.data.listaDocPagados[i], 2), //estatus =2
                        "puntual": $scope.clasificar(result.data.listaDocPagados[i], 1), //estatus =1
                        ////LMS
                        "totalSaldoVencido": $scope.sumar(result.data.listaDocNoPagados[i], 'saldoVencido'),
                        "totalSaldoPorVencer": $scope.sumar(result.data.listaDocNoPagados[i], 'porVencer')
                    };

                    var creditoFacturado = 0;
                    var carteraVencida = 0;
                    var carteraNoVencida = 0;
                    var pagoPuntual = 0;
                    var pagoNoPuntual = 0;

                    //$scope.totalPagPuntual
                    //$scope.totalPagInPuntual
                    //$scope.totalVencido
                    //$scope.totalPorVencer

                    //                        creditoFacturado = $scope.sumar(result.data.listaTotales[i], 'credito');
                    //                        carteraVencida = $scope.totalVencido;
                    //                        carteraNoVencida = $scope.totalPorVencer;
                    //                        pagoNoPuntual = $scope.totalPagInPuntual;
                    //                        pagoPuntual = $scope.totalPagPuntual;
                    creditoFacturado = $scope.sumar(result.data.listaTotales[i], 'credito');
                    carteraVencida = $scope.sumar(result.data.listaDocNoPagados[i], 'saldoVencido');
                    carteraNoVencida = $scope.sumar(result.data.listaDocNoPagados[i], 'porVencer');
                    pagoNoPuntual = $scope.sumar(obj.extemporaneo, 'cargo');
                    pagoPuntual = $scope.sumar(obj.puntual, 'cargo');

                    //LMS
                    obj.totalExtemporaneo = pagoNoPuntual;
                    obj.totalPuntual = pagoPuntual;

                    graficaObj = {
                        "colorSet": "greenShades",
                        "data": [{
                            "type": "doughnut",
                            "dataPoints": [{
                                    "y": carteraVencida,
                                    "indexLabel": "Cartera Vencida"
                                }, {
                                    "y": carteraNoVencida,
                                    "indexLabel": "Cartera No Vencida"
                                }, //saldoP
                                {
                                    "y": pagoNoPuntual,
                                    "indexLabel": "Pago No Puntual"
                                }, {
                                    "y": pagoPuntual,
                                    "indexLabel": "Pago Puntual"
                                }

                            ]
                        }]
                    };



                }



                lstGraficas.push(graficaObj);
                lstEmpresa.push(obj);
            };


            var rptStructure = {

                "cliente": result.data.informacioncliente,
                "pagina1": lstEmpresa[0],
                "pagina2": lstEmpresa[1],
                "pagina3": lstEmpresa[2],
                "pagina4": lstEmpresa[3],
                "pagina5": lstEmpresa[4],
                "graphic": lstGraficas[0],
                "graphic2": lstGraficas[1],
                "graphic3": lstGraficas[2],
                "graphic4": lstGraficas[3],
                "graphic5": lstGraficas[4]
            }


            var jsonData = {
                "template": {
                    "name": "buroCredito_rpt"
                },
                "data": rptStructure
            }

            /*
            var resdata = JSON.stringify(rptStructure);
            console.log(resdata);
            */

            contratoDetalleRepository.callExternalPdf(jsonData).then(function (fileName) {

                setTimeout(function () {
                    window.open("http://192.168.20.9:5000/api/layout/viewpdf?fileName=" + fileName.data);
                    console.log(fileName.data);
                    $('#loadModal').modal('hide');
                }, 5000);

            });

        });

    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //    Manda a Generar el PDF con Grafica ultima version (31/enero/2017)
    //////////////////////////////////////////////////////////////////////////////////////////////////
    $scope.generarPdfdataDet = function () {
        $('#loadModal').modal('show');
        $scope.idcliente = $stateParams.contratoObj.idCliente;

        contratoDetalleRepository.generarPdfdataDet($scope.idcliente, $scope.fechaInicio, $scope.fechaFin).then(function (result) {

            var lstEmpresa = [];
            var lstGraficas = [];

            for (var i = 0; i < result.data.listaTotales.length; i++) {

                var empresa = {};
                var obj = {};
                var graficaObj = {};

                if (result.data.listaTotales[i][0] == null) {
                    obj = {
                        "showPage": false,
                        "empresa": {
                            tabla: "0",
                            idEmpresa: "0",
                            empresa: "",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            cartera: "0",
                            credito: "0"
                        },
                        "cliente": {},
                        "limites": [{
                            tabla: "0",
                            idEmpresa: "0",
                            empresa: "",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            cartera: "0",
                            credito: "0"
                        }],
                        "cartera": [{
                            idEmpresa: "0",
                            empresa: "",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            conteoTotal: "0",
                            importeTotal: "0",
                            saldoTotal: "0",
                            porVencer: "0",
                            saldo: "0",
                            saldoP: "0",
                            saldoS: "0",
                            saldoT: "0",
                            saldoC: "0"
                        }],
                        "extemporaneo": [{
                            tabla: "0",
                            tipoPagoFecha: "0",
                            idEmpresa: "0",
                            empresa: "0",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            totalDoctos: "0",
                            cargo: "0",
                            saldo: "0",
                            saldoAFavor: "0",
                            saldoTotalTipo: "0",
                            dias: "0" //Agregado para nuevo Requerimiento
                        }], //estatus =2
                        "puntual": [{
                            tabla: "0",
                            tipoPagoFecha: "0",
                            idEmpresa: "0",
                            empresa: "0",
                            idSucursal: "0",
                            sucursal: "0",
                            idDepartamento: "0",
                            departamento: "0",
                            totalDoctos: "0",
                            cargo: "0",
                            saldo: "0",
                            saldoAFavor: "0",
                            saldoTotalTipo: "0",
                            dias: "0" //Agregado para nuevo Requerimiento
                        }]
                    };

                    graficaObj = {
                        "colorSet": "greenShades",
                        "data": [{
                            "type": "doughnut",
                            "dataPoints": [{
                                    "y": 1,
                                    "indexLabel": "Cartera Vencida"
                                }, {
                                    "y": 1,
                                    "indexLabel": "Cartera No Vencida"
                                }, //saldoP
                                {
                                    "y": 1,
                                    "indexLabel": "Pago No Puntual"
                                }, {
                                    "y": 1,
                                    "indexLabel": "Pago Puntual"
                                }

                            ]
                        }]
                    };

                } else {
                    obj = {
                        "showPage": true,
                        "empresa": result.data.listaTotales[i][0],
                        "cliente": result.data.informacioncliente,
                        "limites": result.data.listaTotales[i],
                        "cartera": result.data.listaDocNoPagados[i],
                        "extemporaneo": $scope.clasificar(result.data.listaDocPagados[i], 2), //estatus =2
                        "puntual": $scope.clasificar(result.data.listaDocPagados[i], 1), //estatus =1
                        ////LMS
                        "totalSaldoVencido": $scope.sumar(result.data.listaDocNoPagados[i], 'saldoVencido'),
                        "totalSaldoPorVencer": $scope.sumar(result.data.listaDocNoPagados[i], 'porVencer')
                    };

                    var creditoFacturado = 0;
                    var carteraVencida = 0;
                    var carteraNoVencida = 0;
                    var pagoPuntual = 0;
                    var pagoNoPuntual = 0;

                    //$scope.totalPagPuntual
                    //$scope.totalPagInPuntual
                    //$scope.totalVencido
                    //$scope.totalPorVencer

                    //                        creditoFacturado = $scope.sumar(result.data.listaTotales[i], 'credito');
                    //                        carteraVencida = $scope.totalVencido;
                    //                        carteraNoVencida = $scope.totalPorVencer;
                    //                        pagoNoPuntual = $scope.totalPagInPuntual;
                    //                        pagoPuntual = $scope.totalPagPuntual;
                    creditoFacturado = $scope.sumar(result.data.listaTotales[i], 'credito');
                    carteraVencida = $scope.sumar(result.data.listaDocNoPagados[i], 'saldoVencido');
                    carteraNoVencida = $scope.sumar(result.data.listaDocNoPagados[i], 'porVencer');
                    pagoNoPuntual = $scope.sumar(obj.extemporaneo, 'cargo');
                    pagoPuntual = $scope.sumar(obj.puntual, 'cargo');

                    //LMS
                    obj.totalExtemporaneo = pagoNoPuntual;
                    obj.totalPuntual = pagoPuntual;

                    graficaObj = {
                        "colorSet": "greenShades",
                        "data": [{
                            "type": "doughnut",
                            "dataPoints": [{
                                    "y": carteraVencida,
                                    "indexLabel": "Cartera Vencida"
                                }, {
                                    "y": carteraNoVencida,
                                    "indexLabel": "Cartera No Vencida"
                                }, //saldoP
                                {
                                    "y": pagoNoPuntual,
                                    "indexLabel": "Pago No Puntual"
                                }, {
                                    "y": pagoPuntual,
                                    "indexLabel": "Pago Puntual"
                                }

                            ]
                        }]
                    };



                }



                lstGraficas.push(graficaObj);
                lstEmpresa.push(obj);
            };


            var rptStructure = {

                "cliente": result.data.informacioncliente,
                "pagina1": lstEmpresa[0],
                "pagina2": lstEmpresa[1],
                "pagina3": lstEmpresa[2],
                "pagina4": lstEmpresa[3],
                "pagina5": lstEmpresa[4],
                "graphic": lstGraficas[0],
                "graphic2": lstGraficas[1],
                "graphic3": lstGraficas[2],
                "graphic4": lstGraficas[3],
                "graphic5": lstGraficas[4]
            }


            var jsonData = {
                "template": {
                    "name": "buroCredito_rpt"
                },
                "data": rptStructure
            }

            /*
            var resdata = JSON.stringify(rptStructure);
            console.log(resdata);
            */

            contratoDetalleRepository.callExternalPdf(jsonData).then(function (fileName) {

                setTimeout(function () {
                    window.open("http://192.168.20.9:5000/api/layout/viewpdf?fileName=" + fileName.data);
                    console.log(fileName.data);
                    $('#loadModal').modal('hide');
                }, 5000);

            });

        });

    }


}); //FIN de appControllers
