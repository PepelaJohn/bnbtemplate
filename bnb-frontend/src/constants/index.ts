export const webname = "Orina Aprtments";

type CustomFunction = ({}: any) => Promise<any>;

export const catchErrors = (controlFunction: CustomFunction) => {
  return async (params: { [key: string]: any }) => {
    try {
      const result = await controlFunction(params);
      return result;
    } catch (error: any) {
      console.error("Error:", error.message);
      console.error(error.stack);
      // Optionally, return a custom error response or throw
      //throw error; // or return { error: true, message: error.message }
    }
  };
};

export const optimizeImage = (url: string, width = 800) => {
  return url ? url.replace("/upload/", `/upload/w_${width},f_auto,q_auto/`):"/images/placeholder.png";
};


export // Country codes data
const countryCodes = [
  { code: '+1', country: 'US' }, // United States
  { code: '+1', country: 'CA' }, // Canada
  { code: '+44', country: 'GB' }, // United Kingdom
  { code: '+91', country: 'IN' }, // India
  { code: '+61', country: 'AU' }, // Australia
  { code: '+81', country: 'JP' }, // Japan
  { code: '+49', country: 'DE' }, // Germany
  { code: '+33', country: 'FR' }, // France
  { code: '+86', country: 'CN' }, // China
  { code: '+39', country: 'IT' }, // Italy
  { code: '+7', country: 'RU' }, // Russia
  { code: '+34', country: 'ES' }, // Spain
  { code: '+55', country: 'BR' }, // Brazil
  { code: '+27', country: 'ZA' }, // South Africa
  { code: '+254', country: 'KE' }, // Kenya
  { code: '+256', country: 'UG' }, // Uganda
  { code: '+255', country: 'TZ' }, // Tanzania
  { code: '+234', country: 'NG' }, // Nigeria
  { code: '+20', country: 'EG' }, // Egypt
  { code: '+351', country: 'PT' }, // Portugal
  { code: '+358', country: 'FI' }, // Finland
  { code: '+46', country: 'SE' }, // Sweden
  { code: '+47', country: 'NO' }, // Norway
  { code: '+45', country: 'DK' }, // Denmark
  { code: '+31', country: 'NL' }, // Netherlands
  { code: '+32', country: 'BE' }, // Belgium
  { code: '+41', country: 'CH' }, // Switzerland
  { code: '+43', country: 'AT' }, // Austria
  { code: '+48', country: 'PL' }, // Poland
  { code: '+420', country: 'CZ' }, // Czech Republic
  { code: '+36', country: 'HU' }, // Hungary
  { code: '+30', country: 'GR' }, // Greece
  { code: '+353', country: 'IE' }, // Ireland
  { code: '+380', country: 'UA' }, // Ukraine
  { code: '+375', country: 'BY' }, // Belarus
  { code: '+90', country: 'TR' }, // Turkey
  { code: '+972', country: 'IL' }, // Israel
  { code: '+966', country: 'SA' }, // Saudi Arabia
  { code: '+971', country: 'AE' }, // United Arab Emirates
  { code: '+60', country: 'MY' }, // Malaysia
  { code: '+65', country: 'SG' }, // Singapore
  { code: '+66', country: 'TH' }, // Thailand
  { code: '+62', country: 'ID' }, // Indonesia
  { code: '+63', country: 'PH' }, // Philippines
  { code: '+64', country: 'NZ' }, // New Zealand
  { code: '+52', country: 'MX' }, // Mexico
  { code: '+54', country: 'AR' }, // Argentina
  { code: '+56', country: 'CL' }, // Chile
  { code: '+57', country: 'CO' }, // Colombia
  { code: '+51', country: 'PE' }, // Peru
  { code: '+58', country: 'VE' }, // Venezuela
  { code: '+92', country: 'PK' }, // Pakistan
  { code: '+880', country: 'BD' }, // Bangladesh
  { code: '+94', country: 'LK' }, // Sri Lanka
  { code: '+977', country: 'NP' }, // Nepal
  { code: '+84', country: 'VN' }, // Vietnam
  { code: '+82', country: 'KR' }, // South Korea
  { code: '+855', country: 'KH' }, // Cambodia
  { code: '+856', country: 'LA' }, // Laos
  { code: '+95', country: 'MM' }, // Myanmar
  { code: '+98', country: 'IR' }, // Iran
  { code: '+964', country: 'IQ' }, // Iraq
  { code: '+961', country: 'LB' }, // Lebanon
  { code: '+962', country: 'JO' }, // Jordan
  { code: '+963', country: 'SY' }, // Syria
  { code: '+968', country: 'OM' }, // Oman
  { code: '+974', country: 'QA' }, // Qatar
  { code: '+965', country: 'KW' }, // Kuwait
  { code: '+973', country: 'BH' }, // Bahrain
  { code: '+1', country: 'AG' }, // Antigua and Barbuda
  { code: '+1', country: 'AI' }, // Anguilla
  { code: '+1', country: 'AS' }, // American Samoa
  { code: '+1', country: 'BB' }, // Barbados
  { code: '+1', country: 'BM' }, // Bermuda
  { code: '+1', country: 'BS' }, // Bahamas
  { code: '+1', country: 'DM' }, // Dominica
  { code: '+1', country: 'DO' }, // Dominican Republic
  { code: '+1', country: 'GD' }, // Grenada
  { code: '+1', country: 'GU' }, // Guam
  { code: '+1', country: 'JM' }, // Jamaica
  { code: '+1', country: 'KN' }, // Saint Kitts and Nevis
  { code: '+1', country: 'KY' }, // Cayman Islands
  { code: '+1', country: 'LC' }, // Saint Lucia
  { code: '+1', country: 'MP' }, // Northern Mariana Islands
  { code: '+1', country: 'MS' }, // Montserrat
  { code: '+1', country: 'PR' }, // Puerto Rico
  { code: '+1', country: 'TC' }, // Turks and Caicos Islands
  { code: '+1', country: 'TT' }, // Trinidad and Tobago
  { code: '+1', country: 'VC' }, // Saint Vincent and the Grenadines
  { code: '+1', country: 'VG' }, // British Virgin Islands
  { code: '+1', country: 'VI' }, // U.S. Virgin Islands
  { code: '+7', country: 'KZ' }, // Kazakhstan
  { code: '+93', country: 'AF' }, // Afghanistan
  { code: '+355', country: 'AL' }, // Albania
  { code: '+213', country: 'DZ' }, // Algeria
  { code: '+376', country: 'AD' }, // Andorra
  { code: '+244', country: 'AO' }, // Angola
  { code: '+599', country: 'BQ' }, // Bonaire, Sint Eustatius, Saba
  { code: '+599', country: 'CW' }, // Curaçao
  { code: '+297', country: 'AW' }, // Aruba
  { code: '+994', country: 'AZ' }, // Azerbaijan
  { code: '+973', country: 'BH' }, // Bahrain (already included, no duplicate needed)
  { code: '+501', country: 'BZ' }, // Belize
  { code: '+229', country: 'BJ' }, // Benin
  { code: '+975', country: 'BT' }, // Bhutan
  { code: '+591', country: 'BO' }, // Bolivia
  { code: '+387', country: 'BA' }, // Bosnia and Herzegovina
  { code: '+267', country: 'BW' }, // Botswana
  { code: '+359', country: 'BG' }, // Bulgaria
  { code: '+226', country: 'BF' }, // Burkina Faso
  { code: '+257', country: 'BI' }, // Burundi
  { code: '+238', country: 'CV' }, // Cape Verde
  { code: '+236', country: 'CF' }, // Central African Republic
  { code: '+235', country: 'TD' }, // Chad
  { code: '+269', country: 'KM' }, // Comoros
  { code: '+242', country: 'CG' }, // Congo (Brazzaville)
  { code: '+243', country: 'CD' }, // Congo (Kinshasa)
  { code: '+682', country: 'CK' }, // Cook Islands
  { code: '+506', country: 'CR' }, // Costa Rica
  { code: '+225', country: 'CI' }, // Côte d'Ivoire
  { code: '+385', country: 'HR' }, // Croatia
  { code: '+53', country: 'CU' }, // Cuba
  { code: '+357', country: 'CY' }, // Cyprus
  { code: '+253', country: 'DJ' }, // Djibouti
  { code: '+670', country: 'TL' }, // Timor-Leste
  { code: '+593', country: 'EC' }, // Ecuador
  { code: '+291', country: 'ER' }, // Eritrea
  { code: '+372', country: 'EE' }, // Estonia
  { code: '+268', country: 'SZ' }, // Eswatini
  { code: '+251', country: 'ET' }, // Ethiopia
  { code: '+500', country: 'FK' }, // Falkland Islands
  { code: '+298', country: 'FO' }, // Faroe Islands
  { code: '+679', country: 'FJ' }, // Fiji
  { code: '+689', country: 'PF' }, // French Polynesia
  { code: '+241', country: 'GA' }, // Gabon
  { code: '+220', country: 'GM' }, // Gambia
  { code: '+995', country: 'GE' }, // Georgia
  { code: '+350', country: 'GI' }, // Gibraltar
  { code: '+299', country: 'GL' }, // Greenland
  { code: '+590', country: 'GP' }, // Guadeloupe
  { code: '+502', country: 'GT' }, // Guatemala
  { code: '+224', country: 'GN' }, // Guinea
  { code: '+245', country: 'GW' }, // Guinea-Bissau
  { code: '+592', country: 'GY' }, // Guyana
  { code: '+509', country: 'HT' }, // Haiti
  { code: '+504', country: 'HN' }, // Honduras
  { code: '+852', country: 'HK' }, // Hong Kong
  { code: '+354', country: 'IS' }, // Iceland
  { code: '+91', country: 'IN' }, // India (already included)
  { code: '+353', country: 'IE' }, // Ireland (already included)
  { code: '+246', country: 'IO' }, // British Indian Ocean Territory
  { code: '+39', country: 'VA' }, // Vatican City (shares with Italy)
  { code: '+81', country: 'JP' }, // Japan (already included)
  { code: '+686', country: 'KI' }, // Kiribati
  { code: '+383', country: 'XK' }, // Kosovo
  { code: '+996', country: 'KG' }, // Kyrgyzstan
  { code: '+371', country: 'LV' }, // Latvia
  { code: '+266', country: 'LS' }, // Lesotho
  { code: '+231', country: 'LR' }, // Liberia
  { code: '+218', country: 'LY' }, // Libya
  { code: '+423', country: 'LI' }, // Liechtenstein
  { code: '+370', country: 'LT' }, // Lithuania
  { code: '+352', country: 'LU' }, // Luxembourg
  { code: '+853', country: 'MO' }, // Macau
  { code: '+389', country: 'MK' }, // North Macedonia
  { code: '+261', country: 'MG' }, // Madagascar
  { code: '+265', country: 'MW' }, // Malawi
  { code: '+960', country: 'MV' }, // Maldives
  { code: '+223', country: 'ML' }, // Mali
  { code: '+356', country: 'MT' }, // Malta
  { code: '+692', country: 'MH' }, // Marshall Islands
  { code: '+596', country: 'MQ' }, // Martinique
  { code: '+222', country: 'MR' }, // Mauritania
  { code: '+230', country: 'MU' }, // Mauritius
  { code: '+262', country: 'YT' }, // Mayotte
  { code: '+691', country: 'FM' }, // Micronesia
  { code: '+373', country: 'MD' }, // Moldova
  { code: '+377', country: 'MC' }, // Monaco
  { code: '+976', country: 'MN' }, // Mongolia
  { code: '+382', country: 'ME' }, // Montenegro
  { code: '+212', country: 'MA' }, // Morocco
  { code: '+258', country: 'MZ' }, // Mozambique
  { code: '+264', country: 'NA' }, // Namibia
  { code: '+674', country: 'NR' }, // Nauru
  { code: '+599', country: 'SX' }, // Sint Maarten
  { code: '+687', country: 'NC' }, // New Caledonia
  { code: '+227', country: 'NE' }, // Niger
  { code: '+683', country: 'NU' }, // Niue
  { code: '+672', country: 'NF' }, // Norfolk Island
  { code: '+850', country: 'KP' }, // North Korea
  { code: '+47', country: 'SJ' }, // Svalbard and Jan Mayen (shares with Norway)
  { code: '+680', country: 'PW' }, // Palau
  { code: '+970', country: 'PS' }, // Palestine
  { code: '+507', country: 'PA' }, // Panama
  { code: '+675', country: 'PG' }, // Papua New Guinea
  { code: '+595', country: 'PY' }, // Paraguay
  { code: '+262', country: 'RE' }, // Réunion
  { code: '+40', country: 'RO' }, // Romania
  { code: '+250', country: 'RW' }, // Rwanda
  { code: '+590', country: 'BL' }, // Saint Barthélemy
  { code: '+290', country: 'SH' }, // Saint Helena
  { code: '+508', country: 'PM' }, // Saint Pierre and Miquelon
  { code: '+685', country: 'WS' }, // Samoa
  { code: '+378', country: 'SM' }, // San Marino
  { code: '+239', country: 'ST' }, // São Tomé and Príncipe
  { code: '+221', country: 'SN' }, // Senegal
  { code: '+381', country: 'RS' }, // Serbia
  { code: '+248', country: 'SC' }, // Seychelles
  { code: '+232', country: 'SL' }, // Sierra Leone
  { code: '+421', country: 'SK' }, // Slovakia
  { code: '+386', country: 'SI' }, // Slovenia
  { code: '+677', country: 'SB' }, // Solomon Islands
  { code: '+252', country: 'SO' }, // Somalia
  { code: '+249', country: 'SD' }, // Sudan
  { code: '+211', country: 'SS' }, // South Sudan
  { code: '+597', country: 'SR' }, // Suriname
  { code: '+886', country: 'TW' }, // Taiwan
  { code: '+992', country: 'TJ' }, // Tajikistan
  { code: '+993', country: 'TM' }, // Turkmenistan
  { code: '+690', country: 'TK' }, // Tokelau
  { code: '+676', country: 'TO' }, // Tonga
  { code: '+216', country: 'TN' }, // Tunisia
  { code: '+688', country: 'TV' }, // Tuvalu
  { code: '+998', country: 'UZ' }, // Uzbekistan
  { code: '+678', country: 'VU' }, // Vanuatu
  { code: '+681', country: 'WF' }, // Wallis and Futuna
  { code: '+967', country: 'YE' }, // Yemen
  { code: '+260', country: 'ZM' }, // Zambia
  { code: '+263', country: 'ZW' }, // Zimbabwe
  { code: '+800', country: 'XV' }, // International Freephone (not a country, but ITU-assigned)
  { code: '+808', country: 'XS' }, // Shared Cost Services (not a country, but ITU-assigned)
  { code: '+878', country: 'XP' }, // Personal Numbering (not a country, but ITU-assigned)
  { code: '+881', country: 'XG' }, // Global Mobile Satellite System (not a country)
  { code: '+882', country: 'XN' }, // International Networks
  { code: '+883', country: 'XI' }, // International Networks

];
