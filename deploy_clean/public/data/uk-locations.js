/**
 * UK Locations Data Structure
 * Comprehensive hierarchy of counties and cities for location pages
 */

const ukLocations = {
    london: {
        name: "London",
        type: "region",
        description: "UK's capital and largest financial center",
        population: "9.5 million",
        tradeOpportunities: "Massive construction projects, high-end residential, commercial developments",
        keyIndustries: ["Construction", "Electrical", "Plumbing", "Carpentry", "Glazing"],
        areas: {
            "central-london": {
                name: "Central London",
                postcodes: ["EC1", "EC2", "EC3", "EC4", "WC1", "WC2", "W1", "SW1"],
                keyAreas: ["City of London", "Westminster", "Holborn", "Covent Garden", "Mayfair", "Soho"]
            },
            "east-london": {
                name: "East London", 
                postcodes: ["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E20"],
                keyAreas: ["Canary Wharf", "Stratford", "Hackney", "Tower Hamlets", "Newham", "Waltham Forest", "Redbridge", "Barking", "Havering"]
            },
            "south-london": {
                name: "South London",
                postcodes: ["SE1", "SE2", "SE3", "SE4", "SE5", "SE6", "SE7", "SE8", "SE9", "SE10", "SE11", "SE12", "SE13", "SE14", "SE15", "SE16", "SE17", "SE18", "SE19", "SE20", "SE21", "SE22", "SE23", "SE24", "SE25", "SE26", "SE27", "SE28", "SW2", "SW4", "SW8", "SW9", "SW11", "SW12", "SW15", "SW16", "SW17", "SW18", "SW19", "SW20"],
                keyAreas: ["Southwark", "Greenwich", "Lewisham", "Bromley", "Croydon", "Lambeth", "Wandsworth", "Merton", "Kingston", "Sutton"]
            },
            "west-london": {
                name: "West London",
                postcodes: ["W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12", "W13", "W14", "SW3", "SW5", "SW6", "SW7", "SW10", "SW13", "SW14"],
                keyAreas: ["Kensington", "Chelsea", "Hammersmith", "Fulham", "Ealing", "Hounslow", "Richmond", "Brentford", "Chiswick", "Acton"]
            },
            "north-london": {
                name: "North London",
                postcodes: ["N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9", "N10", "N11", "N12", "N13", "N14", "N15", "N16", "N17", "N18", "N19", "N20", "N21", "N22", "NW1", "NW2", "NW3", "NW4", "NW5", "NW6", "NW7", "NW8", "NW9", "NW10", "NW11"],
                keyAreas: ["Camden", "Islington", "Haringey", "Enfield", "Barnet", "Brent", "Harrow", "Finchley", "Hampstead", "Kentish Town"]
            }
        }
    },
    
    westMidlands: {
        name: "West Midlands",
        type: "county",
        description: "Industrial heartland of England", 
        population: "2.9 million",
        tradeOpportunities: "Manufacturing, automotive industry, urban regeneration projects",
        keyIndustries: ["Manufacturing", "Automotive", "Construction", "Engineering"],
        mainCities: {
            birmingham: {
                name: "Birmingham",
                population: "1.1 million",
                description: "UK's second largest city and industrial center",
                postcodes: ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", "B21", "B23", "B24", "B25", "B26", "B27", "B28", "B29", "B30", "B31", "B32", "B33", "B34", "B35", "B36", "B37", "B38", "B40", "B42", "B43", "B44", "B45", "B46", "B47", "B48"],
                keyAreas: ["City Centre", "Aston", "Erdington", "Handsworth", "Kings Heath", "Moseley", "Solihull", "Sutton Coldfield"]
            },
            coventry: {
                name: "Coventry",
                population: "369,000",
                description: "Historic city with automotive heritage",
                postcodes: ["CV1", "CV2", "CV3", "CV4", "CV5", "CV6", "CV7", "CV8"],
                keyAreas: ["City Centre", "Canley", "Earlsdon", "Foleshill", "Radford", "Tile Hill"]
            },
            wolverhampton: {
                name: "Wolverhampton", 
                population: "263,000",
                description: "Traditional industrial town",
                postcodes: ["WV1", "WV2", "WV3", "WV4", "WV5", "WV6", "WV10", "WV11"],
                keyAreas: ["City Centre", "Bilston", "Wednesfield", "Tettenhall", "Penn"]
            }
        }
    },

    manchester: {
        name: "Greater Manchester",
        type: "county",
        description: "Major commercial and industrial center of North West England",
        population: "2.9 million", 
        tradeOpportunities: "Major regeneration projects, commercial developments, residential growth",
        keyIndustries: ["Digital", "Manufacturing", "Construction", "Media"],
        mainCities: {
            manchester: {
                name: "Manchester",
                population: "547,000",
                description: "Major city known for regeneration and development",
                postcodes: ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M11", "M12", "M13", "M14", "M15", "M16", "M17", "M18", "M19", "M20", "M21", "M22", "M23", "M24", "M25", "M26", "M27", "M28", "M29", "M30", "M31", "M32", "M33", "M34", "M35", "M38", "M40", "M41", "M43", "M44", "M45", "M46", "M50", "M60", "M90"],
                keyAreas: ["City Centre", "Ancoats", "Chorlton", "Didsbury", "Fallowfield", "Hulme", "Moss Side", "Northern Quarter", "Salford", "Stretford"]
            },
            bolton: {
                name: "Bolton",
                population: "287,000", 
                description: "Traditional textile town with modern development",
                postcodes: ["BL1", "BL2", "BL3", "BL4", "BL5", "BL6", "BL7"],
                keyAreas: ["Town Centre", "Astley Bridge", "Breightmet", "Farnworth", "Horwich", "Westhoughton"]
            },
            stockport: {
                name: "Stockport",
                population: "291,000",
                description: "Historic market town in Greater Manchester", 
                postcodes: ["SK1", "SK2", "SK3", "SK4", "SK5", "SK6", "SK7", "SK8"],
                keyAreas: ["Town Centre", "Bramhall", "Cheadle", "Hazel Grove", "Marple", "Reddish"]
            }
        }
    },

    yorkshire: {
        name: "Yorkshire",
        type: "county", 
        description: "England's largest county with diverse industrial heritage",
        population: "5.4 million",
        tradeOpportunities: "Steel industry, manufacturing, urban renewal, heritage projects",
        keyIndustries: ["Steel", "Manufacturing", "Engineering", "Agriculture"],
        mainCities: {
            leeds: {
                name: "Leeds",
                population: "789,000",
                description: "Major financial and commercial center",
                postcodes: ["LS1", "LS2", "LS3", "LS4", "LS5", "LS6", "LS7", "LS8", "LS9", "LS10", "LS11", "LS12", "LS13", "LS14", "LS15", "LS16", "LS17", "LS18", "LS19", "LS20", "LS21", "LS22", "LS23", "LS24", "LS25", "LS26", "LS27", "LS28", "LS29"],
                keyAreas: ["City Centre", "Armley", "Beeston", "Chapel Allerton", "Headingley", "Kirkstall", "Roundhay", "Wetherby"]
            },
            sheffield: {
                name: "Sheffield",
                population: "584,000",
                description: "Steel city with regeneration projects",
                postcodes: ["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8", "S9", "S10", "S11", "S12", "S13", "S14", "S17", "S18", "S20", "S21", "S25", "S26", "S35", "S36"],
                keyAreas: ["City Centre", "Crookes", "Ecclesall", "Hillsborough", "Norton", "Totley"]
            },
            bradford: {
                name: "Bradford", 
                population: "537,000",
                description: "Historic wool town with diverse communities",
                postcodes: ["BD1", "BD2", "BD3", "BD4", "BD5", "BD6", "BD7", "BD8", "BD9", "BD10", "BD11", "BD12", "BD13", "BD14", "BD15", "BD16", "BD17", "BD18", "BD19", "BD20", "BD21", "BD22", "BD23", "BD24"],
                keyAreas: ["City Centre", "Bingley", "Ilkley", "Keighley", "Shipley", "Baildon"]
            }
        }
    },

    scotland: {
        name: "Scotland", 
        type: "country",
        description: "Diverse economy with strong construction and renewable energy sectors",
        population: "5.5 million",
        tradeOpportunities: "Renewable energy projects, construction, oil & gas infrastructure",
        keyIndustries: ["Energy", "Construction", "Tourism", "Whisky", "Technology"],
        mainCities: {
            glasgow: {
                name: "Glasgow",
                population: "635,000",
                description: "Scotland's largest city and commercial center",
                postcodes: ["G1", "G2", "G3", "G4", "G5", "G11", "G12", "G13", "G14", "G15", "G20", "G21", "G22", "G23", "G31", "G32", "G33", "G34", "G40", "G41", "G42", "G43", "G44", "G45", "G46", "G51", "G52", "G53"],
                keyAreas: ["City Centre", "Merchant City", "West End", "Southside", "East End", "Dennistoun", "Partick", "Shawlands"]
            },
            edinburgh: {
                name: "Edinburgh",
                population: "518,000", 
                description: "Scotland's capital with financial services and tourism",
                postcodes: ["EH1", "EH2", "EH3", "EH4", "EH5", "EH6", "EH7", "EH8", "EH9", "EH10", "EH11", "EH12", "EH13", "EH14", "EH15", "EH16", "EH17"],
                keyAreas: ["Old Town", "New Town", "Leith", "Morningside", "Bruntsfield", "Stockbridge", "Portobello"]
            }
        }
    }
};

// Export for use in location page generation
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ukLocations;
} else if (typeof window !== 'undefined') {
    window.ukLocations = ukLocations;
}