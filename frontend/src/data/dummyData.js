export const generateTeamData = () => {
    const teams = [
        "Team Soul", "GodLike", "TSM", "Hydra", "Orangutan", "Gladiators", "Revenant", "Entity",
        "8Bit", "Global Esports", "Blind", "XSpark", "iNSANE", "Medal", "Chemin", "Rivalry"
    ];
    let data = teams.map((name, index) => ({
        id: index + 1,
        name,
        logo: `https://placehold.co/40x40/${Math.floor(Math.random()*16777215).toString(16)}/FFFFFF?text=${name.charAt(0)}`,
        players: 4,
        kills: Math.floor(Math.random() * 10),
        placement_points: 0,
    }));
    
    // Simulate some teams being eliminated
    for(let i = 0; i < 6; i++) {
        const teamIndex = Math.floor(Math.random() * data.length);
        if (data[teamIndex].players > 0) {
            data[teamIndex].players = 0;
        }
    }
    
    // Assign placement points based on survival
    let placementPointsMap = {1:15, 2:12, 3:10, 4:8, 5:6, 6:4, 7:2, 8:1, 9:1, 10:1};
    
    data.filter(t => t.players > 0)
       .sort(() => 0.5 - Math.random()) // Randomize alive teams order for points
       .forEach((team, index) => {
           team.placement_points = placementPointsMap[index + 1] || 0;
       });

    data.forEach(team => {
        team.total_points = team.placement_points + team.kills;
    });

    // Sort by total points for ranking
    data.sort((a, b) => b.total_points - a.total_points);
    
    return data.map((team, index) => ({...team, rank: index + 1}));
};

export const dummyTournaments = [
    { id: 1, title: 'BGMI Pro Series S3', date: '2025-08-15', prize: 5000000, image: 'https://wallpaperaccess.com/full/8982706.jpg' },
    { id: 3, title: 'The Grind: BGMI', date: '2025-09-01', prize: 500000, image: 'https://images.unsplash.com/photo-1542751371-65965486a573?auto=format&fit=crop&w=1000&q=80' }
];