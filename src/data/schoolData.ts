export interface AcademicStage {
  id: string;
  index: string;
  stageLabel: string;
  title: string;
  classes: string;
  defaultClassOption: string;
  summary: string;
  focusPoints: string[];
}

export interface PhilosophyPillar {
  index: string;
  title: string;
  description: string;
}

export type GalleryCategory =
  | 'All'
  | 'School Campus'
  | 'Classrooms'
  | 'Students Activities'
  | 'Cultural Events'
  | 'Sports Activities'
  | 'Celebrations';

export interface GalleryItem {
  id: string;
  category: Exclude<GalleryCategory, 'All'>;
  title: string;
  caption: string;
  src: string;
  alt: string;
  imgClassName?: string;
  isWideBanner?: boolean;
}

export const SCHOOL_PHOTOS = {
  logoCrest:
    '/assets/aistudio/Screenshot_2026-11-21-20-13-43-084_com.whatsapp_2_79d148b8.jpg',
  buildingExterior:
    '/assets/aistudio/Screenshot_2026-11-21-20-13-48-164_com.whatsapp_2_0b550f80.jpg',
  courtyardHall:
    '/assets/aistudio/Screenshot_2026-11-21-20-13-52-990_com.whatsapp_2_a7e10ff3.jpg',
  officialBanner:
    '/assets/aistudio/Screenshot_2026-11-21-20-13-37-875_com.whatsapp_2_1c571266.jpg',
} as const;

export const SCHOOL_INFO = {
  name: 'SILVER OAK ACADEMY',
  displayName: 'Silver Oak Academy',
  tagline: 'Transforming Learners into Leaders',
  heroValues: 'Quality Education | Strong Values | Bright Future',
  classes: 'Nursery to Class VIII',
  curriculum: 'Based on CBSE Curriculum',
  addressLine1: 'Mahadev Ashram Path',
  addressCityState: 'Lohardaga, Jharkhand, India',
  fullAddress: 'Mahadev Ashram Path, Lohardaga, Jharkhand, India',
  phones: [
    {
      display: '+91 7909086255',
      tel: 'tel:+917909086255',
      whatsappNumber: '917909086255',
      label: 'Primary Admissions & Office Line',
    },
    {
      display: '+91 8340377687',
      tel: 'tel:+918340377687',
      whatsappNumber: '918340377687',
      label: 'School Enquiry & Support Line',
    },
  ],
  mapConfig: {
    embedUrl:
      'https://maps.google.com/maps?q=Mahadev+Ashram+Path,Lohardaga,Jharkhand,India&t=&z=15&ie=UTF8&iwloc=&output=embed',
    directionsUrl:
      'https://www.google.com/maps/search/?api=1&query=Mahadev+Ashram+Path+Lohardaga+Jharkhand+India',
    placeholderNote:
      'Location pin is configured to Mahadev Ashram Path, Lohardaga, Jharkhand, India and can be updated with exact GPS coordinates.',
  },
} as const;

export const CLASS_OPTIONS = [
  'Nursery',
  'Kindergarten (LKG)',
  'Kindergarten (UKG)',
  'Class I',
  'Class II',
  'Class III',
  'Class IV',
  'Class V',
  'Class VI',
  'Class VII',
  'Class VIII',
] as const;

export const ACADEMIC_STAGES: AcademicStage[] = [
  {
    id: 'nursery',
    index: '01',
    stageLabel: 'Early Years Foundation',
    title: 'Nursery',
    classes: 'Foundational Entry Stage',
    defaultClassOption: 'Nursery',
    summary:
      'A gentle, joyful introduction to school life designed to nurture curiosity, comfort, and early social readiness in a caring environment.',
    focusPoints: [
      'Sensory play, storytelling, rhymes, and joyful discovery',
      'Early motor coordination, listening habits, and sharing values',
      'Warm teacher-guided routines that build confidence away from home',
    ],
  },
  {
    id: 'kindergarten',
    index: '02',
    stageLabel: 'Preparatory Literacy & Numeracy',
    title: 'Kindergarten',
    classes: 'LKG & UKG',
    defaultClassOption: 'Kindergarten (LKG)',
    summary:
      'Structured play-way and activity-led learning that bridges early curiosity with foundational reading, writing, and number sense.',
    focusPoints: [
      'Phonics awareness, vocabulary building, and expressive speaking',
      'Hands-on number concepts, patterns, and observational thinking',
      'Art, music, and group activities that encourage creativity and discipline',
    ],
  },
  {
    id: 'primary',
    index: '03',
    stageLabel: 'Core Academic Growth',
    title: 'Primary Classes',
    classes: 'Classes I to V',
    defaultClassOption: 'Class I',
    summary:
      'A balanced CBSE-aligned progression strengthening language fluency, mathematical reasoning, environmental awareness, and neat study habits.',
    focusPoints: [
      'Concept clarity across English, Hindi, Mathematics, and EVS',
      'Project-based learning, reading comprehension, and clear expression',
      'Regular classroom engagement cultivating responsibility and moral values',
    ],
  },
  {
    id: 'middle',
    index: '04',
    stageLabel: 'Analytical Readiness',
    title: 'Middle School',
    classes: 'Classes VI to VIII',
    defaultClassOption: 'Class VI',
    summary:
      'Focused academic depth aligned with the CBSE curriculum, encouraging independent inquiry, critical reasoning, and leadership maturity.',
    focusPoints: [
      'Strong conceptual grounding in Science, Mathematics, Languages, and Social Studies',
      'Structured problem-solving, analytical writing, and presentation skills',
      'Guided preparation for higher secondary studies and confident leadership',
    ],
  },
];

