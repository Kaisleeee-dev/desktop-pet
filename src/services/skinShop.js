/**
 * 宠物皮肤商店
 * 管理皮肤库存和购买
 */

const AVAILABLE_SKINS = [
  {
    id: 'default',
    name: '默认粉色',
    description: '经典的粉色小萌宠',
    colors: {
      primary: '#FFB6C1',
      secondary: '#FF69B4'
    },
    price: 0,
    unlocked: true,
    icon: '🐾'
  },
  {
    id: 'blue_cat',
    name: '蓝色猫咪',
    description: '可爱的蓝色小猫',
    colors: {
      primary: '#87CEEB',
      secondary: '#4169E1'
    },
    price: 50,
    unlocked: false,
    icon: '🐱'
  },
  {
    id: 'golden_puppy',
    name: '金色小狗',
    description: '闪闪发光的金色小狗',
    colors: {
      primary: '#FFD700',
      secondary: '#FFA500'
    },
    price: 100,
    unlocked: false,
    icon: '🐕'
  },
  {
    id: 'rainbow',
    name: '彩虹独角兽',
    description: '梦幻的彩虹色独角兽',
    colors: {
      primary: '#FF6B9D',
      secondary: '#C44569'
    },
    price: 500,
    unlocked: false,
    icon: '🦄',
    special: true
  },
  {
    id: 'princess',
    name: '公主礼服',
    description: '华丽的紫色公主装',
    colors: {
      primary: '#DDA0DD',
      secondary: '#8B008B'
    },
    price: 200,
    unlocked: false,
    icon: '👑'
  },
  {
    id: 'space_cat',
    name: '太空猫咪',
    description: '星际探险家小猫',
    colors: {
      primary: '#191970',
      secondary: '#00CED1'
    },
    price: 300,
    unlocked: false,
    icon: '🚀',
    special: true
  }
];

class SkinShop {
  constructor() {
    this.skins = AVAILABLE_SKINS;
    this.currentSkin = 'default';
    this.ownedSkins = ['default'];
    this.coins = 0;
  }

  /**
   * 获取所有皮肤
   */
  getAllSkins() {
    return this.skins.map(skin => ({
      ...skin,
      owned: this.ownedSkins.includes(skin.id),
      canAfford: this.coins >= skin.price
    }));
  }

  /**
   * 购买皮肤
   */
  buySkin(skinId) {
    const skin = this.skins.find(s => s.id === skinId);
    if (!skin) {
      return { success: false, message: '皮肤不存在' };
    }

    if (this.ownedSkins.includes(skinId)) {
      return { success: false, message: '你已经拥有这个皮肤' };
    }

    if (this.coins < skin.price) {
      return { success: false, message: '金币不足' };
    }

    this.coins -= skin.price;
    this.ownedSkins.push(skinId);

    return { success: true, message: `成功购买 ${skin.name}!` };
  }

  /**
   * 装备皮肤
   */
  equipSkin(skinId) {
    if (!this.ownedSkins.includes(skinId)) {
      return { success: false, message: '你还没有这个皮肤' };
    }

    this.currentSkin = skinId;
    return { success: true, message: '皮肤已更换' };
  }

  /**
   * 获取当前皮肤
   */
  getCurrentSkin() {
    return this.skins.find(s => s.id === this.currentSkin);
  }

  /**
   * 获取拥有的皮肤
   */
  getOwnedSkins() {
    return this.skins.filter(s => this.ownedSkins.includes(s.id));
  }

  /**
   * 增加金币
   */
  addCoins(amount) {
    this.coins += amount;
  }

  /**
   * 获取金币
   */
  getCoins() {
    return this.coins;
  }
}

const skinShop = new SkinShop();
export default skinShop;
export { AVAILABLE_SKINS };
