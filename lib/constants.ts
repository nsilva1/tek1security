import {
  HandshakeIcon,
  TrendingUp,
  MessageCircleIcon,
  Shield,
  List,
  File,
  PieChart,
  Users2,
  Wallet,
  Badge,
  MapPin,
  Bell,
  Cloud,
  Headphones,
} from 'lucide-react';

export const navbar_items = [
  {
    title: 'Features',
    href: '/features',
  },
  {
    title: 'Pricing',
    href: '/pricing',
  },
  {
    title: 'Testimonials',
    href: '/testimonials',
  },
  {
    title: 'FAQs',
    href: '/faqs',
  },
  {
    title: 'Contact Us',
    href: '/contact',
  },
];

export const why_tek1 = [
  {
    icon: HandshakeIcon,
    title: 'Enhanced Accountability',
    description:
      'Real-time GPS tracking and verifiable clock-ins ensure your guards are where they need to be, when they need to be.',
  },
  {
    icon: TrendingUp,
    title: 'Operational Efficiency',
    description:
      'Automate shift scheduling, payroll, and report generation, saving hours of administrative work.',
  },
  {
    icon: MessageCircleIcon,
    title: 'Seamless Communication',
    description:
      'Instant incident alerts and a dedicated client portal foster better communication and client satisfaction.',
  },
  {
    icon: Shield,
    title: 'Compliance & Security',
    description:
      'Easily manage guard certifications, training records, and maintain robust data security for sensitive information.',
  },
];

export const tek1_features = [
  {
    icon: List,
    title: 'Workforce & Shift Management',
    description:
      'Simplify security guard scheduling, assignment, and attendance monitoring. Ensure optimal staffing for every client site in Lagos.',
  },
  {
    icon: File,
    title: 'Real-time Incident Reporting',
    description:
      'Guards can submit detailed incident reports with photos and videos directly from their devices, enabling rapid response.',
  },
  {
    icon: PieChart,
    title: 'Admin & Supervisor Dashboards',
    description:
      'Gain a comprehensive overview of operations, track key performance indicators, and manage your security teams efficiently.',
  },
  {
    icon: Users2,
    title: 'Dedicated Client Portal',
    description:
      'Provide transparency to your clients with secure access to patrol logs, incident reports, and billing information.',
  },
  {
    icon: Wallet,
    title: 'Automated Payroll & Invoicing',
    description:
      'Streamline your financial processes with accurate security payroll calculation and customizable client invoicing.',
  },
  {
    icon: Badge,
    title: 'Guard Compliance Tracking',
    description:
      'Keep all guard certifications and training records up-to-date, minimizing risks and ensuring regulatory adherence.',
  },
  {
    icon: MapPin,
    title: 'Advanced Patrol Monitoring',
    description:
      'Utilize GPS patrol monitoring to ensure guards complete their rounds and maintain safety at client locations in Ikorodu and beyond.',
  },
];

export const tek1_full_features = [
  ...tek1_features,
  {
    icon: Bell,
    title: 'Instant Alerts & Notifications',
    description:
      'Receive real-time alerts for incidents, guard clock-ins/outs, and critical events. Customize notification preferences for supervisors, clients, and relevant personnel.',
  },
  {
    icon: Cloud,
    title: 'Cloud-Based Infrastructure',
    description:
      'Access your security management platform anytime, anywhere, from any device. Our secure cloud infrastructure ensures data integrity and availability.',
  },
  {
    icon: Headphones,
    title: '24/7 Support & Training',
    description:
      'Benefit from dedicated customer support and comprehensive training resources. Our team is here to ensure a smooth onboarding and ongoing success with TEK1SECURITY.',
  },
];

export const short_testimonials = [
  {
    name: 'Mr. Kunle Adebayo',
    role: 'Operations Manager, Secure Guard Solutions',
    content:
      'TEK1SECURITY has transformed our security operations. The platform is intuitive, reliable, and has helped us improve our service delivery.',
  },
  {
    name: 'Mrs. Bimbo Okoro',
    role: 'CEO, Eagle Eye Security Services',
    content:
      'The automated payroll and invoicing features have saved us countless hours. Our clients love the transparency of the client portal.',
  },
];

export const full_testimonials = [
  ...short_testimonials,
  {
    name: 'Mr. Chidozie Eze',
    role: 'Director, Vanguard Security Services',
    content:
      "We've seen a 30% increase in operational efficiency since implementing TEK1SECURITY. The centralized data and instant communication features are game-changers for our large team across different states.",
  },
  {
    name: 'Ms. Fatima Bello',
    role: 'Client Relations Manager, Royal Shield Security',
    content:
      'The client portal is fantastic! Our clients love the transparency and ease of accessing reports. It has greatly improved our client relationships and retention.',
  },
  {
    name: 'Mr. David Olatunji',
    role: 'Founder, Sentinel Guarding Services',
    content:
      'As a startup, managing guards and reports manually was overwhelming. TEK1SECURITY provided an affordable and intuitive solution that allowed us to scale quickly and professionally.',
  },
  {
    name: 'Mrs. Ngozi Emeka',
    role: 'HR Manager, Platinum Guards Ltd',
    content:
      'The support team is incredibly responsive and helpful. Any questions we had were addressed promptly, making the transition to TEK1SECURITY seamless.',
  },
];

