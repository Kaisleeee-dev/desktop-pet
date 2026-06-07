/**
 * 社交排行榜系统
 * 支持好友、排行榜和成就
 */

class LeaderboardService {
  constructor() {
    this.players = [];
    this.currentPlayer = null;
    this.friends = [];
    this.achievements = [];
  }

  /**
   * 设置当前玩家
   */
  setCurrentPlayer(player) {
    this.currentPlayer = player;
  }

  /**
   * 更新玩家数据
   */
  updatePlayerData(playerId, data) {
    const player = this.players.find(p => p.id === playerId);
    if (player) {
      Object.assign(player, data);
      this.sortLeaderboard();
    }
  }

  /**
   * 获取全球排行榜
   */
  getGlobalLeaderboard(limit = 100) {
    return this.players.slice(0, limit).map((player, index) => ({
      rank: index + 1,
      ...player
    }));
  }

  /**
   * 获取我的排名
   */
  getMyRank() {
    if (!this.currentPlayer) return null;
    const rank = this.players.findIndex(p => p.id === this.currentPlayer.id) + 1;
    return rank;
  }

  /**
   * 获取排行榜信息
   */
  getLeaderboardInfo() {
    const myRank = this.getMyRank();
    const total = this.players.length;

    return {
      myRank,
      total,
      percentile: ((total - myRank + 1) / total * 100).toFixed(2)
    };
  }

  /**
   * 排序排行榜（按等级和经验）
   */
  sortLeaderboard() {
    this.players.sort((a, b) => {
      if (b.level !== a.level) {
        return b.level - a.level;
      }
      return b.experience - a.experience;
    });
  }

  /**
   * 添加好友
   */
  addFriend(friendId) {
    if (!this.friends.includes(friendId)) {
      this.friends.push(friendId);
      return true;
    }
    return false;
  }

  /**
   * 移除好友
   */
  removeFriend(friendId) {
    const index = this.friends.indexOf(friendId);
    if (index > -1) {
      this.friends.splice(index, 1);
      return true;
    }
    return false;
  }

  /**
   * 获取好友排行榜
   */
  getFriendLeaderboard() {
    return this.players
      .filter(p => this.friends.includes(p.id))
      .map((player, index) => ({
        rank: index + 1,
        ...player
      }));
  }

  /**
   * 检查成就
   */
  checkAchievements(playerData) {
    const unlockedAchievements = [];

    // 等级成就
    if (playerData.level >= 10 && !this.achievements.find(a => a.id === 'level_10')) {
      unlockedAchievements.push(this.getAchievement('level_10'));
    }
    if (playerData.level >= 50 && !this.achievements.find(a => a.id === 'level_50')) {
      unlockedAchievements.push(this.getAchievement('level_50'));
    }

    // 经验成就
    if (playerData.experience >= 1000 && !this.achievements.find(a => a.id === 'exp_1000')) {
      unlockedAchievements.push(this.getAchievement('exp_1000'));
    }

    // 社交成就
    if (this.friends.length >= 10 && !this.achievements.find(a => a.id === 'social_10')) {
      unlockedAchievements.push(this.getAchievement('social_10'));
    }

    // 互动成就
    if (playerData.totalInteractions >= 100) {
      unlockedAchievements.push(this.getAchievement('interact_100'));
    }

    return unlockedAchievements;
  }

  /**
   * 获取成就
   */
  getAchievement(id) {
    const achievementMap = {
      level_10: { id: 'level_10', name: '入门玩家', description: '达到等级 10', icon: '🌟', reward: 100 },
      level_50: { id: 'level_50', name: '资深玩家', description: '达到等级 50', icon: '⭐', reward: 500 },
      exp_1000: { id: 'exp_1000', name: '经验丰富', description: '累计获得 1000 经验', icon: '📚', reward: 200 },
      social_10: { id: 'social_10', name: '社交达人', description: '添加 10 位好友', icon: '👥', reward: 300 },
      interact_100: { id: 'interact_100', name: '互动王', description: '完成 100 次互动', icon: '🎉', reward: 150 }
    };

    return achievementMap[id];
  }

  /**
   * 获取所有成就
   */
  getAllAchievements() {
    return this.achievements;
  }
}

const leaderboardService = new LeaderboardService();
export default leaderboardService;
