const products = [
  // Women's Shoes (6 items)
  {
    id: "w1",
    name: "Aura Crimson Stiletto",
    category: "womens",
    price: 4800,
    originalPrice: 5800,
    image: "assets/images/women_1.png",
    isNew: true,
    isPopular: true,
    description: "極致優雅的緋紅皮革高跟鞋，專為現代自信女性打造。精選頂級小牛皮，結合經典細高跟設計與符合人體工學的足弓支撐，展現迷人線條同時確保穿著舒適度。",
    specs: {
      "鞋面材質": "頂級進口小牛皮",
      "內裡材質": "透氣真皮襯裡",
      "鞋底材質": "防滑耐磨橡膠大底",
      "跟高": "8.5 cm",
      "顏色": "緋紅色 / 經典黑",
      "產地": "義大利工坊手工製作"
    }
  },
  {
    id: "w2",
    name: "Bubblegum Chunky Sneaker",
    category: "womens",
    price: 3600,
    image: "assets/images/women_2.png",
    isNew: true,
    isPopular: true,
    description: "粉嫩夢幻配色結合復古厚底老爹鞋廓形。高質感麂皮拼接透氣網布，增高顯瘦的同時提供極佳的避震緩衝，是街頭時尚與休閒穿搭的完美首選。",
    specs: {
      "鞋面材質": "高質感反毛麂皮 + 科技飛織網布",
      "內裡材質": "親膚吸汗棉質網布",
      "鞋底材質": "輕量高彈性 EVA + 橡膠貼片",
      "鞋跟高度": "5 cm",
      "顏色": "泡泡糖粉 / 奶茶色",
      "產地": "越南"
    }
  },
  {
    id: "w3",
    name: "Classic Buckle Ankle Boot",
    category: "womens",
    price: 5200,
    image: "assets/images/women_3.png",
    isNew: false,
    isPopular: true,
    description: "經典英倫風皮革短靴，搭配精緻金屬側扣。流線型鞋身搭配微粗中跟，完美修飾腿部線條，無論搭配牛仔褲或長裙，皆能展現率性優雅氣質。",
    specs: {
      "鞋面材質": "優質牛皮",
      "內裡材質": "保暖超細纖維襯裡",
      "鞋底材質": "高耐磨橡膠防滑大底",
      "跟高": "4 cm",
      "顏色": "曜石黑 / 深焦糖色",
      "產地": "西班牙"
    }
  },
  {
    id: "w4",
    name: "Minimalist Strappy Sandal",
    category: "womens",
    price: 2800,
    image: "assets/images/women_4.png",
    isNew: false,
    isPopular: false,
    description: "夏日必備的極簡細帶涼鞋。以柔軟白色皮革編織出簡約交錯線條，平底設計輕盈好走，為您的度假或日常穿搭注入一股悠閒的法式浪漫。",
    specs: {
      "鞋面材質": "柔軟羊皮",
      "中底設計": "微加厚減壓真皮墊",
      "鞋底材質": "耐磨複合大底",
      "跟高": "1.5 cm",
      "顏色": "極簡白 / 焦糖棕",
      "產地": "台灣手工鞋工坊"
    }
  },
  {
    id: "w5",
    name: "Suede Comfort Moccasin",
    category: "womens",
    price: 3200,
    image: "assets/images/women_5.png",
    isNew: false,
    isPopular: false,
    description: "極致舒適的莫卡辛平底鞋。柔軟的燕麥色麂皮溫柔包覆雙腳，純手工縫線工藝，搭配經典蝴蝶結點綴，為日常通勤帶來無重力般的穿著體驗。",
    specs: {
      "鞋面材質": "頂級磨砂麂皮",
      "內裡材質": "吸濕透氣真皮中底",
      "鞋底材質": "經典豆豆橡膠大底",
      "跟高": "1 cm",
      "顏色": "燕麥暖白 / 經典灰 / 海軍藍",
      "產地": "葡萄牙"
    }
  },
  {
    id: "w6",
    name: "Polaris Tech Runner",
    category: "womens",
    price: 4200,
    image: "assets/images/women_6.png",
    isNew: true,
    isPopular: false,
    description: "專為女性慢跑與高強度訓練設計的極光科技跑鞋。採用漸層紫綠中底，搭載全新高回彈緩震科技與輕量編織鞋面，帶給您推進力十足的暢快跑感。",
    specs: {
      "鞋面材質": "一體成型工程透氣網布",
      "中底科技": "Responsive-Gel 緩震科技",
      "鞋底材質": "全掌耐磨防滑橡膠",
      "重量": "210g (單腳尺寸24)",
      "顏色": "極光漸層 / 時尚黑白",
      "產地": "印尼"
    }
  },

  // Men's Shoes (6 items)
  {
    id: "m1",
    name: "Heritage Brogue Oxford",
    category: "mens",
    price: 6200,
    originalPrice: 7500,
    image: "assets/images/men_1.png",
    isNew: false,
    isPopular: true,
    description: "承襲百年英倫製鞋工藝的經典德比雕花皮鞋。選用頂級焦糖色牛皮，鞋面佈滿精緻翼紋雕花（Brogueing），經過職人手工拋光上蠟，呈現豐富有層次的典雅色澤。",
    specs: {
      "鞋面材質": "嚴選全粒面小牛皮",
      "製鞋工藝": "固特異沿條製法 (Goodyear Welted)",
      "內裡材質": "全真皮吸汗內裡",
      "鞋底材質": "高硬度紳士皮革大底 + 防滑橡膠半掌",
      "顏色": "復古焦糖棕 / 曜石黑",
      "產地": "英國工坊設計監製"
    }
  },
  {
    id: "m2",
    name: "Urban Minimalist Sneaker",
    category: "mens",
    price: 3900,
    image: "assets/images/men_2.png",
    isNew: true,
    isPopular: true,
    description: "極簡美學代表作。乾淨純白的高級牛皮鞋身，省略多餘花俏設計，線條洗練流暢。不管是休閒牛仔褲或是正式西裝，都能完美融入，詮釋低調奢華的都會風格。",
    specs: {
      "鞋面材質": "義大利進口軟牛皮",
      "內裡材質": "柔軟牛皮內裡",
      "鞋底材質": "一體成型耐磨防滑橡膠杯底",
      "鞋帶": "純棉上蠟扁平鞋帶",
      "顏色": "極簡白 / 極致黑",
      "產地": "義大利"
    }
  },
  {
    id: "m3",
    name: "Rugged Suede Work Boot",
    category: "mens",
    price: 4900,
    image: "assets/images/men_3.png",
    isNew: false,
    isPopular: false,
    description: "硬派工裝風高筒麂皮靴。採用耐磨防潑水麂皮，搭配雙重縫線加固與厚實生膠齒狀大底，提供絕佳的抓地力與支撐保護，讓您從容應對各種地貌與天候。",
    specs: {
      "鞋面材質": "防潑水處理麂皮",
      "內裡材質": "耐磨織物內裡 + 緩震中底",
      "鞋底材質": "重裝凹槽防滑生膠大底",
      "筒高": "6 吋",
      "顏色": "經典沙色 / 工裝深棕",
      "產地": "台灣"
    }
  },
  {
    id: "m4",
    name: "Westminster Tassel Loafer",
    category: "mens",
    price: 5500,
    image: "assets/images/men_4.png",
    isNew: false,
    isPopular: true,
    description: "英倫雅痞必備的流蘇樂福鞋。精選深咖啡色擦色皮革，手作編織皮革滾邊與精緻小流蘇，無鞋帶設計便於穿脫，為正式與半正式裝扮增添隨興優雅。",
    specs: {
      "鞋面材質": "擦色軟牛皮",
      "內裡材質": "全真皮鞋墊與內襯",
      "鞋底材質": "耐磨木質防滑橡膠複合大底",
      "顏色": "雅痞深棕 / 經典亮黑",
      "產地": "泰國職人工坊"
    }
  },
  {
    id: "m5",
    name: "Veloce Carbon Runner",
    category: "mens",
    price: 4800,
    image: "assets/images/men_5.png",
    isNew: true,
    isPopular: false,
    description: "碳纖維推進科技跑鞋。黑橘前衛配色，鞋面採用極輕量編織網布，中底內嵌全掌型碳纖維板，每一次起跑均能提供澎湃的反彈回饋，助您突破個人最佳成績。",
    specs: {
      "鞋面材質": "Mono-Mesh 單絲透氣網布",
      "中底科技": "Carbon-Drive 全掌碳板 + Zoom-Fly 泡沫",
      "鞋底材質": "耐磨抓地配方橡膠",
      "重量": "235g (單腳尺寸27)",
      "顏色": "黑橘競速 / 螢光綠",
      "產地": "越南"
    }
  },
  {
    id: "m6",
    name: "Tactical Adventure Sandal",
    category: "mens",
    price: 2900,
    image: "assets/images/men_6.png",
    isNew: false,
    isPopular: false,
    description: "專為戶外探險與溪流溯溪打造的機能防滑涼鞋。軍綠織帶搭配快速調整插扣，親水快乾材質，大底凹槽防滑性能強悍，提供極佳的戶外足部防護。",
    specs: {
      "織帶材質": "高強度快乾尼龍織帶",
      "中底": "人體工學 EVA 減壓足弓墊",
      "鞋底材質": "Wet-Grip 濕地抓地防滑橡膠",
      "顏色": "軍綠色 / 戰術曜黑",
      "產地": "中國"
    }
  },

  // Accessories (4 items)
  {
    id: "a1",
    name: "Premium Combed Cotton Socks Set",
    category: "accessories",
    price: 880,
    image: "assets/images/acc_1.png",
    isNew: false,
    isPopular: true,
    description: "精選長絨精梳棉製成的中筒襪五入組。質地細緻、吸濕透氣性優異，腳底加厚圈織有效減緩行走壓力，束口高彈防滑不勒腳，男女皆適用。",
    specs: {
      "材質": "82% 精梳棉、15% 聚酯纖維、3% 彈性纖維",
      "包裝規格": "五雙裝 (灰、深藍、炭黑、淺灰、藏青)",
      "尺碼": "均碼 (適合腳長 24 - 28cm)",
      "產地": "日本"
    }
  },
  {
    id: "a2",
    name: "Ultimate Leather Care Kit",
    category: "accessories",
    price: 1280,
    image: "assets/images/acc_2.png",
    isNew: true,
    isPopular: true,
    description: "品牌專屬奢華鞋履護理木盒套裝。包含天然馬毛鞋刷、高級無色滋潤鞋膏、拋光抹布等，全方位呵護您的愛鞋，重現亮麗皮革光澤並延長鞋履壽命。",
    specs: {
      "木盒材質": "天然胡桃木",
      "套裝內容": "馬毛鞋刷*1、無色皮革滋養霜(50ml)*1、純棉雙面拋光布*1",
      "適用材質": "光面牛皮、羊皮等真皮材質 (不適用麂皮與磨砂皮)",
      "產地": "德國監製"
    }
  },
  {
    id: "a3",
    name: "Waxed Cotton Laces with Gold Metal Aglets",
    category: "accessories",
    price: 350,
    image: "assets/images/acc_3.png",
    isNew: false,
    isPopular: false,
    description: "高密編織純棉上蠟鞋帶。金屬頭採用 18K 鍍金防鏽質感塗層，微光澤蠟質保護層防污防潑水，結實耐用不易鬆脫，為您的皮鞋或運動鞋點綴尊榮細節。",
    specs: {
      "材質": "100% 精梳純棉 + 蠟質保護層",
      "鞋帶頭": "合金高質感鍍金金屬頭",
      "長度": "120 cm (適合 5 - 7 穿線孔)",
      "規格": "扁平型 / 圓線型",
      "產地": "台灣"
    }
  },
  {
    id: "a4",
    name: "Ergonomic Memory Foam Insoles",
    category: "accessories",
    price: 590,
    image: "assets/images/acc_4.png",
    isNew: false,
    isPopular: false,
    description: "人體工學蜂巢記憶棉減壓鞋墊。採用高彈性記憶棉，結合後跟藍色高科技吸震凝膠，有效分散足底壓力，蜂巢狀透氣孔結構，排汗防臭，讓每一步都像踩在雲朵上。",
    specs: {
      "主要材質": "慢回彈記憶棉 + 減震 Gel 凝膠 + BK 透氣布",
      "功能": "吸震減壓、足弓支撐、防霉防臭",
      "規格": "可裁剪式設計 (男款: L, 女款: M)",
      "產地": "韓國"
    }
  }
];

// Provide global access in browser environment
if (typeof window !== 'undefined') {
  window.productsData = products;
}
