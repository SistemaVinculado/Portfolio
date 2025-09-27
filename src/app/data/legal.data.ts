import { LegalContent } from '../models';

export const PRIVACY_POLICY: LegalContent = {
    title: 'Privacy Policy',
    lastUpdated: 'May 25, 2024',
    content: [
        { type: 'p', text: 'StellarDev Agency ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by StellarDev Agency.' },
        { type: 'h2', text: 'Information We Collect' },
        { type: 'p', text: 'We collect information you provide directly to us, such as when you fill out a contact form. This may include your name, email address, phone number, and any other information you choose to provide.' },
        { type: 'h2', text: 'Use of Information' },
        { type: 'p', text: 'We use the information we collect to respond to your inquiries, provide you with our services, and communicate with you about news and updates.' },
    ]
};

export const TERMS_OF_SERVICE: LegalContent = {
    title: 'Terms of Service',
    lastUpdated: 'May 25, 2024',
    content: [
        { type: 'p', text: 'Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the stellardev.agency website (the "Service") operated by StellarDev Agency ("us", "we", or "our").' },
        { type: 'h2', text: 'Accounts' },
        { type: 'p', text: 'When you create an account with us, you must provide us information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.' },
        { type: 'h2', text: 'Intellectual Property' },
        { type: 'p', text: 'The Service and its original content, features and functionality are and will remain the exclusive property of StellarDev Agency and its licensors.' },
    ]
};
