//todo: not sure namepaces are the right choice here. Maybe use break out into sepsarate classes and re-export from a Map.ts file

export namespace Maps {

    export const Continents = "Continents";
    export const WorldCountries = "WorldCountries";
    export const Africa = "Africa";

    export namespace Asia {
        export const AllAsia = "Asia";
        export const EasternAsia = "Eastern Asia";
        export const SouthernAsia = "Southern Asia";
        export const WesternAsia = "Western Asia";
    }
    
    export namespace NorthAmerica {
        export const AllNorthAmerica = "North America";
    
        export namespace UnitedStates {
            export const Regions = "USA Regions";
            export const Counties = "USA Counties";
    
            export namespace States {
                export const AllStates = "USA States";
                export const Alabama = "Alabama";
                export const Alaska = "Alaska";
                export const Arizona = "Arizona";
                export const Arkansas = "Arkansas";
                export const California = "California";
                export const Colorado = "Colorado";
                export const Connecticut = "Connecticut";
                export const Delaware = "Delaware";
                export const Florida = "Florida";
                export const Georgia = "Georgia";
                export const Hawaii = "Hawaii";
                export const Idaho = "Idaho";
                export const Illinois = "Illinois";
                export const Indiana = "Indiana";
                export const Iowa = "Iowa";
                export const Kansas = "Kansas";
                export const Kentucky = "Kentucky";
                export const Louisiana = "Louisiana";
                export const Maine = "Maine";
                export const Maryland = "Maryland";
                export const Massachusetts = "Massachusetts";
                export const Michigan = "Michigan";
                export const Minnesota = "Minnesota";
                export const Mississippi = "Mississippi";
                export const Missouri = "Missouri";
                export const Montana = "Montana";
                export const Nebraska = "Nebraska";
                export const Nevada = "Nevada";
                export const NewHampshire = "New Hampshire";
                export const NewJersey = "New Jersey";
                export const NewMexico = "New Mexico";
                export const NewYork = "New York";
                export const NorthCarolina = "North Carolina";
                export const NorthDakota = "North Dakota";
                export const Ohio = "Ohio";
                export const Oklahoma = "Oklahoma";
                export const Oregon = "Oregon";
                export const Pennsylvania = "Pennsylvania";
                export const RhodeIsland = "Rhode Island";
                export const SouthCarolina = "South Carolina";
                export const SouthDakota = "South Dakota";
                export const Tennessee = "Tennessee";
                export const Texas = "Texas";
                export const Utah = "Utah";
                export const Vermont = "Vermont";
                export const Virginia = "Virginia";
                export const Washington = "Washington";
                export const WestVirginia = "West Virginia";
                export const Wisconsin = "Wisconsin";
                export const Wyoming = "Wyoming";
            }
        }
    
        export const CentralAmerica = "Central America";
        export const SouthAmerica = "South America";
        export const Europe = "Europe";
        export const Oceania = "Oceania";
    }

    export namespace OtherRegions {
        export const APAC = "WO_APAC";
        export const EMEA = "WO_EMEA";
        export const Americas = "WO_Americas";
        export const Japan = "WO_Japan";
        export const India = "WO_India";
        export const MiddleEast = "Middle East";
    }
}