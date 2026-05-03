import { PrismaClient, Condition } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const TAGS = ['Jazz', 'Rock', 'Soul', 'Funk', 'Electronic', 'Hip-Hop', 'Classical', 'Blues', 'Reggae', 'Pop'];

const ALBUMS: Array<{
  discogsId: string;
  title: string;
  artist: string;
  label: string;
  year: number;
  format: string;
  coverUrl: string;
  condition: Condition;
  purchasePrice: number;
  tags: string[];
  tracks: Array<{ position: string; title: string; duration: string }>;
}> = [
  {
    discogsId: '2440815',
    title: 'Kind of Blue',
    artist: 'Miles Davis',
    label: 'Columbia',
    year: 1959,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/kind-of-blue.jpg',
    condition: Condition.NEAR_MINT,
    purchasePrice: 35,
    tags: ['Jazz'],
    tracks: [
      { position: 'A1', title: 'So What', duration: '9:22' },
      { position: 'A2', title: 'Freddie Freeloader', duration: '9:46' },
      { position: 'A3', title: 'Blue in Green', duration: '5:37' },
      { position: 'B1', title: 'All Blues', duration: '11:33' },
      { position: 'B2', title: 'Flamenco Sketches', duration: '9:26' },
    ],
  },
  {
    discogsId: '1196781',
    title: 'Rumours',
    artist: 'Fleetwood Mac',
    label: 'Warner Bros.',
    year: 1977,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/rumours.jpg',
    condition: Condition.VERY_GOOD_PLUS,
    purchasePrice: 22,
    tags: ['Rock', 'Pop'],
    tracks: [
      { position: 'A1', title: 'Second Hand News', duration: '2:43' },
      { position: 'A2', title: 'Dreams', duration: '4:17' },
      { position: 'A3', title: 'Never Going Back Again', duration: '2:02' },
      { position: 'A4', title: 'Don\'t Stop', duration: '3:11' },
      { position: 'A5', title: 'Go Your Own Way', duration: '3:38' },
      { position: 'B1', title: 'The Chain', duration: '4:30' },
      { position: 'B2', title: 'You Make Loving Fun', duration: '3:31' },
      { position: 'B3', title: 'I Don\'t Want to Know', duration: '3:16' },
    ],
  },
  {
    discogsId: '3523956',
    title: 'Thriller',
    artist: 'Michael Jackson',
    label: 'Epic',
    year: 1982,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/thriller.jpg',
    condition: Condition.VERY_GOOD,
    purchasePrice: 18,
    tags: ['Pop', 'Funk'],
    tracks: [
      { position: 'A1', title: 'Wanna Be Startin\' Somethin\'', duration: '6:03' },
      { position: 'A2', title: 'Baby Be Mine', duration: '4:20' },
      { position: 'A3', title: 'The Girl Is Mine', duration: '3:42' },
      { position: 'A4', title: 'Thriller', duration: '5:57' },
      { position: 'B1', title: 'Beat It', duration: '4:18' },
      { position: 'B2', title: 'Billie Jean', duration: '4:54' },
      { position: 'B3', title: 'Human Nature', duration: '4:06' },
    ],
  },
  {
    discogsId: '1206886',
    title: 'What\'s Going On',
    artist: 'Marvin Gaye',
    label: 'Tamla',
    year: 1971,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/whats-going-on.jpg',
    condition: Condition.NEAR_MINT,
    purchasePrice: 40,
    tags: ['Soul', 'Funk'],
    tracks: [
      { position: 'A1', title: 'What\'s Going On', duration: '3:53' },
      { position: 'A2', title: 'What\'s Happening Brother', duration: '2:43' },
      { position: 'A3', title: 'Flyin\' High (In the Friendly Sky)', duration: '3:49' },
      { position: 'B1', title: 'Mercy Mercy Me (The Ecology)', duration: '3:16' },
      { position: 'B2', title: 'Right On', duration: '7:17' },
      { position: 'B3', title: 'Wholy Holy', duration: '3:08' },
    ],
  },
  {
    discogsId: '9049576',
    title: 'Blue',
    artist: 'Joni Mitchell',
    label: 'Reprise',
    year: 1971,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/blue.jpg',
    condition: Condition.VERY_GOOD_PLUS,
    purchasePrice: 28,
    tags: ['Rock', 'Pop'],
    tracks: [
      { position: 'A1', title: 'All I Want', duration: '3:33' },
      { position: 'A2', title: 'My Old Man', duration: '3:33' },
      { position: 'A3', title: 'Little Green', duration: '3:26' },
      { position: 'A4', title: 'Carey', duration: '3:00' },
      { position: 'B1', title: 'River', duration: '4:00' },
      { position: 'B2', title: 'A Case of You', duration: '4:21' },
      { position: 'B3', title: 'The Last Time I Saw Richard', duration: '4:13' },
    ],
  },
  {
    discogsId: '4830032',
    title: 'Sign \'O\' the Times',
    artist: 'Prince',
    label: 'Paisley Park',
    year: 1987,
    format: '2xLP',
    coverUrl: 'https://i.discogs.com/sign-o-the-times.jpg',
    condition: Condition.NEAR_MINT,
    purchasePrice: 55,
    tags: ['Funk', 'Pop'],
    tracks: [
      { position: 'A1', title: 'Sign \'O\' the Times', duration: '4:57' },
      { position: 'A2', title: 'Play in the Sunshine', duration: '5:02' },
      { position: 'B1', title: 'Housequake', duration: '4:42' },
      { position: 'B2', title: 'The Ballad of Dorothy Parker', duration: '4:02' },
      { position: 'C1', title: 'U Got the Look', duration: '3:47' },
      { position: 'D1', title: 'I Could Never Take the Place of Your Man', duration: '6:26' },
    ],
  },
  {
    discogsId: '1531947',
    title: 'Purple Rain',
    artist: 'Prince And The Revolution',
    label: 'Warner Bros.',
    year: 1984,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/purple-rain.jpg',
    condition: Condition.VERY_GOOD_PLUS,
    purchasePrice: 30,
    tags: ['Rock', 'Funk', 'Pop'],
    tracks: [
      { position: 'A1', title: 'Let\'s Go Crazy', duration: '4:39' },
      { position: 'A2', title: 'Take Me with U', duration: '3:55' },
      { position: 'A3', title: 'The Beautiful Ones', duration: '5:13' },
      { position: 'B1', title: 'Computer Blue', duration: '3:59' },
      { position: 'B2', title: 'Darling Nikki', duration: '4:14' },
      { position: 'B3', title: 'When Doves Cry', duration: '5:54' },
      { position: 'B4', title: 'Purple Rain', duration: '8:41' },
    ],
  },
  {
    discogsId: '2356347',
    title: 'Nevermind',
    artist: 'Nirvana',
    label: 'DGC',
    year: 1991,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/nevermind.jpg',
    condition: Condition.VERY_GOOD,
    purchasePrice: 25,
    tags: ['Rock'],
    tracks: [
      { position: 'A1', title: 'Smells Like Teen Spirit', duration: '5:01' },
      { position: 'A2', title: 'In Bloom', duration: '4:14' },
      { position: 'A3', title: 'Come as You Are', duration: '3:38' },
      { position: 'B1', title: 'Lithium', duration: '4:17' },
      { position: 'B2', title: 'Polly', duration: '2:57' },
      { position: 'B3', title: 'Territorial Pissings', duration: '2:22' },
    ],
  },
  {
    discogsId: '1025785',
    title: 'Off the Wall',
    artist: 'Michael Jackson',
    label: 'Epic',
    year: 1979,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/off-the-wall.jpg',
    condition: Condition.GOOD_PLUS,
    purchasePrice: 15,
    tags: ['Soul', 'Funk', 'Pop'],
    tracks: [
      { position: 'A1', title: 'Don\'t Stop \'Til You Get Enough', duration: '6:05' },
      { position: 'A2', title: 'Rock with You', duration: '3:40' },
      { position: 'A3', title: 'Workin\' Day and Night', duration: '5:12' },
      { position: 'B1', title: 'Off the Wall', duration: '4:05' },
      { position: 'B2', title: 'She\'s Out of My Life', duration: '3:38' },
    ],
  },
  {
    discogsId: '3341796',
    title: 'Songs in the Key of Life',
    artist: 'Stevie Wonder',
    label: 'Tamla',
    year: 1976,
    format: '2xLP',
    coverUrl: 'https://i.discogs.com/songs-in-the-key-of-life.jpg',
    condition: Condition.NEAR_MINT,
    purchasePrice: 50,
    tags: ['Soul', 'Funk'],
    tracks: [
      { position: 'A1', title: 'Love\'s in Need of Love Today', duration: '7:05' },
      { position: 'A2', title: 'Have a Talk with God', duration: '2:42' },
      { position: 'B1', title: 'I Wish', duration: '4:11' },
      { position: 'B2', title: 'Knocks Me Off My Feet', duration: '4:13' },
      { position: 'C1', title: 'Sir Duke', duration: '3:52' },
      { position: 'D1', title: 'Isn\'t She Lovely', duration: '6:34' },
    ],
  },
  {
    discogsId: '777805',
    title: 'Endtroducing.....',
    artist: 'DJ Shadow',
    label: 'Mo\' Wax',
    year: 1996,
    format: '2xLP',
    coverUrl: 'https://i.discogs.com/endtroducing.jpg',
    condition: Condition.NEAR_MINT,
    purchasePrice: 45,
    tags: ['Electronic', 'Hip-Hop'],
    tracks: [
      { position: 'A1', title: 'Best Foot Forward', duration: '1:07' },
      { position: 'A2', title: 'Building Steam with a Grain of Salt', duration: '8:06' },
      { position: 'B1', title: 'The Number Song', duration: '4:24' },
      { position: 'B2', title: 'Changeling', duration: '7:26' },
      { position: 'C1', title: 'Stem / Long Stem', duration: '10:52' },
      { position: 'D1', title: 'Midnight in a Perfect World', duration: '5:00' },
    ],
  },
  {
    discogsId: '1418523',
    title: 'Dummy',
    artist: 'Portishead',
    label: 'Go! Discs',
    year: 1994,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/dummy.jpg',
    condition: Condition.VERY_GOOD_PLUS,
    purchasePrice: 32,
    tags: ['Electronic'],
    tracks: [
      { position: 'A1', title: 'Mysterons', duration: '5:02' },
      { position: 'A2', title: 'Sour Times', duration: '4:11' },
      { position: 'A3', title: 'Strangers', duration: '3:55' },
      { position: 'B1', title: 'It Could Be Sweet', duration: '4:16' },
      { position: 'B2', title: 'Wandering Star', duration: '4:51' },
      { position: 'B3', title: 'Glory Box', duration: '5:06' },
    ],
  },
  {
    discogsId: '504991',
    title: 'Donuts',
    artist: 'J Dilla',
    label: 'Stones Throw',
    year: 2006,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/donuts.jpg',
    condition: Condition.MINT,
    purchasePrice: 60,
    tags: ['Hip-Hop', 'Electronic'],
    tracks: [
      { position: 'A1', title: 'Donuts (Outro)', duration: '0:35' },
      { position: 'A2', title: 'Workinonit', duration: '2:16' },
      { position: 'A3', title: 'The New Ammonia', duration: '1:33' },
      { position: 'B1', title: 'Time: The Donut of the Heart', duration: '1:53' },
      { position: 'B2', title: 'Lightworks', duration: '2:09' },
    ],
  },
  {
    discogsId: '2188622',
    title: 'Innervisions',
    artist: 'Stevie Wonder',
    label: 'Tamla',
    year: 1973,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/innervisions.jpg',
    condition: Condition.VERY_GOOD,
    purchasePrice: 20,
    tags: ['Soul', 'Funk'],
    tracks: [
      { position: 'A1', title: 'Too High', duration: '4:45' },
      { position: 'A2', title: 'Visions', duration: '4:38' },
      { position: 'A3', title: 'Living for the City', duration: '7:22' },
      { position: 'B1', title: 'Higher Ground', duration: '3:40' },
      { position: 'B2', title: 'Jesus Children of America', duration: '3:53' },
      { position: 'B3', title: 'All in Love Is Fair', duration: '3:34' },
    ],
  },
  {
    discogsId: '635597',
    title: 'The Low End Theory',
    artist: 'A Tribe Called Quest',
    label: 'Jive',
    year: 1991,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/the-low-end-theory.jpg',
    condition: Condition.VERY_GOOD_PLUS,
    purchasePrice: 38,
    tags: ['Hip-Hop', 'Jazz'],
    tracks: [
      { position: 'A1', title: 'Excursions', duration: '4:33' },
      { position: 'A2', title: 'Buggin\' Out', duration: '3:35' },
      { position: 'A3', title: 'Rap Promoter', duration: '2:42' },
      { position: 'B1', title: 'Scenario', duration: '4:36' },
      { position: 'B2', title: 'Verses from the Abstract', duration: '3:52' },
      { position: 'B3', title: 'What?', duration: '4:21' },
    ],
  },
  {
    discogsId: '1113990',
    title: 'Let\'s Get It On',
    artist: 'Marvin Gaye',
    label: 'Tamla',
    year: 1973,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/lets-get-it-on.jpg',
    condition: Condition.GOOD_PLUS,
    purchasePrice: 16,
    tags: ['Soul'],
    tracks: [
      { position: 'A1', title: 'Let\'s Get It On', duration: '4:05' },
      { position: 'A2', title: 'Please Stay (Once You Go Away)', duration: '3:22' },
      { position: 'B1', title: 'Come Get to This', duration: '2:38' },
      { position: 'B2', title: 'Distant Lover', duration: '3:20' },
    ],
  },
  {
    discogsId: '371553',
    title: 'Autobahn',
    artist: 'Kraftwerk',
    label: 'Philips',
    year: 1974,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/autobahn.jpg',
    condition: Condition.VERY_GOOD,
    purchasePrice: 30,
    tags: ['Electronic'],
    tracks: [
      { position: 'A1', title: 'Autobahn', duration: '22:43' },
      { position: 'B1', title: 'Kometenmelodie 1', duration: '6:49' },
      { position: 'B2', title: 'Kometenmelodie 2', duration: '6:00' },
      { position: 'B3', title: 'Mitternacht', duration: '4:19' },
    ],
  },
  {
    discogsId: '1542479',
    title: 'Exodus',
    artist: 'Bob Marley & The Wailers',
    label: 'Island',
    year: 1977,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/exodus.jpg',
    condition: Condition.VERY_GOOD_PLUS,
    purchasePrice: 24,
    tags: ['Reggae'],
    tracks: [
      { position: 'A1', title: 'Natural Mystic', duration: '3:29' },
      { position: 'A2', title: 'So Much Things to Say', duration: '3:08' },
      { position: 'A3', title: 'Guiltiness', duration: '3:19' },
      { position: 'B1', title: 'Exodus', duration: '7:40' },
      { position: 'B2', title: 'Jamming', duration: '3:31' },
      { position: 'B3', title: 'Waiting in Vain', duration: '4:16' },
      { position: 'B4', title: 'Three Little Birds', duration: '3:00' },
    ],
  },
  {
    discogsId: '2263477',
    title: 'Aqua',
    artist: 'Boards of Canada',
    label: 'Warp',
    year: 1998,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/music-has-the-right-to-children.jpg',
    condition: Condition.MINT,
    purchasePrice: 70,
    tags: ['Electronic'],
    tracks: [
      { position: 'A1', title: 'Wildlife Analysis', duration: '1:56' },
      { position: 'A2', title: 'An Eagle in Your Mind', duration: '4:55' },
      { position: 'A3', title: 'The Color of the Fire', duration: '2:40' },
      { position: 'B1', title: 'Telephasic Workshop', duration: '6:51' },
      { position: 'B2', title: 'Sixtyten', duration: '5:45' },
    ],
  },
  {
    discogsId: '2156669',
    title: 'Remain in Light',
    artist: 'Talking Heads',
    label: 'Sire',
    year: 1980,
    format: 'LP',
    coverUrl: 'https://i.discogs.com/remain-in-light.jpg',
    condition: Condition.NEAR_MINT,
    purchasePrice: 42,
    tags: ['Rock', 'Funk', 'Electronic'],
    tracks: [
      { position: 'A1', title: 'Born Under Punches (The Heat Goes On)', duration: '5:47' },
      { position: 'A2', title: 'Crosseyed and Painless', duration: '4:43' },
      { position: 'A3', title: 'The Great Curve', duration: '6:25' },
      { position: 'B1', title: 'Once in a Lifetime', duration: '4:19' },
      { position: 'B2', title: 'Houses in Motion', duration: '4:29' },
      { position: 'B3', title: 'Seen and Not Seen', duration: '3:20' },
      { position: 'B4', title: 'Listening Wind', duration: '4:41' },
      { position: 'B5', title: 'The Overload', duration: '5:52' },
    ],
  },
];

