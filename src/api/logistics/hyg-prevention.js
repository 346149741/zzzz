import request from '@/utils/request'
export default {
  dict(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        '01': [
          { 'key': '01', 'value': '一号仓库' },
          { 'key': '02', 'value': '二号仓库' },
          { 'key': '03', 'value': '三号仓库' },
          { 'key': '04', 'value': '四号仓库' }
        ]
      }
    }
  },
  page(data) {
    return {
      'code': 200,
      'message': '操作成功！',
      'success': true,
      'data': {
        'content': [
          { 'id': 'a', 'a': '教你识别季节性传染病',
            'b': '2019-01-02 14:03',
            'c': '传染病是由患传染病的病人、带菌者及病兽等，把病原体（细菌、原虫）排出体外，再通过空气、饮食、昆虫媒介、污染杂物等传播途径使一些抵抗力较弱的人得病。',
            'd': ['伤风也叫感冒，感冒是由病毒引起的急性上呼吸道炎症。在气候变化时发病最多。根据气候的冷热和发病的症状不同，分为风寒和风热两类。风寒感冒，有怕冷、鼻塞、头疼，或者咳嗽，汗不出，口不渴的症状风热感冒，发热较高，稍有怕冷、头疼、鼻塞，喉咙肿痛等症状',
              '流行性感冒，流行性较强，起病急，发热高，怕冷、头疼、流涕、鼻塞较多、咽部红肿疼痛，有恶心呕吐的症状或者剧烈咳嗽的症状，可服用板蓝根缓解',
              '流行性脑脊髓膜炎，又称为流脑，流脑是一种呼吸道传染病，由脑膜炎双球菌引起，常常发于冬季、春季，患者以儿童居多。在流行季节和流行地区，病人如果出现高热、全身疼痛（腿疼、腹疼）、头疼加剧、并有恶心呕吐，检查时皮肤有暗红色针尖大小的出血点，即可确诊为流脑。',
              '流行性腮腺炎，又叫“痄腮”，俗称“大嘴巴”，“蛤蟆瘟”，是由病毒引起的呼吸道传染病，多流行于冬春两季，起病大都较急，伴有发热、怕冷、头疼、胃口不好，往往耳下腮部先肿大，几天后另一侧也肿大，也有同时肿大的，有局部疼痛和触痛，表面皮肤发热。',
              '麻疹，俗称“痧子”，是小孩传播极其广泛的出疹性传染病，有病毒经过飞沫传播，起病时有发热、咳嗽、流泪和流涕等感冒症状。发热2-3天后，可在颊粘膜或唇内侧发现针头大小的白点，点周围有红晕，是此病的早期特征，发热第四天开始出现皮疹，先于耳后颈部及面部，自上而下蔓延至下肢，疹为玫瑰红。发疹时热度更高，病情加重，这是出疹期',
              '白喉，由白喉杆菌引起的呼吸道传染病，往往发病于秋季末，冬春季节。八岁以下小孩最容易得病，主要症状有咽喉疼痛、嗓音发哑、发热、全身不舒服等。张开口可看到咽喉红肿，两旁或后边有一层白色的膜，也就是假膜，不易擦去，擦去后会出血。如果假膜往下长到咽喉和气管，可以加塞呼吸道，引起呼吸困难，不及时抢救会发生生命危险。'
            ]
          },
          { 'id': 'b', 'a': '冬季常见传染病-诺如病毒性感染病',
            'b': '2019-11-12 15:39',
            'c': '12月份，天气越来越寒冷，昼夜温差和室内外温差大，除了要多添衣防寒之外，还需要重点预防传染病。比如诺如病毒感染性腹泻、水痘、流感等传染病。',
            'd': ['这是诺如病毒感染性的腹泻高发季节，人群普遍易感，在儿童和老年人中易引起暴发。诺如病毒感染后，多在48小时内会出现呕吐、腹泻等急性胃肠炎症状，幼儿以呕吐症状更多见，病程一般2-3天。暴发多由食物污染引起，海鲜类最为常见，其次为色拉、饮水；此外，还可通过气溶胶在空气中近距离播散。', '这是诺如病毒感染性的腹泻高发季节，人群普遍易感，在儿童和老年人中易引起暴发。诺如病毒感染后，多在48小时内会出现呕吐、腹泻等急性胃肠炎症状，幼儿以呕吐症状更多见，病程一般2-3天。暴发多由食物污染引起，海鲜类最为常见，其次为色拉、饮水；此外，还可通过气溶胶在空气中近距离播散。',
              '预防：',
              '食物彻底加热后食用，提倡喝开水，生吃瓜果要洗净。餐前便后用皂液、洗手液洗手。室内常开门窗通风，使室内空气流通。室内常开门窗通风，使室内空气流通。避免接触患者呕吐物粪便及其物品。']
          },
          { 'id': 'c', 'a': '夏季常见的季节性病症怎么预防',
            'b': '2019-05-12 11:11',
            'c': '夏季常见的季节性病症怎么预防？高温酷热的天气，让宝宝的健康也面临考验。有的宝宝吃坏肚子，有的宝宝偏食厌食、容易生病，也有的宝宝出现中暑症状。各种病症让家长们看在眼里，痛在心里。据介绍，肠道传染病、缺锌、中暑都是夏季常见的季节性病症，家长可以掌握一些夏季的常识，轻松地帮宝宝健康度夏。',
            'd': ['每年的7月至9月是肠道传染病的高发季节，吃坏肚子，轻则腹绞痛，重则上吐下泻，甚至可能发展为重症，要人性命。专家指出，避免得肠道传染病首先要从饮食卫生入手，注意食物在制作、保存过程中不被污染，不吃可疑不洁食物。',
              '人对肠出血性大肠杆菌普遍缺少防御能力，儿童更受其 青睐 ，尤其是15岁以下的儿童，他们感染后，更容易出现溶血尿毒综合征和血小板减少性紫癜等并发症，因此要特别注意防范。此外，可通过水、食物、日常生活接触和苍蝇传播的沙门氏菌感染、细菌性痢疾感染、霍乱弧菌感染也在夏季常见。\n' +
              '吃坏了肚子，疼痛难忍，但往往排便后就不那么疼了。这时需要及时受损的肠胃。呕吐量比较大时，病人往往因体液流失过多出现乏力、口干等症状，需要及时补液。补液可采取口服或者静脉注射两种方式。如果腹泻程度一般，最好喝点淡盐水。淡盐水很难喝，如果孩子不愿意喝，可以加些糖来改善口感。儿童低锌与季节有着密切的关系。在冬季就诊的儿童中，低锌发生率为35.9%-45%，而夏季可高达70%左右。锌主要来源于瘦肉、肝、蛋、奶等动物蛋白食品。儿童夏季胃口差，不爱吃荤腥，由此导致锌的摄入量减少。同时，夏天儿童出汗多，锌也容易从汗液中排出，随之大量流失，儿童一天随汗液丢失的锌可高达4毫克。加之户外活动较多，对锌等微量元素的消耗和需求也增多，以上各种原因最终导致了夏季孩子更容易缺锌。\n' +
              '如果孩子偏食厌食、生长缓慢、易受细菌病毒感染，经常感冒发烧拉肚子，家长应带孩子到医院做微量元素检测，视缺锌的程度，决定补锌的方式和多寡。如果孩子轻微缺锌，可以采用食补方式进补。在含锌的食物中，牡蛎、鲱鱼等海鲜产品的含锌量最高，其次为肝、肉、禽蛋、全麦、糙米、大豆、花生、白菜、萝卜等。不过，植物性食物中的锌，可与植物酸和纤维素结合成不溶于水的化合物，人体对其吸收较差。但是，缺锌比较严重的儿童就不能光靠食物来补锌了，因为一方面食补较慢，另一方面则是缺锌的孩子本来就偏食，他们能够吃的含锌量大的食物有限。补锌的药物，目前最常用的是葡萄糖酸锌。在剂型上，液体锌最受医生推崇，因为液体锌不仅更容易被人体吸收，效果显著;而且味道好，大大增加儿童吃药的依从性。随着闷热的夏天一天天临近，不少宝宝都是小胳膊小腿全露出来的 清凉 打扮。专家提醒：如果气温超过35℃，皮肤裸露在外不仅不凉爽反而会吸热，容易导致孩子中暑。\n' +
              '夏天给孩子穿得过少导致中暑，这是每年夏季的儿科门诊常见现象。',
              '人的正常体温为36℃~37℃， 当环境温度低于皮肤温度时，可借辐射、传导、对流和不显性蒸发散热;而当气温达到35℃时，主要靠皮肤蒸发散热;当气温继续升高时，皮肤不但不能通过辐射散热，还会从外界环境中吸收热量。\n' +
              '很快将进入炎热季节，如果户外正好是大中午或下午两三点，此时给孩子穿得太少，孩子的皮肤就容易从外界吸收热量，非但不会感到凉快，体表温度的上升反而会使得他们觉得更热，而且长时间处在高温环境容易导致大量出汗，出现中暑。\n' +
              '以上就是佰佰安全小编为您介绍夏季常见的季节性病症怎么预防的内容，本网儿童安全教育知识库中还有很多关于儿童安全方面的知识，感兴趣的朋友可以继续关注本网的内容，以便让孩子更健康的成长。'
            ]
          },
          {
            'id': 'd', 'a': '预防季节性流行性疾病',
            'b': '2019-01-12 08:57',
            'c': '冬去春来，天气转暖，万物复苏。此时正值各种病源微生物易于生长繁殖和作祟之际。加之早春的气候多变，冷暖莫测，每当人体抵抗力减弱或对外界环境适应性欠佳的时候，各种疾病也就悄然而至。',
            'd': ['冬去春来，天气转暖，万物复苏。此时正值各种病源微生物易于生长繁殖和作祟之际。加之早春的气候多变，冷暖莫测，每当人体抵抗力减弱或对外界环境适应性欠佳的时候，各种疾病也就悄然而至。由于受气候变化、人员流动、病毒变异和缺乏有效预防、接种等多种因素的影响，春季很容易发生呼吸道传染病，主要有：流行性感冒、流行性脑脊髓膜炎（流脑）、发热、咳嗽、肺炎流行性腮腺炎、麻疹、风疹、病毒性肺炎等，一定要重视防病保健。此类病症具有潜伏期短、传染性强、传播迅速等特点，如果不及时治疗，将会引发其他并发症，严重影响身体健康，甚至对生命构成威胁。因此同学们要正确认识并科学预防和治疗。', '这是诺如病毒感染性的腹泻高发季节，人群普遍易感，在儿童和老年人中易引起暴发。诺如病毒感染后，多在48小时内会出现呕吐、腹泻等急性胃肠炎症状，幼儿以呕吐症状更多见，病程一般2-3天。暴发多由食物污染引起，海鲜类最为常见，其次为色拉、饮水；此外，还可通过气溶胶在空气中近距离播散。',
              '一、正确认识春季流行性疾病。',
              '对待传染性疾病，科学预防是关键，因此应该首先认识和了解此类病症的状况，以便于及早发现和治疗。下面是一些病理原因和临床反应特点：',
              '1、流行性感冒：',
              '简称流感，是由流感病毒引起的急性呼吸道传染疾病，临床特点为：急起高热，全身酸痛、乏力，有时伴有轻度呼吸道症状，常发热、头疼、多汗、口渴、咽干等症状。单纯型流感预防后效果明显，病毒型治疗较为困难，流感病毒分为甲、乙、丙三型，其中又以甲型流感威胁最大，由于流感病毒致病力强，易发生变异，若人群对变异缺乏免疫力，就容易引起爆发流行，流感对人类的危害很大，一场流感的流行可导致人群平均寿命的降低。迄今为止，世界上已经爆发过五次大的流行，小的流行更是不计其数，造成数十亿人发病，数千万人死亡。世界上最严重的流感爆发于1918年，共造成2000多万人死亡，超过第一次世界大战的总死亡人数。直到今天每年因流感死亡的人数都居高不下，已经成为人类健康的“顶级杀手”。',
              '2、发热：',
              '人体的正常的腋下体温为36-37℃，凡腋下体温高于37.0℃或肛温高于37.6℃，或一日间的体温变动超出1.2℃时，即可称为发热。发热并不一定是疾病的症状，一些生理变化也可以导致发热。发热通常也是作为流感的一种并发症状出现，因此症状和流感较为相似，严重的发热病人会出现“晕厥”。',
              '3、咳嗽：',
              '咳嗽并非病名，而是很多疾病的觉症状，依据咳嗽的性质、咳嗽的持续时间的长短及咳嗽伴有的特殊表现等情况，可以大致辨别疾病所在，做到有病早治。如果咳嗽日久，咳嗽声短而有力，并伴有虚汗，午后潮热低烧、脸颊红艳、疲乏无力等症状，很可能是肺结核。若咳嗽是感冒引起，过两三天一般可随其他感冒症状好转而消失，但麻烦的是，这种短暂的咳嗽也常见于麻疹、猩红热、腮腺炎等冬春季传染病，因此要提高警惕，切莫大意。如果干咳嗽无痰，或咳血，应速到医院通过X线透视、胸透片或进行支气管造影等检查。',
              '4、肺炎：',
              '按照病原体分类，肺炎可分为细菌型肺炎、病毒性肺炎、支原体肺炎、霉菌性肺炎等。病毒性肺炎多是由常见腺病毒、呼吸道合胞病毒、流感和付流感病毒、麻疹病毒等引起，多发于冬春季节，由于气候多变，再加上身体抵抗能力低就容易发病，起病急，突发高烧达40-41℃，头痛、烦躁不安、气促、鼻翼煽动、面色潮红或紫酣、呼吸时伴有胸痛，有时伴腹痛，以及有咳嗽，早期咳嗽不重，晚期咳有痰，重症可导致休克、抽风。肺炎通过呼吸道飞沫传染，会引起流行，要注意预防。',
              '5、流脑：',
              '流脑是流行性脊髓脑膜炎的简称，是脑膜炎双球菌引起的化脓性脑膜炎，发病从冬季开始增加，流行季节是1—5月份，3月份为高峰期，脑膜炎双球菌存在于患者或带菌者的鼻咽部。借助于咳嗽、喷嚏、说话，由飞沫直接从空气传播给周围的人，空气不流通，人口密集，阳光缺少，等都有利于疾病的传播。                    流脑的临床特点有点象上呼吸道感染，轻度患者表现出来的症状是咽痒、喉痛、发烧、流涕、咳嗽，常常会让人认为是普通感冒，不加以重视和治疗，但是一旦出现头疼、呕吐、抽搐、惊厥、昏迷等深度症状，也就耽误了最好的治疗时机。流脑是可以预防的，同时接种和注射流脑疫苗也十分必要。',
              '二、传染病的预防。',
              '1、接种疫苗',
              '进行计划性人工自动免疫是预防各类传染病发生的主要环节，预防性疫苗是阻击传染病发生的最佳积极手段，也是投资小，收效大的预防举措。',
              '2、注意个人卫生和防护',
              '要保持学习、生活场所的卫生，不要堆放垃圾。饭前便后、打喷嚏、咳嗽和清洁鼻子以及外出归来一定要按规定程序洗手，勤换、勤洗、勤晒衣服、被褥，不随地吐痰。保持教室、宿舍内空气流通。在呼吸道传染病流行的季节应减少集会，少去公共场所。',
              '3、加强锻炼，增强免疫力。',
              '春天人体的各个器官、组织、细胞的新陈代谢开始旺盛起来，正是运动锻炼的好时机，应积极参加体育锻炼，多到郊外、户外呼吸新鲜空气，每天散步、慢跑、做操、打拳等，使身体气血畅通，筋骨舒展，增强体质。在锻炼的时候，必须注意气候变化，要避开晨雾风沙，要合理安排运动量，进行自我监护身体状况等，以免对身体造成不利影响。',
              '4、生活有规律。',
              '睡眠休息要好，生活有规律，保持充分的睡眠，对提高自身的抵抗力相当重要。要合理安排好作息，做到生活有规律，劳逸结合，像有的人通宵玩牌、打电子游戏机、上网冲浪，劳累过度，必然导致抵御疾病的能力下降，容易受到病毒感染。',
              '5、衣、食细节要注意。',
              '春秋季气候多变，乍暖还寒，若骤减衣服，极易降低人体呼吸道免疫力，使得病原体极易侵入。必须根据天气变化，适时增减衣服，切不可一下子减得太多。合理安排好饮食，饮食上不宜太过辛辣，太过则助火气，也不宜过食油腻。要减少对呼吸道的刺激，如不吸烟、不喝酒，要多饮水，摄入足够的维生素，宜多食些富含优质蛋白、糖类及微量元素的食物，如瘦肉、禽蛋、大枣、蜂蜜和新鲜蔬菜、水果等。',
              '6、切莫讳疾忌医。',
              '尽量减少与病患者接触，与病人接触时需戴多层棉纱口包，注意手的清洁和消毒。在发现身体不适，或有类似反应时要尽快诊断和治疗，早发现，早治疗。同时对发病的房间要及时消毒，有条件的也可以通过食醋熏蒸来进行预防。',
              '三 、养成良好的卫生习惯，才是预防传染病的关键。',
              '这一点在大家日常学习生活主要场所的寝室显得尤为重要。学校每学期积极组织文明卫生班级、文明卫生寝室创建活动，目的是为了培养大家养成良好的卫生习惯，预防疾病，确保大家的健康。那么作为新时代的中学生，举手之劳，既能美化大家的住宿环境，又能保证大家的健康，大家何乐而不为呢？'
            ]
          }
        ],
        'totalElements': 10
      }
    }
  },
  create(data) {
    return request({
      url: `/vue-element-admin/door/create`,
      method: 'post',
      data: data
    })
  },
  update(data) {
    return request({
      url: `/vue-element-admin/door/update`,
      method: 'put',
      data: data
    })
  },
  del(id) {
    return request({
      url: `/vue-element-admin/door/delete`,
      method: 'delete'
    })
  },
  detail(id) {
    return request({
      url: `/vue-element-admin/door/detail`,
      method: 'get'
    })
  },
  upload(id) {
    return request({
      url: `/vue-element-admin/door/detail`,
      method: 'get'
    })
  }
}
