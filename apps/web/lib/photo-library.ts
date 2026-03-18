// apps/web/lib/photo-library.ts
// Shared photo library — magazine-quality corridor photography available to ALL brands.
//
// Every photo is from the Feb–Mar 2026 Ocean Springs / Natchez corridor shoots,
// editorially enhanced (auto levels, contrast, vibrance, warm shift, shadow recovery,
// sharpening, film vignette).
//
// USAGE:
//   import { LIBRARY, getPhotosByTag, getTopPhotos } from '@/lib/photo-library';
//   const hero = getPhotosByTag('mansion')[0];
//   <Image src={hero.src} alt={hero.alt} />

export type PhotoTag =
  | 'azalea'
  | 'mansion'
  | 'downtown'
  | 'storefront'
  | 'live-oak'
  | 'street'
  | 'marina'
  | 'shrimp-boat'
  | 'pier'
  | 'waterfront'
  | 'cottage'
  | 'garden'
  | 'iron-fence'
  | 'carriage'
  | 'residential'
  | 'brick'
  | 'b-and-b'
  | 'live-music'
  | 'food'
  | 'nightlife'
  | 'record-shop'
  | 'beach'
  | 'river'
  | 'church'
  | 'small-town'
  | 'art'
  | 'cafe'
  | 'sign';

export interface LibraryPhoto {
  /** Web-accessible path: /images/library/corridor-NNNN.webp */
  src: string;
  /** Descriptive alt text */
  alt: string;
  /** Technical quality score (0–1, higher = better) */
  score: number;
  /** Content tags for filtering */
  tags: PhotoTag[];
  /** Original photo number from the corridor shoot */
  corridorNum: number;
}

// ── Photo Library ───────────────────────────────────────────────────────────────
// Ordered by quality score descending.

