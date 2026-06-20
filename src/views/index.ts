import { createPresenter, ui, defineModel } from '@mcpfusion/core';

const RegexResponseModel = defineModel('RegexResponse', (m) => {
    m.casts({
        success: m.boolean('Success flag'),
        result: m.string('JSON stringified result'),
        error: m.string('Optional error')
    });
});

export const RegexResponsePresenter = createPresenter('RegexResponse')
  .schema(RegexResponseModel as any)
  .rules(['Display the regex operation result.'])
  .ui((data: any) => {
      if (!data.success) return [ui.markdown(`❌ **Error:** ${data.error}` as string)];
      return [ui.markdown(`✅ **Result:**\n\`\`\`json\n${JSON.stringify(data.result, null, 2)}\n\`\`\`` as string)];
  });