async function main() {
  console.log('Seeding database...');

  const hashedPassword = await bcrypt.hash('password123', 10);
  const user = await prisma.user.upsert({
    where: { email: 'demo@groovebox.dev' },
    update: {},
    create: {
      email: 'demo@groovebox.dev',
      username: 'groovebox_demo',
      password: hashedPassword,
    },
  });
  console.log(`User: ${user.username}`);

  const tagMap = new Map<string, string>();
  for (const name of TAGS) {
    const tag = await prisma.tag.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    tagMap.set(name, tag.id);
  }
  console.log(`Tags: ${TAGS.length} created`);

  for (const data of ALBUMS) {
    const { tags, tracks, ...albumData } = data;

    const album = await prisma.album.upsert({
      where: { id: `seed-${albumData.discogsId}` },
      update: {},
      create: {
        id: `seed-${albumData.discogsId}`,
        ...albumData,
        purchaseDate: new Date(`${albumData.year + Math.floor(Math.random() * 10)}-06-15`),
        userId: user.id,
        tracks: {
          create: tracks,
        },
        tags: {
          create: tags.map((name) => ({ tagId: tagMap.get(name)! })),
        },
      },
    });

    console.log(`  ✓ ${album.artist} — ${album.title}`);
  }

  const wishlist = [
    { title: 'Bitches Brew', artist: 'Miles Davis', discogsId: '1247' },
    { title: 'Electric Ladyland', artist: 'Jimi Hendrix', discogsId: '44870' },
    { title: 'Ziggy Stardust', artist: 'David Bowie', discogsId: '284958' },
  ];

  for (const item of wishlist) {
    await prisma.wishlistItem.upsert({
      where: { id: `seed-wish-${item.discogsId}` },
      update: {},
      create: {
        id: `seed-wish-${item.discogsId}`,
        ...item,
        userId: user.id,
      },
    });
  }
  console.log(`Wishlist: ${wishlist.length} items`);

  console.log('Done.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
