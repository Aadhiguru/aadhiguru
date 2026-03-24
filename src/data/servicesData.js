export const categories = [
  { id: 'astrology', name_en: 'Astrology', name_ta: 'ஜோதிடம்' },
  { id: 'yoga', name_en: 'Yoga', name_ta: 'யோகா' },
  { id: 'acupuncture', name_en: 'Acupuncture', name_ta: 'அக்குபஞ்சர்' },
  { id: 'tuition', name_en: 'Education', name_ta: 'கல்வி' }
];

export const allServices = [
  // Astrology
  { id: 1, category: 'astrology', title: 'வாஸ்து (Vastu)', description: 'Traditional architecture and spatial design for harmony and prosperity.', icon: '🏠', benefits: ['Brings Harmony', 'Attracts Wealth', 'Ensures Peace'] },
  { id: 2, category: 'astrology', title: 'பாரம்பரிய ஜோதிடம் (Traditional)', description: 'Classic Vedic horoscope readings for life clarity.', icon: '📜', benefits: ['Life Clarity', 'Future Guidance', 'Remedies'] },
  { id: 3, category: 'astrology', title: 'திருமண பொருத்தம் (Marriage Matching)', description: 'Comprehensive compatibility analysis for a happy married life.', icon: '💍', benefits: ['Happy Marriage', 'Understanding', 'Longevity'] },
  { id: 4, category: 'astrology', title: 'தாம்பூல பிரசன்னம் (Thamboola)', description: 'Divine guidance and predictions using betel leaves.', icon: '🍃', benefits: ['Instant Answers', 'Divine Blessings', 'Clarity'] },
  { id: 5, category: 'astrology', title: 'ஜாமக்கோள் ஆருடம் (Jamakkol)', description: 'A specialized time-based predictive method.', icon: '⏱️', benefits: ['Precision Timing', 'Quick Decisions', 'Accuracy'] },
  { id: 6, category: 'astrology', title: 'ஜாதக கணிப்பு (Horoscope)', description: 'Accurate casting and interpretation of personal horoscopes.', icon: '✨', benefits: ['Self Discovery', 'Life Blueprint', 'Timing Events'] },
  { id: 7, category: 'astrology', title: 'சோழி பிரசன்னம் (Soli)', description: 'Ancient prediction techniques using sacred seashells.', icon: '🐚', benefits: ['Ancestral Guidance', 'Truth Reveal', 'Spiritual Insight'] },
  { id: 8, category: 'astrology', title: 'கிருஷ்ணமூர்த்தி பத்ததி (KP)', description: 'Advanced stellar astrology based on the Krishnamurti Paddhati.', icon: '⭐', benefits: ['Pinpoint Accuracy', 'Event Timing', 'Micro Analysis'] },
  { id: 9, category: 'astrology', title: 'எண் கணிதம் (Numerology)', description: 'Name and birth date analysis based on the power of numbers.', icon: '🔢', benefits: ['Lucky Numbers', 'Name Correction', 'Success Patterns'] },
  { id: 10, category: 'astrology', title: 'அஷ்ட மங்கல பிரசன்னம் (Ashta Mangala)', description: 'The most revered and comprehensive form of Prasannam divination.', icon: '🕉️', benefits: ['Deep Root Causes', 'Karmic Cleansing', 'Divine Truth'] },
  { id: 20, category: 'astrology', title: 'பஞ்ச பக்ஷி சாஸ்திரம் (Panja Pakshi)', description: 'An ancient Tamil predictive system based on the five sacred birds.', icon: '🦚', benefits: ['Auspicious Timing', 'Daily Success', 'Energy Cycles'] },
  { id: 21, category: 'astrology', title: 'முகூர்த்தம் (Mugurtham)', description: 'Expert selection of auspicious dates and times for ceremonies.', icon: '🌅', benefits: ['Favorable Beginnings', 'Positive Energy', 'Success'] },
  { id: 22, category: 'astrology', title: 'நாடி ஜோதிடம் (Naadi)', description: 'Ancient palm-leaf manuscripts revealing past, present, and future.', icon: '📿', benefits: ['Past Life Karma', 'Destiny Path', 'Atonement'] },

  // Yoga
  { id: 11, category: 'yoga', title: 'Hatha Yoga (ஹத யோகா)', description: 'Physical postures and breathing techniques to balance body and mind.', icon: '🧘', benefits: ['Flexibility', 'Strength', 'Inner Peace'] },
  { id: 12, category: 'yoga', title: 'Pranayama (பிராணாயாமம்)', description: 'Ancient breathing exercises for energy control and relaxation.', icon: '🌬️', benefits: ['Better Focus', 'Stress Relief', 'Vitality'] },
  { id: 13, category: 'yoga', title: 'Meditation (தியானம்)', description: 'Guidance to achieve inner peace and mental clarity.', icon: '🧠', benefits: ['Mental Clarity', 'Calmness', 'Self-Awareness'] },
  { id: 23, category: 'yoga', title: 'Muthra (முத்திரை)', description: 'Hand gestures that guide energy flow to specific regions.', icon: '👌', benefits: ['Energy Balance', 'Healing', 'Concentration'] },
  { id: 24, category: 'yoga', title: 'Navagraha Meditation (நவகிரஹ தியானம்)', description: 'Meditating on planets to balance cosmic influences.', icon: '🪐', benefits: ['Karmic Balance', 'Success', 'Spiritual Growth'] },
  { id: 25, category: 'yoga', title: 'Chakra Meditation (சக்ரா தியானம்)', description: 'Awakening and balancing the seven distinct energy centers.', icon: '🌀', benefits: ['Emotional Balance', 'Inner Awakening', 'Health'] },
  { id: 26, category: 'yoga', title: 'Vaasi Yogam (வாசி யோகம்)', description: 'Advanced breathing technique to unite internal and external energies.', icon: '🧘‍♂️', benefits: ['Longevity', 'High Energy', 'Bliss'] },
  { id: 27, category: 'yoga', title: 'Surya Namaskaram (சூர்ய நமஸ்காரம்)', description: 'A sequence of 12 powerful yoga asanas dedicated to the Sun God.', icon: '🌞', benefits: ['Full Body Workout', 'Glowing Skin', 'Weight Loss'] },
  { id: 28, category: 'yoga', title: 'Hasana (ஆசனம்)', description: 'Physical postures designed to purify the body and provide strength.', icon: '🤸', benefits: ['Posture Correction', 'Endurance', 'Flexibility'] },

  // Acupuncture
  { id: 14, category: 'acupuncture', title: 'Classical (பாரம்பரிய)', description: 'Balancing the flow of energy through precise point stimulation.', icon: '📍', benefits: ['Pain Relief', 'Energy Flow', 'Natural Healing'] },
  { id: 15, category: 'acupuncture', title: 'Pain Management (வலி மேலாண்மை)', description: 'Specialized treatments for chronic pain and muscular issues.', icon: '⚡', benefits: ['Reduces Inflammation', 'Mobility', 'Comfort'] },
  { id: 16, category: 'acupuncture', title: 'Wellness Therapy (நலவாழ்வு சிகிச்சை)', description: 'Immune boosting and holistic health maintenance.', icon: '🌱', benefits: ['Immunity Boost', 'Detoxification', 'Vitality'] },

  // Education
  { id: 17, category: 'tuition', title: 'School Subjects (பள்ளி பாடங்கள்)', description: 'Holistic tutoring for Mathematics, Science and more for all grades.', icon: '🎓', benefits: ['Better Grades', 'Understanding', 'Confidence'] },
  { id: 18, category: 'tuition', title: 'Skill Development (திறன் மேம்பாடு)', description: 'Enhancing cognitive and soft skills for competitive exams.', icon: '💡', benefits: ['Problem Solving', 'Communication', 'Career Growth'] },
  { id: 19, category: 'tuition', title: 'Vedic Math (வேத கணிதம்)', description: 'Fast calculation techniques using ancient mathematical systems.', icon: '📐', benefits: ['Speed Math', 'Brain Power', 'Accuracy'] }
];
