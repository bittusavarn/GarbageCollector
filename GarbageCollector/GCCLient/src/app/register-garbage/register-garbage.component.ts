import { Component, OnInit, Input } from '@angular/core';
import { TransferServiceService } from '../services/transfer-service.service';
import { Router } from '@angular/router';
import { Address } from '../models/Address';
import { Garbage } from '../models/Garbage';
import { RestService } from '../services/rest.service';
import { ResponseTemplate } from '../models/ResponseTemplate';
import { RestListener } from '../models/RestListener';
import { BaseComponent } from '../models/BaseComponent';
import { SubMunicipality } from '../models/SubMunicipality';


@Component({
  selector: 'app-register-garbage',
  templateUrl: './register-garbage.component.html',
  styleUrls: ['./register-garbage.component.css']
})
export class RegisterGarbageComponent extends BaseComponent implements OnInit, RestListener {


   public model: Garbage = new Garbage();
   public countries: any = 	[{
    value : 'AF',
    label : 'Afghanistan'
  }, {
    value : 'AL',
    label : 'Albania'
  }, {
    value : 'DZ',
    label : 'Algeria'
  }, {
    value : 'AS',
    label : 'American Samoa'
  }, {
    value : 'AD',
    label : 'Andorra'
  }, {
    value : 'AO',
    label : 'Angola'
  }, {
    value : 'AI',
    label : 'Anguilla'
  }, {
    value : 'AQ',
    label : 'Antarctica'
  }, {
    value : 'AG',
    label : 'Antigua'
  }, {
    value : 'AR',
    label : 'Argentina'
  }, {
    value : 'AM',
    label : 'Armenia'
  }, {
    value : 'AW',
    label : 'Aruba'
  }, {
    value : 'AC',
    label : 'Ascension Islands'
  }, {
    value : 'AU',
    label : 'Australia'
  }, {
    value : 'AU',
    label : 'Australian Ext. Territories'
  }, {
    value : 'AT',
    label : 'Austria'
  }, {
    value : 'AZ',
    label : 'Azerbaijan'
  }, {
    value : 'BS',
    label : 'Bahamas'
  }, {
    value : 'BH',
    label : 'Bahrain'
  }, {
    value : 'BD',
    label : 'Bangladesh'
  }, {
    value : 'BB',
    label : 'Barbados'
  }, {
    value : 'AG',
    label : 'Barbuda'
  }, {
    value : 'BY',
    label : 'Belarus'
  }, {
    value : 'BE',
    label : 'Belgium'
  }, {
    value : 'BZ',
    label : 'Belize'
  }, {
    value : 'BJ',
    label : 'Benin Republic'
  }, {
    value : 'BM',
    label : 'Bermuda'
  }, {
    value : 'BT',
    label : 'Bhutan'
  }, {
    value : 'BO',
    label : 'Bolivia'
  }, {
    value : 'BA',
    label : 'Bosnia and Herzegovina'
  }, {
    value : 'BW',
    label : 'Botswana'
  }, {
    value : 'BR',
    label : 'Brazil'
  }, {
    value : 'VG',
    label : 'British Virgin Islands'
  }, {
    value : 'BN',
    label : 'Brunei'
  }, {
    value : 'BG',
    label : 'Bulgaria'
  }, {
    value : 'BF',
    label : 'Burkina Faso'
  }, {
    value : 'BU',
    label : 'Burma (Myanmar)'
  }, {
    value : 'BI',
    label : 'Burundi'
  }, {
    value : 'KH',
    label : 'Cambodia'
  }, {
    value : 'CM',
    label : 'Cameroon United Republic'
  }, {
    value : 'CA',
    label : 'Canada'
  }, {
    value : 'CV',
    label : 'Cape Verde Island'
  }, {
    value : 'KY',
    label : 'Cayman Islands'
  }, {
    value : 'CF',
    label : 'Central African Republic'
  }, {
    value : 'TD',
    label : 'Chad Republic'
  }, {
    value : 'CL',
    label : 'Chile'
  }, {
    value : 'CN',
    label : 'China'
  }, {
    value : 'CX',
    label : 'Christmas Island'
  }, {
    value : 'CC',
    label : 'Cocos Islands'
  }, {
    value : 'CO',
    label : 'Colombia'
  }, {
    value : '00',
    label : 'Comoros'
  }, {
    value : 'CG',
    label : 'Congo'
  }, {
    value : 'CD',
    label : 'Congo Democratic Republic'
  }, {
    value : 'CK',
    label : 'Cook Islands'
  }, {
    value : 'CR',
    label : 'Costa Rica'
  }, {
    value : 'HR',
    label : 'Croatia'
  }, {
    value : 'CU',
    label : 'Cuba'
  }, {
    value : 'CW',
    label : 'Curacao'
  }, {
    value : 'CY',
    label : 'Cyprus'
  }, {
    value : 'CZ',
    label : 'Czech Republic'
  }, {
    value : 'DK',
    label : 'Denmark'
  }, {
    value : 'DG',
    label : 'Diego Garcia'
  }, {
    value : 'DJ',
    label : 'Djibouti'
  }, {
    value : 'DM',
    label : 'Dominica'
  }, {
    value : 'DO',
    label : 'Dominican Republic'
  }, {
    value : 'CL',
    label : 'Easter Island'
  }, {
    value : 'TP',
    label : 'East Timor'
  }, {
    value : 'EC',
    label : 'Ecuador'
  }, {
    value : 'EG',
    label : 'Egypt'
  }, {
    value : 'SV',
    label : 'El Salvador'
  }, {
    value : 'GQ',
    label : 'Equatorial Guinea'
  }, {
    value : 'ER',
    label : 'Eritrea'
  }, {
    value : 'EW',
    label : 'Estonia'
  }, {
    value : 'ET',
    label : 'Ethiopia'
  }, {
    value : 'FO',
    label : 'Faeroe Islands'
  }, {
    value : 'FK',
    label : 'Falkland Islands'
  }, {
    value : 'FJ',
    label : 'Fiji Islands'
  }, {
    value : 'FI',
    label : 'Finland'
  }, {
    value : 'FR',
    label : 'France'
  }, {
    value : 'AN',
    label : 'French Antilles'
  }, {
    value : 'GF',
    label : 'French Guiana'
  }, {
    value : 'PF',
    label : 'French Polynesia'
  }, {
    value : 'GA',
    label : 'Gabon'
  }, {
    value : 'GM',
    label : 'Gambia'
  }, {
    value : 'GE',
    label : 'Georgia'
  }, {
    value : 'DE',
    label : 'Germany'
  }, {
    value : 'GH',
    label : 'Ghana'
  }, {
    value : 'GI',
    label : 'Gibraltar'
  }, {
    value : 'GR',
    label : 'Greece'
  }, {
    value : 'GL',
    label : 'Greenland'
  }, {
    value : 'GD',
    label : 'Grenada'
  }, {
    value : 'GP',
    label : 'Guadeloupe'
  }, {
    value : 'GU',
    label : 'Guam'
  }, {
    value : 'CU',
    label : 'Guantanamo Bay'
  }, {
    value : 'GT',
    label : 'Guatemala'
  }, {
    value : 'GN',
    label : 'Guinea'
  }, {
    value : 'GW',
    label : 'Guinea-Bissau'
  }, {
    value : 'GY',
    label : 'Guyana'
  }, {
    value : 'HT',
    label : 'Haiti'
  }, {
    value : 'HN',
    label : 'Honduras'
  }, {
    value : 'HK',
    label : 'Hong Kong'
  }, {
    value : 'HU',
    label : 'Hungary'
  }, {
    value : 'IS',
    label : 'Iceland'
  }, {
    value : 'IN',
    label : 'India'
  }, {
    value : 'ID',
    label : 'Indonesia'
  }, {
    value : '00',
    label : 'Inmarsat (Atlantic Ocean West)'
  }, {
    value : '00',
    label : 'Inmarsat (Atlantic Ocean East)'
  }, {
    value : '00',
    label : 'Inmarsat (Indian Ocean)'
  }, {
    value : '00',
    label : 'Inmarsat (Pacific Ocean)'
  }, {
    value : '00',
    label : 'Inmarsat (SNAC)'
  }, {
    value : 'IR',
    label : 'Iran'
  }, {
    value : 'IQ',
    label : 'Iraq'
  }, {
    value : 'IE',
    label : 'Ireland'
  }, {
    value : 'IL',
    label : 'Israel'
  }, {
    value : 'IT',
    label : 'Italy'
  }, {
    value : 'CI',
    label : 'Ivory Coast'
  }, {
    value : 'JA',
    label : 'Jamaica'
  }, {
    value : 'JP',
    label : 'Japan'
  }, {
    value : 'JO',
    label : 'Jordan'
  }, {
    value : 'KZ',
    label : 'Kazakhstan'
  }, {
    value : 'KE',
    label : 'Kenya'
  }, {
    value : 'KI',
    label : 'Kiribati'
  }, {
    value : 'KP',
    label : 'Korea North'
  }, {
    value : 'KR',
    label : 'Korea South'
  }, {
    value : 'KW',
    label : 'Kuwait'
  }, {
    value : 'KG',
    label : 'Kyrgyzstan'
  }, {
    value : 'LA',
    label : 'Laos'
  }, {
    value : 'LV',
    label : 'Latvia'
  }, {
    value : 'LB',
    label : 'Lebanon'
  }, {
    value : 'LS',
    label : 'Lesotho'
  }, {
    value : 'LR',
    label : 'Liberia'
  }, {
    value : 'LY',
    label : 'Libya'
  }, {
    value : 'LI',
    label : 'Liechtenstein'
  }, {
    value : 'LT',
    label : 'Lithuania'
  }, {
    value : 'LU',
    label : 'Luxembourg'
  }, {
    value : 'MO',
    label : 'Macao'
  }, {
    value : 'MK',
    label : 'Macedonia'
  }, {
    value : 'MG',
    label : 'Madagascar'
  }, {
    value : 'MW',
    label : 'Malawi'
  }, {
    value : 'MY',
    label : 'Malaysia'
  }, {
    value : 'MV',
    label : 'Maldives'
  }, {
    value : 'ML',
    label : 'Mali'
  }, {
    value : 'MT',
    label : 'Malta'
  }, {
    value : 'MP',
    label : 'Mariana Islands'
  }, {
    value : 'MH',
    label : 'Marshall Islands'
  }, {
    value : 'MQ',
    label : 'Martinique'
  }, {
    value : 'MR',
    label : 'Mauritania'
  }, {
    value : 'MU',
    label : 'Mauritius'
  }, {
    value : 'YT',
    label : 'Mayotte Island'
  }, {
    value : 'MX',
    label : 'Mexico'
  }, {
    value : 'FM',
    label : 'Micronesia'
  }, {
    value : '00',
    label : 'Midway Island'
  }, {
    value : 'MD',
    label : 'Moldova'
  }, {
    value : 'MC',
    label : 'Monaco'
  }, {
    value : 'MN',
    label : 'Mongolia'
  }, {
    value : 'ME',
    label : 'Montenegro'
  }, {
    value : 'MS',
    label : 'Montserrat'
  }, {
    value : 'MA',
    label : 'Morocco'
  }, {
    value : 'MZ',
    label : 'Mozambique'
  }, {
    value : 'MM',
    label : 'Myanmar (Burma)'
  }, {
    value : 'NA',
    label : 'Namibia'
  }, {
    value : 'NR',
    label : 'Nauru'
  }, {
    value : 'NP',
    label : 'Nepal'
  }, {
    value : 'NL',
    label : 'Netherlands'
  }, {
    value : 'AN',
    label : 'Netherlands Antillies'
  }, {
    value : 'KN',
    label : 'Nevis'
  }, {
    value : 'NC',
    label : 'New Caledonia'
  }, {
    value : 'NZ',
    label : 'New Zealand'
  }, {
    value : 'NI',
    label : 'Nicaragua'
  }, {
    value : 'NE',
    label : 'Niger'
  }, {
    value : 'NG',
    label : 'Nigeria'
  }, {
    value : 'NU',
    label : 'Niue'
  }, {
    value : 'NF',
    label : 'Norfolk Island'
  }, {
    value : 'NO',
    label : 'Norway'
  }, {
    value : 'OM',
    label : 'Oman'
  }, {
    value : 'PK',
    label : 'Pakistan'
  }, {
    value : 'PW',
    label : 'Palau'
  }, {
    value : 'PS',
    label : 'Palestine'
  }, {
    value : 'PA',
    label : 'Panama'
  }, {
    value : 'PG',
    label : 'Papua New Guinea'
  }, {
    value : 'PY',
    label : 'Paraguay'
  }, {
    value : 'PE',
    label : 'Peru'
  }, {
    value : 'PH',
    label : 'Philippines'
  }, {
    value : 'PL',
    label : 'Poland'
  }, {
    value : 'PT',
    label : 'Portugal'
  }, {
    value : 'PR',
    label : 'Puerto Rico'
  }, {
    value : 'QA',
    label : 'Qatar'
  }, {
    value : 'RE',
    label : 'Reunion Island'
  }, {
    value : 'RO',
    label : 'Romania'
  }, {
    value : 'RU',
    label : 'Russia'
  }, {
    value : 'RW',
    label : 'Rwanda'
  }, {
    value : 'SH',
    label : 'St Helena'
  }, {
    value : 'KN',
    label : 'St Kitts'
  }, {
    value : 'LC',
    label : 'St Lucia'
  }, {
    value : 'PM',
    label : 'St Pierre and Miquelon'
  }, {
    value : 'VC',
    label : 'St Vincent'
  }, {
    value : 'SM',
    label : 'San Marino'
  }, {
    value : 'ST',
    label : 'Sao Tome and Principe'
  }, {
    value : 'SA',
    label : 'Saudi Arabia'
  }, {
    value : 'SN',
    label : 'Senegal'
  }, {
    value : 'CS',
    label : 'Serbia'
  }, {
    value : 'SC',
    label : 'Seychelles'
  }, {
    value : 'SL',
    label : 'Sierra Leone'
  }, {
    value : 'SG',
    label : 'Singapore'
  }, {
    value : 'SK',
    label : 'Slovakia'
  }, {
    value : 'SI',
    label : 'Slovenia'
  }, {
    value : 'SB',
    label : 'Solomon Islands'
  }, {
    value : 'SO',
    label : 'Somalia Republic'
  }, {
    value : 'ZA',
    label : 'South Africa'
  }, {
    value : 'ES',
    label : 'Spain'
  }, {
    value : 'LK',
    label : 'Sri Lanka'
  }, {
    value : 'SD',
    label : 'Sudan'
  }, {
    value : 'SR',
    label : 'Suriname'
  }, {
    value : 'SZ',
    label : 'Swaziland'
  }, {
    value : 'SE',
    label : 'Sweden'
  }, {
    value : 'CH',
    label : 'Switzerland'
  }, {
    value : 'SY',
    label : 'Syria'
  }, {
    value : 'TW',
    label : 'Taiwan'
  }, {
    value : 'TJ',
    label : 'Tajikistan'
  }, {
    value : 'TH',
    label : 'Thailand'
  }, {
    value : 'TG',
    label : 'Togo'
  }, {
    value : 'TO',
    label : 'Tonga'
  }, {
    value : 'TT',
    label : 'Trinidad and Tobago'
  }, {
    value : 'TN',
    label : 'Tunisia'
  }, {
    value : 'TR',
    label : 'Turkey'
  }, {
    value : 'TM',
    label : 'Turkmenistan'
  }, {
    value : 'TC',
    label : 'Turks and Caicos'
  }, {
    value : 'TV',
    label : 'Tuvalu'
  }, {
    value : 'UG',
    label : 'Uganda'
  }, {
    value : 'UA',
    label : 'Ukraine'
  }, {
    value : 'AE',
    label : 'United Arab Emirates'
  }, {
    value : 'GB',
    label : 'United Kingdom'
  }, {
    value : 'US',
    label : 'United States'
  }, {
    value : 'UY',
    label : 'Uruguay'
  }, {
    value : 'VI',
    label : 'US Virgin Islands'
  }, {
    value : 'UZ',
    label : 'Uzbekistan'
  }, {
    value : 'VU',
    label : 'Vanuatu'
  }, {
    value : 'VA',
    label : 'Vatican City'
  }, {
    value : 'VE',
    label : 'Venezuela'
  }, {
    value : 'VN',
    label : 'Vietnam'
  }, {
    value : '00',
    label : 'Wake Island'
  }, {
    value : 'WF',
    label : 'Wallis And Futuna Islands'
  }, {
    value : 'WS',
    label : 'Western Samoa'
  }, {
    value : 'YE',
    label : 'Yemen'
  }, {
    value : 'ZM',
    label : 'Zambia'
  }, {
    value : '00',
    label : 'Zanzibar'
  }, {
    value : 'ZW',
    label : 'Zimbabwe'
  }
        ];
  submunicipalities: SubMunicipality[];
  constructor(private transferService: TransferServiceService, private router: Router, private restServis: RestService) {
    super();
  }