export const PHILOSOPHY_PILLARS: PhilosophyPillar[] = [
  {
    index: '01',
    title: 'Focus on Academic Excellence',
    description:
      'Clear conceptual teaching based on the CBSE curriculum so students understand fundamentals deeply rather than relying on rote memorization.',
  },
  {
    index: '02',
    title: 'Learning Through Creativity',
    description:
      'Encouraging imagination, hands-on classroom activities, and thoughtful expression so every child discovers joy in learning.',
  },
  {
    index: '03',
    title: 'Discipline and Good Values',
    description:
      'Daily emphasis on respect, honesty, punctuality, and kindness—instilling character that guides students inside and beyond the classroom.',
  },
  {
    index: '04',
    title: 'Overall Personality Development',
    description:
      'Balanced attention to academics, communication, cultural participation, and physical wellbeing for well-rounded growth.',
  },
  {
    index: '05',
    title: 'Student-Centred Learning',
    description:
      'Attentive teachers who recognize each learner’s pace, encourage questions, and nurture individual strengths from Nursery to Class VIII.',
  },
  {
    index: '06',
    title: 'Building Confidence and Leadership',
    description:
      'Opportunities in assemblies, group discussions, and school events that shape articulate, self-assured young leaders.',
  },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'School Campus',
  'Classrooms',
  'Students Activities',
  'Cultural Events',
  'Sports Activities',
  'Celebrations',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'campus-building',
    category: 'School Campus',
    title: 'Silver Oak Academy Campus & Assembly Stage',
    caption:
      'Our school building and assembly stage at Mahadev Ashram Path, Lohardaga, Jharkhand.',
    src: SCHOOL_PHOTOS.buildingExterior,
    alt: 'Silver Oak Academy school building exterior and assembly stage in Lohardaga',
    imgClassName: 'w-full h-full object-cover object-[50%_48%] scale-[1.05]',
  },
  {
    id: 'campus-courtyard',
    category: 'School Campus',
    title: 'School Courtyard & Activity Atrium',
    caption:
      'Inside the Silver Oak Academy courtyard displaying our CBSE curriculum banner and student activity highlights.',
    src: SCHOOL_PHOTOS.courtyardHall,
    alt: 'Silver Oak Academy indoor school hall and banner at Mahadev Ashram Path, Lohardaga',
    imgClassName: 'w-full h-full object-cover object-[50%_49%] scale-[1.24]',
  },
  {
    id: 'campus-banner',
    category: 'School Campus',
    title: 'Official School Identity Banner',
    caption:
      'Silver Oak Academy — Transforming Learners into Leaders, Nursery to Class VIII (Based on CBSE Curriculum).',
    src: SCHOOL_PHOTOS.officialBanner,
    alt: 'Silver Oak Academy official banner showing Nursery to VIII, CBSE Curriculum, and Lohardaga contact details',
    imgClassName: 'w-full h-full object-cover object-[50%_47%] scale-[1.03]',
    isWideBanner: true,
  },
  {
    id: 'classroom-1',
    category: 'Classrooms',
    title: 'Interactive Classroom Learning',
    caption:
      'Attentive students engaging thoughtfully with teachers in bright, well-organized classrooms.',
    src: '/src/assets/images/classroom_learning_1795322046787.jpg',
    alt: 'Representative school classroom with students raising hands and teachers guiding a lesson',
  },
  {
    id: 'activities-1',
    category: 'Students Activities',
    title: 'Hands-On Craft & Model Building',
    caption:
      'Collaborative creative work nurturing curiosity, spatial skills, and teamwork.',
    src: '/src/assets/images/student_activities_1795322047325.jpg',
    alt: 'Representative primary students collaborating on paper crafts and geometric blocks',
  },
  {
    id: 'cultural-1',
    category: 'Cultural Events',
    title: 'Cultural Stage Performances',
    caption:
      'Celebrating cultural heritage, rhythm, and confident expression on stage.',
    src: '/src/assets/images/cultural_events_1795322046967.jpg',
    alt: 'Representative school students performing traditional cultural dance on stage',
  },
  {
    id: 'sports-1',
    category: 'Sports Activities',
    title: 'Outdoor Games & Athletics',
    caption:
      'Encouraging stamina, fair play, and healthy team spirit through outdoor sports.',
    src: '/src/assets/images/sports_activities_1795322046505.jpg',
    alt: 'Representative students participating in outdoor sports on a green school ground',
  },
  {
    id: 'celebrations-1',
    category: 'Celebrations',
    title: 'Festive School Assemblies',
    caption:
      'Joyful school gatherings celebrating unity, values, and community occasions.',
    src: '/src/assets/images/school_celebrations_1795322046793.jpg',
    alt: 'Representative school courtyard decorated with marigold garlands during a celebration assembly',
  },
];
