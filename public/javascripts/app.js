'use strict';

var payApp = angular.module('payRoll', ["xeditable", "ui.bootstrap"]);

payApp.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});

// Change format
payApp.filter('amountformat', function() {
    return function(input){
        return accounting.formatMoney(input, "", 2, " ", ",");
    }
});

//change rate format
payApp.filter('rateformat', function() {
    return function(input){
        return accounting.formatMoney(input, "", 3, " ", ",");
    }
});

//change company ID format 
payApp.filter('companyIdFormat', function() {
    return function(input){
        return accounting.formatNumber(input, 0, " ", "");
    }
});

//change company ID format 
payApp.filter('employIdFormat', function() {
    return function(input){
       if(input.length === 15) {
          var output = input.slice(0, 1) + ' ' + input.slice(1, 3) + ' ' + input.slice(3, 5) + ' ' + input.slice(5, 10) + ' ' + input.slice(10, 13) + ' ' + input.slice(13, 15);
        }
        return (output);
    }
});

//change date format 
payApp.filter('customDateFilter', function(){
    return function(input){
        return input.slice(3,10);
    }
});

payApp.directive('currency', ['$filter', function ($filter) {
    return {
        require: 'ngModel',
        link: function (elem, $scope, attrs, ngModel) {
            ngModel.$formatters.push(function (val) {
                return $filter('currency')(val , "")
            });
            ngModel.$parsers.push(function (val) {
                return val.replace(/[\$,]/, '')
            });
        }
    }
}]);


