/**
 * 社交排行榜系统
 */

class LeaderboardService {
  constructor() {
    this.players = [];
    this.currentPlayer = null;
    this.friends = [];
  }

  getGlobalLeaderboard(limit = 100) {
    return this.players.slice(0, limit).map((player, index) => ({
      rank: index + 1,
      ...player
    }));
  }

  getMyRank() {
    if (!this.currentPlayer) return null;
    return this.players.findIndex(p => p.id === this.currentPlayer.id) + 1;
  }

  addFriend(friendId) {
    if (!this.friends.includes(friendId)) {
      this.friends.push(friendId);
      return true;
    }
    return false;
  }

  getFriendLeaderboard() {
    return this.players
      .filter(p => this.friends.includes(p.id))
      .map((player, index) => ({ rank: index + 1, ...player }));
  }
}

const leaderboardService = new LeaderboardService();
export default leaderboardService;
