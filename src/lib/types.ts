/** Modèle de données de urge. Une envie inscrite au moment où l'on y
 *  renonce, une question posée plus tard, une réponse en un mot.
 *
 *  Ce n'est pas une liste d'envies : rien ne s'inscrit ici au moment où
 *  l'envie arrive. Une ligne est toujours un renoncement déjà consommé. */

/** Les trois réponses possibles, et il n'y en aura pas de quatrième.
 *
 *  Stockées en mots neutres plutôt que traduites : un fichier exporté en
 *  français doit se relire en anglais, et « oublié » est un rendu, pas une
 *  donnée. L'ordre est celui du bilan, du plus léger au plus tenace. */
export const VERDICTS = ['forgotten', 'faint', 'still'] as const

export type Verdict = (typeof VERDICTS)[number]

export interface Entry {
  id: string
  /** Ce qu'on n'achète pas. La seule chose obligatoire. */
  name: string
  /** Facultatif : un registre sans prix reste un registre. `null` quand le
   *  réglage ne le demande pas, ou quand la ligne a été inscrite sans. */
  price: number | null
  /** Où on l'aurait acheté. Libre, jamais un lien. */
  where: string
  /** La phrase qu'on s'est dite. C'est elle qu'on relira. */
  why: string
  /** ISO 8601, AAAA-MM-JJ : le jour du renoncement. */
  renouncedAt: string
  /** Le jour où la question se pose, figé à l'inscription.
   *
   *  Figé, et non recalculé depuis le réglage : « la question reviendra le
   *  13 septembre » est une promesse écrite le jour du renoncement.
   *  Raccourcir le délai ferait échoir d'un coup des lignes qu'on croyait
   *  au calme ; l'allonger effacerait une question déjà due. Le réglage
   *  vaut pour ce qu'on inscrira, jamais pour ce qui est inscrit. */
  askAt: string
  /** `null` tant que la question n'a pas reçu sa réponse. */
  verdict: Verdict | null
  /** Le jour de la réponse. Le bilan compte les réponses par ce jour-là,
   *  pas par la date d'échéance : un mois compte ce qu'on y a jugé. */
  answeredAt: string | null
}

export type ThemeSetting = 'system' | 'light' | 'dark'
export type LangSetting = 'system' | 'fr' | 'en'
/** À l'ouverture, la question échue se pose d'elle-même ; sinon elle
 *  attend d'être demandée depuis le registre.
 *
 *  Ce réglage remplace le rappel esquissé dans la maquette. Une application
 *  sans serveur ne peut pas réveiller un téléphone à 9 h : un interrupteur
 *  « rappel : le matin » aurait promis une notification que le programme
 *  n'a aucun moyen d'envoyer. */
export type AskSetting = 'onOpen' | 'onDemand'
export type PriceSetting = 'asked' | 'never'

/** Les délais offerts. Trente jours est le défaut : assez pour qu'une envie
 *  d'impulsion se soit éteinte, assez court pour qu'on se souvienne encore
 *  de l'avoir eue. */
export const DELAYS = [15, 30, 60] as const

export type Delay = (typeof DELAYS)[number]

export interface Settings {
  theme: ThemeSetting
  lang: LangSetting
  /** Jours entre le renoncement et la question. */
  delay: Delay
  ask: AskSetting
  price: PriceSetting
}

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  lang: 'system',
  delay: 30,
  ask: 'onOpen',
  price: 'asked',
}

/** Longueur maximale du nom. Au-delà, la ligne du registre tronquerait
 *  sans le dire — et une envie qui demande plus de 64 caractères est une
 *  phrase, pas un objet. */
export const NAME_MAX = 64
export const WHERE_MAX = 64
export const WHY_MAX = 280

/** Le prix le plus élevé qu'on accepte d'inscrire. Au-delà, ce n'est plus
 *  un renoncement du quotidien, et le total du bilan deviendrait illisible. */
export const PRICE_MAX = 1_000_000

export const SCHEMA_VERSION = 1

/** Le fichier urge.json — le seul format d'échange du projet. */
export interface UrgeFile {
  schemaVersion: number
  data: { entries: Entry[] }
  settings: Partial<Settings>
}
