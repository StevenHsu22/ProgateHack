import {
  Statistics,
  UsageTrend,
  PopularIngredient,
  CategoryDistribution,
} from '@/lib/db/operations/dashboard';

// 基本統計情報の取得
export async function fetchStatistics() {
  const response = await fetch('/api/dashboard?type=statistics');
  if (!response.ok) {
    throw new Error('統計データの取得に失敗しました');
  }
  return response.json() as Promise<Statistics>;
}

// 期限切れ間近の食材の取得
export async function fetchExpiringIngredients() {
  const response = await fetch('/api/dashboard?type=expiring');
  if (!response.ok) {
    throw new Error('期限切れ間近の食材データの取得に失敗しました');
  }
  return response.json();
}

// 食材使用トレンドの取得
export async function fetchUsageTrends() {
  const response = await fetch('/api/dashboard?type=usage-trends');
  if (!response.ok) {
    throw new Error('食材使用トレンドの取得に失敗しました');
  }
  return response.json() as Promise<UsageTrend[]>;
}

// よく使われる食材の取得
export async function fetchPopularIngredients(limit: number = 10) {
  const response = await fetch(
    `/api/dashboard?type=popular-ingredients&limit=${limit}`
  );
  if (!response.ok) {
    throw new Error('よく使われる食材データの取得に失敗しました');
  }
  return response.json() as Promise<PopularIngredient[]>;
}

// カテゴリー別割合の取得
export async function fetchCategoryDistribution() {
  const response = await fetch('/api/dashboard?type=category-distribution');
  if (!response.ok) {
    throw new Error('カテゴリー別割合データの取得に失敗しました');
  }
  return response.json() as Promise<CategoryDistribution[]>;
}

// ダッシュボード全データの一括取得
export async function fetchDashboardData() {
  const response = await fetch('/api/dashboard');
  if (!response.ok) {
    throw new Error('ダッシュボードデータの取得に失敗しました');
  }
  return response.json() as Promise<{
    statistics: Statistics;
    expiringIngredients: any[];
    usageTrends: UsageTrend[];
    popularIngredients: PopularIngredient[];
    categoryDistribution: CategoryDistribution[];
  }>;
}

// ダッシュボードデータの更新（例：フィルタリング変更後など）
export async function refreshDashboardData() {
  // キャッシュを無視して新しいデータを取得するためのタイムスタンプパラメータを追加
  const timestamp = new Date().getTime();
  const response = await fetch(`/api/dashboard?_=${timestamp}`);
  if (!response.ok) {
    throw new Error('ダッシュボードデータの更新に失敗しました');
  }
  return response.json();
}
