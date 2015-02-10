
$(window).load(function() { 
  // $('.downloadPdf').click(function(){ 
//var pdfData = 0;
 //   $.download('http://localhost/pdf.php','filename=myPDF&format=pdf&content=' + pdfData );
    //pdfMake.createPdf(dd).download('payroll.pdf');
    // $.ajax({
    //   url:"http://localhost/pdf.php",
    //   type:"GET",
    //   success:function(response) {
    //     console.log(response);
    //     //window.location = window.location;
    //   },error: function(err,txt) {
    //     console.log(err,txt);
    //   }
    // })
 //});

var dd,
company_name,
address1,
address2,
zip_code,
company_estab,
company_ID,
comany_insurance,
Code_NAF,
Convention_collective,
payroll_date,
payroll_period,
payroll_start,
payroll_end,
employ_name,
employ_ID,
employ_address1,
employ_address2,
employ_zip,
employ_role,
base_dur,
base_activity,
base_sal,
health_ins,
category,
disability_ins,
oldage_ins,
re_Rate2_HIns,
re_tax_HI,
re_cot_pat_HI,
re_amount_ins,
re_cot_pat_ins,
re_base_HIns,
re_amount_HIns,
re_Rate2_Ins,
re_Rate_Ins,
re_Base_PHI,
re_Rate2_PHI,
re_cot_pat_PHI,
re_amount_GSC,
re_Rate_GSC,
re_Rate_CRTSD,
re_amount_CRTSD,
re_Rate_MC,
re_cot_pat_MC,
re_Rate_CI,
re_cot_pat_CI,
re_Rate_PP,
re_cot_pat_PP,
re_amount_PE,
re_Rate_PE,
re_Rate_PE2,
re_cot_pat_PE,
re_Rate_AREG,
re_cot_pat_AREG,
re_Rate_AEE,
re_Rate_AEE2,
re_amount_AEE,
re_cot_pat_AEE,
re_base_Capped_pension_ins,
re_Rate_Old_Age_Ins,
re_amount_Old_Age_Ins,
re_Rate2_Old_Age_Ins,
re_cot_Pat_Old_Age_Ins,
re_amount_AV_P,
re_cot_pat_AV_P,
re_Rate_AV_P,
re_Rate2_AV_P ,
re_Rate_AV_DP,
re_Rate2_AV_DP ,
re_amount_AV_DP,
re_cot_pat_AV_DP,
re_Rate_ARRCO_T1,
re_Rate2_ARRCO_T1,
re_amount_ARRCO_T1,
re_cot_pat_ARRCO_T1,
re_Rate_ARRCO_T2,
re_Rate2_ARRCO_T2,
re_amount_ARRCO_T2 ,
re_cot_pat_ARRCO_T2 ,
re_base_Complementary_Pensions_eT2,
re_Rate_ARRCO_TB ,
re_Rate2_ARRCO_TB ,
re_amount_ARRCO_TB,
re_cot_pat_ARRCO_TB,
re_base_Pension_Institutions_Fra_TB ,
re_Rate_ARRCO_TC,
re_Rate2_ARRCO_TC,
re_amount_ARRCO_TC,
re_cot_pat_ARRCO_TC,
re_Rate_CET ,
re_Rate2_CET,
re_amount_CET ,
re_cot_pat_CET ,
re_Rate_AGFF_T1,
re_Rate2_AGFF2_T1,
re_amount_AGFF_T1,
re_cot_pat_AGFF_T1,
re_Rate_AGFF_T2,
re_Rate2_AGFF2_T2,
re_amount_AGFF_T2 ,
re_cot_pat_AGFF_T2 ,
re_Rate_FAC ,
re_cot_pat_FAC,
re_Rate_ASC ,
re_cot_pat_ASC,
re_base_NHAF ,
re_Rate_NHAF ,
re_cot_pat_NHAF,
re_base_SP,
re_Rate_SP ,
re_cot_pat_SP ,
re_cot_pat_OTAE ,
re_Rate_OTAE ,
re_OTAE ,
re_Rate_PT ,
re_cot_pat_PT,
re_cot_pat_AD ,
re_wages_costs ,
re_OSSC ,
re_Rate_OSSC,
re_cot_pat_OSSC ,
re_Patron_Charges,
re_Payment_URSAFF ,
re_Payment_AGIRC_ARRCO ,
re_Private_Mutual_Pay ,
re_Net_Cash ,
re_Net_taxable,
re_Total_wages,
re_oldage_ins_base ,
re_cot_pat_UI ,
re_amount_UI,
re_Rate_UI,
re_Rate2_UI ,
re_base_UI;

EveryOneSec();

  function EveryOneSec() {
  
  //gethyt();
  setTimeout(EveryOneSec, 1000);





}

// var scope = angular.element(document.getElementById("base_dur")).scope();


 $(".toggler").click(function(){
        $(".theme-options").toggle();
    });

 $(".toggler-close").click(function(){
    $( ".theme-options" ).hide();
    });
 
gethyt(); 
});

