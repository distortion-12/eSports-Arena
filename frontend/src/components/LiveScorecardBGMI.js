import React from 'react';
import './components.css';

const LiveScorecardBGMI = ({ teamsData }) => {
    const totalPlayers = teamsData.length * 4;
    const playersAlive = teamsData.reduce((sum, team) => sum + team.players, 0);

    return (
        <div className="live-scorecard-bgmi glass">
            <div className="scorecard-content">
                <div className="scorecard-header">
                    <div className="match-title">
                        <span className="live-tag">● LIVE</span>
                        <h3>BGMI Pro Series Finals</h3>
                        <p>Map: Erangel - Match 5 of 12</p>
                    </div>
                    <div className="match-stats">
                        <div className="stat-item"><div className="value">{playersAlive}/{totalPlayers}</div><div className="label">PLAYERS</div></div>
                        <div className="stat-item"><div className="value">#5</div><div className="label">CIRCLE</div></div>
                    </div>
                </div>
                <div style={{ overflowX: 'auto' }}>
                    <table className="live-standings-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Team</th>
                                <th>Kills</th>
                                <th>Alive</th>
                                <th>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamsData.map(team => (
                                <tr key={team.id} style={{ opacity: team.players === 0 ? 0.5 : 1 }}>
                                    <td className="rank-cell">{team.rank}</td>
                                    <td className="team-name-cell">
                                        <img src={team.logo} alt={team.name} />
                                        <span>{team.name}</span>
                                    </td>
                                    <td style={{textAlign: 'center'}}>{team.kills}</td>
                                    <td style={{textAlign: 'center'}}>{team.players}</td>
                                    <td className="points-cell">{team.total_points}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default LiveScorecardBGMI;