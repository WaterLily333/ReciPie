import { Filter } from 'bad-words';
let filter = new Filter();

// Add new bad words
filter.addWords('laino', 'newbadword2', 'newbadword3');

const forbiddenIngredients = [
    // Poisonous or toxic plants
    "Aconite",               // Extremely toxic plant
    "Deadly Nightshade",      // Also known as belladonna, highly toxic
    "Hemlock",                // Deadly poison
    "Foxglove",               // Contains toxins that affect the heart
    "Oleander",               // Highly poisonous plant
    "Jimsonweed",             // Hallucinogenic and poisonous
    "Monkshood",              // Contains toxic alkaloids
    "Lily of the Valley",     // Toxic plant used in ornamental gardens
    "Rhubarb leaves",         // Contain oxalic acid, poisonous in large amounts
    "Castor beans",           // Contain ricin, a potent toxin
    "Rosary Pea",             // Contains abrin, a highly toxic substance

    // Fish and seafood toxins
    "Pufferfish (Fugu)",      // Can be lethal if improperly prepared
    "Shellfish during Red Tide",  // Can accumulate toxins harmful to humans
    "Shark fins",             // Banned in many countries due to overfishing and ethical concerns
    "Blowfish liver",         // Contains tetrodotoxin, extremely dangerous

    // Toxic seeds and nuts
    "Bitter almonds",         // Contain cyanogenic compounds that release cyanide
    "Apricot kernels",        // Contain amygdalin, which converts to cyanide in the body
    "Raw cashews",            // Contain urushiol, which is toxic in raw form

    // Forbidden or banned ingredients
    "Sassafras",              // Banned in the U.S. due to safrole content (carcinogenic)
    "Absinthe (high-thujone)",// Banned in many countries historically, now regulated
    "Ortolan",                // Small songbird traditionally eaten whole, now illegal in most places
    "Foie gras",              // Banned in some regions due to animal cruelty concerns
    "Kava",                   // Banned in some countries due to its effects on the liver

    // Toxic mushrooms and fungi
    "Death Cap mushroom",      // Extremely toxic mushroom
    "Destroying Angel mushroom",// Deadly poisonous mushroom
    "False Morel mushroom",    // Contains toxins that can cause severe illness or death if not prepared correctly

    // Toxic animals or animal products
    "Casu Marzu",             // Sardinian cheese infested with live maggots, banned in many countries
    "Raw pig blood",          // Can contain dangerous pathogens like hepatitis E
    "Polar bear liver",       // Contains toxic levels of vitamin A

    // Miscellaneous toxic substances
    "Sodium cyanide",         // Highly toxic substance
    "Lead paint",             // Historically used on plates, dangerous when ingested
    "Mercury-containing fish",// Some fish like swordfish and king mackerel can accumulate high levels of mercury

    // Plants or herbs toxic in large quantities
    "Nutmeg (in large doses)",  // Psychoactive and toxic in large amounts
    "Cassava (raw)",            // Contains cyanogenic glycosides, must be cooked properly
    "Elderberries (uncooked)",  // Can cause nausea, vomiting, and diarrhea if not cooked
    "Green potatoes",           // Contain solanine, toxic when consumed in large quantities

    // Ethical or forbidden in some cultures or countries
    "Dog meat",               // Banned in many countries for ethical reasons
    "Horse meat",             // Forbidden in some regions due to cultural sensitivities
    "Dolphin meat",           // Banned in most countries due to ethical concerns and high mercury content
    "Whale meat",             // Forbidden or heavily regulated in many parts of the world

    // Artificially harmful substances
    "Cyclamate",              // Artificial sweetener banned in the U.S. (carcinogenic concerns)
    "Acrylamide",             // Forms in certain foods during high-temperature cooking (toxic in high amounts)

    // Add any other substances based on research or region-specific regulations
];


export default { filter, forbiddenIngredients };

