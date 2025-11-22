export interface Tool {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  image: string;
  description: string;
  slug: string;
  features?: string[];
  category?: string;
  productId?: number; // Product ID for Buy Now link
}

export const tools: Tool[] = [
  // Removed ahrefs, semrush, moz - they now link to WooCommerce product pages
  {
    id: 'canva',
    name: 'Canva Pro',
    price: '$4.99',
    originalPrice: '$12.99',
    image: '/tools/canva-logo.svg',
    description: 'Creative design platform with professional resources',
    slug: 'canva',
    category: 'Design Tools',
    features: ['Design Templates', 'Photo Editor', 'Brand Kit', 'Collaboration']
  },
  {
    id: 'chatgpt-plus',
    name: 'ChatGPT Plus',
    price: '$4.99',
    originalPrice: '$20.00',
    image: '/tools/chatgpt-logo.svg',
    description: 'Advanced AI assistant for productivity',
    slug: 'chatgpt-plus',
    category: 'AI Tools',
    features: ['GPT-4 Access', 'Faster Responses', 'Priority Access', 'Plugins']
  },
  {
    id: 'claude',
    name: 'Claude',
    price: '$4.99',
    originalPrice: '$20.00',
    image: '/tools/claude-logo.svg',
    description: 'Next-generation AI development assistant',
    slug: 'claude',
    category: 'AI Tools',
    features: ['Long Context', 'Code Analysis', 'Writing Assistant', 'Research'],
    productId: 113
  },
  {
    id: 'netflix',
    name: 'Netflix',
    price: '$4.99',
    originalPrice: '$15.99',
    image: '/tools/netflix-logo.svg',
    description: 'Premium streaming entertainment service',
    slug: 'netflix',
    category: 'Entertainment',
    features: ['4K Streaming', 'Multiple Screens', 'No Ads', 'Download Offline'],
    productId: 52
  },
  {
    id: 'grammarly',
    name: 'Grammarly',
    price: '$4.99',
    originalPrice: '$12.00',
    image: 'https://img.icons8.com/color/96/grammarly.png',
    description: 'AI-powered writing assistant tool',
    slug: 'grammarly',
    category: 'Writing Tools',
    features: ['Grammar Check', 'Style Suggestions', 'Plagiarism Check', 'Tone Detector']
  },
  {
    id: 'quillbot',
    name: 'QuillBot',
    price: '$3.99',
    originalPrice: '$9.95',
    image: 'https://img.icons8.com/color/96/documents.png',
    description: 'AI paraphrasing and writing tool',
    slug: 'quillbot',
    category: 'Writing Tools',
    features: ['Paraphrasing', 'Summarizer', 'Grammar Check', 'Citation Generator'],
    productId: 103
  },
  {
    id: 'surfer',
    name: 'Surfer SEO',
    price: '$4.99',
    originalPrice: '$59.00',
    image: 'https://img.icons8.com/color/96/google-logo.png',
    description: 'Content optimization and SEO platform',
    slug: 'surfer-seo',
    category: 'SEO Tools',
    features: ['Content Editor', 'Keyword Research', 'Site Audit', 'SERP Analyzer'],
    productId: 108
  },
  {
    id: 'buzzsumo',
    name: 'Buzzsumo',
    price: '$4.99',
    originalPrice: '$99.00',
    image: 'https://img.icons8.com/color/96/graph.png',
    description: 'Content research and social analytics',
    slug: 'buzzsumo',
    category: 'Content Marketing',
    features: ['Content Discovery', 'Influencer Research', 'Trend Analysis', 'Competitor Analysis']
  },
  {
    id: 'helium10',
    name: 'Helium 10',
    price: '$9.99',
    originalPrice: '$97.00',
    image: 'https://img.icons8.com/color/96/amazon.png',
    description: 'Complete Amazon seller toolkit',
    slug: 'helium10',
    category: 'E-commerce',
    features: ['Keyword Research', 'Product Research', 'Listing Optimization', 'Inventory Management']
  },
  {
    id: 'freepik',
    name: 'Freepik Premium',
    price: '$4.99',
    originalPrice: '$12.99',
    image: 'https://img.icons8.com/color/96/image.png',
    description: 'Million+ graphic resources library',
    slug: 'freepik',
    category: 'Design Tools',
    features: ['Premium Graphics', 'Vectors', 'Photos', 'PSD Files']
  },
  {
    id: 'envato',
    name: 'Envato Elements',
    price: '$4.99',
    originalPrice: '$16.50',
    image: 'https://img.icons8.com/color/96/design.png',
    description: 'Unlimited creative assets and templates',
    slug: 'envato-elements',
    category: 'Design Tools',
    features: ['Stock Photos', 'Templates', 'Music', 'Video Footage']
  },
  {
    id: 'storyblocks',
    name: 'StoryBlocks',
    price: '$4.99',
    originalPrice: '$40.00',
    image: 'https://img.icons8.com/color/96/movie.png',
    description: 'Stock video and audio library',
    slug: 'storyblocks',
    category: 'Media',
    features: ['Stock Videos', 'Audio Tracks', 'Motion Graphics', 'After Effects Templates'],
    productId: 95
  },
  {
    id: 'ubersuggest',
    name: 'Ubersuggest',
    price: '$4.99',
    originalPrice: '$29.00',
    image: 'https://img.icons8.com/color/96/analytics.png',
    description: 'SEO and keyword research tool',
    slug: 'ubersuggest',
    category: 'SEO Tools',
    features: ['Keyword Research', 'Site Audit', 'Backlink Checker', 'Content Ideas'],
    productId: 96
  },
  {
    id: 'spyfu',
    name: 'SpyFu',
    price: '$4.99',
    originalPrice: '$39.00',
    image: 'https://img.icons8.com/color/96/search.png',
    description: 'Competitor research and analysis',
    slug: 'spyfu',
    category: 'SEO Tools',
    features: ['Competitor Analysis', 'PPC Research', 'SEO Research', 'Historical Data'],
    productId: 89
  },
  {
    id: 'majestic',
    name: 'Majestic SEO',
    price: '$4.99',
    originalPrice: '$99.99',
    image: 'https://img.icons8.com/color/96/link.png',
    description: 'Backlink checker and SEO analysis',
    slug: 'majestic',
    category: 'SEO Tools',
    features: ['Backlink Checker', 'Link Intelligence', 'Site Explorer', 'Trust Flow'],
    productId: 11
  },
  {
    id: 'runwayml',
    name: 'RunwayML',
    price: '$4.99',
    originalPrice: '$35.00',
    image: '/tools/runwayml-logo.svg',
    description: 'Innovative video creation platform',
    slug: 'runwayml',
    category: 'AI Tools',
    features: ['AI Video Generation', 'Video Editing', 'Green Screen', 'Motion Tracking']
  },
  {
    id: 'notion',
    name: 'Notion',
    price: '$4.99',
    originalPrice: '$10.00',
    image: 'https://img.icons8.com/fluency/96/notion.png',
    description: 'All-in-one workspace for notes and tasks',
    slug: 'notion',
    category: 'Productivity',
    features: ['Notes & Docs', 'Task Management', 'Databases', 'Collaboration']
  },
  {
    id: 'adobe',
    name: 'Adobe Creative',
    price: '$9.99',
    originalPrice: '$54.99',
    image: 'https://img.icons8.com/color/96/adobe-creative-cloud.png',
    description: 'Complete creative cloud suite access',
    slug: 'adobe-creative',
    category: 'Design Tools',
    features: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects']
  },
  {
    id: 'spotify',
    name: 'Spotify Premium',
    price: '$3.99',
    originalPrice: '$9.99',
    image: 'https://img.icons8.com/color/96/spotify.png',
    description: 'Ad-free music streaming service',
    slug: 'spotify',
    category: 'Entertainment',
    features: ['Ad-Free Music', 'Download Offline', 'High Quality', 'Unlimited Skips']
  },
  {
    id: 'jasper',
    name: 'Jasper AI',
    price: '$4.99',
    originalPrice: '$49.00',
    image: 'https://img.icons8.com/color/96/chatgpt.png',
    description: 'AI content creation and copywriting',
    slug: 'jasper-ai',
    category: 'AI Tools',
    features: ['Content Generation', 'Copywriting', 'Blog Posts', 'Marketing Copy']
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    price: '$4.99',
    originalPrice: '$20.00',
    image: 'https://img.icons8.com/color/96/email.png',
    description: 'Email marketing automation tool',
    slug: 'mailchimp',
    category: 'Marketing',
    features: ['Email Campaigns', 'Automation', 'Analytics', 'Landing Pages']
  },
  {
    id: 'hootsuite',
    name: 'Hootsuite',
    price: '$4.99',
    originalPrice: '$49.00',
    image: 'https://img.icons8.com/color/96/twitter--v1.png',
    description: 'Social media management platform',
    slug: 'hootsuite',
    category: 'Social Media',
    features: ['Social Scheduling', 'Analytics', 'Team Management', 'Content Calendar']
  },
  {
    id: 'figma',
    name: 'Figma Pro',
    price: '$4.99',
    originalPrice: '$15.00',
    image: 'https://img.icons8.com/color/96/figma.png',
    description: 'Professional design and prototyping',
    slug: 'figma',
    category: 'Design Tools',
    features: ['Design Tools', 'Prototyping', 'Collaboration', 'Plugins']
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    price: '$9.99',
    originalPrice: '$50.00',
    image: 'https://img.icons8.com/color/96/business.png',
    description: 'CRM and marketing automation suite',
    slug: 'hubspot',
    category: 'CRM',
    features: ['CRM', 'Marketing Automation', 'Sales Pipeline', 'Analytics']
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    price: '$4.99',
    originalPrice: '$30.00',
    image: 'https://img.icons8.com/color/96/image-gallery.png',
    description: 'AI image generation and art creation',
    slug: 'midjourney',
    category: 'AI Tools',
    features: ['AI Art Generation', 'Multiple Styles', 'High Resolution', 'Fast Generation']
  },
  {
    id: 'leonardo',
    name: 'Leonardo.AI',
    price: '$4.99',
    originalPrice: '$10.00',
    image: 'https://img.icons8.com/color/96/artificial-intelligence.png',
    description: 'AI-powered image generation tool',
    slug: 'leonardo-ai',
    category: 'AI Tools',
    features: ['Image Generation', 'AI Models', 'Texture Generation', '3D Assets']
  },
  {
    id: 'capcut',
    name: 'CapCut Pro',
    price: '$4.99',
    originalPrice: '$9.99',
    image: 'https://img.icons8.com/color/96/video-editing.png',
    description: 'Professional video editing software',
    slug: 'capcut-pro',
    category: 'Video Editing',
    features: ['Video Editor', 'Templates', 'Effects', 'Music Library']
  },
  {
    id: 'invideo',
    name: 'InVideo',
    price: '$4.99',
    originalPrice: '$30.00',
    image: 'https://img.icons8.com/color/96/video.png',
    description: 'Video creation and editing platform',
    slug: 'invideo',
    category: 'Video Editing',
    features: ['Video Editor', 'Templates', 'Stock Media', 'AI Voiceover']
  },
  {
    id: 'coursera',
    name: 'Coursera Plus',
    price: '$4.99',
    originalPrice: '$59.00',
    image: 'https://img.icons8.com/color/96/graduation-cap.png',
    description: 'Unlimited online courses access',
    slug: 'coursera-plus',
    category: 'Education',
    features: ['Unlimited Courses', 'Certificates', 'Specializations', 'Guided Projects'],
    productId: 91
  },
  {
    id: 'udemy',
    name: 'Udemy Pro',
    price: '$4.99',
    originalPrice: '$19.99',
    image: 'https://img.icons8.com/color/96/udemy.png',
    description: 'Professional course learning platform',
    slug: 'udemy',
    category: 'Education',
    features: ['Course Library', 'Certificates', 'Lifetime Access', 'Mobile App']
  },
  {
    id: 'turnitin',
    name: 'Turnitin',
    price: '$4.99',
    originalPrice: '$3.00',
    image: 'https://img.icons8.com/color/96/checked-2.png',
    description: 'Plagiarism detection and checking',
    slug: 'turnitin',
    category: 'Education',
    features: ['Plagiarism Check', 'Grammar Check', 'Feedback Studio', 'GradeMark']
  },
  {
    id: 'wordhero',
    name: 'WordHero',
    price: '$4.99',
    originalPrice: '$49.00',
    image: 'https://img.icons8.com/color/96/edit.png',
    description: 'AI writing and content generation',
    slug: 'wordhero',
    category: 'Writing Tools',
    features: ['Content Generation', 'Blog Posts', 'Social Media', 'Copywriting']
  },
  {
    id: 'copyai',
    name: 'Copy.ai',
    price: '$4.99',
    originalPrice: '$49.00',
    image: 'https://img.icons8.com/color/96/document.png',
    description: 'AI-powered copywriting assistant',
    slug: 'copy-ai',
    category: 'Writing Tools',
    features: ['Copywriting', 'Blog Posts', 'Social Media', 'Product Descriptions']
  },
  {
    id: 'scribd',
    name: 'Scribd Premium',
    price: '$3.99',
    originalPrice: '$11.99',
    image: 'https://img.icons8.com/color/96/book.png',
    description: 'Unlimited books and audiobooks',
    slug: 'scribd',
    category: 'Entertainment',
    features: ['Unlimited Books', 'Audiobooks', 'Magazines', 'Documents']
  },
  {
    id: 'primevideo',
    name: 'Prime Video',
    price: '$3.99',
    originalPrice: '$8.99',
    image: 'https://img.icons8.com/color/96/amazon-prime-video.png',
    description: 'Amazon streaming entertainment',
    slug: 'prime-video',
    category: 'Entertainment',
    features: ['4K Streaming', 'Download Offline', 'Multiple Devices', 'Prime Originals'],
    productId: 109
  },
  {
    id: 'prezi',
    name: 'Prezi',
    price: '$4.99',
    originalPrice: '$15.00',
    image: 'https://img.icons8.com/color/96/presentation.png',
    description: 'Dynamic presentation software',
    slug: 'prezi',
    category: 'Productivity',
    features: ['Presentations', 'Templates', 'Animation', 'Collaboration']
  },
  {
    id: 'epidemicsound',
    name: 'Epidemic Sound',
    price: '$4.99',
    originalPrice: '$15.00',
    image: 'https://img.icons8.com/color/96/music.png',
    description: 'Royalty-free music for creators',
    slug: 'epidemic-sound',
    category: 'Media',
    features: ['Royalty-Free Music', 'Sound Effects', 'Commercial License', 'Download']
  },
];

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find(tool => tool.slug === slug || tool.id === slug);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find(tool => tool.id === id);
}

export function getAllTools(): Tool[] {
  return tools;
}