payApp.controller('mainCtrl', function($scope, $http, $window,$location, $filter, LS) {
    
    $scope.Zip_City_options = [];
    //x-editable values
    $scope.company_name = 'FABRIKAM';
    $scope.address1 = 'Immeuble le Parisien';
    $scope.address2 = '1 avenue des Champs Elysées';
    $scope.zip_code = '75007 Paris';
    $scope.zip_city = 'Paris';
    $scope.company_estab = 'ETABLISSEMENT PRINCIPAL';
    $scope.company_ID = '999999999';
    $scope.comany_insurance = "XXXXXXXXXXXX";
    $scope.Convention_collective = "KALICONT000027040696";
    //var dateObject = new Date("January 31, 2015");//"31.01.2015";
    $scope.payroll_date = new Date("January 31, 2015").toISOString();
    $scope.payroll_period = new Date("January 31, 2015").toISOString();
    $scope.payroll_start = new Date("January 01, 2015").toISOString();
    $scope.payroll_end = new Date("January 31, 2015").toISOString();
    //console.log('Date is ',$scope.payroll_end);
    $scope.employ_ID = "999999999999999";
    $scope.employ_name = " M. John Doe";
    $scope.employ_address1 = "Parc Chauchard";
    $scope.employ_address2 = "1 avenue du Louvre";
    $scope.employ_zip = "78000 Paris";
    $scope.employ_city = "Versailles";
    $scope.employ_role = "Consultant";
    $scope.category = "2";
    $scope.health_ins = 'Rég. Gén.';
    $scope.disability_ins = 'Rég. Gén.';
    $scope.oldage_ins = 'Rég. Gén.';
    $scope.Code_NAF = "58.29C EDITION DE LOGICIELS APPLICATIFS";

    //popup values
    $scope.re_costs_benefits = 1400;
    $scope.re_private_health_ins_amnt = 0.00;
    $scope.re_private_pension_amnt = 0.00;
    $scope.re_unemployment_ins_amnt = 50;
    $scope.re_annual_return = 0.00;
    $scope.con_collective_options = [];
   $scope.loadJson = function() {

        $http.get('/zip_city.json')
            .success(function(response) { 
            //console.log("Res", response)
            $scope.Zip_City_options = response;
        })
        .error(function(error) {
            console.log("Error", error)
        });

        $http.get('/Code_NAF.json')
            .success(function(response){
                $scope.Code_NAF_options = response;
            })
            .error(function(error){
                console.log("Error", error)
        });

        $http.get('/connective.json')
            .success(function(response){
                $scope.con_collective_options = response;
            })
            .error(function(error){
                console.log("Error", error)
        });

         //resetRoundMode('base_sal', 3789.00);
    }

    $scope.checkString = function(data) { 
        if (!isNaN(parseFloat(data))) {
            return "Please enter valid value";
        }       

    };

    $scope.checkEmployId = function(data) { 
        //check for numeric
        var numbers = /^[0-9]+$/;
        if(!data.match(numbers)) {
            $scope.employ_ID = "999999999999999";
            return "Veuillez saisir 15 chiffres";
        //check length
        }else if(data.length < 15 || data.length > 15) {
            $scope.employ_ID = "999999999999999";
            return "Veuillez saisir 15 chiffres";
        }
    };

    // $scope.checkNumeric = function(data) {
    //     var data = data.match(/\d+/g);
    //     if (data != null) {
    //         return "Please enter only digits";
    //     }
    // };

    $scope.validateCompanyId = function(data) { 
        //check for numerics
        var numbers = /^[0-9]+$/;  
        if(!data.match(numbers))  {
            $scope.company_ID = "999999999";
            return "Veuillez saisir 9 chiffres";
        //check length
        }else if(data.length > 9 || data.length < 9) {
            $scope.company_ID = "999999999";
            return "Veuillez saisir 9 chiffres";
        }
    };

    $scope.category_options = [{value: "1",text: "Non cadre"},
                               {value: "2",text: "Cadre"},
                               {value: "3",text: "Mandataire social"}];

    $scope.showCategory = function() { 
        var selectedCategory = $filter('filter')($scope.category_options, {value:$scope.category});
        return ($scope.category && selectedCategory.length) ? selectedCategory[0].text : 'Cadre';
    }

    $scope.showHealthCategory = function() {
        var selectedHealthCategory = $filter('filter')($scope.health_ins_options, {value:$scope.health_ins});
        return ($scope.health_ins && selectedHealthCategory.length) ? selectedHealthCategory[0].text : 'Rég. Gén.';
    }

    $scope.showDisabilityCategory = function() {
        var selectedDisabilityCategory = $filter('filter')($scope.disability_ins_options, {value:$scope.disability_ins});
        return ($scope.disability_ins && selectedDisabilityCategory.length) ? selectedDisabilityCategory[0].text : 'Rég. Gén.';
    }
    
    $scope.showOldAgeCategory = function() {  
        var selectedOldAgeCategory = $filter('filter')($scope.oldage_ins_options, {value:$scope.oldage_ins});
        return ($scope.oldage_ins && selectedOldAgeCategory.length) ? selectedOldAgeCategory[0].text : 'Rég. Gén.';
    }

    $scope.showConCollective = function() {
        var selectedConCollective = $filter('filter')($scope.con_collective_options, {value:$scope.Convention_collective});
        return ($scope.Convention_collective && selectedConCollective.length) ? selectedConCollective[0].text : 'METTALURGIE NATIONALE';
    };

    $scope.health_ins_options = [ {value:"Rég. Gén.", text:"Rég. Gén."} , {value:"Privée", text:"Privée"} ];
    $scope.disability_ins_options = [ {value:"Rég. Gén.", text:"Rég. Gén."} , {value:"Privée", text:"Privée"} ];
    $scope.oldage_ins_options = [ {value:"Rég. Gén.", text:"Rég. Gén."} , {value:"Privée", text:"Privée"} ];
   
    
    $scope.base_sal = 3789.00;
    $scope.base_activity = 100.00;
    $scope.base_dur = 151.67;
    
    // $scope.fillData = function(){

    // };
    $scope.$watch('base_sal', resetRoundMode);
    $scope.$watch('base_activity', resetRoundMode);
    $scope.$watch('base_dur', resetRoundMode);
    $scope.$watch('health_ins', resetRoundMode);
    $scope.$watch('category', resetRoundMode);
    $scope.$watch('disability_ins', resetRoundMode);
    $scope.$watch('oldage_ins', resetRoundMode);
    $scope.$watch('re_private_health_ins_amnt', resetRoundMode);
    $scope.$watch('re_private_pension_amnt', resetRoundMode);  
    $scope.$watch('re_costs_benefits' ,resetRoundMode);
    $scope.$watch('re_Saving_time_years', resetRoundMode);
    $scope.$watch('re_annual_return', resetRoundMode);
    $scope.$watch('re_unemployment_ins_amnt', resetRoundMode);
    $scope.$watch('re_Voluntary_payment_retirement', resetRoundMode);
    $scope.$watch('re_NDF', resetRoundMode);
    $scope.$watch('re_Rate_CI', resetRoundMode);
    $scope.$watch('re_Rate2_SS', resetRoundMode);
    $scope.$watch('re_Rate_MC', resetRoundMode);

    $scope.re_base_sal = 3789.00;
    $scope.re_base_mutual_com = 12680.00;
    $scope.re_Rate2_HIns = parseFloat((23.700).toFixed(3));
    $scope.re_tax_HI = 8.610;
    $scope.re_cot_pat_HI = 897.99;
    $scope.re_amount_ins = 28.42;
    $scope.re_cot_pat_ins = 496.36;
    $scope.re_base_HIns = 1224.23;
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
    $scope.re_Rate_CI = parseFloat((1.1).toFixed(3));
    $scope.re_Rate2_SS = parseFloat((4.750).toFixed(3));
    $scope.re_cot_pat_SS = parseFloat((179.98).toFixed(2));
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
    $scope.re_base_SP = 359.96;
    $scope.re_Rate_SP = parseFloat((20.000).toFixed(3));
    $scope.re_cot_pat_SP = 71.99;
    $scope.re_cot_pat_OTAE = 0.00;
    $scope.re_Rate_OTAE = parseFloat((0.000).toFixed(3));
    $scope.re_OTAE = parseFloat((0.00).toFixed(2));
    $scope.re_Rate_PT = parseFloat((1.007).toFixed(3));
    $scope.re_cot_pat_PT = 64.41;
    $scope.re_cot_pat_AD = 41.68;
    $scope.re_wages_costs = 829.00;
    $scope.re_OSSC = 285.45;
    $scope.re_Rate_OSSC = parseFloat((7.534).toFixed(3));
    $scope.re_cot_pat_OSSC = 285.45;
    $scope.re_Patron_Charges = 1966.14;
    $scope.re_Payment_URSAFF = 1969.75;
    $scope.re_Payment_AGIRC_ARRCO = 465.43;
    $scope.re_Private_Mutual_Pay = 359.96;
    $scope.re_Net_Cash = 2909.86;
    $scope.re_Net_taxable = 3377.78;
    $scope.re_Total_wages = 5705.00;
    $scope.re_oldage_ins_base = 1029.32;
    $scope.re_cot_pat_UI = 164.29;
    $scope.re_amount_UI = 91.85;
    $scope.re_Rate_UI = parseFloat((2.424).toFixed(3));
    $scope.re_Rate2_UI = parseFloat((4.336).toFixed(3));
    $scope.re_base_UI = 256.14;
    $scope.re_base_ARRCO_TC = 2320.00;

    //hide
$scope.visible_Ins=1
$scope.visible_PHI = 0;
$scope.visible_FEP = 0;
$scope.visible_GSC = 1;
$scope.visible_CRTSD = 1;
$scope.visible_MC = 1;
$scope.visible_CI = 1;
$scope.visible_SS = 1;
$scope.visible_PP = 0;
$scope.visible_PE =1;
$scope.visible_AREG = 1;
$scope.visible_AEE = 1;
$scope.visible_AV_P = 1;
$scope.visible_AV_DP = 1;
$scope.visible_ARRCO_T1 = 1;
$scope.visible_ARRCO_T2 = 0;
$scope.visible_ARRCO_TB = 1;
$scope.visible_ARRCO_TC = 1;
$scope.visible_CET = 1;
$scope.visible_AGFF_T1 = 1;
$scope.visible_AGFF_T2 = 1;
$scope.visible_FAC = 1;
$scope.visible_ASC = 1;
$scope.visible_NHAF = 1
$scope.visible_SP = 1
$scope.visible_PT = 0;
$scope.visible_AC_P = 0;
$scope.visible_AV_P2 = 0;
$scope.re_NDF = 1400.00;
$scope.re_Employee_payment = 13585.42;
$scope.re_social_charges = 2795.14;
$scope.re_taxable_net_salery = 3377.78;
$scope.re_net_salery = 2960.00;
$scope.re_pay_charges = 6326.14;
$scope.re_Voluntary_payment_retirement = 0.00;
$scope.re_Marginal_Tax_bracket = 30.00;
$scope.re_Effective_tax_rate = 12.81;
$scope.re_Estimated_annual_IR = 6701.21;
$scope.re_Estimated_Monthly_IR = 588.43;
$scope.re_After_income_tax = 381.57;
$scope.re_Saving_time_years = 15;
$scope.re_annual_return = 3.00;
$scope.re_Savings_at_end_period = 0.00;
$scope.re_Benefit_Period_years = 30;
$scope.re_monthly_pension = 1891.44;
    
    $scope.$watch('company_name', setLocalStorage);
    $scope.$watch('address1', setLocalStorage);
    $scope.$watch('address2', setLocalStorage);
    $scope.$watch('zip_code', setLocalStorage);
    $scope.$watch('zip_city', setLocalStorage);
    $scope.$watch('company_estab', setLocalStorage);
    $scope.$watch('company_ID', setLocalStorage);
    $scope.$watch('comany_insurance', setLocalStorage);
    $scope.$watch('Convention_collective', setLocalStorage);
    $scope.$watch('payroll_date', setLocalStorage);
    $scope.$watch('payroll_period', setLocalStorage);
    $scope.$watch('payroll_start', setLocalStorage);
    $scope.$watch('payroll_end', setLocalStorage);
    $scope.$watch('employ_ID', setLocalStorage);
    $scope.$watch('employ_name', setLocalStorage);
    $scope.$watch('employ_address1', setLocalStorage);
    $scope.$watch('employ_address2', setLocalStorage);
    $scope.$watch('employ_zip', setLocalStorage);
    $scope.$watch('employ_city', setLocalStorage);
    $scope.$watch('employ_role', setLocalStorage);
    $scope.$watch('re_Voluntary_payment_retirement', setLocalStorage);
    $scope.$watch('re_NDF', setLocalStorage);


    function setLocalStorage() {
        $window.localStorage['pdfValues'] = '';
            var pdfValues = {
                  base_sal:$scope.base_sal,
                  base_activity:$scope.base_activity,
                  base_dur:$scope.base_dur,
                  health_ins:$scope.health_ins,
                  disability_ins:$scope.disability_ins,
                  oldage_ins:$scope.oldage_ins,
                  category:$scope.category,
                  re_private_health_ins_amnt:$scope.re_private_health_ins_amnt,
                  re_private_pension_amnt:$scope.re_private_pension_amnt,
                  re_costs_benefits:$scope.re_costs_benefits,
                  re_Saving_time_years:$scope.re_Saving_time_years,
                  re_annual_return: $scope.re_annual_return,
                  re_Benefit_Period_years: $scope.re_Benefit_Period_years,
                  re_unemployment_ins_amnt: $scope.re_unemployment_ins_amnt,
                 company_name: $scope.company_name,
                  address1:$scope.address1,
                    address2:$scope.address2,
                   zip_code :$scope.zip_code,
                   zip_city :$scope.zip_city ,
                   company_estab: $scope.company_estab,
                   company_ID :$scope.company_ID ,
                  comany_insurance:  $scope.comany_insurance,
                  Convention_collective:  $scope.Convention_collective ,
                    //var dateObject = new Date("January 31, 2015");//"31.01.2015";
                  payroll_date : $scope.payroll_date ,
                  payroll_period:  $scope.payroll_period ,
                   payroll_start: $scope.payroll_start ,
                   payroll_end :$scope.payroll_end ,
                    //console.log('Date is ',$scope.payroll_end);
                  employ_ID  :$scope.employ_ID ,
                  employ_name : $scope.employ_name,
                  employ_address1:  $scope.employ_address1,
                  employ_address2 : $scope.employ_address2,
                 employ_zip :  $scope.employ_zip,
                  employ_city:  $scope.employ_city,
                  employ_role : $scope.employ_role,
                  re_Rate_CI:$scope.re_Rate_CI,
                    re_Rate_MC:$scope.re_Rate_MC,
          re_Rate2_SS:$scope.re_Rate2_SS,
          re_NDF:$scope.re_NDF,
          re_Voluntary_payment_retirement:$scope.re_Voluntary_payment_retirement
            };
        //set local storage
        LS.setData(pdfValues); 
    }

    function resetRoundMode(newValue, oldValue) {

      if(newValue != oldValue) {
                   //  setLocalStorage();  
        var data = {
          'base_sal':$scope.base_sal,
          'base_activity':$scope.base_activity,
          'base_dur':$scope.base_dur,
          'health_ins':$scope.health_ins,
          'disability_ins':$scope.disability_ins,
          'oldage_ins':$scope.oldage_ins,
          'category':$scope.category,
          're_private_health_ins_amnt':$scope.re_private_health_ins_amnt,
          're_private_pension_amnt':$scope.re_private_pension_amnt,
          're_costs_benefits':$scope.re_costs_benefits,
          're_Saving_time_years':$scope.re_Saving_time_years,
          're_annual_return': $scope.re_annual_return,
          're_Benefit_Period_years': $scope.re_Benefit_Period_years,
          're_unemployment_ins_amnt': $scope.re_unemployment_ins_amnt,
          're_Rate_CI':$scope.re_Rate_CI,
          're_Rate_MC':$scope.re_Rate_MC,
          're_Rate2_SS':$scope.re_Rate2_SS,
          're_NDF':$scope.re_NDF,
          're_Voluntary_payment_retirement':$scope.re_Voluntary_payment_retirement
        };
        $http.post('/calculate', data)
          .success(function(response) { //console.log('@@@@@2 ',response.base_mutual_com);
            console.log('response', response);
            $scope.re_base_sal = response.base_salary;
            $scope.re_base_mutual_com = response.base_mutual_com;
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
            $scope.re_Rate2_SS = response.Rate2_SS;
            $scope.re_cot_pat_SS = response.cot_pat_SS;
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
            $scope.re_OTAE = response.OTAE;
            $scope.re_Rate_PT = response.Rate_PT;
            $scope.re_cot_pat_PT = response.cot_pat_PT;
            $scope.re_cot_pat_AD = response.cot_pat_AD;
            $scope.re_wages_costs = response.wages_costs;
            $scope.re_OSSC = response.cot_pat_OSSC;
            $scope.re_Rate_OSSC = response.Rate_OSSC;
            $scope.re_cot_pat_OSSC = response.cot_pat_OSSC;
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
            $scope.re_NDF = response.NDF;
            $scope.re_Employee_payment = response.Employee_payment;

            console.log('response.visible_hide', response.visible_hide);
            $scope.visible_Ins= response.visible_hide.visible_Ins;
            $scope.visible_PHI= response.visible_hide.visible_PHI;
            $scope.visible_FEP= response.visible_hide.visible_FEP;
            $scope.visible_SS = response.visible_hide.visible_SS;
            $scope.visible_GSC= response.visible_hide.visible_GSC;
            $scope.visible_CRTSD= response.visible_hide.visible_CRTSD;
            $scope.visible_MC= response.visible_hide.visible_MC;
            $scope.visible_CI= response.visible_hide.visible_CI;
            $scope.visible_PP= response.visible_hide.visible_PP;
            $scope.visible_PE= response.visible_hide.visible_PE;
            $scope.visible_AREG= response.visible_hide.visible_AREG;
            $scope.visible_AEE= response.visible_hide.visible_AEE;
            $scope.visible_AC_P = response.visible_hide.visible_AC_P;
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
            $scope.visible_AV_P2 = response.visible_hide.visible_AV_P2;


            $scope.re_social_charges = response.social_charges;
            $scope.re_taxable_net_salery = response.taxable_net_salery;
            $scope.re_costs_benefits = response.costs_benefits;
            $scope.re_net_salery = response.net_salery;
            $scope.re_pay_charges = response.pay_charges;
            $scope.re_private_health_ins_amnt = response.private_health_ins_amnt;
            $scope.re_private_pension_amnt = response.private_pension_amnt;
            $scope.re_unemployment_ins_amnt = response.unemployment_ins_amnt;
            $scope.re_spared_retirement = response.spared_retirement;
            $scope.re_Voluntary_payment_retirement = response.Voluntary_payment_retirement;
            $scope.re_Marginal_Tax_bracket = response.Marginal_Tax_bracket;
            $scope.re_Effective_tax_rate = response.Effective_tax_rate;
            $scope.re_Estimated_annual_IR = response.Estimated_annual_IR;
            $scope.re_Estimated_Monthly_IR = response.Estimated_Monthly_IR;
            $scope.re_After_income_tax = response.After_income_tax;
            $scope.re_Saving_time_years = response.Saving_time_years;
            $scope.re_annual_return = response.annual_return;
            $scope.re_Savings_at_end_period = response.Savings_at_end_period;
            $scope.re_Benefit_Period_years = response.Benefit_Period_years;
            $scope.re_monthly_pension = response.monthly_pension;

          })
          .error(function(error) {
            console.log('error', error)
          });
      }
    }

    var paymentToken =  getParameterByName('token');
    var payerId = getParameterByName('PayerID');
    $scope.pdfButton = "GENERER UN BULLETIN DE PAIE";
    
    if(paymentToken && payerId) {
        var afterPayValue = JSON.parse(LS.getData());
        // console.log('Here ',afterPayValue.base_sal);
        $scope.paymentStatus = true;
        $scope.pdfButton = "Exporter en PDF";
        $scope.base_sal = afterPayValue.base_sal;
         $scope.base_activity = afterPayValue.base_activity,
          $scope.base_dur = afterPayValue.base_dur,
          $scope.health_ins = afterPayValue.health_ins,
          $scope.disability_ins = afterPayValue.disability_ins,
          $scope.oldage_ins = afterPayValue.oldage_ins,
          $scope.category = afterPayValue.category,
          $scope.re_private_health_ins_amnt = afterPayValue.re_private_health_ins_amnt,
          $scope.re_private_pension_amnt = afterPayValue.re_private_pension_amnt,
          $scope.re_costs_benefits = afterPayValue.re_costs_benefits,
          $scope.re_Saving_time_years = afterPayValue.re_Saving_time_years,
          $scope.re_annual_return = afterPayValue.re_annual_return,
          $scope.re_Benefit_Period_years = afterPayValue.re_Benefit_Period_years,
          $scope.re_unemployment_ins_amnt = afterPayValue.re_unemployment_ins_amnt,
          $scope.company_name = afterPayValue.company_name,
          $scope.address1 = afterPayValue.address1,
          $scope.address2 = afterPayValue.address2,
          $scope.zip_code = afterPayValue.zip_code,
          $scope.zip_city = afterPayValue.zip_city ,
          $scope.company_estab = afterPayValue.company_estab,
          $scope.company_ID = afterPayValue.company_ID ,
          $scope.comany_insurance = afterPayValue.comany_insurance,
          $scope.Convention_collective = afterPayValue.Convention_collective ,
                                //var dateObject = new Date("January 31, 2015");//"31.01.2015";
          $scope.payroll_date = afterPayValue.payroll_date ,
          $scope.payroll_period = afterPayValue.payroll_period ,
          $scope.payroll_start = afterPayValue.payroll_start ,
          $scope.payroll_end = afterPayValue.payroll_end ,
                                //console.log('Date is ',$scope.payroll_end);
          $scope.employ_ID = afterPayValue.employ_ID ,
          $scope.employ_name = afterPayValue.employ_name,
          $scope.employ_address1 = afterPayValue.employ_address1,
          $scope.employ_address2 = afterPayValue.employ_address2,
          $scope.employ_zip = afterPayValue.employ_zip,
          $scope.employ_city = afterPayValue.employ_city,
          $scope.employ_role = afterPayValue.employ_role,
          $scope.re_Voluntary_payment_retirement = afterPayValue.re_Voluntary_payment_retirement,
          $scope.re_NDF = afterPayValue.re_NDF
    } else {
        $scope.paymentStatus = false;
    }

    //$scope.paymentStatus = true;
    $scope.payment = function() {
        if (!paymentToken || !payerId) {

            $scope.disablePdf = true;
            $scope.pdfButton = "Veuillez patienter..";
            $http.get('/payment')
                .success(function(response) {
                    //console.log('success ', response);
                    $scope.paymentStatus = true;
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

payApp.factory("LS", function($window, $rootScope) {
  angular.element($window).on('storage', function(event) {
    if (event.key === 'pdfValues') {
      $rootScope.$apply();
    }
  });
  return {
    setData: function(val) {
      $window.localStorage && $window.localStorage.setItem('pdfValues', JSON.stringify(val));
      return this;
    },
    getData: function() {
      return $window.localStorage && $window.localStorage.getItem('pdfValues');
    }
  };
});