  ngOnInit() {

      console.log(JSON.stringify('data is' + this.transferService.getData()));
      if (this.transferService.getData ) {
        this.model = this.transferService.getData();
      }
  }



  showOnMap() {
    this.transferService.setData(this.model);
    this.router.navigateByUrl('/map');
  }

  register() {
    this.state.loading = true;
    this.restServis.post(this.model, this, 'garbage/register', 1);

  }

  onCityChange(text: String) {
    console.log('City changed ' + text);
    this.restServis.get('submunicpality/all?city=' + text, this , 0);

  }

  onSuccess(response: ResponseTemplate, request: any, requestType: Number) {
    if (requestType === 1) {
     this.state.loading = false;
    if (response.error) {
      this.showErrorMessage(response.message);

    } else {
      this.showSuccessMessage('Garbage successfully Regitered Please check your truck route');
    }
   } else if ( requestType === 0) {
     if (response.error === false) {
       this.submunicipalities =   response.data;
       if (response.data.length > 0) {
        this.model.submunicipality.id = response.data[0].id;
       }
     }
   }
  }
  onFailure(err: any, request: any, requestType: Number) {
    if (requestType === 1) {
      this.state.loading = false;
      this.showErrorMessage('Not able to register garbage Please try after some time or check your connectivity');
    }
  }


}