function gethyt() {

if ($(window).width() < 767) {   
    //alert('call');
$(".body-table").each(function() {
    var h = $(this).height(); 
    $(this).children().css("min-height", h);


});

}

}
$(window).resize(function() {
  if ($(window).width() < 767) {  
$(".body-table").each(function() {
    $(".body-table").children().css("min-height", "5px");
});
}
gethyt(); 
});

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function updatePDFValues(){
  var scope_company_name = angular.element(document.getElementById("company_name")).scope();
  company_name = scope_company_name.company_name;

  var scope_address1 = angular.element(document.getElementById("address1")).scope();
  address1 = scope_address1.address1;

  var scope_address2 = angular.element(document.getElementById("address2")).scope();
  address2 = scope_address2.address2;

  var scope_zip_code = angular.element(document.getElementById("zip_code")).scope();
  zip_code = scope_zip_code.zip_code;

  var scope_company_estab = angular.element(document.getElementById("company_estab")).scope();
  company_estab = scope_company_estab.company_estab;

  var scope_company_ID = angular.element(document.getElementById("company_ID")).scope();
  company_ID = scope_company_ID.company_ID;

  var scope_comany_insurance = angular.element(document.getElementById("comany_insurance")).scope();
  comany_insurance = scope_comany_insurance.comany_insurance;

  var scope_Code_NAF = angular.element(document.getElementById("Code_NAF")).scope();
  Code_NAF = scope_Code_NAF.Code_NAF;

  var scope_Convention_collective = angular.element(document.getElementById("Convention_collective")).scope();
  Convention_collective = scope_Convention_collective.Convention_collective;

  var scope_payroll_date = angular.element(document.getElementById("payroll_date")).scope();
  payroll_date = scope_payroll_date.payroll_date;

  var scope_payroll_period = angular.element(document.getElementById("payroll_period")).scope();
  payroll_period = scope_payroll_period.payroll_period;

  var scope_payroll_start = angular.element(document.getElementById("payroll_start")).scope();
  payroll_start = scope_payroll_start.payroll_start;

  var scope_payroll_end = angular.element(document.getElementById("payroll_end")).scope();
  payroll_end = scope_payroll_end.payroll_end;

  var scope_employ_ID = angular.element(document.getElementById("employ_ID")).scope();
  employ_ID = scope_employ_ID.employ_ID;

  var scope_employ_name = angular.element(document.getElementById("employ_name")).scope();
  employ_name = scope_employ_name.employ_name;

  var scope_employ_address1 = angular.element(document.getElementById("employ_address1")).scope();
  employ_address1 = scope_employ_address1.employ_address1;

  var scope_employ_address2 = angular.element(document.getElementById("employ_address2")).scope();
  employ_address2 = scope_employ_address2.employ_address2;

  var scope_employ_zip = angular.element(document.getElementById("employ_zip")).scope();
  employ_zip = scope_employ_zip.employ_zip;

  var scope_company_estab = angular.element(document.getElementById("employ_role")).scope();
  company_estab = scope_company_estab.employ_role;

  var scope_base_dur = angular.element(document.getElementById("base_dur")).scope();
  base_dur = scope_base_dur.base_dur;

  var scope_base_activity = angular.element(document.getElementById("base_activity")).scope();
  base_activity = scope_base_activity.base_activity;

  var scope_base_sal = angular.element(document.getElementById("base_sal")).scope();
  base_sal = scope_base_sal.base_sal;

  var scope_health_ins = angular.element(document.getElementById("health_ins")).scope();
  health_ins = scope_health_ins.health_ins;

  var scope_disability_ins = angular.element(document.getElementById("disability_ins")).scope();
  disability_ins = scope_base_activity.disability_ins;
  
  var scope_category = angular.element(document.getElementById("category")).scope();
  category = scope_category.category;

  if(category == "1") {
    category = "Non cadre";
  }else if(category == "2"){
    category = "Cadre";
  }else {
    category = "Mandataire social";
  }

  var scope_oldage_ins = angular.element(document.getElementById("oldage_ins")).scope();
  oldage_ins = scope_base_sal.oldage_ins;

  // var scope_base_sal = angular.element(document.getElementById("base_sal")).scope();
  // base_sal = scope_base_sal.base_sal;

  var scope_re_Rate2_HIns = angular.element(document.getElementById("re_Rate2_HIns")).scope();
  re_Rate2_HIns = scope_re_Rate2_HIns.re_Rate2_HIns;

  var scope_re_tax_HI = angular.element(document.getElementById("re_tax_HI")).scope();
  re_tax_HI = scope_re_tax_HI.re_tax_HI;

  var scope_re_cot_pat_HI = angular.element(document.getElementById("re_cot_pat_HI")).scope();
  re_cot_pat_HI = scope_re_cot_pat_HI.re_cot_pat_HI;

  var scope_re_amount_ins = angular.element(document.getElementById("re_amount_ins")).scope();
  re_amount_ins = scope_re_amount_ins.re_amount_ins;

  var scope_re_cot_pat_ins = angular.element(document.getElementById("re_cot_pat_ins")).scope();
  re_cot_pat_ins = scope_re_cot_pat_ins.re_cot_pat_ins;

  var scope_re_base_HIns = angular.element(document.getElementById("re_base_HIns")).scope();
  re_base_HIns = scope_re_base_HIns.re_base_HIns;

  var scope_re_amount_HIns = angular.element(document.getElementById("re_amount_HIns")).scope();
  re_amount_HIns = scope_re_amount_HIns.re_amount_HIns;


  var scope_re_Rate2_Ins = angular.element(document.getElementById("re_Rate2_Ins")).scope();
  re_Rate2_Ins = scope_re_Rate2_Ins.re_Rate2_Ins;

  var scope_re_Rate_Ins = angular.element(document.getElementById("re_Rate_Ins")).scope();
  re_Rate_Ins = scope_re_Rate_Ins.re_Rate_Ins;

  var scope_re_Base_PHI = angular.element(document.getElementById("re_Base_PHI")).scope();
  re_Base_PHI = scope_re_Base_PHI.re_Base_PHI;

  var scope_oldage_ins = angular.element(document.getElementById("oldage_ins")).scope();
  oldage_ins = scope_oldage_ins.oldage_ins;

  var scope_re_Rate2_PHI = angular.element(document.getElementById("re_Rate2_PHI")).scope();
  re_Rate2_PHI = scope_re_Rate2_PHI.re_Rate2_PHI;

  var scope_re_cot_pat_PHI = angular.element(document.getElementById("re_cot_pat_PHI")).scope();
  re_cot_pat_PHI = scope_re_cot_pat_PHI.re_cot_pat_PHI;

  var scope_re_amount_GSC = angular.element(document.getElementById("re_amount_GSC")).scope();
  re_amount_GSC = scope_re_amount_GSC.re_amount_GSC;

  var scope_re_Rate_GSC = angular.element(document.getElementById("re_Rate_GSC")).scope();
  re_Rate_GSC = scope_re_Rate_GSC.re_Rate_GSC;

  var scope_re_Rate_CRTSD = angular.element(document.getElementById("re_Rate_CRTSD")).scope();
  re_Rate_CRTSD = scope_re_Rate_CRTSD.re_Rate_CRTSD;

  var scope_re_amount_CRTSD = angular.element(document.getElementById("re_amount_CRTSD")).scope();
  re_amount_CRTSD = scope_re_amount_CRTSD.re_amount_CRTSD;

  var scope_re_Rate_MC = angular.element(document.getElementById("re_Rate_MC")).scope();
  re_Rate_MC = scope_re_Rate_MC.re_Rate_MC;

  var scope_re_cot_pat_MC = angular.element(document.getElementById("re_cot_pat_MC")).scope();
  re_cot_pat_MC = scope_re_cot_pat_MC.re_cot_pat_MC;

  var scope_re_Rate_CI = angular.element(document.getElementById("re_Rate_CI")).scope();
  re_Rate_CI = scope_re_Rate_CI.re_Rate_CI;

  var scope_re_cot_pat_CI = angular.element(document.getElementById("re_cot_pat_CI")).scope();
  re_cot_pat_CI = scope_re_cot_pat_CI.re_cot_pat_CI;

//  var scope_re_Rate_PP = angular.element(document.getElementById("re_Rate_PP")).scope();
  re_Rate_PP = ''//scope_re_Rate_PP.re_Rate_PP;

  //var scope_re_cot_pat_PP = angular.element(document.getElementById("re_cot_pat_PP")).scope();
  re_cot_pat_PP = ''//scope_re_cot_pat_PP.re_cot_pat_PP;

  var scope_re_amount_PE = angular.element(document.getElementById("re_amount_PE")).scope();
  re_amount_PE = scope_re_amount_PE.re_amount_PE;

  var scope_re_Rate_PE = angular.element(document.getElementById("re_Rate_PE")).scope();
  re_Rate_PE = scope_re_Rate_PE.re_Rate_PE;

  var scope_re_Rate_PE2 = angular.element(document.getElementById("re_Rate_PE2")).scope();
  re_Rate_PE2 = scope_re_Rate_PE2.re_Rate_PE2;

  var scope_re_cot_pat_PE = angular.element(document.getElementById("re_cot_pat_PE")).scope();
  re_cot_pat_PE = scope_re_cot_pat_PE.re_cot_pat_PE;

  var scope_re_Rate_AREG = angular.element(document.getElementById("re_Rate_AREG")).scope();
  re_Rate_AREG = scope_re_Rate_AREG.re_Rate_AREG;

  var scope_re_cot_pat_AREG = angular.element(document.getElementById("re_cot_pat_AREG")).scope();
  re_cot_pat_AREG = scope_re_cot_pat_AREG.re_cot_pat_AREG;

  var scope_re_Rate_AEE = angular.element(document.getElementById("re_Rate_AEE")).scope();
  re_Rate_AEE = scope_re_Rate_AEE.re_Rate_AEE;

  var scope_re_Rate_AEE2 = angular.element(document.getElementById("re_Rate_AEE2")).scope();
  re_Rate_AEE2 = scope_re_Rate_AEE2.re_Rate_AEE2;

  var scope_re_amount_AEE = angular.element(document.getElementById("re_amount_AEE")).scope();
  re_amount_AEE = scope_re_amount_AEE.re_amount_AEE;

  var scope_re_cot_pat_AEE = angular.element(document.getElementById("re_cot_pat_AEE")).scope();
  re_cot_pat_AEE = scope_re_cot_pat_AEE.re_cot_pat_AEE;

  var scope_re_base_Capped_pension_ins = angular.element(document.getElementById("re_base_Capped_pension_ins")).scope();
  re_base_Capped_pension_ins = scope_re_base_Capped_pension_ins.re_base_Capped_pension_ins;

  var scope_re_Rate_Old_Age_Ins = angular.element(document.getElementById("re_Rate_Old_Age_Ins")).scope();
  re_Rate_Old_Age_Ins = scope_re_Rate_Old_Age_Ins.re_Rate_Old_Age_Ins;

  var scope_re_amount_Old_Age_Ins = angular.element(document.getElementById("re_amount_Old_Age_Ins")).scope();
  re_amount_Old_Age_Ins = scope_re_amount_Old_Age_Ins.re_amount_Old_Age_Ins;

  var scope_re_Rate2_Old_Age_Ins = angular.element(document.getElementById("re_Rate2_Old_Age_Ins")).scope();
  re_Rate2_Old_Age_Ins = scope_re_Rate2_Old_Age_Ins.re_Rate2_Old_Age_Ins;

  var scope_re_cot_Pat_Old_Age_Ins = angular.element(document.getElementById("re_cot_Pat_Old_Age_Ins")).scope();
  re_cot_Pat_Old_Age_Ins = scope_re_cot_Pat_Old_Age_Ins.re_cot_Pat_Old_Age_Ins;

  var scope_re_amount_AV_P = angular.element(document.getElementById("re_amount_AV_P")).scope();
  re_amount_AV_P = scope_re_amount_AV_P.re_amount_AV_P;

  var scope_re_cot_pat_AV_P = angular.element(document.getElementById("re_cot_pat_AV_P")).scope();
  re_cot_pat_AV_P = scope_re_cot_pat_AV_P.re_cot_pat_AV_P;

  var scope_re_Rate_AV_P = angular.element(document.getElementById("re_Rate_AV_P")).scope();
  re_Rate_AV_P = scope_re_Rate_AV_P.re_Rate_AV_P;

  var scope_re_Rate2_AV_P = angular.element(document.getElementById("re_Rate2_AV_P")).scope();
  re_Rate2_AV_P = scope_re_Rate2_AV_P.re_Rate2_AV_P;

  var scope_re_Rate_AV_DP = angular.element(document.getElementById("re_Rate_AV_DP")).scope();
  re_Rate_AV_DP = scope_re_Rate_AV_DP.re_Rate_AV_DP;

  var scope_re_Rate2_AV_DP = angular.element(document.getElementById("re_Rate2_AV_DP")).scope();
  re_Rate2_AV_DP = scope_re_Rate2_AV_DP.re_Rate2_AV_DP;

  var scope_re_amount_AV_DP = angular.element(document.getElementById("re_amount_AV_DP")).scope();
  re_amount_AV_DP = scope_re_amount_AV_DP.re_amount_AV_DP;

  var scope_re_cot_pat_AV_DP = angular.element(document.getElementById("re_cot_pat_AV_DP")).scope();
  re_cot_pat_AV_DP = scope_re_cot_pat_AV_DP.re_cot_pat_AV_DP;

  var scope_re_Rate_ARRCO_T1 = angular.element(document.getElementById("re_Rate_ARRCO_T1")).scope();
  re_Rate_ARRCO_T1 = scope_re_Rate_ARRCO_T1.re_Rate_ARRCO_T1;

  var scope_re_Rate2_ARRCO_T1 = angular.element(document.getElementById("re_Rate2_ARRCO_T1")).scope();
  re_Rate2_ARRCO_T1 = scope_re_Rate2_ARRCO_T1.re_Rate2_ARRCO_T1;

  var scope_re_amount_ARRCO_T1 = angular.element(document.getElementById("re_amount_ARRCO_T1")).scope();
  re_amount_ARRCO_T1 = scope_re_amount_ARRCO_T1.re_amount_ARRCO_T1;

  var scope_re_cot_pat_ARRCO_T1 = angular.element(document.getElementById("re_cot_pat_ARRCO_T1")).scope();
  re_cot_pat_ARRCO_T1 = scope_re_cot_pat_ARRCO_T1.re_cot_pat_ARRCO_T1;

  var scope_re_Rate_ARRCO_T2 = angular.element(document.getElementById("re_Rate_ARRCO_T2")).scope();
  re_Rate_ARRCO_T2 = scope_re_Rate_ARRCO_T2.re_Rate_ARRCO_T2;

  var scope_re_Rate2_ARRCO_T2 = angular.element(document.getElementById("re_Rate2_ARRCO_T2")).scope();
  re_Rate2_ARRCO_T2 = scope_re_Rate2_ARRCO_T2.re_Rate2_ARRCO_T2;

  var scope_re_amount_ARRCO_T2 = angular.element(document.getElementById("re_amount_ARRCO_T2")).scope();
  re_amount_ARRCO_T2 = scope_re_amount_ARRCO_T2.re_amount_ARRCO_T2;

  var scope_re_cot_pat_ARRCO_T2 = angular.element(document.getElementById("re_cot_pat_ARRCO_T2")).scope();
  re_cot_pat_ARRCO_T2 = scope_re_cot_pat_ARRCO_T2.re_cot_pat_ARRCO_T2;

  var scope_re_base_Complementary_Pensions_eT2 = angular.element(document.getElementById("re_base_Complementary_Pensions_eT2")).scope();
  re_base_Complementary_Pensions_eT2 = scope_re_base_Complementary_Pensions_eT2.re_base_Complementary_Pensions_eT2;

  var scope_re_Rate_ARRCO_TB = angular.element(document.getElementById("re_Rate_ARRCO_TB")).scope();
  re_Rate_ARRCO_TB = scope_re_Rate_ARRCO_TB.re_Rate_ARRCO_TB;

  var scope_re_Rate2_ARRCO_TB = angular.element(document.getElementById("re_Rate2_ARRCO_TB")).scope();
  re_Rate2_ARRCO_TB = scope_re_Rate2_ARRCO_TB.re_Rate2_ARRCO_TB;

  var scope_re_amount_ARRCO_TB = angular.element(document.getElementById("re_amount_ARRCO_TB")).scope();
  re_amount_ARRCO_TB = scope_re_amount_ARRCO_TB.re_amount_ARRCO_TB;

  var scope_re_cot_pat_ARRCO_TB = angular.element(document.getElementById("re_cot_pat_ARRCO_TB")).scope();
  re_cot_pat_ARRCO_TB = scope_re_cot_pat_ARRCO_TB.re_cot_pat_ARRCO_TB;

  var scope_re_base_Pension_Institutions_Fra_TB = angular.element(document.getElementById("re_base_Pension_Institutions_Fra_TB")).scope();
  re_base_Pension_Institutions_Fra_TB = scope_re_base_Pension_Institutions_Fra_TB.re_base_Pension_Institutions_Fra_TB;

  var scope_re_Rate_ARRCO_TC = angular.element(document.getElementById("re_Rate_ARRCO_TC")).scope();
  re_Rate_ARRCO_TC = scope_re_Rate_ARRCO_TC.re_Rate_ARRCO_TC;

  var scope_re_Rate2_ARRCO_TC = angular.element(document.getElementById("re_Rate2_ARRCO_TC")).scope();
  re_Rate2_ARRCO_TC = scope_re_Rate2_ARRCO_TC.re_Rate2_ARRCO_TC;

  var scope_re_amount_ARRCO_TC = angular.element(document.getElementById("re_amount_ARRCO_TC")).scope();
  re_amount_ARRCO_TC = scope_re_amount_ARRCO_TC.re_amount_ARRCO_TC;

  var scope_re_cot_pat_ARRCO_TC = angular.element(document.getElementById("re_cot_pat_ARRCO_TC")).scope();
  re_cot_pat_ARRCO_TC = scope_re_cot_pat_ARRCO_TC.re_cot_pat_ARRCO_TC;

  var scope_re_Rate_CET = angular.element(document.getElementById("re_Rate_CET")).scope();
  re_Rate_CET = scope_re_Rate_CET.re_Rate_CET;

  var scope_re_Rate2_CET = angular.element(document.getElementById("re_Rate2_CET")).scope();
  re_Rate2_CET = scope_re_Rate2_CET.re_Rate2_CET;

  var scope_re_amount_CET = angular.element(document.getElementById("re_amount_CET")).scope();
  re_amount_CET = scope_re_amount_CET.re_amount_CET;

  var scope_re_cot_pat_CET = angular.element(document.getElementById("re_cot_pat_CET")).scope();
  re_cot_pat_CET = scope_re_cot_pat_CET.re_cot_pat_CET;

  var scope_re_Rate_AGFF_T1 = angular.element(document.getElementById("re_Rate_AGFF_T1")).scope();
  re_Rate_AGFF_T1 = scope_re_Rate_AGFF_T1.re_Rate_AGFF_T1;

  var scope_re_Rate2_AGFF2_T1 = angular.element(document.getElementById("re_Rate2_AGFF2_T1")).scope();
  re_Rate2_AGFF2_T1 = scope_re_Rate2_AGFF2_T1.re_Rate2_AGFF2_T1;

  var scope_re_amount_AGFF_T1 = angular.element(document.getElementById("re_amount_AGFF_T1")).scope();
  re_amount_AGFF_T1 = scope_re_amount_AGFF_T1.re_amount_AGFF_T1;

  var scope_re_cot_pat_AGFF_T1 = angular.element(document.getElementById("re_cot_pat_AGFF_T1")).scope();
  re_cot_pat_AGFF_T1 = scope_re_cot_pat_AGFF_T1.re_cot_pat_AGFF_T1;

  var scope_re_Rate_AGFF_T2 = angular.element(document.getElementById("re_Rate_AGFF_T2")).scope();
  re_Rate_AGFF_T2 = scope_re_Rate_AGFF_T2.re_Rate_AGFF_T2;

  var scope_re_Rate2_AGFF2_T2 = angular.element(document.getElementById("re_Rate2_AGFF2_T2")).scope();
  re_Rate2_AGFF2_T2 = scope_re_Rate2_AGFF2_T2.re_Rate2_AGFF2_T2;

  var scope_re_amount_AGFF_T2 = angular.element(document.getElementById("re_amount_AGFF_T2")).scope();
  re_amount_AGFF_T2 = scope_re_amount_AGFF_T2.re_amount_AGFF_T2; 

  var scope_re_cot_pat_AGFF_T2 = angular.element(document.getElementById("re_cot_pat_AGFF_T2")).scope();
  re_cot_pat_AGFF_T2 = scope_re_cot_pat_AGFF_T2.re_cot_pat_AGFF_T2;

  var scope_re_Rate_FAC = angular.element(document.getElementById("re_Rate_FAC")).scope();
  re_Rate_FAC = scope_re_Rate_FAC.re_Rate_FAC;

  var scope_re_cot_pat_FAC = angular.element(document.getElementById("re_cot_pat_FAC")).scope();
  re_cot_pat_FAC = scope_re_cot_pat_FAC.re_cot_pat_FAC;

  var scope_re_Rate_ASC = angular.element(document.getElementById("re_Rate_ASC")).scope();
  re_Rate_ASC = scope_re_Rate_ASC.re_Rate_ASC;

  var scope_re_cot_pat_ASC = angular.element(document.getElementById("re_cot_pat_ASC")).scope();
  re_cot_pat_ASC = scope_re_cot_pat_ASC.re_cot_pat_ASC;

  var scope_re_base_NHAF = angular.element(document.getElementById("re_base_NHAF")).scope();
  re_base_NHAF = scope_re_base_NHAF.re_base_NHAF;

  var scope_re_Rate_NHAF = angular.element(document.getElementById("re_Rate_NHAF")).scope();
  re_Rate_NHAF = scope_re_Rate_NHAF.re_Rate_NHAF;

  var scope_re_cot_pat_NHAF = angular.element(document.getElementById("re_cot_pat_NHAF")).scope();
  re_cot_pat_NHAF = scope_re_cot_pat_NHAF.re_cot_pat_NHAF;

  var scope_re_base_SP = angular.element(document.getElementById("re_base_SP")).scope();
  re_base_SP = scope_re_base_SP.re_base_SP;

  var scope_re_Rate_SP = angular.element(document.getElementById("re_Rate_SP")).scope();
  re_Rate_SP = scope_re_Rate_SP.re_Rate_SP;

  var scope_re_cot_pat_SP = angular.element(document.getElementById("re_cot_pat_SP")).scope();
  re_cot_pat_SP = scope_re_cot_pat_SP.re_cot_pat_SP;

  var scope_re_cot_pat_OTAE = angular.element(document.getElementById("re_cot_pat_OTAE")).scope();
  re_cot_pat_OTAE = scope_re_cot_pat_OTAE.re_cot_pat_OTAE;

  var scope_re_Rate_OTAE = angular.element(document.getElementById("re_Rate_OTAE")).scope();
  re_Rate_OTAE = scope_re_Rate_OTAE.re_Rate_OTAE;

  var scope_re_OTAE = angular.element(document.getElementById("re_OTAE")).scope();
  re_OTAE = scope_re_OTAE.re_OTAE;

  var scope_re_Rate_PT = angular.element(document.getElementById("re_Rate_PT")).scope();
  re_Rate_PT = scope_re_Rate_PT.re_Rate_PT;

  var scope_re_cot_pat_PT = angular.element(document.getElementById("re_cot_pat_PT")).scope();
  re_cot_pat_PT = scope_re_cot_pat_PT.re_cot_pat_PT;

  //var scope_re_cot_pat_AD = angular.element(document.getElementById("re_cot_pat_AD")).scope();
  re_cot_pat_AD = ''//scope_re_cot_pat_AD.re_cot_pat_AD;

  var scope_re_wages_costs = angular.element(document.getElementById("re_wages_costs")).scope();
  re_wages_costs = scope_re_wages_costs.re_wages_costs;

  var scope_re_OSSC = angular.element(document.getElementById("re_OSSC")).scope();
  re_OSSC = scope_re_OSSC.re_OSSC;

  var scope_re_Rate_OSSC = angular.element(document.getElementById("re_Rate_OSSC")).scope();
  re_Rate_OSSC = scope_re_Rate_OSSC.re_Rate_OSSC;

  var scope_re_cot_pat_OSSC = angular.element(document.getElementById("re_cot_pat_OSSC")).scope();
  re_cot_pat_OSSC = scope_re_cot_pat_OSSC.re_cot_pat_OSSC;

  var scope_re_Patron_Charges = angular.element(document.getElementById("re_Patron_Charges")).scope();
  re_Patron_Charges = scope_re_Patron_Charges.re_Patron_Charges;

  var scope_re_Payment_URSAFF = angular.element(document.getElementById("re_Payment_URSAFF")).scope();
  re_Payment_URSAFF = scope_re_Payment_URSAFF.re_Payment_URSAFF;

  var scope_re_Payment_AGIRC_ARRCO = angular.element(document.getElementById("re_Payment_AGIRC_ARRCO")).scope();
  re_Payment_AGIRC_ARRCO = scope_re_Payment_AGIRC_ARRCO.re_Payment_AGIRC_ARRCO;

  var scope_re_Private_Mutual_Pay = angular.element(document.getElementById("re_Private_Mutual_Pay")).scope();
  re_Private_Mutual_Pay = scope_re_Private_Mutual_Pay.re_Private_Mutual_Pay;

  var scope_re_Net_Cash = angular.element(document.getElementById("re_Net_Cash")).scope();
  re_Net_Cash = scope_re_Net_Cash.re_Net_Cash;

  var scope_re_Net_taxable = angular.element(document.getElementById("re_Net_taxable")).scope();
  re_Net_taxable = scope_re_Net_taxable.re_Net_taxable;

  var scope_re_Total_wages = angular.element(document.getElementById("re_Total_wages")).scope();
  re_Total_wages = scope_re_Total_wages.re_Total_wages;

  var scope_re_oldage_ins_base = angular.element(document.getElementById("re_oldage_ins_base")).scope();
  re_oldage_ins_base = scope_re_oldage_ins_base.re_oldage_ins_base;

  var scope_re_cot_pat_UI = angular.element(document.getElementById("re_cot_pat_UI")).scope();
  re_cot_pat_UI = scope_re_cot_pat_UI.re_cot_pat_UI;

  var scope_re_amount_UI = angular.element(document.getElementById("re_amount_UI")).scope();
  re_amount_UI = scope_re_amount_UI.re_amount_UI;

  var scope_re_Rate_UI = angular.element(document.getElementById("re_Rate_UI")).scope();
  re_Rate_UI = scope_re_Rate_UI.re_Rate_UI;

  var scope_re_Rate2_UI = angular.element(document.getElementById("re_Rate2_UI")).scope();
  re_Rate2_UI = scope_re_Rate2_UI.re_Rate2_UI;

  var scope_re_base_UI = angular.element(document.getElementById("re_base_UI")).scope();
  re_base_UI = scope_re_base_UI.re_base_UI;




  console.log('Compnay ', address2);
//     $.ajax({
//       url:"http://localhost/pdf.php",
//       type:"GET",
//       data:{
//         'company_name':company_name,
// 'address1':address1,
// 'address2':address2,
// 'zip_code':zip_code,
// 'company_estab':company_estab,
// 'company_ID':company_ID,
// 'comany_insurance':comany_insurance,
// 'Code_NAF':Code_NAF,
// 'Convention_collective':Convention_collective,
// 'payroll_date':payroll_date,
// 'payroll_period':payroll_period,
// 'payroll_start':payroll_start,
// 'payroll_end':payroll_end,
// 'employ_name':employ_name,
// 'employ_ID':employ_ID,
// 'employ_address1':employ_address1,
// 'employ_address2':employ_address2,
// 'employ_zip':employ_zip,
// 'employ_role':employ_role,
// 'base_dur':base_dur,
// 'base_activity':base_activity,
// 'base_sal':base_sal,
// 'health_ins':health_ins,
// 'category':category,
// 'disability_ins':disability_ins,
// 'oldage_ins':oldage_ins,
// 're_Rate2_HIns':re_Rate2_HIns,
// 're_tax_HI':re_tax_HI,
// 're_cot_pat_HI':re_cot_pat_HI,
// 're_amount_ins':re_amount_ins,
// 're_cot_pat_ins':re_cot_pat_ins,
// 're_base_HIns':re_base_HIns,
// 're_amount_HIns':re_amount_HIns,
// 're_Rate2_Ins':re_Rate2_Ins,
// 're_Rate_Ins':re_Rate_Ins,
// 're_Base_PHI':re_Base_PHI,
// 're_Rate2_PHI':re_Rate2_PHI,
// 're_cot_pat_PHI':re_cot_pat_PHI,
// 're_amount_GSC':re_amount_GSC,
// 're_Rate_GSC':re_Rate_GSC,
// 're_Rate_CRTSD':re_Rate_CRTSD,
// 're_amount_CRTSD':re_amount_CRTSD,
// 're_Rate_MC':re_Rate_MC,
// 're_cot_pat_MC':re_cot_pat_MC,
// 're_Rate_CI':re_Rate_CI,
// 're_cot_pat_CI':re_cot_pat_CI,
// //re_Rate_PP:re_Rate_PP,
// //re_cot_pat_PP:re_cot_pat_PP,
// 're_amount_PE':re_amount_PE,
// 're_Rate_PE':re_Rate_PE,
// 're_Rate_PE2':re_Rate_PE2,
// 're_cot_pat_PE':re_cot_pat_PE,
// 're_Rate_AREG':re_Rate_AREG,
// 're_cot_pat_AREG':re_cot_pat_AREG,
// 're_Rate_AEE':re_Rate_AEE,
// 're_Rate_AEE2':re_Rate_AEE2,
// 're_amount_AEE':re_amount_AEE,
// 're_cot_pat_AEE':re_cot_pat_AEE,
// 're_base_Capped_pension_ins':re_base_Capped_pension_ins,
// 're_Rate_Old_Age_Ins':re_Rate_Old_Age_Ins,
// 're_amount_Old_Age_Ins':re_amount_Old_Age_Ins,
// 're_Rate2_Old_Age_Ins':re_Rate2_Old_Age_Ins,
// 're_cot_Pat_Old_Age_Ins':re_cot_Pat_Old_Age_Ins,
// 're_amount_AV_P':re_amount_AV_P,
// 're_cot_pat_AV_P':re_cot_pat_AV_P,
// 're_Rate_AV_P':re_Rate_AV_P,
// 're_Rate2_AV_P':re_Rate2_AV_P ,
// 're_Rate_AV_DP':re_Rate_AV_DP,
// 're_Rate2_AV_DP':re_Rate2_AV_DP ,
// 're_amount_AV_DP':re_amount_AV_DP,
// 're_cot_pat_AV_DP':re_cot_pat_AV_DP,
// 're_Rate_ARRCO_T1':re_Rate_ARRCO_T1,
// 're_Rate2_ARRCO_T1':re_Rate2_ARRCO_T1,
// 're_amount_ARRCO_T1':re_amount_ARRCO_T1,
// 're_cot_pat_ARRCO_T1':re_cot_pat_ARRCO_T1,
// 're_Rate_ARRCO_T2':re_Rate_ARRCO_T2,
// 're_Rate2_ARRCO_T2':re_Rate2_ARRCO_T2,
// 're_amount_ARRCO_T2':re_amount_ARRCO_T2 ,
// 're_cot_pat_ARRCO_T2':re_cot_pat_ARRCO_T2 ,
// 're_base_Complementary_Pensions_eT2':re_base_Complementary_Pensions_eT2,
// 're_Rate_ARRCO_TB':re_Rate_ARRCO_TB ,
// 're_Rate2_ARRCO_TB':re_Rate2_ARRCO_TB ,
// 're_amount_ARRCO_TB':re_amount_ARRCO_TB,
// 're_cot_pat_ARRCO_TB':re_cot_pat_ARRCO_TB,
// 're_base_Pension_Institutions_Fra_TB':re_base_Pension_Institutions_Fra_TB ,
// 're_Rate_ARRCO_TC':re_Rate_ARRCO_TC,
// 're_Rate2_ARRCO_TC':re_Rate2_ARRCO_TC,
// 're_amount_ARRCO_TC':re_amount_ARRCO_TC,
// 're_cot_pat_ARRCO_TC':re_cot_pat_ARRCO_TC,
// 're_Rate_CET':re_Rate_CET ,
// 're_Rate2_CET':re_Rate2_CET,
// 're_amount_CET':re_amount_CET ,
// 're_cot_pat_CET':re_cot_pat_CET ,
// 're_Rate_AGFF_T1':re_Rate_AGFF_T1,
// 're_Rate2_AGFF2_T1':re_Rate2_AGFF2_T1,
// 're_amount_AGFF_T1':re_amount_AGFF_T1,
// 're_cot_pat_AGFF_T1':re_cot_pat_AGFF_T1,
// 're_Rate_AGFF_T2':re_Rate_AGFF_T2,
// 're_Rate2_AGFF2_T2':re_Rate2_AGFF2_T2,
// 're_amount_AGFF_T2':re_amount_AGFF_T2 ,
// 're_cot_pat_AGFF_T2':re_cot_pat_AGFF_T2 ,
// 're_Rate_FAC':re_Rate_FAC ,
// 're_cot_pat_FAC':re_cot_pat_FAC,
// 're_Rate_ASC':re_Rate_ASC ,
// 're_cot_pat_ASC':re_cot_pat_ASC,
// 're_base_NHAF':re_base_NHAF ,
// 're_Rate_NHAF':re_Rate_NHAF ,
// 're_cot_pat_NHAF':re_cot_pat_NHAF,
// 're_base_SP':re_base_SP,
// 're_Rate_SP':re_Rate_SP ,
// 're_cot_pat_SP':re_cot_pat_SP ,
// 're_cot_pat_OTAE':re_cot_pat_OTAE ,
// 're_Rate_OTAE':re_Rate_OTAE ,
// 're_OTAE':re_OTAE ,
// 're_Rate_PT':re_Rate_PT ,
// 're_cot_pat_PT':re_cot_pat_PT,
// //re_cot_pat_AD:re_cot_pat_AD ,
// 're_wages_costs':re_wages_costs ,
// 're_OSSC':re_OSSC ,
// 're_Rate_OSSC':re_Rate_OSSC,
// 're_cot_pat_OSSC':re_cot_pat_OSSC ,
// 're_Patron_Charges':re_Patron_Charges,
// 're_Payment_URSAFF':re_Payment_URSAFF ,
// 're_Payment_AGIRC_ARRCO':re_Payment_AGIRC_ARRCO ,
// 're_Private_Mutual_Pay':re_Private_Mutual_Pay ,
// 're_Net_Cash':re_Net_Cash ,
// 're_Net_taxable':re_Net_taxable,
// 're_Total_wages':re_Total_wages,
// 're_oldage_ins_base':re_oldage_ins_base ,
// 're_cot_pat_UI':re_cot_pat_UI ,
// 're_amount_UI':re_amount_UI,
// 're_Rate_UI':re_Rate_UI,
// 're_Rate2_UI':re_Rate2_UI ,
// 're_base_UI':re_base_UI
//       },
//       success:function(response) {
//         console.log(response);
//         return true;
//         //window.location = window.location;
//       },error: function(err,txt) {
//         console.log(err,txt);
//       }
//     })
}