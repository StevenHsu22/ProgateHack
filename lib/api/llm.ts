import { RecipeSuggestionRequest } from '@/types/recipes';
import { getRecipeIngredients } from '@/lib/db/operations/recipes';

// LLMとの通信を行うための共通関数
async function callLLM(prompt: string): Promise<string> {
  try {
    // TODO: LLM APIとの通信を実装
    // 例：
    /*
    const response = await fetch('https://your-llm-api-endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LLM_API_KEY}`
      },
      body: JSON.stringify({
        model: "your-model-name",
        prompt: prompt,
        max_tokens: 1500,
        temperature: 0.7
      })
    });

    const data = await response.json();
    return data.output || data.text || data.content;
    */

    // ダミー実装（実際のAPIに置き換えてください）
    return `# ${
      prompt.split('\n')[0]
    }\n\n## 材料（2人前）\n\n- 材料1\n- 材料2\n- 材料3\n\n## 作り方\n\n1. 手順1\n2. 手順2\n3. 手順3\n`;
  } catch (error) {
    console.error('LLM API call failed:', error);
    throw error;
  }
}

/**
 * 提案リクエストからLLMを使用してレシピを生成する
 */
export async function generateRecipeSuggestions(
  suggestion: RecipeSuggestionRequest,
  recipeId: string
): Promise<string> {
  // 食材情報を取得
  const ingredients = await getRecipeIngredients(recipeId);
  const ingredientNames = ingredients.map((item) => item.name);

  // LLM用のプロンプトを構築
  const prompt = `
${suggestion.recipesName}のレシピを作成してください。

【条件】
- 人数: ${suggestion.peopleCount}人前
${suggestion.mealPreference ? `- 料理の好み: ${suggestion.mealPreference}` : ''}
${suggestion.cookingTime ? `- 調理時間: ${suggestion.cookingTime}` : ''}
${
  suggestion.allergies && suggestion.allergies.length > 0
    ? `- アレルギー: ${suggestion.allergies.join(', ')}`
    : ''
}
${
  suggestion.otherConditions
    ? `- その他の条件: ${suggestion.otherConditions}`
    : ''
}

【使用する食材】
${ingredientNames.join('\n')}

以下の形式でマークダウン形式のレシピを作成してください：
# レシピ名

## 材料（人数分）
- 材料1: 量
- 材料2: 量
...

## 作り方
1. 手順1
2. 手順2
...

## ポイント
- 調理のコツや注意点
`.trim();

  // LLMサービスを呼び出してレシピを生成
  const generatedContent = await callLLM(prompt);
  console.log('Generated recipe:', generatedContent);
  return generatedContent;
}
