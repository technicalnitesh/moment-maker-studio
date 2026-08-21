import { BlogPost, BlogCategory } from "@/blog/types/blog";

export const blogCategories: BlogCategory[] = [
  {
    name: "Birthday",
    slug: "birthday",
    description: "Make birthdays unforgettable with digital surprises.",
    icon: "🎂",
  },
  {
    name: "Love & Romance",
    slug: "love",
    description: "Express your feelings with digital love letters and more.",
    icon: "❤️",
  },
  {
    name: "Anniversary",
    slug: "anniversary",
    description: "Celebrate milestones with creative digital experiences.",
    icon: "💍",
  },
  {
    name: "Proposal",
    slug: "proposal",
    description: "Creative ways to pop the question digitally.",
    icon: "✨",
  },
  {
    name: "Digital Gifts",
    slug: "gifts",
    description: "Unique digital presents that last forever.",
    icon: "🎁",
  },
  {
    name: "Ideas & Inspiration",
    slug: "ideas",
    description: "Creative celebration ideas for every occasion.",
    icon: "💡",
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "5 Creative Ways to Surprise Your Partner Digitally on Their Birthday",
    slug: "creative-birthday-surprises",
    excerpt:
      "Physical gifts are great, but digital surprises create memories that last a lifetime. Discover how to use Bhopali Mitra to make their day special.",
    content: `
      <p>Birthdays are special, and in today's digital age, we have more ways than ever to celebrate our loved ones. While physical gifts are wonderful, a digital surprise can be a unique, personal, and lasting way to show someone you care.</p>
      
      <h3>1. The Digital Scavenger Hunt</h3>
      <p>Create a series of digital clues that lead your partner through your shared history. You can use our "Digital Memories" template to hide clues in photos and videos.</p>
      
      <h3>2. A Personalized Countdown</h3>
      <p>Start the celebration early by sending a digital countdown clock that reveals a new message or memory every hour leading up to their birth minute.</p>
      
      <h3>3. The Interactive Love Letter</h3>
      <p>Why send a plain text message when you can send an interactive love letter? Our "Love Letter" project allows you to embed music, floating hearts, and even a hidden passcode that only they know.</p>
      
      <h3>4. Virtual Celebration Room</h3>
      <p>Set up a digital space filled with virtual balloons, messages from friends, and links to their favorite things. It's like a surprise party they can access from anywhere.</p>
      
      <h3>5. The 'Gift of Time' Token</h3>
      <p>Give them digital "coupons" for things like a movie night of their choice, a home-cooked meal, or a weekend getaway. They can "redeem" these digitally whenever they want.</p>
      
      <p>At Bhopali Mitra, we believe that the best gifts aren't always things you can hold in your hand—they're the moments you create together. Start creating your surprise today!</p>
    `,
    category: "birthday",
    tags: ["birthday", "surprise", "digital-gifts"],
    author: {
      name: "Aditi Sharma",
    },
    featuredImage: "https://images.unsplash.com/photo-1530103862676-fa8c91abe178?auto=format&fit=crop&q=80&w=1200",
    status: 'published',
    publishedAt: "2026-08-15T10:00:00Z",
    updatedAt: "2026-08-15T10:00:00Z",
    readingTime: 4,
    isFeatured: true,
  },
  {
    id: "2",
    title: "How to Pop the Question Digitally: A Modern Guide to Proposals",
    slug: "digital-proposal-guide",
    excerpt:
      "Planning a proposal? Learn how to combine traditional romance with modern technology for a truly unforgettable 'Yes'.",
    content: `
      <p>Proposing is one of the most significant moments in a relationship. While the classic down-on-one-knee approach will never go out of style, many couples are looking for ways to make their proposal even more unique and personalized.</p>
      
      <h3>Why Consider a Digital Element?</h3>
      <p>A digital component allows you to document the journey leading up to the question. It can house photos of your first date, videos of your favorite trips, and the music that defines your relationship.</p>
      
      <h3>Using the 'Proposal Lock' Experience</h3>
      <p>One of our most popular projects is the "Proposal Lock". You can send your partner a link to a beautiful, mysterious digital box. To open it, they have to enter a date that's special to both of you. When the box opens, it reveals your heartfelt message and the big question.</p>
      
      <h3>Creating a Narrative</h3>
      <p>The best digital proposals tell a story. They build anticipation and lead the person on a journey through your shared past towards your future together.</p>
      
      <p>Whether you're planning an intimate moment at home or a grand gesture in public, adding a digital touch can make it even more special. Explore our proposal projects to find the perfect fit for your love story.</p>
    `,
    category: "proposal",
    tags: ["proposal", "love", "romance", "marriage"],
    author: {
      name: "Rahul Verma",
    },
    featuredImage: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&q=80&w=1200",
    status: 'published',
    publishedAt: "2026-08-10T14:30:00Z",
    updatedAt: "2026-08-12T09:00:00Z",
    readingTime: 5,
  },
  {
    id: "3",
    title: "The Rise of Digital Love Letters in 2026",
    slug: "rise-of-digital-love-letters",
    excerpt:
      "Handwritten notes are beautiful, but interactive digital love letters are the new way to express deep affection in the modern era.",
    content: `
      <p>In a world of instant messaging and disappearing stories, the art of the love letter is evolving. We're seeing a massive trend towards "Digital Love Letters"—interactive, multimedia experiences that express affection in ways that paper never could.</p>
      
      <h3>Beyond Words</h3>
      <p>A digital love letter isn't just text. It's the song that was playing when you first met. It's the video of that rainy day in the park. It's the ability to interact with the content, clicking on hearts to reveal hidden messages.</p>
      
      <h3>Accessibility and Longevity</h3>
      <p>Paper can fade or get lost. A digital letter, hosted securely, can be revisited from anywhere in the world, at any time. It's a permanent digital sanctuary for your relationship.</p>
      
      <h3>Personalization at Scale</h3>
      <p>Tools like Bhopali Mitra allow anyone to create these premium experiences without needing to know how to code. You can choose colors, themes, and interactions that perfectly match your partner's personality.</p>
      
      <p>If you're looking for a way to say "I love you" that feels truly modern yet deeply traditional, a digital love letter might be exactly what you need.</p>
    `,
    category: "love",
    tags: ["love", "romance", "trends", "technology"],
    author: {
      name: "Aditi Sharma",
    },
    featuredImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200",
    status: 'published',
    publishedAt: "2026-08-05T08:00:00Z",
    updatedAt: "2026-08-05T08:00:00Z",
    readingTime: 3,
  },
  {
    id: "4",
    title: "Anniversary Milestones: Moving Beyond Traditional Gifts",
    slug: "anniversary-milestone-ideas",
    excerpt:
      "Every year together is a victory. Celebrate your anniversary with digital experiences that honor your unique journey.",
    content: `
      <p>Anniversaries are the perfect time to reflect on your journey as a couple. While traditional gifts like paper, wood, or tin have their place, more and more couples are opting for "experiential" gifts that they can enjoy together.</p>
      
      <h3>Anniversary Memory Lane</h3>
      <p>Create a digital timeline of your past year. Include the big moments and the small ones—the morning coffee dates, the late-night laughs, and the challenges you overcame together.</p>
      
      <h3>The Surprise Reveal</h3>
      <p>Use a digital "Grab Code" to reveal your actual anniversary plan. Send your partner a link to a digital card that, when opened, tells them where you're going for dinner or what surprise you've planned.</p>
      
      <h3>A Gift That Grows</h3>
      <p>Some digital gifts can be added to every year, creating a living archive of your marriage or relationship. Imagine looking back at ten years of digital anniversary letters!</p>
      
      <p>Check out our Anniversary collection for inspiration on how to make your next milestone truly unforgettable.</p>
    `,
    category: "anniversary",
    tags: ["anniversary", "celebration", "milestones"],
    author: {
      name: "Rahul Verma",
    },
    featuredImage: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200",
    status: 'published',
    publishedAt: "2026-07-28T16:00:00Z",
    updatedAt: "2026-07-28T16:00:00Z",
    readingTime: 4,
  },
];
