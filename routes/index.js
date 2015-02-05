var express = require('express');
var settingsObj = require('../bin/settings.json');
var router = express.Router();
var paypal = require('paypal-express-checkout').init('mss.naveensharma-facilitator_api1.gmail.com', '1403521583', 'AFcWxV21C7fd0v3bYYYRCpSSRl31AGjelgIYjdIGjGvf2IUyW1bBDw3T', 'https://payroll-calculator.herokuapp.com/', 'https://payroll-calculator.herokuapp.com/', true);



router.get('/', function(req, res) {
  res.render('index', { title: 'Mon Bulletin de Paie' });
});

/*paypal payment*/
router.get('/payment', function(req, res) {
    // debug = optional, default false
    // paypal.pay('Invoice nubmer', amout, 'description', 'currency', callback);
    // checkout
    paypal.pay('20130001', 10, 'Payroll Calculator Payment', 'USD', function(err, paypalUrl) {
        if (err) {
            res.status(500).json({'error':'Invalid'})
        }
        // redirect to paypal webpage
        //console.log(url);
       // var returnValue = {'url':url};
       res.status(200).json({'url':paypalUrl})
    });
});



router.post('/calculate', function(req, res, next) { 
    var base_sal = req.body.base_sal,
        base_activity = req.body.base_activity,
        base_dur = req.body.base_dur,
        oldage_ins = req.body.oldage_ins,
        health_ins = req.body.health_ins,
        disability_ins = req.body.disability_ins,
        category = req.body.category;

        if(category == "1") {
            category = "Non cadre"
        }else if(category == "2") {
            category = "Cadre";
        }else {
            category = "Mandataire social";
        }

    if(typeof base_sal != 'undefined' && typeof base_activity != 'undefined' && typeof base_dur != 'undefined') {

        //set values fron json file
        var PMSS        = settingsObj.PMSS,
            Rate_Ins    = (parseFloat(settingsObj.Rate_Insurance)).toFixed(3),//Rate_Insurance
            Amount_GSC  = (parseFloat(settingsObj.Amount_General_Social_Contribution_tax)).toFixed(4),//Amount_General_Social_Contribution_tax
            Rate_GSC    = (parseFloat(settingsObj.Rate_General_Social_Contribution_tax)).toFixed(3),//Rate_General_Social_Contribution_tax
            Rate_CRTSD  = (parseFloat(settingsObj.Rate_Contribution_Repayment_taxable_Social_Debt)).toFixed(3),//Rate_Contribution_Repayment_taxable_Social_Debt
            Rate2_Ins   = (parseFloat(settingsObj.Rate2_Insurance)).toFixed(3),//Rate2_Insurance
            Rate2_PHI   = (parseFloat(settingsObj.Rate2_Private_health_insurance)).toFixed(3),//Rate2_Private_health_insurance
            Base_PHI    = (parseFloat(settingsObj.Base_Private_health_insurance)).toFixed(3),//Base_Private_health_insurance
            Rate2_MC     = (parseFloat(settingsObj.Rate2_Mutual_complementary)).toFixed(3),//Rate2_Mutual_complementary
            Rate_CI     = (parseFloat(settingsObj.Rate_Contributions_Injuries)).toFixed(3),//Rate_Contributions_Injuries
            Rate2_SS = (parseFloat(settingsObj.Rate2_Supplementary_System)).toFixed(3),//Supplementary_System
            Rate_PP     = (parseFloat(settingsObj.Rate_Private_pensions)).toFixed(3),//Rate_Private_pensions
            Rate_PE     = (parseFloat(settingsObj.Rate_Pole_Emploi)).toFixed(3),//Rate_Pole_Emploi
            Rate2_PE    = (parseFloat(settingsObj.Rate2_Pole_Emploi)).toFixed(3),//Rate2_Pole_Emploi
            Rate2_AREG   = (parseFloat(settingsObj.Rate_Assoc_Reg_Employees_receivables_Guarantee)).toFixed(3),//Rate_Assoc_Reg_Employees_receivables_Guarantee
            Rate_AEE    = (parseFloat(settingsObj.Rate_Association_Executive_Employment)).toFixed(3),//Rate_Association_Executive_Employment
            Rate_AEE2   = (parseFloat(settingsObj.Rate_Association_Executive_Employment2)).toFixed(3),//Rate_Association_Executive_Employment2
            Rate2_ASC    = (parseFloat(settingsObj.Rate2_Autonomy_Solidarity_Contribution)).toFixed(3),//Rate2_Autonomy_Solidarity_Contribution
            Rate2_NHAF   = (parseFloat(settingsObj.Rate2_National_Housing_Aid_Fund)).toFixed(3),//Rate2_National_Housing_Aid_Fund
            Rate_PT     = (parseFloat(settingsObj.Rate2_Payment_Transport)).toFixed(3), //Rate2_Payment_Transport
            settings    = 1,

            Rate_AV_P = (parseFloat(settingsObj.Rate_Capped_pension_insurance)).toFixed(3), //Rate_Capped_pension_insurance
               Rate_AV_DP = (parseFloat(settingsObj.Rate_Deplafonnee_pension_insurance)).toFixed(3),//Rate_Deplafonnee_pension_insurance
            Rate_ARRCO_T1 = (parseFloat(settingsObj.Rate_Assoc_Reg_Complementary_Pensions_employees_T1)).toFixed(3),//Rate_Assoc_Reg_Complementary_Pensions_employees_T1
            Rate_ARRCO_T2 = (parseFloat(settingsObj.Rate_Assoc_Reg_Complementary_Pensions_employees_T2)).toFixed(3),//Rate_Assoc_Reg_Complementary_Pensions_employees_T2
            Rate_ARRCO_TB = (parseFloat(settingsObj.Rate_General_Association_of_Pension_Institutions_Frameworks_TB)).toFixed(3),//Rate_General_Association_of_Pension_Institutions_Frameworks_TB
            Rate_ARRCO_TC = (parseFloat(settingsObj.Rate_General_Association_of_Pension_Institutions_Frameworks_TC)).toFixed(3),//Rate_General_Association_of_Pension_Institutions_Frameworks_TC
                 Rate_CET = (parseFloat(settingsObj.Rate_Exceptional_and_Temporary_Contribution)).toFixed(3),//Rate_Exceptional_and_Temporary_Contribution
             Rate_AGFF_T1 = (parseFloat(settingsObj.Rate_Assoc_for_Gest_End_Fund_T1)).toFixed(3),//Rate_Assoc_for_Gest_End_Fund_T1
             Rate_AGFF_T2 = (parseFloat(settingsObj.Rate_Assoc_for_Gest_End_Fund_T2)).toFixed(3),//Rate_Assoc_for_Gest_End_Fund_T2

             Rate2_AV_P  = (parseFloat(settingsObj.Rate2_Capped_pension_insurance)).toFixed(3),//Rate2_Capped_pension_insurance
                Rate2_AV_DP = (parseFloat(settingsObj.Rate2_Deplafonnee_pension_insurance)).toFixed(3),//Rate2_Deplafonnee_pension_insurance
             Rate2_ARRCO_T1 = (parseFloat(settingsObj.Rate2_Assoc_Reg_Complementary_Pensions_employees_T1)).toFixed(3),//Rate2_Assoc_Reg_Complementary_Pensions_employees_T1
             Rate2_ARRCO_T2 = (parseFloat(settingsObj.Rate2_Assoc_Reg_Complementary_Pensions_employees_T2)).toFixed(3),//Rate2_Assoc_Reg_Complementary_Pensions_employees_T2
             Rate2_ARRCO_TB = (parseFloat(settingsObj.Rate2_General_Association_of_Pension_Institutions_Frameworks_TB)).toFixed(3),//Rate2_General_Association_of_Pension_Institutions_Frameworks_TB
             Rate2_ARRCO_TC = (parseFloat(settingsObj.Rate2_General_Association_of_Pension_Institutions_Frameworks_TC)).toFixed(3),//Rate2_General_Association_of_Pension_Institutions_Frameworks_TC
                  Rate2_CET = (parseFloat(settingsObj.Rate2_Exceptional_and_Temporary_Contribution)).toFixed(3),//Rate2_Exceptional_and_Temporary_Contribution
              Rate2_AGFF_T1 = (parseFloat(settingsObj.Rate2_Assoc_for_Gest_End_Fund_T1)).toFixed(3),//Rate2_Assoc_for_Gest_End_Fund_T1
              Rate2_AGFF_T2 = (parseFloat(settingsObj.Rate2_Assoc_for_Gest_End_Fund_T2)).toFixed(3);//Rate2_Assoc_for_Gest_End_Fund_T2

        // console.log("Rate2_AREG", Rate2_AREG)
        // console.log("Rate2_ARE11G", settingsObj.Rate_Assoc_Reg_Employees_receivables_Guarantee)
        var visible_Ins   = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_Ins1  = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_AV_P  = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_PP    = (disability_ins != 'Rég. Gén.') ? 1 : 0;

        var visible_PE    = (category != 'Mandataire social' && disability_ins != 'Privée') ? 1 : 0;
        var visible_AREG  = (category != 'Mandataire social' && disability_ins != 'Privée') ? 1 : 0;
        var visible_AEE   = (category == 'Cadre' && disability_ins != 'Privée') ? 1 : 0;

        var visible_FAC   = 1;
        var visible_SP    = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_GSC   = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_CRTSD = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_AV_DP = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_ARRCO_T1 = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_ARRCO_T2 = (oldage_ins == 'Rég. Gén.' && category == 'Non cadre') ? 1 : 0;

        var visible_AGFF_T1 = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_AGFF_T2 = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_PHI = (health_ins != 'Rég. Gén.') ? 1 : 0;
        var visible_SS = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_MC = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_CI = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_FEP = (health_ins != 'Rég. Gén.') ? 1 : 0;
        var visible_ARRCO_TB = (oldage_ins == 'Rég. Gén.' && category != 'Non cadre') ? 1 : 0; 

        var visible_ASC      = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_AC_P = (category == 'Mandataire social' || disability_ins == 'Privée' ) ? 1 : 0;
        var visible_AV_P2 = (oldage_ins != 'Rég. Gén.') ? 1 : 0;

        var visible_NHAF     = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var settings = settingsObj.SettingsC9;
        var visible_PT       = (settings > 9) ? 1 : 0;
        
         /////////////////////////
        var cot_pat_CI = (parseFloat(base_sal)*parseFloat(Rate_CI)/100).toFixed(2);
        var cot_pat_PP = (parseFloat(base_sal)*parseFloat(Rate_PP)/100).toFixed(2);
        var amount_PE  = (parseFloat(base_sal)*parseFloat(Rate_PE)/100).toFixed(2);
        var amount_AEE = (parseFloat(base_sal)*parseFloat(Rate_AEE)/100).toFixed(2);
        var cot_pat_PE = (parseFloat(base_sal)*parseFloat(Rate2_PE)/100).toFixed(2);
        var cot_pat_AEE = (parseFloat(base_sal)*parseFloat(Rate_AEE2)/100).toFixed(2);

        var base_mutual_com = Math.min(base_sal,4*PMSS).toFixed(2);
        var cot_pat_MC = (base_mutual_com*Rate2_MC/100).toFixed(2);
        var cot_pat_ins = (base_sal*Rate2_Ins/100).toFixed(2);
        var cot_pat_SS = parseFloat(base_sal)*parseFloat(Rate2_SS)/100;
        var cot_pat_HI = (parseFloat(cot_pat_ins)*visible_Ins+parseFloat(cot_pat_CI)*visible_Ins1+(parseFloat(cot_pat_MC)*visible_MC)+(parseFloat(cot_pat_SS)*visible_SS)).toFixed(2);

        // console.log('#### ', cot_pat_ins,visible_Ins,(Base_PHI*Rate2_PHI/100),visible_Ins1,cot_pat_MC,visible_MC,cot_pat_SS,visible_SS, cot_pat_HI);

        var amount_ins = (base_sal*Rate_Ins/100).toFixed(2);
        var amount_GSC = (Math.min(base_sal,4*PMSS)*Amount_GSC*Rate_GSC/100+((base_sal>4*PMSS) ? (base_sal-4*PMSS)*1*Rate_GSC : 0)).toFixed(2);
        

        var amount_CRTSD = (Math.min(base_sal,4*PMSS)*Amount_GSC*Rate_CRTSD/100+((base_sal>4*PMSS) ? (base_sal-4*PMSS)*1*Rate_CRTSD : 0)).toFixed(2);
        var amount_HIns = (amount_ins*visible_Ins+amount_GSC*visible_Ins+amount_CRTSD*visible_Ins).toFixed(2);
        var visible_Old_Ins = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_Old_Ins2 = (oldage_ins == 'Rég. Gén.' && category == 'Mandataire social') ? 1 : 0;
        var visible_Old_Ins3 = (oldage_ins == 'Rég. Gén.' && category != 'Mandataire social') ? 1 : 0;

        var base_Capped_pension_ins = Math.min(base_sal,1*PMSS).toFixed(2);
        var base_Complementary_Pensions_eT2 = (base_sal>1*PMSS) ? (Math.min(base_sal,3*PMSS) - 1*PMSS) : 0;
        var base_Pension_Institutions_Fra_TB = (base_sal>1*PMSS) ? (Math.min(base_sal,4*PMSS) - 1*PMSS) : 0;
        var base_Pension_Institutions_Fra_TC = (base_sal>4*PMSS) ? (Math.min(base_sal,8*PMSS) - 4*PMSS) : 0;

        var Cot_Pat_AV_P =  base_Capped_pension_ins/100*Rate2_AV_P,
            Cot_Pat_AV_DP = base_sal/100*Rate2_AV_DP,
         Cot_Pat_ARRCO_T1 = base_Capped_pension_ins/100*Rate2_ARRCO_T1,
         Cot_Pat_ARRCO_T2 = base_Complementary_Pensions_eT2/100*Rate2_ARRCO_T2,
         Cot_Pat_ARRCO_TB = base_Pension_Institutions_Fra_TB/100*Rate2_ARRCO_TB,
         Cot_Pat_ARRCO_TC = base_Pension_Institutions_Fra_TC/100*Rate2_ARRCO_TC,
              Cot_Pat_CET = Math.min(base_sal,8*PMSS)/100*Rate2_CET,
          Cot_Pat_AGFF_T1 = base_Capped_pension_ins/100*Rate2_AGFF_T1,
          Cot_Pat_AGFF_T2 = base_Complementary_Pensions_eT2/100*Rate2_AGFF_T2;


        var Amount_AV_P = base_Capped_pension_ins/100*Rate_AV_P,
             Amount_AV_DP = base_sal/100*Rate_AV_DP,
          Amount_ARRCO_T1 = base_Capped_pension_ins/100*Rate_ARRCO_T1,
          Amount_ARRCO_T2 = base_Complementary_Pensions_eT2/100*Rate_ARRCO_T2,
          Amount_ARRCO_TB = base_Pension_Institutions_Fra_TB/100*Rate_ARRCO_TB,
          Amount_ARRCO_TC = base_Pension_Institutions_Fra_TC/100*Rate_ARRCO_TC,
               Amount_CET = Math.min(base_sal,8*PMSS)/100*Rate_CET,
           Amount_AGFF_T1 = base_Capped_pension_ins/100*Rate_AGFF_T1,
           Amount_AGFF_T2 = base_Complementary_Pensions_eT2/100*Rate_AGFF_T2;

        var visible_CET = (oldage_ins == 'Rég. Gén.' && category != 'Non cadre' && (Amount_AV_DP + Cot_Pat_AV_DP) != 0) ? 1 : 0; 
        var visible_ARRCO_TC = (oldage_ins == 'Rég. Gén.' && category != 'Non cadre' && (Amount_ARRCO_TC + Cot_Pat_ARRCO_TC) != 0) ? 1 : 0; 
       
        var Cot_Pat_Old_Age_Ins = ( Cot_Pat_AV_P *  visible_AV_P +  Cot_Pat_AV_DP * visible_AV_DP + Cot_Pat_ARRCO_T1 * visible_ARRCO_T1 + Cot_Pat_ARRCO_T2 * visible_ARRCO_T2 + Cot_Pat_ARRCO_TB * visible_ARRCO_TB + Cot_Pat_ARRCO_TC * visible_ARRCO_TC + Cot_Pat_CET * visible_CET + Cot_Pat_AGFF_T1 * visible_AGFF_T1 + Cot_Pat_AGFF_T2 * visible_AGFF_T2);

        var Amount_Old_Age_Ins = ( Amount_AV_P *  visible_AV_P +  Amount_AV_DP * visible_AV_DP + Amount_ARRCO_T1 * visible_ARRCO_T1 + Amount_ARRCO_T2 * visible_ARRCO_T2 + Amount_ARRCO_TB * visible_ARRCO_TB + Amount_ARRCO_TC * visible_ARRCO_TC + Amount_CET * visible_CET + Amount_AGFF_T1 * visible_AGFF_T1 + Amount_AGFF_T2 * visible_AGFF_T2);

        var Rate2_Old_Age_Ins = (Cot_Pat_Old_Age_Ins * 100 / base_sal).toFixed(3);
        var Rate_Old_Age_Ins = (Amount_Old_Age_Ins * 100 / base_sal).toFixed(3);     

        
        var Rate_FAC = ((base_sal <= 1.6*1457.52 ? 0.0345 : 0.0525)).toFixed(4); 
        var base_NHAF = (Math.min(base_sal,PMSS)).toFixed(2);
        var Rate_SP = ((1 >= 10 ? 0.080 : 0.200)*100).toFixed(3);
        var cot_pat_FAC = (base_sal*Rate_FAC).toFixed(2);
        var base_SP = (parseFloat(cot_pat_MC)+parseFloat(cot_pat_SS)).toFixed(2);
        var cot_pat_SP = (parseFloat(base_SP)*Rate_SP/100).toFixed(2);
        var cot_pat_ASC = (base_sal*Rate2_ASC/100).toFixed(2);
        var cot_pat_NHAF = (base_NHAF*Rate2_NHAF/100).toFixed(2);
        var cot_pat_AD =  (cot_pat_CI * visible_CI + cot_pat_PP* visible_PP).toFixed(2);

        var cot_pat_OSSC = (cot_pat_FAC*1+cot_pat_NHAF*1+cot_pat_ASC*visible_ASC+cot_pat_SP*visible_SP).toFixed(2);
        //console.log('@@@ ',cot_pat_FAC*1, cot_pat_NHAF*visible_NHAF, cot_pat_ASC*visible_ASC, cot_pat_SP*visible_SP, cot_pat_OSSC);
        var cot_pat_OTAE = ((base_sal*Rate_PT/100)*0).toFixed(2);
        var cot_pat_PHI  = (Base_PHI*Rate2_PHI/100).toFixed(2);
        var cot_pat_AREG = (parseFloat(base_sal)*parseFloat(Rate2_AREG)/100).toFixed(2);

        var cot_pat_UI = (cot_pat_PE * visible_PE + cot_pat_AEE * visible_AEE + cot_pat_AREG * visible_AREG).toFixed(2);

         // console.log("@@ ",cot_pat_PE , visible_PE , cot_pat_AEE , visible_AEE , cot_pat_AREG , visible_AREG);

        var amount_UI  = (amount_PE * visible_PE + amount_AEE * visible_AEE);

       var cot_pat_PT   = (base_sal*Rate_PT/100).toFixed(2);

       //$J$23+ $J$27+ $J$28+ $L$23+ $L$24
       var Net_Cash_third_Val = (health_ins != 'Rég. Gén.') ? parseFloat(amount_ins)+parseFloat(amount_GSC)+parseFloat(amount_CRTSD)+parseFloat(cot_pat_ins)+parseFloat(cot_pat_CI) : 0;
        
        var Net_taxable_third_val = (health_ins == 'Rég. Gén.') ? cot_pat_MC : 0;

         //$J$33+$J$35+ $L$33+$L$34+$L$35
        var Net_Cash_four_Val = (disability_ins != 'Rég. Gén.') ? parseFloat(amount_PE)+parseFloat(amount_AEE)+parseFloat(cot_pat_PE)+parseFloat(cot_pat_AREG)+parseFloat(cot_pat_AEE)  : 0;

        var Net_Cash_fifth_Val = (oldage_ins != 'Rég. Gén.') ? parseFloat(Amount_AV_P)+parseFloat(Cot_Pat_AV_P)+parseFloat(Amount_AV_DP)+parseFloat(Cot_Pat_AV_DP)+parseFloat(Amount_ARRCO_T1)+parseFloat(Cot_Pat_ARRCO_T1)+parseFloat(Amount_ARRCO_T2)+parseFloat(Cot_Pat_ARRCO_T2)+parseFloat(Amount_ARRCO_TB)+parseFloat(Cot_Pat_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Cot_Pat_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Cot_Pat_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Cot_Pat_AGFF_T1)+parseFloat(Amount_AGFF_T2)+parseFloat(Cot_Pat_AGFF_T2) : 0;

        //$J$43+$J$44+ $J$45+ $L$43+ $L$44+$L$45
        var Net_Cash_sixth_val = (category == 'Non cadre') ? parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Cot_Pat_ARRCO_TB)+parseFloat(Cot_Pat_ARRCO_TC)+parseFloat(Cot_Pat_CET) : 0; 
        
        //$J$42+$L$42
        var Net_Cash_seven_val = (category != 'Non cadre') ? parseFloat(Amount_ARRCO_T2)+parseFloat(Cot_Pat_ARRCO_T2) : 0;
        
        var Net_Cash = (parseFloat(base_sal)
            -
            (parseFloat(amount_ins)+parseFloat(amount_GSC)+parseFloat(amount_CRTSD)+parseFloat(amount_PE)+parseFloat(Amount_AV_P)+parseFloat(Amount_AV_DP))
           -
            (parseFloat(amount_AEE)+parseFloat(Amount_ARRCO_T1)+parseFloat(Amount_ARRCO_T2)+parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Amount_AGFF_T2))
            +
            parseFloat(Net_Cash_third_Val)
            +
            parseFloat(Net_Cash_four_Val)
            +
            parseFloat(Net_Cash_fifth_Val)
            -
            parseFloat(Net_Cash_sixth_val)
            -
            parseFloat(Net_Cash_seven_val)); //.toFixed(2)
        
        // console.log(parseFloat(base_sal),parseFloat(amount_ins)+parseFloat(amount_GSC)+parseFloat(amount_CRTSD)+parseFloat(amount_PE)+parseFloat(Amount_AV_P)+parseFloat(Amount_AV_DP), parseFloat(amount_AEE)+parseFloat(Amount_ARRCO_T1)+parseFloat(Amount_ARRCO_T2)+parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Amount_AGFF_T2), parseFloat(Net_Cash_third_Val), parseFloat(Net_Cash_four_Val),parseFloat(Net_Cash_fifth_Val),parseFloat(Net_Cash_sixth_val),parseFloat(Net_Cash_seven_val) );

        var wages_costs = (parseFloat(amount_HIns)+parseFloat(amount_UI)+parseFloat(Amount_Old_Age_Ins)).toFixed(2);

        //=+L22+ L32+ L38+ L50+ L56
        var Patron_Charges = (parseFloat(cot_pat_HI)+parseFloat(cot_pat_UI)+parseFloat(Cot_Pat_Old_Age_Ins)+parseFloat(cot_pat_OSSC)+parseFloat(cot_pat_OTAE)).toFixed(2);

        var payment_AGIRC_ARRCO = ((parseFloat(amount_AEE)*visible_AEE*1)+(parseFloat(Amount_ARRCO_T1)*visible_ARRCO_T1*1)+(parseFloat(Amount_ARRCO_TB)*visible_ARRCO_TB*1)+(parseFloat(Amount_ARRCO_TC)*visible_ARRCO_TC*1)+(parseFloat(Amount_CET)*visible_CET*1)+(parseFloat(Amount_AGFF_T1)*visible_AGFF_T1*1)+(parseFloat(Amount_AGFF_T2)*visible_AGFF_T2*1)
                +
                (parseFloat(cot_pat_AEE)*visible_AEE*1)+(parseFloat(Cot_Pat_ARRCO_T1)*visible_ARRCO_T1*1)+(parseFloat(Cot_Pat_ARRCO_TB)*visible_ARRCO_TB*1)+(parseFloat(Cot_Pat_ARRCO_TC)*visible_ARRCO_TC*1)+(parseFloat(Cot_Pat_CET)*visible_CET*1)+(parseFloat(Cot_Pat_AGFF_T1)*visible_AGFF_T1)+(parseFloat(Cot_Pat_AGFF_T2)*visible_AGFF_T2)).toFixed(2)


      
         var Net_taxable_val = (parseFloat(amount_ins) + parseFloat(amount_GSC) + parseFloat(amount_PE) + parseFloat(amount_AEE) + parseFloat(Amount_AV_P) + parseFloat(Amount_AV_DP) + parseFloat(Amount_ARRCO_T1) + parseFloat(Amount_ARRCO_T2)+ parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Amount_AGFF_T2)  );
        
        var cc = (health_ins == 'Rég. Gén.') ? cot_pat_MC : 0;
        var cc1 = base_sal - Net_taxable_val; 
        var Net_taxable = cc1+parseFloat(cc);


        var visible_hide = {        
            'visible_Ins':visible_Ins,
            'visible_PHI':visible_PHI,
            'visible_FEP':visible_FEP,
            'visible_SS':visible_SS,
            'visible_GSC':visible_GSC,
            'visible_CRTSD':visible_CRTSD,
            'visible_MC':visible_MC,
            'visible_CI':visible_CI,
            'visible_PP':visible_PP,
            'visible_PE':visible_PE,
            'visible_AREG':visible_AREG,
            'visible_AEE':visible_AEE,
            'visible_AV_P':visible_AV_P,
            'visible_AV_DP':visible_AV_DP,
            'visible_ARRCO_T1':visible_ARRCO_T1,
            'visible_ARRCO_T2':visible_ARRCO_T2,
            'visible_ARRCO_TB':visible_ARRCO_TB,
            'visible_ARRCO_TC':visible_ARRCO_TC,
            'visible_CET':visible_CET,
            'visible_AGFF_T1':visible_AGFF_T1,
            'visible_AGFF_T2':visible_AGFF_T2,
            'visible_FAC':visible_FAC,
            'visible_ASC':visible_ASC,
            'visible_NHAF':visible_NHAF,
            'visible_SP':visible_SP,
            'visible_PT':visible_PT,
            'visible_AC_P':visible_AC_P,
            'visible_AV_P2':visible_AV_P2
        };

        var response = {
            'base_salary':(base_sal*base_activity/100).toFixed(2),
            'base_mutual_com':base_mutual_com,
            'amount_ins':amount_ins,
            'base_HIns':(parseFloat(amount_HIns)+parseFloat(cot_pat_HI)).toFixed(2),
            'amount_HIns':amount_HIns,
            'amount_GSC':amount_GSC,
            'amount_CRTSD':amount_CRTSD,
            'cot_pat_ins': cot_pat_ins,
            'cot_pat_PHI':cot_pat_PHI,
            'cot_pat_MC':cot_pat_MC,
            'cot_pat_HI':cot_pat_HI,
            'Rate2_HIns':(cot_pat_HI*100/base_sal).toFixed(3),
            'tax_HI':(parseFloat(amount_HIns)*100/base_sal).toFixed(3),
            'Rate2_Ins':Rate2_Ins,
            'Rate_Ins':Rate_Ins,
            'Base_PHI':Base_PHI,
            'Rate2_PHI':Rate2_PHI,
            'Rate_GSC':Rate_GSC,
            'Rate_CRTSD':Rate_CRTSD,
            'Rate_MC':Rate2_MC,
            'base_UI': (parseFloat(amount_UI) + parseFloat(cot_pat_UI)).toFixed(2),
            'base_Capped_pension_ins':base_Capped_pension_ins,
            'base_Complementary_Pensions_eT2':(base_Complementary_Pensions_eT2).toFixed(2),
            'base_Pension_Institutions_Fra_TB':(base_Pension_Institutions_Fra_TB).toFixed(2),
            'oldage_ins_base':(parseFloat(Amount_Old_Age_Ins)+parseFloat(Cot_Pat_Old_Age_Ins)).toFixed(2),
            'amount_AV_P':Amount_AV_P.toFixed(2),
            'amount_AV_DP':Amount_AV_DP.toFixed(2),
            'amount_ARRCO_T1':Amount_ARRCO_T1.toFixed(2),
            'amount_ARRCO_T2':Amount_ARRCO_T2.toFixed(2),
            'amount_ARRCO_TB':Amount_ARRCO_TB.toFixed(2),
            'amount_ARRCO_TC':Amount_ARRCO_TC.toFixed(2),
            'amount_CET':Amount_CET.toFixed(2),
            'amount_AGFF_T1':Amount_AGFF_T1.toFixed(2),
            'amount_AGFF_T2':Amount_AGFF_T2.toFixed(2),
            'cot_pat_AV_P' :Cot_Pat_AV_P.toFixed(2),
            'Rate_AV_P':Rate_AV_P,
            'Rate2_AV_P': Rate2_AV_P,
            'Rate_AV_DP':Rate_AV_DP,
            'Rate2_AV_DP':Rate2_AV_DP,
            'Rate_ARRCO_T1':Rate_ARRCO_T1,
            'Rate2_ARRCO_T1':Rate2_ARRCO_T1,
            'Rate_ARRCO_T2':Rate_ARRCO_T2,
            'Rate2_ARRCO_T2':Rate2_ARRCO_T2,
            'Rate_ARRCO_TB':Rate_ARRCO_TB,
            'Rate2_ARRCO_TB':Rate2_ARRCO_TB,
            'Rate_ARRCO_TC':Rate_ARRCO_TC,
            'Rate2_ARRCO_TC':Rate2_ARRCO_TC,
            'Rate_CET':Rate_CET,
            'Rate2_CET':Rate2_CET,
            'Rate_AGFF_T1':Rate_AGFF_T1,
            'Rate2_AGFF2_T1':Rate2_AGFF_T1,
            'Rate_AGFF_T2':Rate_AGFF_T2,
            'Rate2_AGFF2_T2':Rate2_AGFF_T2,
            'Rate_PT':Rate_PT,
            'cot_pat_AV_DP' :(Cot_Pat_AV_DP).toFixed(2),
            'cot_pat_ARRCO_T1':(Cot_Pat_ARRCO_T1).toFixed(2),
            'cot_pat_ARRCO_T2':(Cot_Pat_ARRCO_T2).toFixed(2),
            'cot_pat_ARRCO_TB':(Cot_Pat_ARRCO_TB).toFixed(2),
            'cot_pat_ARRCO_TC':(Cot_Pat_ARRCO_TC).toFixed(2),
            'cot_pat_CET':(Cot_Pat_CET).toFixed(2),
            'cot_pat_AGFF_T1':(Cot_Pat_AGFF_T1).toFixed(2),
            'cot_pat_AGFF_T2':(Cot_Pat_AGFF_T2).toFixed(2),
            'cot_Pat_Old_Age_Ins': (Cot_Pat_Old_Age_Ins).toFixed(2),
            'Rate2_Old_Age_Ins':Rate2_Old_Age_Ins,
            'amount_Old_Age_Ins':(Amount_Old_Age_Ins).toFixed(2),
            'Rate_Old_Age_Ins': Rate_Old_Age_Ins,
            'Rate_CI':Rate_CI,
            'Rate2_SS':Rate2_SS,
            'cot_pat_SS':cot_pat_SS,
            'cot_pat_CI':cot_pat_CI,
            'Rate_PP':Rate_PP,
            'cot_pat_PP':cot_pat_PP,
            'cot_pat_AD':cot_pat_AD,
            'amount_PE':amount_PE,
            'Rate_PE':Rate_PE,
            'Rate_PE2':Rate2_PE,
            'cot_pat_PE':cot_pat_PE,
            'Rate_AREG':Rate2_AREG,
            'cot_pat_AREG':cot_pat_AREG,
            'Rate_AEE':Rate_AEE,
            'Rate_AEE2': Rate_AEE2,
            'amount_AEE':amount_AEE,
            'cot_pat_AEE':cot_pat_AEE,
            'Rate_UI':(amount_UI/base_sal*100).toFixed(3),
            'Rate2_UI':( parseFloat(cot_pat_UI) / parseFloat(base_sal) * 100 ).toFixed(3),
            'amount_UI':(amount_UI).toFixed(2),
            'cot_pat_UI':cot_pat_UI,
            'Rate_FAC':(Rate_FAC*100).toFixed(3),
            'cot_pat_FAC':cot_pat_FAC,
            'Rate_ASC':Rate2_ASC,
            'cot_pat_ASC':cot_pat_ASC,
            'base_NHAF':base_NHAF,
            'Rate_NHAF':Rate2_NHAF,
            'cot_pat_NHAF':cot_pat_NHAF,
            'base_SP':base_SP,
            'Rate_SP':((1 >= 10 ? 0.080 : 0.200)*100).toFixed(3),
            'cot_pat_SP':cot_pat_SP,
            'Rate_OSSC':((cot_pat_FAC*1+cot_pat_ASC*visible_ASC+cot_pat_NHAF*visible_NHAF+cot_pat_SP*visible_SP)*100/base_sal).toFixed(3),
            'cot_pat_OSSC':cot_pat_OSSC,
            'cot_pat_OTAE':((base_sal*Rate_PT/100)*0).toFixed(2),
            'cot_pat_PT':cot_pat_PT,
            'Rate_OTAE':((base_sal*Rate_PT/100)*0/base_sal).toFixed(3),
            'OTAE':(0+(base_sal*Rate_PT/100)*0).toFixed(2),
            'wages_costs':wages_costs,
            'Patron_Charges':Patron_Charges,
            'Payment_URSAFF':((parseFloat(amount_ins)*visible_Ins*1)  +   (parseFloat(amount_GSC)*visible_GSC*1) +   (parseFloat(amount_CRTSD)*visible_CRTSD*1)+ (parseFloat(amount_PE) * visible_PE * 1) + (parseFloat(Amount_AV_P)*visible_AV_P*1) + (parseFloat(Amount_AV_DP)*visible_AV_DP*1)  
            + 
            (parseFloat(cot_pat_ins)*visible_Ins*1) + (parseFloat(cot_pat_CI)*visible_CI*1) + (parseFloat(cot_pat_PE)* visible_PE * 1) + ( parseFloat(cot_pat_AREG)*visible_AREG*1 )+(parseFloat(Cot_Pat_AV_P)*visible_AV_P*1)+(parseFloat(Cot_Pat_AV_DP)*visible_AV_DP*1) + (parseFloat(cot_pat_FAC)*visible_FAC) + (parseFloat(cot_pat_ASC)*visible_ASC*1) + (parseFloat(cot_pat_NHAF)*visible_NHAF*1) + (parseFloat(cot_pat_SP)*visible_SP*1) + ( parseFloat(cot_pat_PT)*visible_PT*1 ) ).toFixed(2),
            'Payment_AGIRC_ARRCO': payment_AGIRC_ARRCO,

            'Private_Mutual_Pay':(( parseFloat(cot_pat_MC) * visible_MC * 1) + (parseFloat(cot_pat_SS) *visible_SS * 1 ) ).toFixed(2
                ) ,
            // 'Private_Mutual_Pay':(( parseFloat(cot_pat_MC) * visible_MC * 1) + (parseFloat(cot_pat_CI) *visible_CI * 1 ) + (parseFloat(cot_pat_PE) * visible_PE* 1) + (parseFloat(cot_pat_AREG * visible_AREG * 1) + (parseFloat(Cot_Pat_AV_P) * visible_AV_P * 1) + (parseFloat(Cot_Pat_AV_DP) * visible_AV_DP) * 1 )).toFixed(2
            //     ) ,

            //'Private_Mutual_Pay':(( parseFloat(cot_pat_PHI) * visible_PHI * 1) + (parseFloat(cot_pat_MC) *visible_MC * 1 ) + (parseFloat(cot_pat_PP) * visible_PP* 1)).toFixed(2
                //) ,
            
            'Net_taxable':((parseFloat(base_sal)) - (parseFloat(amount_GSC)+parseFloat(amount_ins)+parseFloat(amount_PE)+parseFloat(amount_AEE)+parseFloat(Amount_AV_P)+parseFloat(Amount_AV_DP)+parseFloat(Amount_ARRCO_T1)+parseFloat(Amount_ARRCO_T2)+parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Amount_AGFF_T2)) + (parseFloat(Net_taxable_third_val))).toFixed(2),
            'Net_Cash': Net_Cash,
            'Net_taxable':Net_taxable.toFixed(2),
            'Total_wages':(parseFloat(Net_Cash) + parseFloat(wages_costs) + parseFloat(Patron_Charges)).toFixed(2),
            'visible_hide': visible_hide,
           };
            
      res.status(200).json(response)
    }else{
      res.status(500).json({'error':'Invalid'})
    }

});

module.exports = router;
