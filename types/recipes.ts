export interface Recipe {
  id: string;
  name: string;
  createdAt: Date;
  status: string; // '作成中' | '完了' | '失敗'
  description?: string;
  content?: string; // レシピの詳細内容（Markdown形式）
}