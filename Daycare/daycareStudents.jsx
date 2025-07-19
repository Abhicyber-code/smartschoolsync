const daycareStudents = [
    {
        id: 'S001',
        name: 'Aarav Patil',
        photo: 'https://randomuser.me/api/portraits/med/men/1.jpg',
        class: 'Nursery',
        division: 'A',
        age: 4,
        daycareStatus: 'IN',
        checkInTime: '02:45 PM',
        checkOutTime: null,
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:35 PM', checkOut: '05:15 PM' },
                { date: '2025-04-02', checkIn: '02:30 PM', checkOut: '05:00 PM' },
                { date: '2025-04-03', status: 'Absent' },
                { date: '2025-04-04', checkIn: '02:40 PM', checkOut: '05:10 PM' },
                { date: '2025-04-05', checkIn: '02:20 PM', checkOut: '05:05 PM' }
            ]
        }
    },
    {
        id: 'S002',
        name: 'Riya Deshmukh',
        photo: 'https://randomuser.me/api/portraits/med/women/2.jpg',
        class: 'KG-1',
        division: 'B',
        age: 5,
        daycareStatus: 'OUT',
        checkInTime: '02:40 PM',
        checkOutTime: '05:15 PM',
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:25 PM', checkOut: '05:00 PM' },
                { date: '2025-04-02', checkIn: '02:30 PM', checkOut: '05:05 PM' },
                { date: '2025-04-03', checkIn: '02:40 PM', checkOut: '05:15 PM' }
            ]
        }
    },
    {
        id: 'S003',
        name: 'Vedant Jadhav',
        photo: 'https://randomuser.me/api/portraits/med/men/3.jpg',
        class: 'Nursery',
        division: 'A',
        age: 4,
        daycareStatus: 'PENDING',
        checkInTime: null,
        checkOutTime: null,
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', status: 'Absent' },
                { date: '2025-04-02', status: 'Absent' },
                { date: '2025-04-03', checkIn: '02:50 PM', checkOut: '05:30 PM' }
            ]
        }
    },
    {
        id: 'S004',
        name: 'Ira Shinde',
        photo: 'https://randomuser.me/api/portraits/med/women/4.jpg',
        class: 'KG-2',
        division: 'A',
        age: 5,
        daycareStatus: 'IN',
        checkInTime: '03:00 PM',
        checkOutTime: null,
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:15 PM', checkOut: '05:05 PM' },
                { date: '2025-04-02', checkIn: '02:35 PM', checkOut: '05:10 PM' },
                { date: '2025-04-03', status: 'Absent' },
                { date: '2025-04-04', checkIn: '02:50 PM', checkOut: '05:20 PM' }
            ]
        }
    },
    {
        id: 'S005',
        name: 'Tanish Sawant',
        photo: 'https://randomuser.me/api/portraits/med/men/5.jpg',
        class: 'KG-1',
        division: 'B',
        age: 5,
        daycareStatus: 'OUT',
        checkInTime: '02:35 PM',
        checkOutTime: '05:05 PM',
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:45 PM', checkOut: '05:25 PM' },
                { date: '2025-04-02', checkIn: '02:50 PM', checkOut: '05:00 PM' },
                { date: '2025-04-03', checkIn: '02:35 PM', checkOut: '05:05 PM' }
            ]
        }
    },
    {
        id: 'S006',
        name: 'Anaya More',
        photo: 'https://randomuser.me/api/portraits/med/women/6.jpg',
        class: 'Nursery',
        division: 'C',
        age: 4,
        daycareStatus: 'IN',
        checkInTime: '02:50 PM',
        checkOutTime: null,
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:20 PM', checkOut: '05:00 PM' },
                { date: '2025-04-02', status: 'Absent' },
                { date: '2025-04-03', checkIn: '02:50 PM', checkOut: '05:30 PM' }
            ]
        }
    },
    {
        id: 'S007',
        name: 'Yash Kadam',
        photo: 'https://randomuser.me/api/portraits/med/men/7.jpg',
        class: 'KG-2',
        division: 'A',
        age: 6,
        daycareStatus: 'OUT',
        checkInTime: '02:25 PM',
        checkOutTime: '05:20 PM',
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:10 PM', checkOut: '05:10 PM' },
                { date: '2025-04-02', checkIn: '02:30 PM', checkOut: '05:25 PM' },
                { date: '2025-04-03', checkIn: '02:25 PM', checkOut: '05:20 PM' }
            ]
        }
    },
    {
        id: 'S008',
        name: 'Mira Kulkarni',
        photo: 'https://randomuser.me/api/portraits/med/women/8.jpg',
        class: 'KG-1',
        division: 'C',
        age: 5,
        daycareStatus: 'PENDING',
        checkInTime: null,
        checkOutTime: null,
        daycareHistory: {
            from: '2025-04-01',
            to: '2025-04-10',
            records: [
                { date: '2025-04-01', checkIn: '02:30 PM', checkOut: '05:10 PM' },
                { date: '2025-04-02', checkIn: '02:45 PM', checkOut: '05:20 PM' },
                { date: '2025-04-03', status: 'Absent' }
            ]
        }
    }
];

export default daycareStudents;
