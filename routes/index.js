var express = require('express');
var router = express.Router();
var paypal = require('paypal-express-checkout').init('mss.naveensharma-facilitator_api1.gmail.com', '1403521583', 'AFcWxV21C7fd0v3bYYYRCpSSRl31AGjelgIYjdIGjGvf2IUyW1bBDw3T', 'http://localhost:8555', 'http://localhost:8555', true);

// $application_id = 'APP-80W284485P519543T';
// $api_username = 'mss.naveensharma-facilitator_api1.gmail.com';
// $api_password = '1403521583';
// $api_signature = 'AFcWxV21C7fd0v3bYYYRCpSSRl31AGjelgIYjdIGjGvf2IUyW1bBDw3T';
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Payroll App' });
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

    if(typeof base_sal != 'undefined' && typeof base_activity != 'undefined' && typeof base_dur != 'undefined') {

        var PMSS        = 3170.00,
            Rate_Ins    = (parseFloat(0.750)).toFixed(3),
            Amount_GSC  = (parseFloat(0.9825)).toFixed(4),
            Rate_GSC    = (parseFloat(5.100)).toFixed(3),
            Rate_CRTSD  = (parseFloat(2.900)).toFixed(3),
            Rate2_Ins   = (parseFloat(13.100)).toFixed(3),
            Rate2_PHI   = (parseFloat(100.000)).toFixed(3),
            Base_PHI    = (parseFloat(260)).toFixed(3),
            Rate_MC     = (parseFloat(4.750)).toFixed(3),
            Rate_CI     = (parseFloat(1.100)).toFixed(3),
            Rate_PP     = (parseFloat(1.000)).toFixed(3),
            Rate_PE     = (parseFloat(2.4)).toFixed(3),
            Rate_PE2    = (parseFloat(4.00)).toFixed(3),
            Rate_AREG   = (parseFloat(0.300)).toFixed(3),
            Rate_AEE    = (parseFloat(0.024)).toFixed(3),
            Rate_AEE2   = (parseFloat(0.036)).toFixed(3),
            Rate_ASC    = (parseFloat(0.300)).toFixed(3),
            Rate_NHAF   = (parseFloat(0.100)).toFixed(3),
            Rate_PT     = (parseFloat(1.700)).toFixed(3),
            settings    = 1;

        
        var visible_Ins   = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_Ins1  = (health_ins != 'Rég. Gén.') ? 1 : 0;
        var visible_AV_P  = (disability_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_PP    = (disability_ins != 'Rég. Gén.') ? 1 : 0;
        var visible_PE    = (disability_ins != 'Mandataire social') ? 1 : 0;
        var visible_AREG  = (disability_ins != 'Mandataire social') ? 1 : 0;
        var visible_AEE   = (disability_ins != 'Non cadre') ? 1 : 0;




        var visible_FAC   = 1;
        var visible_SP    = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_GSC   = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_CRTSD = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_AV_DP = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_ARRCO_T1 = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_ARRCO_T2 = (oldage_ins == 'Rég. Gén.' && category == 'Non cadre') ? 1 : 0;
        var visible_CET = (oldage_ins == 'Rég. Gén.' && category != 'Non cadre') ? 1 : 0; 

        var visible_AGFF_T1 = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_AGFF_T2 = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_PHI = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_MC = (health_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_CI = (disability_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_ARRCO_TB = (oldage_ins == 'Rég. Gén.' && category != 'Non cadre') ? 1 : 0; 
        var visible_ARRCO_TC = (oldage_ins == 'Rég. Gén.' && category != 'Non cadre') ? 1 : 0; 
        var visible_ASC      = (health_ins == 'Rég. Gén.') ? 1 : 0;

        var visible_NHAF     = 1;
        var visible_PT       = (settings > 9) ? 1 : 0;
   
        var base_mutual_com = Math.min(base_sal,4*PMSS).toFixed(2);
        var cot_pat_MC = (base_mutual_com*Rate_MC/100).toFixed(2);
        var cot_pat_ins = (base_sal*Rate2_Ins/100).toFixed(2);

        var cot_pat_HI = (cot_pat_ins*visible_Ins+(Base_PHI*Rate2_PHI/100).toFixed(2)*visible_Ins1+cot_pat_MC*visible_Ins).toFixed(2);


        var amount_ins = (base_sal*Rate_Ins/100).toFixed(2);
        var amount_GSC = (Math.min(base_sal,4*PMSS)*Amount_GSC*Rate_GSC/100+((base_sal>4*PMSS) ? (base_sal-4*PMSS)*1*Rate_GSC : 0)).toFixed(2);
        

        var amount_CRTSD = (Math.min(base_sal,4*PMSS)*Amount_GSC*Rate_CRTSD/100+((base_sal>4*PMSS) ? (base_sal-4*PMSS)*1*Rate_CRTSD : 0)).toFixed(2);
        var amount_HIns = (amount_ins*visible_Ins+amount_GSC*visible_Ins+amount_CRTSD*visible_Ins).toFixed(2);
        var visible_Old_Ins = (oldage_ins == 'Rég. Gén.') ? 1 : 0;
        var visible_Old_Ins2 = (oldage_ins == 'Rég. Gén.' && category == 'Mandataire social') ? 1 : 0;
        var visible_Old_Ins3 = (oldage_ins == 'Rég. Gén.' && category != 'Mandataire social') ? 1 : 0;



        var Rate_AV_P = (parseFloat(6.850)).toFixed(3),
           Rate_AV_DP = (parseFloat(0.300)).toFixed(3),
        Rate_ARRCO_T1 = (parseFloat(3.100)).toFixed(3),
        Rate_ARRCO_T2 = (parseFloat(8.100)).toFixed(3),
        Rate_ARRCO_TB = (parseFloat(7.800)).toFixed(3),
        Rate_ARRCO_TC = (parseFloat(0.360)).toFixed(3),
             Rate_CET = (parseFloat(0.130)).toFixed(3),
         Rate_AGFF_T1 = (parseFloat(0.800)).toFixed(3),
         Rate_AGFF_T2 = (parseFloat(0.900)).toFixed(3);


        var Rate2_AV_P  = (parseFloat(8.500)).toFixed(3),
            Rate2_AV_DP = (parseFloat(1.800)).toFixed(3),
         Rate2_ARRCO_T1 = (parseFloat(4.650)).toFixed(3),
         Rate2_ARRCO_T2 = (parseFloat(12.150)).toFixed(3),
         Rate2_ARRCO_TB = (parseFloat(12.750)).toFixed(3),
         Rate2_ARRCO_TC = (parseFloat(20.190)).toFixed(3),
              Rate2_CET = (parseFloat(0.220)).toFixed(3),
          Rate2_AGFF_T1 = (parseFloat(1.200)).toFixed(3),
          Rate2_AGFF_T2 = (parseFloat(1.300)).toFixed(3);

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



        var Cot_Pat_Old_Age_Ins = ( Cot_Pat_AV_P *  visible_AV_P +  Cot_Pat_AV_DP * visible_AV_DP + Cot_Pat_ARRCO_T1 * visible_ARRCO_T1 + Cot_Pat_ARRCO_T2 * visible_ARRCO_T2 + Cot_Pat_ARRCO_TB * visible_ARRCO_TB + Cot_Pat_ARRCO_TC * visible_ARRCO_TC + Cot_Pat_CET * visible_CET + Cot_Pat_AGFF_T1 * visible_AGFF_T1 + Cot_Pat_AGFF_T2 * visible_AGFF_T2);

        var Amount_Old_Age_Ins = ( Amount_AV_P *  visible_AV_P +  Amount_AV_DP * visible_AV_DP + Amount_ARRCO_T1 * visible_ARRCO_T1 + Amount_ARRCO_T2 * visible_ARRCO_T2 + Amount_ARRCO_TB * visible_ARRCO_TB + Amount_ARRCO_TC * visible_ARRCO_TC + Amount_CET * visible_CET + Amount_AGFF_T1 * visible_AGFF_T1 + Amount_AGFF_T2 * visible_AGFF_T2);

        var Rate2_Old_Age_Ins = (Cot_Pat_Old_Age_Ins * 100 / base_sal).toFixed(3);
        var Rate_Old_Age_Ins = (Amount_Old_Age_Ins * 100 / base_sal).toFixed(3);     

        /////////////////////////
        var cot_pat_CI = (parseFloat(base_sal)*parseFloat(Rate_CI)/100).toFixed(2);
        var cot_pat_PP = (parseFloat(base_sal)*parseFloat(Rate_PP)/100).toFixed(2);
        var amount_PE  = (parseFloat(base_sal)*parseFloat(Rate_PE)/100).toFixed(2);
        var amount_AEE = (parseFloat(base_sal)*parseFloat(Rate_AEE)/100).toFixed(2);
        var cot_pat_PE = (parseFloat(base_sal)*parseFloat(Rate_PE2)/100).toFixed(2);
        var cot_pat_AEE = (parseFloat(base_sal)*parseFloat(Rate_AEE2)/100).toFixed(2);
        var amount_UI  = (amount_PE*0 + amount_AEE*1);
        var Rate_FAC = ((base_sal <= 1.6*1457.52 ? 0.0345 : 0.0525)).toFixed(4);
        var base_NHAF = (Math.min(base_sal,PMSS)).toFixed(2);
        var Rate_SP = ((1 >= 10 ? 0.080 : 0.200)*100).toFixed(3);
        var cot_pat_FAC = (base_sal*Rate_FAC).toFixed(2);
        var cot_pat_SP = (cot_pat_MC*Rate_SP/100).toFixed(2);
        var cot_pat_ASC = (base_sal*Rate_ASC/100).toFixed(2);
        var cot_pat_NHAF = (base_NHAF*Rate_NHAF/100).toFixed(2);
        var cot_pat_AD = (cot_pat_CI*1 + cot_pat_PP*0).toFixed(2);
        
        
        var cot_pat_UI = (cot_pat_PE*0 + cot_pat_AEE*1).toFixed(2);
        var cot_pat_OSSC = (cot_pat_FAC*1+cot_pat_NHAF*1+cot_pat_ASC*1+cot_pat_SP*1).toFixed(2);
        var cot_pat_OTAE = ((base_sal*Rate_PT/100)*0).toFixed(2);
        var cot_pat_PHI  = (Base_PHI*Rate2_PHI/100).toFixed(2);
        var cot_pat_AREG = (parseFloat(base_sal)*parseFloat(Rate_AREG)/100).toFixed(2);
        var cot_pat_PT   = (base_sal*Rate_PT/100).toFixed(2);
        var Net_Cash_third_Val = (health_ins != 'Rég. Gén.') ? cot_pat_ins : 0;
        var Net_Cash_four_Val = (disability_ins != 'Rég. Gén.') ? cot_pat_PP : 0;
        var Net_Cash_fifth_Val = (oldage_ins != 'Rég. Gén.') ? (parseFloat(Amount_AV_P)*parseFloat(Cot_Pat_AV_P)+parseFloat(Amount_AV_DP)*parseFloat(Cot_Pat_AV_DP)+(parseFloat(Amount_ARRCO_T1)*parseFloat(Cot_Pat_ARRCO_T1))+(parseFloat(Amount_ARRCO_T2)*parseFloat(Cot_Pat_ARRCO_T2))+(parseFloat(Amount_ARRCO_TB)*parseFloat(Cot_Pat_ARRCO_TB))+(parseFloat(Amount_ARRCO_TC)*parseFloat(Cot_Pat_ARRCO_TC))+(parseFloat(Amount_CET)*parseFloat(Cot_Pat_CET))+(parseFloat(Amount_AGFF_T2)*parseFloat(Cot_Pat_AGFF_T1))+(parseFloat(Amount_AGFF_T2)*parseFloat(Cot_Pat_AGFF_T2))) : 0;
        var Net_taxable_third_val = (health_ins == 'Rég. Gén.') ? cot_pat_MC : 0;
        var Net_Cash = ((parseFloat(base_sal)) - ((parseFloat(amount_ins))+(parseFloat(amount_GSC))+(parseFloat(amount_CRTSD))+(parseFloat(amount_PE))+(parseFloat(Amount_AV_P))+(parseFloat(Amount_AV_DP))) - ((parseFloat(amount_AEE)+parseFloat(Amount_ARRCO_T1)+parseFloat(Amount_ARRCO_T2)+parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Amount_AGFF_T2)) + parseFloat(Net_Cash_third_Val) + parseFloat(Net_Cash_four_Val) + parseFloat(Net_Cash_fifth_Val))).toFixed(2);
        var wages_costs = (parseFloat(amount_HIns)+parseFloat(amount_UI)+parseFloat(Amount_Old_Age_Ins)).toFixed(2);
 
        var Patron_Charges = (parseFloat(cot_pat_HI)+parseFloat(cot_pat_AD)+parseFloat(cot_pat_UI)+parseFloat(Cot_Pat_Old_Age_Ins)+parseFloat(cot_pat_OSSC)+parseFloat(cot_pat_OTAE)).toFixed(2);

        
        var payment_AGIRC_ARRCO = ((parseFloat(amount_AEE)*visible_AEE*1)+(parseFloat(Amount_ARRCO_T1)*visible_ARRCO_T1*1)+(parseFloat(Amount_ARRCO_TB)*visible_ARRCO_TB*1)+(parseFloat(Amount_ARRCO_TC)*visible_ARRCO_TC*1)+(parseFloat(Amount_CET)*visible_CET*1)+(parseFloat(Amount_AGFF_T1)*visible_AGFF_T1*1)+(parseFloat(Amount_AGFF_T2)*visible_AGFF_T2*1)
                +
                (parseFloat(cot_pat_AEE)*visible_AEE*1)+(parseFloat(Cot_Pat_ARRCO_T1)*visible_ARRCO_T1*1)+(parseFloat(Cot_Pat_ARRCO_TB)*visible_ARRCO_TB*1)+(parseFloat(Cot_Pat_ARRCO_TC)*visible_ARRCO_TC*1)+(parseFloat(Cot_Pat_CET)*visible_CET*1)+(parseFloat(Cot_Pat_AGFF_T1)*visible_AGFF_T1)+(parseFloat(Cot_Pat_AGFF_T2)*visible_AGFF_T2)).toFixed(2)


      
         var Net_taxable_val = (parseFloat(amount_ins) + parseFloat(amount_GSC) + parseFloat(amount_PE) + parseFloat(amount_AEE) + parseFloat(Amount_AV_P) + parseFloat(Amount_AV_DP) + parseFloat(Amount_ARRCO_T1) + parseFloat(Amount_ARRCO_T2)+ parseFloat(Amount_ARRCO_TB)+parseFloat(Amount_ARRCO_TC)+parseFloat(Amount_CET)+parseFloat(Amount_AGFF_T1)+parseFloat(Amount_AGFF_T2)  )


        var cc = (health_ins == 'Rég. Gén.') ? cot_pat_MC : 0;
        var cc1 = base_sal - Net_taxable_val; 
        var Net_taxable = cc1+parseFloat(cc);


        var visible_hide = {        
            'visible_Ins':visible_Ins,
            'visible_PHI':visible_PHI,
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
            'visible_PT':visible_PT
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
            'Rate_MC':Rate_MC,
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
            'Rate2_ARRCO_TB':Rate_ARRCO_TB,
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
            'cot_pat_CI':cot_pat_CI,
            'Rate_PP':Rate_PP,
            'cot_pat_PP':cot_pat_PP,
            'cot_pat_AD':cot_pat_AD,
            'amount_PE':amount_PE,
            'Rate_PE':Rate_PE,
            'Rate_PE2':Rate_PE2,
            'cot_pat_PE':cot_pat_PE,
            'Rate_AREG':Rate_AREG,
            'cot_pat_AREG':(parseFloat(base_sal)*parseFloat(Rate_AREG)/100).toFixed(2),
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
            'Rate_ASC':Rate_ASC,
            'cot_pat_ASC':cot_pat_ASC,
            'base_NHAF':base_NHAF,
            'Rate_NHAF':Rate_NHAF,
            'cot_pat_NHAF':cot_pat_NHAF,
            'base_SP':cot_pat_MC,
            'Rate_SP':((1 >= 10 ? 0.080 : 0.200)*100).toFixed(3),
            'cot_pat_SP':(cot_pat_MC*Rate_SP/100).toFixed(2),
            'OSSC':cot_pat_FAC*1+cot_pat_NHAF*1+cot_pat_ASC*1+cot_pat_SP*1,
            'Rate_OSSC':((cot_pat_FAC*1+cot_pat_NHAF*1+cot_pat_ASC*1+cot_pat_SP*1)*100/base_sal).toFixed(3),
            'cot_pat_OSSC':cot_pat_OSSC,
            'cot_pat_OTAE':((base_sal*Rate_PT/100)*0).toFixed(2),
            'cot_pat_PT':cot_pat_PT,
            'Rate_OTAE':((base_sal*Rate_PT/100)*0/base_sal).toFixed(3),
            'OTAE':(0+(base_sal*Rate_PT/100)*0).toFixed(2),
            'wages_costs':wages_costs,
            'Patron_Charges':Patron_Charges,
            'Payment_URSAFF':((parseFloat(amount_ins)*visible_Ins*1)  +   (parseFloat(amount_GSC)*visible_GSC*1) +   (parseFloat(amount_CRTSD)*visible_CRTSD*1) + (parseFloat(Amount_AV_P)*visible_AV_P*1) + (parseFloat(Amount_AV_DP)*visible_AV_DP*1)  
            + 
            (parseFloat(cot_pat_ins)*visible_Ins*1) + (parseFloat(cot_pat_CI)*visible_CI*1) + (parseFloat(Cot_Pat_AV_P)*visible_AV_P*1)+(parseFloat(Cot_Pat_AV_DP)*visible_AV_DP*1) + (parseFloat(cot_pat_FAC)*visible_FAC) + (parseFloat(cot_pat_ASC)*visible_ASC*1) + (parseFloat(cot_pat_NHAF)*visible_NHAF*1) + (parseFloat(cot_pat_SP)*visible_SP*1) ).toFixed(2),
            'Payment_AGIRC_ARRCO': payment_AGIRC_ARRCO,
            'Private_Mutual_Pay':cot_pat_MC,
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