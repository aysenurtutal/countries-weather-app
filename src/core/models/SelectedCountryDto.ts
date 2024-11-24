export interface NativeName {
    cat: {
        official: string;
        common: string;
    };
}

export interface Currency {
    [key: string]: {
        name: string;
        symbol: string;
    };
}

export interface Idd {
    root: string;
    suffixes: string[];
}

export interface Translations {
    [key: string]: {
        official: string;
        common: string;
    };
}

export interface Demonyms {
    eng: {
        f: string;
        m: string;
    };
    fra: {
        f: string;
        m: string;
    };
}

export interface Maps {
    googleMaps: string;
    openStreetMaps: string;
}

export interface Flag {
    png: string;
    svg: string;
    alt: string;
}

export interface CapitalInfo {
    latlng: number[];
}

export interface PostalCode {
    format: string;
    regex: string;
}

export interface SelectedCountry {
    name: {
        common: string;
        official: string;
        nativeName: NativeName;
    };
    tld: string[];
    cca2: string;
    ccn3: string;
    cca3: string;
    cioc: string;
    independent: boolean;
    status: string;
    unMember: boolean;
    currencies:  { [key: string]: string } | null;
    idd: Idd;
    capital: string[];
    altSpellings: string[];
    region: string;
    subregion: string;
    languages: { [key: string]: string } | null;
    translations: Translations;
    latlng: number[];
    landlocked: boolean;
    borders: string[] | null;
    area: number;
    demonyms: Demonyms;
    flag: string;
    maps: Maps;
    population: number;
    fifa: string;
    car: {
        signs: string[];
        side: string;
    };
    timezones: string[] | null;
    continents: string[];
    flags: Flag;
    coatOfArms: Flag;
    startOfWeek: string;
    capitalInfo: CapitalInfo;
    postalCode: PostalCode;
}
