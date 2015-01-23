'use strict';

var payApp = angular.module('payRoll', []);

payApp.controller('mainCtrl', function($scope, $http, $window,$location) {



    $http.get('/zip_city.json')
        .success(function(response){
            //console.log("Res", response)
           //  $scope.Zip_City_options = response;
        })
        .error(function(error){
            console.log("Error", error)
        });
    
    $http.get('/Code_NAF.json')
        .success(function(response){
            $scope.Code_NAF_options = response;
        })
        .error(function(error){
            console.log("Error", error)
        });

    $scope.health_ins_options = ["Rég. Gén.", "Privée"];
    $scope.category_options = ["Non cadre", "Cadre", "Mandataire social"];
    $scope.disability_ins_options = ["Rég. Gén.", "Privée"];
    $scope.oldage_ins_options = ["Rég. Gén.", "Privée"];

    $scope.base_sal = 3789.00;
    $scope.base_activity = 100.00;
    $scope.base_dur = 151.67;
    $scope.health_ins = 'Rég. Gén.';
    $scope.disability_ins = 'Rég. Gén.';
    $scope.oldage_ins = 'Rég. Gén.';
    $scope.$watch('base_sal', resetRoundMode);
    $scope.$watch('base_activity', resetRoundMode);
    $scope.$watch('base_dur', resetRoundMode);
    $scope.$watch('health_ins', resetRoundMode);
    $scope.$watch('category', resetRoundMode);
    $scope.$watch('disability_ins', resetRoundMode);
    $scope.$watch('oldage_ins', resetRoundMode);

    $scope.category = 'Mandataire social';

    $scope.re_base_sal = 3789.00;
    $scope.re_Rate2_HIns = parseFloat((17.850).toFixed(3));
    $scope.re_tax_HI = 8.610;
    $scope.re_cot_pat_HI = 676.34;
    $scope.re_amount_ins = 28.42;
    $scope.re_cot_pat_ins = 496.36;
    $scope.re_base_HIns = 1002.57;
    $scope.re_amount_HIns = 326.23;
    $scope.re_Rate2_Ins = parseFloat((13.001).toFixed(3));
    $scope.re_Rate_Ins = parseFloat((0.750).toFixed(3));
    $scope.re_Base_PHI = parseFloat((260.00).toFixed(3));
    $scope.re_Rate2_PHI = parseFloat((100.000).toFixed(3));
    $scope.re_cot_pat_PHI = 260.00;
    $scope.re_amount_GSC = 189.86;
    $scope.re_Rate_GSC = parseFloat((5.001).toFixed(3));
    $scope.re_Rate_CRTSD = parseFloat((2.900).toFixed(3));
    $scope.re_amount_CRTSD = 107.69;
    $scope.re_Rate_MC = parseFloat((4.750).toFixed(3));
    $scope.re_cot_pat_MC = 179.98;
    $scope.re_Rate_CI = parseFloat((1.000).toFixed(3));
    $scope.re_cot_pat_CI = 41.68;
    $scope.re_Rate_PP = parseFloat((1.100).toFixed(3)); 
    $scope.re_cot_pat_PP = 37.89;
    $scope.re_amount_PE = 90.94;
    $scope.re_Rate_PE = parseFloat((2.004).toFixed(3));
    $scope.re_Rate_PE2 = parseFloat((4.000).toFixed(3));
    $scope.re_cot_pat_PE = 151.56;
    $scope.re_Rate_AREG = parseFloat((0.003).toFixed(3));
    $scope.re_cot_pat_AREG = 11.37;
    $scope.re_Rate_AEE = parseFloat((0.024).toFixed(3));
    $scope.re_Rate_AEE2 = parseFloat((0.036).toFixed(3));
    $scope.re_amount_AEE = 0.91;
    $scope.re_cot_pat_AEE = 1.36;
    $scope.re_base_Capped_pension_ins = 3170.00;
    $scope.re_Rate_Old_Age_Ins = parseFloat((10.845).toFixed(3));
    $scope.re_amount_Old_Age_Ins = 410.92;
    $scope.re_Rate2_Old_Age_Ins = parseFloat((16.321).toFixed(3));
    $scope.re_cot_Pat_Old_Age_Ins = 618.40;
    $scope.re_amount_AV_P = 217.15;
    $scope.re_cot_pat_AV_P = 269.45;
    $scope.re_Rate_AV_P = parseFloat((6.850).toFixed(3));
    $scope.re_Rate2_AV_P = parseFloat((8.005).toFixed(3));
    $scope.re_Rate_AV_DP = parseFloat((0.003).toFixed(3));
    $scope.re_Rate2_AV_DP = parseFloat((1.008).toFixed(3));
    $scope.re_amount_AV_DP = 11.37;
    $scope.re_cot_pat_AV_DP = 68.20;
    $scope.re_Rate_ARRCO_T1 = parseFloat((3.001).toFixed(3));
    $scope.re_Rate2_ARRCO_T1 = parseFloat((4.650).toFixed(3));
    $scope.re_amount_ARRCO_T1 = 98.27;
    $scope.re_cot_pat_ARRCO_T1 = 147.41;
    $scope.re_Rate_ARRCO_T2 = parseFloat((8.001).toFixed(3));
    $scope.re_Rate2_ARRCO_T2 = parseFloat((12.015).toFixed(3));
    $scope.re_amount_ARRCO_T2 = 50.14;
    $scope.re_cot_pat_ARRCO_T2 = 75.21;
    $scope.re_base_Complementary_Pensions_eT2 = 619.00;
    $scope.re_Rate_ARRCO_TB = parseFloat((7.008).toFixed(3));
    $scope.re_Rate2_ARRCO_TB = parseFloat((12.075).toFixed(3));
    $scope.re_amount_ARRCO_TB = 48.28;
    $scope.re_cot_pat_ARRCO_TB = 78.92;
    $scope.re_base_Pension_Institutions_Fra_TB = 619.00;
    $scope.re_Rate_ARRCO_TC = parseFloat((0.036).toFixed(3));
    $scope.re_Rate2_ARRCO_TC = parseFloat((20.019).toFixed(3));
    $scope.re_amount_ARRCO_TC = 0.00;
    $scope.re_cot_pat_ARRCO_TC = 0.00;
    $scope.re_Rate_CET = parseFloat((0.013).toFixed(3));
    $scope.re_Rate2_CET = 0.220;
    $scope.re_amount_CET = 4.93;
    $scope.re_cot_pat_CET = 8.34;
    $scope.re_Rate_AGFF_T1 = parseFloat((0.008).toFixed(3));
    $scope.re_Rate2_AGFF2_T1 = parseFloat((1.002).toFixed(3));
    $scope.re_amount_AGFF_T1 = 25.36;
    $scope.re_cot_pat_AGFF_T1 = 38.04;
    $scope.re_Rate_AGFF_T2 = parseFloat((0.009).toFixed(3));
    $scope.re_Rate2_AGFF2_T2 = parseFloat((1.003).toFixed(3));
    $scope.re_amount_AGFF_T2 =  5.57;
    $scope.re_cot_pat_AGFF_T2 = 8.05;
    $scope.re_Rate_FAC = parseFloat((6.584).toFixed(3));
    $scope.re_cot_pat_FAC = 198.92;
    $scope.re_Rate_ASC = parseFloat((0.003).toFixed(3));
    $scope.re_cot_pat_ASC = 11.37;
    $scope.re_base_NHAF = 3170.00;
    $scope.re_Rate_NHAF = parseFloat((0.001).toFixed(3));
    $scope.re_cot_pat_NHAF = 3.17;
    $scope.re_base_SP = 179.98;
    $scope.re_Rate_SP = parseFloat((20.000).toFixed(3));
    $scope.re_cot_pat_SP = 36.00;
    $scope.re_cot_pat_OTAE = 0.00;
    $scope.re_Rate_OTAE = parseFloat((0.000).toFixed(3));
    $scope.re_OTAE = parseFloat((0.00).toFixed(2));
    $scope.re_Rate_PT = parseFloat((1.007).toFixed(3));
    $scope.re_cot_pat_PT = 64.41;
    $scope.re_cot_pat_AD = 41.68;
    $scope.re_wages_costs = 738.06;
    $scope.re_OSSC = 249.46;
    $scope.re_Rate_OSSC = parseFloat((6.548).toFixed(3));
    $scope.re_cot_pat_OSSC = 249.46;
    $scope.re_Patron_Charges = 1587.24;
    $scope.re_Payment_URSAFF = 1679.89;
    $scope.re_Payment_AGIRC_ARRCO = 465.43;
    $scope.re_Private_Mutual_Pay = 179.98;
    $scope.re_Net_Cash = 2909.86;
    $scope.re_Net_taxable = 3197.80;
    $scope.re_Total_wages = 5235.16;
    $scope.re_oldage_ins_base = 1029.32;
    $scope.re_cot_pat_UI = 1.36;
    $scope.re_amount_UI = 0.91;
    $scope.re_Rate_UI = parseFloat((0.024).toFixed(3));
    $scope.re_Rate2_UI = parseFloat((0.036).toFixed(3));
    $scope.re_base_UI = 2.27;


    function resetRoundMode(newValue, oldValue) {
      if(newValue != oldValue) {

        var data = {
          'base_sal':$scope.base_sal,
          'base_activity':$scope.base_activity,
          'base_dur':$scope.base_dur,
          'health_ins':$scope.health_ins,
          'disability_ins':$scope.disability_ins,
          'oldage_ins':$scope.oldage_ins,
          'category':$scope.category,
        };
        $http.post('/calculate', data)
          .success(function(response) { //console.log('@@@@@2 ',response.cot_pat_PHI);
            console.log('response', response);
            $scope.re_base_sal = response.base_salary;
            $scope.re_Rate2_HIns = response.Rate2_HIns;
            $scope.re_tax_HI = response.tax_HI;
            $scope.re_cot_pat_HI = response.cot_pat_HI;
            $scope.re_amount_ins = response.amount_ins;
            $scope.re_Rate_Ins = response.Rate_Ins;
            $scope.re_base_HIns = response.base_HIns;
            $scope.re_cot_pat_ins = response.cot_pat_ins;
            $scope.re_amount_HIns = response.amount_HIns;
            $scope.re_Rate2_Ins = response.Rate2_Ins;
            $scope.re_Base_PHI = response.Base_PHI;
            $scope.re_Rate2_PHI = response.Rate2_PHI;
            $scope.re_cot_pat_PHI = response.cot_pat_PHI;
            $scope.re_amount_GSC = response.amount_GSC;
            $scope.re_Rate_GSC = response.Rate_GSC;
            $scope.re_Rate_CRTSD = response.Rate_CRTSD;
            $scope.re_amount_CRTSD = response.amount_CRTSD;
            $scope.re_Rate_MC = response.Rate_MC;
            $scope.re_cot_pat_MC = response.cot_pat_MC;
            $scope.re_Rate_CI = response.Rate_CI;
            $scope.re_cot_pat_CI = response.cot_pat_CI;
            $scope.re_Rate_PP = response.Rate_PP;
            $scope.re_cot_pat_PP = response.cot_pat_PP;
            $scope.re_amount_PE = response.amount_PE;
            $scope.re_Rate_PE = response.Rate_PE;
            $scope.re_Rate_PE2 = response.Rate_PE2;
            $scope.re_cot_pat_PE = response.cot_pat_PE;
            $scope.re_Rate_AREG = response.Rate_AREG;
            $scope.re_cot_pat_AREG = response.cot_pat_AREG;
            $scope.re_Rate_AEE = response.Rate_AEE;
            $scope.re_Rate_AEE2 = response.Rate_AEE2;
            $scope.re_amount_AEE = response.amount_AEE;
            $scope.re_cot_pat_AEE = response.cot_pat_AEE;
            $scope.re_base_Capped_pension_ins = response.base_Capped_pension_ins;
            $scope.re_Rate_Old_Age_Ins = response.Rate_Old_Age_Ins;
            $scope.re_amount_Old_Age_Ins = response.amount_Old_Age_Ins;
            $scope.re_Rate2_Old_Age_Ins = response.Rate2_Old_Age_Ins;
            $scope.re_cot_Pat_Old_Age_Ins = response.cot_Pat_Old_Age_Ins;
            $scope.re_base_SP = response.base_SP;
            $scope.re_Rate_SP = response.Rate_SP;
            $scope.re_cot_pat_SP = response.cot_pat_SP;
            $scope.re_amount_AV_P = response.amount_AV_P;
            $scope.re_cot_pat_AV_P = response.cot_pat_AV_P;
            $scope.re_Rate_AV_P = response.Rate_AV_P;
            $scope.re_Rate2_AV_P = response.Rate2_AV_P;
            $scope.re_Rate_AV_DP = response.Rate_AV_DP;
            $scope.re_Rate2_AV_DP = response.Rate2_AV_DP;
            $scope.re_amount_AV_DP = response.amount_AV_DP;
            $scope.re_cot_pat_AV_DP = response.cot_pat_AV_DP;
            $scope.re_Rate_ARRCO_T1 = response.Rate_ARRCO_T1;
            $scope.re_Rate2_ARRCO_T1 = response.Rate2_ARRCO_T1;
            $scope.re_amount_ARRCO_T1 = response.amount_ARRCO_T1;
            $scope.re_cot_pat_ARRCO_T1 = response.cot_pat_ARRCO_T1;
            $scope.re_Rate_ARRCO_T2 = response.Rate_ARRCO_T2;
            $scope.re_Rate2_ARRCO_T2 = response.Rate2_ARRCO_T2;
            $scope.re_amount_ARRCO_T2 = response.amount_ARRCO_T2;
            $scope.re_cot_pat_ARRCO_T2 = response.cot_pat_ARRCO_T2;
            $scope.re_base_Complementary_Pensions_eT2 = response.base_Complementary_Pensions_eT2;
            $scope.re_Rate_ARRCO_TB = response.Rate_ARRCO_TB;
            $scope.re_Rate2_ARRCO_TB = response.Rate2_ARRCO_TB;
            $scope.re_amount_ARRCO_TB = response.amount_ARRCO_TB;
            $scope.re_cot_pat_ARRCO_TB = response.cot_pat_ARRCO_TB;
            $scope.re_base_Pension_Institutions_Fra_TB = response.base_Pension_Institutions_Fra_TB;
            $scope.re_Rate_ARRCO_TC = response.Rate_ARRCO_TC;
            $scope.re_Rate2_ARRCO_TC = response.Rate2_ARRCO_TC;
            $scope.re_amount_ARRCO_TC = response.amount_ARRCO_TC;
            $scope.re_cot_pat_ARRCO_TC = response.cot_pat_ARRCO_TC;
            $scope.re_Rate_CET = response.Rate_CET;
            $scope.re_Rate2_CET = response.Rate2_CET;
            $scope.re_amount_CET = response.amount_CET;
            $scope.re_cot_pat_CET = response.cot_pat_CET;
            $scope.re_Rate_AGFF_T1 = response.Rate_AGFF_T1,
            $scope.re_Rate2_AGFF2_T1 = response.Rate2_AGFF2_T1,
            $scope.re_Rate2_AGFF2_T2 = response.Rate2_AGFF2_T2,
            $scope.re_amount_AGFF_T1 = response.amount_AGFF_T1;
            $scope.re_cot_pat_AGFF_T1 = response.cot_pat_AGFF_T1;
            $scope.re_amount_AGFF_T2 = response.amount_AGFF_T2;
            $scope.re_Rate_AGFF_T2 = response.Rate_AGFF_T2,
            $scope.re_cot_pat_AGFF_T2 = response.cot_pat_AGFF_T2;
            $scope.re_Rate_FAC = response.Rate_FAC;
            $scope.re_cot_pat_FAC = response.cot_pat_FAC;
            $scope.re_Rate_ASC = response.Rate_ASC;
            $scope.re_cot_pat_ASC = response.cot_pat_ASC;
            $scope.re_base_NHAF = response.base_NHAF;
            $scope.re_Rate_NHAF = response.Rate_NHAF;
            $scope.re_cot_pat_NHAF = response.cot_pat_NHAF;
            $scope.re_cot_pat_OTAE = response.cot_pat_OTAE;
            $scope.re_Rate_OTAE = response.Rate_OTAE;
            $scope.re_OTAE = response.re_OTAE;
            $scope.re_Rate_PT = response.Rate_PT;
            $scope.re_cot_pat_PT = response.cot_pat_PT;
            $scope.re_cot_pat_AD = response.cot_pat_AD;
            $scope.re_wages_costs = response.wages_costs;
            $scope.re_OSSC = response.OSSC;
            $scope.re_Rate_OSSC = response.Rate_OSSC;
            $scope.re_Patron_Charges = response.Patron_Charges;
            $scope.re_Payment_URSAFF = response.Payment_URSAFF;
            $scope.re_Payment_AGIRC_ARRCO = response.Payment_AGIRC_ARRCO;
            $scope.re_Private_Mutual_Pay = response.Private_Mutual_Pay;
            $scope.re_Net_Cash = response.Net_Cash;
            $scope.re_Total_wages = response.Total_wages;
            $scope.re_oldage_ins_base = response.oldage_ins_base;
            $scope.re_cot_pat_UI = response.cot_pat_UI;
            $scope.re_amount_UI = response.amount_UI;
            $scope.re_Rate_UI = response.Rate_UI;
            $scope.re_Rate2_UI = response.Rate2_UI;
            $scope.re_base_UI = response.base_UI;
            $scope.re_Net_taxable = response.Net_taxable;
            console.log('response.visible_hide', response.visible_hide);
            $scope.visible_Ins= response.visible_hide.visible_Ins;
            $scope.visible_PHI= response.visible_hide.visible_PHI;
            $scope.visible_GSC= response.visible_hide.visible_GSC;
            $scope.visible_CRTSD= response.visible_hide.visible_CRTSD;
            $scope.visible_MC= response.visible_hide.visible_MC;
            $scope.visible_CI= response.visible_hide.visible_CI;
            $scope.visible_PP= response.visible_hide.visible_PP;
            $scope.visible_PE= response.visible_hide.visible_PE;
            $scope.visible_AREG= response.visible_hide.visible_AREG;
            $scope.visible_AEE= response.visible_hide.visible_AEE;
            $scope.visible_AV_P= response.visible_hide.visible_AV_P;
            $scope.visible_AV_DP= response.visible_hide.visible_AV_DP;
            $scope.visible_ARRCO_T1= response.visible_hide.visible_ARRCO_T1;
            $scope.visible_ARRCO_T2= response.visible_hide.visible_ARRCO_T2;
            $scope.visible_ARRCO_TB= response.visible_hide.visible_ARRCO_TB;
            $scope.visible_ARRCO_TC= response.visible_hide.visible_ARRCO_TC;
            $scope.visible_CET= response.visible_hide.visible_CET;
            $scope.visible_AGFF_T1= response.visible_hide.visible_AGFF_T1;
            $scope.visible_AGFF_T2= response.visible_hide.visible_AGFF_T2;
            $scope.visible_FAC= response.visible_hide.visible_FAC;
            $scope.visible_ASC= response.visible_hide.visible_ASC;
            $scope.visible_NHAF= response.visible_hide.visible_NHAF;
            $scope.visible_SP= response.visible_hide.visible_SP;
            $scope.visible_PT= response.visible_hide.visible_PT;
          })
          .error(function(error) {
            console.log('error', error)
          });
      }
    }

    var paymentToken =  getParameterByName('token');
    $scope.pdfButton = "Export to PDF";
    if(paymentToken) 
        $scope.paymentStatus = 1;
    else
        $scope.paymentStatus = 0;

    $scope.payment = function() {
        if (!paymentToken) {
            $scope.disablePdf = true;
            $scope.pdfButton = "Please Wait...";
            $http.get('/payment')
                .success(function(response) {
                    console.log('success ', response);
                    $scope.paymentStatus = 1;
                    $scope.disablePdf = true;
                    $window.location.href = response.url ;//'http://google.com';
                }).error(function(message) {
                    console.log('error ', message);
                });
        }
    };

    function getParameterByName(name) {
        name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    }
});