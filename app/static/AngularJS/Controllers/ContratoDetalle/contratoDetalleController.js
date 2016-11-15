appControllers.controller('contratoDetalleController', function ($scope, $state, Utils,
    $sce, $stateParams, contratoDetalleRepository, notificationFactory, sessionFactory, datosClienteRepository, uiGridGroupingConstants) {
    //Consigue la fecha actual
    var f = new Date();
    $scope.fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
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

    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    //Genera el pdf 
    $scope.generarPdf2 = function () {
        notificationFactory.success('Estoy en pdf2');
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
    /////////////////////////////////////////////////////////////////////////////////////////////////////////


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

        $scope.gridOptions = {
            enableFiltering: true,
            treeRowHeaderAlwaysVisible: false,
            columnDefs: [
                {
                    name: 'empresa',
                    grouping: {
                        groupPriority: 0
                    }
                },
                {
                    name: 'sucursal',
                    grouping: {
                        groupPriority: 1
                    }
                },
                {
                    name: 'departamento',
                    grouping: {
                        groupPriority: 1
                    }
                    // treeAggregationType: uiGridGroupingConstants.aggregation.MAX
                },
                {
                    name: 'tipoDocumento'
                },
                {
                    name: 'idDocumento'
                },
                {
                    name: 'fechaDocumento'
                },
                {
                    name: 'fechaVencimiento'
                },
                {
                    name: 'importe'
                },
                {
                    name: 'saldo'
                },
                {
                    name: 'dias0'
                },
                {
                    name: 'dias30'
                },
                {
                    name: 'dias60'
                },
                {
                    name: 'dias90'
                },
                {
                    name: 'dias120'
                },
                {
                    name: 'diasMas120'
                }

    ]
        };

        $('#loadModal').modal('show');

        //Datos Cliente
        $scope.idcliente = $stateParams.contratoObj.idCliente;
        $scope.nombrecliente = $stateParams.contratoObj.nombreCliente;
        //Total Credito
        $scope.totalCredito = 0;

        $scope.totalPagPuntual = 0;
        $scope.totalPagInPuntual = 0;
        //Porcentajes Credito
        $scope.porcCredito = 0; ///////////??
        $scope.porcNoPagado = 0; /////////// Total Cartera (Vencida y Por Vencer)
        $scope.porcPagPuntual = 0;
        $scope.porcPagInPuntual = 0;

        //Fechas de la busqueda para los detalles del contrato
        $scope.fechaInicio = $stateParams.fechaInicio;
        $scope.fechaFin = $stateParams.fechaFin;

        //alert('Estoy en ver detalle Empresa: ' + $scope.nombreCliente);

        $scope.promise = contratoDetalleRepository.detallePagoDocumentos($scope.idcliente, $scope.fechaInicio, $scope.fechaFin)
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

                    contratoDetalleRepository.detalleNoPagados($scope.idcliente, $scope.fechaInicio, $scope.fechaFin)
                        .then(
                            //Succes Cartera
                            function succesCallback(response) {
                                notificationFactory.success('Detalle Documentos No Pagados');

                                $scope.listaNoPagados = response.data;
                                $scope.gridOptions.data = response.data;

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

                                //Vencido= Total - PorVencer
                                //$scope.totalVencido = $scope.totalNoPagado - $scope.totalPorVencer;

                                //////////////////////////
                                contratoDetalleRepository.detallePagoDocumentosExtemporaneo($scope.idcliente, $scope.fechaInicio, $scope.fechaFin)
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
                                            //Cartera Vencida        //$scope.totalVencido
                                            $scope.porcNoPagadoVencido = $scope.totalVencido * 100 / $scope.totalCredito;
                                            //$scope.porcNoPagadoVencido = $scope.totalVencido * (-1);
                                            //$scope.porcNoPagadoVencido = $scope.totalNoPagadoVencido * 100 / $scope.totalCredito;
                                            //$scope.porcNoPagadoVencido = $scope.porcNoPagadoVencido * (-1);

                                            //Cartera por Vencer     //$scope.totalPorVencer
                                            $scope.porcNoPagadoNoVencido = $scope.totalPorVencer * 100 / $scope.totalCredito;
                                            //$scope.porcNoPagadoNoVencido = $scope.totalPorVencer * (-1);
                                            //$scope.porcNoPagadoNoVencido = $scope.totalNoPagadoNoVencido * 100 / $scope.totalCredito;
                                            //$scope.porcNoPagadoNoVencido = $scope.porcNoPagadoNoVencido * (-1);

                                            //Pagados
                                            $scope.porcPagInPuntual = $scope.totalPagInPuntual * 100 / $scope.totalCredito;
                                            $scope.porcPagPuntual = $scope.totalPagPuntual * 100 / $scope.totalCredito;

                                            //Total
                                            $scope.porcCredito = $scope.porcNoPagado + $scope.porcPagInPuntual + $scope.porcPagPuntual;

                                            setTimeout(function () {
                                                $('.estiloTabla').DataTable({});
                                                $("#nopagado_length").removeClass("dataTables_info").addClass("hide-div");
                                                $("#inpuntual_length").removeClass("dataTables_info").addClass("hide-div");
                                                $("#puntual_length").removeClass("dataTables_info").addClass("hide-div"); //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                //                   Gráfica
                                                //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                                                        /*//#999999',*/
                                                        colors: [
//                                                        '#FF5656','#FFCC00','#B3E55E',
                                                       //Primera OPC //Cartera No vencida :  '#2EA1D9',
                                                      '#FF5656', '#2EA1D9', '#FFCC00', '#9ACD32',
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


    $scope.generarPdfdata = function () {

            $scope.idcliente = $stateParams.contratoObj.idCliente;

            contratoDetalleRepository.generarPdfdata($scope.idcliente).then(function (result) {

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
                                saldoTotalTipo: "0"
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
                                saldoTotalTipo: "0"
                            }]
                        };

                        graficaObj = {
                            "colorSet": "greenShades",
                            "data": [{
                                "type": "doughnut",
                                "dataPoints": [
                                    {
                                        "y": 1,
                                        "indexLabel": "Cartera Vencida"
                                    },
                                    {
                                        "y": 1,
                                        "indexLabel": "Cartera No Vencida"
                                    }, //saldoP
                                    {
                                        "y": 1,
                                        "indexLabel": "Pago No Puntual"
                                    },
                                    {
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
                                "dataPoints": [
                                    {
                                        "y": carteraVencida,
                                        "indexLabel": "Cartera Vencida"
                                    },
                                    {
                                        "y": carteraNoVencida,
                                        "indexLabel": "Cartera No Vencida"
                                    }, //saldoP
                                    {
                                        "y": pagoNoPuntual,
                                        "indexLabel": "Pago No Puntual"
                                    },
                                    {
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


                contratoDetalleRepository.callExternalPdf(jsonData).then(function (fileName) {

                    setTimeout(function () {
                        window.open("http://192.168.20.9:5000/api/layout/viewpdf?fileName=" + fileName.data);
                        console.log(fileName.data);
                    }, 5000);

                });

            });


        }
        //////////////////////////////////////////////////////////////////////////////////////////////////

    //    $scope.verPagosExtemporaneos = function (idcliente) {
    //        contratoDetalleRepository.detallePagoDocumentosExtemporaneo(idcliente)
    //            .then(
    //                function succesCallback(response) {
    //                    $scope.listaPagadosExtemporaneo = response.data;
    //                    if (response.data[i].tipoPagoFecha == 2) {
    //                        $scope.totalPagInPuntual += (response.data[i].cargo);
    //                    }
    //                },
    //                function errorCallback(response) {
    //                    //Error
    //                    notificationFactory.error('No se pudieron obtener datos del Cliente: ' + response.data.message);
    //                }
    //            );
    //    };


}); //FIN de appControllers
