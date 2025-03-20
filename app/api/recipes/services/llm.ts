import { Recipe, RecipeSuggestionRequest } from '@/types/recipes';

// LLMとの通信を行うための共通関数
async function callLLM<T>(data: any): Promise<string> {
  try {
    // TODO: LLM APIとの通信を実装

    const response = 'sample'; // 料理の作り方がmarkdown形式で返ってくる
    return response;
  } catch (error) {
    console.error('LLM API call failed:', error);
    throw error;
  }
}

// レシピ提案を生成する
export async function generateRecipeSuggestions(
  request: RecipeSuggestionRequest
): Promise<Recipe> {
  try {
    const response = await callLLM(request);
    return {
      id: crypto.randomUUID(),
      name: request.recipesName,
      createdAt: new Date(),
      status: '完了',
      description: request.peopleCount
        ? `${request.peopleCount}人分の${request.recipesName}`
        : request.recipesName,
      content: response,
    };
  } catch (error) {
    console.error('Failed to generate recipe suggestions:', error);
    throw error;
  }
}
