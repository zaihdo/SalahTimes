export type Category = {
    title: string;
    content: string[];
};

export type About = Category[];

const data: About = [
    {
        title: 'About SalahTimes',
        content: [
            'SalahTimes is a comprehensive prayer time application designed to help Muslims keep track of their daily prayers. The app provides accurate prayer times based on your location and preferred calculation method.',
            'Our mission is to make it easier for Muslims around the world to fulfill their religious obligations by providing reliable prayer times and useful features in a beautiful, easy-to-use interface.'
        ]
    },
    {
        title: 'Features',
        content: [
            '• Accurate prayer times based on your location',
            '• Multiple calculation methods (MWL, ISNA, Egypt, Makkah, Karachi)',
            '• Notifications for prayer times',
            '• Qibla direction finder',
            '• Hijri calendar',
            '• Beautiful and intuitive interface',
            '• Dark mode support',
            '• Works offline'
        ]
    },
    {
        title: 'How to Use',
        content: [
            '1. Allow location access for accurate prayer times',
            '2. Select your preferred calculation method in Settings',
            '3. Enable notifications if you want to be reminded of prayer times',
            '4. Use the Qibla finder to determine the direction of prayer',
            '5. Explore the Hijri calendar for important Islamic dates'
        ]
    },
    {
        title: 'Privacy Policy',
        content: [
            'At SalahTimes, we take your privacy seriously. We only collect the minimum amount of data necessary to provide you with accurate prayer times.',
            'Location data: We use your location to calculate accurate prayer times for your area. This data is processed on your device and is not shared with any third parties.',
            'We do not collect any personal information or track your usage of the app. We believe your religious practices are private and should remain that way.',
            'If you have any questions or concerns about our privacy practices, please contact us at privacy@salahtimes.app.'
        ]
    },
    {
        title: 'Note from the Developer',
        content: [
            'As-salamu alaykum (Peace be upon you),',
            'Thank you for using SalahTimes! This app was created with the intention of making it easier for Muslims to keep track of their daily prayers. I hope it serves as a beneficial tool in your spiritual journey.',
            'If you have any suggestions, feedback, or encounter any issues, please don\'t hesitate to reach out. Your input is valuable and helps improve the app for everyone.',
            'May Allah accept our prayers and good deeds.',
            'Jazak Allah Khair (May Allah reward you with goodness).'
        ]
    }
]

export default data;
