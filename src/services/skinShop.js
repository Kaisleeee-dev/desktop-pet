/**
 * 宠物皮肤商店
 */

const AVAILABLE_SKINS = [
  {
    id: 'default',
    name: '默认粉色',
    colors: { primary: '#FFB6C1', secondary: '#FF69B4' },
    price: 0,
    unlocked: true
  },
  {
    id: 'blue_cat',
    name: '蓝色猫咪',
    colors: { primary: '#87CEEB', secondary: '#4169E1' },
    price: 50,
    unlocked: false
  },
  {
    id: 'golden_puppy',
    name: '金色小狗',
    colors: { primary: '#FFD700', secondary: '#FFA500' },
    price: 100,
    unlocked: false
  },
  {
    id: 'princess',
    name: '公主礼服',
    colors: { primary: '#DDA0DD', secondary: '#8B008B' },
    price: 200,
    unlocked: false
  }
];

class SkinShop {
  constructor() {
    this.skins = AVAILABLE_SKINS;
    this.currentSkin = 'default';
    this.ownedSkins = ['default'];
    this.coins = 1000;
  }

  getAllSkins() {
    return this.skins.map(skin => ({
      ...skin,
      owned: this.ownedSkins.includes(skin.id),
      canAfford: this.coins >= skin.price
    }));
  }

  buySkin(skinId) {
    const skin = this.skins.find(s => s.id === skinId);
    if (!skin) return { success: false, message: '皮肤不存在' };
    if (this.ownedSkins.includes(skinId)) return { success: false, message: '已拥有' };
    if (this.coins < skin.price) return { success: false, message: '金币不足' };

    this.coins -= skin.price;
    this.ownedSkins.push(skinId);
    return { success: true, message: `成功购买 ${skin.name}!` };
  }

  getCurrentSkin() {
    return this.skins.find(s => s.id === this.currentSkin);
  }
}

const skinShop = new SkinShop();
export default skinShop;
