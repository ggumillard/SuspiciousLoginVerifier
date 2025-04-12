import React, { useState, useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface CountryCodesProps {
  onChange: (value: string) => void;
  value: string;
  className?: string;
  onCountryChange?: (country: CountryCode) => void;
}

export interface CountryCode {
  id: string;
  value: string;
  label: string;
  example?: string;
}

const countryCodes: CountryCode[] = [
  { id: "AF", value: "+93", label: "+93 (AF)" }, // Afghanistan
  { id: "AL", value: "+355", label: "+355 (AL)" }, // Albania
  { id: "DZ", value: "+213", label: "+213 (DZ)" }, // Algeria
  { id: "AD", value: "+376", label: "+376 (AD)" }, // Andorra
  { id: "AO", value: "+244", label: "+244 (AO)" }, // Angola
  { id: "AG", value: "+1-AG", label: "+1 (AG)" }, // Antigua and Barbuda
  { id: "AR", value: "+54", label: "+54 (AR)" }, // Argentina
  { id: "AM", value: "+374", label: "+374 (AM)" }, // Armenia
  { id: "AU", value: "+61", label: "+61 (AU)", example: "412345678" }, // Australia
  { id: "AT", value: "+43", label: "+43 (AT)" }, // Austria
  { id: "AZ", value: "+994", label: "+994 (AZ)" }, // Azerbaijan
  { id: "BS", value: "+1-BS", label: "+1 (BS)" }, // Bahamas
  { id: "BH", value: "+973", label: "+973 (BH)" }, // Bahrain
  { id: "BD", value: "+880", label: "+880 (BD)" }, // Bangladesh
  { id: "BB", value: "+1-BB", label: "+1 (BB)" }, // Barbados
  { id: "BY", value: "+375", label: "+375 (BY)" }, // Belarus
  { id: "BE", value: "+32", label: "+32 (BE)" }, // Belgium
  { id: "BZ", value: "+501", label: "+501 (BZ)" }, // Belize
  { id: "BJ", value: "+229", label: "+229 (BJ)" }, // Benin
  { id: "BT", value: "+975", label: "+975 (BT)" }, // Bhutan
  { id: "BO", value: "+591", label: "+591 (BO)" }, // Bolivia
  { id: "BA", value: "+387", label: "+387 (BA)" }, // Bosnia and Herzegovina
  { id: "BW", value: "+267", label: "+267 (BW)" }, // Botswana
  { id: "BR", value: "+55", label: "+55 (BR)" }, // Brazil
  { id: "BN", value: "+673", label: "+673 (BN)" }, // Brunei
  { id: "BG", value: "+359", label: "+359 (BG)" }, // Bulgaria
  { id: "BF", value: "+226", label: "+226 (BF)" }, // Burkina Faso
  { id: "BI", value: "+257", label: "+257 (BI)" }, // Burundi
  { id: "KH", value: "+855", label: "+855 (KH)" }, // Cambodia
  { id: "CM", value: "+237", label: "+237 (CM)" }, // Cameroon
  { id: "CA", value: "+1-CA", label: "+1 (CA)" }, // Canada
  { id: "CV", value: "+238", label: "+238 (CV)" }, // Cape Verde
  { id: "CF", value: "+236", label: "+236 (CF)" }, // Central African Republic
  { id: "TD", value: "+235", label: "+235 (TD)" }, // Chad
  { id: "CL", value: "+56", label: "+56 (CL)" }, // Chile
  { id: "CN", value: "+86", label: "+86 (CN)" }, // China
  { id: "CO", value: "+57", label: "+57 (CO)" }, // Colombia
  { id: "KM", value: "+269", label: "+269 (KM)" }, // Comoros
  { id: "CG", value: "+242", label: "+242 (CG)" }, // Congo
  { id: "CR", value: "+506", label: "+506 (CR)" }, // Costa Rica
  { id: "HR", value: "+385", label: "+385 (HR)" }, // Croatia
  { id: "CU", value: "+53", label: "+53 (CU)" }, // Cuba
  { id: "CY", value: "+357", label: "+357 (CY)" }, // Cyprus
  { id: "CZ", value: "+420", label: "+420 (CZ)" }, // Czech Republic
  { id: "CD", value: "+243", label: "+243 (CD)" }, // Democratic Republic of the Congo
  { id: "DK", value: "+45", label: "+45 (DK)" }, // Denmark
  { id: "DJ", value: "+253", label: "+253 (DJ)" }, // Djibouti
  { id: "DM", value: "+1-DM", label: "+1 (DM)" }, // Dominica
  { id: "DO", value: "+1-DO", label: "+1 (DO)" }, // Dominican Republic
  { id: "TL", value: "+670", label: "+670 (TL)" }, // East Timor
  { id: "EC", value: "+593", label: "+593 (EC)" }, // Ecuador
  { id: "EG", value: "+20", label: "+20 (EG)" }, // Egypt
  { id: "SV", value: "+503", label: "+503 (SV)" }, // El Salvador
  { id: "GQ", value: "+240", label: "+240 (GQ)" }, // Equatorial Guinea
  { id: "ER", value: "+291", label: "+291 (ER)" }, // Eritrea
  { id: "EE", value: "+372", label: "+372 (EE)" }, // Estonia
  { id: "SZ", value: "+268", label: "+268 (SZ)" }, // Eswatini
  { id: "ET", value: "+251", label: "+251 (ET)" }, // Ethiopia
  { id: "FJ", value: "+679", label: "+679 (FJ)" }, // Fiji
  { id: "FI", value: "+358", label: "+358 (FI)" }, // Finland
  { id: "FR", value: "+33", label: "+33 (FR)" }, // France
  { id: "GA", value: "+241", label: "+241 (GA)" }, // Gabon
  { id: "GM", value: "+220", label: "+220 (GM)" }, // Gambia
  { id: "GE", value: "+995", label: "+995 (GE)" }, // Georgia
  { id: "DE", value: "+49", label: "+49 (DE)" }, // Germany
  { id: "GH", value: "+233", label: "+233 (GH)" }, // Ghana
  { id: "GR", value: "+30", label: "+30 (GR)" }, // Greece
  { id: "GD", value: "+1-GD", label: "+1 (GD)" }, // Grenada
  { id: "GT", value: "+502", label: "+502 (GT)" }, // Guatemala
  { id: "GN", value: "+224", label: "+224 (GN)" }, // Guinea
  { id: "GW", value: "+245", label: "+245 (GW)" }, // Guinea-Bissau
  { id: "GY", value: "+592", label: "+592 (GY)" }, // Guyana
  { id: "HT", value: "+509", label: "+509 (HT)" }, // Haiti
  { id: "HN", value: "+504", label: "+504 (HN)" }, // Honduras
  { id: "HU", value: "+36", label: "+36 (HU)" }, // Hungary
  { id: "IS", value: "+354", label: "+354 (IS)" }, // Iceland
  { id: "IN", value: "+91", label: "+91 (IN)", example: "9876543210" }, // India
  { id: "ID", value: "+62", label: "+62 (ID)" }, // Indonesia
  { id: "IR", value: "+98", label: "+98 (IR)" }, // Iran
  { id: "IQ", value: "+964", label: "+964 (IQ)" }, // Iraq
  { id: "IE", value: "+353", label: "+353 (IE)" }, // Ireland
  { id: "IL", value: "+972", label: "+972 (IL)" }, // Israel
  { id: "IT", value: "+39", label: "+39 (IT)" }, // Italy
  { id: "CI", value: "+225", label: "+225 (CI)" }, // Ivory Coast
  { id: "JM", value: "+1-JM", label: "+1 (JM)" }, // Jamaica
  { id: "JP", value: "+81", label: "+81 (JP)" }, // Japan
  { id: "JO", value: "+962", label: "+962 (JO)" }, // Jordan
  { id: "KZ", value: "+7-KZ", label: "+7 (KZ)" }, // Kazakhstan
  { id: "KE", value: "+254", label: "+254 (KE)" }, // Kenya
  { id: "KI", value: "+686", label: "+686 (KI)" }, // Kiribati
  { id: "XK", value: "+383", label: "+383 (XK)" }, // Kosovo
  { id: "KW", value: "+965", label: "+965 (KW)" }, // Kuwait
  { id: "KG", value: "+996", label: "+996 (KG)" }, // Kyrgyzstan
  { id: "LA", value: "+856", label: "+856 (LA)" }, // Laos
  { id: "LV", value: "+371", label: "+371 (LV)" }, // Latvia
  { id: "LB", value: "+961", label: "+961 (LB)" }, // Lebanon
  { id: "LS", value: "+266", label: "+266 (LS)" }, // Lesotho
  { id: "LR", value: "+231", label: "+231 (LR)" }, // Liberia
  { id: "LY", value: "+218", label: "+218 (LY)" }, // Libya
  { id: "LI", value: "+423", label: "+423 (LI)" }, // Liechtenstein
  { id: "LT", value: "+370", label: "+370 (LT)" }, // Lithuania
  { id: "LU", value: "+352", label: "+352 (LU)" }, // Luxembourg
  { id: "MK", value: "+389", label: "+389 (MK)" }, // North Macedonia
  { id: "MG", value: "+261", label: "+261 (MG)" }, // Madagascar
  { id: "MW", value: "+265", label: "+265 (MW)" }, // Malawi
  { id: "MY", value: "+60", label: "+60 (MY)" }, // Malaysia
  { id: "MV", value: "+960", label: "+960 (MV)" }, // Maldives
  { id: "ML", value: "+223", label: "+223 (ML)" }, // Mali
  { id: "MT", value: "+356", label: "+356 (MT)" }, // Malta
  { id: "MH", value: "+692", label: "+692 (MH)" }, // Marshall Islands
  { id: "MR", value: "+222", label: "+222 (MR)" }, // Mauritania
  { id: "MU", value: "+230", label: "+230 (MU)" }, // Mauritius
  { id: "MX", value: "+52", label: "+52 (MX)" }, // Mexico
  { id: "FM", value: "+691", label: "+691 (FM)" }, // Micronesia
  { id: "MD", value: "+373", label: "+373 (MD)" }, // Moldova
  { id: "MC", value: "+377", label: "+377 (MC)" }, // Monaco
  { id: "MN", value: "+976", label: "+976 (MN)" }, // Mongolia
  { id: "ME", value: "+382", label: "+382 (ME)" }, // Montenegro
  { id: "MA", value: "+212", label: "+212 (MA)" }, // Morocco
  { id: "MZ", value: "+258", label: "+258 (MZ)" }, // Mozambique
  { id: "MM", value: "+95", label: "+95 (MM)" }, // Myanmar
  { id: "NA", value: "+264", label: "+264 (NA)" }, // Namibia
  { id: "NR", value: "+674", label: "+674 (NR)" }, // Nauru
  { id: "NP", value: "+977", label: "+977 (NP)" }, // Nepal
  { id: "NL", value: "+31", label: "+31 (NL)" }, // Netherlands
  { id: "NZ", value: "+64", label: "+64 (NZ)" }, // New Zealand
  { id: "NI", value: "+505", label: "+505 (NI)" }, // Nicaragua
  { id: "NE", value: "+227", label: "+227 (NE)" }, // Niger
  { id: "NG", value: "+234", label: "+234 (NG)" }, // Nigeria
  { id: "KP", value: "+850", label: "+850 (KP)" }, // North Korea
  { id: "NO", value: "+47", label: "+47 (NO)" }, // Norway
  { id: "OM", value: "+968", label: "+968 (OM)" }, // Oman
  { id: "PK", value: "+92", label: "+92 (PK)" }, // Pakistan
  { id: "PW", value: "+680", label: "+680 (PW)" }, // Palau
  { id: "PS", value: "+970", label: "+970 (PS)" }, // Palestine
  { id: "PA", value: "+507", label: "+507 (PA)" }, // Panama
  { id: "PG", value: "+675", label: "+675 (PG)" }, // Papua New Guinea
  { id: "PY", value: "+595", label: "+595 (PY)" }, // Paraguay
  { id: "PE", value: "+51", label: "+51 (PE)" }, // Peru
  { id: "PH", value: "+63", label: "+63 (PH)" }, // Philippines
  { id: "PL", value: "+48", label: "+48 (PL)" }, // Poland
  { id: "PT", value: "+351", label: "+351 (PT)" }, // Portugal
  { id: "QA", value: "+974", label: "+974 (QA)" }, // Qatar
  { id: "KR", value: "+82", label: "+82 (KR)" }, // South Korea
  { id: "RO", value: "+40", label: "+40 (RO)" }, // Romania
  { id: "RU", value: "+7-RU", label: "+7 (RU)" }, // Russia
  { id: "RW", value: "+250", label: "+250 (RW)" }, // Rwanda
  { id: "KN", value: "+1-KN", label: "+1 (KN)" }, // Saint Kitts and Nevis
  { id: "LC", value: "+1-LC", label: "+1 (LC)" }, // Saint Lucia
  { id: "VC", value: "+1-VC", label: "+1 (VC)" }, // Saint Vincent and the Grenadines
  { id: "WS", value: "+685", label: "+685 (WS)" }, // Samoa
  { id: "SM", value: "+378", label: "+378 (SM)" }, // San Marino
  { id: "ST", value: "+239", label: "+239 (ST)" }, // Sao Tome and Principe
  { id: "SA", value: "+966", label: "+966 (SA)" }, // Saudi Arabia
  { id: "SN", value: "+221", label: "+221 (SN)" }, // Senegal
  { id: "RS", value: "+381", label: "+381 (RS)" }, // Serbia
  { id: "SC", value: "+248", label: "+248 (SC)" }, // Seychelles
  { id: "SL", value: "+232", label: "+232 (SL)" }, // Sierra Leone
  { id: "SG", value: "+65", label: "+65 (SG)" }, // Singapore
  { id: "SK", value: "+421", label: "+421 (SK)" }, // Slovakia
  { id: "SI", value: "+386", label: "+386 (SI)" }, // Slovenia
  { id: "SB", value: "+677", label: "+677 (SB)" }, // Solomon Islands
  { id: "SO", value: "+252", label: "+252 (SO)" }, // Somalia
  { id: "ZA", value: "+27", label: "+27 (ZA)" }, // South Africa
  { id: "SS", value: "+211", label: "+211 (SS)" }, // South Sudan
  { id: "ES", value: "+34", label: "+34 (ES)" }, // Spain
  { id: "LK", value: "+94", label: "+94 (LK)" }, // Sri Lanka
  { id: "SD", value: "+249", label: "+249 (SD)" }, // Sudan
  { id: "SR", value: "+597", label: "+597 (SR)" }, // Suriname
  { id: "SE", value: "+46", label: "+46 (SE)" }, // Sweden
  { id: "CH", value: "+41", label: "+41 (CH)" }, // Switzerland
  { id: "SY", value: "+963", label: "+963 (SY)" }, // Syria
  { id: "TW", value: "+886", label: "+886 (TW)" }, // Taiwan
  { id: "TJ", value: "+992", label: "+992 (TJ)" }, // Tajikistan
  { id: "TZ", value: "+255", label: "+255 (TZ)" }, // Tanzania
  { id: "TH", value: "+66", label: "+66 (TH)" }, // Thailand
  { id: "TG", value: "+228", label: "+228 (TG)" }, // Togo
  { id: "TO", value: "+676", label: "+676 (TO)" }, // Tonga
  { id: "TT", value: "+1-TT", label: "+1 (TT)" }, // Trinidad and Tobago
  { id: "TN", value: "+216", label: "+216 (TN)" }, // Tunisia
  { id: "TR", value: "+90", label: "+90 (TR)" }, // Turkey
  { id: "TM", value: "+993", label: "+993 (TM)" }, // Turkmenistan
  { id: "TV", value: "+688", label: "+688 (TV)" }, // Tuvalu
  { id: "UG", value: "+256", label: "+256 (UG)" }, // Uganda
  { id: "UA", value: "+380", label: "+380 (UA)" }, // Ukraine
  { id: "AE", value: "+971", label: "+971 (AE)" }, // United Arab Emirates
  { id: "GB", value: "+44", label: "+44 (GB)", example: "7911123456" }, // United Kingdom
  { id: "US", value: "+1-US", label: "+1 (US)", example: "2025550195" }, // United States
  { id: "UY", value: "+598", label: "+598 (UY)" }, // Uruguay
  { id: "UZ", value: "+998", label: "+998 (UZ)" }, // Uzbekistan
  { id: "VU", value: "+678", label: "+678 (VU)" }, // Vanuatu
  { id: "VA", value: "+379", label: "+379 (VA)" }, // Vatican City
  { id: "VE", value: "+58", label: "+58 (VE)" }, // Venezuela
  { id: "VN", value: "+84", label: "+84 (VN)" }, // Vietnam
  { id: "YE", value: "+967", label: "+967 (YE)" }, // Yemen
  { id: "ZM", value: "+260", label: "+260 (ZM)" }, // Zambia
  { id: "ZW", value: "+263", label: "+263 (ZW)" }, // Zimbabwe
];

export function CountryCodes({ onChange, value, className, onCountryChange }: CountryCodesProps) {
  const [search, setSearch] = useState("");
  const [filteredCodes, setFilteredCodes] = useState(countryCodes);
  
  // Find the selected country code
  const selectedCountry = countryCodes.find(code => code.value === value);
  
  // Filter country codes based on search term
  useEffect(() => {
    if (!search.trim()) {
      setFilteredCodes(countryCodes);
      return;
    }
    
    const searchLower = search.toLowerCase();
    const filtered = countryCodes.filter(code => 
      code.id.toLowerCase().includes(searchLower) || 
      code.label.toLowerCase().includes(searchLower)
    );
    setFilteredCodes(filtered);
  }, [search]);
  
  // When value changes, find the country and notify parent if needed
  useEffect(() => {
    if (onCountryChange && selectedCountry) {
      onCountryChange(selectedCountry);
    }
  }, [value, onCountryChange, selectedCountry]);

  return (
    <Select
      value={value}
      onValueChange={(newValue) => {
        onChange(newValue);
      }}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="+91" />
      </SelectTrigger>
      <SelectContent className="max-h-[300px]">
        <div className="px-2 py-2 sticky top-0 bg-white z-10 border-b">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search country..." 
              className="pl-8 h-8 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        
        <div className="pt-1">
          {filteredCodes.length === 0 ? (
            <div className="px-2 py-3 text-sm text-gray-500 text-center">No countries found</div>
          ) : (
            filteredCodes.map((code) => (
              <SelectItem key={code.id} value={code.value}>
                <div className="flex items-center justify-between w-full">
                  <span>{code.label}</span>
                  {code === selectedCountry && (
                    <span className="text-green-600 text-xs">✓</span>
                  )}
                </div>
              </SelectItem>
            ))
          )}
        </div>
      </SelectContent>
    </Select>
  );
}