export const LIBRARY: LibraryPhoto[] = [
  // ── Score 0.78+ ───────────────────────────────────────────────────────────────
  { src: '/images/library/corridor-0501.webp', alt: 'Pink azaleas cascading along Natchez sidewalk under live oaks', score: 0.789, tags: ['azalea', 'live-oak', 'residential'], corridorNum: 501 },
  { src: '/images/library/corridor-1087.webp', alt: 'Guitarist tuning up under chandelier in Natchez parlor venue', score: 0.744, tags: ['live-music', 'nightlife'], corridorNum: 1087 },
  { src: '/images/library/corridor-0500.webp', alt: 'Azalea-lined sidewalk with fallen petals in Natchez', score: 0.742, tags: ['azalea', 'residential'], corridorNum: 500 },
  { src: '/images/library/corridor-0657.webp', alt: 'Massive live oak canopy over Ocean Springs street', score: 0.739, tags: ['live-oak', 'residential'], corridorNum: 657 },
  { src: '/images/library/corridor-1056.webp', alt: 'Natchez Coffee Co sidewalk cafe with colorful flags and chalkboard sign', score: 0.737, tags: ['cafe', 'downtown', 'storefront'], corridorNum: 1056 },
  { src: '/images/library/corridor-0339.webp', alt: 'Brick sidewalk with bench and awnings on Natchez main street', score: 0.736, tags: ['downtown', 'storefront', 'brick'], corridorNum: 339 },
  { src: '/images/library/corridor-0655.webp', alt: 'Live oak with spreading branches over Ocean Springs home', score: 0.735, tags: ['live-oak', 'residential'], corridorNum: 655 },
  { src: '/images/library/corridor-1050.webp', alt: 'Natchez downtown street with church steeple and long shadows in black and white', score: 0.729, tags: ['downtown', 'street', 'church'], corridorNum: 1050 },
  { src: '/images/library/corridor-1033.webp', alt: 'Natchez mansion with columns and iron fence under live oaks against blue sky', score: 0.727, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1033 },
  { src: '/images/library/corridor-1055.webp', alt: 'Bright azaleas cascading over brick retaining wall on Natchez sidewalk', score: 0.725, tags: ['azalea', 'brick', 'residential'], corridorNum: 1055 },
  { src: '/images/library/corridor-1187.webp', alt: 'Colorful outdoor mural painting on vine-covered wall at Ocean Springs nightlife venue', score: 0.722, tags: ['art', 'nightlife'], corridorNum: 1187 },
  { src: '/images/library/corridor-1085.webp', alt: 'Grand columned Natchez mansion under restoration with sweeping portico', score: 0.721, tags: ['mansion', 'residential'], corridorNum: 1085 },
  { src: '/images/library/corridor-0307.webp', alt: 'Downtown Natchez brick storefronts with green awnings', score: 0.720, tags: ['downtown', 'storefront', 'brick'], corridorNum: 307 },
  { src: '/images/library/corridor-1195.webp', alt: 'Yellow Victorian mansion with wide porch and iron fence on Natchez bluff', score: 0.719, tags: ['mansion', 'iron-fence', 'residential'], corridorNum: 1195 },
  { src: '/images/library/corridor-1100.webp', alt: 'Grand Natchez mansion with columns under restoration and curved balcony', score: 0.717, tags: ['mansion', 'residential'], corridorNum: 1100 },
  { src: '/images/library/corridor-0338.webp', alt: 'Natchez main street with brick walkway and shop signs', score: 0.716, tags: ['downtown', 'storefront', 'brick'], corridorNum: 338 },
  { src: '/images/library/corridor-1063.webp', alt: 'Floral Anthologist shop sign on covered brick sidewalk in Natchez', score: 0.716, tags: ['downtown', 'storefront', 'brick', 'sign'], corridorNum: 1063 },
  { src: '/images/library/corridor-1093.webp', alt: 'Liberty Baptist Church with columns and dome in sepia tones', score: 0.716, tags: ['church', 'small-town', 'brick'], corridorNum: 1093 },
  { src: '/images/library/corridor-1069.webp', alt: 'Golden-hour storefront facade at 600 block in downtown Natchez', score: 0.715, tags: ['downtown', 'storefront'], corridorNum: 1069 },
  { src: '/images/library/corridor-0642.webp', alt: 'Victorian B&B with wraparound porch and gingerbread trim', score: 0.713, tags: ['b-and-b', 'cottage'], corridorNum: 642 },
  { src: '/images/library/corridor-0499.webp', alt: 'Brilliant azaleas spilling onto Natchez sidewalk', score: 0.713, tags: ['azalea', 'residential'], corridorNum: 499 },
  { src: '/images/library/corridor-0308.webp', alt: 'Brick downtown sidewalk with iron bench in Natchez', score: 0.711, tags: ['downtown', 'storefront', 'brick'], corridorNum: 308 },
  { src: '/images/library/corridor-0306.webp', alt: 'Downtown Natchez brick buildings with columned walkway', score: 0.710, tags: ['downtown', 'storefront', 'brick'], corridorNum: 306 },
  { src: '/images/library/corridor-1196.webp', alt: 'Yellow Natchez mansion with columned porch and rocking chairs at dusk', score: 0.710, tags: ['mansion', 'residential'], corridorNum: 1196 },
  { src: '/images/library/corridor-0977.webp', alt: 'Live oak canopy over Ocean Springs neighborhood street with azaleas and cottages', score: 0.708, tags: ['live-oak', 'residential', 'azalea', 'street'], corridorNum: 977 },
  { src: '/images/library/corridor-0630.webp', alt: 'White antebellum mansion with iron fence and carriage', score: 0.705, tags: ['mansion', 'iron-fence', 'carriage'], corridorNum: 630 },
  { src: '/images/library/corridor-1035.webp', alt: 'White columned mansion with iron gate and live oaks seen from street', score: 0.704, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1035 },
  { src: '/images/library/corridor-1058.webp', alt: 'Historic Natchez building with columns and red door at street corner', score: 0.703, tags: ['downtown', 'storefront', 'brick'], corridorNum: 1058 },
  { src: '/images/library/corridor-1059.webp', alt: 'Vintage coral bicycle with basket parked outside Natchez storefront', score: 0.702, tags: ['downtown', 'storefront'], corridorNum: 1059 },
  { src: '/images/library/corridor-1084.webp', alt: 'Mississippi River bluff walkway with iron fence and bridge in distance at Natchez', score: 0.702, tags: ['river', 'waterfront', 'iron-fence'], corridorNum: 1084 },
  { src: '/images/library/corridor-1088.webp', alt: 'Colorful three-story Victorian house with porches in Ocean Springs', score: 0.701, tags: ['cottage', 'residential'], corridorNum: 1088 },
  { src: '/images/library/corridor-1052.webp', alt: 'Natchez Coffee Co with outdoor seating on sunny downtown sidewalk', score: 0.701, tags: ['cafe', 'downtown', 'storefront'], corridorNum: 1052 },
  { src: '/images/library/corridor-1099.webp', alt: 'Grand columned Natchez mansion under renovation with ladders against portico', score: 0.698, tags: ['mansion', 'residential'], corridorNum: 1099 },
  { src: '/images/library/corridor-1091.webp', alt: 'Green Victorian cottage with columned porch and brick steps in Natchez', score: 0.697, tags: ['b-and-b', 'cottage', 'brick', 'residential'], corridorNum: 1091 },
  { src: '/images/library/corridor-1185.webp', alt: 'Small-town main street with drug store and boutiques in Liberty, Mississippi', score: 0.697, tags: ['small-town', 'storefront'], corridorNum: 1185 },
  { src: '/images/library/corridor-1007.webp', alt: 'Natchez bluff homes overlooking Mississippi River with bridge in background', score: 0.697, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1007 },
  { src: '/images/library/corridor-1018.webp', alt: 'B&B courtyard with ornate iron gazebo and brick herringbone patio in Natchez', score: 0.697, tags: ['b-and-b', 'iron-fence', 'brick', 'garden'], corridorNum: 1018 },
  { src: '/images/library/corridor-1051.webp', alt: 'Kate Lee Laird Art Studio and Gallery palette-shaped sign in downtown Natchez', score: 0.697, tags: ['art', 'downtown', 'sign'], corridorNum: 1051 },
  { src: '/images/library/corridor-1095.webp', alt: 'Yellow Victorian home with columned porch and iron fence overlooking Natchez bluff', score: 0.697, tags: ['mansion', 'iron-fence', 'residential'], corridorNum: 1095 },
  { src: '/images/library/corridor-1045.webp', alt: 'Band performing in chandelier-lit Natchez parlor with piano, guitar, and bass', score: 0.696, tags: ['live-music', 'nightlife'], corridorNum: 1045 },
  { src: '/images/library/corridor-0981.webp', alt: 'Ocean Springs residential street under canopy of live oaks and crepe myrtles', score: 0.696, tags: ['live-oak', 'street', 'residential'], corridorNum: 981 },
  { src: '/images/library/corridor-0299.webp', alt: 'Historic Natchez building with iron balcony details', score: 0.694, tags: ['downtown', 'iron-fence'], corridorNum: 299 },
  { src: '/images/library/corridor-1089.webp', alt: 'Panoramic view of Mississippi River bend from Natchez bluff overlook', score: 0.693, tags: ['river', 'waterfront'], corridorNum: 1089 },
  { src: '/images/library/corridor-1193.webp', alt: 'Liberty Baptist Church with red brick facade and white columns', score: 0.693, tags: ['church', 'small-town', 'brick'], corridorNum: 1193 },
  { src: '/images/library/corridor-0309.webp', alt: 'Natchez downtown with trees and brick sidewalk', score: 0.692, tags: ['downtown', 'storefront', 'brick'], corridorNum: 309 },
  { src: '/images/library/corridor-1005.webp', alt: 'Natchez bluff mansions with manicured lawns and Mississippi River bridge in distance', score: 0.691, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1005 },
  { src: '/images/library/corridor-1094.webp', alt: 'Yellow Natchez home with iron fence and bluff view of Mississippi River', score: 0.691, tags: ['mansion', 'iron-fence', 'river', 'waterfront'], corridorNum: 1094 },
  { src: '/images/library/corridor-1181.webp', alt: 'The Barber Shop with red door and blue awning on small-town Mississippi main street', score: 0.690, tags: ['small-town', 'storefront', 'sign'], corridorNum: 1181 },
  { src: '/images/library/corridor-1183.webp', alt: 'Liberty Drug Store with painted Rexall mural on small-town main street', score: 0.690, tags: ['small-town', 'storefront', 'sign'], corridorNum: 1183 },
  { src: '/images/library/corridor-1188.webp', alt: 'Liberty Rexall Drug Store with vintage signage and blue awning', score: 0.688, tags: ['small-town', 'storefront', 'sign'], corridorNum: 1188 },
  { src: '/images/library/corridor-1102.webp', alt: 'B&B courtyard with iron arbor, brick patio, and fountain in Natchez', score: 0.687, tags: ['b-and-b', 'iron-fence', 'brick', 'garden'], corridorNum: 1102 },
  { src: '/images/library/corridor-1006.webp', alt: 'Natchez bluff lawn with azalea hedge and Mississippi River bridge view', score: 0.686, tags: ['mansion', 'river', 'waterfront', 'garden'], corridorNum: 1006 },
  { src: '/images/library/corridor-0300.webp', alt: 'Natchez historic building facade with ornate ironwork', score: 0.686, tags: ['downtown', 'iron-fence'], corridorNum: 300 },
  { src: '/images/library/corridor-1118.webp', alt: 'Row of Victorian cottages with porches and gardens on Natchez residential street', score: 0.685, tags: ['cottage', 'residential', 'garden'], corridorNum: 1118 },
  { src: '/images/library/corridor-1013.webp', alt: 'Natchez bluff mansion with hedgerow and river view in warm afternoon light', score: 0.685, tags: ['mansion', 'river', 'waterfront', 'garden'], corridorNum: 1013 },
  { src: '/images/library/corridor-1119.webp', alt: 'Natchez residential street with historic homes and Victorian cottages', score: 0.685, tags: ['cottage', 'residential', 'garden'], corridorNum: 1119 },
  { src: '/images/library/corridor-1109.webp', alt: 'Mississippi River bridge and bluff garden viewed from Natchez mansion lawn', score: 0.685, tags: ['river', 'waterfront', 'mansion', 'garden'], corridorNum: 1109 },
  { src: '/images/library/corridor-1190.webp', alt: 'Natchez bluff riverwalk with iron fence and Mississippi River bridge at sunset', score: 0.684, tags: ['river', 'waterfront', 'iron-fence'], corridorNum: 1190 },
  { src: '/images/library/corridor-0998.webp', alt: 'Smoot\'s Grocery roadside stand with weathered wood siding and ice machine', score: 0.684, tags: ['small-town', 'storefront'], corridorNum: 998 },
  { src: '/images/library/corridor-1083.webp', alt: 'Mississippi River bridge with iron railing walkway at Natchez bluff', score: 0.684, tags: ['river', 'waterfront', 'iron-fence'], corridorNum: 1083 },
  { src: '/images/library/corridor-1134.webp', alt: 'Natchez downtown main street with brick buildings and parked cars on sunny day', score: 0.684, tags: ['downtown', 'street', 'brick'], corridorNum: 1134 },
  { src: '/images/library/corridor-1096.webp', alt: 'Natchez bluff homes with manicured lawn and river walkway fence', score: 0.684, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1096 },
  { src: '/images/library/corridor-1064.webp', alt: 'Antique shop window with whimsical hand-painted junking sign on red wall', score: 0.682, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1064 },
  { src: '/images/library/corridor-1038.webp', alt: 'Natchez mansion grounds with iron fence and live oak shadows', score: 0.681, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1038 },
  { src: '/images/library/corridor-0997.webp', alt: 'Natchez bluff riverwalk with green lawn and parked trucks under trees', score: 0.681, tags: ['river', 'waterfront'], corridorNum: 997 },
  { src: '/images/library/corridor-0999.webp', alt: 'Mississippi River overlook with wide muddy waters from Natchez bluff', score: 0.679, tags: ['river', 'waterfront'], corridorNum: 999 },
  { src: '/images/library/corridor-1031.webp', alt: 'Natchez mansion with columns through canopy of live oaks', score: 0.678, tags: ['mansion', 'live-oak'], corridorNum: 1031 },
  { src: '/images/library/corridor-1081.webp', alt: 'Smoot\'s Grocery rustic roadside porch with colorful painted wood', score: 0.677, tags: ['small-town', 'storefront'], corridorNum: 1081 },
  { src: '/images/library/corridor-1199.webp', alt: 'Victorian mansion with columns and wraparound porch on Natchez hillside', score: 0.677, tags: ['mansion', 'residential'], corridorNum: 1199 },
  { src: '/images/library/corridor-1067.webp', alt: 'Natchez storefront with number 600 and awning in golden afternoon light', score: 0.677, tags: ['downtown', 'storefront'], corridorNum: 1067 },
  { src: '/images/library/corridor-1057.webp', alt: 'Corner storefront with columns and red door in historic downtown Natchez', score: 0.676, tags: ['downtown', 'storefront', 'brick'], corridorNum: 1057 },
  { src: '/images/library/corridor-1097.webp', alt: 'Natchez bluff homes looking down river path toward Mississippi bridge', score: 0.676, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1097 },
  { src: '/images/library/corridor-0987.webp', alt: 'Historic Natchez residential street with brick homes and arching trees', score: 0.676, tags: ['street', 'residential', 'brick'], corridorNum: 987 },
  { src: '/images/library/corridor-1004.webp', alt: 'Victorian B&B with brick fountain and iron fence in Natchez garden', score: 0.675, tags: ['b-and-b', 'iron-fence', 'brick', 'garden'], corridorNum: 1004 },
  { src: '/images/library/corridor-0990.webp', alt: 'Natchez bluff walkway with green lawn and Mississippi River in background', score: 0.674, tags: ['river', 'waterfront'], corridorNum: 990 },
  { src: '/images/library/corridor-1030.webp', alt: 'Live oak canopy shading Natchez residential street with historic homes', score: 0.673, tags: ['live-oak', 'street', 'residential'], corridorNum: 1030 },
  { src: '/images/library/corridor-1032.webp', alt: 'Natchez mansion grounds with mature live oaks and iron fence', score: 0.673, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1032 },
  { src: '/images/library/corridor-1065.webp', alt: 'Hand-painted antique shop window with junking sign in Natchez', score: 0.673, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1065 },
  { src: '/images/library/corridor-1016.webp', alt: 'Natchez mansion and garden viewed from bluff path with river in distance', score: 0.672, tags: ['mansion', 'river', 'waterfront', 'garden'], corridorNum: 1016 },
  { src: '/images/library/corridor-0654.webp', alt: 'Cottage under sprawling live oak with car in driveway', score: 0.671, tags: ['cottage', 'live-oak', 'residential'], corridorNum: 654 },
  { src: '/images/library/corridor-1197.webp', alt: 'Small-town roadside brick building with red doors and tower in background', score: 0.671, tags: ['small-town', 'storefront', 'brick'], corridorNum: 1197 },
  { src: '/images/library/corridor-1024.webp', alt: 'Natchez bluff mansion with wraparound porch overlooking river', score: 0.670, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1024 },
  { src: '/images/library/corridor-0979.webp', alt: 'Natchez residential street with live oaks and azaleas in afternoon sun', score: 0.670, tags: ['street', 'residential', 'live-oak', 'azalea'], corridorNum: 979 },
  { src: '/images/library/corridor-1108.webp', alt: 'Natchez bluff mansion with river view and warm autumn tones', score: 0.670, tags: ['mansion', 'river', 'waterfront'], corridorNum: 1108 },
  { src: '/images/library/corridor-1113.webp', alt: 'Natchez residential street with live oaks and long shadows in warm sepia tones', score: 0.669, tags: ['street', 'residential', 'live-oak'], corridorNum: 1113 },
  { src: '/images/library/corridor-1184.webp', alt: 'Lady V\'s Fashion Boutique storefront in small-town Mississippi', score: 0.667, tags: ['small-town', 'storefront', 'sign'], corridorNum: 1184 },
  { src: '/images/library/corridor-0954.webp', alt: 'Teal shrimp boat at Ocean Springs marina dock', score: 0.667, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 954 },
  { src: '/images/library/corridor-1029.webp', alt: 'Natchez mansion with iron balcony and live oak canopy', score: 0.666, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1029 },
  { src: '/images/library/corridor-1103.webp', alt: 'Victorian B&B with wraparound porch and ornate trim in Natchez', score: 0.665, tags: ['b-and-b', 'brick', 'iron-fence'], corridorNum: 1103 },
  { src: '/images/library/corridor-1147.webp', alt: 'Guests chatting in eclectic antique-filled hallway at Natchez house party', score: 0.664, tags: ['nightlife', 'b-and-b'], corridorNum: 1147 },
  { src: '/images/library/corridor-0985.webp', alt: 'Natchez residential street with live oaks and historic homes at sunset', score: 0.664, tags: ['street', 'residential', 'live-oak'], corridorNum: 985 },
  { src: '/images/library/corridor-1011.webp', alt: 'Natchez bluff houses and green lawns with river bridge on horizon', score: 0.663, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1011 },
  { src: '/images/library/corridor-1066.webp', alt: 'Guitarist performing under chandelier in warm-lit Natchez parlor', score: 0.662, tags: ['live-music', 'nightlife'], corridorNum: 1066 },
  { src: '/images/library/corridor-1026.webp', alt: 'Natchez mansion with live oaks and spring foliage from sidewalk', score: 0.660, tags: ['mansion', 'live-oak', 'residential'], corridorNum: 1026 },
  { src: '/images/library/corridor-1105.webp', alt: 'Faded grand mansion portico with tall columns in black and white', score: 0.660, tags: ['mansion', 'residential'], corridorNum: 1105 },
  { src: '/images/library/corridor-0973.webp', alt: 'Ocean Springs neighborhood with live oaks and spring blooming azaleas', score: 0.659, tags: ['live-oak', 'azalea', 'residential'], corridorNum: 973 },
  { src: '/images/library/corridor-0983.webp', alt: 'Natchez residential street with historic homes and brick sidewalks', score: 0.659, tags: ['street', 'residential', 'brick'], corridorNum: 983 },
  { src: '/images/library/corridor-0984.webp', alt: 'Quiet Natchez street with mature trees and dappled afternoon light', score: 0.658, tags: ['street', 'residential'], corridorNum: 984 },
  { src: '/images/library/corridor-1198.webp', alt: 'Small-town Mississippi roadside building in dramatic black and white', score: 0.657, tags: ['small-town', 'storefront'], corridorNum: 1198 },
  { src: '/images/library/corridor-1039.webp', alt: 'Natchez mansion lawn with iron fence and live oaks in spring', score: 0.656, tags: ['mansion', 'live-oak', 'iron-fence', 'garden'], corridorNum: 1039 },
  { src: '/images/library/corridor-0645.webp', alt: 'Southern B&B with wide porch and black shutters', score: 0.655, tags: ['b-and-b', 'cottage'], corridorNum: 645 },
  { src: '/images/library/corridor-0974.webp', alt: 'Ocean Springs side street with cottages and spring foliage', score: 0.655, tags: ['cottage', 'residential', 'street'], corridorNum: 974 },
  { src: '/images/library/corridor-0975.webp', alt: 'Ocean Springs residential lane under canopy of live oaks', score: 0.655, tags: ['live-oak', 'residential', 'street'], corridorNum: 975 },
  { src: '/images/library/corridor-0976.webp', alt: 'Ocean Springs neighborhood with spreading oaks and brick walkways', score: 0.655, tags: ['live-oak', 'residential', 'brick'], corridorNum: 976 },
  { src: '/images/library/corridor-1022.webp', alt: 'White Victorian mansion on Natchez hillside with purple sky', score: 0.653, tags: ['mansion', 'residential'], corridorNum: 1022 },
  { src: '/images/library/corridor-1049.webp', alt: 'Natchez antebellum mansion with live oaks and iron gate', score: 0.653, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1049 },
  { src: '/images/library/corridor-1074.webp', alt: 'Bright magenta azaleas cascading over brick retaining wall in Natchez', score: 0.653, tags: ['azalea', 'brick', 'garden'], corridorNum: 1074 },
  { src: '/images/library/corridor-0495.webp', alt: 'Columned mansion through canopy of live oaks with iron gate', score: 0.652, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 495 },
  { src: '/images/library/corridor-1037.webp', alt: 'Natchez mansion with columned porch and live oak in foreground', score: 0.652, tags: ['mansion', 'live-oak'], corridorNum: 1037 },
  { src: '/images/library/corridor-1182.webp', alt: 'Liberty Drug Store with Rexall signs on small-town Mississippi corner', score: 0.649, tags: ['small-town', 'storefront', 'sign'], corridorNum: 1182 },
  { src: '/images/library/corridor-1020.webp', alt: 'Natchez historic home with columned porch and live oak shade', score: 0.649, tags: ['mansion', 'live-oak', 'residential'], corridorNum: 1020 },
  { src: '/images/library/corridor-1073.webp', alt: 'White antebellum mansion with iron fence and live oaks in Natchez', score: 0.649, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1073 },
  { src: '/images/library/corridor-1116.webp', alt: 'Natchez residential street with live oaks and vintage vignette toning', score: 0.647, tags: ['street', 'residential', 'live-oak'], corridorNum: 1116 },
  { src: '/images/library/corridor-1000.webp', alt: 'Natchez riverwalk path along Mississippi River with bridge on horizon', score: 0.645, tags: ['river', 'waterfront'], corridorNum: 1000 },
  { src: '/images/library/corridor-0614.webp', alt: 'White mansion on hillside with manicured grounds', score: 0.645, tags: ['mansion', 'garden'], corridorNum: 614 },
  { src: '/images/library/corridor-0673.webp', alt: 'Azalea garden with live oaks framing Natchez mansion', score: 0.644, tags: ['azalea', 'mansion', 'garden', 'live-oak'], corridorNum: 673 },
  { src: '/images/library/corridor-1014.webp', alt: 'Natchez bluff lawn with hedgerows and river view', score: 0.645, tags: ['river', 'waterfront', 'garden'], corridorNum: 1014 },
  { src: '/images/library/corridor-1061.webp', alt: 'Marie\'s Beauty Salon vintage window sign in downtown Natchez', score: 0.645, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1061 },
  { src: '/images/library/corridor-1194.webp', alt: 'Small-town Mississippi main street with barber shop and water tower', score: 0.644, tags: ['small-town', 'storefront'], corridorNum: 1194 },
  { src: '/images/library/corridor-0986.webp', alt: 'Natchez residential lane with live oaks and dappled sunlight', score: 0.644, tags: ['street', 'residential', 'live-oak'], corridorNum: 986 },
  { src: '/images/library/corridor-1133.webp', alt: 'Natchez downtown main street with trees, brick buildings, and parked vehicles', score: 0.642, tags: ['downtown', 'street', 'brick'], corridorNum: 1133 },
  { src: '/images/library/corridor-0627.webp', alt: 'Antebellum mansion with live oaks and horse-drawn carriage', score: 0.641, tags: ['mansion', 'carriage', 'live-oak'], corridorNum: 627 },
  { src: '/images/library/corridor-0631.webp', alt: 'White columned mansion close-up with balcony and shutters', score: 0.640, tags: ['mansion', 'iron-fence'], corridorNum: 631 },
  { src: '/images/library/corridor-1112.webp', alt: 'Natchez residential street with live oaks casting long shadows in warm tones', score: 0.640, tags: ['street', 'residential', 'live-oak'], corridorNum: 1112 },
  { src: '/images/library/corridor-0611.webp', alt: 'Tree-lined Natchez residential street with live oaks', score: 0.639, tags: ['street', 'live-oak', 'residential'], corridorNum: 611 },
  { src: '/images/library/corridor-1125.webp', alt: 'Blue Victorian mansion with columned porch and warm evening light', score: 0.639, tags: ['mansion', 'residential'], corridorNum: 1125 },
  { src: '/images/library/corridor-1110.webp', alt: 'Natchez mansion with green lawn and river view at sunset', score: 0.639, tags: ['mansion', 'river', 'waterfront'], corridorNum: 1110 },
  { src: '/images/library/corridor-0494.webp', alt: 'Antebellum mansion with columns seen through oak canopy', score: 0.638, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 494 },
  { src: '/images/library/corridor-0295.webp', alt: 'Historic two-story building in downtown Natchez', score: 0.637, tags: ['downtown', 'brick'], corridorNum: 295 },
  { src: '/images/library/corridor-1191.webp', alt: 'Liberty Drug Store corner with vintage Rexall signs and blue awning', score: 0.637, tags: ['small-town', 'storefront', 'sign'], corridorNum: 1191 },
  { src: '/images/library/corridor-1028.webp', alt: 'Natchez mansion with columned porch and iron fence from sidewalk', score: 0.637, tags: ['mansion', 'iron-fence', 'residential'], corridorNum: 1028 },
  { src: '/images/library/corridor-1079.webp', alt: 'Natchez residential street with live oaks, azaleas, and brick walls', score: 0.637, tags: ['street', 'residential', 'live-oak', 'azalea'], corridorNum: 1079 },
  { src: '/images/library/corridor-0629.webp', alt: 'Mansion grounds with live oaks and wrought iron fence', score: 0.636, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 629 },
  { src: '/images/library/corridor-0978.webp', alt: 'Historic Natchez brick building with ornate ironwork and spring trees', score: 0.636, tags: ['downtown', 'brick', 'iron-fence'], corridorNum: 978 },
  { src: '/images/library/corridor-1192.webp', alt: 'Liberty Baptist Church with dome and sepia sky', score: 0.635, tags: ['church', 'small-town', 'brick'], corridorNum: 1192 },
  { src: '/images/library/corridor-0471.webp', alt: 'Downtown sidewalk with green awning and brick walkway', score: 0.634, tags: ['downtown', 'storefront', 'brick'], corridorNum: 471 },
  { src: '/images/library/corridor-1123.webp', alt: 'Blue Victorian mansion porch detail with columns at dusk', score: 0.634, tags: ['mansion', 'residential'], corridorNum: 1123 },
  { src: '/images/library/corridor-0491.webp', alt: 'Mansion framed by massive live oaks with iron fence', score: 0.633, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 491 },
  { src: '/images/library/corridor-1012.webp', alt: 'Natchez bluff mansion and river path on sunny afternoon', score: 0.633, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1012 },
  { src: '/images/library/corridor-0591.webp', alt: 'Quiet Natchez street with arching trees and dappled light', score: 0.632, tags: ['street', 'residential'], corridorNum: 591 },
  { src: '/images/library/corridor-0952.webp', alt: 'Shrimp boat with nets and rigging at Ocean Springs harbor', score: 0.632, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 952 },
  { src: '/images/library/corridor-1144.webp', alt: 'Guests gathered around outdoor fire pit on warm evening in Ocean Springs', score: 0.631, tags: ['nightlife'], corridorNum: 1144 },
  { src: '/images/library/corridor-1036.webp', alt: 'White mansion columns and portico under live oak branches in Natchez', score: 0.630, tags: ['mansion', 'live-oak'], corridorNum: 1036 },
  { src: '/images/library/corridor-0991.webp', alt: 'Natchez bluff overlook with walking path and river views', score: 0.629, tags: ['river', 'waterfront'], corridorNum: 991 },
  { src: '/images/library/corridor-0342.webp', alt: 'Historic Natchez storefront with striped awning', score: 0.628, tags: ['downtown', 'storefront'], corridorNum: 342 },
  { src: '/images/library/corridor-0656.webp', alt: 'Live oak branches framing coastal cottage', score: 0.628, tags: ['live-oak', 'cottage'], corridorNum: 656 },
  { src: '/images/library/corridor-1117.webp', alt: 'Natchez residential lane with live oaks and golden afternoon light', score: 0.626, tags: ['street', 'residential', 'live-oak'], corridorNum: 1117 },
  { src: '/images/library/corridor-1090.webp', alt: 'Weathered Victorian cottage with iron fence in Natchez', score: 0.626, tags: ['cottage', 'iron-fence', 'residential'], corridorNum: 1090 },
  { src: '/images/library/corridor-1077.webp', alt: 'Live oak canopy over Ocean Springs residential street with azaleas', score: 0.626, tags: ['live-oak', 'street', 'residential', 'azalea'], corridorNum: 1077 },
  { src: '/images/library/corridor-0970.webp', alt: 'Weathered shrimp boat rigging against blue sky', score: 0.625, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 970 },
  { src: '/images/library/corridor-0953.webp', alt: 'Shrimp boat "My Son" docked at Ocean Springs pier', score: 0.624, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 953 },
  { src: '/images/library/corridor-0621.webp', alt: 'Wide residential street with bare winter trees in Natchez', score: 0.623, tags: ['street', 'residential'], corridorNum: 621 },
  { src: '/images/library/corridor-0341.webp', alt: 'Historic Natchez building with striped awning', score: 0.622, tags: ['downtown', 'storefront'], corridorNum: 341 },
  { src: '/images/library/corridor-1025.webp', alt: 'Natchez bluff home with columns and river in background', score: 0.622, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1025 },
  { src: '/images/library/corridor-0967.webp', alt: 'Blue shrimp boat "Miss Lily" at Ocean Springs dock', score: 0.622, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 967 },
  { src: '/images/library/corridor-0414.webp', alt: 'Downtown Natchez street with brick buildings and parked cars', score: 0.622, tags: ['downtown', 'street', 'brick'], corridorNum: 414 },
  { src: '/images/library/corridor-1019.webp', alt: 'Natchez bluff homes and lawns along river path', score: 0.621, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1019 },
  { src: '/images/library/corridor-0641.webp', alt: 'Southern cottage with porch and climbing vines', score: 0.620, tags: ['cottage', 'garden', 'residential'], corridorNum: 641 },
  { src: '/images/library/corridor-0431.webp', alt: 'Natchez barbershop with hanging sign on brick street', score: 0.620, tags: ['downtown', 'storefront', 'brick'], corridorNum: 431 },
  { src: '/images/library/corridor-0316.webp', alt: 'Natchez downtown corner building with columns', score: 0.619, tags: ['downtown', 'brick'], corridorNum: 316 },
  { src: '/images/library/corridor-0320.webp', alt: 'Historic Natchez streetscape in afternoon light', score: 0.617, tags: ['downtown', 'street'], corridorNum: 320 },
  { src: '/images/library/corridor-1040.webp', alt: 'Natchez mansion with live oak and iron fence in soft afternoon light', score: 0.617, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1040 },
  { src: '/images/library/corridor-0992.webp', alt: 'Natchez bluff park with pathway and Mississippi River vista', score: 0.616, tags: ['river', 'waterfront'], corridorNum: 992 },
  { src: '/images/library/corridor-0470.webp', alt: 'Downtown storefront with black awning and string lights', score: 0.616, tags: ['downtown', 'storefront'], corridorNum: 470 },
  { src: '/images/library/corridor-1145.webp', alt: 'Outdoor fire pit with cushioned seating at Ocean Springs gathering', score: 0.615, tags: ['nightlife'], corridorNum: 1145 },
  { src: '/images/library/corridor-0340.webp', alt: 'Natchez downtown with green awning over brick walk', score: 0.612, tags: ['downtown', 'storefront', 'brick'], corridorNum: 340 },
  { src: '/images/library/corridor-0972.webp', alt: 'Ocean Springs residential street with live oaks and spring greenery', score: 0.611, tags: ['live-oak', 'residential', 'street'], corridorNum: 972 },
  { src: '/images/library/corridor-1146.webp', alt: 'Guests socializing around fire pit under string lights at Ocean Springs patio', score: 0.611, tags: ['nightlife'], corridorNum: 1146 },
  { src: '/images/library/corridor-0969.webp', alt: 'Shrimp boat masts and rigging at golden hour', score: 0.611, tags: ['shrimp-boat', 'marina', 'waterfront'], corridorNum: 969 },
  { src: '/images/library/corridor-0988.webp', alt: 'Natchez residential lane with arching trees and brick homes', score: 0.611, tags: ['street', 'residential', 'brick'], corridorNum: 988 },
  { src: '/images/library/corridor-0651.webp', alt: 'Historic home with columned porch in Natchez', score: 0.610, tags: ['cottage', 'residential'], corridorNum: 651 },
  { src: '/images/library/corridor-1078.webp', alt: 'Historic Natchez brick building with white fence and spring crepe myrtles', score: 0.610, tags: ['residential', 'brick'], corridorNum: 1078 },
  { src: '/images/library/corridor-0612.webp', alt: 'Natchez neighborhood with mansions and live oaks', score: 0.608, tags: ['street', 'residential', 'mansion'], corridorNum: 612 },
  { src: '/images/library/corridor-0661.webp', alt: 'Spanish moss and live oaks along Ocean Springs road', score: 0.607, tags: ['live-oak', 'residential'], corridorNum: 661 },
  { src: '/images/library/corridor-1101.webp', alt: 'Grand Natchez mansion with columns under restoration in infrared pink-green tones', score: 0.607, tags: ['mansion', 'residential'], corridorNum: 1101 },
  { src: '/images/library/corridor-0594.webp', alt: 'Natchez street with spring foliage and historic homes', score: 0.606, tags: ['street', 'residential'], corridorNum: 594 },
  { src: '/images/library/corridor-1003.webp', alt: 'Natchez bluff mansion with column detail and river pathway', score: 0.606, tags: ['mansion', 'river', 'waterfront'], corridorNum: 1003 },
  { src: '/images/library/corridor-1080.webp', alt: 'Natchez residential street with live oaks and cottages', score: 0.606, tags: ['street', 'residential', 'live-oak', 'cottage'], corridorNum: 1080 },
  { src: '/images/library/corridor-0600.webp', alt: 'White cottage with green lawn on quiet Natchez street', score: 0.605, tags: ['cottage', 'residential'], corridorNum: 600 },
  { src: '/images/library/corridor-0305.webp', alt: 'Downtown Natchez brick building with awning', score: 0.604, tags: ['downtown', 'storefront', 'brick'], corridorNum: 305 },
  { src: '/images/library/corridor-0292.webp', alt: 'Natchez Under-the-Hill district architecture', score: 0.604, tags: ['downtown', 'brick'], corridorNum: 292 },
  { src: '/images/library/corridor-0430.webp', alt: 'Downtown Natchez with spring trees and brick facades', score: 0.603, tags: ['downtown', 'street', 'brick'], corridorNum: 430 },
  { src: '/images/library/corridor-1053.webp', alt: 'Clarinet player performing at Natchez art-filled parlor venue', score: 0.602, tags: ['live-music', 'nightlife', 'art'], corridorNum: 1053 },
  { src: '/images/library/corridor-1104.webp', alt: 'Fading Natchez mansion portico with Corinthian columns and peeling paint', score: 0.602, tags: ['mansion', 'residential'], corridorNum: 1104 },
  { src: '/images/library/corridor-0304.webp', alt: 'Natchez main street architecture with columns', score: 0.601, tags: ['downtown', 'brick'], corridorNum: 304 },
  { src: '/images/library/corridor-1122.webp', alt: 'Grand white Victorian mansion with wraparound porch on Natchez hill', score: 0.601, tags: ['mansion', 'residential'], corridorNum: 1122 },
  { src: '/images/library/corridor-1129.webp', alt: 'Lower Lodge Antiques hanging sign on downtown Natchez sidewalk in black and white', score: 0.600, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1129 },
  { src: '/images/library/corridor-1180.webp', alt: 'Natchez bluff homes and Mississippi River path at golden hour', score: 0.600, tags: ['river', 'waterfront', 'residential'], corridorNum: 1180 },
  { src: '/images/library/corridor-1114.webp', alt: 'Natchez residential street with oaks and long shadows in black and white', score: 0.600, tags: ['street', 'residential', 'live-oak'], corridorNum: 1114 },
  { src: '/images/library/corridor-1001.webp', alt: 'Natchez bluff walkway overlooking wide Mississippi River waters', score: 0.599, tags: ['river', 'waterfront'], corridorNum: 1001 },
  { src: '/images/library/corridor-0982.webp', alt: 'Natchez residential intersection with live oaks and spring sunlight', score: 0.598, tags: ['street', 'residential', 'live-oak'], corridorNum: 982 },
  { src: '/images/library/corridor-1027.webp', alt: 'Natchez mansion with columned porch and residential street trees', score: 0.593, tags: ['mansion', 'residential'], corridorNum: 1027 },
  { src: '/images/library/corridor-1107.webp', alt: 'Natchez bluff lawn and river view in moody warm tones', score: 0.588, tags: ['river', 'waterfront'], corridorNum: 1107 },
  { src: '/images/library/corridor-0980.webp', alt: 'Natchez side street with live oaks and residential homes', score: 0.587, tags: ['street', 'residential', 'live-oak'], corridorNum: 980 },
  { src: '/images/library/corridor-1017.webp', alt: 'Natchez B&B courtyard with iron work and brick detailing', score: 0.586, tags: ['b-and-b', 'iron-fence', 'brick'], corridorNum: 1017 },
  { src: '/images/library/corridor-0502.webp', alt: 'Small cottage with pink azaleas and brick retaining wall', score: 0.585, tags: ['azalea', 'cottage', 'brick'], corridorNum: 502 },
  { src: '/images/library/corridor-1054.webp', alt: 'Moody black-and-white close-up of guitarist\'s hands on fretboard', score: 0.583, tags: ['live-music'], corridorNum: 1054 },
  { src: '/images/library/corridor-0993.webp', alt: 'Natchez bluff park with river views and walking paths', score: 0.583, tags: ['river', 'waterfront'], corridorNum: 993 },
  { src: '/images/library/corridor-0995.webp', alt: 'Mississippi River vista from Natchez bluff with distant shoreline', score: 0.583, tags: ['river', 'waterfront'], corridorNum: 995 },
  { src: '/images/library/corridor-1071.webp', alt: 'Cotton bolls and welcome sign at Natchez storefront doorway', score: 0.582, tags: ['downtown', 'storefront'], corridorNum: 1071 },
  { src: '/images/library/corridor-1111.webp', alt: 'Natchez residential street with oaks and afternoon shadows', score: 0.582, tags: ['street', 'residential', 'live-oak'], corridorNum: 1111 },
  { src: '/images/library/corridor-1060.webp', alt: 'Marie\'s Beauty Salon neon-green sign in downtown Natchez window', score: 0.581, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1060 },
  { src: '/images/library/corridor-1178.webp', alt: 'Kitesurfer on white Gulf Coast beach with bright kite against blue sky', score: 0.581, tags: ['beach', 'waterfront'], corridorNum: 1178 },
  { src: '/images/library/corridor-1120.webp', alt: 'Weathered shotgun cottage with porch in black and white, Natchez', score: 0.580, tags: ['cottage', 'residential'], corridorNum: 1120 },
  { src: '/images/library/corridor-1076.webp', alt: 'Massive live oak canopy with spreading branches over Ocean Springs neighborhood', score: 0.579, tags: ['live-oak', 'residential'], corridorNum: 1076 },
  { src: '/images/library/corridor-1082.webp', alt: 'Mississippi River bluff walkway with fence and bridge view at Natchez', score: 0.579, tags: ['river', 'waterfront', 'iron-fence'], corridorNum: 1082 },
  { src: '/images/library/corridor-0505.webp', alt: 'Cottage with azaleas and live oaks on Natchez hillside', score: 0.576, tags: ['azalea', 'cottage', 'live-oak'], corridorNum: 505 },
  { src: '/images/library/corridor-1023.webp', alt: 'Natchez Victorian home with porch and spring landscaping', score: 0.576, tags: ['cottage', 'residential', 'garden'], corridorNum: 1023 },
  { src: '/images/library/corridor-0490.webp', alt: 'Grand white mansion with columns and ornate iron gate', score: 0.575, tags: ['mansion', 'iron-fence'], corridorNum: 490 },
  { src: '/images/library/corridor-1124.webp', alt: 'Victorian mansion porch with columns and topiaries in black and white', score: 0.575, tags: ['mansion', 'residential'], corridorNum: 1124 },
  { src: '/images/library/corridor-1131.webp', alt: 'Natchez Olive Market and Balsamic shop on downtown sidewalk with olive tree', score: 0.573, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1131 },
  { src: '/images/library/corridor-1128.webp', alt: 'Cigars shop sign and downtown Natchez sidewalk in black and white', score: 0.573, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1128 },
  { src: '/images/library/corridor-1047.webp', alt: 'Bass player with checkered strap under chandelier at Natchez parlor gig', score: 0.570, tags: ['live-music', 'nightlife'], corridorNum: 1047 },
  { src: '/images/library/corridor-1041.webp', alt: 'Live band with piano, guitar, and bass in chandelier-lit Natchez parlor', score: 0.570, tags: ['live-music', 'nightlife'], corridorNum: 1041 },
  { src: '/images/library/corridor-1115.webp', alt: 'Natchez residential street with oaks and heavy shadows in high-contrast black and white', score: 0.568, tags: ['street', 'residential', 'live-oak'], corridorNum: 1115 },
  { src: '/images/library/corridor-1132.webp', alt: 'Natchez Olive Market storefront with balsamics and olive tree', score: 0.568, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1132 },
  { src: '/images/library/corridor-1034.webp', alt: 'Natchez mansion with iron fence and spreading live oak', score: 0.566, tags: ['mansion', 'live-oak', 'iron-fence'], corridorNum: 1034 },
  { src: '/images/library/corridor-1142.webp', alt: 'Vintage Realistic turntable with vinyl record spinning', score: 0.563, tags: ['record-shop'], corridorNum: 1142 },
  { src: '/images/library/corridor-1015.webp', alt: 'Natchez bluff mansion and garden with river views', score: 0.563, tags: ['mansion', 'river', 'waterfront', 'garden'], corridorNum: 1015 },
  { src: '/images/library/corridor-1044.webp', alt: 'Pianist singing at Kawai piano in warm-lit Natchez B&B parlor', score: 0.562, tags: ['live-music', 'nightlife'], corridorNum: 1044 },
  { src: '/images/library/corridor-0996.webp', alt: 'Natchez bluff area with river path and spring trees', score: 0.560, tags: ['river', 'waterfront'], corridorNum: 996 },
  { src: '/images/library/corridor-1021.webp', alt: 'Natchez mansion with wraparound porch and spring foliage', score: 0.558, tags: ['mansion', 'residential'], corridorNum: 1021 },
  { src: '/images/library/corridor-0994.webp', alt: 'Mississippi River curve viewed from Natchez bluff overlook', score: 0.553, tags: ['river', 'waterfront'], corridorNum: 994 },
  { src: '/images/library/corridor-1186.webp', alt: 'Photography studio and children\'s boutique banner in small-town Mississippi', score: 0.552, tags: ['small-town', 'sign'], corridorNum: 1186 },
  { src: '/images/library/corridor-1136.webp', alt: 'Fresh flower bouquets in cooler case at Natchez florist shop', score: 0.550, tags: ['downtown', 'storefront'], corridorNum: 1136 },
  { src: '/images/library/corridor-1048.webp', alt: 'Close-up of bass player\'s hands on strings at Natchez parlor gig', score: 0.547, tags: ['live-music', 'nightlife'], corridorNum: 1048 },
  { src: '/images/library/corridor-1170.webp', alt: 'White sand Gulf Coast beach with kitesurfers and blue sky', score: 0.541, tags: ['beach', 'waterfront'], corridorNum: 1170 },
  { src: '/images/library/corridor-1169.webp', alt: 'Kitesurfer on Ocean Springs beach with big sky and dramatic clouds', score: 0.540, tags: ['beach', 'waterfront'], corridorNum: 1169 },
  { src: '/images/library/corridor-1002.webp', alt: 'Natchez bluff trail with river overlook and sparse winter trees', score: 0.537, tags: ['river', 'waterfront'], corridorNum: 1002 },
  { src: '/images/library/corridor-1172.webp', alt: 'Kitesurfer launching colorful kite on white Gulf Coast sand', score: 0.536, tags: ['beach', 'waterfront'], corridorNum: 1172 },
  { src: '/images/library/corridor-1092.webp', alt: 'Pianist singing into microphone at Kawai piano in intimate Natchez venue', score: 0.523, tags: ['live-music', 'nightlife'], corridorNum: 1092 },
  { src: '/images/library/corridor-1010.webp', alt: 'Natchez bluff mansion portico and lawn with river views', score: 0.523, tags: ['mansion', 'river', 'waterfront'], corridorNum: 1010 },
  { src: '/images/library/corridor-1177.webp', alt: 'Gulf Coast shoreline with kite overhead and gentle waves', score: 0.522, tags: ['beach', 'waterfront'], corridorNum: 1177 },
  { src: '/images/library/corridor-1176.webp', alt: 'Two figures on Gulf Coast beach with kite in blue sky', score: 0.513, tags: ['beach', 'waterfront'], corridorNum: 1176 },
  { src: '/images/library/corridor-1179.webp', alt: 'Kite soaring over Gulf Coast waters from white sand beach', score: 0.510, tags: ['beach', 'waterfront'], corridorNum: 1179 },
  { src: '/images/library/corridor-1086.webp', alt: 'Natchez bluff park with green lawn, parked trucks, and river fence', score: 0.509, tags: ['river', 'waterfront'], corridorNum: 1086 },
  { src: '/images/library/corridor-1042.webp', alt: 'Blurred pianist and musicians in warm bokeh at Natchez parlor session', score: 0.509, tags: ['live-music', 'nightlife'], corridorNum: 1042 },
  { src: '/images/library/corridor-0989.webp', alt: 'Natchez residential intersection with winter trees and brick homes', score: 0.508, tags: ['street', 'residential', 'brick'], corridorNum: 989 },
  { src: '/images/library/corridor-1168.webp', alt: 'Fried seafood platter with cocktail shrimp at Southern dinner gathering', score: 0.508, tags: ['food', 'nightlife'], corridorNum: 1168 },
  { src: '/images/library/corridor-1008.webp', alt: 'Natchez bluff mansion and tree-lined river pathway', score: 0.499, tags: ['mansion', 'river', 'waterfront'], corridorNum: 1008 },
  { src: '/images/library/corridor-1068.webp', alt: 'Smiling drummer playing Pearl kit at Natchez parlor gig in black and white', score: 0.498, tags: ['live-music', 'nightlife'], corridorNum: 1068 },
  { src: '/images/library/corridor-1009.webp', alt: 'Natchez bluff homes with river path in warm afternoon light', score: 0.494, tags: ['mansion', 'river', 'waterfront', 'residential'], corridorNum: 1009 },
  { src: '/images/library/corridor-1062.webp', alt: 'Guitarist picking tune under chandeliers in Natchez parlor venue', score: 0.493, tags: ['live-music', 'nightlife'], corridorNum: 1062 },
  { src: '/images/library/corridor-1070.webp', alt: 'Drummer smiling behind Pearl kit at warm-toned Natchez gig', score: 0.490, tags: ['live-music', 'nightlife'], corridorNum: 1070 },
  { src: '/images/library/corridor-1075.webp', alt: 'Natchez mansion with iron fence and bluff view of Mississippi River', score: 0.485, tags: ['mansion', 'iron-fence', 'river', 'waterfront'], corridorNum: 1075 },
  { src: '/images/library/corridor-1141.webp', alt: 'Leather-seated golf cart parked on Ocean Springs downtown street at night', score: 0.484, tags: ['downtown', 'nightlife'], corridorNum: 1141 },
  { src: '/images/library/corridor-1164.webp', alt: 'Guests at evening gathering with warm lighting and phones in hand', score: 0.480, tags: ['nightlife'], corridorNum: 1164 },
  { src: '/images/library/corridor-1135.webp', alt: 'Vintage vinyl record close-up with price tags at Natchez record shop', score: 0.479, tags: ['record-shop', 'downtown'], corridorNum: 1135 },
  { src: '/images/library/corridor-1167.webp', alt: 'Champagne bottle chilling in silver ice bucket at dinner party', score: 0.479, tags: ['food', 'nightlife'], corridorNum: 1167 },
  { src: '/images/library/corridor-1165.webp', alt: 'Tomato and basil bruschetta on silver platter at Southern gathering', score: 0.477, tags: ['food', 'nightlife'], corridorNum: 1165 },
  { src: '/images/library/corridor-1161.webp', alt: 'Pinwheel tortilla wraps on silver serving tray at Natchez dinner party', score: 0.469, tags: ['food', 'nightlife'], corridorNum: 1161 },
  { src: '/images/library/corridor-1138.webp', alt: 'Vinyl record sleeves in close-up bokeh at Natchez record shop', score: 0.465, tags: ['record-shop', 'downtown'], corridorNum: 1138 },
  { src: '/images/library/corridor-1154.webp', alt: 'Artisan chocolate sign in warm bokeh at Natchez candy shop', score: 0.464, tags: ['downtown', 'storefront', 'sign'], corridorNum: 1154 },
  { src: '/images/library/corridor-1163.webp', alt: 'Guests mingling with drinks at warm evening gathering', score: 0.463, tags: ['nightlife'], corridorNum: 1163 },
  { src: '/images/library/corridor-1139.webp', alt: 'Vinyl records with price stickers in shallow depth of field', score: 0.462, tags: ['record-shop', 'downtown'], corridorNum: 1139 },
  { src: '/images/library/corridor-1106.webp', alt: 'Pianist singing at Kawai grand piano in Natchez parlor venue', score: 0.461, tags: ['live-music', 'nightlife'], corridorNum: 1106 },
  { src: '/images/library/corridor-0971.webp', alt: 'Ocean Springs neighborhood with cottages and spring foliage', score: 0.457, tags: ['cottage', 'residential'], corridorNum: 971 },
  { src: '/images/library/corridor-1153.webp', alt: 'Guests socializing at bar with warm lighting at Natchez gathering', score: 0.456, tags: ['nightlife'], corridorNum: 1153 },
  { src: '/images/library/corridor-1155.webp', alt: 'Guests with cocktails at warm-lit Natchez evening event', score: 0.454, tags: ['nightlife'], corridorNum: 1155 },
  { src: '/images/library/corridor-1156.webp', alt: 'Guests chatting at intimate Natchez house party gathering', score: 0.453, tags: ['nightlife'], corridorNum: 1156 },
  { src: '/images/library/corridor-1160.webp', alt: 'Southern gathering with guests and warm indoor lighting', score: 0.451, tags: ['nightlife'], corridorNum: 1160 },
  { src: '/images/library/corridor-1159.webp', alt: 'Guests at Natchez evening event in warm parlor light', score: 0.449, tags: ['nightlife'], corridorNum: 1159 },
  { src: '/images/library/corridor-1152.webp', alt: 'Guests mingling at warm-lit evening social in Natchez', score: 0.448, tags: ['nightlife'], corridorNum: 1152 },
  { src: '/images/library/corridor-1166.webp', alt: 'Guests with phones and cocktails at Southern evening gathering', score: 0.447, tags: ['nightlife'], corridorNum: 1166 },
  { src: '/images/library/corridor-1158.webp', alt: 'Guests socializing at Natchez parlor gathering with warm lighting', score: 0.443, tags: ['nightlife'], corridorNum: 1158 },
  { src: '/images/library/corridor-1151.webp', alt: 'Guests chatting in warm-lit room at Natchez social event', score: 0.443, tags: ['nightlife'], corridorNum: 1151 },
  { src: '/images/library/corridor-1157.webp', alt: 'Evening social gathering with cocktails at Southern home', score: 0.439, tags: ['nightlife'], corridorNum: 1157 },
  { src: '/images/library/corridor-1174.webp', alt: 'Gulf Coast beach scene with kitesurfers and big sky', score: 0.439, tags: ['beach', 'waterfront'], corridorNum: 1174 },
  { src: '/images/library/corridor-1143.webp', alt: 'Vinyl records on wooden shelf at Natchez record shop', score: 0.439, tags: ['record-shop', 'downtown'], corridorNum: 1143 },
  { src: '/images/library/corridor-1189.webp', alt: 'Kite soaring over Gulf Coast water with waves below', score: 0.438, tags: ['beach', 'waterfront'], corridorNum: 1189 },
  { src: '/images/library/corridor-1130.webp', alt: 'Blurred chocolate sign with warm bokeh at Natchez confectionery', score: 0.437, tags: ['downtown', 'storefront'], corridorNum: 1130 },
  { src: '/images/library/corridor-1162.webp', alt: 'Guests gathered at Southern dinner party with warm ambient light', score: 0.435, tags: ['nightlife'], corridorNum: 1162 },
  { src: '/images/library/corridor-1046.webp', alt: 'Black-and-white close-up of guitarist tuning at Natchez parlor session', score: 0.434, tags: ['live-music'], corridorNum: 1046 },
  { src: '/images/library/corridor-1150.webp', alt: 'Guests socializing at Natchez home gathering in evening light', score: 0.433, tags: ['nightlife'], corridorNum: 1150 },
  { src: '/images/library/corridor-1121.webp', alt: 'Natchez Victorian cottage detail with porch and yard', score: 0.433, tags: ['cottage', 'residential'], corridorNum: 1121 },
  { src: '/images/library/corridor-1072.webp', alt: 'Natchez bluff home and Mississippi River in hazy afternoon', score: 0.433, tags: ['mansion', 'river', 'waterfront'], corridorNum: 1072 },
  { src: '/images/library/corridor-1126.webp', alt: 'Natchez B&B parlor interior with guests in eclectic decorated room', score: 0.427, tags: ['b-and-b', 'nightlife'], corridorNum: 1126 },
  { src: '/images/library/corridor-1140.webp', alt: 'Natchez parlor gathering with candlelight and eclectic decor', score: 0.426, tags: ['nightlife', 'b-and-b'], corridorNum: 1140 },
  { src: '/images/library/corridor-1098.webp', alt: 'Pianist at Kawai piano singing into microphone at intimate Natchez gig', score: 0.426, tags: ['live-music', 'nightlife'], corridorNum: 1098 },
  { src: '/images/library/corridor-1148.webp', alt: 'Chilled wine bottle in silver bucket at Southern dinner gathering', score: 0.420, tags: ['food', 'nightlife'], corridorNum: 1148 },
  { src: '/images/library/corridor-1149.webp', alt: 'Tomato basil bruschetta appetizers on silver tray at dinner party', score: 0.416, tags: ['food', 'nightlife'], corridorNum: 1149 },
  { src: '/images/library/corridor-1173.webp', alt: 'Gulf Coast beach with kitesurfers and white sand shoreline', score: 0.414, tags: ['beach', 'waterfront'], corridorNum: 1173 },
  { src: '/images/library/corridor-1127.webp', alt: 'Natchez B&B interior with art and eclectic furnishings', score: 0.410, tags: ['b-and-b', 'art'], corridorNum: 1127 },
  { src: '/images/library/corridor-1171.webp', alt: 'Gulf Coast beach with kitesurfers on sparkling water', score: 0.401, tags: ['beach', 'waterfront'], corridorNum: 1171 },
  { src: '/images/library/corridor-1137.webp', alt: 'Record shop vinyl bins in dreamy bokeh at Natchez store', score: 0.386, tags: ['record-shop', 'downtown'], corridorNum: 1137 },
  { src: '/images/library/corridor-1175.webp', alt: 'Gulf Coast beach and surf with kite in distant sky', score: 0.358, tags: ['beach', 'waterfront'], corridorNum: 1175 },
  { src: '/images/library/corridor-1043.webp', alt: 'Close-up of hands on guitar fretboard at Natchez session in sepia', score: 0.326, tags: ['live-music'], corridorNum: 1043 },
];

