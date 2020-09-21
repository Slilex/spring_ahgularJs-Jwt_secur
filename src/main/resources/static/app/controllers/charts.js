zingchart.THEME = "dark";


angular.module('JWTDemoApp')
    .controller('ChartsController', function($scope, $http, $filter, AuthService){
        $scope.days = 5;
        $scope.show = null;
        $scope.fetchData = function () {
            $scope.show = 'true';

            $http({
                url: "/users/app/token/id",
                method: "GET",
                headers: {
                    'Authorization': AuthService.user.token
                }
            }).then(function success(res) {
                $scope.appID = res.data.app_id;
                $scope.createChart();

            }, function error(error) {
                // if authentication was not successful. Setting the error message.
                console.log(error);
                $scope.message = 'Authetication Failed !';
            });

            $scope.getHistoricalCharts = function (){

                for (var i = $scope.days-1; i >= 0; i--) {

                    var date = new Date(($scope.currentDate).getTime() - 86400000 * i);

                    var dateForUrl = $filter('date')(date.toISOString(), 'yyyy-MM-dd');
                    $scope.dateArray.push(dateForUrl);

                    var urlStr = 'https://openexchangerates.org/api/historical/' + dateForUrl + '.json?app_id=' + $scope.appID;
                    $http({
                        url: urlStr,
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Headers': 'Content-Type'
                        }
                    }).then(function success(res) {
                        $scope.arrBTN.push(res.data.rates.BTN);
                        $scope.arrBDT.push(res.data.rates.BDT);
                        $scope.arrAUD.push(res.data.rates.AUD);
                        $scope.arrARS.push(res.data.rates.ARS);
                        $scope.arrDOP.push(res.data.rates.DOP);
                        $scope.arrETB.push(res.data.rates.ETB);
                        $scope.arrJPY.push(res.data.rates.JPY);
                        $scope.arrUAH.push(res.data.rates.UAH);

                    }, function error(error) {
                        $scope.message = 'Authetication Failed !';
                    });
                }
            };

            $scope.createChart = function(){
                $scope.currentDate = new Date();
                $scope.dateArray = [];


                $scope.arrBTN = []
                $scope.arrBDT = []
                $scope.arrAUD = []
                $scope.arrARS = []
                $scope.arrDOP = []
                $scope.arrETB = []
                $scope.arrJPY = []
                $scope.arrUAH = []

                $scope.getHistoricalCharts();

                $scope.myJson = {
                    gui: {
                        contextMenu: {
                            button: {
                                visible: 0
                            }
                        }
                    },
                    backgroundColor: "#434343",
                    globals: {
                        shadow: false,
                        fontFamily: "Helvetica"
                    },
                    type: "area",

                    legend: {
                        layout: "x4",
                        backgroundColor: "transparent",
                        borderColor: "transparent",
                        marker: {
                            borderRadius: "50px",
                            borderColor: "transparent"
                        },
                        item: {
                            fontColor: "white"
                        }

                    },
                    scaleX: {
                        maxItems: 10,
                        transform: {
                            type: 'date'
                        },
                        zooming: true,
                        values: $scope.dateArray,
                        lineColor: "white",
                        lineWidth: "1px",
                        tick: {
                            lineColor: "white",
                            lineWidth: "1px"
                        },
                        item: {
                            fontColor: "white"
                        },
                        guide: {
                            visible: false
                        }
                    },
                    scaleY: {
                        lineColor: "white",
                        lineWidth: "1px",
                        tick: {
                            lineColor: "white",
                            lineWidth: "1px"
                        },
                        guide: {
                            lineStyle: "solid",
                            lineColor: "#626262"
                        },
                        item: {
                            fontColor: "white"
                        },
                    },
                    tooltip: {
                        visible: false
                    },
                    crosshairX: {
                        scaleLabel: {
                            backgroundColor: "#fff",
                            fontColor: "black"
                        },
                        plotLabel: {
                            backgroundColor: "#434343",
                            fontColor: "#FFF",
                            _text: "Number of hits : %v"
                        }
                    },
                    plot: {
                        lineWidth: "2px",
                        aspect: "spline",
                        marker: {
                            visible: false
                        }
                    },
                    series: [{
                        text: "BTN",
                        values: $scope.arrBTN,
                        backgroundColor1: "#77d9f8",
                        backgroundColor2: "#272822",
                        lineColor: "#40beeb"
                    }, {
                        text: "BDT",
                        values: $scope.arrBDT,
                        backgroundColor1: "#4AD8CC",
                        backgroundColor2: "#272822",
                        lineColor: "#4AD8CC"
                    }, {
                        text: "AUD",
                        values: $scope.arrAUD,
                        backgroundColor1: "#1D8CD9",
                        backgroundColor2: "#8ca9c4",
                        lineColor: "#1D8CD9"
                    }, {
                        text: "ARS",
                        values: $scope.arrARS,
                        backgroundColor1: "#5f9c96",
                        backgroundColor2: "#414f5f",
                        lineColor: "#7f45a3"
                    }, {
                        text: "DOP",
                        values: $scope.arrDOP,
                        backgroundColor1: "#5f9c96",
                        backgroundColor2: "#414f5f",
                        lineColor: "#9a8127"
                    }, {
                        text: "ETB",
                        values: $scope.arrETB,
                        backgroundColor1: "#5f9c96",
                        backgroundColor2: "#414f5f",
                        lineColor: "#b48562"
                    }, {
                        text: "JPY",
                        values: $scope.arrJPY,
                        backgroundColor1: "#cea1a6",
                        backgroundColor2: "#414f5f",
                        lineColor: "#bf1126"
                    }, {
                        text: "UAH",
                        values: $scope.arrUAH,
                        backgroundColor1: "#8bb0e7",
                        backgroundColor2: "#414f5f",
                        lineColor: "#e2e518"
                    }
                    ]
                };
            };

        }
    });


