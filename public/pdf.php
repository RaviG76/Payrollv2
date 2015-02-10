<?php

header('Access-Control-Allow-Origin: *');
header('Content-Disposition: attachment'); 
set_include_path(get_include_path() . PATH_SEPARATOR . "/var/www/html/dompdf");
 
require_once "dompdf_config.inc.php";
 
$dompdf = new DOMPDF();
 
$html = '
<body style="margin:0; padding:0; background-color:#d3e8f1; ">
<div style="max-width:1170px; margin:0 auto; margin-bottom:50px; padding-top:50px; font-family:Arial, Helvetica, sans-serif;">
	<table cellpadding="0" cellspacing="0" width="100%" id="tableID">
    
    	<tr>
        	<td>
            	<table cellpadding="0" cellspacing="0" width="100%" style="font-size:14px; line-height:20px;">
                	<tr>
                    	<td width="50%"> 
                        <table width="400" cellpadding="0" cellspacing="0" style="padding:0px 5px;">
                            	<tr>
                                	<td valign="top"><h4 style="margin:0px; font-weight:normal;">'.$_GET['company'].'</h4> </td>
                                </tr>
                                <tr>
                                	<td valign="top"><p style="margin:0px;">Immeuble le Parisien</p></td>
                                </tr>
                                <tr>
                                	<td valign="top"><p style="margin:0px;">1 avenue des Champs Elysées</p></td>
                                </tr>
                                <tr>
                                	<td valign="top"><p style="margin:0px;">75007 Paris</p> </td>
                                </tr>
                            </table>
                            <table width="100%">
                            	<tr>
                                	<td height="20" colspan="2"></td>
                                </tr>
                                <tr>
                                	<td width="200">ETABLISSEMENT :</td>
                                    <td>ETABLISSEMENT PRINCIPAL</td>
                                </tr>
                                <tr>
                                	<td width="200">N° DE SIREN :</td>
                                    <td>XXX XXX XXX</td>
                                </tr>
                                <tr>
                                	<td width="200">N° URSAFF :</td>
                                    <td>XXXXXXXXXXXXX</td>
                                </tr>
                                <tr>
                                    <td width="200">CODE NAF :</td>
                                    <td>5829C EDITION DE LOGICIELS APPLICATIFS</td>
                                </tr>
                                <tr>
                                    <td width="200">CONV. COLLECTIVE :</td>
                                    <td>ING&amp;CAD. METALLURGIE NATIONAL</td>
                                </tr>
                                </table>
                            <table>
                            	<tr>
                                	<td height="20" colspan="2"></td>
                                    <td></td>
                                </tr>
                                <tr>
                                	<td width="200">
                                    	Paiement le :
                                    </td>
                                    <td>
                                    	31.01.2015
                                    </td>
                                </tr>
                            </table>
                        </td>
                        <td width="1%"></td>
                        <td valign="top" width="40%">
                        	<table cellpadding="0" cellspacing="0" width="100%">
                            	<tr>
                                	<td valign="top"> <h2 style="font-size:28px; margin:0px; ">BULLETIN DE PAIE</h2></td>
                                </tr>

                                <tr>
                                  <td valign="top">&nbsp;</td>
                                </tr>

                                <tr>
                                  <td valign="top">&nbsp;</td>
                                </tr>


                            </table>
                            <table>
                            	<tr>
                                	<td width="200">Mois/année paie :</td>
                                    <td>01/2015</td>
                                </tr>
                                <tr>
                                	<td width="200">Période du : </td>
                                    <td>01.01.2015 au 31.01.2015</td>
                                </tr>
                                <tr>
                                	<td width="200">N° Sécurité Sociale : </td>
                                    <td>XXXXXXXXXXXXX</td>
                                </tr>
                                <tr>
                                	<td colspan="2" height="20"></td>
                                    
                                </tr>
                            </table>
                            <table cellpadding="0" cellspacing="0" width="100%" style="padding:0px 5px;">
                            	<tr>
                                	<td>M. John Doe</td>
                                </tr>
                                <tr>
                                	<td>Batiment A</td>
                                </tr>
                                <tr>
                                	<td>1 avenue du Louvre</td>
                                </tr>
                                <tr>
                                    <td>75001 Paris</td>
                                </tr>

                            </table>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr>
        	<td height="40"> </td>
        </tr>
        <tr>
        	<td>
            	<table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px; line-height:20px;">
                	<tr>
                    	<td width="33%">
                        	<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #000; border-right:none; padding:5px;" >
                            	<tr>
                                    <td width="40%" style="padding:2px;">Emploi :</td>
                                    <td width="60%" style="padding:2px;">Consultant</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">Catégorie :</td>
                                    <td width="60%" style="padding:2px;">Cadre</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">Forfait :</td>
                                    <td width="60%" style="padding:2px;">218 js/an</td>
                                </tr>
                            </table>
                        </td>
                        
                        <td width="33%">
                        	<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #000; border-right:none; border-left:none; padding:5px;" >
                            	<tr>
                                    <td width="40%" style="padding:2px;">Assurance santé :</td>
                                    <td width="60%"  style="padding:2px;">Rég. Gén.</td>
                                </tr>
                                <tr>
                                    <td width="40%"  style="padding:2px;">Assurance invalidité :</td>
                                    <td width="60%" style="padding:2px;">Rég. Gén.</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">Assurance vieillesse :</td>
                                    <td width="60%" style="padding:2px;">Rég. Gén.</td>
                                </tr>
                            </table>
                        </td>
                        
                        <td width="33%">
                        	<table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #000; border-left:none; padding:5px;  ">
                            	<tr>
                                    <td width="40%" style="padding:2px;">Sal. Tp plein :</td>
                                    <td width="60%" style="padding:2px;">2500,00</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">% d’activité :</td>
                                    <td width="60%" style="padding:2px;">100,00</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">Heures/Mois :</td>
                                    <td width="60%" style="padding:2px;">151,67</td>
                                </tr>
                            </table>
                        </td>
                        
                        
                    </tr>
                </table>
            </td>
        </tr>
        
        <tr>
        	<td height="20"></td>
        </tr>
        <tr>
        	<td>
            	<table cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #000; font-size:14px; line-height:20px;"> 
                	<tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; border-bottom:1px solid #000; background-color:#b0d8e8;">Rub.</td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;border-bottom:1px solid #000;">Libelle</td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;border-bottom:1px solid #000; background-color:#b0d8e8;">Base</td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;border-bottom:1px solid #000;">Taux</td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;border-bottom:1px solid #000; background-color:#b0d8e8;">Montant </td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;border-bottom:1px solid #000;">Taux</td>
                        <td align="center" style="padding:2px;border-bottom:1px solid #000; background-color:#b0d8e8;">Cot. Pat </td>
                    </tr>
                    <tr>
                    	<td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20 " style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20"style="padding:2px; background-color:#b0d8e8;"></td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">BASE</td>
                        <td style="padding:2px; border-right:1px solid #000;">Salaire de base</td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8; text-align:right;">3 789,00</td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="center" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="center" style="padding:2px; background-color:#b0d8e8;"> </td>
                    </tr>
                    <tr>
                    	<td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20 " style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20"style="padding:2px; background-color:#b0d8e8;"></td>
                    </tr>
                  
                     <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td style="padding:2px; border-right:1px solid #000;"><h4 style="margin:0px; min-height:26px; background:#f2f2f2;"><b style=" padding:2px;">*** Assurance santé ***</b><span style="float:right; padding:3px; background:#ddd; padding-left:20px;">1 002,57</span></h4></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>8,610%</b></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> <b>326,23</b></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>17,850%</b></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> <b>676,34</b></td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AM-RG</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assurance maladie</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,750%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 28,42</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">13,100%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> 496,36</td>
                    </tr>
                    
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AM-P</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assurance maladie privée (forfait)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">260,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">100,000%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> 260,00</td>
                    </tr>
                    
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">CSG</td>
                        <td style="padding:2px; border-right:1px solid #000;">Contribution Sociale Généralisée non imposable</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">5,100%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 189,86</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> </td>
                    </tr>
                    
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">CRDS</td>
                        <td style="padding:2px; border-right:1px solid #000;">Contribution pour le Remboursement de la Dette Sociale imposable</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">2,900%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 107,96</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> </td>
                    </tr>
                     <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AM-C</td>
                        <td style="padding:2px; border-right:1px solid #000;">Mutuelle complémentaire</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">4,750%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">179,98 </td>
                    </tr>
                    <tr>
                    	<td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20 " style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20"style="padding:2px; background-color:#b0d8e8;"></td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td style="padding:2px; border-right:1px solid #000;"><h4 style="margin:0px; min-height:26px; background:#f2f2f2;"><b style=" padding:2px;">*** Assurance décès, invalidité & arrêt de travail ***</b><span style="float:right; padding:3px; background:#ddd; padding-left:20px;">41,68</span></h4></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>1,100%</b></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> <b>41,68</b></td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">ATMP</td>
                        <td style="padding:2px; border-right:1px solid #000;">Cotisations Accidents du Travail / Maladie Professionnelle</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">1,100%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">41,68 </td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">ATMP-P</td>
                        <td style="padding:2px; border-right:1px solid #000;">Prévoyance privée</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">1,000%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">37,89</td>
                    </tr>
                    
                    <tr>
                    	<td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20 " style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20"style="padding:2px; background-color:#b0d8e8;"></td>
                    </tr>
                    
                    
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td style="padding:2px; border-right:1px solid #000;"><h4 style="margin:0px; min-height:26px; background:#f2f2f2;"><b style=" padding:2px;">*** Assurance chomage ***</b><span style="float:right; padding:3px; background:#ddd; padding-left:20px;">2,27</span></h4></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>0,024%</b></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> <b>0,91</b></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>0,036%</b></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> <b>1,36</b></td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">PE</td>
                        <td style="padding:2px; border-right:1px solid #000;">Pole Emploi</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">2,400%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 90,94</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">4,000%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">151,56 </td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AGS</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assoc. pour la gest. du rég. de Garantie des créances des Salariés</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,300%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">11,37</td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">APEC</td>
                        <td style="padding:2px; border-right:1px solid #000;">Association Pour l’Emploi des Cadres</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,024%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 0,91 </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,036%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">1,36</td>
                    </tr>
                    <tr>
                    	<td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20 " style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20"style="padding:2px; background-color:#b0d8e8;"></td>
                    </tr>
                     <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td style="padding:2px; border-right:1px solid #000;"><h4 style="margin:0px; min-height:26px; background:#f2f2f2;"><b style=" padding:2px;">*** Assurance vieillesse ***</b><span style="float:right; padding:3px; background:#ddd; padding-left:20px;">1 029,32</span></h4></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>10,845%</b></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> <b>410,92</b></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>16,321%</b></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> <b>618,40</b></td>
                    </tr>
                    
                    
                    
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AV-P</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assurance vieillesse plafonnée</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 170,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">6,850%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 217,15</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">8,500%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">269,45 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AV-DP</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assurance vieillesse déplafonnée</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,300%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">11,37</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">1,800%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">68,20 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">ARRCO-T1</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assoc. pour le Rég. de Retraite COmplémentaire des salariés (T1)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">3,100%</td>  
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 98,27</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">4,650%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">147,41 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">ARRCO-T2</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assoc. pour le Rég. de Retraite COmplémentaire des salariés (T2)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">619,00</td>  
                        <td align="right" style="padding:2px;border-right:1px solid #000;">8,100% </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 50,14 </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">12,150%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">75,21</td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AGIRC-TB</td>
                        <td style="padding:2px; border-right:1px solid #000;">Association Générale des Institutions de Retraite des Cadres (TB)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">619,00</td>    
                        <td align="right" style="padding:2px;border-right:1px solid #000;">7,800%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 48,28</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">12,750%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">78,92 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AGIRC-TC</td>
                        <td style="padding:2px; border-right:1px solid #000;">Association Générale des Institutions de Retraite des Cadres (TC)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">0,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,360%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 0,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">20,190%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">0,00 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">CET</td>
                        <td style="padding:2px; border-right:1px solid #000;">Contribution Exceptionnelle et Temporaire</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,130%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 4,93</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,220%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">8,34 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AGFF-T1</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assoc. pour la Gest. du Fonds de Fin. de l’AGIRC et de l’ARRCO (T1)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 170,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,800%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 25,36</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">1,200%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">38,04 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">AGFF-T2</td>
                        <td style="padding:2px; border-right:1px solid #000;">Assoc. pour la Gest. du Fonds de Fin. de l’AGIRC et de l’ARRCO (T2)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">619,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,900%</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> 5,57</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">1,300%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">8,05 </td>
                    </tr>
                     <tr>
                    	<td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20 " style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td height="20" style="padding:2px;border-right:1px solid #000;"></td>
                        <td height="20"style="padding:2px; background-color:#b0d8e8;"></td>
                    </tr>
                     <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td style="padding:2px; border-right:1px solid #000;"><h4 style="margin:0px; min-height:26px; background:#f2f2f2;"><b style=" padding:2px;">*** Autres cotisations et contributions sociales ***</b><span style="float:right; padding:3px; background:#ddd; padding-left:20px;">249,46</span></h4></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>6,584%</b></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> <b>249,46</b></td>
                    </tr>
                     <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">CAF</td>
                        <td style="padding:2px; border-right:1px solid #000;">Cotisations dAllocations Familiales</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">5,250%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">198,92 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">CSA</td>
                        <td style="padding:2px; border-right:1px solid #000;">Contribution Solidarité Autonomie</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,300%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">11,37 </td>
                    </tr>
                      <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">FNAL</td>
                        <td style="padding:2px; border-right:1px solid #000;">Fonds National dAide au Logement</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 170,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>  
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">0,100%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">3,17 </td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">FORF-SOC</td>
                        <td style="padding:2px; border-right:1px solid #000;">Forfait Social</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">179,98</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>  
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">20,000%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">36,00</td>
                    </tr>
                    <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td style="padding:2px; border-right:1px solid #000;"><h4 style="margin:0px; min-height:26px; background:#f2f2f2;"><b style=" padding:2px;">*** Autres taxes et participations ***</b><span style="float:right; padding:3px; background:#ddd; padding-left:20px;">0,00</span></h4></td>
                        <td align="center" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"> </td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"><b>0,000%</b></td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;"> <b>0,00</b></td>
                    </tr>
                     <tr>
                    	<td align="center" style="padding:2px; border-right:1px solid #000; background-color:#b0d8e8;">VT</td>
                        <td style="padding:2px; border-right:1px solid #000;">Versement Transport (Versailles)</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;">3 789,00</td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000; background-color:#b0d8e8;"></td>
                        <td align="right" style="padding:2px;border-right:1px solid #000;">1,700%</td>
                        <td align="right" style="padding:2px; background-color:#b0d8e8;">64,41 </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        
        <tr>
        	<td height="20"></td>
        </tr>
        <tr>
        	<td>
            	<table width="100%" cellspacing="0" cellpadding="0" style="font-size:14px; line-height:20px;">
                    <tbody><tr>
                        <td width="30%">
                            <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #000; border-right:none; padding:5px;">
                                <tbody><tr>
                                    <td width="40%" style="padding:2px;">Net à payer :</td>
                                    <td width="60%" style="padding:2px;">2 906,86</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">Net imposable :</td>
                                    <td width="60%" style="padding:2px;">3 197,80</td>
                                </tr>
                                <tr>
                                    <td width="40%" style="padding:2px;">Salaire total :</td>
                                    <td width="60%" style="padding:2px;">5 236,16</td>
                                </tr>
                            </tbody></table>
                        </td>
                        
                     
                        
                        <td width="70%">
                            <table width="100%" cellspacing="0" cellpadding="0" style="border:1px solid #000; border-left:none; padding:5px;">
                                <tbody><tr>
                                    <td width="25%" style="padding:2px;">Charges salariales :</td>
                                    <td width="75%" style="padding:2px;">738,06</td>
                                </tr>
                                <tr>
                                    <td width="25%" style="padding:2px;">Charges patronales :</td>
                                    <td width="75%" style="padding:2px;">1 587,24</td>
                                </tr>
                                <tr>
                                    <td width="25%" style="padding:2px;">&nbsp;</td>
                                    <td width="75%" style="padding:2px;">&nbsp;</td>
                                </tr>
                                </tbody></table>
                        </td>
                        
                        
                    </tr>
                </tbody></table>
            </td>
        </tr>
<tr>
        <td>

        <table width="100%" style="text-align:center; font-size:14px; line-height:20px; margin-top:10px;">
        <tr>
        <td>Nous vous recommandons de conserver votre bulletin de paie, sans limitation de durée.</td>
         </tr>
         </table>
        </td>

</tr>

    </table>
</div>
</body>';
 
$dompdf->load_html($html);
$dompdf->render();
 
$dompdf->stream("hello.pdf");