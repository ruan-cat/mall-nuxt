/** 商品详情接口返回数据 */
export interface ApifoxModel_goods {
	id: string;
	name: string;
	desc: string;
	price: number;
	picture: string;
	discount: number;
	orderNum: number;
	spuCode: string;
	oldPrice: number;
	inventory: number;
	brand: {
		id: string;
		name: string;
		nameEn: string;
		logo: string;
	};
	categories: {
		id: string;
		name: string;
	}[];
	specs: {
		name: string;
		values: {
			name: string;
			picture: string;
			desc: string;
		}[];
	}[];
	skus: {
		id: string;
		skuCode: string;
		price: number;
		oldPrice: number;
		inventory: number;
		specs: {
			name: string;
			valueName: string;
		}[];
	}[];
	details: {
		pictures: string[];
		properties: {
			name: string;
			value: string;
		}[];
	};
}

/** 商品列表接口返回数据 */
export interface GoodsProductAPI {
	id: string;
	name: string;
	picture: string;
	desc: string;
	price: number;
}
