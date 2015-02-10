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
    $scope.re_private_health_ins_amnt = 270;
    $scope.re_private_pension_amnt = 100;
    $scope.re_unemployment_ins_amnt = 50;
    $scope.re_annual_return = 0.00;

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
    $scope.con_collective_options = [{value:"KALICONT000027040696",text:"5 branches industries alimentaires diverses du 21 mars 2012 "},
{value:"KALICONT000005635725",text:"Accord national interprofessionnel des voyageurs, représentants, placiers du 3 octobre 1975"},
{value:"KALICONT000005635384",text:"Acteurs du lien social et familial : centres sociaux et socioculturels, associations d'accueil de..."},
{value:"KALICONT000005635995",text:"Acteurs et acteurs de complément de la production cinématographique du 1er septembre 1967"},
{value:"KALICONT000025496787",text:"Activités de marchés financiers du 11 juin 2010"},
{value:"KALICONT000005635411",text:"Activités de production des eaux embouteillées et boissons rafraîchissantes sans alcool et de biè..."},
{value:"KALICONT000005635782",text:"Activités du déchet du 11 mai 2000"},
{value:"KALICONT000005635691",text:"Activités industrielles de boulangerie et pâtisserie du 13 juillet 1993"},
{value:"KALICONT000005635177",text:"Animation du 28 juin 1988"},
{value:"KALICONT000018797550",text:"Appointements minima des ingénieurs, assimilés et cadres du bâtiment et des travaux publics du 30..."},
{value:"KALICONT000005635273",text:"Artistes musiciens de la production cinématographique du 1er juillet 1964"},
{value:"KALICONT000005635286",text:"Artistes-interprètes engagés pour des émissions de télévision du 30 décembre 1992"},
{value:"KALICONT000005635133",text:"Assainissement et de la maintenance industrielle du 21 mai 2002"},
{value:"KALICONT000005635807",text:"Assistants maternels du particulier employeur du 1er juillet 2004"},
{value:"KALICONT000005635351",text:"Associations agréées de surveillance de la qualité de l'air du 3 octobre 2001"},
{value:"KALICONT000027939865",text:"Associations de gestion et de comptabilité du 8 janvier 2013"},
{value:"KALICONT000027181035",text:"Ateliers et chantiers d'insertion du 31 mars 2011 "},
{value:"KALICONT000005635185",text:"Avocats et de leur personnel du 20 février 1979"},
{value:"KALICONT000005635780",text:"Banque du 10 janvier 2000"},
{value:"KALICONT000005635412",text:"Bijouterie, joaillerie, orfèvrerie et activités qui s'y rattachent du 5 juin 1970 (mise à jour pa..."},
{value:"KALICONT000005635491",text:"Blanchisserie, laverie, location de linge, nettoyage à sec, pressing et teinturerie du 17 novembr..."},
{value:"KALICONT000005635593",text:"Boucherie, boucherie-charcuterie, boucherie hippophagique, triperie, commerces de volailles et gi..."},
{value:"KALICONT000005635886",text:"Boulangerie-pâtisserie du 19 mars 1976"},
{value:"KALICONT000005635442",text:"Boyauderie du 19 février 1989"},
{value:"KALICONT000025805800",text:"Branche de l'aide, de l'accompagnement, des soins et des services à domicile du 21 mai 2010"},
{value:"KALICONT000005635871",text:"Bricolage (Vente au détail en libre-service) du 30 septembre 1991"},
{value:"KALICONT000005635173",text:"Bureaux d'études techniques, des cabinets d'ingénieurs-conseils et des sociétés de conseils du 15..."},
{value:"KALICONT000005636008",text:"Cabinets d'avocats (avocats salariés) du 17 février 1995"},
{value:"KALICONT000005635826",text:"Cabinets d'experts-comptables et de commissaires aux comptes du 9 décembre 1974"},
{value:"KALICONT000005635655",text:"Cabinets dentaires du 17 janvier 1992 "},
{value:"KALICONT000005635994",text:"Cabinets et cliniques vétérinaires du 5 juillet 1995"},
{value:"KALICONT000005636009",text:"Cabinets ou entreprises d'expertises en automobiles du 20 novembre 1996"},
{value:"KALICONT000005635804",text:"Cabinets ou entreprises de géomètres-experts, géomètres-topographes, photogrammètres et experts f..."},
{value:"KALICONT000005635951" ,text:"adres administratifs de la presse quotidienne départementale du 1er octobre 1974"},
{value:"KALICONT000019423645",text:"Cadres administratifs et voyageurs des entreprises de presse hebdomadaire du 1er juillet 1972"},
{value:"KALICONT000005635693",text:"Cadres de l'importation charbonnière, des usines d'agglomération de houille et du commerce de com..."},
{value:"KALICONT000005635486",text:"Cadres de la presse hebdomadaire régionale d'information du 15 octobre 1989"},
{value:"KALICONT000019423552",text:"Cadres de la presse périodique du 30 juin 1972"},
{value:"KALICONT000005635592",text:"Cadres des commerces de quincaillerie, fournitures industrielles, fers, métaux et équipement de l..."},
{value:"KALICONT000005635430",text:"Cadres des industries de carrières et matériaux du 6 décembre 1956"},
{value:"KALICONT000018925934",text:"Cadres des travaux publics du 1er juin 2004"},
{value:"KALICONT000017941839",text:"Cadres du bâtiment du 1er juin 2004"},
{value:"KALICONT000005635417",text:"Cadres du négoce des matériaux de construction du 21 mars 1972"},
{value:"KALICONT000005635947",text:"Cadres et agents de maîtrise de l'édition de musique du 14 juin 1979"},
{value:"KALICONT000005635265",text:"Cadres et agents de maîtrise de la distribution des films de l'industrie cinématographique du 30 ..."},
{value:"KALICONT000005635952",text:"Cadres techniques de la presse quotidienne départementale du 12 juin 1979"},
{value:"KALICONT000005635984",text:"Cadres, agents de maîtrise et assistants des auditoriums cinématographiques du 30 juin 1994"},
{value:"KALICONT000005635671",text:"Cadres, ingénieurs et assimilés des entreprises de gestion d'équipements thermiques et de climati..."},
{value:"KALICONT000005635630",text:"Cadres, techniciens et employés de la publicité française du 22 avril 1955"},
{value:"KALICONT000005635761",text:"Cadres, techniciens, agents de maîtrise de la presse d'information spécialisée du 1er juillet 199..."},
{value:"KALICONT000005635255",text:"Camping du 13 janvier 1970 (actualisée le 10 décembre 1991)"},
{value:"KALICONT000005635597",text:"Caoutchouc du 6 mars 1953"},
{value:"KALICONT000005635618",text:"Casinos du 29 mars 2002"},
{value:"KALICONT000005635282",text:"Caves coopératives vinicoles et leurs unions du 22 avril 1986"},
{value:"KALICONT000005635909",text:"Centres de gestion agréés du 17 janvier 1983"},
{value:"KALICONT000021213367",text:"Centres de lutte contre le cancer du 1er janvier 1999"},
{value:"KALICONT000005635097",text:"Centres immatriculés de conditionnement, de commercialisation et de transformation des œufs et de..."},
{value:"KALICONT000005635375",text:"Charcuterie de détail du 4 avril 2007"},
{value:"KALICONT000005635326",text:"Chaînes de cafétérias et assimilés du 28 août 1998"},
{value:"KALICONT000005635585",text:"Chaînes thématiques du 23 juillet 2004"},
{value:"KALICONT000018563755",text:"Coiffure et des professions connexes du 10 juillet 2006"},
{value:"KALICONT000005635230",text:"Collaborateurs salariés des cabinets d'économistes de la construction et de métreurs vérificateur..."},
{value:"KALICONT000005635594",text:"Commerce de détail de l'habillement et des articles textiles du 25 novembre 1987, révisé par aven..."},
{value:"KALICONT000005635827",text:"Commerce de détail de l'horlogerie bijouterie du 17 décembre 1987"},
{value:"KALICONT000005635421",text:"Commerce de détail des fruits et légumes, épicerie et produits laitiers du 15 avril 1988"},
{value:"KALICONT000005635085",text:"Commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001"},
{value:"KALICONT000005635225",text:"Commerce de gros de la confiserie, chocolaterie , biscuiterie et alimentation fine et des négocia..."},
{value:"KALICONT000005635247",text:"Commerce de gros des tissus, tapis et linge de maison du 15 décembre 1993"},
{value:"KALICONT000005635645",text:"Commerce des articles de sports et d'équipements de loisirs du 26 juin 1989"},
{value:"KALICONT000005635695",text:"Commerce des machines à coudre du 1er juillet 1973"},
{value:"KALICONT000005635191",text:"Commerce et de la réparation de l'automobile, du cycle et du motocycle et des activités connexes,..."},
{value:"KALICONT000005635394",text:"Commerce succursaliste de la chaussure du 2 juillet 1968, mise à jour le 18 novembre 1971 (1) "},
{value:"KALICONT000005635434",text:"Commerces de détail de papeterie, fournitures de bureau, de bureautique et informatique et de lib..."},
{value:"KALICONT000005635870",text:"Commerces de détail non alimentaires : antiquités, brocante, galeries d'art (œuvres d'art), arts de la table, coutellerie, droguerie, équipement du foyer, bazars, commerces ménagers, modélisme, jeux, jouets, puérinatalité et maroquinerie du 9 mai 2012 (avenant du 9 mai 2012)"},
{value:"KALICONT000005635640",text:"Commerces de gros de l'habillement, de la mercerie, de la chaussure et du jouet du 13 mars 1969"},
{value:"KALICONT000005635373",text:"Commerces de gros du 23 juin 1970"},
{value:"KALICONT000005635164",text:"Commerces et services de l'audiovisuel, de l'électronique et de l'équipement ménager du 26 novemb..."},
{value:"KALICONT000005635374",text:"Conchyliculture"},
{value:"KALICONT000005635649",text:"Conditions de travail des employés, techniciens et agents de maîtrise des industries de carrières..."},
{value:"KALICONT000005635206",text:"Conditions de travail des ouvriers des industries de carrières et de matériaux du 22 avril 1955"},
{value:"KALICONT000005635944",text:"Conditions de travail du personnel des industries céramiques de France du 6 juillet 1989"},
{value:"KALICONT000020089210",text:"Conseils d'architecture, d'urbanisme et de l'environnement du 24 mai 2007"},
{value:"KALICONT000005635504",text:"Conserveries coopératives et SICA (Avenant n° 116 du 13 juillet 2011)"},
{value:"KALICONT000018563634",text:"Coopération maritime du 7 décembre 2004 (réécrite par avenant n° 8 du 23 novembre 2011) "},
{value:"KALICONT000005636018",text:"Coopératives agricoles de céréales, de meunerie, d'approvisionnement, d'alimentation du bétail et..."},
{value:"KALICONT000022238768",text:"Coopératives agricoles de teillage du lin du 21 mars 1985"},
{value:"KALICONT000005635700",text:"Coopératives agricoles laitières du 7 juin 1984"},
{value:"KALICONT000005635752",text:"Coopératives agricoles, unions de coopératives agricoles et SICA de fleurs, de fruits et légumes ..."},
{value:"KALICONT000005635520",text:"Coopératives et sociétés d'intérêt collectif agricole bétail et viande du 21 mai 1969"},
{value:"KALICONT000005635662",text:"Cordonnerie multiservice du 7 août 1989"},
{value:"KALICONT000005635552",text:"Couture parisienne du 10 juillet 1961"},
{value:"KALICONT000019906336",text:"Crédit maritime mutuel du 18 janvier 2002"},
{value:"KALICONT000005635708",text:"Céramique d'art du 29 avril 1994"},
{value:"KALICONT000005635657",text:"Distributeurs conseils hors domicile (distributeurs CHD)"},
{value:"KALICONT000005635441",text:"Distribution des papiers-cartons commerces de gros pour les ouvriers, employés, techniciens et ag..."},
{value:"KALICONT000005635128",text:"Distribution directe du 9 février 2004"},
{value:"KALICONT000005635629",text:"Détaillants en chaussures du 27 juin 1973"},
{value:"KALICONT000005635899",text:"Détaillants et détaillants-fabricants de la confiserie,  chocolaterie, biscuiterie du 1er janvier..."},
{value:"KALICONT000005635254",text:"Employés de l'édition de musique du 15 avril 1982"},
{value:"KALICONT000005635764",text:"Employés de la presse d'information spécialisée du 1er juillet 1995 (signée le 28 mars 1995)"},
{value:"KALICONT000019423727",text:"Employés de la presse hebdomadaire parisienne du 1er avril 1974"},
{value:"KALICONT000005635680",text:"Employés de la presse quotidienne départementale du 11 octobre 1972"},
{value:"KALICONT000005635465",text:"Employés de la presse quotidienne régionale du 28 novembre 1972"},
{value:"KALICONT000005635615",text:"Employés de presse hebdomadaire régionale (S"},
{value:"KALICONT000005635591",text:"Employés et agents de maîtrise des commerces de quincaillerie, fournitures industrielles, fers, m..."},
{value:"KALICONT000023822189",text:"Employés et cadres du régime social des indépendants du 20 mars 2008"},
{value:"KALICONT000005635264",text:"Employés et ouvriers de la distribution cinématographique du 1er mars 1973"},
{value:"KALICONT000005635450",text:"Employés, techniciens et agents de maîtrise de l'importation charbonnière, des usines d'aggloméra..."},
{value:"KALICONT000018926209",text:"Employés, techniciens et agents de maîtrise des travaux publics du 12 juillet 2006"},
{value:"KALICONT000024794551",text:"Employés, techniciens et agents de maîtrise du bâtiment de la région Ile-de-France (hors Seine-et..."},
{value:"KALICONT000018773893",text:"Employés, techniciens et agents de maîtrise du bâtiment du 12 juillet 2006"},
{value:"KALICONT000027334050",text:"Employés, techniciens et agents de maîtrise du bâtiment et travaux publics (Guadeloupe) du 24 jui..."},
{value:"KALICONT000027343053",text:"Employés, techniciens et agents de maîtrise du bâtiment, travaux publics et activités annexes (Ma..."},
{value:"KALICONT000005635634",text:"Employés, techniciens et agents de maîtrise du négoce des matériaux de construction du 17 novembr..."},
{value:"KALICONT000005635259",text:"Encadrement de la presse quotidienne régionale du 12 décembre 1995"},
{value:"KALICONT000019593660",text:"Enseignement privé hors contrat du 27 novembre 2007 "},
{value:"KALICONT000005635332",text:"Enseignement privé à distance du 21 juin 1999"},
{value:"KALICONT000018879385",text:"Enseignement, écoles supérieures d'ingénieurs et de cadres ― FESIC du 5 décembre 2006"},
{value:"KALICONT000005635964",text:"Entreprises artistiques et culturelles du 1er janvier 1984"},
{value:"KALICONT000005635480",text:"Entreprises d'accouvage et de sélection du 2 avril 1974"},
{value:"KALICONT000005635365",text:"Entreprises d'architecture du 27 février 2003"},
{value:"KALICONT000005635660",text:"Entreprises d'expertises en matière d'évaluations industrielles et commerciales du 7 décembre 1976"},
{value:"KALICONT000005635142",text:"Entreprises d'expédition et d'exportation de fruits et légumes du 17 décembre 1985"},
{value:"KALICONT000005635396",text:"Entreprises d'installation sans fabrication, y compris entretien, réparation, dépannage de matéri..."},
{value:"KALICONT000005635612",text:"Entreprises de commission, de courtage et de commerce intracommunautaire et d'importation-exporta..."},
{value:"KALICONT000005635720",text:"Entreprises de courtage d'assurances et/ou de réassurances du 18 janvier 2002, étendue par arrêté..."},
{value:"KALICONT000005635437",text:"Entreprises de désinfection, désinsectisation, dératisation (3D) du 1er septembre 1991"},
{value:"KALICONT000005635451",text:"Entreprises de l'industrie et des commerces en gros des viandes du 20 février 1969 remise à jour ..."},
{value:"KALICONT000005635474",text:"Entreprises de logistique de communication écrite directe du 19 novembre 1991"},
{value:"KALICONT000027172335",text:"Entreprises de propreté et services associés du 26 juillet 2011"},
{value:"KALICONT000005635405",text:"Entreprises de prévention et de sécurité du 15 février 1985"},
{value:"KALICONT000027084096",text:"Entreprises de services à la personne du 20 septembre 2012"},
{value:"KALICONT000005635798",text:"Entreprises de vente à distance du 6 février 2001  "},
{value:"KALICONT000005635338",text:"Entreprises des services d'eau et d'assainissement du 12 avril 2000"},
{value:"KALICONT000005635910",text:"Entreprises du négoce et de l'industrie des produits du sol, engrais et produits connexes du 2 ju..."},
{value:"KALICONT000005635325",text:"Entreprises du paysage du 10 octobre 2008"},
{value:"KALICONT000028157262",text:"Entreprises du secteur privé du spectacle vivant du 3 février 2012 "},
{value:"KALICONT000005635429",text:"Entreprises relevant de la navigation de plaisance du 31 mars 1979"},
{value:"KALICONT000019382978",text:"Entreprises relevant de la sélection et de la reproduction animale du 15 avril 2008 "},
{value:"KALICONT000019906603",text:"Entreprises techniques au service de la création et de l'événement du 21 février 2008"},
{value:"KALICONT000005635453",text:"Espaces des loisirs, d'attractions et culturels du 5 janvier 1994"},
{value:"KALICONT000027065067",text:"Esthétique-cosmétique et de l'enseignement technique et professionnel lié aux métiers de l'esthét..."},
{value:"KALICONT000005635203",text:"Exploitation cinématographique du 19 juillet 1984 "},
{value:"KALICONT000005635258",text:"Exploitations frigorifiques du 10 juillet 1956"},
{value:"KALICONT000005635616",text:"Fabrication de l'ameublement du 14 janvier 1986"},
{value:"KALICONT000018902144",text:"Fabrication du verre à la main, semi-automatique et mixte du 3 novembre 1994"},
{value:"KALICONT000005635900",text:"Fabrication et du commerce des produits à usage pharmaceutique, parapharmaceutique et vétérinaire..."},
{value:"KALICONT000005635507",text:"leuristes, de la vente et des services des animaux familiers du 21 janvier 1997"},
{value:"KALICONT000005635193",text:"Fourrure du 29 juin 1972 "},
{value:"KALICONT000005635953",text:"Gardiens, concierges et employés d'immeubles (réécrite par l'avenant n° 74 du 27 avril 2009 porta..."},
{value:"KALICONT000005635559",text:"Golf du 13 juillet 1998"},
{value:"KALICONT000005635093",text:"Grand magasins et des magasins populaires du 30 juin 2000"},
{value:"KALICONT000005635847",text:"Guides accompagnateurs et accompagnateurs au service des agences de voyages et de tourisme du 10 ..."},
{value:"KALICONT000019074623",text:"Guides et accompagnateurs en milieu amazonien du 12 mai 2007"},
{value:"KALICONT000005635697",text:"Guides interprètes de la région parisienne du 21 juin 1962"},
{value:"KALICONT000005635887",text:"Horlogerie du 17 décembre 1979"},
{value:"KALICONT000005635813",text:"Hospitalisation privée du 18 avril 2002"},
{value:"KALICONT000005635252",text:"Hôtellerie de plein air du 2 juin 1993"},
{value:"KALICONT000005635658",text:"Hôtels de tourisme trois, quatre et quatre étoiles luxe de Paris et de la région parisienne du 1e..."},
{value:"KALICONT000005635626",text:"Hôtels du 1er juillet 1975"},
{value:"KALICONT000005635534",text:"Hôtels, cafés restaurants (HCR) du 30 avril 1997"},
{value:"KALICONT000005635413",text:"mmobilier, administrateurs de biens, sociétés immobilières, agents immobiliers, etc"},
{value:"KALICONT000005635436",text:"Industrie de la chaussure et des articles chaussants du 31 mai 1968, révisée par protocole d'acco..."},
{value:"KALICONT000005635672",text:"Industrie de la ganterie de peau du 27 novembre 1962"},
{value:"KALICONT000005635631",text:"Industrie de la salaison, charcuterie en gros et conserves de viandes du 29 mars 1972"},
{value:"KALICONT000005635186",text:"Industrie des cuirs et peaux du 6 octobre 1956"},
{value:"KALICONT000018827610",text:"Industrie des glaces, sorbets et crèmes glacées du 3 mars 2006"},
{value:"KALICONT000005635337",text:"Industrie des panneaux à base de bois du 29 juin 1999"},
{value:"KALICONT000005635251",text:"Industrie des tuiles et briques du 17 février 1982"},
{value:"KALICONT000005635267",text:"ndustrie du pétrole du 3 septembre 1985"},
{value:"KALICONT000005635736",text:"Industrie du vitrail du 15 novembre 1996"},
{value:"KALICONT000005635449",text:"Industrie laitière du 20 mai 1955, modifiée par avenant n° 34 du 29 juin 2006"},
{value:"KALICONT000005635184",text:"Industrie pharmaceutique du 6 avril 1956"},
{value:"KALICONT000005635689",text:"ndustrie textile du 1er  février 1951"},
{value:"KALICONT000005635613",text:"Industries chimiques et connexes du 30 décembre 1952"},
{value:"KALICONT000005635650",text:"Industries de fabrication mécanique du verre du 8 juin 1972"},
{value:"KALICONT000005635647",text:"Industries de l'habillement du 17 février 1958"},
{value:"KALICONT000027556857",text:"Industries de la fabrication de la chaux du 4 décembre 2012"},
{value:"KALICONT000005635109",text:"Industries de la maroquinerie, articles de voyage, chasse-sellerie, gainerie, bracelets en cuir d..."},
{value:"KALICONT000005635648",text:"Industries de la sérigraphie et des procédés d'impression numérique connexes du 23 mars 1971  "},
{value:"KALICONT000005635284",text:"Industries de la transformation des volailles du 10 juillet 1996"},
{value:"KALICONT000005635840",text:"Industries de produits alimentaires élaborés du 17 janvier 1952"},
{value:"KALICONT000005635904",text:"Industries des jeux, jouets, articles de fêtes et ornements de Nöel, articles de puériculture et ..."},
{value:"KALICONT000005635466",text:"Industries et du commerce de la récupération du 6 décembre 1971"},
{value:"KALICONT000023278100",text:"Industries métallurgiques et connexes de Loir-et-Cher du 5 juillet 1991"},
{value:"KALICONT000025393730",text:"Industries métallurgiques, mécaniques et connexes (Gironde et Landes) Mise à jour par avenant du ..."},
{value:"KALICONT000019938657",text:"Industries métallurgiques, mécaniques et connexes de l'Aisne du 30 septembre 2005"},
{value:"KALICONT000005635149",text:"Industries métallurgiques, mécaniques et connexes de la région parisienne du 16 juillet 1954"},
{value:"KALICONT000005635462",text:"Ingénieurs et cadres de l'industrie de la fabrication des ciments du 5 juillet 1963"},
{value:"KALICONT000005635914",text:"Ingénieurs et cadres de la distribution des papiers et cartons, commerce de gros du 12 janvier 1977"},
{value:"KALICONT000005635842",text:"Ingénieurs et cadres de la métallurgie du 13 mars 1972"},
{value:"KALICONT000005635440",text:"Ingénieurs et cadres de la production des papiers, cartons et celluloses du 4 décembre 1972"},
{value:"KALICONT000005635669",text:"Ingénieurs et cadres de la transformation des papiers, cartons et de la pellicule cellulosique du..."},
{value:"KALICONT000017960049",text:"Ingénieurs, assimilés et cadres du bâtiment de la région parisienne du 12 avril 1960"},
{value:"KALICONT000005635475",text:"Inspection d'assurance du 27 juillet 1992"},
{value:"KALICONT000021259110",text:"Installateurs en remontées mécaniques du 15 mai 2006"},
{value:"KALICONT000005635873",text:"Instruments à écrire et des industries connexes du 13 février 1973"},
{value:"KALICONT000005635938",text:"Jardineries et graineteries du 3 décembre 1993"},
{value:"KALICONT000005635444",text:"Journalistes du 1er novembre 1976, refondue le 27 octobre 1987"},
{value:"KALICONT000005635553",text:"Laboratoires cinématographiques et sous-titrage du 17 mars 1999"},
{value:"KALICONT000005635844",text:"Laboratoires de biologie médicale extra-hospitaliers du 3 février 1978"},
{value:"KALICONT000027180935",text:"Librairie du 24 mars 2011"},
{value:"KALICONT000019765628",text:"Magasins prestataires de services de cuisine à usage domestique du  17 juillet 2008"},
{value:"KALICONT000019765628",text:"Magasins prestataires de services de cuisine à usage domestique du 17 juillet 2008 Maisons d'étudiants du 27 mai 1992"},
{value:"KALICONT000005635617",text:"Maisons à succursales de vente au détail d'habillement du 30 juin 1972"},
{value:"KALICONT000005635138",text:"Mannequins adultes et mannequins enfants de moins de 16 ans employés par les agences de mannequin..."},
{value:"KALICONT000022206280",text:"Manutention portuaire du port de Fort-de-France du 4 juillet 2003"},
{value:"KALICONT000005635209",text:"Mareyeurs-expéditeurs du 15 mai 1990"},
{value:"KALICONT000005635956",text:"Maîtres de l'enseignement primaire privé enseignant dans les classes hors contrat et sous contrat..."},
{value:"KALICONT000005635524",text:"Meunerie du 16 juin 1996"},
{value:"KALICONT000005635180",text:"Miroiterie, de la transformation et du négoce du verre du 9 mars 1988"},
{value:"KALICONT000005635091",text:"Missions locales et PAIO du 21 février 2001"},
{value:"KALICONT000005635784",text:"Mutualité du 31 janvier 2000"},
{value:"KALICONT000005635179",text:"Médecins spécialistes qualifiés au regard du conseil de l'ordre travaillant dans les établissemen..."},
{value:"KALICONT000005635653",text:"Métropolitaine des entreprises de la maintenance, distribution et location de matériels agricoles..."},
{value:"KALICONT000005635092",text:"Notariat du 8 juin 2001"},
{value:"KALICONT000005635906",text:"Nouvelle convention collective nationale des personnels des ports de plaisance du 8 mars 2012"},
{value:"KALICONT000005635438",text:"Nouvelle convention collective nationale des vins, cidres, jus de fruits, sirops, spiritueux et l..."},
{value:"KALICONT000005635751",text:"Négoce de bois d'oeuvre et de produits dérivés du 17 décembre 1996"},
{value:"KALICONT000005635115",text:"Négoce de l'ameublement du 31 mai 1995"},
{value:"KALICONT000005635851",text:"Négoce en fournitures dentaires du 26 novembre 1971"},
{value:"KALICONT000005635427",text:"Négoce et de distribution de combustibles solides, liquides, gazeux, produits pétroliers du 20 dé..."},
{value:"KALICONT000005636023",text:"Négoce et des prestations de services dans les domaines médico-techniques du 9 avril 1997"},
{value:"KALICONT000023973762",text:"mnipraticiens exerçant dans les centres de santé miniers du 23 janvier 2008"},
{value:"KALICONT000005635912",text:"ptique-lunetterie de détail du 2 juin 1986"},
{value:"KALICONT000005635376",text:"Organisations professionnelles de l'habitat social du 20 septembre 2005"},
{value:"KALICONT000005635435",text:"Organismes de formation du 10 juin 1988"},
{value:"KALICONT000005635728",text:"Organismes de tourisme du 5 février 1996"},
{value:"KALICONT000005635560",text:"Organismes gestionnaires de foyers et services pour jeunes travailleurs du 16 juillet 2003"},
{value:"KALICONT000005635283",text:"Ouvriers de l'importation charbonnière maritime et usines d'agglomération de houille du littoral ..."},
{value:"KALICONT000005635245",text:"Ouvriers de la presse quotidienne départementale du 25 octobre 1980"},
{value:"KALICONT000019459287",text:"Ouvriers de la presse quotidienne régionale du 2 décembre 1970"},
{value:"KALICONT000005635467",text:"Ouvriers de travaux publics du 15 décembre 1992"},
{value:"KALICONT000005635685",text:"Ouvriers du bâtiment de la région parisienne du 28 juin 1993"},
{value:"KALICONT000005635643",text:"Ouvriers du négoce des matériaux de construction du 17 juin 1965, étendue par arrêté du 12 avril ..."},
{value:"KALICONT000005635220",text:"Ouvriers employés par les entreprises du bâtiment non visées par le décret du 1er mars 1962 (c'es..."},
{value:"KALICONT000005635221",text:"Ouvriers employés par les entreprises du bâtiment visées par le décret du 1er mars 1962 (c'est-à-..."},
{value:"KALICONT000005635721",text:"Ouvriers indépendants des studios de la production cinématographique du 1er août 1960"},
{value:"KALICONT000005635192",text:"Ouvriers, employés, dessinateurs, techniciens et agents de maîtrise de la production des papiers,..."},
{value:"KALICONT000005635194",text:"Ouvriers, employés, dessinateurs, techniciens et agents de maîtrise de la transformation des papi..."},
{value:"KALICONT000005635452",text:"Ouvriers, employés, techniciens et agents de maîtrise de l'exploitation d'équipements thermiques ..."},
{value:"KALICONT000005635890",text:"Peintres en lettres, décorateurs et graphistes en signalisation, enseignes, publicité peinte du 1..."},
{value:"KALICONT000005635872",text:"Personnel au sol des entreprises de transport aérien du 22 mai 1959"},
{value:"KALICONT000005635336",text:"Personnel d'encadrement des agences de presse du 1er janvier 1996"},
{value:"KALICONT000023974594",text:"Personnel de direction du régime social des indépendants du 20 mars 2008"},
{value:"KALICONT000005635473",text:"Personnel de l'industrie, de la manutention et du nettoyage sur les aéroports ouverts à la circul..."},
{value:"KALICONT000005635891",text:"Personnel de la reprographie du 18 décembre 1972"},
{value:"KALICONT000005635858",text:"Personnel de la restauration publique du 1er juillet 1970"},
{value:"KALICONT000019647748",text:"Personnel des administrateurs et des mandataires judiciaires du 20 décembre 2007"},
{value:"KALICONT000005635399",text:"Personnel des agences de voyages et de tourisme du 12 mars 1993"},
{value:"KALICONT000005635399",text:"Personnel des agences de voyages et de tourisme du 12 mars 1993 (réécrite par avenant du 10 décem..."},
{value:"KALICONT000005635361",text:"Personnel des agences générales d'assurances du 2 juin 2003"},
{value:"KALICONT000005635395",text:"Personnel des agents immobiliers et mandataires en vente de fonds de commerce du 8 décembre 1971"},
{value:"KALICONT000023973173",text:"Personnel des banques de la Guadeloupe, de Saint-Martin et de Saint-Barthélemy du 19 décembre 2007 "},
{value:"KALICONT000005635409",text:"Personnel des cabinets médicaux  du 14 octobre 1981"},
{value:"KALICONT000005635936",text:"Personnel des centres équestres du 11 juillet 1975"},
{value:"KALICONT000005635781",text:"Personnel des coopératives de consommation du 30 avril 1956"},
{value:"KALICONT000005635702",text:"Personnel des entreprises de manutention ferroviaire et travaux connexes du 6 janvier 1970, actua..."},
{value:"KALICONT000005635418",text:"Personnel des entreprises de restauration de collectivités du 20 juin 1983"},
{value:"KALICONT000005635578",text:"Personnel des entreprises de transport de passagers en navigation intérieure du 23 avril 1997"},
{value:"KALICONT000005635521",text:"Personnel des huissiers de justice du 11 avril 1996"},
{value:"KALICONT000005635955",text:"Personnel des imprimeries de labeur et des industries graphiques"},
{value:"KALICONT000005635973",text:"Personnel des industries de cartonnage du 9 janvier 1969"},
{value:"KALICONT000005635350",text:"Personnel des organismes de contrôle laitier du 16 septembre 2002"},
{value:"KALICONT000005636001",text:"Personnel des parcs et jardins zoologiques privés ouverts au public du 24 janvier 2012 (Avenant d..."},
{value:"KALICONT000005635550",text:"Personnel des prestataires de services dans le domaine du secteur tertiaire du 13 août 1999"},
{value:"KALICONT000005635907",text:"Personnel des sociétés coopératives d'HLM du 15 mai 1990"},
{value:"KALICONT000005635651",text:"Personnel des voies ferrées d'intérêt local du 26 septembre 1974"},
{value:"KALICONT000022355776",text:"Personnel du Crédit mutuel Centre Est Europe, Sud-Est du 22 octobre 2004 "},
{value:"KALICONT000005635676",text:"Personnel employés, techniciens, dessinateurs et agents de maîtrise de l'industrie de la fabricat..."},
{value:"KALICONT000005635523",text:"Personnel navigant technique des exploitants d'hélicoptères du 13 novembre 1996"},
{value:"KALICONT000005635489",text:"Personnel occupé dans les établissements d'entraînement de chevaux de courses au trot du 9 janvie..."},
{value:"KALICONT000005635684",text:"Personnel ouvrier de l'industrie de la fabrication des ciments du 2 février 1976"},
{value:"KALICONT000025844703",text:"Personnel sédentaire des entreprises de navigation du 14 septembre 2010"},
{value:"KALICONT000005635584",text:"Personnel sédentaire des entreprises de transport de marchandises de la navigation intérieure (3 ..."},
{value:"KALICONT000005635906",text:"Personnels des ports de plaisance du 16 mars 1982"},
{value:"KALICONT000005635816",text:"Personnels des services administratifs et économiques, personnels d'éducation et documentalistes ..."},
{value:"KALICONT000005635331",text:"Personnels des sociétés anonymes et fondations d'HLM du 27 avril 2000"},
{value:"KALICONT000019647647",text:"Personnels des structures associatives cynégétiques du 13 décembre 2007 "},
{value:"KALICONT000005635269",text:"Personnels des élevages aquacoles du 20 mars 2007 "},
{value:"KALICONT000005635652",text:"Personnels PACT et ARIM du 21 octobre 1983"},
{value:"KALICONT000005635528",text:"Pharmacie d'officine du 3 décembre 1997"},
{value:"KALICONT000005635856",text:"Plasturgie du 1er  juillet 1960"},
{value:"KALICONT000005635410",text:"Poissonnerie du 12 avril 1988"},
{value:"KALICONT000005635490",text:"Pompes funèbres du 1er  mars 1974"},
{value:"KALICONT000019901252",text:"Portage de presse du 26 juin 2007"},
{value:"KALICONT000019074546",text:"Praticiens-conseils du régime général de sécurité sociale du 4 avril 2006"},
{value:"KALICONT000023974782",text:"Praticiens-conseils du régime social des indépendants du 15 juin 2007"},
{value:"KALICONT000018828041",text:"Production audiovisuelle du 13 décembre 2006"},
{value:"KALICONT000028059838",text:"Production cinématographique du 19 janvier 2012"},
{value:"KALICONT000005635129",text:"Production de films d'animation du 6 juillet 2004"},
{value:"KALICONT000005635268",text:"Professeurs de l'enseignement secondaire libre enseignant dans les établissements hors contrat et..."},
{value:"KALICONT000027961162",text:"Professions de la photographie du 13 février 2013"},
{value:"KALICONT000005635791",text:"Professions de la photographie du 31 mars 2000"},
{value:"KALICONT000005635181",text:"Promotion immobilière du 18 mai 1988"},
{value:"KALICONT000005635414",text:"Prothésistes dentaires et des personnels des laboratoires de prothèse dentaire du 18 décembre 1978"},
{value:"KALICONT000005635957",text:"Psychologues de l'enseignement privé du 11 janvier 1985"},
{value:"KALICONT000005635758",text:"âtes alimentaires sèches et du couscous non préparé du 3 juillet 1997"},
{value:"KALICONT000005635611",text:"Pâtisserie du 30 juin 1983"},
{value:"KALICONT000025278390",text:"Pôle emploi du 21 novembre 2009"},
{value:"KALICONT000005635741",text:"Radiodiffusion du 11 avril 1996 (accord d'étape) du 11 avril 1996"},
{value:"KALICONT000005635642",text:"Remontées mécaniques et domaines skiables du 15 mai 1968"},
{value:"KALICONT000005635694",text:"Restauration ferroviaire du 4 septembre 1984"},
{value:"KALICONT000005635596",text:"Restauration rapide du 18 mars 1988"},
{value:"KALICONT000019527541",text:"Retraite des employés de la publicité du 29 juin 1962"},
{value:"KALICONT000005635961",text:"Retraite et de prévoyance pour le personnel des imprimeries de labeur et des industries graphique..."},
{value:"KALICONT000027199162",text:"Régies de quartier du 2 avril 2012"},
{value:"KALICONT000005635232",text:"Répartition pharmaceutique du 7 janvier 1992"},
{value:"KALICONT000005635740",text:"Réseaux de transports publics urbains de voyageurs du 11 avril 1986"},
{value:"KALICONT000005635792",text:"Salariés du particulier employeur du 24 novembre 1999"},
{value:"KALICONT000005635223",text:"Services de santé au travail interentreprises du 20 juillet 1976"},
{value:"KALICONT000021284958",text:"Sidérurgie du 20 novembre 2001"},
{value:"KALICONT000018977636",text:"Sociétés concessionnaires ou exploitantes d'autoroutes ou d'ouvrages routiers du 27 juin 2006 "},
{value:"KALICONT000005635497",text:"Sociétés d'assistance du 13 avril 1994"},
{value:"KALICONT000005635918",text:"Sociétés d'assurances du 27 mai 1992"},
{value:"KALICONT000005635915",text:"Sociétés d'autoroutes du 1er  juin 1979"},
{value:"KALICONT000021636922",text:"Sociétés de ventes volontaires de meubles aux enchères publiques et des offices de commissaires-p..."},
{value:"KALICONT000005635810",text:"Sociétés financières du 22 novembre 1968"},
{value:"KALICONT000017577652",text:"Sport du 7 juillet 2005 étendue par arrêté du 21 novembre 2006"},
{value:"KALICONT000029100418",text:"Structures associatives de pêche de loisir et de protection du milieu aquatique du 22 juin 2013"},
{value:"KALICONT000025196564",text:"Sucreries, sucreries-distilleries et raffineries de sucre du 31 janvier 2008"},
{value:"KALICONT000021125058",text:"Taxis parisiens salariés du 11 septembre 2001"},
{value:"KALICONT000005635719",text:"Techniciens de la production cinématographique du 30 avril 1950"},
{value:"KALICONT000005636003",text:"Textiles artificiels et synthétiques et produits assimilés du 6 juin 1996                                                                                                             "},
{value:"KALICONT000005635545",text:"Thermalisme du 10 septembre 1999"},
{value:"KALICONT000005635867",text:"Tourisme social et familial du 28 juin 1979, mise à jour du 10 octobre 1984  "},
{value:"KALICONT000005635624",text:"Transports routiers et activités auxiliaires du transport du 21 décembre 1950                     "},
{value:"KALICONT000023973576",text:"Travail  du personnel des banques de la Martinique du 17 décembre 2007"},
{value:"KALICONT000005635916",text:"Travail aérien du 21 janvier 1991 (Personnel navigant des essais et réceptions)"},
{value:"KALICONT000005635699",text:"Travail concernant les gardes-chasse et gardes-pêche particuliers du 2 mai 1973"},
{value:"KALICONT000005635100",text:"Travail des employés des agences de presse du 1er juin 1998"},
{value:"KALICONT000019074623",text:"Travail des guides d'expédition, guides accompagnateurs et guides animateurs en milieu amazonien ..."},
{value:"KALICONT000023973390",text:"Travail du personnel des banques de la Guyane du 18 décembre 2007"},
{value:"KALICONT000005635698",text:"Travail du personnel des institutions de retraites complémentaires du 9 décembre 1993"},
{value:"KALICONT000005635966",text:"Travail mécanique du bois, des scieries, du négoce et de l'importation des bois du 28 novembre 1955"},
{value:"KALICONT000005635557",text:"Télécommunications du 26 avril 2000"},
{value:"KALICONT000029142476",text:"Unifiée ports et manutention du 15 avril 2011"},
{value:"KALICONT000005635822",text:"Union des chambres syndicales des métiers du verre du 18 décembre 2002"},
{value:"KALICONT000021124943",text:"Universités et instituts catholiques de France du 4 juin 2002  "},
{value:"KALICONT000005635438",text:"Vins, cidres, jus de fruits, sirops, spiritueux et liqueurs de France du 13 février 1969"},
{value:"KALICONT000005635824",text:"Vétérinaires praticiens salariés du 31 janvier 2006"},
{value:"KALICONT000028837824",text:"Éditeurs de la presse magazine (cadres) du 28 novembre 2013"},
{value:"KALICONT000028837830",text:"Éditeurs de la presse magazine (employés) du 28 novembre 2013                                                           "},
{value:"KALICONT000005635096",text:"Édition du 14 janvier 2000 "},
{value:"KALICONT000023974024",text:"Édition phonographique du 30 juin 2008 "},
{value:"KALICONT000005635535",text:"Établissements d'entraînement de chevaux de courses au galop du 20 décembre 1990"},
{value:"KALICONT000005635407",text:"Établissements et services pour personnes inadaptées et handicapées du 15 mars 1966"},
{value:"KALICONT000026950865",text:"Établissements médico-sociaux de l'union intersyndicale des secteurs sanitaires et sociaux (Avena..."},
{value:"KALICONT000005635234",text:"Établissements privés d'hospitalisation, de soins, de cure et de garde à but non lucratif du 31 o..."}];
    
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
    $scope.re_Rate_CI = parseFloat((1.000).toFixed(3));
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
          re_NDF:$scope.re_NDF
            };
        //set local storage
        LS.setData(pdfValues); 
    }

    function resetRoundMode(newValue, oldValue) {

      if(newValue != oldValue) {
                     setLocalStorage();  
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
          're_NDF':$scope.re_NDF
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
          $scope.employ_role = afterPayValue.employ_role
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