export const short_faqs = [
  {
    question:
      'Is TEK1SECURITY suitable for small security companies in Nigeria?',
    answer:
      'Yes, TEK1SECURITY is designed to scale for businesses of all sizes, from startups to large enterprises. Our tiered pricing plans make it accessible for diverse operational needs.',
  },
  {
    question: 'How does the incident reporting work?',
    answer:
      'Security guards can report incidents instantly via their web interface, including descriptions, severity, and photo/video attachments. Admins and supervisors receive immediate alerts and can review reports centrally.',
  },
  {
    question: 'Can clients access their reports and invoices?',
    answer:
      'Absolutely! Our dedicated Client Portal allows your clients to securely view patrol logs, incident reports, and invoices, fostering transparency and trust.',
  },
];

export const full_faqs = [
  ...short_faqs,
  {
    question: 'What is TEK1SECURITY?',
    answer:
      'TEK1SECURITY is a modern security management software designed to help security companies in Nigeria streamline their operations, including guard management, incident reporting, payroll, and client communication.',
  },
  {
    question: 'Does the platform include guard tracking?',
    answer:
      'Yes, our Professional and Enterprise plans include advanced GPS patrol monitoring. This allows you to track guard locations in real-time, verify patrol routes, set up geofences, and receive alerts for deviations, ensuring optimal accountability and safety.',
  },
  {
    question: 'How is payroll handled?',
    answer:
      'TEK1SECURITY offers automated payroll calculations based on recorded shifts and attendance. This feature simplifies the process of paying your security personnel accurately and on time, reducing manual errors and saving significant administrative hours.',
  },
  {
    question: "Is my company's data secure with TEK1SECURITY?",
    answer:
      'Data security is a top priority. We utilize robust encryption, secure cloud infrastructure, and adhere to industry best practices to protect all sensitive information. Regular backups and access controls are in place to ensure data integrity and confidentiality.',
  },
  {
    question: 'What kind of support do you offer?',
    answer:
      'We offer comprehensive support to ensure your success. Our Basic plan includes email support, while Professional and Enterprise plans offer priority email and phone support, with Enterprise clients receiving 24/7 premium support and a dedicated account manager. We also provide extensive training resources.',
  },
  {
    question: 'Can I customize the platform to fit my specific needs?',
    answer:
      'The Enterprise plan offers customizable modules and API integrations, allowing us to tailor the platform to your unique operational workflows and integrate with your existing systems. Contact our sales team to discuss your specific requirements.',
  },
];

export const pricing_plans = [
  {
    title: 'Basic Plan',
    monthly_price: '25,000',
    yearly_price: '250,000',
    features: [
      'Up to 20 Guards',
      'Standard Guard Management',
      'Incident Reporting (Basic)',
      'Daily Patrol Logs',
      'Email Support',
    ],
  },
  {
    title: 'Professional Plan',
    monthly_price: '50,000',
    yearly_price: '500,000',
    features: [
      'Up to 100 Guards',
      'Advanced Guard Management',
      'Real-time Incident Reporting',
      'Detailed Patrol Monitoring (GPS)',
      'Dedicated Client Portal',
      'Automated Payroll & Invoicing',
      'Priority Email & Phone Support',
    ],
  },
  {
    title: 'Enterprise Plan',
    monthly_price: 'Custom',
    yearly_price: 'Custom',
    features: [
      'Unlimited Guards',
      'Customizable Modules',
      'Advanced Analytics & Reporting',
      'API Integrations',
      'Dedicated Account Manager',
      'On-site Training & Support',
      '24/7 Premium Support',
    ],
  },
];

export const plan_features = {
  basic: {
    title: 'Basic',
    features: {
      'Guard Management': true,
      'Real-time Incident Reporting': false,
      'GPS Patrol Tracking': false,
      'Client Portal': false,
      'Automated Payroll': false,
      Invoicing: false,
      'Guard Compliance Tracking': true,
      'Advanced Analytics': false,
      'Custom Integration': false,
      'Dedicated Account Manager': false,
      'Support Level': 'Email',
    },
  },
  professional: {
    title: 'Professional',
    features: {
      'Guard Management': true,
      'Real-time Incident Reporting': true,
      'GPS Patrol Tracking': true,
      'Client Portal': true,
      'Automated Payroll': true,
      Invoicing: true,
      'Guard Compliance Tracking': true,
      'Advanced Analytics': false,
      'Custom Integration': false,
      'Dedicated Account Manager': false,
      'Support Level': 'Priority Email & Phone',
    },
  },
  enterprise: {
    title: 'Enterprise',
    features: {
      'Guard Management': true,
      'Real-time Incident Reporting': true,
      'GPS Patrol Tracking': true,
      'Client Portal': true,
      'Automated Payroll': true,
      Invoicing: true,
      'Guard Compliance Tracking': true,
      'Advanced Analytics': true,
      'Custom Integration': true,
      'Dedicated Account Manager': true,
      'Support Level': '24/7 Premium Support',
    },
  },
};
