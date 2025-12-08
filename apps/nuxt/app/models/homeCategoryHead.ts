/**
 * 首页分类导航数据
 * @description
 * TODO: ai自己生成的 仍旧需要我先完成排查，再开始使用。
 *
 * 要去接口文档内获取该内容才能完成有意义的改造。
 */
export interface ApifoxModel_HomeCategoryHead {
	id: string;
	name: string;
	picture: string;
	children: {
		id: string;
		name: string;
		picture: string;
		goods: {
			id: string;
			name: string;
			desc: string;
			price: string;
			picture: string;
			discount: null;
			orderNum: number;
		}[];
	}[];
}