// ── Query Helpers ──────────────────────────────────────────────────────────────

/** Get photos by tag, sorted by quality score. */
export function getPhotosByTag(tag: PhotoTag): LibraryPhoto[] {
  return LIBRARY.filter((p) => p.tags.includes(tag)).sort((a, b) => b.score - a.score);
}

/** Get photos matching ANY of the given tags. */
export function getPhotosByTags(tags: PhotoTag[]): LibraryPhoto[] {
  return LIBRARY.filter((p) => tags.some((t) => p.tags.includes(t))).sort((a, b) => b.score - a.score);
}

/** Get the top N photos overall. */
export function getTopPhotos(n = 10): LibraryPhoto[] {
  return [...LIBRARY].sort((a, b) => b.score - a.score).slice(0, n);
}

/** Get a random selection of N photos, optionally filtered by tag. */
export function getRandomPhotos(n = 6, tag?: PhotoTag): LibraryPhoto[] {
  const pool = tag ? getPhotosByTag(tag) : [...LIBRARY];
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

/** All unique tags in the library. */
export function getAllTags(): PhotoTag[] {
  const tags: PhotoTag[] = [];
  LIBRARY.forEach((p) => p.tags.forEach((t) => {
    if (!tags.includes(t)) tags.push(t);
  }));
  return tags.sort();
}
