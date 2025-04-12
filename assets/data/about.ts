export type Category = {
    title: string;
    content: string[];
};

export type About = Category[];

const data: About = [
    {
        title: 'Note from the Developer',
        content: ['Content Category 1']
    },
    {
        title: 'Note from the Developer 2',
        content: ['Content Category 1', 'Content Category 1']
    },
    {
        title: 'Note from the Developer 3',
        content: ['Content Category 1', 'Content Category 1', 'Content Category 1']
    },
    {
        title: 'Note from the Developer 4',
        content: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.']
    },
]

export default data;